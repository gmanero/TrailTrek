import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import './Home.css';

const Home = () => {
  const [trails, setTrails] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchTrails = async () => {
      try {
        const trailsCollection = collection(db, 'trails');
        const trailsSnapshot = await getDocs(trailsCollection);
        const trailsData = trailsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTrails(trailsData);
      } catch (error) {
        console.error('Error fetching trails:', error);
      }
    };
    fetchTrails();
  }, []);

  const renderTrails = () => {
    return trails
      .filter(trail => trail.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .map(trail => (
        <div key={trail.id} className="trail-card">
          <Link to={`/trail/${trail.id}`} className="trail-link">
            <div className="trail-image"> <img src={trail.image} alt="Trail" /></div> 
            <div className="trail-details">
              <h2 className="trail-name">{trail.name}</h2>
              <p className="trail-location">{trail.location}</p>
              <div className="trail-info">
                <p className="info-item">Difficulty: {trail.difficulty}</p>
                <p className="info-item">Distance: {trail.distance} Miles</p>
                <p className="info-item">Duration: {trail.duration}</p>
                <p className="info-item">Description: {trail.description}</p>
              </div>
            </div>
          </Link>
        </div>
      ));
  };

  return (
    <div className="home">
      <div className="container">
        <h1 className="title">Welcome to TrailTrek</h1>
        <p className="subtitle">Discover, plan, and share your outdoor adventures.</p>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search trails..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <h2 className="section-title">Trails to explore...</h2>
        <div className='trails-container'>
          {renderTrails()}
        </div>
      </div>
    </div>
  );
};

export default Home;
