// client/src/layouts/DashboardLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import './DashboardLayout.css';

const DashboardLayout = ({ setIsAuthenticated }) => {
  return (
    <div className="dashboard-layout">
      <Navbar setIsAuthenticated={setIsAuthenticated} />
      <div className="main-content">
        <Sidebar />
        <div className="content-area">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
