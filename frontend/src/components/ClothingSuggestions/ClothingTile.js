import React from "react";
import getClothingIcon from "../utils/ClothingIcon";
import { Box, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  clothingIcon: {
    maxHeight: "2rem",
    [theme.breakpoints.up("sm")]: {
      maxHeight: "2.57rem"
    },
    [theme.breakpoints.up("md")]: {
      maxHeight: "2.78rem"
    },
    [theme.breakpoints.up("lg")]: {
      maxHeight: "2.99rem"
    }
  }
}));

function ClothingTile({ clothing }) {
  const classes = useStyles();

  return (
    <Box>
      <Box className="weatherIcon" display="flex" justifyContent="center">
        <img
          className={classes.clothingIcon}
          src={getClothingIcon(clothing).icon}
          alt={getClothingIcon(clothing).text}
        />
      </Box>
      <Box paddingTop={1} display="flex" justifyContent="center">
        <Typography variant="subtitle2" component="div" color="textSecondary" align="center">
          {getClothingIcon(clothing).text}
        </Typography>
      </Box>
    </Box>
  );
}

export default ClothingTile;
