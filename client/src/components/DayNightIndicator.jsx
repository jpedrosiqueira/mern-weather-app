import React from "react";
import MoonIcon from "../assets/icons/moon.svg";
import SunIcon from "../assets/icons/sun.svg";
import "../styles/day-night-icon.css";

// Checks if currently is Daytime,
// based on sunset and sunrise times.
export const isDay = (time, sunset, sunrise) => {
  // Make sure we have non-zero values for those three times
  if (time && sunset && sunrise) {
    return sunrise <= time && time <= sunset;
  }
};

export const IsDayOrNightIcon = ({
  className,
  isCurrentlyDay,
  hasDarkBgClass,
}) => {
  const icon = isCurrentlyDay ? SunIcon : MoonIcon;
  const dayOrNight = isCurrentlyDay ? "day" : "night";

  return (
    <div className={className}>
      <img
        src={icon}
        alt={`${dayOrNight}-icon`}
        className={`${hasDarkBgClass && "dark"}`}
      />
    </div>
  );
};
