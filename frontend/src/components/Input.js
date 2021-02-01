import React, { useState } from 'react';
//import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

// Card styling constants
const cardStyles = makeStyles({
    inputStyle: {
      minWidth: 375,
      minHeight: 300,
      width: '15%',
      height: '15%',
      margin: 35,
      position: 'absolute',
      bottom: 300,
      borderRadius: 25,
    },
    moreDetails: {
      position: 'absolute',
      padding: '5%',
      right: 0,
      top: 0,
      fontFamily: 'Calibri',
    },
    firstTitle: {
      fontSize: 20,
      top: '10%',
      position: 'absolute',
    },
    secondTitle: {
        fontSize: 20,
        top: '30%',
        position: 'absolute',
      },
    textbox: {
        fontSize: 20,
        top: '20%',
        position: 'absolute',
      },
      textbox2: {
        fontSize: 20,
        top: '40%',
        position: 'absolute',
      },
      button: {
        fontSize: 20,
        top: '30%',
        right: '10%',
        position: 'absolute',
      },
    pos: {
      marginTop: 12,
      position: 'relative',
    },
  });

  //#######

 
  
  //#######
//CreateInput() function returns Input
function CreateInput() {
const classes = cardStyles();

//const location = (<input type= "text"/>);


    function inputHandler() {
      var destination = document.getElementById('Destination').value;
    alert ('The Destination is: ' + destination ) 
    }
        
return (    
    <div className={classes.inputStyle}>
          <form onSubmit> 
          <label className={classes.firstTitle}>
            Starting Location</label>
          <input className={classes.textbox}
          type="text" 
          name="Location"
                    //onChange={enteredLocation}
          />
          <label className={classes.secondTitle}>
            Destination</label>
          <input className={classes.textbox2}
          type="text" 
          name="Destination" 
          id = "Destination" 
          //onChange={enteredLocation}
          />
          <button onClick={inputHandler}

          className={classes.button}>
          Search</button>
          
        </form>
        
    </div>
);
};

export default CreateInput;
//export default shoot;