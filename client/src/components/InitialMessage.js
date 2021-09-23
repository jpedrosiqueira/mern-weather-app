import React from "react";
import "../styles/initial-message.css";

export const InitialMessage = () => {
  return (
    <div className="initial-message-container">
      <h3> Weather App</h3>

      <p>Please start by typing in a city name.</p>
      <p>Features:</p>
      <li>Current temperature, high and low, and weather description</li>
      <li>Next 6 days forecast</li>
      <li>Next 6 hours forecast, according to location timezone location</li>
      <li>Day/Night indicator icon on the top right corner</li>
      <li>Dynamic backgrounds depending on the current city weather</li>
      <li>Toggle button to display temperatures in Farenheit or Celsius</li>
    </div>
  );
};
