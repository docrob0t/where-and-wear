import { Box, Grid, Typography, makeStyles } from "@material-ui/core";
import React from "react";
import getWeatherIconFrom from "../utils/WeatherIcon";

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

export default function WeatherInfoAlt({
  temperature,
  temperatureApparent,
  weatherCode
}) {
  const classes = useStyles();

  return (
    <Box>
      <Box className="location" paddingBottom={1}>
        <Typography ariant="subtitle1" component="div" color="textSecondary">
          Current weather
        </Typography>
      </Box>
      <Grid container justify="center" alignItems="flex-end">
        <Grid item xs={6} className="temperature">
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
        <Grid item xs={6} className="weather">
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
