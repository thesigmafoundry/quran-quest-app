import React, { createContext, useState, useContext } from 'react';
import { learningPathsAPI } from '../api/api';

// Create Learning Path Context
const LearningPathContext = createContext();

// Custom hook to use the learning path context
export const useLearningPath = () => useContext(LearningPathContext);

// Learning Path Provider Component
export const LearningPathProvider = ({ children }) => {
  const [currentPath, setCurrentPath] = useState(null);
  const [nextUnits, setNextUnits] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch current learning path
  const fetchCurrentPath = async () => {
    try {
      setLoading(true);
      setError(null);
      const path = await learningPathsAPI.getCurrentLearningPath();
      setCurrentPath(path);
      return { success: true, path };
    } catch (err) {
      if (err.response?.status === 404) {
        // No active learning path found, not an error
        setCurrentPath(null);
        return { success: false, needsGeneration: true };
      } else {
        setError('Failed to fetch learning path');
        return { success: false, error: 'Failed to fetch learning path' };
      }
    } finally {
      setLoading(false);
    }
  };

  // Generate new learning path
  const generateLearningPath = async (pathData) => {
    try {
      setLoading(true);
      setError(null);
      const path = await learningPathsAPI.generateLearningPath(pathData);
      setCurrentPath(path);
      return { success: true, path };
    } catch (err) {
      setError('Failed to generate learning path');
      return { success: false, error: 'Failed to generate learning path' };
    } finally {
      setLoading(false);
    }
  };

  // Fetch next learning units
  const fetchNextUnits = async (count = 3) => {
    try {
      setLoading(true);
      setError(null);
      const units = await learningPathsAPI.getNextLearningUnits(count);
      setNextUnits(units);
      return { success: true, units };
    } catch (err) {
      setError('Failed to fetch next units');
      return { success: false, error: 'Failed to fetch next units' };
    } finally {
      setLoading(false);
    }
  };

  // Update learning progress
  const updateProgress = async (progressData) => {
    try {
      setLoading(true);
      setError(null);
      const result = await learningPathsAPI.updateLearningProgress(progressData);
      
      // Refresh next units after updating progress
      await fetchNextUnits();
      
      return { success: true, result };
    } catch (err) {
      setError('Failed to update progress');
      return { success: false, error: 'Failed to update progress' };
    } finally {
      setLoading(false);
    }
  };

  // Fetch learning recommendations
  const fetchRecommendations = async (count = 5) => {
    try {
      setLoading(true);
      setError(null);
      const recs = await learningPathsAPI.getLearningRecommendations(count);
      setRecommendations(recs);
      return { success: true, recommendations: recs };
    } catch (err) {
      setError('Failed to fetch recommendations');
      return { success: false, error: 'Failed to fetch recommendations' };
    } finally {
      setLoading(false);
    }
  };

  // Reset learning path
  const resetLearningPath = async () => {
    try {
      setLoading(true);
      setError(null);
      const path = await learningPathsAPI.resetLearningPath();
      setCurrentPath(path);
      return { success: true, path };
    } catch (err) {
      setError('Failed to reset learning path');
      return { success: false, error: 'Failed to reset learning path' };
    } finally {
      setLoading(false);
    }
  };

  // Calculate progress percentage
  const getProgressPercentage = () => {
    if (!currentPath) return 0;
    
    const totalUnits = currentPath.learning_units.length;
    const completedUnits = currentPath.completed_unit_ids.length;
    
    return totalUnits > 0 ? (completedUnits / totalUnits) * 100 : 0;
  };

  // Get current learning unit
  const getCurrentUnit = () => {
    if (!currentPath || !currentPath.learning_units || currentPath.learning_units.length === 0) {
      return null;
    }
    
    return currentPath.learning_units[currentPath.current_unit_index];
  };

  // Provide learning path context to children components
  return (
    <LearningPathContext.Provider
      value={{
        currentPath,
        nextUnits,
        recommendations,
        loading,
        error,
        fetchCurrentPath,
        generateLearningPath,
        fetchNextUnits,
        updateProgress,
        fetchRecommendations,
        resetLearningPath,
        getProgressPercentage,
        getCurrentUnit,
        hasActivePath: !!currentPath,
      }}
    >
      {children}
    </LearningPathContext.Provider>
  );
};
