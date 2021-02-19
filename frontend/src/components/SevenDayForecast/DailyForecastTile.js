import React from "react";
import getWeatherIconFrom from "../utils/WeatherIcon";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";
import precipitationIcon from "../../images/umbrella.svg";
import dateFormat from "dateformat";

const useStyles = makeStyles((theme) => ({
  cardWeatherIcon: {
    maxHeight: "1.56rem",
    [theme.breakpoints.up("sm")]: {
      maxHeight: "1.56rem"
    },
    [theme.breakpoints.up("md")]: {
      maxHeight: "1.82rem"
    },
    [theme.breakpoints.up("lg")]: {
      maxHeight: "2.02rem"
    }
  },
  precipitationIcon: {
    height: "1.5rem",
    marginRight: "0.5rem"
  }
}));

export default function DailyForecastTile({
  date,
  tempMax,
  tempMin,
  weatherCode,
  precipitationProbability
}) {
  const classes = useStyles();

  return (
    <Box className="dailyForecast">
      <Box className="date">
        <Typography variant="subtitle1">
          <Box fontWeight="600" display="flex" justifyContent="center">
            {dateFormat(date, "ddd")}
          </Box>
        </Typography>
        <Typography variant="subtitle1" component="div">
          <Box
            display="flex"
            fontWeight="500"
            justifyContent="center"
            paddingBottom={0}
          >
            {dateFormat(date, "d")}
            <sup>{dateFormat(date, "S")}</sup>&nbsp;
            {dateFormat(date, "mmm")}
          </Box>
        </Typography>
      </Box>

      <Box className="weatherIcon" display="flex" justifyContent="center">
        <img
          className={classes.cardWeatherIcon}
          src={getWeatherIconFrom(weatherCode).icon}
          alt={getWeatherIconFrom(weatherCode).text}
        />
      </Box>

      <Box className="temperatureMaxAndMin" margin={0}>
        <Typography variant="h6" component="div">
          <Box
            className="temperatureMax"
            display="flex"
            justifyContent="center"
          >
            {Math.round(tempMax)}°
          </Box>
        </Typography>
        <Typography variant="h6" component="div" color="textSecondary">
          <Box
            className="temperatureMin"
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
        margin={1}
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
