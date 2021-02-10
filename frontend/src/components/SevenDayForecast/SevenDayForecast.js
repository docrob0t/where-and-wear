import React from "react";
import { Box, Grid, Typography } from "@material-ui/core";
import DailyForecastTile from "./DailyForecastTile";

export default function SevenDayForecast({ intervals }) {
  return (
    <Box>
      <Box className="title" paddingBottom={2}>
        <Typography variant="h5">
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
