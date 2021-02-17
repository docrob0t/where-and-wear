import React, { useEffect, useRef, useState } from "react";
import MenuButton from "./MenuButton";
import ReactMapGL from "react-map-gl";
import DestinationCard from "./DestinationCard/DestinationCard";
import WeatherCard from "./WeatherCard/WeatherCard";
import axios from "axios";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_API_KEY;

function Map() {
  const [startingPoint, setStartingPoint] = useState({
    lat: 0,
    long: 0
  });
  // const [destination, setDestination] = useState({});
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
    if (navigator.geolocation) {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        if (result.state === "granted" || result.state === "prompt") {
          navigator.geolocation.getCurrentPosition(
            getCoordinates,
            handleLocationError
          );
        } else if (result.state === "denied") {
          // Use IP approximation
        }
      });
    } else {
      alert("Geolocation is not supported by this browser.");
      // Use IP approximation
    }
  }, []);

  function getCoordinates(position) {
    const { latitude, longitude } = position.coords;
    setStartingPoint({ ...startingPoint, lat: latitude, long: longitude });
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
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.");
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
      <DestinationCard />
    </ReactMapGL>
  );
}

export default Map;
