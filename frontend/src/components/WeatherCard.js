import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
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
function CreateWeatherCard(props) {
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

export default CreateWeatherCard;