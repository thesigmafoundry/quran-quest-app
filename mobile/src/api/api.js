import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Base URL for API requests
const API_BASE_URL = 'https://api.quranicquest.com'; // Will be replaced with actual API URL in production

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor to add auth token to requests
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    } catch (error) {
      console.error('Error setting auth token:', error);
      return config;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // If error is 401 (Unauthorized) and we haven't tried to refresh token yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Try to refresh the token
        const refreshToken = await AsyncStorage.getItem('refresh_token');
        if (!refreshToken) {
          // No refresh token, user needs to login again
          await logout();
          return Promise.reject(error);
        }
        
        const response = await axios.post(`${API_BASE_URL}/api/auth/refresh`, {
          refresh_token: refreshToken,
        });
        
        if (response.data.access_token) {
          // Save the new tokens
          await AsyncStorage.setItem('auth_token', response.data.access_token);
          if (response.data.refresh_token) {
            await AsyncStorage.setItem('refresh_token', response.data.refresh_token);
          }
          
          // Retry the original request with the new token
          originalRequest.headers.Authorization = `Bearer ${response.data.access_token}`;
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        console.error('Error refreshing token:', refreshError);
        // Token refresh failed, user needs to login again
        await logout();
      }
    }
    
    return Promise.reject(error);
  }
);

