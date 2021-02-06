import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { Button, ButtonGroup, TextField } from "@material-ui/core";
import axios from "../axios";
import { makeStyles } from "@material-ui/core/styles";
import getIconFromWeatherCode from "./common/WeatherIcon";

// Card styling constants
const cardStyles = makeStyles({
  root: {
    minWidth: 375,
    minHeight: 190,
    width: "15%",
    height: "20%",
    left: 35,
    position: "absolute",
    top: 20,
    borderRadius: 15,
    transition: "0.5s ease-in-out",
  },
  Title: {
    fontsize: 20,
    top: "5%",
    postion: "absolute",
  },
  searchButton: {
    position: "absolute",
    top: 145,
    left: 16,
    fontFamily: "Calibri",
    fontWeight: 600,
    width: 344,
  },
  FirstBox: {
    top: 15,
    position: "absolute",
    margin: "normal",
    width: 343,
  },
  SecondBox: {
    top: 80,
    position: "absolute",
    margin: "normal",
    width: 343,
  },
  TransportButtons: {
    top: 190,
    position: "absolute",
    width: 344,
    color: "secondary",
  },
  TButton: {
    fontFamily: "Calibri",
    fontWeight: 600,
    width: "33.33333%",
  },
  Subtitle: {
    fontSize: 15,
    top: 230,
    position: "absolute",
  },
  CurrentTemperature: {
    top: 270,
    position: "absolute",
  },
  rootExpanded: {
    minWidth: 375,
    minHeight: 380,
    width: "15%",
    height: "20%",
    left: 35,
    position: "absolute",
    top: 20,
    borderRadius: 15,
    transition: "0.5s ease-in-out",
  },
});

function calculateTime() {
  //var date = new Date(null);
  //date.setSeconds(SECONDS);  ...specify value for SECONDS here
  //var result = date.toISOString().substr(11, 8);
}

function OutputCard(props) {
  const styling = cardStyles();
  const [currentTemp, setCurrentTemp] = React.useState([]);
  const [currentWeatherCode, setCurrentWeatherCode] = React.useState([]);
  //const [startingLocation, setStartingLocation] = React.useState("");
  //const [destinationSaved, setDestinationSaved] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    async function fetchWeather() {
      try {
        const response = await axios.post("/weatheratcoords/", {
          lat: props.lat,
          long: props.long,
        });
        setCurrentTemp(
          response.data.timelines[0].intervals[0].values.temperature
        );
        setCurrentWeatherCode(
          response.data.timelines[0].intervals[0].values.weatherCode
        );
        return response;
      } catch (e) {
        // TODO: Handle error properly
        console.log("Caught error: ", e);
      }
    }

    fetchWeather();
  }, [props.lat, props.long]);

  function handleSubmit() {
    var destination = document.getElementById("destination-search").value;
    var startinglocation = document.getElementById("starting-search").value;
    //alert('The Destination is ' + destination + ' and the Starting Location is ' + startinglocation);
    console.log(
      "Starting Location :",
      startinglocation,
      "Destination :",
      destination
    );
    // TODO: Use these variables to find the most relevant coordinates
  }

  return (
    <Card className={isOpen ? styling.rootExpanded : styling.root}>
      <CardActions>
        <Button
          size="small"
          onClick={() => {
            setIsOpen(!isOpen);
            handleSubmit();
          }}
          className={styling.searchButton}
          variant="contained"
          color="primary"
        >
          Search
        </Button>

        <ButtonGroup
          className={styling.TransportButtons}
          variant="contained"
          color="secondary"
          aria-label="contained primary button group"
        >
          <Button size="small" className={styling.TButton}>
            Car
          </Button>
          <Button size="small" className={styling.TButton}>
            Walking
          </Button>
          <Button size="small" className={styling.TButton}>
            Cycling
          </Button>
        </ButtonGroup>
      </CardActions>
      <CardContent>
        <TextField
          className={styling.FirstBox}
          id="starting-search"
          label="Starting Location"
          type="search"
          variant="outlined"
          //value={startingLocation} onInput={ e=>setStartingLocation(e.target.value)}
        />

        <TextField
          className={styling.SecondBox}
          id="destination-search"
          label="Destination"
          type="search"
          variant="outlined"
          //value={destinationSaved} onInput={ e=>setDestinationSaved(e.target.value)}
        />

        <Typography className={styling.CurrentTemperature}>
          {getIconFromWeatherCode(currentWeatherCode).text}
          {Math.round(currentTemp)}°c
        </Typography>

        <Typography className={styling.Subtitle} color="textSecondary">
          Estimated Time of Arrival:
        </Typography>
      </CardContent>
    </Card>
  );
}

export default OutputCard;
