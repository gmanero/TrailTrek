import React, { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxMap from './interactiveMap';
import './Discover.css';

const Discover = () => {
  
  const [trails, setTrails] = useState([
    { id: 1, name: 'Trail 1', location: 'Location 1', difficulty: 'Easy', latitude: 40.7128, longitude: -74.0060 },
    { id: 2, name: 'Trail 2', location: 'Location 2', difficulty: 'Intermediate', latitude: 34.0522, longitude: -118.2437 },
    { id: 3, name: 'Trail 3', location: 'Location 3', difficulty: 'Hard', latitude: 41.8781, longitude: -87.6298 },
  ]);
  const [filteredTrails, setFilteredTrails] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setFilteredTrails(trails);
  }, [trails]);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filtered = trails.filter(trail =>
      trail.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredTrails(filtered);
  };

  return (
    <div className="all-trails-container">
      <h1>Discover...</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search trails..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="map-container">
       
        <MapboxMap trails={filteredTrails} />
      </div>
    
    </div>
  );
};

export default Discover;
