import { Button, ButtonGroup, TextField, Grid, Typography, Fab } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

// Card styling constants - will be using a grid in the near future
const cardStyles = makeStyles({
  root: {
    minWidth: 375,
    minHeight: 230,
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
    top: 260,
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
  closeButton: {
    position: 'absolute',
    top: 448,
    right: 16,
    fontFamily: 'Calibri',
    fontWeight: 600,
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
    top: 185,
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
  SubtitleTwo: {
    fontSize: 17,
    top: 250,
    position: 'absolute',
  },
  CurrentTemperature: {
    top: 270,
    position: 'absolute',
  },
  rootExpanded: {
    minWidth: 375,
    minHeight: 490,
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
  const [currentWeather, setCurrentWeather] = useState({
    temperature: 0,
    temperatureApparent: 0,
    weatherCode: 1000
  });
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
  };

  // Formats the duration and returns it to the card
  function calculateTime(d) {
    //console.log("The duration is " + travelTime.currentduration);
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    var hmsDisplay = hDisplay + mDisplay + sDisplay;
    return hmsDisplay; 
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
      <Button 
       size="small" 
       variant="contained" 
       color="primary"
       onClick={() => {handleSubmit();}} 
       className={styling.searchButton}>
        Search
      </Button>

      <ButtonGroup 
        variant="contained" 
        color="secondary" 
        aria-label="contained primary button group"
        className={styling.TransportButtons}>

        <Button 
         size="small" 
         onClick={() => {setIsOpen(true); getTime("driving");}} 
         className={styling.TButton}>
           Car
         </Button>

        <Button 
         size="small" 
         onClick={() => {setIsOpen(true); getTime("walking");}} 
         className={styling.TButton}>
          Walking
        </Button>

        <Button 
         size="small" 
         onClick={() => {setIsOpen(true); getTime("cycling");}} 
         className={styling.TButton}>
           Cycling
        </Button>
      </ButtonGroup>

      <Button 
      variant="outlined"
      size="small" 
      color="secondary"
      onClick={() => {setIsOpen(false);}} 
      className={styling.closeButton}>
        ▲ Close
      </Button>

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

        <Typography className={styling.Subtitle} ariant="subtitle1" align="center">
          Estimated time of arrival:
        </Typography>

        <Typography className={styling.SubtitleTwo}>
         {calculateTime(travelTime.currentduration)}
        </Typography>

      </CardContent>
    </Card>
  );
}

export default DestinationCard;
