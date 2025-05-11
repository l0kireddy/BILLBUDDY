// client/src/pages/DashboardPage.jsx
import React from 'react';
import './DashboardPage.css';

const DashboardPage = () => {
  return (
    <div className="dashboard-container">
      <h1>Welcome to Bill Buddy</h1>
      
      <div className="dashboard-stats">
        <div className="stat-item">
          <h2>Total Expenses</h2>
          <p>₹25,000</p> {/* Display in INR */}
        </div>
        <div className="stat-item">
          <h2>Total Users</h2>
          <p>10</p>
        </div>
        <div className="stat-item">
          <h2>Groups</h2>
          <p>2</p>
        </div>
      </div>

      <div className="recent-activity">
        <h2>Recent Activity</h2>
        <ul>
          <li>John added a new expense of ₹500 for groceries.</li>
          <li>Alice joined the "Roommates" group.</li>
          <li>Bob split the bill of ₹200 with Sarah.</li>
        </ul>
      </div>

      <div className="upcoming-events">
        <h2>Upcoming Events</h2>
        <ul>
          <li>Group "Travel Buddies" is planning a trip on 20th May.</li>
          <li>Reminder: Your next bill payment of ₹500 is due on 25th May.</li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardPage;
