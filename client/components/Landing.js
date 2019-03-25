import React, { Component } from "react";

const Landing = () => {
  return (
    <div id="landing-container">
      <div id="landing-header">
        <h1>Redux Genie</h1>
        <img
          id="genie-logo"
          src={
            "https://flaticons.net/gd/makefg.php?i=icons/Miscellaneous/Genie-Lamp.png&r=255&g=255&b=255"
          }
        />
      </div>
      <h3>A CLI tool for generating and modifying Redux applications.</h3>
      <a className="btn" id="landing-btn" href="/wish">GET STARTED</a>
    </div>
  );
};

export default Landing;
