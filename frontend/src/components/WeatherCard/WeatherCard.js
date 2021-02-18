import {
  Box,
  Card,
  CardContent,
  Fab,
  Grid,
  makeStyles
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import SevenDayForecast from "../SevenDayForecast/SevenDayForecast";
import WeatherInfo from "../WeatherInfo/WeatherInfo";
import axios from "../../axios";
import ClothingSuggestions from "../ClothingSuggestions/ClothingSuggestions";

// Card styling constants
const cardStyles = makeStyles((theme) => ({
  root: {
    minWidth: 375,
    maxWidth: 1100,
    width: "15%",
    height: "10.8rem",
    margin: 35,
    position: "absolute",
    bottom: 5,
    borderRadius: 20,
    transition: "0.5s ease-in-out",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.5)"
  },
  rootExpanded: {
    minWidth: 1175,
    maxWidth: 1100,
    width: "60%",
    height: "20.5rem",
    margin: 35,
    position: "absolute",
    bottom: 5,
    borderRadius: 20,
    transition: "0.5s ease-in-out",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.5)"
  },
  fab: {
    position: "absolute",
    top: theme.spacing(1.5),
    right: theme.spacing(1.5),
    textTransform: "none"
  }
}));

// WeatherCard() function returns a weather card overlay
function WeatherCard({ lat, long }) {
  const styling = cardStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [currentWeather, setCurrentWeather] = useState({
    temperature: 0,
    temperatureApparent: 0,
    weatherCode: 1000
  });
  const [weatherForecastData, setWeatherForecastData] = useState([]);

  // API call to fetch current weather at user's location
  useEffect(() => {
    const fetchWeather = async () => {
      await axios
        .post("/weatherAtCoords/current/", {
          lat: lat,
          long: long
        })
        .then((response) => {
          let temperature, temperatureApparent, weatherCode;
          ({
            temperature,
            temperatureApparent,
            weatherCode
          } = response.data.timelines[0].intervals[0].values);

          setCurrentWeather({
            ...currentWeather,
            temperature: temperature,
            temperatureApparent: temperatureApparent,
            weatherCode: weatherCode
          });
        })
        // Sometimes the api would return an empty array in response, so added this catch block
        .catch((error) => {
          console.log(error);
        });
    };

    fetchWeather();
  }, [lat, long]);

  // API call to fetch 7 day forecast at user's location
  useEffect(() => {
    const fetchWeatherForecast = async () => {
      const response = await axios.post("/weatherAtCoords/forecast/", {
        lat: lat,
        long: long
      });
      setWeatherForecastData(response.data.timelines[0].intervals);
    };
    fetchWeatherForecast();
  }, [lat, long]);

  return (
    <Card className={isOpen ? styling.rootExpanded : styling.root}>
      <Fab
        className={styling.fab}
        variant="extended"
        size="medium"
        color="primary"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <Box>Show less</Box> : <Box>Show more</Box>}
      </Fab>
      <CardContent>
        <Grid container>
          <Grid item xs={isOpen ? 3 : 12} container direction="column">
            <Grid item>
              <WeatherInfo
                lat={lat}
                long={long}
                temperature={currentWeather.temperature}
                temperatureApparent={currentWeather.temperatureApparent}
                weatherCode={currentWeather.weatherCode}
                time={"current"}
              />
            </Grid>
            <Grid item>
              <ClothingSuggestions
                weatherCode={currentWeather.weatherCode}
                currentTemperature={currentWeather.temperature}
              />
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
