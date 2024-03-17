// src/components/Navbar.js
import React from 'react';
import './Navbar.css';
import { Link, useMatch, useResolvedPath } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav>
      <div className="navbar">
        <div className="logo">
          <Link to="Home" className='site-name'>
            <img className="logo_img" src="../images/TrailTrek_logo.png" alt="logo"/>
            </Link>
        </div>

        <ul className="nav-links">
          <CustomLink to="/discover">Discover</CustomLink>
          <CustomLink to="/groups">Groups</CustomLink>
          <CustomLink to="/favorites">Favorites</CustomLink>
            

            <li className="dropdown">
            <CustomLink to="/myJourney">My Journey</CustomLink>
           
            <div className="dropdown-content">
            <CustomLink to="/savedTrails">Saved Trails</CustomLink>
            <CustomLink to="/savedActivies">Saved Activities</CustomLink> 
            </div>
          </li>
          <li className="dropdown">
          <CustomLink to="/create">Create</CustomLink>
            <div className="dropdown-content">
            <CustomLink to="/createTrail">Create Trail</CustomLink>
           
            <CustomLink to="/createActivity">Create Activity</CustomLink>
            </div>
          </li>
        </ul>

        <button className='logIn'>Log in</button>

        <div className="toggle-btn">
          <i className="fa-solid fa-bars"></i>
        </div>
      </div>
    </nav>
  );
};

function CustomLink({ to, children }) {
  const ResolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: ResolvedPath.pathname, end: true})
  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to}>{children}</Link>
    </li>
  );
}

export default Navbar;
