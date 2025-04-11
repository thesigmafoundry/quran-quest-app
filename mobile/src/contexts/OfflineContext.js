import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { apiClient } from '../api/api';
import { modernDesignSystem as ds } from '../styles/modernDesignSystem';

// Cache configuration
const CACHE_CONFIG = {
  // Cache expiration times in milliseconds
  DEFAULT_EXPIRATION: 24 * 60 * 60 * 1000, // 24 hours
  LEARNING_PATH_EXPIRATION: 7 * 24 * 60 * 60 * 1000, // 7 days
  QURAN_CONTENT_EXPIRATION: 30 * 24 * 60 * 60 * 1000, // 30 days
  
  // Cache keys prefixes
  KEYS: {
    API_RESPONSE: 'api_cache_',
    LEARNING_PATH: 'learning_path_',
    QURAN_CONTENT: 'quran_content_',
    USER_DATA: 'user_data_',
    AUDIO_FILES: 'audio_files_',
  }
};

// Offline Data Provider Component
const OfflineDataProvider = ({ children }) => {
  const [isOnline, setIsOnline] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Set up network status listener
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOnline(state.isConnected && state.isInternetReachable);
    });

    // Initialize offline capabilities
    initializeOfflineCapabilities();

    // Clean up listener on unmount
    return () => {
      unsubscribe();
    };
  }, []);

  // Initialize offline capabilities
  const initializeOfflineCapabilities = async () => {
    try {
      // Check if we need to set up initial cache
      const isCacheInitialized = await AsyncStorage.getItem('cache_initialized');
      
      if (!isCacheInitialized) {
        // Pre-cache essential data if online
        const netInfo = await NetInfo.fetch();
        if (netInfo.isConnected && netInfo.isInternetReachable) {
          await preCacheEssentialData();
        }
        
        // Set up API interceptors for caching
        setupApiInterceptors();
        
        // Mark cache as initialized
        await AsyncStorage.setItem('cache_initialized', 'true');
      } else {
        // Just set up API interceptors
        setupApiInterceptors();
      }
      
      setIsInitialized(true);
    } catch (error) {
      console.error('Error initializing offline capabilities:', error);
      setIsInitialized(true); // Continue even if there's an error
    }
  };

  // Pre-cache essential data
  const preCacheEssentialData = async () => {
    try {
      // Cache Quran surahs list
      const surahsResponse = await apiClient.get('/api/quran/surahs');
      await cacheData(
        `${CACHE_CONFIG.KEYS.QURAN_CONTENT}surahs`,
        surahsResponse.data,
        CACHE_CONFIG.QURAN_CONTENT_EXPIRATION
      );
      
      // Cache common recitation audio files
      // This would be implemented based on app requirements
      
    } catch (error) {
      console.error('Error pre-caching essential data:', error);
    }
  };

  // Set up API interceptors for caching
  const setupApiInterceptors = () => {
    // Request interceptor - try to use cached data when offline
    apiClient.interceptors.request.use(
      async (config) => {
        // If online, proceed with request
        const netInfo = await NetInfo.fetch();
        if (netInfo.isConnected && netInfo.isInternetReachable) {
          return config;
        }
        
        // If offline, try to use cached data
        try {
          const cacheKey = `${CACHE_CONFIG.KEYS.API_RESPONSE}${config.url}`;
          const cachedData = await AsyncStorage.getItem(cacheKey);
          
          if (cachedData) {
            const { data, timestamp, expiration } = JSON.parse(cachedData);
            const isExpired = Date.now() - timestamp > expiration;
            
            if (!isExpired) {
              // Cancel the request and return cached data
              const error = new Error('Using cached data due to offline mode');
              error.config = config;
              error.response = {
                status: 200,
                data: data,
                headers: {},
                config: config,
                fromCache: true
              };
              return Promise.reject(error);
            }
          }
          
          // No valid cache, proceed with request (will likely fail if offline)
          return config;
        } catch (error) {
          console.error('Error in offline request interceptor:', error);
          return config;
        }
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor - cache successful responses
    apiClient.interceptors.response.use(
      async (response) => {
        // Don't cache if response is already from cache
        if (response.fromCache) {
          return response;
        }
        
        try {
          // Determine if this response should be cached
          if (shouldCacheResponse(response.config.url)) {
            const cacheKey = `${CACHE_CONFIG.KEYS.API_RESPONSE}${response.config.url}`;
            const expiration = getCacheExpiration(response.config.url);
            
            await cacheData(cacheKey, response.data, expiration);
          }
        } catch (error) {
          console.error('Error in caching response:', error);
        }
        
        return response;
      },
      (error) => {
        // If error has response with fromCache flag, return the cached data
        if (error.response && error.response.fromCache) {
          return Promise.resolve(error.response);
        }
        
        return Promise.reject(error);
      }
    );
  };

  // Determine if a response should be cached based on URL
  const shouldCacheResponse = (url) => {
    // Don't cache authentication or user-specific data
    if (url.includes('/api/auth/') || url.includes('/api/users/me')) {
      return false;
    }
    
    // Cache Quran content, learning paths, etc.
    if (
      url.includes('/api/quran/') ||
      url.includes('/api/learning-paths/') ||
      url.includes('/api/pronunciation/') ||
      url.includes('/api/subscriptions/plans')
    ) {
      return true;
    }
    
    // Default: don't cache
    return false;
  };

  // Get cache expiration time based on URL
  const getCacheExpiration = (url) => {
    if (url.includes('/api/quran/')) {
      return CACHE_CONFIG.QURAN_CONTENT_EXPIRATION;
    }
    
    if (url.includes('/api/learning-paths/')) {
      return CACHE_CONFIG.LEARNING_PATH_EXPIRATION;
    }
    
    return CACHE_CONFIG.DEFAULT_EXPIRATION;
  };

  // Cache data with expiration
  const cacheData = async (key, data, expiration) => {
    try {
      const cacheItem = {
        data: data,
        timestamp: Date.now(),
        expiration: expiration
      };
      
      await AsyncStorage.setItem(key, JSON.stringify(cacheItem));
    } catch (error) {
      console.error(`Error caching data for key ${key}:`, error);
    }
  };

  // Utility functions to expose to consumers
  const offlineUtils = {
    // Check if device is online
    isOnline: () => isOnline,
    
    // Cache custom data
    cacheCustomData: async (key, data, expiration = CACHE_CONFIG.DEFAULT_EXPIRATION) => {
      await cacheData(key, data, expiration);
    },
    
    // Get cached data
    getCachedData: async (key) => {
      try {
        const cachedItem = await AsyncStorage.getItem(key);
        if (!cachedItem) return null;
        
        const { data, timestamp, expiration } = JSON.parse(cachedItem);
        const isExpired = Date.now() - timestamp > expiration;
        
        return isExpired ? null : data;
      } catch (error) {
        console.error(`Error getting cached data for key ${key}:`, error);
        return null;
      }
    },
    
    // Clear specific cache
    clearCache: async (keyPrefix) => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        const keysToRemove = keys.filter(key => key.startsWith(keyPrefix));
        
        if (keysToRemove.length > 0) {
          await AsyncStorage.multiRemove(keysToRemove);
        }
      } catch (error) {
        console.error(`Error clearing cache with prefix ${keyPrefix}:`, error);
      }
    },
    
    // Clear all cache
    clearAllCache: async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        const cacheKeys = keys.filter(key => 
          key.startsWith(CACHE_CONFIG.KEYS.API_RESPONSE) ||
          key.startsWith(CACHE_CONFIG.KEYS.LEARNING_PATH) ||
          key.startsWith(CACHE_CONFIG.KEYS.QURAN_CONTENT) ||
          key.startsWith(CACHE_CONFIG.KEYS.USER_DATA) ||
          key.startsWith(CACHE_CONFIG.KEYS.AUDIO_FILES)
        );
        
        if (cacheKeys.length > 0) {
          await AsyncStorage.multiRemove(cacheKeys);
        }
      } catch (error) {
        console.error('Error clearing all cache:', error);
      }
    },
    
    // Download content for offline use
    downloadContentForOffline: async (contentType, contentId) => {
      try {
        // Implementation would depend on content type
        switch (contentType) {
          case 'surah':
            // Download surah content and audio
            const surahResponse = await apiClient.get(`/api/quran/surah/${contentId}`);
            await cacheData(
              `${CACHE_CONFIG.KEYS.QURAN_CONTENT}surah_${contentId}`,
              surahResponse.data,
              CACHE_CONFIG.QURAN_CONTENT_EXPIRATION
            );
            
            // Download audio would be implemented separately
            return { success: true };
            
          case 'lesson':
            // Download lesson content
            const lessonResponse = await apiClient.get(`/api/learning-paths/lesson/${contentId}`);
            await cacheData(
              `${CACHE_CONFIG.KEYS.LEARNING_PATH}lesson_${contentId}`,
              lessonResponse.data,
              CACHE_CONFIG.LEARNING_PATH_EXPIRATION
            );
            return { success: true };
            
          default:
            return { success: false, error: 'Unsupported content type' };
        }
      } catch (error) {
        console.error(`Error downloading content for offline use (${contentType}, ${contentId}):`, error);
        return { success: false, error: error.message };
      }
    }
  };

  if (!isInitialized) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={ds.colors.primary} />
        <Text style={styles.loadingText}>Initializing offline capabilities...</Text>
      </View>
    );
  }

  // Create offline context with the offline status and utilities
  return (
    <OfflineContext.Provider value={offlineUtils}>
      <View style={styles.container}>
        {!isOnline && (
          <View style={styles.offlineBanner}>
            <Text style={styles.offlineText}>You are offline. Some features may be limited.</Text>
          </View>
        )}
        {children}
      </View>
    </OfflineContext.Provider>
  );
};

// Create Offline Context
const OfflineContext = React.createContext({
  isOnline: () => true,
  cacheCustomData: async () => {},
  getCachedData: async () => null,
  clearCache: async () => {},
  clearAllCache: async () => {},
  downloadContentForOffline: async () => ({ success: false })
});

// Custom hook to use the offline context
export const useOffline = () => React.useContext(OfflineContext);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    fontFamily: ds.typography.fontFamily.medium,
    color: ds.colors.textSecondary,
  },
  offlineBanner: {
    backgroundColor: ds.colors.warning,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  offlineText: {
    color: 'white',
    fontSize: 14,
    fontFamily: ds.typography.fontFamily.medium,
  }
});

export default OfflineDataProvider;
