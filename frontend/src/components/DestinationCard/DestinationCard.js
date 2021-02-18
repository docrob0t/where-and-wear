import { Button, ButtonGroup, Grid, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import DestinationWeatherInfo from "./DestinationWeatherInfo";

// Card styling constants - will be using a grid in the near future
const cardStyles = makeStyles((theme) => ({
  root: {
    minWidth: 375,
    minHeight: 210,
    width: "15%",
    height: "20%",
    left: 35,
    position: "absolute",
    top: 20,
    borderRadius: 15,
    transition: "0.5s ease-in-out"
  },
  searchButton: {
    fontFamily: 'Calibri',
    fontWeight: 600,
    left: 9
  },
  closeButton: {
    position: "absolute",
    top: "14rem",
    right: 16,
    fontWeight: 600
  },
  FirstBox: {
    margin: "normal",
    width: 343,
  },
  SecondBox: {
    margin: "normal",
    width: 343,
    top: 10
  },
  TButton: {
    fontFamily: 'Calibri',
    fontWeight: 600,
    left: 9
  },
  rootExpanded: {
    minWidth: 375,
    minHeight: 520,
    width: "15%",
    height: "40%",
    left: 35,
    position: "absolute",
    top: 20,
    borderRadius: 15,
    transition: "0.5s ease-in-out"
  }
}));

function DestinationCard() {
  const styling = cardStyles();
  const [startingLocation, setStartingLocation] = useState({
    name: "",
    long: 0,
    lat: 0,
  });
  const [destinationLocation, setDestinationLocation] = useState({
    name: "",
    long: 0,
    lat: 0,
  });
  const [travelTime, setTravelTime] = useState({
    currentduration: 0,
  });
  const [arrivalTime, setArrivalTime] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);

  // Gets the coordinates of the starting location
  function getStartCoordinates() {
    console.log('Start location is: ' + startingLocation.name);

    axios
      .get("/retrieveCoordsFromLocation/", {
        params: {
          search: startingLocation.name,
        }
      })
      .then((response) =>
        setStartingLocation({ ...startingLocation, long: response.data.long, lat: response.data.lat, })
      );
  };

  // Gets the coordinates of the destination
  function getDestinationCoordinates() {
    console.log('Destination location is: ' + destinationLocation.name);

    axios
      .get("/retrieveCoordsFromLocation/", {
        params: {
          search: destinationLocation.name,
        }
      })
      .then((response) =>
        setDestinationLocation({ ...destinationLocation, long: response.data.long, lat: response.data.lat, })
      );
  };

  // Gets the duration between the starting location and destination
  function getDuration(mode) {
    console.log("Starting Location Coordinates are: " + startingLocation.long + "," + startingLocation.lat);
    console.log("Destination Coordinates are: " + destinationLocation.long + "," + destinationLocation.lat);

    axios
      .get("/retrieveDuration/", {
        params: {
          profile: mode,
          startlong: startingLocation.long,
          startlat: startingLocation.lat,
          destinationlong: destinationLocation.long,
          destinationlat: destinationLocation.lat,
        }
      })
      .then((response) =>
        setTravelTime({ ...travelTime, currentduration: response.data.duration, })
      );
  };

 // Adds the journey duration to the current time
  useEffect(() => {
    function calculateArrivalTime() {
      let now = new Date();
      let arrivalTime = new Date();
      let nowInMS = now.getTime();
      console.log("The duration is " + travelTime.currentduration);
      nowInMS = nowInMS + travelTime.currentduration * 1000;
      arrivalTime.setTime(nowInMS);
      setArrivalTime(arrivalTime);
      console.log("The Arrival Time is " + arrivalTime);
    }

    calculateArrivalTime();
  }, [travelTime.currentduration]);

  // Submits the text fields and sets the values in the textfields as the names
  function handleSubmit() {
    let start = document.getElementById("starting-search").value;
    startingLocation.name = start;
    let destination = document.getElementById("destination-search").value;
    destinationLocation.name = destination;
    getStartCoordinates();
    getDestinationCoordinates();
  }

  return (
    <Card className={isOpen ? styling.rootExpanded : styling.root}>
      <Grid Container>
        <Button
          variant="contained"
          size="small"
          onClick={() => {
            setIsOpen(false);
          }}
          className={styling.closeButton}
        >
          ▲ Close
        </Button>

        <CardContent>
          <Grid Item>
            <TextField
              className={styling.FirstBox}
              id="starting-search"
              label="Starting Location"
              type="search"
              variant="outlined"
              onChange={(e) => setStartingLocation(e.target.value)}
            />
          </Grid>

          <Grid Item>
            <TextField
              className={styling.SecondBox}
              id="destination-search"
              type="search"
              variant="outlined"
              label="Destination"
              /*onChange={(e) => setDestinationLocation(e.target.value)}*/
            />
          </Grid>
        </CardContent>

        <CardActions>
          <Grid Item>
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={() => {
                handleSubmit();
              }}
              className={styling.searchButton}
            >
              Search
            </Button>
          </Grid>

          <Grid Item>
            <Button
              id="driving"
              size="small"
              variant="contained"
              color="secondary"
              onClick={() => { setIsOpen(true); getDuration("driving"); }}
              className={styling.TButton}>
              Car
            </Button>
          </Grid>

          <Grid Item>
            <Button
              id="walking"
              size="small"
              variant="contained"
              color="secondary"
              onClick={() => { setIsOpen(true); getDuration("walking"); }}
              className={styling.TButton}>
              Walking
            </Button>
          </Grid>
          
          <Grid Item>
            <Button
              id="cycling"
              size="small"
              variant="contained"
              color="secondary"
              onClick={() => { setIsOpen(true); getDuration("cycling"); }}
              className={styling.TButton}>
              Cycling
            </Button>
          </Grid>
        </CardActions>
        <CardContent>
          <DestinationWeatherInfo
            lat={destinationLocation.lat}
            long={destinationLocation.long}
            arrivalTime={arrivalTime}
          />
        </CardContent>
      </Grid>
    </Card>
  );
}

export default DestinationCard;
