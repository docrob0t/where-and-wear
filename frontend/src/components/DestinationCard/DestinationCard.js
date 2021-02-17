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
    fontWeight: 600,
    width: 344
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
    padding: 2
  },
  SecondBox: {
    margin: "normal",
    width: 343,
    padding: 2
  },
  TransportButtons: {
    width: 344,
    color: "secondary",
    direction: "row"
  },
  TButton: {
    fontWeight: 600
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
    long: 0,
    lat: 0,
  });
  const [destinationLocation, setDestinationLocation] = useState({
    long: 0,
    lat: 0,
  });
  const [travelTime, setTravelTime] = useState({
    currentduration: 0,
  });
  const [arrivalTime, setArrivalTime] = useState(new Date());
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
        setStartingLocation({ ...startingLocation, long: response.data.long, lat: response.data.lat, })
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
        setDestinationLocation({ ...destinationLocation, long: response.data.long, lat: response.data.lat, })
      );
  };

  // Gets the duration between the starting location and destination
  function getDuration(mode) {
    console.log(startingLocation);
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
  }

  useEffect(() => {
    // Adds the journey duration to the current time
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

  // Submits the text fields and sets the state
  function handleSubmit() {
    //setStartingLocation(startingLocation);
    //setDestinationLocation(destinationLocation);
    getStart();
    getDestination();
  }

  return (
    <Card className={isOpen ? styling.rootExpanded : styling.root}>
      <Grid Container>
        <Button
          variant="outlined"
          size="small"
          color="secondary"
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
              onChange={(e) => setDestinationLocation(e.target.value)}
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
            <ButtonGroup
              variant="contained"
              color="secondary"
              aria-label="contained primary button group"
              className={styling.TransportButtons}
            >
              <Button
                size="small"
                onClick={() => { setIsOpen(true); getDuration("driving"); }}
                className={styling.TButton}>
                Car
              </Button>

              <Button
                size="small"
                onClick={() => { setIsOpen(true); getDuration("walking"); }}
                className={styling.TButton}>
                Walking
              </Button>

              <Button
                size="small"
                onClick={() => { setIsOpen(true); getDuration("cycling"); }}
                className={styling.TButton}>
                Cycling
              </Button>
            </ButtonGroup>
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
