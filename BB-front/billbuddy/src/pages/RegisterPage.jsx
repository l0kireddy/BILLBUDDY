// client/src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/authService';
import './RegisterPage.css';

const RegisterPage = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactNumber: '',
    age: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!emailRegex.test(formData.email)) newErrors.email = 'Invalid email address';
    if (!phoneRegex.test(formData.contactNumber)) newErrors.contactNumber = 'Invalid phone number';
    if (formData.age < 18) newErrors.age = 'Must be at least 18 years old';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateForm()) return;

  try {
    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      contactNumber: formData.contactNumber,
      age: formData.age,
      verified: true // or remove if not used
    };

    const response = await register(payload);

    if (response.success) {
      // ✅ Redirect to login page after successful registration
      navigate('/login');
    } else {
      setErrors({ apiError: response.message || 'Registration failed' });
    }
  } catch (error) {
    setErrors({ apiError: 'Failed to connect to server' });
  }
};


  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Create New Account</h2>
        
        {errors.apiError && <div className="error-message">{errors.apiError}</div>}

        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>Contact Number</label>
          <input
            type="tel"
            value={formData.contactNumber}
            onChange={(e) => setFormData({...formData, contactNumber: e.target.value})}
            pattern="[0-9]{10}"
            required
          />
          {errors.contactNumber && <span className="error">{errors.contactNumber}</span>}
        </div>

        <div className="form-group">
          <label>Age</label>
          <input
            type="number"
            value={formData.age}
            onChange={(e) => setFormData({...formData, age: e.target.value})}
            min="18"
            required
          />
          {errors.age && <span className="error">{errors.age}</span>}
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            required
          />
          {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
        </div>

        <button type="submit" className="register-button">Create Account</button>
      </form>
    </div>
  );
};

export default RegisterPage;