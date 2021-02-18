import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Popover from "@material-ui/core/Popover";
import React from "react";
import climacellAttribution from "../images/climacell_attribution.svg";
import { makeStyles } from "@material-ui/core/styles";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import svgfile2 from ".././images/whereandwear-logo.svg";
import svgfile3 from ".././images/whereandwear-title.svg";

const menuStyle = makeStyles({
  buttonStyle: {
    position: "fixed",
    width: 50,
    height: 50,
    right: 15,
    top: 15,
    minWidth: 50,
    minHeight: 50,
    maxWidth: 75,
    maxHeight: 75,
    backgroundColor: "#FCFCFC",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.5)",
    borderRadius: "12px"
  },
  popOverStyle: {
    opacity: 0.9
  },
  popOverTextStyle: {
    padding: 20,
    lineHeight: 1.3
  },
  aboutUsTitle: {
    textDecorationLine: "underline"
  },
  attribTitle: {
    textDecorationLine: "underline"
  },
  attrib1: {
    fontWeight: "bold",
    fontSize: 16
  },
  attrib2: {
    fontWeight: "bold",
    fontSize: 16
  },
  imgStyle: {
    position: "absolute",
    left: "25%"
  }
});

// MenuButton() function returns the menu
function MenuButton() {
  const classes = menuStyle();

  // Using hooks to handle states of components
  const [menu, setMenu] = React.useState(null);
  const handleMenuClick = (event) => {
    setMenu(event.currentTarget);
  };
  const handleMenuClose = () => {
    setMenu(null);
  };

  const [popUp, setPopUp] = React.useState(null);
  const handlePopUpClick = (event) => {
    setPopUp(event.currentTarget);
  };
  const handlePopUpClose = () => {
    setPopUp(null);
  };

  return (
    <div>
      {/* Button for menu  */}
      <Button
        className={classes.buttonStyle}
        variant="contained"
        onClick={handleMenuClick}
      >
        <MenuRoundedIcon
          style={{
            color: "#A0A3BD"
          }}
        />
      </Button>

      {/* Menu and menu items */}
      <Menu
        className={classes.menuStyle}
        anchorEl={menu}
        open={Boolean(menu)}
        onClose={handleMenuClose}
      >
        <MenuItem>
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            Home
          </Link>
        </MenuItem>
        <MenuItem onClick={handlePopUpClick} style={{ color: "black" }}>
          About Us
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          {" "}
          <img src={svgfile2} height="0%" width="0%" alt="Where & Wear Logo" />
        </MenuItem>

        {/* Popover to open on menu item click 'About Us' */}
        <Popover
          className={classes.popOverStyle}
          open={Boolean(popUp)}
          anchorEl={popUp}
          onClose={handlePopUpClose}
          anchorReference="anchorPosition"
          anchorPosition={{
            top: 195,
            left: 1050
          }}
          anchorOrigin={{
            vertical: "center",
            horizontal: "center"
          }}
          transformOrigin={{
            vertical: "center",
            horizontal: "center"
          }}
        >
          {/* Popover content */}
          <div className={classes.imgStyle}>
            <img
              src={svgfile2}
              height="40"
              length="40"
              alt="Where and Wear logo"
            />
            <img
              src={svgfile3}
              height="30"
              length="30"
              alt="Where and Wear title"
            />
          </div>
          <div className={classes.popOverTextStyle}>
            <h2 className={classes.aboutUsTitle}>About Us</h2>
            Use our application to find the weather at a destination and see
            clothing recommendations.
            <h3 className={classes.attribTitle}>Attributions:</h3>
            <p className={classes.attrib1}>FlatIcon</p>
            <li>
              Icons made by{" "}
              <a
                href="https://www.flaticon.com/authors/freepik"
                title="Freepik"
              >
                Freepik
              </a>{" "}
              from{" "}
              <a href="https://www.flaticon.com/" title="Flaticon">
                www.flaticon.com
              </a>
            </li>
            <li>
              Icons made by{" "}
              <a
                href="https://www.flaticon.com/authors/good-ware"
                title="Good Ware"
              >
                Good Ware
              </a>{" "}
              from{" "}
              <a href="https://www.flaticon.com/" title="Flaticon">
                www.flaticon.com
              </a>
            </li>
            <p className={classes.attrib2}>
              <img src={climacellAttribution} alt="Climacell Attribution" />
            </p>
          </div>
        </Popover>
      </Menu>
    </div>
  );
}

export default MenuButton;
