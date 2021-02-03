import Axios from "axios";
import dotenv from "dotenv";
import express from "express";

// Read from .env file and set API key constants
dotenv.config();
const OPENWEATHERMAP_API_KEY = process.env.OPENWEATHERMAP_API_KEY;
const MAPBOX_API_KEY = process.env.MAPBOX_API_KEY;
const CLIMACELL_API_KEY = process.env.CLIMACELL_API_KEY;

// Setup
const app = express();
const port = 9000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Listen for requests on the given port
app.listen(port, () => console.log("Listening on port: " + port));

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
    apikey: CLIMACELL_API_KEY,
  };

  Axios.get(url, { params: options })
    .then(function (response) {
      res.json({ timelines: response.data.data.timelines });
    })
    .catch(function (error) {
      // TODO: Handle error
    });
});

// Gets the city name from a given set of lat/long co-ordinates
app.post("/locationfromcoords", (req, res) => {
  const requestURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + req.body.long + ',' + req.body.lat + '.json?access_token=' + MAPBOX_API_KEY;
  Axios.get(requestURL)
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
      console.log('location error');
      console.log(requestURL);
    });
});

// Returns a set of clothing suggestions from a given weather code & temperature
app.post("/getclothingsuggestions", (req, res) => {
  console.log('Getting suggestions');
  var weatherCode = req.body.weatherCode;
  var currentTemperature = req.body.currentTemperature;
  console.log(req.body);
  console.log('Weathr code is: ' + weatherCode);
  console.log('Current temp is: ' + currentTemperature);

  switch (weatherCode) {
    // Rain weather codes
    case 4201, 4001, 4200, 6201, 6001, 6200, 6000, 4000, 7101, 7000, 7102, 8000:
      res.json({ suggestionOne: "umbrella", suggestionTwo: "coat", suggestionThree: "boots_rain" });
    // Snow weather codes
    case 5101, 5000, 5100, 5001:
      res.json({ suggestionOne: "beanie", suggestionTwo: "gloves", suggestionThree: "boots_snow" });
    // Fog weather codes
    case 2100, 2000:
      res.json({ suggestionOne: "hoodie", suggestionTwo: "jeans", suggestionThree: "long_sleeve_shirt" });
    // Cloudy weather codes
    case 1001, 1102, 1101, 1100, 1000:
      if (currentTemperature > 15) {
        res.json({ suggestionOne: "cap", suggestionTwo: "shorts", suggestionThree: "short_sleeve_shirt" });
      } else {
        res.json({ suggestionOne: "hoodie", suggestionTwo: "jeans", suggestionThree: "long_sleeve_shirt" });
      }
    // Sunny/Clear weather codes
    case 1100, 1000:
      if (currentTemperature > 10) {
        res.json({ suggestionOne: "sunglasses", suggestionTwo: "shorts", suggestionThree: "short_sleeve_shirt" });
      } else {
        res.json({ suggestionOne: "hoodie", suggestionTwo: "jeans", suggestionThree: "long_sleeve_shirt" });
      }
  }
});