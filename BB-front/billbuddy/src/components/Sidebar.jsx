// client/src/components/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => (
  <div className="sidebar">
    <div className="sidebar-menu">
      <h3>Menu</h3>
      <ul>
        {/* <li><Link to="/welcome">Welcome</Link> </li> */}
        <li><NavLink to="home" className={({ isActive }) => isActive ? "active" : ""}>Dashboard</NavLink></li>
        <li><NavLink to="groups" className={({ isActive }) => isActive ? "active" : ""}>Groups</NavLink></li>
        <li><NavLink to="expenses" className={({ isActive }) => isActive ? "active" : ""}>Expenses</NavLink></li>
        <li><NavLink to="polls" className={({ isActive }) => isActive ? "active" : ""}>Polls</NavLink></li>
        <li><NavLink to="statements" className={({ isActive }) => isActive ? "active" : ""}>Statements</NavLink></li>
      </ul>
    </div>
  </div>
);

export default Sidebar;
