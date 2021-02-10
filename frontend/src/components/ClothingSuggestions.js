import axios from '../axios';
import beanie from '../images/clothing_suggestions/beanie.svg'
import boots_rain from '../images/clothing_suggestions/boots_rain.svg'
import boots_snow from '../images/clothing_suggestions/boots_snow.svg'
import cap from '../images/clothing_suggestions/cap.svg'
import coat from '../images/clothing_suggestions/coat.svg'
import gloves from '../images/clothing_suggestions/gloves.svg'
import hoodie from '../images/clothing_suggestions/hoodie.svg'
import jeans from '../images/clothing_suggestions/jeans.svg'
import long_sleeve_shirt from '../images/clothing_suggestions/long_sleeve_shirt.svg'
import short_sleeve_shirt from '../images/clothing_suggestions/short_sleeve_shirt.svg'
import shorts from '../images/clothing_suggestions/shorts.svg'
import sunglasses from '../images/clothing_suggestions/sunglasses.svg'
import umbrella from '../images/clothing_suggestions/umbrella.svg'

async function GetClothingSuggestions(code, temperature) {
  try {
    const suggestions = await makeClothingSuggestionsAPICall(code, temperature);
    const suggestionImages = mapClothingSuggestionsToImages(suggestions);
    return suggestionImages;
  }
  catch (e) {
    console.log('Caught error: ', e);
  }
}

async function makeClothingSuggestionsAPICall(code, temperature) {
  var firstSuggestion, secondSuggestion, thirdSuggestion;

  try {
    await axios.post('/getClothingSuggestions/', {
      weatherCode: code,
      currentTemperature: temperature,
    })
      .then((response) => {
        firstSuggestion = response.data.suggestionOne;
        secondSuggestion = response.data.suggestionTwo;
        thirdSuggestion = response.data.suggestionThree;
      })
  }
  catch (e) {
    // TODO: Handle error properly
    console.log('Caught error: ', e);
  }

  return [firstSuggestion, secondSuggestion, thirdSuggestion];
}

function mapClothingSuggestionsToImages(suggestions) {
  var images = [];

  switch (suggestions[0]) {
    case "umbrella":
      images[0] = { text: "Umbrella Icon", icon: umbrella };
      break;
    case "beanie":
      images[0] = { text: "Beanie Icon", icon: beanie };
      break;
    case "hoodie":
      images[0] = { text: "Hoodie Icon", icon: hoodie };
      break;
    case "cap":
      images[0] = { text: "Cap Icon", icon: cap };
      break;
    case "sunglasses":
      images[0] = { text: "Sunglasses Icon", icon: sunglasses };
      break;
    default:
      images[0] = { text: "Umbrella Icon", icon: umbrella };
  }

  switch (suggestions[1]) {
    case "coat":
      images[1] = { text: "Coat Icon", icon: coat };
      break;
    case "gloves":
      images[1] = { text: "Gloves Icon", icon: gloves };
      break;
    case "jeans":
      images[1] = { text: "Jeans Icon", icon: jeans };
      break;
    case "shorts":
      images[1] = { text: "Shorts Icon", icon: shorts };
      break;
    default:
      images[1] = { text: "Coat Icon", icon: coat };

  }

  switch (suggestions[2]) {
    case "boots_rain":
      images[2] = { text: "Rain Boots Icon", icon: boots_rain };
      break;
    case "boots_snow":
      images[2] = { text: "Snow Boots Icon", icon: boots_snow };
      break;
    case "short_sleeve_shirt":
      images[2] = { text: "Short Sleeve Shirt Icon", icon: short_sleeve_shirt };
      break;
    case "long_sleeve_shirt":
      images[2] = { text: "Long Sleeve Shirt Icon", icon: long_sleeve_shirt };
      break;
    default:
      images[2] = { text: "Rain Boots Icon", icon: boots_rain };
  }

  return images;
}

export default GetClothingSuggestions;