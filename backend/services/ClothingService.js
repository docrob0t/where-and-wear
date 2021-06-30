const clothingService = (weatherCode, temperature) => {
  switch (weatherCode) {
    // Rain weather codes
    case 4201:
    case 4001:
    case 4200:
    case 6201:
    case 6001:
    case 6200:
    case 6000:
    case 4000:
    case 7101:
    case 7000:
    case 7102:
    case 8000:
      return ["umbrella", "coat", "boots_rain"];
    // Snow weather codes
    case 5101:
    case 5000:
    case 5100:
    case 5001:
      return ["beanie", "gloves", "boots_snow"];
    // Fog weather codes
    case 2100:
    case 2000:
      return ["hoodie", "jeans", "long_sleeve_shirt"];
    // Cloudy weather codes
    case 1001:
    case 1102:
    case 1101:
      if (temperature > 15) {
        return ["cap", "shorts", "short_sleeve_shirt"];
      } else {
        return ["hoodie", "jeans", "long_sleeve_shirt"];
      }
    // Sunny/Clear weather codes
    case 1100:
    case 1000:
      if (temperature > 10) {
        return ["sunglasses", "shorts", "short_sleeve_shirt"];
      } else {
        return ["hoodie", "jeans", "long_sleeve_shirt"];
      }
    default:
      return "some error";
  }
};

export default clothingService;
