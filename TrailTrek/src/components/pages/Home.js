// Home.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../../firebase';
import './Home.css';

const Home = () => {
  const [trails, setTrails] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [activities, setActivities] = useState([]);

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

    const fetchActivities = async () => {
      try {
        const activitiesCollection = collection(db, 'activities');
        const activitiesSnapshot = await getDocs(activitiesCollection);
        const activitiesData = activitiesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setActivities(activitiesData);
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };
    fetchActivities();

    const fetchFavorites = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          // User not authenticated
          return;
        }

        const favoritesCollection = collection(db, 'favorites');
        const favoritesQuery = favoritesCollection.where('userId', '==', user.uid);
        const favoritesSnapshot = await getDocs(favoritesQuery);
        const favoritesData = favoritesSnapshot.docs.map(doc => doc.data().trailId);
        setFavorites(favoritesData);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };
    fetchFavorites();
  }, []);

  const addToFavorites = async (trailId) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        // User not authenticated
        console.error('User not authenticated');
        return;
      }

      // Construct a reference to the user's favorite trail document
      const favoriteRef = doc(db, 'favorites', `${user.uid}_${trailId}`);

      // Check if the favorite trail already exists
      const favoriteSnapshot = await getDoc(favoriteRef);
      if (favoriteSnapshot.exists()) {
        console.error('Trail already exists in favorites');
        return;
      }

      // Add the favorite trail to the "favorites" collection
      await setDoc(favoriteRef, {
        userId: user.uid,
        trailId: trailId
      });

      // Update the local state to reflect the new favorite
      setFavorites(prevFavorites => [...prevFavorites, trailId]);
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };

  const removeFromFavorites = async (trailId) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        // User not authenticated
        console.error('User not authenticated');
        return;
      }

      // Remove the favorite trail from the "favorites" collection
      await deleteDoc(doc(db, 'favorites', `${user.uid}_${trailId}`));

      // Update the local state to remove the trail from favorites
      setFavorites(prevFavorites => prevFavorites.filter(favorite => favorite !== trailId));
    } catch (error) {
      console.error('Error removing from favorites:', error);
    }
  };

  // Function to check if a trail is in favorites
  const isTrailInFavorites = (trailId) => {
    return favorites.includes(trailId);
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
        <div className="trails-container">
          {trails
            .filter(trail => trail.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .map(trail => (
              <div key={trail.id} className="trail-card">
                <div className="trail-header">
                  <Link to={`/trail/${trail.id}`} className="trail-link">
                    <div className="trail-image">
                      <img src={trail.image} alt="Trail" />
                    </div>
                    <div className="trail-details">
                      <h2 className="trail-name">{trail.name}</h2>
                      <p className="trail-location">{trail.location}</p>
                      <div className="trail-info">
                        <p className="info-item"><strong>Difficulty:</strong> {trail.difficulty}</p>
                        <p className="info-item"><strong>Distance:</strong> {trail.distance} Miles</p>
                        <p className="info-item"><strong>Duration:</strong> {trail.duration}</p>
                        <p className="info-item"><strong>Description:</strong> {trail.description}</p>
                      </div>
                    </div>
                  </Link>
                  {/* Render button text based on whether trail is in favorites */}
                  {isTrailInFavorites(trail.id) ? (
                    <button className="favorite-button favorited-button" onClick={() => removeFromFavorites(trail.id)}>
                      Favorited
                    </button>
                  ) : (
                    <button className="favorite-button" onClick={() => addToFavorites(trail.id)}>
                      Add to Favorites
                    </button>
                  )}
                </div>
              </div>
            ))}
        </div>
        <h2 className="section-title">Activities to explore...</h2>
        <div className="activities-container">
          {activities.map(activity => (
            <div key={activity.id} className="activity-card">
              <h3 className="activity-name">{activity.name}</h3>
              <p className="activity-location">{activity.location}</p>
              <p className="activity-date">{activity.date}</p>
              <p className="activity-description">{activity.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
