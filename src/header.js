import React from "react";
import "../src/sass/style.css";

const Header = () => {
  return (
    <>
      <div>
        <h2
          className="heading-name"
          style={{
            background: "none",
            marginBottom: "50px",
            color: "#333", // Update to match your new color scheme
            textAlign: "center",
            textShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)", // More subtle shadow
            fontFamily: "Poppins, sans-serif", // Example font change
            animation: "fadeIn 2s ease-in-out", // Example animation
          }}
        >
          Books: because reality is overrated.
        </h2>
      </div>
    </>
  );
};

export default Header;
