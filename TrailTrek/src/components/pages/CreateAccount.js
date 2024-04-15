import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { Link, Navigate } from "react-router-dom"; 
import './CreateAccount.css';

function CreateAccount({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      onSuccess(); // Redirect to the home page
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="create-account-container">
      <h2>Create Account</h2>
      <form onSubmit={handleCreateAccount}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Create Account</button>
        {error && <p className="error-message">{error}</p>}
      </form>
      <p className="signup-link">Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}

export default CreateAccount;
