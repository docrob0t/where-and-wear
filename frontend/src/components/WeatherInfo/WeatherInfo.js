import { Box, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import getWeatherIconFrom from "../utils/WeatherIcon";

const useStyles = makeStyles((theme) => ({
  cardWeatherIcon: {
    maxHeight: "2rem",
    [theme.breakpoints.up("sm")]: {
      maxHeight: "2.57rem"
    },
    [theme.breakpoints.up("md")]: {
      maxHeight: "2.78rem"
    },
    [theme.breakpoints.up("lg")]: {
      maxHeight: "2.99rem"
    }
  }
}));

export default function WeatherInfo({ city, temperature, temperatureApparent, weatherCode, time }) {
  const classes = useStyles();

  let subtitle;
  if (time === "current") {
    subtitle = "Current weather";
  } else {
    subtitle = "Arrival time: " + time;
  }

  return (
    <Box>
      <Box className="location" paddingBottom={0}>
        <Typography variant="h6">
          <Box fontWeight="fontWeightBold">{city}</Box>
        </Typography>
        <Typography variant="body1" component="div" color="textSecondary">
          <Box fontWeight="600">{subtitle}</Box>
        </Typography>
      </Box>
      <Grid container justifyContent="center" alignItems="flex-end">
        <Grid item xs={6} className="temperature">
          <Grid container justifyContent="center" alignItems="flex-start" wrap="nowrap">
            <Typography variant="h3" component="div" color="textPrimary">
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
        <Grid align="center" item xs={5} className="weather">
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
