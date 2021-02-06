import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Card, CardContent, Grid, Typography } from "@material-ui/core";
import getIconFromWeatherCode from "./WeatherIcon";

const useStyles = makeStyles((theme) => ({
  cardTemperature: {
    display: "flex",
    justifyContent: "center",
    alignItems: "start",
  },
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
    <Card elevation="6">
      <CardContent>
        <Typography variant="h4">
          <Box fontWeight="fontWeightBold">London</Box>
        </Typography>
        <Typography ariant="subtitle1" component="div" color="textSecondary">
          Saturday 16:00
        </Typography>

        <Grid container spacing={2} justify="center" alignItems="flex-end">
          <Grid item xs={4} className="temperature">
            <div className={classes.cardTemperature}>
              <Typography variant="h1" component="div" color="textPrimary">
                38
              </Typography>
              <Typography variant="h6" component="div" color="textSecondary">
                °C
              </Typography>
            </div>
            <Typography variant="subtitle1" component="div" color="textSecondary" align="center">
              Feels like 25°C
            </Typography>
          </Grid>
          <Grid item xs={4} className="weather">
            <img
              className={classes.cardWeatherIcon}
              src={getIconFromWeatherCode(6201).icon}
              alt={getIconFromWeatherCode(6201).text}
            />
            <Typography variant="subtitle1" component="div" color="textSecondary" align="center">
              {getIconFromWeatherCode(6201).text}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
