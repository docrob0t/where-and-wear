import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@material-ui/core";
import ClothingTile from "./ClothingTile";
import axios from "../../axios";

function ClothingSuggestions({ weatherCode, temperature }) {
  const [suggestions, setSuggestions] = useState([
    "umbrella",
    "beanie",
    "long_sleeve_shirt"
  ]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      const response = await axios.post("/getClothingSuggestions/", {
        weatherCode: weatherCode,
        temperature: temperature
      });
      setSuggestions(response.data.clothingSuggestions);
    };
    fetchSuggestions();
  }, [weatherCode, temperature]);

  return (
    <Box>
      <Box className="title" paddingBottom={3}>
        <Typography variant="h6">
          <Box fontWeight="fontWeightBold">Clothing Suggestions</Box>
        </Typography>
      </Box>
      <Grid container display="flex" justify="space-evenly">
        {suggestions.map((clothing) => (
          <Grid item key={clothing} xs={4}>
            <ClothingTile clothing={clothing} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ClothingSuggestions;
