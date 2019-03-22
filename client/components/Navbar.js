import React, { Component } from "react";
import { Link } from 'react-router-dom'

export default class Navbar extends Component {
  render() {
    return (
      <div className="nav">
        <div id="nav-left">
          <h1>Redux Genie</h1>
          <img
            id="genie-logo"
            src={
              "https://flaticons.net/gd/makefg.php?i=icons/Miscellaneous/Genie-Lamp.png&r=255&g=255&b=255"
            }
          />
        </div>
        <div id="nav-right">
          <Link className="nav-link" to="/docs" style={{ textDecoration: 'none' }}>Reference</Link>          
          <Link className="nav-link" to="/wish" style={{ textDecoration: 'none' }}>Configure</Link>
          <i id="npm-logo" className="fab fa-npm fa-2x" />
          <i id="github-logo" className="fab fa-github fa-2x" />
        </div>
      </div>
    );
  }
}
