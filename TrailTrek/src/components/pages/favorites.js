// FavoritesPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, where, doc, getDoc, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../../firebase';
import './Home.css'; // Import the CSS for styling

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [trailData, setTrailData] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          // User not authenticated
          return;
        }

        const favoritesCollection = collection(db, 'favorites');
        const favoritesQuery = query(favoritesCollection, where('userId', '==', user.uid));
        const favoritesSnapshot = await getDocs(favoritesQuery);
        const favoritesData = favoritesSnapshot.docs.map(doc => ({
          id: doc.id,
          trailId: doc.data().trailId
        }));
        setFavorites(favoritesData);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };
    fetchFavorites();
  }, []);

  useEffect(() => {
    const fetchTrailData = async () => {
      try {
        const trailDocs = await Promise.all(favorites.map(async (favorite) => {
          const trailDoc = await getDoc(doc(db, 'trails', favorite.trailId));
          return { id: favorite.id, ...trailDoc.data() };
        }));
        setTrailData(trailDocs);
      } catch (error) {
        console.error('Error fetching trail data:', error);
      }
    };
    fetchTrailData();
  }, [favorites]);

  const removeFromFavorites = async (favoriteId) => {
    try {
      await deleteDoc(doc(db, 'favorites', favoriteId));
      setFavorites(prevFavorites => prevFavorites.filter(favorite => favorite.id !== favoriteId));
    } catch (error) {
      console.error('Error removing from favorites:', error);
    }
  };

  return (
    <div className="home">
      <div className="container">
        <h1 className="title">My Favorite Trails</h1>
        <div className='trails-container'>
          {trailData.map(trail => (
            <div key={trail.id} className="trail-card">
              <div className="trail-header">
                <Link to={`/trail/${trail.id}`} className="trail-link">
                  <div className="trail-image">
                    <img src={trail.image} alt={trail.name} />
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
                <button className="remove-favorite-button" onClick={() => removeFromFavorites(trail.id)}>
                  Remove from Favorites
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;
