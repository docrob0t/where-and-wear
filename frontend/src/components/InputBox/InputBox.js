import { Card, Grid, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "../../axios";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import DriveEtaRoundedIcon from "@material-ui/icons/DriveEtaRounded";
import DirectionsWalkRoundedIcon from "@material-ui/icons/DirectionsWalkRounded";
import DirectionsBikeRoundedIcon from "@material-ui/icons/DirectionsBikeRounded";

const cardStyles = makeStyles((theme) => ({
  root: {
    width: "24rem",
    height: "14rem",
    left: 35,
    position: "absolute",
    top: 20,
    borderRadius: 20,
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.3)"
  },
  Subtitle: {
    fontSize: 15,
    top: 230,
    position: 'absolute',
  },
  form: {
    margin: theme.spacing(2),
    marginTop: theme.spacing(1),
    paddingTop: theme.spacing(1)
  }
}));

function InputBox({ setStartingPoint, setDestination }) {
  const classes = cardStyles();
  const [startName, setStartName] = useState("");
  const [startCoords, setStartCoords] = useState({
    lat: undefined,
    long: undefined
  });
  const [destinationName, setDestinationName] = useState("");
  const [destinationCoords, setDestinationCoords] = useState({
    lat: undefined,
    long: undefined
  });
  const [mode, setMode] = useState("driving");
  const [travelTime, setTravelTime] = useState();
  const [arrivalTime, setArrivalTime] = useState(new Date());

  // Gets the coordinates of the starting location
  function getStartCoordinates() {
    axios
      .get("/retrieveCoordsFromLocation/", {
        params: {
          search: startName
        }
      })
      .then((response) =>
        setStartCoords({
          ...startCoords,
          long: response.data.long,
          lat: response.data.lat
        })
      );
  }

  // Gets the coordinates of the destination
  function getDestinationCoordinates() {
    axios
      .get("/retrieveCoordsFromLocation/", {
        params: {
          search: destinationName
        }
      })
      .then((response) =>
        setDestinationCoords({
          ...destinationCoords,
          long: response.data.long,
          lat: response.data.lat
        })
      );
  }

  // Gets the duration between the starting location and destination
  function getDuration() {
    axios
      .get("/retrieveDuration/", {
        params: {
          profile: mode,
          startlong: startCoords.long,
          startlat: startCoords.lat,
          destinationlong: destinationCoords.long,
          destinationlat: destinationCoords.lat
        }
      })
      .then((response) => setTravelTime(response.data.duration));
  }

  useEffect(() => {
    // If origin or destination is empty don't get duration
    if (startName && destinationName) {
      getDuration();
    }
  }, [startCoords, destinationCoords, mode]);

  // Get start location's coordinates on each keystroke
  useEffect(() => {
    if (startName !== "") {
      getStartCoordinates();
    }
  }, [startName]);

  // Get destination location's coordinates on each keystroke
  useEffect(() => {
    if (destinationName !== "") {
      getDestinationCoordinates();
    }
  }, [destinationName]);

  // Adds the journey duration to the current time
  useEffect(() => {
    function calculateArrivalTime() {
      let now = new Date();
      let arrivalTime = new Date();
      let nowInMS = now.getTime();
      console.log("The duration is " + travelTime);
      nowInMS = nowInMS + travelTime * 1000;
      arrivalTime.setTime(nowInMS);
      setArrivalTime(arrivalTime);
      console.log("The Arrival Time is " + arrivalTime);
    
     
    }

    calculateArrivalTime();
  }, [travelTime]);

  function calculateTime(d) {
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


  // If user clicked enter, also treat as submit
  function handleKeyPress(event) {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  }

  function handleModeOfTransport(event, newModeOfTransport) {
    // Enforce at least one button to be active
    if (newModeOfTransport !== null) {
      setMode(newModeOfTransport);
    }
  }

  // When user clicked mode of transport button the page will not refresh
  function handleSubmit(event) {
    event.preventDefault();
    getStartCoordinates();
    getDestinationCoordinates();
    setStartingPoint(startCoords);
    setDestination(destinationCoords);
  }

  return (
    <Card className={classes.root}>
      <form
        className={classes.form}
        onSubmit={handleSubmit}
        onKeyPress={handleKeyPress}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              id="starting-search"
              label="Starting Location"
              type="search"
              variant="outlined"
              fullWidth
              value={startName}
              onInput={(event) => setStartName(event.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="destination-search"
              type="search"
              variant="outlined"
              label="Destination"
              fullWidth
              value={destinationName}
              onInput={(event) => setDestinationName(event.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <ToggleButtonGroup
              value={mode}
              exclusive
              onChange={handleModeOfTransport}
              aria-label="Mode of transport"
            >
              <ToggleButton type="submit" value="driving" aria-label="driving">
                <DriveEtaRoundedIcon />
              </ToggleButton>
              <ToggleButton type="submit" value="walking" aria-label="walking">
                <DirectionsWalkRoundedIcon />
              </ToggleButton>
              <ToggleButton type="submit" value="cycling" aria-label="cycling">
                <DirectionsBikeRoundedIcon />
              </ToggleButton>
              <Typography align = 'center' variant = "subtitle2">
              <Box fontWeight="fontWeightBold" lineHeight={1}>
                  {"Duration: "}
                </Box>
                <Box m={0.5} lineHeight={1.1}>
                {calculateTime(travelTime)}
                </Box>
              </Typography>                           
            </ToggleButtonGroup>
          </Grid>
          </Grid>
      </form>
    </Card>
  );
}

export default InputBox;
