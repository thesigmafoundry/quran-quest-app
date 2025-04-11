import React, { createContext, useState, useContext } from 'react';
import { pronunciationAPI } from '../api/api';

// Create Pronunciation Context
const PronunciationContext = createContext();

// Custom hook to use the pronunciation context
export const usePronunciation = () => useContext(PronunciationContext);

// Pronunciation Provider Component
export const PronunciationProvider = ({ children }) => {
  const [assessment, setAssessment] = useState(null);
  const [detailedFeedback, setDetailedFeedback] = useState(null);
  const [history, setHistory] = useState([]);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recordingUri, setRecordingUri] = useState(null);

  // Assess pronunciation from audio recording
  const assessPronunciation = async (audioFile, verseId) => {
    try {
      setLoading(true);
      setError(null);
      const result = await pronunciationAPI.assessPronunciation(audioFile, verseId);
      setAssessment(result);
      return { success: true, assessment: result };
    } catch (err) {
      setError('Failed to assess pronunciation');
      return { success: false, error: 'Failed to assess pronunciation' };
    } finally {
      setLoading(false);
    }
  };

  // Get detailed feedback for an assessment
  const getDetailedFeedback = async (assessmentId) => {
    try {
      setLoading(true);
      setError(null);
      const feedback = await pronunciationAPI.getDetailedFeedback(assessmentId);
      setDetailedFeedback(feedback);
      return { success: true, feedback };
    } catch (err) {
      setError('Failed to get detailed feedback');
      return { success: false, error: 'Failed to get detailed feedback' };
    } finally {
      setLoading(false);
    }
  };

  // Fetch pronunciation history
  const fetchHistory = async (limit = 10, offset = 0) => {
    try {
      setLoading(true);
      setError(null);
      const historyData = await pronunciationAPI.getPronunciationHistory(limit, offset);
      setHistory(historyData);
      return { success: true, history: historyData };
    } catch (err) {
      setError('Failed to fetch pronunciation history');
      return { success: false, error: 'Failed to fetch pronunciation history' };
    } finally {
      setLoading(false);
    }
  };

  // Fetch pronunciation progress
  const fetchProgress = async (startDate, endDate) => {
    try {
      setLoading(true);
      setError(null);
      const progressData = await pronunciationAPI.getPronunciationProgress(startDate, endDate);
      setProgress(progressData);
      return { success: true, progress: progressData };
    } catch (err) {
      setError('Failed to fetch pronunciation progress');
      return { success: false, error: 'Failed to fetch pronunciation progress' };
    } finally {
      setLoading(false);
    }
  };

  // Set recording URI (used by recording component)
  const setRecording = (uri) => {
    setRecordingUri(uri);
  };

  // Clear current assessment
  const clearAssessment = () => {
    setAssessment(null);
    setDetailedFeedback(null);
  };

  // Provide pronunciation context to children components
  return (
    <PronunciationContext.Provider
      value={{
        assessment,
        detailedFeedback,
        history,
        progress,
        loading,
        error,
        recordingUri,
        assessPronunciation,
        getDetailedFeedback,
        fetchHistory,
        fetchProgress,
        setRecording,
        clearAssessment,
        hasAssessment: !!assessment,
      }}
    >
      {children}
    </PronunciationContext.Provider>
  );
};
