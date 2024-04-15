// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { auth } from './firebase'; 

export const AuthContext = createContext(); 

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // State to hold the authenticated user

  useEffect(() => {
   
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user); // Update user state based on authentication state
    });

    
    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children} {/* Render the children components */}
    </AuthContext.Provider>
  );
};
