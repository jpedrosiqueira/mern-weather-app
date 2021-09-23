import React, { useState } from "react";
import "../styles/searchbar.css";

// This component will use React Hooks as opposed to
// React Class Components, only to show some diversity.
export const SearchBar = ({ onSubmit }) => {
  const [inputField, setInputField] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(inputField);
    setInputField("");
  };

  const onChange = (e) => {
    setInputField(e.target.value);
  };

  return (
    <div className="search-bar-container">
      <form onSubmit={handleSubmit}>
        <input
          onChange={onChange}
          type="text"
          value={inputField}
          className="search-bar-input"
          placeholder="Type in a city name..."
        />
      </form>
    </div>
  );
};
