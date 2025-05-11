// client/src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import DashboardLayout from './layouts/DashboardLayout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WelcomePage from './pages/WelcomePage';
import DashboardPage from './pages/DashboardPage';
import GroupPage from './pages/GroupPage';
import AddExpensePage from './pages/AddExpensePage';
import PollPage from './pages/PollPage';
import StatementPage from './pages/StatementPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Optional: Check if token exists to keep user logged in after refresh
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <DashboardLayout setIsAuthenticated={setIsAuthenticated} />
            ) : (
              <Navigate to="/login" />
            )
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="home" element={<DashboardPage />} />
          <Route path="groups" element={<GroupPage />} />
          <Route path="expenses" element={<AddExpensePage />} />
          <Route path="polls" element={<PollPage />} />
          <Route path="statements" element={<StatementPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
