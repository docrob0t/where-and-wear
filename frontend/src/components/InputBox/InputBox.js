import { Box, Card, Grid, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Autocomplete, ToggleButton, ToggleButtonGroup } from "@material-ui/lab";

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

const useCoordsAndOptionsFrom = (name) => {
  const [coords, setCoords] = useState({
    lat: undefined,
    long: undefined
  });
  const [options, setOptions] = useState([]);

  // Get start location's coordinates on each keystroke
  useEffect(() => {
    // Gets the coordinates of the starting location
    function getCoordinatesAndOptions() {
      axios
        .get("/retrieveCoordsFromLocation/", {
          params: {
            search: name
          }
        })
        .then((response) => {
          setCoords({
            ...coords,
            long: response.data.features[0].geometry.coordinates[0],
            lat: response.data.features[0].geometry.coordinates[1]
          });
          setOptions(response.data.features.map((feature) => feature.place_name));
        })
        .catch((error) => {
          console.log(error);
        });
    }

    if (name !== "") {
      getCoordinatesAndOptions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  return [coords, options];
};

function InputBox({ setStartingPoint, setDestination, setArrivalTime }) {
  const classes = cardStyles();

  const [startName, setStartName] = useState("");
  const [startCoords, startOptions] = useCoordsAndOptionsFrom(startName);
  const [destinationName, setDestinationName] = useState("");
  const [destinationCoords, destinationOptions] = useCoordsAndOptionsFrom(destinationName);
  const [mode, setMode] = useState("driving");
  const [travelTime, setTravelTime] = useState();

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
      <form className={classes.form} onSubmit={handleSubmit} onKeyPress={handleKeyPress}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Autocomplete
              freeSolo
              // Once the user clicked on an option it will treat as submit as well
              onChange={(event, value) => {
                setStartName(value);
                handleSubmit(event);
              }}
              options={startOptions}
              renderInput={(params) => (
                <TextField
                  {...params}
                  id="starting-location"
                  label="Starting Location"
                  name="start"
                  variant="outlined"
                  fullWidth
                  value={startName}
                  onInput={(event) => setStartName(event.target.value)}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              freeSolo
              onChange={(event, value) => {
                setDestinationName(value);
                handleSubmit(event);
              }}
              options={destinationOptions}
              renderInput={(params) => (
                <TextField
                  {...params}
                  id="destination-search"
                  variant="outlined"
                  name="destination"
                  label="Destination"
                  fullWidth
                  value={destinationName}
                  onInput={(event) => setDestinationName(event.target.value)}
                />
              )}
            />
          </Grid>
          <Grid container item xs={12}>
            <Grid item xs={5}>
              <ToggleButtonGroup value={mode} exclusive onChange={handleModeOfTransport} aria-label="Mode of transport">
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
                  <Box align="center" fontWeight="fontWeightBold">
                    Duration
                  </Box>
                  <Typography align="center" variant="h5" component="div" color="textPrimary">
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
