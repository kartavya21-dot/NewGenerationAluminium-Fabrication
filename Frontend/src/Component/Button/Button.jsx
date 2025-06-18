import React from "react";
import "./Button.css";

const Button = ({ text }) => {
  return (
    <button
      className="button-28 header-btn"
      onClick={() =>
        window.open(
          "https://wa.me/919993063967?text=Hello%20I%20am%20interested%20in%20your%20services,%20%20please%20contact%20me",
          "_blank"
        )
      }
    >
      {text}
    </button>
  );
};

export default Button;

// https://wa.me/9993036967?text=Hello%20I%20am%20interested%20in%20your%20services