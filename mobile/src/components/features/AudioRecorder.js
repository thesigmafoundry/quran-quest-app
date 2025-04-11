import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { usePronunciation } from '../contexts/PronunciationContext';
import { modernDesignSystem as ds } from '../styles/modernDesignSystem';

const AudioRecorder = ({ verseId, onRecordingComplete }) => {
  const [recording, setRecording] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [timer, setTimer] = useState(null);
  const { assessPronunciation, loading, setRecording: setPronunciationRecording } = usePronunciation();

  // Request permissions when component mounts
  useEffect(() => {
    (async () => {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access microphone is required!');
      }
    })();

    // Clean up recording when component unmounts
    return () => {
      if (recording) {
        stopRecording();
      }
      if (timer) {
        clearInterval(timer);
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      // Configure audio session
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });

      // Create and start recording
      const { recording: newRecording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      
      setRecording(newRecording);
      setIsRecording(true);
      setRecordingDuration(0);
      
      // Start timer to track recording duration
      const newTimer = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);
      setTimer(newTimer);
      
    } catch (error) {
      console.error('Failed to start recording', error);
      alert('Failed to start recording. Please try again.');
    }
  };

  const stopRecording = async () => {
    try {
      if (!recording) return;
      
      // Stop the timer
      if (timer) {
        clearInterval(timer);
        setTimer(null);
      }
      
      setIsRecording(false);
      
      // Stop recording
      await recording.stopAndUnloadAsync();
      
      // Get recording URI
      const uri = recording.getURI();
      setPronunciationRecording(uri);
      
      // Create file object for API
      const fileObj = {
        uri,
        type: 'audio/m4a',
        name: 'recording.m4a',
      };
      
      // Assess pronunciation if verseId is provided
      if (verseId) {
        const result = await assessPronunciation(fileObj, verseId);
        if (result.success && onRecordingComplete) {
          onRecordingComplete(result.assessment);
        }
      } else if (onRecordingComplete) {
        onRecordingComplete(uri);
      }
      
      // Reset recording
      setRecording(null);
      
    } catch (error) {
      console.error('Failed to stop recording', error);
      alert('Failed to process recording. Please try again.');
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={ds.colors.primary} />
          <Text style={styles.loadingText}>Analyzing pronunciation...</Text>
        </View>
      ) : (
        <>
          <View style={styles.timerContainer}>
            <Text style={styles.timerText}>{formatTime(recordingDuration)}</Text>
          </View>
          
          <TouchableOpacity
            style={[
              styles.recordButton,
              isRecording ? styles.recordingButton : null
            ]}
            onPress={isRecording ? stopRecording : startRecording}
          >
            <Ionicons
              name={isRecording ? 'stop' : 'mic'}
              size={32}
              color="white"
            />
          </TouchableOpacity>
          
          <Text style={styles.instructionText}>
            {isRecording
              ? 'Tap to stop recording'
              : 'Tap to start recording your recitation'}
          </Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  timerContainer: {
    marginBottom: 20,
  },
  timerText: {
    fontSize: 24,
    fontFamily: ds.typography.fontFamily.medium,
    color: ds.colors.text,
  },
  recordButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: ds.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    ...ds.shadows.medium,
  },
  recordingButton: {
    backgroundColor: ds.colors.error,
  },
  instructionText: {
    fontSize: 16,
    fontFamily: ds.typography.fontFamily.regular,
    color: ds.colors.textSecondary,
    textAlign: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    fontFamily: ds.typography.fontFamily.medium,
    color: ds.colors.textSecondary,
  },
});

export default AudioRecorder;
