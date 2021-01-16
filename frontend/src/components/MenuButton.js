import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import svgfile1 from '.././menu-button.svg';
import svgfile2 from '.././whereandwear-logo.svg';
import svgfile3 from '.././whereandwear-title.svg';
import Popover from '@material-ui/core/Popover';

const menuStyle = makeStyles({
  buttonStyle: {
    position: 'fixed',
    width: '7%',
    height: '7%',
    right: 20,
    top: 5,
    minWidth: 75,
    minHeight: 75,
    maxWidth: 100,
    maxHeight: 100,
  },
  popOverStyle: {
    opacity: 0.7,
  },
  popOverTextStyle: {
    padding: 20,
    lineHeight: 1.3,
  },
  aboutUsTitle: {
    textDecorationLine: 'underline',
  },
  attribTitle: {
    textDecorationLine: 'underline',
  },
  attrib1: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  attrib2: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  imgStyle: {
    position: 'absolute',
    left: '25%',
  },
});

// CreateMenu() function returns the menu
function CreateMenu() {
    const classes = menuStyle();
    
    // Using hooks to handle states of components
    const [menu, setMenu] = React.useState(null);
    const handleMenuClick = (event) => {setMenu(event.currentTarget)};
    const handleMenuClose = () => {setMenu(null)};

    const [popUp, setPopUp] = React.useState(null);
    const handlePopUpClick = (event) => {setPopUp(event.currentTarget)};
    const handlePopUpClose = () => {setPopUp(null)};
  
    return (
        <div>
          {/* Button for menu  */}
          <Button className={classes.buttonStyle} onClick={handleMenuClick}>
            <img src={svgfile1} height='65%' width='65%' alt='Menu Button'/>
          </Button>

          {/* Menu and menu items */}
          <Menu className={classes.menuStyle} anchorEl={menu} open={Boolean(menu)} onClose={handleMenuClose}>
            <MenuItem><Link to='/' style={{textDecoration:'none',color:'black'}}>Home</Link></MenuItem>
            <MenuItem onClick={handlePopUpClick} style={{color:'black'}}>About Us</MenuItem>
            <MenuItem onClick={handleMenuClose}> <img src={svgfile2} height='50%' width='50%' alt='Where & Wear Logo'/> </MenuItem>
          
          {/* Popover to open on menu item click 'About Us' */}
          <Popover
            className={classes.popOverStyle}
            open={Boolean(popUp)}
            anchorEl={popUp}
            onClose={handlePopUpClose}
            anchorReference='anchorPosition'
            anchorPosition={{ 
              top: '375', 
              left: '800',
            }}
            anchorOrigin={{
              vertical: 'center',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'center',
              horizontal: 'center',
            }}
          >
            {/* Popover content */}
          <div className={classes.imgStyle}>
            <img src={svgfile2} height='40' length='40' alt='Where and Wear logo'></img>
            <img src={svgfile3} height='30' length='30' alt='Where and Wear title'></img>
          </div>
          <div className={classes.popOverTextStyle}>
            <br></br>
            <p>
              <h2 className={classes.aboutUsTitle}>About Us</h2>
              Use our application to find the weather at a destination and see clothing recommendations.
            </p>
            <p>
              <h3 className={classes.attribTitle}>Attributions:</h3>
              <p className={classes.attrib1}>FlatIcon</p>
                <li>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></li>
                <li>Icons made by <a href="https://www.flaticon.com/authors/good-ware" title="Good Ware">Good Ware</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></li>
              <p className={classes.attrib2}>Climacell</p>
            </p>
          </div>
          </Popover> 
          </Menu>
        </div>
      );
  }

  export default CreateMenu;