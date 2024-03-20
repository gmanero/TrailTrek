// Home.js (updated)
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [trails, setTrails] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

//Hypothetical trail data
  const Trails = [
    {
      id: 1,
      name: "Presidential Trail",
      location: "White Mountains, NH",
      difficulty: "Intermediate",
      distance: "15.2 miles",
      duration: "6-10 hours",
      image: "../images/mountain_pic.jpeg",
      description: "A scenic trail through the beautiful mountain range. Suitable for hiking and biking.",
      reviews: [
        { id: 1, user: "John", comment: "Great trail with stunning views!" },
        { id: 2, user: "Emma", comment: "Perfect for a weekend adventure." }
      ]
    },
    {
      id: 2,
      name: "Pinnacle Loop",
      location: "Michaux State Forest, PA",
      difficulty: "Easy",
      distance: "3.5 miles",
      duration: "1-2 hours",
      image: "../images/mountain_pic.jpeg",
      description: "A  easy loop through the lush forest. Ideal for a leisurely stroll.",
      reviews: [
        { id: 1, user: "Alice", comment: "Lovely trail with abundant wildlife!" },
        { id: 2, user: "Bob", comment: "Good for dogs." }
      ]
    },
  ];

  useEffect(() => {
    // Simulated API call to fetch trails data
    // Replace this with actual API call
    setTrails(Trails);
  }, []);

  const renderTrails = () => {
    return trails
      .filter(trail => trail.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .map(trail => (
        <div key={trail.id} className="trail-card">
          <Link to={`/trail/${trail.id}`} className="trail-link">
            <img className='trail-image' src={trail.image} alt={trail.name} />
            <div className="trail-info">
              <h2>{trail.name}</h2>
              <p>{trail.location}</p>
              <p>Difficulty: {trail.difficulty}</p>
              <p>Distance: {trail.distance}</p>
              <p>Duration: {trail.duration}</p>
              <p>{trail.description}</p>
            </div>
          </Link>
          <div className="reviews-section">
            <h3>Reviews:</h3>
            <ul className="reviews-list">
              {trail.reviews.map(review => (
                <li key={review.id} className="review-item">
                  <strong>{review.user}:</strong> {review.comment}
                </li>
              ))}
            </ul>
          </div>
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
        <span className="subtitle"><strong>Trails near you...</strong></span>
        <div className='trails-container'>
          {renderTrails()}
        </div>
      </div>
    </div>
  );
};

export default Home;
