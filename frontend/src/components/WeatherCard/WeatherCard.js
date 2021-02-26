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
    width: "35rem",
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

  const [currentWeather, setCurrentWeather] = useState({
    temperature: 0,
    temperatureApparent: 0,
    weatherCode: 1000
  });
  const [weatherForecastData, setWeatherForecastData] = useState([]);

  const [destinationWeather, setDestinationWeather] = useState({
    temperature: 0,
    temperatureApparent: 0,
    weatherCode: 1000,
    isTabEnabled: false
  });
  const [destinationWeatherForecastData, setDestinationWeatherForecastData] = useState([]);

  // Handling tabs in weather card
  const [tab, setTab] = React.useState(0);

  const switchTab = (event, newTab) => {
    setTab(newTab);};

  // API call to fetch current weather at user's location
  useEffect(() => {
    const fetchWeather = async () => {
      await axios
        .post("/weatherAtCoords/current/", {
          lat: startingLat,
          long: startingLong
        })
        .then((response) => {
          let temperature, temperatureApparent, weatherCode;
          ({
            temperature,
            temperatureApparent,
            weatherCode
          } = response.data.timelines[0].intervals[0].values);

          setCurrentWeather({
            ...currentWeather,
            temperature: temperature,
            temperatureApparent: temperatureApparent,
            weatherCode: weatherCode
          });
        })
        // Sometimes the api would return an empty array in response, so added this catch block
        .catch((error) => {
          console.log(error);
        });
    };

    fetchWeather();
  }, [startingLat, startingLong]);

  // API call to fetch 7 day forecast at user's location
  useEffect(() => {
    const fetchWeatherForecast = async () => {
      const response = await axios.post("/weatherAtCoords/forecast/", {
        lat: startingLat,
        long: startingLong
      });
      setWeatherForecastData(response.data.timelines[0].intervals);
    };
    fetchWeatherForecast();
  }, [startingLat, startingLong]);

  return (
    <Card className={isOpen ? styling.rootExpanded : styling.root}>
      <Fab
        className={styling.fab}
        variant="extended"
        size="medium"
        color="primary"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <Box>Show less</Box> : <Box>Show more</Box>}
      </Fab>
      <Paper square>
        <Tabs
          className={styling.weatherTabs}
          value={tab}
          indicatorColor="primary"
          onChange={switchTab}
        >
          <Tab label="Weather at Starting Location"/>
          <Tab label="Weather at Destination" disabled={!destinationWeather.isTabEnabled} />
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
                  temperature={currentWeather.temperature}
                  temperatureApparent={currentWeather.temperatureApparent}
                  weatherCode={currentWeather.weatherCode}
                  time={"current"}
                />
              </Grid>
              <Grid item xs={6}>
                <ClothingSuggestions
                  weatherCode={currentWeather.weatherCode}
                  currentTemperature={currentWeather.temperature}
                />
              </Grid>
            </Grid>
            {isOpen && (
              <Grid item xs={12}>
                <SevenDayForecast intervals={weatherForecastData} />
              </Grid>
            )}
          </Grid>
        </CardContent>
      </TabPanel>
      <TabPanel value={tab} index={1}>
        {/* Content for destination weather */}
      </TabPanel>
    </Card>
  );
}

export default WeatherCard;
