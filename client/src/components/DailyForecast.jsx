import React from "react";
import moment from "moment";
import "../styles/daily-forecast.css";
import { findDailyForecastIcon } from "./WeatherAssets";
import { InitialMessage } from "./InitialMessage";

// The time fetched from API is in Unix time, here we convert
// it to a weekday format like "Monday"
export const convertUnixToWeekday = (unixTime) => {
  return moment.unix(unixTime).format("dddd");
};

export const DailyForecast = ({ allDailyWeatherArray, hasDarkBgClass }) => {
  // We only care about the 6 next days forecast,
  // excluding the first index which is today.
  const dailyWeatherArray = allDailyWeatherArray.slice(1, 7);

  return (
    <>
      {allDailyWeatherArray.length ? (
        <div className={`daily-forecast-container ${hasDarkBgClass && "dark"}`}>
          {dailyWeatherArray.map((weatherDay) => {
            const weekday = convertUnixToWeekday(weatherDay.dt);
            const minTemp = Math.round(weatherDay.temp.min);
            const maxTemp = Math.round(weatherDay.temp.max);
            const icon = findDailyForecastIcon(
              weatherDay.weather[0].main.toLowerCase()
            );

            return (
              <div key={weekday} className="single-day-container">
                <span>{weekday}</span>
                <img src={icon} alt="weather-icon" />
                <div className="weekday-temp">
                  <span>{maxTemp}º</span>
                  <span>{minTemp}º</span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        // Show initial message if there is no forecast to display
        <InitialMessage />
      )}
    </>
  );
};
