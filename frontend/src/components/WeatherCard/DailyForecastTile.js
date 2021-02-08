import React from "react";
import getWeatherIconFrom from "../common/WeatherIcon";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";
import precipitationIcon from "../../images/umbrella.svg";

const useStyles = makeStyles((theme) => ({
  weatherIcon: {
    height: "3.5rem",
    [theme.breakpoints.up("sm")]: {
      height: "4.7rem",
    },
    [theme.breakpoints.up("md")]: {
      height: "5.35rem",
    },
    [theme.breakpoints.up("lg")]: {
      height: "6rem",
    },
  },
  precipitationIcon: {
    height: "1.5rem",
    marginRight: "0.5rem",
  },
}));

export default function DailyForecastTile({
  date,
  tempMax,
  tempMin,
  weatherCode,
  precipitationProbability,
}) {
  const classes = useStyles();
  const dateFormat = require("dateformat");

  return (
    <Box className="dailyForecast">
      <Box className="date">
        <Typography variant="h6">
          <Box
            fontWeight="fontWeightBold"
            display="flex"
            justifyContent="center"
          >
            {dateFormat(date, "ddd")}
          </Box>
        </Typography>
        <Typography variant="h6" component="div">
          <Box display="flex" justifyContent="center" margin={1}>
            {dateFormat(date, "d")}
            <sup>{dateFormat(date, "S")}</sup>&nbsp;
            {dateFormat(date, "mmm")}
          </Box>
        </Typography>
      </Box>

      <Box className="weatherIcon" display="flex" justifyContent="center">
        <img
          className={classes.weatherIcon}
          src={getWeatherIconFrom(weatherCode).icon}
          alt={getWeatherIconFrom(weatherCode).text}
        />
      </Box>

      <Box className="temperatureMaxAndMin" margin={2}>
        <Typography variant="h5" component="div">
          <Box
            className="temperatureMax"
            padding={0}
            display="flex"
            justifyContent="center"
          >
            {Math.round(tempMax)}°
          </Box>
        </Typography>
        <Typography variant="h6" component="div" color="textSecondary">
          <Box
            className="temperatureMin"
            padding={0}
            display="flex"
            justifyContent="center"
          >
            {Math.round(tempMin)}°
          </Box>
        </Typography>
      </Box>

      <Box
        className="precipitationPercentage"
        display="flex"
        justifyContent="center"
        margin={2}
      >
        <img
          className={classes.precipitationIcon}
          src={precipitationIcon}
          alt="Precipitation icon"
        />
        <Typography variant="subtitle1" component="div">
          <Box className="temperatureMax">
            {Math.round(precipitationProbability)}%
          </Box>
        </Typography>
      </Box>
    </Box>
  );
}
