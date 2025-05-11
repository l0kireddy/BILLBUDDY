import React from 'react';
import { Link } from 'react-router-dom';
import './WelcomePage.css';
import logo from '../assets/Bill.png';

const WelcomePage = () => {
  return (
    <div className="welcome-container">
      <header className="welcome-header">
        <div className="welcome-header-left">
          <img src={logo} alt="Bill Buddy Logo" className="welcome-logo" />
          <div className="welcome-title-group">
            <h1 className="welcome-title">BILL BUDDY</h1>
            <h2 className="welcome-subtitle">Split Smart. Pay Fast. Stay Ahead!</h2>
          </div>
        </div>
        <div className="nav-links">
          <a href="#">Home</a>
          <a href="#">Features</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
          <Link to="/register">
            <button className="join-button">Join now</button>
          </Link>
          {/* New login button */}
          <Link to="/login">
            <button className="login-button">Login</button>
          </Link>
        </div>
      </header>

      <main className="welcome-content">
        <h3>Welcome to the Expense Sharing Community</h3>
        <p>Join us to share expenses effortlessly!</p>
        <div className="features-section">
          <h4>Why Choose Us?</h4>
          <div className="features">
            <div className="feature">
              <span>😊</span>
              <h5>Simplify Bill Splitting</h5>
              <p>Fair shares made easy</p>
            </div>
            <div className="feature">
              <span>💰</span>
              <h5>Track Shared Expenses</h5>
              <p>Seamless record-keeping</p>
            </div>
            <div className="feature">
              <span>🤝</span>
              <h5>Build Trust Among Friends</h5>
              <p>Transparent transactions</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>Copyright © 2025 Bill Buddy All rights reserved.</p>
        <div className="footer-links">
          <span>Terms of Service</span>
          <span>Privacy Policy</span>
        </div>
      </footer>
    </div>
  );
};

export default WelcomePage;
