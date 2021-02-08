import { Button, ButtonGroup, TextField } from '@material-ui/core';
import React, { useState } from 'react';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import axios from '../axios';
import clear_day from '../images/weather_icons/clear_day.svg'
import cloudy from '../images/weather_icons/cloudy.svg'
import drizzle from '../images/weather_icons/drizzle.svg'
import flurries from '../images/weather_icons/flurries.svg'
import fog from '../images/weather_icons/fog.svg'
import fog_light from '../images/weather_icons/fog_light.svg'
import freezing_drizzle from '../images/weather_icons/freezing_drizzle.svg'
import freezing_rain from '../images/weather_icons/freezing_rain.svg'
import freezing_rain_heavy from '../images/weather_icons/freezing_rain_heavy.svg'
import freezing_rain_light from '../images/weather_icons/freezing_rain_light.svg'
import ice_pellets from '../images/weather_icons/ice_pellets.svg'
import ice_pellets_heavy from '../images/weather_icons/ice_pellets_heavy.svg'
import ice_pellets_light from '../images/weather_icons/ice_pellets_light.svg'
import { makeStyles } from '@material-ui/core/styles';
import mostly_clear_day from '../images/weather_icons/mostly_clear_day.svg'
import mostly_cloudy from '../images/weather_icons/mostly_cloudy.svg'
import partly_cloudy_day from '../images/weather_icons/partly_cloudy_day.svg'
import rain from '../images/weather_icons/rain.svg'
import rain_heavy from '../images/weather_icons/rain_heavy.svg'
import rain_light from '../images/weather_icons/rain_light.svg'
import snow from '../images/weather_icons/snow.svg'
import snow_heavy from '../images/weather_icons/snow_heavy.svg'
import snow_light from '../images/weather_icons/snow_light.svg'
import tstorm from '../images/weather_icons/tstorm.svg'

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

function getIconFromWeatherCode(code) {
    switch (code) {
      case 4201:
        return <img src={rain_heavy} width='80' height='80' alt='Heavy Rain Icon'></img>
      case 4001:
        return <img src={rain} width='80' height='80' alt='Rain Icon'></img>
      case 4200:
        return <img src={rain_light} width='80' height='80' alt='Light Rain Icon'></img>
      case 6201:
        return <img src={freezing_rain_heavy} width='80' height='80' alt='Freezing Heavy Rain Icon'></img>
      case 6001:
        return <img src={freezing_rain} width='80' height='80' alt='Freezing Rain Icon'></img>
      case 6200:
        return <img src={freezing_rain_light} width='80' height='80' alt='Light Freezing Rain Icon'></img>
      case 6000:
        return <img src={freezing_drizzle} width='80' height='80' alt='Freezing Drizzle Icon'></img>
      case 4000:
        return <img src={drizzle} width='80' height='80' alt='Drizzle Icon'></img>
      case 7101:
        return <img src={ice_pellets_heavy} width='80' height='80' alt='Heavy Ice Pellets Icon'></img>
      case 7000:
        return <img src={ice_pellets} width='80' height='80' alt='Ice Pellets Icon'></img>
      case 7102:
        return <img src={ice_pellets_light} width='80' height='80' alt='Light Ice Pellets Icon'></img>
      case 5101:
        return <img src={snow_heavy} width='80' height='80' alt='Heavy Snow Icon'></img>
      case 5000:
        return <img src={snow} width='80' height='80' alt='Snow Icon'></img>
      case 580:
        return <img src={snow_light} width='80' height='80' alt='Light Snow Icon'></img>
      case 5001:
        return <img src={flurries} width='80' height='80' alt='Flurries Icon'></img>
      case 8000:
        return <img src={tstorm} width='80' height='80' alt='Thunderstorm Icon'></img>
      case 280:
        return <img src={fog_light} width='80' height='80' alt='Light Fog Icon'></img>
      case 2000:
        return <img src={fog} width='80' height='80' alt='Fog Icon'></img>
      case 801:
        return <img src={cloudy} width='80' height='80' alt='Cloudy Icon'></img>
      case 1102:
        return <img src={mostly_cloudy} width='80' height='80' alt='Mostly Cloudy Icon'></img>
      case 1101:
        return <img src={partly_cloudy_day} width='80' height='80' alt='Partly Cloudy Icon'></img>
      case 180:
        return <img src={mostly_clear_day} width='80' height='80' alt='Mostly Clear Day Icon'></img>
      case 800:
        return <img src={clear_day} width='80' height='80' alt='Clear Day Icon'></img>
      default:
        return <img src={mostly_clear_day} width='80' height='80' alt='Clear Day Icon'></img>
    }
  }

function calculateTime() {
  //var date = new Date(null);
  //date.setSeconds(SECONDS);  ...specify value for SECONDS here to retrieve from the backend
  //var result = date.toISOString().substr(11, 8);
}

function OutputCard(props) {
  const styling = cardStyles();
  const [currentTemp, setCurrentTemp] = React.useState([]);
  const [currentWeatherCode, setCurrentWeatherCode] = React.useState([]);
  const [startingLocation, setStartingLocation] = React.useState({
    
  });
  const [destinationSaved, setDestinationSaved] = React.useState({});
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
        return response;
      }
      catch (e) {
        // TODO: Handle error properly
        console.log('Caught error: ', e);
      }
    };

    fetchWeather();
  }, [props.lat, props.long]);

  // For James to look at 
  // Testing getting responses for locations, does not work
  function getTest() {
    console.log('Start loc is: ' + startingLocation);

    axios
    .get("/retrieveCoordsFromLocation/", {
      params: {
        startLocation: startingLocation,
      }
    })
    .then((response) =>
      setStartingLocation({ ...startingLocation, stlcoords: response.data.coordinates})
    );
    // console.log("Coordinates = " + stlocation.location);
  };
  

  function handleSubmit() {
    var destination = document.getElementById('destination-search').value;
    var startinglocation = document.getElementById('starting-search').value;
    setStartingLocation(startingLocation);
    //alert('The Destination is ' + destination + ' and the Starting Location is ' + startinglocation);
    console.log( 'Starting Location :', startinglocation, 'Destination :' , destination);
    // TODO: Use these variables to find the most relevant coordinates
  }

  return (
    <Card className={isOpen ? styling.rootExpanded : styling.root}>
      <CardActions>
      <Button size="small" onClick={() => {setIsOpen(!isOpen); handleSubmit(); getTest()}} className={styling.searchButton} variant="contained" color="primary">Search</Button>

      <ButtonGroup className={styling.TransportButtons} variant="contained" color="secondary" aria-label="contained primary button group">
        <Button size="small" className={styling.TButton}>Car</Button>
        <Button size="small" className={styling.TButton}>Walking</Button>
        <Button size="small" className={styling.TButton}>Cycling</Button>
      </ButtonGroup>

      </CardActions>
      <CardContent>

        <TextField 
        className={styling.FirstBox} 
        id="starting-search" 
        label="Starting Location" 
        type="search" 
        variant="outlined" 
        value={startingLocation} onInput={ e=>setStartingLocation(e.target.value)}
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
          {getIconFromWeatherCode(currentWeatherCode)}
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