import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import React from "react";
import Typography from "@material-ui/core/Typography";
import axios from "../axios";
import { makeStyles } from "@material-ui/core/styles";
import getIconFromWeatherCode from "./common/WeatherIcon";

// Card styling constants
const cardStyles = makeStyles({
  root: {
    minWidth: 375,
    minHeight: 300,
    width: "15%",
    height: "25%",
    margin: 35,
    position: "absolute",
    bottom: 5,
    borderRadius: 25,
    transition: "0.5s ease-in-out",
  },
  moreDetails: {
    position: "absolute",
    right: 15,
    top: 15,
    fontFamily: "Calibri",
    fontWeight: 600,
  },
  Title: {
    fontSize: 20,
    top: "5%",
    position: "absolute",
  },
  SecondTitle: {
    fontSize: 20,
    top: "15%",
    position: "absolute",
  },
  ThirdTitle: {
    fontSize: 20,
    top: "65%",
    position: "absolute",
  },
  CurrentTemperature: {
    top: "28%",
    position: "absolute",
  },
  ClothingSuggestions: {
    fontSize: 16,
    top: "75%",
    position: "absolute",
  },
  SevenDayForecastDate: {
    fontFamily: "Calibri",
    marginTop: 40,
    marginLeft: 360,
    wordSpacing: 12,
  },
  SevenDayForecastTemp: {
    fontFamily: "Calibri",
    marginLeft: 390,
    wordSpacing: 40,
  },
  SevenDayForecastIcon: {
    marginLeft: 360,
    wordSpacing: 12,
  },
  rootExpanded: {
    minWidth: 1175,
    minHeight: 350,
    width:"60%"",
    height:"25%"",
    margin: 35,
    position:"absolute"",
    bottom: 5,
    borderRadius: 25,
    transition:"0.5s ease-in-out",
  },
});

let forecast = [
  { Date: '', Temperature: 0, WeatherCode: 0 },
  { Date: '', Temperature: 0, WeatherCode: 0 },
  { Date: '', Temperature: 0, WeatherCode: 0 },
  { Date: '', Temperature: 0, WeatherCode: 0 },
  { Date: '', Temperature: 0, WeatherCode: 0 },
  { Date: '', Temperature: 0, WeatherCode: 0 },
  { Date: '', Temperature: 0, WeatherCode: 0 },
]

function findDateSuffix(d) {
  switch (d % 10) {
    case 1:  return "st";
    case 2:  return "nd";
    case 3:  return "rd";
    default: return "th";
  }
}

function populateForecastArray(params) {
  var i = 0;
  params.slice(1, 8).forEach(function (forecasts) {
    var dateFormat = require("dateformat");
    // Date represented as 'Saturday, June 9, 2007'
    var convertedDate = dateFormat(forecasts.startTime, "fullDate");

    // Translates to an array ["Saturday", "June 9", "2007"]
    var splitConvertedDate = convertedDate.split(",");

    // Translates to an array [" ", "June", "9"]
    var splitConvertedDateFurther = splitConvertedDate[1].split(" ");

    var dateSuffix = findDateSuffix(splitConvertedDateFurther[2]);

    // Format date in the style of "Saturday 9th"
    var finalDate = splitConvertedDate[0] + ',' + splitConvertedDateFurther[2] + dateSuffix;
    var thisTemperature = forecasts.values.temperature;
    var thisWeatherCode = forecasts.values.weatherCode;

    forecast[i].Date = finalDate;
    forecast[i].Temperature = thisTemperature;
    forecast[i].WeatherCode = thisWeatherCode;
    i++;
  });
}

// WeatherCard() function returns a weather card overlay
function WeatherCard(props) {
  const styling = cardStyles();
  const [currentTemp, setCurrentTemp] = React.useState([]);
  const [currentWeatherCode, setCurrentWeatherCode] = React.useState([]);
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    async function fetchWeather() {
      try {
        const response = await axios.post('/weatheratcoords/', {
          lat: props.lat,
          long: props.long
        })
        setCurrentTemp(response.data.timelines[0].intervals[0].values.temperature);
        setCurrentWeatherCode(response.data.timelines[0].intervals[0].values.weatherCode);
        populateForecastArray(response.data.timelines[0].intervals);
        return response;
      }
      catch (e) {
        // TODO: Handle error properly
        console.log('Caught error: ', e);
      }
    };

    fetchWeather();
  }, [props.lat, props.long]);

  return (
    <Card className={isOpen ? styling.rootExpanded : styling.root}>
      <CardActions>
        <Button size="small" onClick={() => setIsOpen(!isOpen)} className={styling.moreDetails}>{isOpen ? 'Less Details' : 'More Details'}</Button>
      </CardActions>

      <CardContent>
        <Typography className={styling.Title}>
          {props.city}
        </Typography>

        <Typography className={styling.SecondTitle} color="textSecondary">
          Today's Forecast
        </Typography>

        <Typography className={styling.CurrentTemperature}>
          {getIconFromWeatherCode(currentWeatherCode).text}
          {Math.round(currentTemp)}°c
        </Typography>

        <Typography className={styling.SevenDayForecastDate}>
          {forecast[0].Date} &nbsp;
          {forecast[1].Date} &nbsp;
          {forecast[2].Date} &nbsp;
          {forecast[3].Date} &nbsp;
          {forecast[4].Date} &nbsp;
          {forecast[5].Date} &nbsp;
          {forecast[6].Date} &nbsp;
        </Typography>

        <Typography className={styling.SevenDayForecastIcon}>
          {getIconFromWeatherCode(forecast[0].WeatherCode).icon} &nbsp;
          {getIconFromWeatherCode(forecast[1].WeatherCode).icon} &nbsp;
          {getIconFromWeatherCode(forecast[2].WeatherCode).icon} &nbsp;
          {getIconFromWeatherCode(forecast[3].WeatherCode).icon} &nbsp;
          {getIconFromWeatherCode(forecast[4].WeatherCode).icon} &nbsp;
          {getIconFromWeatherCode(forecast[5].WeatherCode).icon} &nbsp;
          {getIconFromWeatherCode(forecast[6].WeatherCode).icon} &nbsp;
        </Typography>

        <Typography className={styling.SevenDayForecastTemp}>
          {Math.round(forecast[0].Temperature)}°c &nbsp;
          {Math.round(forecast[1].Temperature)}°c &nbsp;
          {Math.round(forecast[2].Temperature)}°c &nbsp;
          {Math.round(forecast[3].Temperature)}°c &nbsp;
          {Math.round(forecast[4].Temperature)}°c &nbsp;
          {Math.round(forecast[5].Temperature)}°c &nbsp;
          {Math.round(forecast[6].Temperature)}°c &nbsp;
        </Typography>

        <Typography className={styling.ThirdTitle} gutterBottom>
          Clothing Suggestions
        </Typography>

        <Typography className={styling.ClothingSuggestions} color="textSecondary">
          Coming Soon!
        </Typography>
      </CardContent>
    </Card>
  );
}

export default WeatherCard;
