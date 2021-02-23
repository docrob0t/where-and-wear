import "mapbox-gl/dist/mapbox-gl.css";
import React, { useEffect, useRef, useState } from "react";
import InputBox from "./InputBox/InputBox";
import MenuButton from "./MenuButton";
import ReactMapGL, { FlyToInterpolator } from "react-map-gl";
import { easeQuadInOut } from "d3-ease";

import WeatherCard from "./WeatherCard/WeatherCard";
import axios from "../axios";

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_API_KEY;

function Map() {
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

  // On component initialisation, get the users location in co-ordinates and set the state accordingly
  useEffect(() => {
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

  useEffect(() => {
    // Run a different method to change viewport if start & destination is defined
    if (startingPoint.lat !== undefined && destination.lat !== undefined) {
      // change to a different viewport?
    } else if (startingPoint.lat !== undefined) {
      setViewport({
        ...viewport,
        longitude: startingPoint.long,
        latitude: startingPoint.lat,
        zoom: 12,
        transitionDuration: 5000,
        transitionInterpolator: new FlyToInterpolator(),
        transitionEasing: easeQuadInOut
      });
    }
  }, [startingPoint]);

  function getCoordinatesFromCity(city) {
    axios
      .get("/retrieveCoordsFromLocation/", {
        params: {
          search: city
        }
      })
      .then((response) =>
        setStartingPoint({
          lat: response.data.lat,
          long: response.data.long
        })
      );
  }

  function getCoordinates(position) {
    const { latitude, longitude } = position.coords;
    setStartingPoint({
      ...startingPoint,
      lat: latitude,
      long: longitude
    });
  }

  // TODO: decide how we want to handle these error cases
  function handleLocationError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        console.log(
          "User denied the request for Geolocation. Defaulting to London"
        );
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
      <MenuButton />
      <WeatherCard lat={startingPoint.lat} long={startingPoint.long} />
      <InputBox setViewport={setViewport} setStartingPoint={setStartingPoint} />
    </ReactMapGL>
  );
}

export default Map;
