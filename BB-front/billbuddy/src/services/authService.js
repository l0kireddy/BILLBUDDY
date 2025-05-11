// client/src/services/authService.js
const API_BASE = 'http://localhost:8080/api/auth';

export const register = async (userData) => {
  try {
    const response = await fetch(`${API_BASE}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, message: errorData.message || 'Registration failed' };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, message: 'Network error. Please try again.' };
  }
};

export const login = async (credentials) => {
  const response = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  return response.json();
};


export const logout = () => {
  localStorage.removeItem('token');
  sessionStorage.removeItem('user');
};