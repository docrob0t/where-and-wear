import React from 'react';
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
        await axios.post('/getclothingsuggestions/', {
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
    var firstSuggestion = suggestions[0];
    var secondSuggestion = suggestions[1];
    var thirdSuggestion = suggestions[2];

    var imageOne;
    var imageTwo;
    var imageThree;

    switch (firstSuggestion) {
        case "umbrella":
            imageOne = <img src={umbrella} width='80' height='80' alt='Umbrella Icon'></img>
            break;
        case "beanie":
            imageOne = <img src={beanie} width='80' height='80' alt='Beanie Icon'></img>
            break;
        case "hoodie":
            imageOne = <img src={hoodie} width='80' height='80' alt='Hoodie Icon'></img>
            break;
        case "cap":
            imageOne = <img src={cap} width='80' height='80' alt='Cap Icon'></img>
            break;
        case "sunglasses":
            imageOne = <img src={sunglasses} width='80' height='80' alt='Sunglasses Icon'></img>
            break;
        default:
            imageOne = <img src={umbrella} width='80' height='80' alt='Umbrella Icon'></img>
    }

    switch (secondSuggestion) {
        case "coat":
            imageTwo = <img src={coat} width='80' height='80' alt='Coat Icon'></img>
            break;
        case "gloves":
            imageTwo = <img src={gloves} width='80' height='80' alt='Gloves Icon'></img>
            break;
        case "jeans":
            imageTwo = <img src={jeans} width='80' height='80' alt='Jeans Icon'></img>
            break;
        case "shorts":
            imageTwo = <img src={shorts} width='80' height='80' alt='Shorts Icon'></img>
            break;
        default:
            imageTwo = <img src={coat} width='80' height='80' alt='Coat Icon'></img>
    }

    switch (thirdSuggestion) {
        case "boots_rain":
            imageThree = <img src={boots_rain} width='80' height='80' alt='Rain Boots Icon'></img>
            break;
        case "boots_snow":
            imageThree = <img src={boots_snow} width='80' height='80' alt='Snow Boots Icon'></img>
            break;
        case "short_sleeve_shirt":
            imageThree = <img src={short_sleeve_shirt} width='80' height='80' alt='Short Sleeve Shirt Icon'></img>
            break;
        case "long_sleeve_shirt":
            imageThree = <img src={long_sleeve_shirt} width='80' height='80' alt='Long Sleeve Shirt Icon'></img>
            break;
        default:
            imageThree = <img src={boots_rain} width='80' height='80' alt='Rain Boots Icon'></img>
    }

    return [imageOne, imageTwo, imageThree];
}

export default GetClothingSuggestions;