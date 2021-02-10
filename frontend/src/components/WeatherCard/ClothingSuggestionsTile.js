import { Box, Grid, Typography } from "@material-ui/core";

import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  clothingSuggestions: {
    paddingRight: "1.5rem",
    [theme.breakpoints.up("xs")]: {
      maxHeight: "4.25rem"
    },
  }
}));

export default function ClothingSuggestionsTile({ clothingSuggestions }) {
  const classes = useStyles();

  // Only render if clothingSuggestions state has been set and passed down
  if (clothingSuggestions.length !== 0) {
    return (
      <div>
        <Box className="clothingSuggestionsTitle" paddingBottom={"1.25rem"} paddingTop={"1rem"}>
          <Typography variant="subtitle1" component="div" color="textPrimary">
            Clothing Suggestions
          </Typography>
        </Box>
        <Grid container display="flex">
          <img
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
          />
        </Grid>
      </div>
    );
  }

  return null;
}
