import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";
import logo from "../img/logo.png"

function Navbar() {
  return (
    <nav className="navbar">
      <img className="logo" src={logo} />
      <Link to="/">
        <span className="material-symbols-outlined">hourglass_empty</span>{" "}
        <p>Zimmerstatus</p>
      </Link>
    </nav>
  );
}

export default Navbar;
