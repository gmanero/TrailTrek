import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, collection, addDoc, query, orderBy, onSnapshot, where } from 'firebase/firestore';

import { db, auth } from '../../firebase';
import './trailData.css';

const TrailData = () => {
  const { id } = useParams();
  const [trail, setTrail] = useState(null);
  const [reviewText, setReviewText] = useState('');
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchTrail = async () => {
      try {
        const trailDoc = await getDoc(doc(db, 'trails', id));
        if (trailDoc.exists()) {
          setTrail({ id: trailDoc.id, ...trailDoc.data() });
        } else {
          console.error('Trail not found');
        }
      } catch (error) {
        console.error('Error fetching trail:', error);
      }
    };

    const fetchReviews = () => {
      const reviewsCollection = collection(db, 'reviews');
      const reviewsQuery = query(reviewsCollection, orderBy('timestamp', 'desc'), where('trailId', '==', id));
      const unsubscribe = onSnapshot(reviewsQuery, (snapshot) => {
        const reviewsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp.toDate(),
        }));
        setReviews(reviewsData);
      });

      return unsubscribe;
    };

    fetchTrail();
    const unsubscribe = fetchReviews();

    return () => unsubscribe();
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = auth.currentUser;
      if (!user) {
        console.error('User not authenticated');
        return;
      }

      // Add review to Firestore
      const reviewRef = await addDoc(collection(db, 'reviews'), {
        userId: user.uid,
        trailId: id,
        text: reviewText,
        email: user.email,
        timestamp: new Date()
      });

      // Clear review input field
      setReviewText('');

      // No need to fetch reviews here as it's handled by the useEffect hook
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  // Build array of JSX elements for reviews
  const reviewElements = [];
  for (let i = 0; i < reviews.length; i++) {
    const review = reviews[i];
    reviewElements.push(
      <li key={review.id} className="review-item">
        <p className="review-text">{review.text}</p>
        <p className="review-author">{review.email}</p>
        <p className="review-date">{review.timestamp.toLocaleDateString()}</p>
      </li>
    );
  }

  return (
    <div className="trail-data">
      {/* Render trail information */}
      {trail && (
        <div>
          <h2 className="trail-name">{trail.name}</h2>
          <img src={trail.image} alt="Trail" className="trail-image" />
          <div className="trail-details">
            <p className="trail-location">Location: {trail.location}</p>
            <p className="trail-info">Difficulty: {trail.difficulty}</p>
            <p className="trail-info">Distance: {trail.distance} Miles</p>
            <p className="trail-info">Duration: {trail.duration}</p>
            <p className="trail-info">Description: {trail.description}</p>
          </div>
        </div>
      )}

      {/* Render reviews */}
      <div className="trail-reviews">
        <h3>Reviews</h3>
        <ul className="reviews-list">
          {reviews.length === 0 && <p>No reviews yet.</p>}
          {reviews.length > 0 && reviewElements}
        </ul>
      </div>

      {/* Review form */}
      <form className="review-form" onSubmit={handleReviewSubmit}>
        <textarea className="review-input" value={reviewText} onChange={(e) => setReviewText(e.target.value)} placeholder="Add your review..." required></textarea>
        <button className="submit-review" type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default TrailData;
