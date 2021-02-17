import axios from "axios";
import config from "./utils/config.js";
import cors from "cors";
import express from "express";
import requestLogger from "./utils/middleware.js";

const app = express();

// App Configuration
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// Return the current weather for a given set of lat/long co-ordinates
app.post("/weatherAtCoords/current", (req, res) => {
  const url = "https://data.climacell.co/v4/timelines";
  const params = {
    location: req.body.lat + "," + req.body.long,
    fields: ["temperature", "temperatureApparent", "weatherCode"],
    timesteps: "current",
    units: "metric",
    apikey: config.CLIMACELL_API_KEY
  };

  axios
    .get(url, { params })
    .then((response) => {
      res.json({ timelines: response.data.data.timelines });
    })
    .catch((error) => {});
  // TODO: handle error
});

// Return the current weather for a given set of lat/long coordinates in a timeframe
app.post("/weatherAtDestination/", (req, res) => {
  const url = "https://data.climacell.co/v4/timelines";
  const params = {
    location: req.body.lat + "," + req.body.long,
    fields: ["temperature", "temperatureApparent", "weatherCode"],
    startTime: req.body.journeyArrivalTime,
    timesteps: "1h",
    units: "metric",
    apikey: config.CLIMACELL_API_KEY
  };

  console.log("The starttime is " + req.body.journeyArrivalTime);

  axios
    .get(url, { params })
    .then((response) => {
      res.json({ timelines: response.data.data.timelines });
    })
    .catch((error) => {});
  // TODO: handle error
});

// Return the 7 day forecast for a given set of lat/long co-ordinates
app.post("/weatherAtCoords/forecast/", (req, res) => {
  const nextWeek = new Date();
  // add 7 days to the current date
  nextWeek.setHours(0);
  nextWeek.setDate(new Date().getDate() + 7);

  const url = "https://data.climacell.co/v4/timelines";
  const params = {
    location: req.body.lat + "," + req.body.long,
    fields: [
      "temperatureMax",
      "temperatureMin",
      "precipitationProbability",
      "weatherCode"
    ],
    endTime: nextWeek.toISOString(),
    timesteps: "1d",
    units: "metric",
    apikey: config.CLIMACELL_API_KEY
  };

  axios
    .get(url, { params })
    .then(function (response) {
      res.json({ timelines: response.data.data.timelines });
    })
    .catch(function (error) {
      // TODO: Handle error
    });
});

// Gets the city name from a given set of lat/long co-ordinates
app.post("/locationfromcoords", (req, res) => {
  const requestURL =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    req.body.long +
    "," +
    req.body.lat +
    ".json";
  const params = {
    types: "place",
    access_token: config.MAPBOX_API_KEY
  };

  axios
    .get(requestURL, { params })
    .then(function (response) {
      // handle success
      // TODO: Remove logging when no longer required
      console.log(response.data);
      res.json({ location: response.data.features[0].text });
    })
    .catch(function (error) {
      // TODO: Handle error
      console.log("location error");
      console.log(requestURL);
    });
});

// Gets the duration with a mode of transport and between two sets of coordinates
app.get("/retrieveDuration", (req, res) => {
  let requestURL =
    "https://api.mapbox.com/directions/v5/mapbox/" +
    req.query.profile +
    "/" +
    req.query.startlong +
    "," +
    req.query.startlat +
    ";" +
    req.query.destinationlong +
    "," +
    req.query.destinationlat +
    "?access_token=" +
    config.MAPBOX_API_KEY;

  console.log(
    "Requests:" +
      req.query.profile +
      "," +
      req.query.startlong +
      "," +
      req.query.startlat +
      "," +
      req.query.destinationlong +
      "," +
      req.query.destinationlat
  );

  axios
    .get(requestURL)
    .then((response) => {
      console.log(response.data);
      console.log(
        "Response from /retrieveDuration is " + response.data.routes[0].duration
      );
      res.json({ duration: response.data.routes[0].duration });
      console.log("End");
    })
    .catch((error) => {
      // TODO: Handle error
      console.log("Cannot retrieve duration");
      console.log(error);
    });
});

// Gets the coordinates from a string
app.get("/retrieveCoordsFromLocation", (req, res) => {
  let requestURL =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    req.query.search +
    ".json?country=GB&autocomplete=true&" +
    "access_token=" +
    config.MAPBOX_API_KEY;

  console.log("In /retrieveCoordsFromLocation");
  console.log("Request is: " + req.query.search);
  console.log("Request URL is: " + requestURL);

  axios
    .get(requestURL)
    .then((response) => {
      console.log("Response from /retrieveCoordsFromLocation:");
      console.log(
        response.data.features[0].geometry.coordinates[1],
        response.data.features[0].geometry.coordinates[0]
      );
      console.log("End");
      res.json({
        lat: response.data.features[0].geometry.coordinates[1],
        long: response.data.features[0].geometry.coordinates[0]
      });
    })
    .catch((error) => {
      // Handle error
      console.log("Cannot retrieve coordinates");
      console.log(error);
    });
});

// Get place names from a string
app.get("/retrieveSearchList", (req, res) => {
  let requestURL =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    req.query.search +
    ".json?country=GB&autocomplete=true&" +
    "access_token=" +
    config.MAPBOX_API_KEY;

  axios
    .get(requestURL)
    .then((response) => {
      res.json({ placename: response.data.features[0].place_name.text });
    })
    .catch((error) => {
      // Handle error
      console.log("Cannot retrieve coordinates");
      console.log(error);
    });
});

// Returns a set of clothing suggestions from a given weather code & temperature
app.post("/getClothingSuggestions", (req, res) => {
  let weatherCode = req.body.weatherCode;
  let currentTemperature = req.body.temperature;

  switch (weatherCode) {
    // Rain weather codes
    case 4201:
    case 4001:
    case 4200:
    case 6201:
    case 6001:
    case 6200:
    case 6000:
    case 4000:
    case 7101:
    case 7000:
    case 7102:
    case 8000:
      res.json({ clothingSuggestions: ["umbrella", "coat", "boots_rain"] });
      break;
    // Snow weather codes
    case 5101:
    case 5000:
    case 5100:
    case 5001:
      res.json({ clothingSuggestions: ["beanie", "gloves", "boots_snow"] });
      break;
    // Fog weather codes
    case 2100:
    case 2000:
      res.json({ clothingSuggestions: ["hoodie", "jeans", "long_sleeve_shirt"] });
      break;
    // Cloudy weather codes
    case 1001:
    case 1102:
    case 1101:
      if (currentTemperature > 15) {
        res.json({ clothingSuggestions: ["cap", "shorts", "short_sleeve_shirt"] });
      } else {
        res.json({ clothingSuggestions: ["hoodie", "jeans", "long_sleeve_shirt"] });
      }
      break;
    // Sunny/Clear weather codes
    case 1100:
    case 1000:
      if (currentTemperature > 10) {
        res.json({ clothingSuggestions: ["sunglasses", "shorts", "short_sleeve_shirt"] });
      } else {
        res.json({ clothingSuggestions: ["hoodie", "jeans", "long_sleeve_shirt"] });
      }
      break;
    default:
      res.json("some error");
  }
});

export default app;
