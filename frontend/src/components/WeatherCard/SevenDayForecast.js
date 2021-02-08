import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Grid, Typography } from "@material-ui/core";
import DailyForecastTile from "./DailyForecastTile";
import axios from "../../axios";

export default function SevenDayForecast(props) {
  const intervals = [
    {
      startTime: "2021-02-07T06:00:00Z",
      values: {
        temperature: -1.97,
        temperatureApparent: -7.72,
        temperatureMax: -1.97,
        temperatureMin: -2.75,
        weatherCode: 5100,
        precipitationProbability: 20,
      },
    },
    {
      startTime: "2021-02-08T06:00:00Z",
      values: {
        temperature: -0.79,
        temperatureApparent: -4.69,
        temperatureMax: -0.79,
        temperatureMin: -2.76,
        weatherCode: 5100,
        precipitationProbability: 19.9,
      },
    },
    {
      startTime: "2021-02-09T06:00:00Z",
      values: {
        temperature: 0.71,
        temperatureApparent: -4.57,
        temperatureMax: 0.71,
        temperatureMin: -1.64,
        weatherCode: 6000,
        precipitationProbability: 10,
      },
    },
    {
      startTime: "2021-02-10T06:00:00Z",
      values: {
        temperature: 2.02,
        temperatureApparent: -1.72,
        temperatureMax: 2.02,
        temperatureMin: -3.07,
        weatherCode: 1102,
        precipitationProbability: 10,
      },
    },
    {
      startTime: "2021-02-11T06:00:00Z",
      values: {
        temperature: 1.5,
        temperatureApparent: -1.91,
        temperatureMax: 1.5,
        temperatureMin: -3.05,
        weatherCode: 1102,
        precipitationProbability: 10,
      },
    },
    {
      startTime: "2021-02-12T06:00:00Z",
      values: {
        temperature: -1.41,
        temperatureApparent: -7.7,
        temperatureMax: -1.41,
        temperatureMin: -3.5,
        weatherCode: 1001,
        precipitationProbability: 0,
      },
    },
    {
      startTime: "2021-02-13T06:00:00Z",
      values: {
        temperature: -0.1,
        temperatureApparent: -6.44,
        temperatureMax: -0.1,
        temperatureMin: -3.61,
        weatherCode: 1001,
        precipitationProbability: 0,
      },
    },
  ];

  return (
    <Box>
      <Box className="title" paddingBottom={2}>
        <Typography variant="h4">
          <Box fontWeight="fontWeightBold">7-day forecast</Box>
        </Typography>
      </Box>
      <Grid container display="flex" justify="space-around">
        {intervals.map((interval) => (
          <Grid item key={interval.startTime}>
            <DailyForecastTile
              date={interval.startTime}
              tempMax={interval.values.temperatureMax}
              tempMin={interval.values.temperatureMin}
              weatherCode={interval.values.weatherCode}
              precipitationProbability={
                interval.values.precipitationProbability
              }
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
