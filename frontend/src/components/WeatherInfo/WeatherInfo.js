import { Box, Grid, Typography, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import getWeatherIconFrom from "../utils/WeatherIcon";
import axios from "../../axios";

const useStyles = makeStyles((theme) => ({
  cardWeatherIcon: {
    maxHeight: "2.375rem",
    [theme.breakpoints.up("sm")]: {
      maxHeight: "2.9rem"
    },
    [theme.breakpoints.up("md")]: {
      maxHeight: "3.33rem"
    },
    [theme.breakpoints.up("lg")]: {
      maxHeight: "3.75rem"
    }
  }
}));

export default function WeatherInfo({
  lat,
  long,
  temperature,
  temperatureApparent,
  weatherCode,
  time
}) {
  const classes = useStyles();
  const [city, setCity] = useState("");

  let subtitle;
  if (time === "current") {
    subtitle = "Current weather";
  } else {
    subtitle = "ETA " + time;
  }

  // API call to resolve the name of the city of the location
  useEffect(() => {
    const getCityName = async () => {
      const response = await axios.post("/locationfromcoords/", {
        lat: lat,
        long: long
      });
      setCity(response.data.location);
      console.log(lat);
      console.log(long);
    };
    getCityName();
  }, [lat, long, city]);

  return (
    <Box>
      <Box className="location" paddingBottom={1}>
        <Typography variant="h5">
          <Box fontWeight="fontWeightBold">{city}</Box>
        </Typography>
        <Typography variant="subtitle1" component="div" color="textSecondary">
          {subtitle}
        </Typography>
      </Box>
      <Grid container justify="center" alignItems="flex-end">
        <Grid item xs={5} className="temperature">
          <Grid
            container
            justify="center"
            alignItems="flex-start"
            wrap="nowrap"
          >
            <Typography variant="h2" component="div" color="textPrimary">
              {Math.round(temperature)}
            </Typography>
            <Typography variant="h6" component="div" color="textSecondary">
              °C
            </Typography>
          </Grid>
          <Typography
            variant="subtitle2"
            component="div"
            color="textSecondary"
            align="center"
          >
            Feels like {Math.round(temperatureApparent)} °C
          </Typography>
        </Grid>
        <Grid item xs={5} className="weather">
          <img
            className={classes.cardWeatherIcon}
            src={getWeatherIconFrom(weatherCode).icon}
            alt={getWeatherIconFrom(weatherCode).text}
          />
          <Typography
            variant="subtitle2"
            component="div"
            color="textSecondary"
            align="center"
          >
            {getWeatherIconFrom(weatherCode).text}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
