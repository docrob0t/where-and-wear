import beanie from "../../images/clothing_suggestions/beanie.svg";
import boots_rain from "../../images/clothing_suggestions/boots_rain.svg";
import boots_snow from "../../images/clothing_suggestions/boots_snow.svg";
import cap from "../../images/clothing_suggestions/cap.svg";
import coat from "../../images/clothing_suggestions/coat.svg";
import gloves from "../../images/clothing_suggestions/gloves.svg";
import hoodie from "../../images/clothing_suggestions/hoodie.svg";
import jeans from "../../images/clothing_suggestions/jeans.svg";
import long_sleeve_shirt from "../../images/clothing_suggestions/long_sleeve_shirt.svg";
import short_sleeve_shirt from "../../images/clothing_suggestions/short_sleeve_shirt.svg";
import shorts from "../../images/clothing_suggestions/shorts.svg";
import sunglasses from "../../images/clothing_suggestions/sunglasses.svg";
import umbrella from "../../images/clothing_suggestions/umbrella.svg";

const getClothingIcon = (name) => {
  switch (name) {
    case "umbrella":
      return { text: "Umbrella", icon: umbrella };
    case "beanie":
      return { text: "Beanie", icon: beanie };
    case "hoodie":
      return { text: "Hoodie", icon: hoodie };
    case "cap":
      return { text: "Cap", icon: cap };
    case "sunglasses":
      return { text: "Sunglasses", icon: sunglasses };
    case "coat":
      return { text: "Coat", icon: coat };
    case "gloves":
      return { text: "Gloves", icon: gloves };
    case "jeans":
      return { text: "Jeans", icon: jeans };
    case "shorts":
      return { text: "Shorts", icon: shorts };
    case "boots_rain":
      return { text: "Rain boots", icon: boots_rain };
    case "boots_snow":
      return { text: "Snow boots", icon: boots_snow };
    case "short_sleeve_shirt":
      return { text: "Short sleeve shirt", icon: short_sleeve_shirt };
    case "long_sleeve_shirt":
      return { text: "Long sleeve shirt", icon: long_sleeve_shirt };
    default:
      return { text: "Umbrella", icon: umbrella };
  }
};

export default getClothingIcon;
