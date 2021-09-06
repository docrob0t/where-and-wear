import {
  Box,
  Card,
  CardContent,
  Fab,
  Grid,
  makeStyles,
  Tab,
  Tabs,
  withStyles
} from "@material-ui/core";
import dateFormat from "dateformat";
import React, { useEffect, useState } from "react";
import axios from "../../axios";

import ClothingSuggestions from "../ClothingSuggestions/ClothingSuggestions";
import SevenDayForecast from "../SevenDayForecast/SevenDayForecast";
import WeatherInfo from "../WeatherInfo/WeatherInfo";

const StyledTabs = withStyles({
  indicator: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    "& > span": {
      width: "92%",
      backgroundColor: "#635ee7"
    }
  }
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    fontSize: "1rem",
    padding: "1rem 0.6rem 0.2rem 0.6rem",
    "&:hover": {
      color: "#635ee7",
      opacity: 1
    }
  }
}))((props) => <Tab disableRipple {...props} />);
// Card styling constants
const cardStyles = makeStyles((theme) => ({
  root: {
    width: "46rem",
    height: "13rem",
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
    top: theme.spacing(1.5),
    right: theme.spacing(1.5),
    textTransform: "none"
  },
  weatherTabs: {
    width: "30rem",
    marginLeft: "0.4rem"
  },
  cardContent: {
    paddingTop: "0.5rem"
  }
}));

function TabPanel(props) {
  const { children, value, index } = props;
  return <div>{value === index && <Box p={0}>{children}</Box>}</div>;
}

function useCityName(lat, long) {
  const [city, setCity] = useState("");

  useEffect(() => {
    const getCityName = async () => {
      await axios
        .post("/mapbox/reverseGeocoding", {
          lat: lat,
          long: long
        })
        .then((response) => {
          setCity(response.data.location);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getCityName();
  }, [lat, long]);

  return city;
}

function useForecastData(lat, long) {
  const [weatherForecastData, setWeatherForecastData] = useState([]);

  useEffect(() => {
    const fetchWeatherForecast = async (lat, long) => {
      await axios
        .post("/weather/7DayForecast", {
          lat: lat,
          long: long
        })
        .then((response) => {
          setWeatherForecastData(response.data.timelines[0].intervals);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    fetchWeatherForecast(lat, long);
  }, [lat, long]);

  return weatherForecastData;
}

// WeatherCard() function returns a weather card overlay
function WeatherCard({
  lat: startingLat,
  long: startingLong,
  destinationLat,
  destinationLong,
  arrivalTime
}) {
  const styling = cardStyles();
  const [isOpen, setIsOpen] = useState(false);

  // Starting location weather states
  const [currentStartingWeather, setCurrentStartingWeather] = useState({
    temperature: 0,
    temperatureApparent: 0,
    weatherCode: 1000
  });
  const startingWeatherForecastData = useForecastData(startingLat, startingLong);
  const startingCity = useCityName(startingLat, startingLong);

  // Destination location weather states
  const [destinationWeatherAtArrival, setDestinationWeatherAtArrival] = useState({
    temperature: 0,
    temperatureApparent: 0,
    weatherCode: 1000,
    isTabEnabled: false
  });
  const destinationWeatherForecastData = useForecastData(destinationLat, destinationLong);
  const destinationCity = useCityName(destinationLat, destinationLong);

  // Handling tabs in weather card
  const [tab, setTab] = React.useState(0);

  const switchTab = (event, newTab) => {
    setTab(newTab);
  };

  // API call to fetch current weather at user's location
  useEffect(() => {
    const fetchStartingLocationWeather = async () => {
      await axios
        .post("/weather/current", {
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
        .post("/weather/destination", {
          lat: destinationLat,
          long: destinationLong,
          journeyArrivalTime: arrivalTime
        })
        .then((response) => {
          setDestinationWeatherAtArrival({
            ...destinationWeatherAtArrival,
            temperature: response.data.timelines[0].intervals[0].values.temperature,
            temperatureApparent: response.data.timelines[0].intervals[0].values.temperatureApparent,
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

  return (
    <Card className={isOpen ? styling.rootExpanded : styling.root}>
      <Fab
        className={styling.fab}
        variant="extended"
        size="medium"
        color="primary"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <Box>Hide forecast</Box> : <Box>Show forecast</Box>}
      </Fab>

      <StyledTabs
        className={styling.weatherTabs}
        value={tab}
        indicatorColor="primary"
        textColor="primary"
        onChange={switchTab}
      >
        <StyledTab label="Starting location weather" />
        <StyledTab
          label="Destination weather"
          disabled={!destinationWeatherAtArrival.isTabEnabled}
        />
      </StyledTabs>

      <TabPanel value={tab} index={0}>
        <CardContent className={styling.cardContent}>
          <Grid container direction="column">
            <Grid item xs={12} container direction="row">
              <Grid item xs={6}>
                <WeatherInfo
                  city={startingCity}
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
        <CardContent className={styling.cardContent}>
          <Grid container direction="column">
            <Grid item xs={12} container direction="row">
              <Grid item xs={6}>
                <WeatherInfo
                  city={destinationCity}
                  temperature={destinationWeatherAtArrival.temperature}
                  temperatureApparent={destinationWeatherAtArrival.temperatureApparent}
                  weatherCode={destinationWeatherAtArrival.weatherCode}
                  time={
                    arrivalTime instanceof Date && !isNaN(arrivalTime)
                      ? dateFormat(arrivalTime, "h:MM TT")
                      : ""
                  }
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
