import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  makeStyles
} from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";

import ClothingSuggestionsTile from "./ClothingSuggestionsTile";
import GetClothingSuggestions from "../ClothingSuggestions.js";
import SevenDayForecast from "./SevenDayForecast";
import WeatherInfo from "../common/WeatherInfo";
import axios from "../../axios";

// Card styling constants
const cardStyles = makeStyles({
  root: {
    minWidth: 375,
    minHeight: 300,
    maxHeight: 400,
    maxWidth: 1100,
    width: "15%",
    height: "40%",
    margin: 35,
    position: "absolute",
    bottom: 5,
    borderRadius: 25,
    transition: "0.5s ease-in-out"
  },
  moreDetails: {
    position: "absolute",
    right: 15,
    top: 15,
    fontFamily: "Calibri",
    fontWeight: 600
  },
  rootExpanded: {
    minWidth: 1175,
    minHeight: 350,
    maxHeight: 400,
    maxWidth: 1100,
    width: "60%",
    height: "40%",
    margin: 35,
    position: "absolute",
    bottom: 5,
    borderRadius: 25,
    transition: "0.5s ease-in-out"
  }
});

// WeatherCard() function returns a weather card overlay
function WeatherCard(props) {
  const styling = cardStyles();
  const [currentWeather, setCurrentWeather] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [weatherForecastData, setWeatherForecastData] = useState([]);
  const [clothingSuggestions, setClothingSuggestions] = useState([]);
  const isInitialMount = useRef(true);

  // API call to fetch current weather at user's location
  useEffect(() => {
    async function fetchWeather() {
      try {
        const response = await axios.post("/weatherAtCoords/current/", {
          lat: props.lat,
          long: props.long
        });
        setCurrentWeather(response.data.timelines[0].intervals[0].values);
        return response;
      } catch (e) {
        // TODO: Handle error properly
        console.log("Caught error: ", e);
      }
    }

    fetchWeather();
  }, [props.lat, props.long]);

  // API call to fetch clothing suggestions based on current weather
  useEffect(() => {
    if (currentWeather) {
      if (isInitialMount.current) {
        isInitialMount.current = false;
      } else {
        async function fetchSuggestions() {
          try {          
            const response = await GetClothingSuggestions(currentWeather.weatherCode, currentWeather.temperature);
            setClothingSuggestions(response);
            return response;
          } catch (e) {
            // TODO: Handle error properly
            console.log("Caught error: ", e);
          }
        }

        fetchSuggestions(currentWeather);
      }
    }
  }, [currentWeather]);

  // API call to fetch 7 day forecast at user's location
  useEffect(() => {
    const fetchWeatherForecast = async () => {
      const response = await axios.post("/weatherAtCoords/forecast/", {
        lat: props.lat,
        long: props.long
      });
      setWeatherForecastData(response.data.timelines[0].intervals);
    };

    fetchWeatherForecast();
  }, [props.lat, props.long]);

  return (
    <Card className={isOpen ? styling.rootExpanded : styling.root}>
      <CardActions>
        <Button
          size="small"
          onClick={() => setIsOpen(!isOpen)}
          className={styling.moreDetails}
        >
          {isOpen ? "Less Details" : "More Details"}
        </Button>
      </CardActions>
      <CardContent>
        <Grid container>
          <Grid item xs={isOpen ? 3 : 12} container direction="column">
            <Grid item>
              <WeatherInfo {...currentWeather} city={props.city} />
            </Grid>
            <Grid item>
              <ClothingSuggestionsTile clothingSuggestions={clothingSuggestions} />
            </Grid>
          </Grid>
          {isOpen && (
            <Grid item xs={9}>
              <SevenDayForecast intervals={weatherForecastData} />
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
}

export default WeatherCard;
