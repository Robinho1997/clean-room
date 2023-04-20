import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <img className="logo" src="/src/img/logo.png" />
      <div className="links">
   
        <Link to="/">
        <span class="material-symbols-outlined">hourglass_empty</span> <p>Zimmerstatus</p>
        </Link>
        <Link to="/zimmer">
          {" "}
          <span class="material-symbols-outlined room-symbol">hotel</span>
          <p>Zimmer</p>
        </Link>{" "}
      </div>
    </nav>
  );
}

export default Navbar;
