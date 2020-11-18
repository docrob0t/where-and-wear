import './index.css';

import * as serviceWorker from './serviceWorker';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import React from 'react';
import ReactDOM from 'react-dom';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

// Card styling constants
const cardStyles = makeStyles({
  root: {
    width: 275,
    height: 300,
    margin: 35,
    position: 'absolute',
    bottom: 50,
    borderRadius: 25,
  },
  moreDetails: {
    position: 'absolute',
    padding: '5%',
    right: 0,
    top: 0,
    fontFamily: 'Calibri',
  },
  title: {
    fontSize: 20,
    top: '5%',
    position: 'absolute',
  },
  secondTitle: {
    fontSize: 20,
    top: '40%',
    position: 'absolute',
  },
  pos: {
    marginTop: 12,
    position: 'relative',
  },
});

// CreateWeatherCard() function returns a weather card overlay
export default function CreateWeatherCard(props) {
  const classes = cardStyles();

  return (
    <Card className={classes.root}>
      <CardActions>
        <Button size="small" className={classes.moreDetails}>More Details</Button>
      </CardActions>
      <CardContent>
        <Typography className={classes.title} gutterBottom>{props.name}</Typography>
        <Typography className={classes.pos} color="textSecondary">25C / Sunny</Typography>
        <Typography className={classes.secondTitle} gutterBottom>Clothing Suggestions</Typography>
      </CardContent>
    </Card>
  );
}

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
    </React.Fragment>
  }
}

ReactDOM.render(
  <div>
    <Map />
  </div>,
  document.getElementById('root')
);



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
