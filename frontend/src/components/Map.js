import CreateMenu from './MenuButton.js';
import CreateWeatherCard from './WeatherCard.js';
import React from 'react';

// Map component
class Map extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        latitude: null,
        longitude: null,
        userAddress: null
      };
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
      })
      // TODO: remove when no longer required
      console.log(position.coords.latitude);
      console.log(position.coords.longitude);
    }
  
    // TODO: decide how we want to handle these error cases
    handleLocationError(error) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          alert("User denied the request for Geolocation.")
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
        <div style={{ zIndex: 0 }}><iframe className="map-iframe"
          src="https://embed.windy.com/embed2.html?lat=52.896&lon=-2.241&detailLat=51.914&detailLon=-1.346&width=1600&height=900&zoom=7&level=surface&overlay=wind&product=ecmwf&menu=&message=&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=default&metricTemp=default&radarRange=-1"
          frameBorder="0">
        </iframe></div>
  
        <div><CreateWeatherCard name="Brighton" /></div>
        <div><CreateMenu/></div>  
      </React.Fragment>
    }
  }

  export default Map;