// src/components/Navbar.js
import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav>
      <div className="navbar">
        <div className="logo">
          <img className="logo_img" src="../images/TrailTrek_logo.png" alt="logo"/>
          </div>
        <ul className="nav-links">
          <li><a href="trails">Trails</a></li>
          <li><a href="activities">Activities</a></li>
          <li><a href="groups">Groups</a></li>
          <li><a href="profile">Profile</a></li>
          <li><a href="favorites">Favorites</a></li>
          <li><a href="signIn">Sign In</a></li>
        </ul>
        <div className="toggle-btn">
          <i className="fa-solid fa-bars"></i>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
