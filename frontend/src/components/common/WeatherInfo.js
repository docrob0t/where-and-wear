import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Grid, Typography } from "@material-ui/core";
import getWeatherIconFrom from "./WeatherIcon";

const useStyles = makeStyles((theme) => ({
  cardWeatherIcon: {
    maxHeight: "3.5rem",
    [theme.breakpoints.up("sm")]: {
      maxHeight: "4.7rem",
    },
    [theme.breakpoints.up("md")]: {
      maxHeight: "5.35rem",
    },
    [theme.breakpoints.up("lg")]: {
      maxHeight: "6rem",
    },
  },
}));

export default function WeatherInfo() {
  const classes = useStyles();

  return (
    <div>
      <Box className="location" paddingBottom={2}>
        <Typography variant="h4">
          <Box fontWeight="fontWeightBold">London</Box>
        </Typography>
        <Typography ariant="subtitle1" component="div" color="textSecondary">
          Saturday 16:00
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
            <Typography variant="h1" component="div" color="textPrimary">
              38
            </Typography>
            <Typography variant="h6" component="div" color="textSecondary">
              °C
            </Typography>
          </Grid>
          <Typography
            variant="subtitle1"
            component="div"
            color="textSecondary"
            align="center"
          >
            Feels like 25°C
          </Typography>
        </Grid>
        <Grid item xs={6} className="weather">
          <img
            className={classes.cardWeatherIcon}
            src={getWeatherIconFrom(6201).icon}
            alt={getWeatherIconFrom(6201).text}
          />
          <Typography
            variant="subtitle1"
            component="div"
            color="textSecondary"
            align="center"
          >
            {getWeatherIconFrom(6201).text}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