// Authentication API
const authAPI = {
  login: async (email, password) => {
    try {
      const response = await apiClient.post('/api/auth/token', {
        username: email, // FastAPI OAuth2 expects 'username'
        password: password,
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      
      if (response.data.access_token) {
        await AsyncStorage.setItem('auth_token', response.data.access_token);
        if (response.data.refresh_token) {
          await AsyncStorage.setItem('refresh_token', response.data.refresh_token);
        }
      }
      
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
  
  register: async (userData) => {
    try {
      const response = await apiClient.post('/api/users/register', userData);
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },
  
  logout: async () => {
    try {
      await AsyncStorage.removeItem('auth_token');
      await AsyncStorage.removeItem('refresh_token');
      return true;
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  },
  
  getCurrentUser: async () => {
    try {
      const response = await apiClient.get('/api/users/me');
      return response.data;
    } catch (error) {
      console.error('Get current user error:', error);
      throw error;
    }
  },
};

// Pronunciation API
const pronunciationAPI = {
  assessPronunciation: async (audioFile, verseId) => {
    try {
      // Create form data for file upload
      const formData = new FormData();
      formData.append('audio_file', {
        uri: audioFile.uri,
        name: audioFile.name || 'recording.m4a',
        type: audioFile.type || 'audio/m4a',
      });
      
      if (verseId) {
        formData.append('verse_id', verseId);
      }
      
      const response = await apiClient.post('/api/pronunciation/assess', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return response.data;
    } catch (error) {
      console.error('Pronunciation assessment error:', error);
      throw error;
    }
  },
  
  getDetailedFeedback: async (assessmentId) => {
    try {
      const response = await apiClient.get(`/api/pronunciation/feedback/${assessmentId}`);
      return response.data;
    } catch (error) {
      console.error('Get feedback error:', error);
      throw error;
    }
  },
  
  getPronunciationHistory: async (limit = 10, offset = 0) => {
    try {
      const response = await apiClient.get('/api/pronunciation/history', {
        params: { limit, offset },
      });
      return response.data;
    } catch (error) {
      console.error('Get pronunciation history error:', error);
      throw error;
    }
  },
  
  getPronunciationProgress: async (startDate, endDate) => {
    try {
      const params = {};
      if (startDate) params.start_date = startDate.toISOString();
      if (endDate) params.end_date = endDate.toISOString();
      
      const response = await apiClient.get('/api/pronunciation/progress', { params });
      return response.data;
    } catch (error) {
      console.error('Get pronunciation progress error:', error);
      throw error;
    }
  },
};

// Learning Paths API
const learningPathsAPI = {
  generateLearningPath: async (pathData) => {
    try {
      const response = await apiClient.post('/api/learning-paths/generate', pathData);
      return response.data;
    } catch (error) {
      console.error('Generate learning path error:', error);
      throw error;
    }
  },
  
  getCurrentLearningPath: async () => {
    try {
      const response = await apiClient.get('/api/learning-paths/current');
      return response.data;
    } catch (error) {
      console.error('Get current learning path error:', error);
      throw error;
    }
  },
  
  getLearningPathHistory: async (limit = 10, offset = 0) => {
    try {
      const response = await apiClient.get('/api/learning-paths/history', {
        params: { limit, offset },
      });
      return response.data;
    } catch (error) {
      console.error('Get learning path history error:', error);
      throw error;
    }
  },
  
  getNextLearningUnits: async (count = 3) => {
    try {
      const response = await apiClient.get('/api/learning-paths/next-units', {
        params: { count },
      });
      return response.data;
    } catch (error) {
      console.error('Get next learning units error:', error);
      throw error;
    }
  },
  
  updateLearningProgress: async (progressData) => {
    try {
      const response = await apiClient.post('/api/learning-paths/update-progress', progressData);
      return response.data;
    } catch (error) {
      console.error('Update learning progress error:', error);
      throw error;
    }
  },
  
  getLearningRecommendations: async (count = 5) => {
    try {
      const response = await apiClient.get('/api/learning-paths/recommendations', {
        params: { count },
      });
      return response.data;
    } catch (error) {
      console.error('Get learning recommendations error:', error);
      throw error;
    }
  },
  
  resetLearningPath: async () => {
    try {
      const response = await apiClient.post('/api/learning-paths/reset');
      return response.data;
    } catch (error) {
      console.error('Reset learning path error:', error);
      throw error;
    }
  },
};

// User Management API
const userAPI = {
  updateProfile: async (profileData) => {
    try {
      const response = await apiClient.put('/api/users/profile', profileData);
      return response.data;
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  },
  
  createChildProfile: async (childData) => {
    try {
      const response = await apiClient.post('/api/users/children', childData);
      return response.data;
    } catch (error) {
      console.error('Create child profile error:', error);
      throw error;
    }
  },
  
  getChildProfiles: async () => {
    try {
      const response = await apiClient.get('/api/users/children');
      return response.data;
    } catch (error) {
      console.error('Get child profiles error:', error);
      throw error;
    }
  },
  
  updateChildProfile: async (childId, childData) => {
    try {
      const response = await apiClient.put(`/api/users/children/${childId}`, childData);
      return response.data;
    } catch (error) {
      console.error('Update child profile error:', error);
      throw error;
    }
  },
  
  deleteChildProfile: async (childId) => {
    try {
      const response = await apiClient.delete(`/api/users/children/${childId}`);
      return response.data;
    } catch (error) {
      console.error('Delete child profile error:', error);
      throw error;
    }
  },
};

// Subscription API
const subscriptionAPI = {
  getSubscriptionStatus: async () => {
    try {
      const response = await apiClient.get('/api/subscriptions/status');
      return response.data;
    } catch (error) {
      console.error('Get subscription status error:', error);
      throw error;
    }
  },
  
  getSubscriptionPlans: async () => {
    try {
      const response = await apiClient.get('/api/subscriptions/plans');
      return response.data;
    } catch (error) {
      console.error('Get subscription plans error:', error);
      throw error;
    }
  },
  
  createSubscription: async (planId, paymentMethodId) => {
    try {
      const response = await apiClient.post('/api/subscriptions/create', {
        plan_id: planId,
        payment_method_id: paymentMethodId,
      });
      return response.data;
    } catch (error) {
      console.error('Create subscription error:', error);
      throw error;
    }
  },
  
  cancelSubscription: async () => {
    try {
      const response = await apiClient.post('/api/subscriptions/cancel');
      return response.data;
    } catch (error) {
      console.error('Cancel subscription error:', error);
      throw error;
    }
  },
  
  updateSubscription: async (planId) => {
    try {
      const response = await apiClient.put('/api/subscriptions/update', {
        plan_id: planId,
      });
      return response.data;
    } catch (error) {
      console.error('Update subscription error:', error);
      throw error;
    }
  },
};

// Helper function for logout
const logout = async () => {
  try {
    await AsyncStorage.removeItem('auth_token');
    await AsyncStorage.removeItem('refresh_token');
    // You might want to trigger navigation to login screen here
    // or use an event emitter to notify the app about logout
  } catch (error) {
    console.error('Logout error:', error);
  }
};

// Export all APIs
export {
  apiClient,
  authAPI,
  pronunciationAPI,
  learningPathsAPI,
  userAPI,
  subscriptionAPI,
};
