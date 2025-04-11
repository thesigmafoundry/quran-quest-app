import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authAPI } from '../api/api';

// Create Authentication Context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Authentication Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is logged in on app start
  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = await AsyncStorage.getItem('auth_token');
        if (token) {
          // Token exists, try to get current user
          const userData = await authAPI.getCurrentUser();
          setUser(userData);
        }
      } catch (err) {
        console.error('Error loading user:', err);
        // Clear invalid tokens
        await AsyncStorage.removeItem('auth_token');
        await AsyncStorage.removeItem('refresh_token');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      const data = await authAPI.login(email, password);
      
      // Get user data after successful login
      const userData = await authAPI.getCurrentUser();
      setUser(userData);
      
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed. Please check your credentials.');
      return { success: false, error: err.response?.data?.detail || 'Login failed' };
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      await authAPI.register(userData);
      
      // Auto login after registration
      return await login(userData.email, userData.password);
    } catch (err) {
      setError(err.response?.data?.detail || 'Registration failed. Please try again.');
      return { success: false, error: err.response?.data?.detail || 'Registration failed' };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      setLoading(true);
      await authAPI.logout();
      setUser(null);
      return { success: true };
    } catch (err) {
      setError('Logout failed');
      return { success: false, error: 'Logout failed' };
    } finally {
      setLoading(false);
    }
  };

  // Update user profile
  const updateProfile = async (profileData) => {
    try {
      setLoading(true);
      const updatedUser = await authAPI.updateProfile(profileData);
      setUser(updatedUser);
      return { success: true };
    } catch (err) {
      setError('Failed to update profile');
      return { success: false, error: 'Failed to update profile' };
    } finally {
      setLoading(false);
    }
  };

  // Check if user has active subscription
  const hasActiveSubscription = () => {
    if (!user) return false;
    
    return (
      user.subscription_status === 'active' || 
      user.subscription_status === 'trial'
    ) && (
      !user.subscription_expiry || 
      new Date(user.subscription_expiry) > new Date()
    );
  };

  // Provide auth context to children components
  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        updateProfile,
        hasActiveSubscription,
        isAuthenticated: !!user,
        isParent: user?.is_parent || false,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
