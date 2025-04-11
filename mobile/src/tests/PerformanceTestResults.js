import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { modernDesignSystem as ds } from '../styles/modernDesignSystem';

const PerformanceTestResults = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  // Sample performance test data
  const performanceData = {
    startupTime: {
      coldStart: {
        average: '2.8s',
        min: '2.3s',
        max: '3.4s',
        target: '< 3.0s',
        status: 'warning',
        devices: [
          { name: 'iPhone 13', value: '2.3s' },
          { name: 'Samsung Galaxy S21', value: '2.7s' },
          { name: 'iPhone SE', value: '3.4s' },
          { name: 'Google Pixel 6', value: '2.8s' },
        ]
      },
      warmStart: {
        average: '1.2s',
        min: '0.9s',
        max: '1.6s',
        target: '< 1.5s',
        status: 'success',
        devices: [
          { name: 'iPhone 13', value: '0.9s' },
          { name: 'Samsung Galaxy S21', value: '1.1s' },
          { name: 'iPhone SE', value: '1.6s' },
          { name: 'Google Pixel 6', value: '1.2s' },
        ]
      }
    },
    screenTransitions: {
      dashboard: {
        average: '280ms',
        min: '210ms',
        max: '350ms',
        target: '< 300ms',
        status: 'success',
        devices: [
          { name: 'iPhone 13', value: '210ms' },
          { name: 'Samsung Galaxy S21', value: '260ms' },
          { name: 'iPhone SE', value: '350ms' },
          { name: 'Google Pixel 6', value: '300ms' },
        ]
      },
      lessonScreen: {
        average: '320ms',
        min: '250ms',
        max: '410ms',
        target: '< 300ms',
        status: 'warning',
        devices: [
          { name: 'iPhone 13', value: '250ms' },
          { name: 'Samsung Galaxy S21', value: '310ms' },
          { name: 'iPhone SE', value: '410ms' },
          { name: 'Google Pixel 6', value: '310ms' },
        ]
      },
      progressScreen: {
        average: '290ms',
        min: '230ms',
        max: '370ms',
        target: '< 300ms',
        status: 'success',
        devices: [
          { name: 'iPhone 13', value: '230ms' },
          { name: 'Samsung Galaxy S21', value: '280ms' },
          { name: 'iPhone SE', value: '370ms' },
          { name: 'Google Pixel 6', value: '280ms' },
        ]
      }
    },
    apiResponses: {
      authentication: {
        average: '850ms',
        min: '720ms',
        max: '1100ms',
        target: '< 1000ms',
        status: 'success',
        devices: [
          { name: 'iPhone 13', value: '720ms' },
          { name: 'Samsung Galaxy S21', value: '800ms' },
          { name: 'iPhone SE', value: '1100ms' },
          { name: 'Google Pixel 6', value: '780ms' },
        ]
      },
      learningPath: {
        average: '1.8s',
        min: '1.5s',
        max: '2.3s',
        target: '< 2.0s',
        status: 'warning',
        devices: [
          { name: 'iPhone 13', value: '1.5s' },
          { name: 'Samsung Galaxy S21', value: '1.7s' },
          { name: 'iPhone SE', value: '2.3s' },
          { name: 'Google Pixel 6', value: '1.7s' },
        ]
      },
      pronunciationAssessment: {
        average: '3.2s',
        min: '2.8s',
        max: '4.1s',
        target: '< 3.0s',
        status: 'error',
        devices: [
          { name: 'iPhone 13', value: '2.8s' },
          { name: 'Samsung Galaxy S21', value: '3.0s' },
          { name: 'iPhone SE', value: '4.1s' },
          { name: 'Google Pixel 6', value: '2.9s' },
        ]
      }
    },
    memoryUsage: {
      initial: {
        average: '78MB',
        min: '65MB',
        max: '92MB',
        target: '< 100MB',
        status: 'success',
        devices: [
          { name: 'iPhone 13', value: '65MB' },
          { name: 'Samsung Galaxy S21', value: '72MB' },
          { name: 'iPhone SE', value: '92MB' },
          { name: 'Google Pixel 6', value: '83MB' },
        ]
      },
      after30Minutes: {
        average: '112MB',
        min: '95MB',
        max: '135MB',
        target: '< 150MB',
        status: 'success',
        devices: [
          { name: 'iPhone 13', value: '95MB' },
          { name: 'Samsung Galaxy S21', value: '105MB' },
          { name: 'iPhone SE', value: '135MB' },
          { name: 'Google Pixel 6', value: '113MB' },
        ]
      },
      memoryLeak: {
        detected: false,
        notes: 'No significant memory leaks detected during extended testing.'
      }
    },
    batteryUsage: {
      thirtyMinSession: {
        average: '4.2%',
        min: '3.5%',
        max: '5.8%',
        target: '< 5.0%',
        status: 'warning',
        devices: [
          { name: 'iPhone 13', value: '3.5%' },
          { name: 'Samsung Galaxy S21', value: '4.0%' },
          { name: 'iPhone SE', value: '5.8%' },
          { name: 'Google Pixel 6', value: '3.7%' },
        ]
      },
      audioRecording: {
        average: '6.5%/hour',
        min: '5.2%/hour',
        max: '8.1%/hour',
        target: '< 7.0%/hour',
        status: 'warning',
        devices: [
          { name: 'iPhone 13', value: '5.2%/hour' },
          { name: 'Samsung Galaxy S21', value: '6.3%/hour' },
          { name: 'iPhone SE', value: '8.1%/hour' },
          { name: 'Google Pixel 6', value: '6.4%/hour' },
        ]
      }
    }
  };

  const renderStatusBadge = (status) => {
    let backgroundColor;
    switch (status) {
      case 'success':
        backgroundColor = ds.colors.success;
        break;
      case 'warning':
        backgroundColor = ds.colors.warning;
        break;
      case 'error':
        backgroundColor = ds.colors.error;
        break;
      default:
        backgroundColor = ds.colors.textSecondary;
    }

    return (
      <View style={[styles.statusBadge, { backgroundColor }]}>
        <Text style={styles.statusText}>{status.toUpperCase()}</Text>
      </View>
    );
  };

  const renderMetricCard = (title, data) => {
    return (
      <View style={styles.metricCard}>
        <View style={styles.metricHeader}>
          <Text style={styles.metricTitle}>{title}</Text>
          {renderStatusBadge(data.status)}
        </View>
        
        <View style={styles.metricValues}>
          <View style={styles.metricValue}>
            <Text style={styles.metricValueLabel}>Average</Text>
            <Text style={styles.metricValueText}>{data.average}</Text>
          </View>
          <View style={styles.metricValue}>
            <Text style={styles.metricValueLabel}>Min</Text>
            <Text style={styles.metricValueText}>{data.min}</Text>
          </View>
          <View style={styles.metricValue}>
            <Text style={styles.metricValueLabel}>Max</Text>
            <Text style={styles.metricValueText}>{data.max}</Text>
          </View>
          <View style={styles.metricValue}>
            <Text style={styles.metricValueLabel}>Target</Text>
            <Text style={styles.metricValueText}>{data.target}</Text>
          </View>
        </View>
        
        {expandedSection === title && (
          <View style={styles.deviceList}>
            <Text style={styles.deviceListTitle}>Device Breakdown</Text>
            {data.devices.map((device, index) => (
              <View key={index} style={styles.deviceItem}>
                <Text style={styles.deviceName}>{device.name}</Text>
                <Text style={styles.deviceValue}>{device.value}</Text>
              </View>
            ))}
          </View>
        )}
        
        <TouchableOpacity 
          style={styles.expandButton}
          onPress={() => toggleSection(title)}
        >
          <Text style={styles.expandButtonText}>
            {expandedSection === title ? 'Hide Details' : 'Show Details'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Performance Test Results</Text>
        <Text style={styles.subtitle}>Detailed metrics across devices and scenarios</Text>
      </View>

      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Executive Summary</Text>
        <Text style={styles.summaryText}>
          The Quranic Quest app demonstrates good performance across most metrics, with a few areas
          requiring optimization. Startup times and screen transitions are generally within acceptable
          ranges, though older devices show slower performance. API response times for pronunciation
          assessment exceed targets and should be optimized. Memory usage is well-controlled with no
          detected leaks. Battery consumption is slightly higher than target on older devices.
        </Text>
        
        <View style={styles.recommendationsContainer}>
          <Text style={styles.recommendationsTitle}>Key Recommendations</Text>
          <Text style={styles.recommendation}>• Optimize pronunciation assessment API response time</Text>
          <Text style={styles.recommendation}>• Improve lesson screen transition performance</Text>
          <Text style={styles.recommendation}>• Reduce battery consumption during audio recording</Text>
          <Text style={styles.recommendation}>• Enhance performance on older devices</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Startup Time</Text>
        {renderMetricCard('Cold Start', performanceData.startupTime.coldStart)}
        {renderMetricCard('Warm Start', performanceData.startupTime.warmStart)}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Screen Transitions</Text>
        {renderMetricCard('Dashboard', performanceData.screenTransitions.dashboard)}
        {renderMetricCard('Lesson Screen', performanceData.screenTransitions.lessonScreen)}
        {renderMetricCard('Progress Screen', performanceData.screenTransitions.progressScreen)}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>API Response Times</Text>
        {renderMetricCard('Authentication', performanceData.apiResponses.authentication)}
        {renderMetricCard('Learning Path', performanceData.apiResponses.learningPath)}
        {renderMetricCard('Pronunciation Assessment', performanceData.apiResponses.pronunciationAssessment)}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Memory Usage</Text>
        {renderMetricCard('Initial Load', performanceData.memoryUsage.initial)}
        {renderMetricCard('After 30 Minutes', performanceData.memoryUsage.after30Minutes)}
        
        <View style={styles.noteCard}>
          <Text style={styles.noteTitle}>Memory Leak Analysis</Text>
          <Text style={styles.noteText}>
            {performanceData.memoryUsage.memoryLeak.detected 
              ? 'Memory leaks detected! See details below.'
              : 'No significant memory leaks detected during extended testing.'}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Battery Consumption</Text>
        {renderMetricCard('30-Minute Session', performanceData.batteryUsage.thirtyMinSession)}
        {renderMetricCard('Audio Recording', performanceData.batteryUsage.audioRecording)}
      </View>

      <View style={styles.optimizationSection}>
        <Text style={styles.optimizationTitle}>Optimization Plan</Text>
        
        <View style={styles.optimizationItem}>
          <View style={styles.optimizationHeader}>
            <Text style={styles.optimizationName}>Pronunciation Assessment API</Text>
            <View style={[styles.priorityBadge, styles.highPriority]}>
              <Text style={styles.priorityText}>HIGH</Text>
            </View>
          </View>
          <Text style={styles.optimizationDescription}>
            Current implementation exceeds response time targets. Optimize backend processing by implementing
            caching for common recitations, reducing audio preprocessing time, and optimizing the AI model inference.
          </Text>
        </View>
        
        <View style={styles.optimizationItem}>
          <View style={styles.optimizationHeader}>
            <Text style={styles.optimizationName}>Lesson Screen Transitions</Text>
            <View style={[styles.priorityBadge, styles.mediumPriority]}>
              <Text style={styles.priorityText}>MEDIUM</Text>
            </View>
          </View>
          <Text style={styles.optimizationDescription}>
            Implement lazy loading for lesson content, optimize image loading, and reduce component re-renders
            to improve transition times. Consider implementing skeleton screens for smoother perceived performance.
          </Text>
        </View>
        
        <View style={styles.optimizationItem}>
          <View style={styles.optimizationHeader}>
            <Text style={styles.optimizationName}>Battery Usage During Recording</Text>
            <View style={[styles.priorityBadge, styles.mediumPriority]}>
              <Text style={styles.priorityText}>MEDIUM</Text>
            </View>
          </View>
          <Text style={styles.optimizationDescription}>
            Optimize audio recording settings to reduce battery consumption. Implement more efficient audio
            processing algorithms and consider reducing sampling rate when appropriate.
          </Text>
        </View>
        
        <View style={styles.optimizationItem}>
          <View style={styles.optimizationHeader}>
            <Text style={styles.optimizationName}>Older Device Performance</Text>
            <View style={[styles.priorityBadge, styles.mediumPriority]}>
              <Text style={styles.priorityText}>MEDIUM</Text>
            </View>
          </View>
          <Text style={styles.optimizationDescription}>
            Implement device-specific optimizations for older devices. Reduce animation complexity,
            implement more aggressive asset compression, and consider simplified UI for low-end devices.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ds.colors.background,
  },
  header: {
    padding: 20,
    backgroundColor: ds.colors.primary,
  },
  title: {
    fontSize: 24,
    fontFamily: ds.typography.fontFamily.bold,
    color: 'white',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: ds.typography.fontFamily.regular,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  summaryContainer: {
    margin: 20,
    padding: 20,
    backgroundColor: ds.colors.cardBackground,
    borderRadius: ds.borderRadius.medium,
    ...ds.shadows.medium,
  },
  summaryTitle: {
    fontSize: 18,
    fontFamily: ds.typography.fontFamily.bold,
    color: ds.colors.text,
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 14,
    fontFamily: ds.typography.fontFamily.regular,
    color: ds.colors.text,
    lineHeight: 22,
    marginBottom: 15,
  },
  recommendationsContainer: {
    backgroundColor: 'rgba(106, 61, 232, 0.1)',
    padding: 15,
    borderRadius: ds.borderRadius.small,
  },
  recommendationsTitle: {
    fontSize: 16,
    fontFamily: ds.typography.fontFamily.semiBold,
    color: ds.colors.primary,
    marginBottom: 10,
  },
  recommendation: {
    fontSize: 14,
    fontFamily: ds.typography.fontFamily.regular,
    color: ds.colors.text,
    marginBottom: 5,
    lineHeight: 20,
  },
  section: {
    padding: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: ds.typography.fontFamily.bold,
    color: ds.colors.text,
    marginBottom: 15,
  },
  metricCard: {
    backgroundColo
(Content truncated due to size limit. Use line ranges to read in chunks)