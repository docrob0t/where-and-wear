import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import axios from '../axios';
import { makeStyles } from '@material-ui/core/styles';

// Card styling constants
const cardStyles = makeStyles({
  root: {
    minWidth: 375,
    minHeight: 300,
    width: '15%',
    height: '25%',
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
function CreateWeatherCard(props) {
  const classes = cardStyles();
  const [currentTemp, setCurrentTemp] = React.useState([]);

  React.useEffect(() => {
    async function fetchWeather() {
      try {
        const response = await axios.post('/weatheratcoords/', {
          lat: props.lat,
          long: props.long
        })
        setCurrentTemp(response.data.currentTemp);
        return response;
      }
      catch (e) {
        // TODO: Handle error properly
        console.log('Caught error: ', e);
      }
    };

    fetchWeather();
  }, [props.lat, props.long]);

  return (
    <Card className={classes.root}>
      <CardActions>
        <Button size="small" className={classes.moreDetails}>More Details</Button>
      </CardActions>
      <CardContent>
        <Typography className={classes.title} gutterBottom>{props.city}</Typography>
        <Typography className={classes.pos} color="textSecondary"><br></br>Current Temperature<br></br> {parseInt(currentTemp, 10)}°c </Typography>
        <Typography className={classes.secondTitle} gutterBottom><br></br>Clothing Suggestions</Typography>
        <Typography className={classes.pos} color="textSecondary"><br></br><br></br><br></br><br></br>Coming Soon!<br></br></Typography>
      </CardContent>
    </Card>
  );
}

export default CreateWeatherCard;