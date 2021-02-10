import React from "react";
import getClothingIcon from "../utils/ClothingIcon";
import { Box, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  clothingIcon: {
    maxHeight: "2.375rem",
    [theme.breakpoints.up("sm")]: {
      maxHeight: "2.9rem"
    },
    [theme.breakpoints.up("md")]: {
      maxHeight: "3.33rem"
    },
    [theme.breakpoints.up("lg")]: {
      maxHeight: "3.75rem"
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
        <Typography
          variant="subtitle2"
          component="div"
          color="textSecondary"
          align="center"
        >
          {getClothingIcon(clothing).text}
        </Typography>
      </Box>
    </Box>
  );
}

export default ClothingTile;
