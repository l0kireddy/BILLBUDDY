// client/src/components/Navbar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <div className="navbar">
      <h2>Bill Buddy</h2>
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Navbar;
