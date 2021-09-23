import React from "react";
import moment from "moment-timezone";
import "../styles/hourly-forecast.css";
import { WeatherAssets } from "./WeatherAssets";
import { isDay } from "./DayNightIndicator";

export const HourlyForecast = ({
  allHourlyWeatherArray,
  hasDarkBgClass,
  currTemp,
  timezone,
  sunset,
  sunrise,
}) => {
  // we are only interested in the first 6 hours of the weather array
  const hourlyWeatherArray = allHourlyWeatherArray.slice(0, 6);

  // The time fetched from API is in Unix time, here we convert
  // it to an hour format like "3 PM", considering the Timezone.
  const convertUnixToHourWithTimezone = (unixTime) => {
    if (timezone) {
      return moment.unix(unixTime).tz(timezone).format("hA");
    }
  };

  const findHourlyForecastIcon = (hourlyWeather) => {
    let weatherIcon;
    const hourlyTime = hourlyWeather.dt;
    const weatherDescription = hourlyWeather.weather[0].main.toLowerCase();
    if (weatherDescription in WeatherAssets) {
      if (weatherDescription === "clear") {
        // For the "clear" icon, we can have a night icon and a day icon.
        // For every hour step, check if it's day or night,
        // so we can render the proper icon.
        weatherIcon = isDay(hourlyTime, sunset, sunrise)
          ? WeatherAssets.clear.icon.day
          : WeatherAssets.clear.icon.night;
      } else {
        weatherIcon = WeatherAssets[weatherDescription].icon;
      }
    } else {
      weatherIcon = WeatherAssets.other.icon;
    }
    return weatherIcon;
  };

  return (
    <>
      {allHourlyWeatherArray.length ? (
        <div
          className={`hourly-forecast-container ${hasDarkBgClass && "dark"}`}
        >
          {hourlyWeatherArray.map((hourlyWeather, idx) => {
            let hour;
            const icon = findHourlyForecastIcon(hourlyWeather);
            let temp = Math.round(hourlyWeather.temp);

            if (idx === 0) {
              // For the first hour displayed, show the current temperature fetched
              temp = Math.round(currTemp);
              hour = "Now";
            } else {
              hour = convertUnixToHourWithTimezone(hourlyWeather.dt);
            }

            return (
              <div key={idx} className="single-hour-container">
                <span>{hour}</span>
                <img src={icon} alt="weather-icon" />
                <span>{temp}º</span>
              </div>
            );
          })}
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};
