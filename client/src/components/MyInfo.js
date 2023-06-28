import React from "react";
import "../styles/my-info.css";

export const MyInfo = () => {
  return (
    <div className="info-container">
      <div>This web app was created by Pedro Siqueira.</div>
      <div className="social-links">
        <a
          href="https://github.com/jpedrosiq"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa fa-github fa-2x"></i>
        </a>
        <a
          href="https://www.linkedin.com/in/jpedrosiqueira/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-linkedin fa-2x"></i>
        </a>
        <a
          href="mailto:johnpedrosiqueira@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa fa-envelope fa-2x"></i>
        </a>
      </div>
    </div>
  );
};
