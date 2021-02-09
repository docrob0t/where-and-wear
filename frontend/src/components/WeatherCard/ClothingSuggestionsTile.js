import { Box, Grid, Typography } from "@material-ui/core";

import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  clothingSuggestions: {
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

// async function callGetClothingSuggestions(weatherCode, currentTemperature) {
//   var suggestions = await GetClothingSuggestions(weatherCode, currentTemperature);
//   return suggestions;
// }

export default function ClothingSuggestionsTile({ clothingSuggestions }) {
  const classes = useStyles();
  console.log('We are here');
  // console.log(clothingSuggestions);

  return (
    <div>
      <Box className="clothingSuggestions" paddingBottom={1}>
        <Typography variant="subtitle1" component="div" color="textSecondary">
          Clothing Suggestions
        </Typography>
      </Box>
      <Grid container justify="space-between" alignItems="flex-end">
        {/* <img
          className={classes.clothingSuggestions}
          src={clothingSuggestions[0].icon}
          alt={clothingSuggestions[0].text}
        />

        <img
          className={classes.clothingSuggestions}
          src={clothingSuggestions[1].icon}
          alt={clothingSuggestions[1].text}
        />

        <img
          className={classes.clothingSuggestions}
          src={clothingSuggestions[2].icon}
          alt={clothingSuggestions[2].text}
        /> */}
      </Grid>
    </div>
  );
}
