import React from "react";
import "../styles/cityname.css";

export const CityName = ({ className, name, hasDarkBgClass }) => {
  return (
    <div className={className}>
      <div className={`title ${hasDarkBgClass && "dark"}`}>{name}</div>
    </div>
  );
};
