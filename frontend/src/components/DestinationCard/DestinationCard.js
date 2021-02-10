import { Button, ButtonGroup, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
//import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

// Card styling constants
const cardStyles = makeStyles({
  root: {
    minWidth: 375,
    minHeight: 190,
    width: '15%',
    height: '20%',
    left: 35,
    position: 'absolute',
    top: 20,
    borderRadius: 15,
    transition: '0.5s ease-in-out',
  },
  Title: {
    fontsize: 20,
    top: '5%',
    postion: 'absolute',
  },
  searchButton: {
    position: 'absolute',
    top: 145,
    left: 16,
    fontFamily: 'Calibri',
    fontWeight: 600,
    width: 344,
  },
  FirstBox: {
    top: 15,
    position: 'absolute',
    margin: 'normal',
    width: 343,
  },
  SecondBox: {
    top: 80,
    position: 'absolute',
    margin: 'normal',
    width: 343,
  },
  TransportButtons: {
    top: 190,
    position: 'absolute',
    width: 344,
    color: 'secondary',
  },
  TButton: {
    fontFamily: 'Calibri',
    fontWeight: 600,
    width: '33.33333%',
  },
  Subtitle: {
    fontSize: 15,
    top: 230,
    position: 'absolute',
  },
  CurrentTemperature: {
    top: 270,
    position: 'absolute',
  },
  rootExpanded: {
    minWidth: 375,
    minHeight: 380,
    width: '15%',
    height: '20%',
    left: 35,
    position: 'absolute',
    top: 20,
    borderRadius: 15,
    transition: '0.5s ease-in-out',
  }
});

function DestinationCard() {
  const styling = cardStyles();
  //const [currentTemp, setCurrentTemp] = useState([]);
  //const [currentWeatherCode, setCurrentWeatherCode] = useState([]);
  const [startingLocation, setStartingLocation] = useState([]);
  const [destinationLocation, setDestinationLocation] = useState([]);
  const [travelTime, setTravelTime] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // Gets the coordinates of the starting location
  function getStart() {
    console.log('Start location is: ' + startingLocation);

    axios
    .get("/retrieveCoordsFromLocation/", {
      params: {
        search: startingLocation,
      }
    })
    .then((response) =>
      setStartingLocation({ ...startingLocation, startlong: response.data.long, startlat: response.data.lat, })
    );
  };

// Gets the coordinates of the destination
  function getDestination() {
    console.log('Destination location is: ' + destinationLocation);

    axios
    .get("/retrieveCoordsFromLocation/", {
      params: {
        search: destinationLocation,
      }
    })
    .then((response) =>
      setDestinationLocation({ ...destinationLocation, destinationlong: response.data.long, destinationlat: response.data.lat, })
    );
  };

  // Gets the duration between the starting location and destination
  function getTime(mode) {
    console.log(startingLocation);
    console.log("Starting Location Coordinates are: " + startingLocation.startlong + "," + startingLocation.startlat);
    console.log("Destination Coordinates are: " + destinationLocation.destinationlong + "," + destinationLocation.destinationlat);

    axios
    .get("/retrieveDuration/", {
      params: {
        profile: mode,
        startlong: startingLocation.startlong,
        startlat: startingLocation.startlat,
        destinationlong: destinationLocation.destinationlong,
        destinationlat: destinationLocation.destinationlat,
      }
    })
    .then((response) =>
    setTravelTime({ ...travelTime, currentduration: response.data.duration, })
    );

    //calculateTime(travelTime.currentduration);
  };

  function calculateTime() {
  
    // TODO: Format and display the time on the card

  };

  // Submits the text fields and sets the state
  function handleSubmit() {
    setStartingLocation(startingLocation);
    setDestinationLocation(destinationLocation);
    getStart();
    getDestination();
  };

  return (
    <Card className={isOpen ? styling.rootExpanded : styling.root}>
      <CardActions>
      <Button size="small" onClick={() => {setIsOpen(!isOpen); handleSubmit();}} className={styling.searchButton} variant="contained" color="primary">Search</Button>

      <ButtonGroup className={styling.TransportButtons} variant="contained" color="secondary" aria-label="contained primary button group">
        <Button size="small" onClick={() => {getTime("driving");}} className={styling.TButton}>Car</Button>
        <Button size="small" onClick={() => {getTime("walking");}} className={styling.TButton}>Walking</Button>
        <Button size="small" onClick={() => {getTime("cycling");}} className={styling.TButton}>Cycling</Button>
      </ButtonGroup>

      </CardActions>
      <CardContent>
        <TextField
          className={styling.FirstBox}
          id="starting-search"
          label="Starting Location"
          type="search"
          variant="outlined"
          onChange={(e) => setStartingLocation(e.target.value)}
        />

        <TextField
          className={styling.SecondBox}
          id="destination-search"
          type="search"
          variant="outlined"
          label="Destination"
          onChange={(e) => setDestinationLocation(e.target.value)}
        />

      </CardContent>
    </Card>
  );
}

export default DestinationCard;
