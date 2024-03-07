// Home.js

import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <div className="container">
        <h1>Welcome to TrailTrek</h1>
        <p>Discover, plan, and share your outdoor adventures.</p>
        <div className='pictureFront'>
          <img className='mountain_img' src="../images/mountain_pic.jpeg" alt="mountain" />
        </div>
      </div>
    </div>
  );
};

export default Home;