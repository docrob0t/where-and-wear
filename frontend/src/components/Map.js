import {Route, Switch} from "react-router-dom";

import CreateMenu from './MenuButton.js';
import CreateWeatherCard from './WeatherCard.js';
import React from 'react';
import UrlError from './UrlError';
import WeatherCard from './WeatherCard';
import axios from 'axios';

const axiosConfig = {
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  }
}

// Map component
class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Defaults (London)
      latitude: 51.509865,
      longitude: -0.118092,
      city: 'London',
    };
    this.setState = this.setState.bind(this);
    this.getCoordinates = this.getCoordinates.bind(this);
  }

  // On component initialisation, get the users location in co-ordinates and set the state accordingly
  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getCoordinates, this.handleLocationError);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  getCoordinates(position) {
    this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });

    axios.post('/locationfromcoords/', {
      lat: this.state.latitude,
      long: this.state.longitude
    }, axiosConfig)
      .then((response) => this.setState({ city: response.data.location }));

    // TODO: remove when no longer required
    console.log('User Lat = ' + position.coords.latitude);
    console.log('User Long = ' + position.coords.longitude);
  }

  // TODO: decide how we want to handle these error cases
  handleLocationError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        console.log("User denied the request for Geolocation. Defaulting to London")
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.")
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.")
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.")
        break;
      default:
        alert("An unknown error occurred.")
    }
  }

  render() {
    return <React.Fragment>
      <Switch>
        <Route path="/" exact component={Map, WeatherCard} />
        <Route component={UrlError}/>
      </Switch>

      <div style={{ zIndex: 0 }}><iframe className="map-iframe" title="Weather Map" 
        src="https://embed.windy.com/embed2.html?lat=51.509865&lon=-0.118092&detailLat=51.914&detailLon=-1.346&width=1600&height=900&zoom=7&level=surface&overlay=wind&product=ecmwf&menu=&message=&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=default&metricTemp=default&radarRange=-1"
        frameBorder="0">
      </iframe></div>

      <div><CreateWeatherCard city={this.state.city} lat={this.state.latitude} long={this.state.longitude} /></div>
      <div><CreateMenu /></div>
    </React.Fragment>
  }
}

export default Map;