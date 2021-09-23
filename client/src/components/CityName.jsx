import React from "react";
import "../styles/cityname.css";

export const CityName = ({ name, hasDarkBgClass }) => {
  return <div className={`title ${hasDarkBgClass && "dark"}`}>{name}</div>;
};
