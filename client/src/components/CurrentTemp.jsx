import React from "react";
import "../styles/currenttemp.css";
import HighTemp from "../assets/icons/high.svg";
import LowTemp from "../assets/icons/low.svg";

export const CurrentTemp = ({
  temperature,
  weatherDescription,
  hasDarkBgClass,
  high,
  low,
}) => {
  const roundTemperature = Math.round(temperature);
  const roundHigh = Math.round(high);
  const roundLow = Math.round(low);

  return (
    <div className={`currenttemp-container ${hasDarkBgClass && "dark"}`}>
      <div className="temperature">{roundTemperature}º</div>
      <div className="weather-description">{weatherDescription}</div>
      <div className="high-and-low">
        <span>
          <img alt="high-temp-icon" src={HighTemp} />
          <span>{roundHigh}º</span>
        </span>
        <span>
          <img alt="low-temp-icon" src={LowTemp} />
          <span>{roundLow}º</span>
        </span>
      </div>
    </div>
  );
};
