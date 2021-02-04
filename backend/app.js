import axios from "axios";
import express from "express";
import cors from "cors";
import config from "./utils/config.js";
import requestLogger from "./utils/middleware.js";

const app = express();

// App Configuration
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// Return the current temperature and a 7 day forecast for a given set of lat/long co-ordinates
app.post("/weatheratcoords", (req, res) => {
  let url = "https://data.climacell.co/v4/timelines";

  let options = {
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
    .get(url, { params: options })
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
    ".json?access_token=" +
    config.MAPBOX_API_KEY;
  axios
    .get(requestURL)
    .then(function (response) {
      // handle success
      // TODO: Remove logging when no longer required
      // console.log('Request lat/long: ' + req.body.lat, req.body.long);
      // console.log('Response city is: ' + response.data.features[0].context[1].text);

      // The mapbox API response for a reverse geocoding lookup is a bit convoluted
      // This seems to reference the city, but requires further testing to confirm 100%
      res.json({ location: response.data.features[0].context[2].text });
    })
    .catch(function (error) {
      // TODO: Handle error
      console.log("location error");
      console.log(requestURL);
    });
});

app.post("/retrieveDuration", (req, res) => {
  let requestURL =
    "https://api.mapbox.com/directions/v5/mapbox/" +
    req.body.profile +
    "/" +
    req.body.start.long +
    "," +
    req.body.start.lat +
    ";" +
    req.body.destination.long +
    "," +
    req.body.destination.lat +
    "?access_token=" +
    config.MAPBOX_API_KEY;

  axios
    .get(requestURL)
    .then((response) => {
      console.log(response);
      res.json({ duration: response.data.routes[0].duration });
    })
    .catch((error) => {
      // TODO: Handle error
      console.log("Cannot retrieve duration");
      console.log(requestURL);
    });
});

export default app;
