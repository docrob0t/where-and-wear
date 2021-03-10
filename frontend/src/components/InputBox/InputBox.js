import { Box, Card, Grid, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";

import DirectionsBikeRoundedIcon from "@material-ui/icons/DirectionsBikeRounded";
import DirectionsWalkRoundedIcon from "@material-ui/icons/DirectionsWalkRounded";
import DriveEtaRoundedIcon from "@material-ui/icons/DriveEtaRounded";
import axios from "../../axios";
import { makeStyles } from "@material-ui/core/styles";
import prettyMilliseconds from "pretty-ms";

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
  form: {
    margin: theme.spacing(2),
    marginTop: theme.spacing(1),
    paddingTop: theme.spacing(1)
  }
}));

function InputBox({ setStartingPoint, setDestination, setArrivalTime }) {
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
      .then((response) => setTravelTime(response.data.duration * 1000));
  }

  // Get start location's coordinates on each keystroke
  useEffect(() => {
    if (startName !== "") {
      getStartCoordinates();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startName]);

  // Get destination location's coordinates on each keystroke
  useEffect(() => {
    if (destinationName !== "") {
      getDestinationCoordinates();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [destinationName]);

  // Adds the journey duration to the current time
  useEffect(() => {
    function calculateArrivalTime() {
      let now = new Date();
      let arrivalTime = new Date();
      let nowInMS = now.getTime();
      nowInMS = nowInMS + travelTime;
      arrivalTime.setTime(nowInMS);
      setArrivalTime(arrivalTime);
    }

    calculateArrivalTime();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [travelTime]);

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

  function handleSubmit(event) {
    // When user clicked mode of transport button the page will not refresh
    event.preventDefault();
    if (startName) {
      setStartingPoint(startCoords);
    }
    if (destinationName) {
      setDestination(destinationCoords);
    }
    // If origin or destination is empty don't get duration
    if (startName && destinationName) {
      getDuration();
    }
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
          <Grid container item xs={12}>
            <Grid item xs={5}>
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
              </ToggleButtonGroup>
            </Grid>
            <Grid item xs={7}>
              {travelTime && (
                <Box paddingLeft={1}>
                  <Box fontWeight="fontWeightBold">Duration</Box>
                  <Typography
                    align="center"
                    variant="h5"
                    component="div"
                    color="textPrimary"
                  >
                    {prettyMilliseconds(travelTime, {
                      unitCount: 2,
                      secondsDecimalDigits: 0
                    })}
                  </Typography>
                </Box>
              )}
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Card>
  );
}

export default InputBox;
