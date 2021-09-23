import CloudyIcon from "../assets/icons/cloudy.svg";
import MoonIcon from "../assets/icons/moon.svg";
import SunIcon from "../assets/icons/sun.svg";
import RainIcon from "../assets/icons/rain.svg";
import ThunderstormIcon from "../assets/icons/thunderstorm.svg";
import SnowIcon from "../assets/icons/snow.svg";
import HazeIcon from "../assets/icons/haze.svg";
import ClearDayBg from "../assets/backgrounds/clear-day.jpeg";
import ClearNightBg from "../assets/backgrounds/clear-night.jpeg";
import RainDayBg from "../assets/backgrounds/rain-day.jpeg";
import RainNightBg from "../assets/backgrounds/rain-night.jpeg";
import ThunderstormBg from "../assets/backgrounds/thunderstorm.jpeg";
import SnowBg from "../assets/backgrounds/snow.jpeg";
import CloudsBg from "../assets/backgrounds/clouds.jpeg";
import HazeBg from "../assets/backgrounds/haze.jpeg";

export const WeatherAssets = {
  thunderstorm: {
    icon: ThunderstormIcon,
    backgroundImg: ThunderstormBg,
  },
  rain: {
    icon: RainIcon,
    backgroundImg: {
      day: RainDayBg,
      night: RainNightBg,
    },
  },
  snow: {
    icon: SnowIcon,
    backgroundImg: SnowBg,
  },
  clear: {
    icon: {
      day: SunIcon,
      night: MoonIcon,
    },
    backgroundImg: {
      day: ClearDayBg,
      night: ClearNightBg,
    },
  },
  clouds: {
    icon: CloudyIcon,
    backgroundImg: CloudsBg,
  },
  other: {
    icon: HazeIcon,
    backgroundImg: HazeBg,
  },
};

// Finds what weather icon to use based on the weather description fetched from API.
export const findDailyForecastIcon = (weatherDescription) => {
  let weatherIcon;
  if (weatherDescription in WeatherAssets) {
    // For Daily Forecast we only need "day" icons to display
    // what type of weather it will be for that weekday.
    weatherIcon = WeatherAssets[weatherDescription].icon.day
      ? WeatherAssets[weatherDescription].icon.day
      : WeatherAssets[weatherDescription].icon;
  } else {
    // If weather description is not any of the main weathers,
    // it will be in the "Atmosphere" group (fog, haze, smoke),
    // according to the API, so we use the Fog icon.
    weatherIcon = WeatherAssets.other.icon;
  }
  return weatherIcon;
};

export const findBackgroundImg = (weatherDescription, isCurrentlyDay) => {
  let weatherBackground;
  const DayOrNightKey = isCurrentlyDay ? "day" : "night";

  if (weatherDescription in WeatherAssets) {
    // If a key "day" exists for the weather background in WeatherAssets,
    // it means there are two possible backgrounds: day and night.
    if (WeatherAssets[weatherDescription].backgroundImg.day) {
      weatherBackground =
        WeatherAssets[weatherDescription].backgroundImg[DayOrNightKey];
    } else {
      weatherBackground = WeatherAssets[weatherDescription].backgroundImg;
    }
  } else {
    weatherBackground = WeatherAssets.other.backgroundImg;
  }

  return weatherBackground;
};

// Helper function that checks if we need to switch to a darker
// Daily/Hourly Forecast Container depending on the weather background
export const isDarkForecastBg = (bgImg) => {
  return (
    bgImg.includes("snow") ||
    bgImg.includes("rain-day") ||
    bgImg.includes("clouds") ||
    bgImg.includes("haze")
  );
};

// Helper function that checks if we need to switch to a darker
// Text color (DayOrNight Icon, City name, etc) depending on the weather background
export const isDarkTextColorBg = (bgImg) => {
  return bgImg.includes("snow");
};

/**
    Text, DayOrNightIcon, and/or forecast containers that will change to a darker color:

      Darker Daily/Hourly Forecast Container:
        - Snow Background Image
        - Clouds Background Image
        - Haze Background Image
        - Rain Day Background Image
      Darker Text Color and DayOrNightIcon:
        - Snow Background Image
 */
