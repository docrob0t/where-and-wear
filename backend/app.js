import Axios from 'axios';
import dotenv from "dotenv";
import express from 'express';

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
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Listen for requests on the given port
app.listen(port, () => console.log("Listening on port: " + port));

// Return the current temperature and a 7 day forecast for a given set of lat/long co-ordinates
app.post("/weatheratcoords", (req, res) => {
    // const requestURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + req.body.lat + '&lon=' + req.body.long + '&units=metric&exclude=hourly,minutely&appid=' + OPENWEATHERMAP_API_KEY;
    const requestURL = 'https://data.climacell.co/v4/timelines?location=' + req.body.lat + '%2C' + req.body.long + '&fields=temperature&fields=weatherCode&timesteps=1d&units=metric&apikey=' + CLIMACELL_API_KEY;
    // const requestURL = "https://data.climacell.co/v4/timelines?location=50.8586945%2C0.5598255&fields=temperature&fields=weatherCode&timesteps=1d&units=metric&apikey=sxYnAcSnTo09lDBvHEDbuVeDGnUPDoNr"

    console.log('Weather request url: ' + requestURL);

    Axios.get(requestURL)
        .then(function (response) {
            // handle success - return current temp and 7 day forecast data
            // console.log('Response temp is: ' + response.data.current.temp);
            console.log('Response is: ' + response.data.data.timelines[0].intervals[0].values.temperature);
            res.json({ timelines: response.data.data.timelines });
        })
        .catch(function (error) {
            // TODO: Handle error
            console.log('############# ERROR !  ###############');
            console.log('Req lat is: ' + req.lat);
            console.log('Req long is: ' + req.long);
            console.log(error);
            console.log('############# END !  ###############');
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
            res.json({ location: response.data.features[0].context[1].text });
        })
        .catch(function (error) {
            // TODO: Handle error
            console.log('location error');
            console.log(requestURL);
        });
});
