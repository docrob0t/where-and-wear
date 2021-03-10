import "mapbox-gl/dist/mapbox-gl.css";

import React, { useEffect, useRef, useState } from "react";
import ReactMapGL, {
  FlyToInterpolator,
  GeolocateControl,
  WebMercatorViewport
} from "react-map-gl";

import { Box } from "@material-ui/core";
import InputBox from "./InputBox/InputBox";
import MenuButton from "./MenuButton";
import Pins from "./Pins/Pins";
import WeatherCard from "./WeatherCard/WeatherCard";
import axios from "../axios";
import { easeQuadInOut } from "d3-ease";

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_API_KEY;

function Map() {
  const [userLocation, setUserLocation] = useState({
    lat: undefined,
    long: undefined
  });
  const [startingPoint, setStartingPoint] = useState({
    lat: undefined,
    long: undefined
  });
  const [destination, setDestination] = useState({
    lat: undefined,
    long: undefined
  });
  const [arrivalTime, setArrivalTime] = useState(new Date());
  const [viewport, setViewport] = useState({
    // Center of United Kingdom
    latitude: 54.7603,
    longitude: -4.2028,
    zoom: 5.36,
    bearing: 0,
    pitch: 0
  });
  const mapRef = useRef();

  // On component initialisation, get the users location in co-ordinates and set the state accordingly
  useEffect(() => {
    const getUsersIP = fetch("https://api.ipify.org/?format=json")
      .then((response) => response.json())
      .then((data) => {
        return data.ip;
      });

    const getLocationFromIP = () => {
      getUsersIP.then((ip) => {
        fetch("http://ip-api.com/json/" + ip + "?fields=city")
          .then((response) => response.json())
          .then((data) => {
            getCoordinatesFromCity(data.city);
          });
      });
    };

    if (navigator.geolocation) {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        if (result.state === "granted" || result.state === "prompt") {
          navigator.geolocation.getCurrentPosition(
            getCoordinates,
            handleLocationError
          );
        } else if (result.state === "denied") {
          // Use IP approximation
          getLocationFromIP();
        }
      });
    } else {
      // If Geolocation is not supported by this browser then use IP approximation
      getLocationFromIP();
    }
  }, []);

  // Change viewport according to user's input
  useEffect(() => {
    // Run a different method to change viewport if both start & destination is defined
    if (
      startingPoint.lat !== undefined &&
      destination.lat !== undefined &&
      startingPoint.long !== undefined &&
      destination.long !== undefined
    ) {
      // Calculate the viewport position
      const { longitude, latitude, zoom } = new WebMercatorViewport(
        viewport
      ).fitBounds(
        [
          [startingPoint.long, startingPoint.lat],
          [destination.long, destination.lat]
        ],
        {
          padding: { top: 100, bottom: 250, left: 350, right: 0 },
          offset: [200, 0]
        }
      );

      setViewport({
        ...viewport,
        longitude,
        latitude,
        zoom,
        transitionDuration: 3000,
        transitionInterpolator: new FlyToInterpolator(),
        transitionEasing: easeQuadInOut
      });
    } else if (startingPoint.lat !== undefined) {
      setViewport({
        ...viewport,
        longitude: startingPoint.long,
        latitude: startingPoint.lat,
        zoom: 12,
        transitionDuration: 3000,
        transitionInterpolator: new FlyToInterpolator(),
        transitionEasing: easeQuadInOut
      });
    }
  }, [startingPoint, destination]);

  function getCoordinatesFromCity(city) {
    axios
      .get("/retrieveCoordsFromLocation/", {
        params: {
          search: city
        }
      })
      .then((response) => {
        setUserLocation({
          lat: response.data.lat,
          long: response.data.long
        });
        setStartingPoint({
          lat: response.data.lat,
          long: response.data.long
        });
      });
  }

  function getCoordinates(position) {
    const { latitude, longitude } = position.coords;
    setUserLocation({
      ...userLocation,
      lat: latitude,
      long: longitude
    });
    setStartingPoint({
      lat: latitude,
      long: longitude
    });
  }

  // TODO: decide how we want to handle these error cases
  function handleLocationError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        console.log("User denied the request for Geolocation. Defaulting to London");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
      default:
        alert("An unknown error occurred.");
    }
  }

  return (
    <ReactMapGL
      ref={mapRef}
      {...viewport}
      width="100vw"
      height="100vh"
      mapStyle="mapbox://styles/mapbox/streets-v11"
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      mapboxApiAccessToken={MAPBOX_TOKEN}
    >
      <GeolocateControl
        onViewportChange={(nextViewport) =>
          setViewport({
            ...viewport,
            longitude: userLocation.long,
            latitude: userLocation.lat,
            zoom: 12,
            transitionDuration: 3000,
            transitionInterpolator: new FlyToInterpolator(),
            transitionEasing: easeQuadInOut
          })
        }
        style={{ position: "absolute", bottom: 30, right: 15 }}
        positionOptions={{ enableHighAccuracy: true }}
        showUserLocation={true}
        auto
      />
      {(function () {
        if (startingPoint.lat !== undefined && destination.lat !== undefined) {
          return (
            <Box>
              <Pins
                isStart={true}
                lat={startingPoint.lat}
                long={startingPoint.long}
              />
              <Pins isStart={false} lat={destination.lat} long={destination.long} />
            </Box>
          );
        }
      })()}
      <MenuButton />
      <WeatherCard
        lat={startingPoint.lat}
        long={startingPoint.long}
        destinationLat={destination.lat}
        destinationLong={destination.long}
        arrivalTime={arrivalTime}
      />
      <InputBox
        setStartingPoint={setStartingPoint}
        setDestination={setDestination}
        setArrivalTime={setArrivalTime}
      />
    </ReactMapGL>
  );
}

export default Map;
