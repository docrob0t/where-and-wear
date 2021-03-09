import { Box, Card, CardContent, Fab, Grid, Paper, Tab, Tabs, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";

import ClothingSuggestions from "../ClothingSuggestions/ClothingSuggestions";
import SevenDayForecast from "../SevenDayForecast/SevenDayForecast";
import WeatherInfo from "../WeatherInfo/WeatherInfo";
import axios from "../../axios";

// Card styling constants
const cardStyles = makeStyles((theme) => ({
  root: {
    width: "46rem",
    height: "13.5rem",
    margin: 35,
    position: "absolute",
    bottom: 5,
    borderRadius: 20,
    transition: "0.5s ease-in-out",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.3)"
  },
  rootExpanded: {
    width: "46rem",
    height: "26.5rem",
    margin: 35,
    position: "absolute",
    bottom: 5,
    borderRadius: 20,
    transition: "0.5s ease-in-out",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.3)"
  },
  fab: {
    position: "absolute",
    top: theme.spacing(0.5),
    right: theme.spacing(1.5),
    textTransform: "none"
  },
  weatherTabs: {
    width: "30rem",
  }
}));

function TabPanel(props) {
  const { children, value, index } = props;
  return (
    <div>
      {value === index && <Box p={0}>{children}</Box>}
    </div>
  );
}

// WeatherCard() function returns a weather card overlay
function WeatherCard({ lat: startingLat, long: startingLong, destinationLat, destinationLong, arrivalTime }) {
  const styling = cardStyles();
  const [isOpen, setIsOpen] = useState(false);

  // Starting location weather states
  const [currentStartingWeather, setCurrentStartingWeather] = useState({
    temperature: 0,
    temperatureApparent: 0,
    weatherCode: 1000
  });
  const [startingWeatherForecastData, setStartingWeatherForecastData] = useState([]);

  // Destination location weather states
  const [destinationWeatherAtArrival, setDestinationWeatherAtArrival] = useState({
    temperature: 0,
    temperatureApparent: 0,
    weatherCode: 1000,
    isTabEnabled: false
  });
  const [destinationWeatherForecastData, setDestinationWeatherForecastData] = useState([]);

  // Handling tabs in weather card
  const [tab, setTab] = React.useState(0);

  const switchTab = (event, newTab) => {
    setTab(newTab);
  };

  // API call to fetch current weather at user's location
  // TODO: Grey out weather at destination on load, enable tab when state is set
  useEffect(() => {
    const fetchStartingLocationWeather = async () => {
      await axios
        .post("/weatherAtCoords/current/", {
          lat: startingLat,
          long: startingLong
        })
        .then((response) => {
            setCurrentStartingWeather({
              ...currentStartingWeather,
              temperature: response.data.timelines[0].intervals[0].values.temperature,
              temperatureApparent: response.data.timelines[0].intervals[0].values.temperatureApparent,
              weatherCode: response.data.timelines[0].intervals[0].values.weatherCode
            });
        })
        // Sometimes the api would return an empty array in response, so added this catch block
        .catch((error) => {
          console.log(error);
        });
    };

    fetchStartingLocationWeather();
  }, [startingLat, startingLong, destinationWeatherAtArrival.isTabEnabled]);

  // API call to fetch weather at the destination at the arrival time
  useEffect(() => {
    const fetchDestinationWeather = async () => {
      await axios
        .post("/weatherAtDestination/", {
          lat: destinationLat,
          long: destinationLong,
          journeyArrivalTime: arrivalTime
        })
        .then((response) => {    
          setDestinationWeatherAtArrival({
            ...destinationWeatherAtArrival,
            temperature: response.data.timelines[0].intervals[0].values.temperature,
            temperatureApparent:
              response.data.timelines[0].intervals[0].values.temperatureApparent,
            weatherCode: response.data.timelines[0].intervals[0].values.weatherCode,
            isTabEnabled: true
          });
        })
        // Sometimes the api would return an empty array in response, so added this catch block
        .catch((error) => {
          console.log(error);
        });
    };

    fetchDestinationWeather();
  }, [destinationLat, destinationLong, destinationWeatherAtArrival.isTabEnabled]);

  // API call to fetch 7 day forecast at user's location
  useEffect(() => {
    const fetchWeatherForecast = async (lat, long, isStarting) => {
      const response = await axios.post("/weatherAtCoords/forecast/", {
        lat: lat,
        long: long
      });

      if (isStarting) {
        setStartingWeatherForecastData(response.data.timelines[0].intervals);
      } else {
        setDestinationWeatherForecastData(response.data.timelines[0].intervals);
      }

    };
    fetchWeatherForecast(startingLat, startingLong, true);
    fetchWeatherForecast(destinationLat, destinationLong, false);
  }, [startingLat, startingLong, destinationLat, destinationLong]);

  return (
    <Card className={isOpen ? styling.rootExpanded : styling.root}>
      <Fab
        className={styling.fab}
        variant="extended"
        size="medium"
        color="primary"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <Box>Hide 7-Day Forecast</Box> : <Box>Show 7-Day Forecast</Box>}
      </Fab>
      <Paper square>
        <Tabs
          className={styling.weatherTabs}
          value={tab}
          indicatorColor="primary"
          onChange={switchTab}
        >
          <Tab label="Weather at Starting Location" />
          <Tab label="Weather at Destination" disabled={!destinationWeatherAtArrival.isTabEnabled} />
        </Tabs>
      </Paper>
      <TabPanel value={tab} index={0}>
        <CardContent>
          <Grid container direction="column">
            <Grid item xs={isOpen ? 12 : 12} container direction="row">
              <Grid item xs={6}>
                <WeatherInfo
                  lat={startingLat}
                  long={startingLong}
                  temperature={currentStartingWeather.temperature}
                  temperatureApparent={currentStartingWeather.temperatureApparent}
                  weatherCode={currentStartingWeather.weatherCode}
                  time={"current"}
                />
              </Grid>
              <Grid item xs={6}>
                <ClothingSuggestions
                  weatherCode={currentStartingWeather.weatherCode}
                  currentTemperature={currentStartingWeather.temperature}
                />
              </Grid>
            </Grid>
            {isOpen && (
              <Grid item xs={12}>
                <SevenDayForecast intervals={startingWeatherForecastData} />
              </Grid>
            )}
          </Grid>
        </CardContent>
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <CardContent>
          <Grid container direction="column">
            <Grid item xs={isOpen ? 12 : 12} container direction="row">
              <Grid item xs={6}>
                <WeatherInfo
                  lat={destinationLat}
                  long={destinationLong}
                  temperature={destinationWeatherAtArrival.temperature}
                  temperatureApparent={destinationWeatherAtArrival.temperatureApparent}
                  weatherCode={destinationWeatherAtArrival.weatherCode}
                  time={arrivalTime.toTimeString().split(" ")[0].substring(0, 5)}
                />
              </Grid>
              <Grid item xs={6}>
                <ClothingSuggestions
                  weatherCode={destinationWeatherAtArrival.weatherCode}
                  currentTemperature={destinationWeatherAtArrival.temperature}
                />
              </Grid>
            </Grid>
            {isOpen && (
              <Grid item xs={12}>
                <SevenDayForecast intervals={destinationWeatherForecastData} />
              </Grid>
            )}
          </Grid>
        </CardContent>
      </TabPanel>
    </Card>
  );
}

export default WeatherCard;
