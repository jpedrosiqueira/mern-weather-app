import React from "react";
import "../styles/initial-message.css";

// A message component that will be displayed only on the initial page,
// when there's no data to display.
export const InitialMessage = () => {
  return (
    <div className="initial-message-container">
      <h3> Weatherfy App</h3>

      <p>Please start by typing in a city name.</p>
      <p>Features:</p>
      <li>Current temperature, high and low, and weather description</li>
      <li>Next 6 days forecast</li>
      <li>Next 6 hours forecast, according to location timezone location</li>
      <li>Day/Night indicator icon on the top right corner</li>
      <li>Dynamic backgrounds depending on the current city weather</li>
      <li>Toggle button to display temperatures in Fahrenheit or Celsius</li>
    </div>
  );
};
