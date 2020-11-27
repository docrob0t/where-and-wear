import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import svgfile1 from '.././menu-button.svg';
import svgfile2 from '.././whereandwear-logo.svg';

const buttonStyle = makeStyles({
  buttonStyle: {
    position: 'relative',
    top: 5,
    left: '90%',
    width: '10%',
    height: '10%',
  },
});

// CreateMenu() function returns the menu
function CreateMenu() {
    const classes = buttonStyle();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {setAnchorEl(event.currentTarget)}
    const handleClose = () => {setAnchorEl(null);};
  
    return (
        <div>
          <Button className={classes.buttonStyle} onClick={handleClick}>
            <img src={svgfile1} height='60%' width='60%' alt='Menu Button'/>
          </Button>
          <Menu className={classes.menuStyle} anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
            <MenuItem onClick={null}>About Us</MenuItem>
            <MenuItem onClick={handleClose}> <img src={svgfile2} height='50%' width='50%' alt='Where & Wear Logo'/> </MenuItem>
          </Menu>
        </div>
      );
  }

  export default CreateMenu;