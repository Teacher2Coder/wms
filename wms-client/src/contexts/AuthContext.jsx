import { createContext, useContext, useState, useEffect } from 'react';
import axios from '../utils/axios-config.js'; // Use the configured axios instance
import auth from '../utils/auth/auth.js';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Set up axios default headers
  useEffect(() => {
    if (token) {
      // Set the authorization header for all requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      // Remove authorization header when no token
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // Check if user is logged in on app start
  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        try {
          // Verify token is still valid by getting user info
          const userData = await auth.myInfo();
          setUser(userData);
          setToken(storedToken);
        } catch (error) {
          // Token is invalid, remove it
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (username, password) => {
    try {
      const response = await auth.login(username, password);
      const { token: newToken, user: userData } = response;
      
      // Store token in localStorage
      localStorage.setItem('token', newToken);
      setToken(newToken);
      setUser(userData);

      // Set axios default header
      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;

      return { success: true, user: userData };
    } catch (error) {
      console.error('Login failed:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Login failed. Please check your credentials.' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    
    // Remove axios default header
    delete axios.defaults.headers.common['Authorization'];
  };

  const register = async (userData) => {
    try {
      const newUser = await auth.register(
        userData.username,
        userData.password,
        userData.firstName,
        userData.lastName,
        userData.role
      );
      return { success: true, user: newUser };
    } catch (error) {
      console.error('Registration failed:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Registration failed.' 
      };
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    try {
      await auth.changePassword(currentPassword, newPassword);
      return { success: true };
    } catch (error) {
      console.error('Password change failed:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Password change failed.' 
      };
    }
  };

  const updateUserInfo = async () => {
    try {
      const userData = await auth.myInfo();
      setUser(userData);
      return userData;
    } catch (error) {
      console.error('Failed to update user info:', error);
      return null;
    }
  };

  const updateProfile = async (profileData) => {
    try {
      await auth.updateProfile(profileData);
      // Refresh user data after successful update
      const updatedUser = await auth.myInfo();
      setUser(updatedUser);
      return { success: true };
    } catch (error) {
      console.error('Profile update failed:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Profile update failed.' 
      };
    }
  };

  const updateUser = async (userData) => {
    try {
      await auth.updateUser(userData.id, userData.username, userData.firstName, userData.lastName, userData.role);
      return { success: true };
    } catch (error) {
      console.error('User update failed:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'User update failed.' 
      };
    }
  };

  // Handle both numeric and string role values
  const getRoleString = (role) => {
    if (typeof role === 'number') {
      return role === 0 ? 'Admin' : role === 1 ? 'Manager' : 'Employee';
    }
    return role;
  };

  const userRole = getRoleString(user?.role);
  const isAdmin = userRole === 'Admin';
  const isManager = userRole === 'Manager';
  const isEmployee = userRole === 'Employee';
  const canManage = userRole === 'Admin' || userRole === 'Manager';

  const value = {
    user,
    token,
    loading,
    login,
    logout,
    register,
    changePassword,
    updateUserInfo,
    updateProfile,
    updateUser,
    isAuthenticated: !!user,
    isAdmin,
    isManager,
    isEmployee,
    canManage
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
