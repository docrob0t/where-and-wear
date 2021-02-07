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

// Return the current temperature and a 7 day forecast for a given set of lat/long co-ordinates
app.post("/weatheratcoords", (req, res) => {
  const url = "https://data.climacell.co/v4/timelines";
  const params = {
    location: req.body.lat + "," + req.body.long,
    fields: [
      "temperature",
      "temperatureApparent",
      "precipitationProbability",
      "weatherCode",
    ],
    timesteps: "1d",
    units: "metric",
    apikey: config.CLIMACELL_API_KEY,
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
    access_token: config.MAPBOX_API_KEY,
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

app.post("/retrieveDuration", (req, res) => {
  const url =
    "https://api.mapbox.com/directions/v5/mapbox/" +
    req.body.profile +
    "/" +
    req.body.start.long +
    "," +
    req.body.start.lat +
    ";" +
    req.body.destination.long +
    "," +
    req.body.destination.lat;
  const params = {
    access_token: config.MAPBOX_API_KEY,
  };

  axios
    .get(url, { params })
    .then((response) => {
      console.log(response.data);
      res.json({ duration: response.data.routes[0].duration });
    })
    .catch((error) => {
      // TODO: Handle error
      console.log("Cannot retrieve duration");
      console.log(url);
    });
});

// Returns a set of clothing suggestions from a given weather code & temperature
app.post("/getclothingsuggestions", (req, res) => {
  var weatherCode = req.body.weatherCode;
  var currentTemperature = req.body.currentTemperature;
  console.log(req.body);
  console.log('Weather code is: ' + weatherCode);
  console.log('Current temp is: ' + currentTemperature);

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
      res.json({ suggestionOne: "umbrella", suggestionTwo: "coat", suggestionThree: "boots_rain" });
      break;
    // Snow weather codes
    case 5101:
    case 5000:
    case 5100:
    case 5001:
      res.json({ suggestionOne: "beanie", suggestionTwo: "gloves", suggestionThree: "boots_snow" });
      break;
    // Fog weather codes
    case 2100:
    case 2000:
      res.json({ suggestionOne: "hoodie", suggestionTwo: "jeans", suggestionThree: "long_sleeve_shirt" });
      break;
    // Cloudy weather codes
    case 1001:
    case 1102:
    case 1101:
    case 1100:
    case 1000:
      if (currentTemperature > 15) {
        res.json({ suggestionOne: "cap", suggestionTwo: "shorts", suggestionThree: "short_sleeve_shirt" });
        break;
      } else {
        res.json({ suggestionOne: "hoodie", suggestionTwo: "jeans", suggestionThree: "long_sleeve_shirt" });
        break;
      }
    // Sunny/Clear weather codes
    case 1100:
    case 1000:
      if (currentTemperature > 10) {
        res.json({ suggestionOne: "sunglasses", suggestionTwo: "shorts", suggestionThree: "short_sleeve_shirt" });
        break;
      } else {
        res.json({ suggestionOne: "hoodie", suggestionTwo: "jeans", suggestionThree: "long_sleeve_shirt" });
        break;
      }
  }
});

export default app;
