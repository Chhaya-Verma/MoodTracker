import React from "react";
import { Link } from "react-router-dom";
 import "./Navbar.css"; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/" className="navbar-link">
            Home
          </Link>
        </li>
        <li>
          <Link to="/history" className="navbar-link">
            History
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
