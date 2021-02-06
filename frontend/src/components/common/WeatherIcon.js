import rain_heavy from "../../images/weather_icons/rain_heavy.svg";
import rain from "../../images/weather_icons/rain.svg";
import rain_light from "../../images/weather_icons/rain_light.svg";
import freezing_rain_heavy from "../../images/weather_icons/freezing_rain_heavy.svg";
import freezing_rain from "../../images/weather_icons/freezing_rain.svg";
import freezing_rain_light from "../../images/weather_icons/freezing_rain_light.svg";
import freezing_drizzle from "../../images/weather_icons/freezing_drizzle.svg";
import drizzle from "../../images/weather_icons/drizzle.svg";
import ice_pellets_heavy from "../../images/weather_icons/ice_pellets_heavy.svg";
import ice_pellets from "../../images/weather_icons/ice_pellets.svg";
import ice_pellets_light from "../../images/weather_icons/ice_pellets_light.svg";
import snow_heavy from "../../images/weather_icons/snow_heavy.svg";
import snow from "../../images/weather_icons/snow.svg";
import snow_light from "../../images/weather_icons/snow_light.svg";
import flurries from "../../images/weather_icons/flurries.svg";
import tstorm from "../../images/weather_icons/tstorm.svg";
import fog_light from "../../images/weather_icons/fog_light.svg";
import fog from "../../images/weather_icons/fog.svg";
import cloudy from "../../images/weather_icons/cloudy.svg";
import mostly_cloudy from "../../images/weather_icons/mostly_cloudy.svg";
import partly_cloudy_day from "../../images/weather_icons/partly_cloudy_day.svg";
import mostly_clear_day from "../../images/weather_icons/mostly_clear_day.svg";
import clear_day from "../../images/weather_icons/clear_day.svg";

const getIconFromWeatherCode = (code) => {
  switch (code) {
    case 4201:
      return { text: "Heavy rain", icon: rain_heavy };
    case 4001:
      return { text: "Rain", icon: rain };
    case 4200:
      return { text: "Light rain", icon: rain_light };
    case 6201:
      return { text: "Heavy freezing rain", icon: freezing_rain_heavy };
    case 6001:
      return { text: "Freezing rain", icon: freezing_rain };
    case 6200:
      return { text: "Light freezing rain", icon: freezing_rain_light };
    case 6000:
      return { text: "Freezing drizzle", icon: freezing_drizzle };
    case 4000:
      return { text: "Drizzle", icon: drizzle };
    case 7101:
      return { text: "Heavy ice pellets", icon: ice_pellets_heavy };
    case 7000:
      return { text: "Ice pellets", icon: ice_pellets };
    case 7102:
      return { text: "Light ice pellets", icon: ice_pellets_light };
    case 5101:
      return { text: "Heavy snow", icon: snow_heavy };
    case 5000:
      return { text: "Snow", icon: snow };
    case 5100:
      return { text: "Light snow", icon: snow_light };
    case 5001:
      return { text: "Flurries", icon: flurries };
    case 8000:
      return { text: "Thunderstorm", icon: tstorm };
    case 2100:
      return { text: "Light Fog", icon: fog_light };
    case 2000:
      return { text: "Fog", icon: fog };
    case 1001:
      return { text: "Cloudy", icon: cloudy };
    case 1102:
      return { text: "Mostly cloudy", icon: mostly_cloudy };
    case 1101:
      return { text: "Partly cloudy", icon: partly_cloudy_day };
    case 1100:
      return { text: "Mostly clear", icon: mostly_clear_day };
    case 1000:
      return { text: "Clear", icon: clear_day };
    default:
      return { text: "Clear", icon: clear_day };
  }
};

export default getIconFromWeatherCode;
