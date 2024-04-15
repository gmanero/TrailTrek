// App.js

import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/pages/Home';
import Discover from './components/pages/Discover';
import Groups from './components/pages/Groups';
import Favorites from './components/pages/favorites';
import Create from './components/pages/Create';
import Login from './components/pages/logIn';
import TrailData from './components/pages/trailsData';
import CreateActivity from './components/pages/CreateActivity';
import CreateAccount from './components/pages/CreateAccount';
import { auth } from './firebase';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleCreateAccountSuccess = () => {
    setUser(auth.currentUser);
  };

  return (
    <>
      <Navbar user={user} onLogout={handleLogout} />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/create" element={user ? <Create /> : <Navigate to="/login" />} />
          <Route path="/trail/:id" element={<TrailData />} /> 
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login onLogin={setUser} />} />
          <Route path="/create-account" element={user ? <Navigate to="/" /> : <CreateAccount onSuccess={handleCreateAccountSuccess} />} />
          <Route path="/createActivity" element={user ? <CreateActivity /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
