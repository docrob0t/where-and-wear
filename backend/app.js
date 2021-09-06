import axios from "axios";
import config from "./utils/config.js";
import cors from "cors";
import express from "express";
import requestLogger from "./utils/middleware.js";
import clothingService from "./services/ClothingService.js";

const app = express();

// App Configuration
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// Return the current weather for a given set of lat/long co-ordinates
app.post("/weather/current", (req, res) => {
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
app.post("/weather/destination", (req, res) => {
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
app.post("/weather/7DayForecast", (req, res) => {
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
app.post("/mapbox/reverseGeocoding", (req, res) => {
  const requestURL =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    req.body.long +
    "," +
    req.body.lat +
    ".json";
  const params = {
    language: "en-GB",
    types: "place",
    access_token: config.MAPBOX_API_KEY
  };

  axios
    .get(requestURL, { params })
    .then(function (response) {
      // handle success
      res.json({ location: response.data.features[0].text });
    })
    .catch(function (error) {
      // TODO: Handle error
      console.log("location error");
      console.log(requestURL);
    });
});

// Gets the coordinates and autocomplete suggestions from a string
app.get("/mapbox/forwardGeocoding", (req, res) => {
  let requestURL =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURI(req.query.search) +
    ".json?";

  const params = {
    language: "en-GB",
    autocomplete: true,
    access_token: config.MAPBOX_API_KEY
  };

  axios
    .get(requestURL, { params })
    .then((response) => {
      res.json({ features: response.data.features });
    })
    .catch((error) => {
      // Handle error
      console.log("Cannot retrieve coordinates");
      console.log(error);
    });
});

// Gets the duration with a mode of transport and between two sets of coordinates
app.get("/mapbox/duration", (req, res) => {
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

  axios
    .get(requestURL)
    .then((response) => {
      res.json({ duration: response.data.routes[0].duration });
    })
    .catch((error) => {
      // TODO: Handle error
      console.log("Cannot retrieve duration");
      console.log(error);
    });
});

// Returns a set of clothing suggestions from a given weather code & temperature
app.post("/getClothingSuggestions", (req, res) => {
  res.json({
    clothingSuggestions: clothingService(
      req.body.weatherCode,
      req.body.temperature
    )
  });
});

export default app;
