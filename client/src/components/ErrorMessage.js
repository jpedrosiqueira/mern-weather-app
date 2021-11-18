import React from "react";
import "../styles/error-message.css";

export const ErrorMessage = ({ className, displayMsg }) => {
  return (
    <div className={className}>
      <div className={`error-message ${displayMsg && "show"}`}>
        <p>Sorry, could not find location. Please type a valid city name.</p>
      </div>
    </div>
  );
};
