import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db, storage } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid'; 
import mapboxSdk from '@mapbox/mapbox-sdk/services/geocoding';
import './Create.css';

const CreateTrail = () => {
  const [trailData, setTrailData] = useState({
    name: '',
    location: '',
    difficulty: 'Easy',
    distance: '',
    duration: '',
    description: '',
    image: '',
  });

  const [imageFile, setImageFile] = useState(null);
  const [locationSuggestions, setLocationSuggestions] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrailData({ ...trailData, [name]: value });
    if (name === 'location') {
      handleLocationChange(value);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleLocationChange = async (locationQuery) => {
    try {
      const geocodingClient = mapboxSdk({ accessToken: 'pk.eyJ1IjoiZ21hbmVybyIsImEiOiJjbHV1ZmowNGswOWExMmpwbzFwdWhwNXExIn0.qF-ZAnKy-ZFknJ2mADfFXA' });
      const response = await geocodingClient.forwardGeocode({
        query: locationQuery,
        countries: ['US'], // Limit suggestions to places in the US
        limit: 5
      }).send();

      const suggestions = response.body.features.map(feature => feature.place_name);
      setLocationSuggestions(suggestions);
    } catch (error) {
      console.error('Error fetching location suggestions:', error);
    }
  };

  const handleLocationClick = (suggestion) => {
    setTrailData({ ...trailData, location: suggestion });
    setLocationSuggestions([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const storageRef = ref(storage, `trail_images/${uuidv4()}`);
      await uploadBytes(storageRef, imageFile);
      const imageUrl = await getDownloadURL(storageRef);

      await addDoc(collection(db, 'trails'), { ...trailData, image: imageUrl });
      
      setTrailData({
        name: '',
        location: '',
        difficulty: 'Easy',
        distance: '',
        duration: '',
        description: '',
        image: '',
      });
      
      window.location.href = '/';
    } catch (error) {
      console.error('Error adding trail: ', error);
    }
  };

  return (
    <div className="create-container">
      <h2 className="create-title">Create a Trail</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={trailData.name} onChange={handleChange} className="create-input" placeholder="Trail Name" />
        <div className="location-input-container">
          <input type="text" name="location" value={trailData.location} onChange={handleChange} className="create-input" placeholder="Location" />
          {locationSuggestions.length > 0 && (
            <div className="suggest">
              {locationSuggestions.map((suggestion, index) => (
                <button key={index} onClick={() => handleLocationClick(suggestion)} className="dropdown-item">{suggestion}</button>
              ))}
            </div>
          )}
        </div>
        <select name="difficulty" value={trailData.difficulty} onChange={handleChange} className="create-input">
          <option value="Easy">Easy</option>
          <option value="Intermediate">Moderate</option>
          <option value="Hard">Hard</option>
          <option value="Extreme">Extreme</option>
        </select>
        <input type="text" name="distance" value={trailData.distance} onChange={handleChange} className="create-input" placeholder="Distance" />
        <input type="number" name="duration" value={trailData.duration} onChange={handleChange} className="create-input" placeholder="Duration" />
        <input type="file" onChange={handleImageChange} className="create-input" />
        <textarea name="description" value={trailData.description} onChange={handleChange} className="create-textarea" placeholder="Description" />
        <button type="submit" className="create-button">Create Trail</button>
      </form>
    </div>
  );
};

export default CreateTrail;
