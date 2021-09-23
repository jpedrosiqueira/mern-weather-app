import React, { useState } from "react";
import "../styles/toggle-unit-button.css";

// This component will use React Hooks as opposed to
// React Class Components, only to show some diversity.
export const ToggleUnit = ({ changeUnit }) => {
  const [isActive, setIsActive] = useState("imperial");

  const handleClick = (e) => {
    changeUnit(e.target.value);
    setIsActive(e.target.value);
  };

  return (
    <div className="button-container">
      <button
        onClick={handleClick}
        value="imperial"
        label="farenheit"
        className={`toggle-button farenheit ${
          isActive === "imperial" ? "active" : ""
        }`}
      >
        ºF
      </button>
      <button
        onClick={handleClick}
        value="metric"
        label="celsius"
        className={`toggle-button celsius ${
          isActive === "metric" ? "active" : ""
        }`}
      >
        ºC
      </button>
    </div>
  );
};
