import React from "react";
import { Box, Grid, Typography } from "@material-ui/core";
import DailyForecastTile from "./DailyForecastTile";

export default function SevenDayForecast({ intervals }) {
  return (
    <Box>
      <Box className="title" paddingTop={1.5} paddingBottom={0.5}>
        <Typography variant="h6">
          <Box fontWeight="fontWeightBold">7-day forecast</Box>
        </Typography>
      </Box>
      <Grid container display="flex" justify="space-around">
        {intervals.map((interval) => (
          <Grid item key={interval.startTime} xs={1}>
            <DailyForecastTile
              date={interval.startTime}
              tempMax={interval.values.temperatureMax}
              tempMin={interval.values.temperatureMin}
              weatherCode={interval.values.weatherCode}
              precipitationProbability={interval.values.precipitationProbability}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
