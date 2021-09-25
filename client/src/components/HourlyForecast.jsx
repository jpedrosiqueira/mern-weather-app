import React from "react";
import moment from "moment-timezone";
import "../styles/hourly-forecast.css";
import { WeatherAssets } from "./WeatherAssets";
import { isDay } from "./DayNightIndicator";
import { MyInfo } from "./MyInfo";

// The time fetched from API is in Unix time, here we convert
// it to an hour format like "3 PM", considering the Timezone.
export const convertUnixToHourWithTimezone = (unixTime, timezone) => {
  if (timezone) {
    return moment.unix(unixTime).tz(timezone).format("hA");
  }
};

export const HourlyForecast = ({
  allHourlyWeatherArray,
  weatherDescription,
  hasDarkBgClass,
  currTemp,
  timezone,
  sunset,
  sunrise,
}) => {
  // we are only interested in the first 6 hours of the weather array
  const hourlyWeatherArray = allHourlyWeatherArray.slice(0, 6);

  // Finds what weather icon to use based on the weather description fetched from API.
  // For the hourly forecast icon, we care about each hour, because icons
  // can change dynamically based on if it will be day or night at that time.
  const findHourlyForecastIcon = (hourlyWeather, hourlyWeatherDescription) => {
    let weatherIcon;
    const hourlyTime = hourlyWeather.dt;
    hourlyWeatherDescription = hourlyWeatherDescription.toLowerCase();
    if (hourlyWeatherDescription in WeatherAssets) {
      if (hourlyWeatherDescription === "clear") {
        // For the "clear" icon, we can have a night icon and a day icon.
        // For every hour step, check if it's day or night,
        // so we can render the proper icon.
        weatherIcon = isDay(hourlyTime, sunset, sunrise)
          ? WeatherAssets.clear.icon.day
          : WeatherAssets.clear.icon.night;
      } else {
        weatherIcon = WeatherAssets[hourlyWeatherDescription].icon;
      }
    } else {
      weatherIcon = WeatherAssets.other.icon;
    }
    return weatherIcon;
  };

  return (
    <>
      {/* Only render hourly forecast if there is data to display */}
      {allHourlyWeatherArray.length ? (
        <div
          className={`hourly-forecast-container ${hasDarkBgClass && "dark"}`}
        >
          {hourlyWeatherArray.map((hourlyWeather, idx) => {
            let hour;
            let hourlyWeatherDescription;
            let temp = Math.round(hourlyWeather.temp);

            if (idx === 0) {
              // For the first hour displayed, show the current temperature and current weather description fetched
              temp = Math.round(currTemp);
              hourlyWeatherDescription = weatherDescription;

              hour = "Now";
            } else {
              hour = convertUnixToHourWithTimezone(hourlyWeather.dt, timezone);
              hourlyWeatherDescription =
                hourlyWeather.weather[0].main.toLowerCase();
            }
            const icon = findHourlyForecastIcon(
              hourlyWeather,
              hourlyWeatherDescription
            );

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
        // Display my contact info on greeting page.
        <MyInfo />
      )}
    </>
  );
};
