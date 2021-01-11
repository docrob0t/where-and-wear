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
    minHeight: 350,
    width: '15%',
    height: '25%',
    margin: 35,
    position: 'absolute',
    bottom: 50,
    borderRadius: 25,
    transition: '0.5s ease-in-out',
  },
  moreDetails: {
    position: 'absolute',
    right: 15,
    top: 15,
    fontFamily: 'Calibri',
    fontWeight: 600,
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
  SevenDayForecast: {
    marginLeft: 400,
    top: 20,
  },
  SevenDayForecastShow: {
    minWidth: 1000,
    minHeight: 350,
    width: '60%',
    height: '25%',
    margin: 35,
    position: 'absolute',
    bottom: 50,
    borderRadius: 25,
    transition: '0.5s ease-in-out',
  },
});

// CreateWeatherCard() function returns a weather card overlay
function CreateWeatherCard(props) {
  const styling = cardStyles();
  const [currentTemp, setCurrentTemp] = React.useState([]);
  const [tomorrowTemp, setTomorrowTemp] = React.useState([]);
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    async function fetchWeather() {
      try {
        const response = await axios.post('/weatheratcoords/', {
          lat: props.lat,
          long: props.long
        })
        setCurrentTemp(response.data.currentTemp);

        // Get date now
        var date = new Date();
        date.setDate(date.getDate() + 7);
        console.log('Date: ' + date);
        
        

        setTomorrowTemp(response.data.sevenDayForecast[0].temp.day);
        console.log('Here is the seven day forecast: ' + response.data.sevenDayForecast[0].temp.day);
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
    <Card className={isOpen ? styling.SevenDayForecastShow : styling.root}>
      <CardActions>
        <Button size="small" onClick={() => setIsOpen(!isOpen)} className={styling.moreDetails}>{isOpen ? 'Less Details' : 'More Details'}</Button>
      </CardActions>
      <CardContent>
        <Typography className={styling.title} gutterBottom>{props.city}</Typography>
        <Typography className={styling.pos} color="textSecondary"><br></br>Current Temperature<br></br> {Math.round(currentTemp)}°c </Typography>

        <Typography className={styling.SevenDayForecast}>
          Some Weather Info
        </Typography>

        <Typography className={styling.secondTitle} gutterBottom><br></br><br></br>Clothing Suggestions</Typography>
        <Typography className={styling.pos} color="textSecondary"><br></br><br></br><br></br><br></br><br></br>Coming Soon!<br></br></Typography>
      </CardContent>
    </Card>
  );
}

export default CreateWeatherCard;