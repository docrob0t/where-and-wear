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

app.get("/retrieveCoordsFromLocation", (req, res) => {
  let requestURL = 
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    req.query.search +
    ".json?country=GB&autocomplete=true&" + 
    "access_token=" +
    config.MAPBOX_API_KEY;

    console.log('In /retrieveCoordsFromLocation');
    console.log('Request is: '+ req.query.search);
    console.log('Request URL is: ' + requestURL);
  
  axios
    .get(requestURL)
    .then((response) => {
      console.log('Response from /retrieveCoordsFromLocation:');
      console.log(response.data.features[0].geometry.coordinates[1], response.data.features[0].geometry.coordinates[0]);
      console.log('End');
      res.json({ lat: response.data.features[0].geometry.coordinates[1], long: response.data.features[0].geometry.coordinates[0] });
      //res.json({ placename: response.data.features[0].place_name.text });
    })
    .catch((error) => {
      // Handle error
      console.log("Cannot retrieve coordinates");
      console.log(error);
    });
});


export default app;
