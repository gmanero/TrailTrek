// CreateActivity.js
import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import './Create.css';

const CreateActivity = () => {
  const [activityData, setActivityData] = useState({
    name: '',
    location: '',
    date: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setActivityData({ ...activityData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'activities'), activityData);
      
      setActivityData({
        name: '',
        location: '',
        date: '',
        description: '',
      });
      
      window.location.href = '/';
    } catch (error) {
      console.error('Error adding activity: ', error);
    }
  };

  return (
    <div className="create-container">
      <h2 className="create-title">Create an Activity</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={activityData.name} onChange={handleChange} className="create-input" placeholder="Activity Name" />
        <input type="text" name="location" value={activityData.location} onChange={handleChange} className="create-input" placeholder="Location" />
        <input type="date" name="date" value={activityData.date} onChange={handleChange} className="create-input" />
        <textarea name="description" value={activityData.description} onChange={handleChange} className="create-textarea" placeholder="Description" />
        <button type="submit" className="create-button">Create Activity</button>
      </form>
    </div>
  );
};

export default CreateActivity;
