import {
  Box,
  Card,
  CardContent,
  Fab,
  Grid,
  makeStyles
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import WeatherInfo from "../WeatherInfo/WeatherInfo";
import axios from "../../axios";
import ClothingSuggestions from "../ClothingSuggestions/ClothingSuggestions";
import dateFormat from "dateformat";

// Card styling constants
const cardStyles = makeStyles((theme) => ({}));

// WeatherCard() function returns a weather card overlay
function DestinationWeatherInfo( {lat, long, arrivalTime} ) {

  const styling = cardStyles();
  const [currentWeather, setCurrentWeather] = useState({
    temperature: 0,
    temperatureApparent: 0,
    weatherCode: 1000
  });

  // API call to fetch current weather at user's location
  useEffect(() => {
    const fetchWeather = async () => {
      await axios
        .post("/weatherAtDestination", {
          lat: lat,
          long: long,
          journeyArrivalTime: arrivalTime.toISOString(),
        })
        .then((response) => {
          setCurrentWeather({
            ...currentWeather,
            temperature:
              response.data.timelines[0].intervals[0].values.temperature,
            temperatureApparent:
              response.data.timelines[0].intervals[0].values
                .temperatureApparent,
            weatherCode:
              response.data.timelines[0].intervals[0].values.weatherCode
          });
        })
        // Sometimes the api would return an empty array in response, so added this catch block
        .catch((error) => {
          console.log(error);
        });
    };

    fetchWeather();
  }, [lat, long, arrivalTime]);

  return (

        <Grid container>
          <Grid item xs={12} container direction="column">
            <Grid item>
              <WeatherInfo
                lat={lat}
                long={long}
                temperature={currentWeather.temperature}
                temperatureApparent={currentWeather.temperatureApparent}
                weatherCode={currentWeather.weatherCode}
                time={dateFormat(arrivalTime, "h:MM TT")}
              />
            </Grid>
            <Grid item>
              <ClothingSuggestions
                weatherCode={currentWeather.weatherCode}
                currentTemperature={currentWeather.temperature}
              />
            </Grid>
          </Grid>
        </Grid>

  );
}

export default DestinationWeatherInfo;
