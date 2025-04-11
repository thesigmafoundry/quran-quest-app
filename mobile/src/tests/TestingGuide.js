import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { modernDesignSystem as ds } from '../styles/modernDesignSystem';

const TestingGuide = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Quranic Quest App Testing Guide</Text>
        <Text style={styles.subtitle}>Comprehensive testing procedures for quality assurance</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. Usability Testing</Text>
        
        <View style={styles.testCase}>
          <Text style={styles.testCaseTitle}>1.1 Onboarding Flow</Text>
          <Text style={styles.testCaseDescription}>
            Test the complete onboarding process from welcome screen to dashboard.
          </Text>
          <View style={styles.testSteps}>
            <Text style={styles.testStepTitle}>Test Steps:</Text>
            <Text style={styles.testStep}>1. Launch the app and verify welcome screen appears</Text>
            <Text style={styles.testStep}>2. Navigate through user type selection (parent/teacher)</Text>
            <Text style={styles.testStep}>3. Complete child profile setup with various age ranges</Text>
            <Text style={styles.testStep}>4. Complete parent account setup with valid credentials</Text>
            <Text style={styles.testStep}>5. Complete initial assessment questions</Text>
            <Text style={styles.testStep}>6. Verify dashboard appears with personalized content</Text>
          </View>
          <View style={styles.expectedResults}>
            <Text style={styles.expectedResultsTitle}>Expected Results:</Text>
            <Text style={styles.expectedResult}>• All screens should load within 2 seconds</Text>
            <Text style={styles.expectedResult}>• Form validation should work correctly</Text>
            <Text style={styles.expectedResult}>• Progress should be saved between steps</Text>
            <Text style={styles.expectedResult}>• Dashboard should show content relevant to child's age and level</Text>
          </View>
        </View>

        <View style={styles.testCase}>
          <Text style={styles.testCaseTitle}>1.2 Lesson Navigation</Text>
          <Text style={styles.testCaseDescription}>
            Test navigation between lessons and within lesson content.
          </Text>
          <View style={styles.testSteps}>
            <Text style={styles.testStepTitle}>Test Steps:</Text>
            <Text style={styles.testStep}>1. Navigate to lessons tab</Text>
            <Text style={styles.testStep}>2. Select a lesson from the list</Text>
            <Text style={styles.testStep}>3. Navigate through lesson content (text, audio, interactive elements)</Text>
            <Text style={styles.testStep}>4. Complete lesson activities</Text>
            <Text style={styles.testStep}>5. Return to lesson list</Text>
            <Text style={styles.testStep}>6. Verify lesson progress is saved</Text>
          </View>
          <View style={styles.expectedResults}>
            <Text style={styles.expectedResultsTitle}>Expected Results:</Text>
            <Text style={styles.expectedResult}>• Lesson content should load correctly</Text>
            <Text style={styles.expectedResult}>• Audio playback should work smoothly</Text>
            <Text style={styles.expectedResult}>• Interactive elements should be responsive</Text>
            <Text style={styles.expectedResult}>• Progress should be saved when returning to lesson list</Text>
          </View>
        </View>

        <View style={styles.testCase}>
          <Text style={styles.testCaseTitle}>1.3 Pronunciation Assessment</Text>
          <Text style={styles.testCaseDescription}>
            Test the pronunciation recording and feedback functionality.
          </Text>
          <View style={styles.testSteps}>
            <Text style={styles.testStepTitle}>Test Steps:</Text>
            <Text style={styles.testStep}>1. Navigate to a lesson with pronunciation practice</Text>
            <Text style={styles.testStep}>2. Start audio recording</Text>
            <Text style={styles.testStep}>3. Record a sample recitation</Text>
            <Text style={styles.testStep}>4. Stop recording and submit for assessment</Text>
            <Text style={styles.testStep}>5. Wait for AI feedback</Text>
            <Text style={styles.testStep}>6. View detailed feedback</Text>
          </View>
          <View style={styles.expectedResults}>
            <Text style={styles.expectedResultsTitle}>Expected Results:</Text>
            <Text style={styles.expectedResult}>• Recording should start and stop correctly</Text>
            <Text style={styles.expectedResult}>• Audio quality should be clear</Text>
            <Text style={styles.expectedResult}>• Assessment should complete within 10 seconds</Text>
            <Text style={styles.expectedResult}>• Feedback should be relevant and helpful</Text>
            <Text style={styles.expectedResult}>• Detailed feedback should show phonetic breakdown</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>2. Cross-Device Compatibility</Text>
        
        <View style={styles.testCase}>
          <Text style={styles.testCaseTitle}>2.1 Screen Size Adaptation</Text>
          <Text style={styles.testCaseDescription}>
            Test app appearance and functionality across different screen sizes.
          </Text>
          <View style={styles.testSteps}>
            <Text style={styles.testStepTitle}>Test Devices:</Text>
            <Text style={styles.testStep}>• Small phones (iPhone SE, Samsung Galaxy S10e)</Text>
            <Text style={styles.testStep}>• Medium phones (iPhone 13, Samsung Galaxy S21)</Text>
            <Text style={styles.testStep}>• Large phones (iPhone 13 Pro Max, Samsung Galaxy S21 Ultra)</Text>
            <Text style={styles.testStep}>• Tablets (iPad, Samsung Galaxy Tab)</Text>
          </View>
          <View style={styles.testSteps}>
            <Text style={styles.testStepTitle}>Test Areas:</Text>
            <Text style={styles.testStep}>1. Onboarding screens</Text>
            <Text style={styles.testStep}>2. Dashboard layout</Text>
            <Text style={styles.testStep}>3. Lesson content display</Text>
            <Text style={styles.testStep}>4. Interactive elements (buttons, forms)</Text>
            <Text style={styles.testStep}>5. Text readability</Text>
          </View>
          <View style={styles.expectedResults}>
            <Text style={styles.expectedResultsTitle}>Expected Results:</Text>
            <Text style={styles.expectedResult}>• UI should adapt to different screen sizes</Text>
            <Text style={styles.expectedResult}>• No content should be cut off or inaccessible</Text>
            <Text style={styles.expectedResult}>• Text should be readable on all devices</Text>
            <Text style={styles.expectedResult}>• Touch targets should be appropriately sized</Text>
          </View>
        </View>

        <View style={styles.testCase}>
          <Text style={styles.testCaseTitle}>2.2 Platform Compatibility</Text>
          <Text style={styles.testCaseDescription}>
            Test app functionality across iOS and Android platforms.
          </Text>
          <View style={styles.testSteps}>
            <Text style={styles.testStepTitle}>Test Platforms:</Text>
            <Text style={styles.testStep}>• iOS 14, 15, 16</Text>
            <Text style={styles.testStep}>• Android 10, 11, 12, 13</Text>
          </View>
          <View style={styles.testSteps}>
            <Text style={styles.testStepTitle}>Test Areas:</Text>
            <Text style={styles.testStep}>1. Installation process</Text>
            <Text style={styles.testStep}>2. App permissions (microphone, storage)</Text>
            <Text style={styles.testStep}>3. Audio recording and playback</Text>
            <Text style={styles.testStep}>4. Navigation gestures</Text>
            <Text style={styles.testStep}>5. Background/foreground transitions</Text>
          </View>
          <View style={styles.expectedResults}>
            <Text style={styles.expectedResultsTitle}>Expected Results:</Text>
            <Text style={styles.expectedResult}>• App should install correctly on all platforms</Text>
            <Text style={styles.expectedResult}>• Permission requests should work properly</Text>
            <Text style={styles.expectedResult}>• Audio functionality should work on all platforms</Text>
            <Text style={styles.expectedResult}>• Navigation should be consistent</Text>
            <Text style={styles.expectedResult}>• App should handle background/foreground transitions gracefully</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>3. Performance Testing</Text>
        
        <View style={styles.testCase}>
          <Text style={styles.testCaseTitle}>3.1 Load Time Measurement</Text>
          <Text style={styles.testCaseDescription}>
            Measure app startup and screen transition times.
          </Text>
          <View style={styles.testSteps}>
            <Text style={styles.testStepTitle}>Test Areas:</Text>
            <Text style={styles.testStep}>1. App cold start time</Text>
            <Text style={styles.testStep}>2. App warm start time</Text>
            <Text style={styles.testStep}>3. Screen transition times</Text>
            <Text style={styles.testStep}>4. API response times</Text>
            <Text style={styles.testStep}>5. Content loading times</Text>
          </View>
          <View style={styles.expectedResults}>
            <Text style={styles.expectedResultsTitle}>Expected Results:</Text>
            <Text style={styles.expectedResult}>• Cold start: < 3 seconds</Text>
            <Text style={styles.expectedResult}>• Warm start: < 1.5 seconds</Text>
            <Text style={styles.expectedResult}>• Screen transitions: < 300ms</Text>
            <Text style={styles.expectedResult}>• API responses: < 2 seconds</Text>
            <Text style={styles.expectedResult}>• Content loading: < 1 second</Text>
          </View>
        </View>

        <View style={styles.testCase}>
          <Text style={styles.testCaseTitle}>3.2 Memory Usage</Text>
          <Text style={styles.testCaseDescription}>
            Monitor app memory usage during extended use.
          </Text>
          <View style={styles.testSteps}>
            <Text style={styles.testStepTitle}>Test Scenarios:</Text>
            <Text style={styles.testStep}>1. Extended app usage (30+ minutes)</Text>
            <Text style={styles.testStep}>2. Multiple lesson completions</Text>
            <Text style={styles.testStep}>3. Multiple pronunciation assessments</Text>
            <Text style={styles.testStep}>4. Rapid navigation between screens</Text>
          </View>
          <View style={styles.expectedResults}>
            <Text style={styles.expectedResultsTitle}>Expected Results:</Text>
            <Text style={styles.expectedResult}>• Memory usage should remain stable</Text>
            <Text style={styles.expectedResult}>• No memory leaks should occur</Text>
            <Text style={styles.expectedResult}>• App should not crash due to memory issues</Text>
            <Text style={styles.expectedResult}>• Performance should not degrade over time</Text>
          </View>
        </View>

        <View style={styles.testCase}>
          <Text style={styles.testCaseTitle}>3.3 Battery Consumption</Text>
          <Text style={styles.testCaseDescription}>
            Measure app battery usage during typical usage patterns.
          </Text>
          <View style={styles.testSteps}>
            <Text style={styles.testStepTitle}>Test Scenarios:</Text>
            <Text style={styles.testStep}>1. 30-minute learning session</Text>
            <Text style={styles.testStep}>2. Multiple audio recording sessions</Text>
            <Text style={styles.testStep}>3. Background audio playback</Text>
          </View>
          <View style={styles.expectedResults}>
            <Text style={styles.expectedResultsTitle}>Expected Results:</Text>
            <Text style={styles.expectedResult}>• Battery usage should be reasonable (< 5% for 30 min session)</Text>
            <Text style={styles.expectedResult}>• No excessive battery drain in background</Text>
            <Text style={styles.expectedResult}>• Audio recording should be optimized for battery usage</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>4. Offline Functionality</Text>
        
        <View style={styles.testCase}>
          <Text style={styles.testCaseTitle}>4.1 Offline Mode Transition</Text>
          <Text style={styles.testCaseDescription}>
            Test app behavior when transitioning between online and offline states.
          </Text>
          <View style={styles.testSteps}>
            <Text style={styles.testStepTitle}>Test Scenarios:</Text>
            <Text style={styles.testStep}>1. Start app online, then switch to airplane mode</Text>
            <Text style={styles.testStep}>2. Start app offline, then connect to network</Text>
            <Text style={styles.testStep}>3. Intermittent connectivity during app usage</Text>
          </View>
          <View style={styles.expectedResults}>
            <Text style={styles.expectedResultsTitle}>Expected Results:</Text>
            <Text style={styles.expectedResult}>• Offline banner should appear when connection is lost</Text>
            <Text style={styles.expectedResult}>• Cached content should be accessible offline</Text>
            <Text style={styles.expectedResult}>• App should sync data when connection is restored</Text>
            <Text style={styles.expectedResult}>• No crashes or data loss during connectivity changes</Text>
          </View>
        </View>

        <View style={styles.testCase}>
          <Text style={styles.testCaseTitle}>4.2 Offline Content Access</Text>
          <Text style={styles.testCaseDescription}>
            Test access to downloaded content in offline mode.
          </Text>
          <View style={styles.testSteps}>
            <Text style={styles.testStepTitle}>Test Steps:</Text>
            <Text style={styles.testStep}>1. Download content for offline use</Text>
            <Text style={styles.testStep}>2. Switch to airplane mode</Text>
            <Text style={styles.testStep}>3. Access downloaded lessons</Text>
            <Text style={styles.testStep}>4. Play downloaded audio</Text>
            <Text style={styles.testStep}>5. Complete lesson activities offline</Text>
          </View>
          <View style={styles.expectedResults}>
            <Text style={styles.expectedResultsTitle}>Expected Results:</Text>
            <Text style={styles.expectedResult}>• Downloaded content should be fully accessible</Text>
            <Text style={styles.expectedResult}>• Audio playback should work offline</Text>
            <Text style={styles.expectedResult}>• Progress should be saved locally</Text>
            <Text style={styles.expectedResult}>• UI should indicate which content is available offline</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>5. Security Testing</Text>
        
        <View style={styles.testCase}>
          <Text style={styles.testCaseTitle}>5.1 Authentication Security</Text>
          <Text style={styles.testCaseDescription}>
            Test security of authentication mechanisms.
          </Text>
          <View style={styles.testSteps}>
            <Text style={styles.testStepTitle}>Test Scenarios:</Text>
            <Text style={styles.testStep}>1. Password strength requirements</Text>
        
(Content truncated due to size limit. Use line ranges to read in chunks)