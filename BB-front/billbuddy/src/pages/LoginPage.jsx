// client/src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = ({ setIsAuthenticated }) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();

      if (response.ok && data.token) {
        // Save token to localStorage (or cookie if you prefer)
        localStorage.setItem("token", data.token);

        // Mark user as authenticated in your app
        setIsAuthenticated(true);

        // Redirect to dashboard
        navigate("/dashboard");
      } else {
        alert("Login failed: Invalid credentials or account not verified.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login.");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login to Bill Buddy</h2>

        <input
          type="email"
          placeholder="Email"
          value={credentials.email}
          onChange={(e) =>
            setCredentials({ ...credentials, email: e.target.value })
          }
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
