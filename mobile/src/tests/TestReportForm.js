import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { modernDesignSystem as ds } from '../styles/modernDesignSystem';

const TestReportForm = () => {
  const [testResults, setTestResults] = useState({
    usability: {
      onboardingFlow: { passed: false, notes: '' },
      lessonNavigation: { passed: false, notes: '' },
      pronunciationAssessment: { passed: false, notes: '' },
    },
    compatibility: {
      screenSizeAdaptation: { passed: false, notes: '' },
      platformCompatibility: { passed: false, notes: '' },
    },
    performance: {
      loadTime: { passed: false, notes: '' },
      memoryUsage: { passed: false, notes: '' },
      batteryConsumption: { passed: false, notes: '' },
    },
    offline: {
      offlineModeTransition: { passed: false, notes: '' },
      offlineContentAccess: { passed: false, notes: '' },
    },
    security: {
      authenticationSecurity: { passed: false, notes: '' },
      dataProtection: { passed: false, notes: '' },
    },
    payment: {
      subscriptionFlow: { passed: false, notes: '' },
      freeTrialActivation: { passed: false, notes: '' },
      subscriptionManagement: { passed: false, notes: '' },
    },
  });

  const [deviceInfo, setDeviceInfo] = useState({
    deviceName: '',
    osVersion: '',
    appVersion: '1.0.0',
    testerName: '',
  });

  const [issues, setIssues] = useState([
    { id: 1, description: '', severity: 'low', status: 'open' }
  ]);

  const handleTestResultChange = (category, test, passed) => {
    setTestResults({
      ...testResults,
      [category]: {
        ...testResults[category],
        [test]: {
          ...testResults[category][test],
          passed,
        }
      }
    });
  };

  const handleNotesChange = (category, test, notes) => {
    setTestResults({
      ...testResults,
      [category]: {
        ...testResults[category],
        [test]: {
          ...testResults[category][test],
          notes,
        }
      }
    });
  };

  const handleDeviceInfoChange = (field, value) => {
    setDeviceInfo({
      ...deviceInfo,
      [field]: value,
    });
  };

  const handleIssueChange = (id, field, value) => {
    setIssues(issues.map(issue => 
      issue.id === id ? { ...issue, [field]: value } : issue
    ));
  };

  const addIssue = () => {
    const newId = issues.length > 0 ? Math.max(...issues.map(i => i.id)) + 1 : 1;
    setIssues([...issues, { id: newId, description: '', severity: 'low', status: 'open' }]);
  };

  const removeIssue = (id) => {
    setIssues(issues.filter(issue => issue.id !== id));
  };

  const calculateTestProgress = () => {
    let totalTests = 0;
    let passedTests = 0;

    Object.keys(testResults).forEach(category => {
      Object.keys(testResults[category]).forEach(test => {
        totalTests++;
        if (testResults[category][test].passed) {
          passedTests++;
        }
      });
    });

    return {
      totalTests,
      passedTests,
      percentage: totalTests > 0 ? Math.round((passedTests / totalTests) * 100) : 0
    };
  };

  const progress = calculateTestProgress();

  const renderTestCategory = (categoryTitle, categoryKey, tests) => {
    return (
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryTitle}>{categoryTitle}</Text>
        
        {Object.keys(tests).map(testKey => {
          const test = tests[testKey];
          const testName = testKey
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase());
            
          return (
            <View key={testKey} style={styles.testItem}>
              <View style={styles.testHeader}>
                <Text style={styles.testName}>{testName}</Text>
                <View style={styles.testButtons}>
                  <TouchableOpacity
                    style={[
                      styles.testButton,
                      test.passed ? styles.passButton : styles.passButtonInactive
                    ]}
                    onPress={() => handleTestResultChange(categoryKey, testKey, true)}
                  >
                    <Text style={styles.testButtonText}>Pass</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.testButton,
                      !test.passed ? styles.failButton : styles.failButtonInactive
                    ]}
                    onPress={() => handleTestResultChange(categoryKey, testKey, false)}
                  >
                    <Text style={styles.testButtonText}>Fail</Text>
                  </TouchableOpacity>
                </View>
              </View>
              
              <TextInput
                style={styles.notesInput}
                placeholder="Test notes (optional)"
                value={test.notes}
                onChangeText={(text) => handleNotesChange(categoryKey, testKey, text)}
                multiline
              />
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Quranic Quest App Test Report</Text>
        <Text style={styles.subtitle}>Document test results and issues</Text>
      </View>

      {/* Test Progress */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressTitle}>Test Progress</Text>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${progress.percentage}%` }]} />
        </View>
        <Text style={styles.progressText}>
          {progress.passedTests} of {progress.totalTests} tests passed ({progress.percentage}%)
        </Text>
      </View>

      {/* Device Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Device Information</Text>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>Device Name</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., iPhone 13, Samsung Galaxy S21"
            value={deviceInfo.deviceName}
            onChangeText={(text) => handleDeviceInfoChange('deviceName', text)}
          />
        </View>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>OS Version</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., iOS 15.4, Android 12"
            value={deviceInfo.osVersion}
            onChangeText={(text) => handleDeviceInfoChange('osVersion', text)}
          />
        </View>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>App Version</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., 1.0.0"
            value={deviceInfo.appVersion}
            onChangeText={(text) => handleDeviceInfoChange('appVersion', text)}
          />
        </View>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>Tester Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Your name"
            value={deviceInfo.testerName}
            onChangeText={(text) => handleDeviceInfoChange('testerName', text)}
          />
        </View>
      </View>

      {/* Test Results */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Test Results</Text>
        
        {renderTestCategory('Usability Testing', 'usability', testResults.usability)}
        {renderTestCategory('Cross-Device Compatibility', 'compatibility', testResults.compatibility)}
        {renderTestCategory('Performance Testing', 'performance', testResults.performance)}
        {renderTestCategory('Offline Functionality', 'offline', testResults.offline)}
        {renderTestCategory('Security Testing', 'security', testResults.security)}
        {renderTestCategory('Payment Integration', 'payment', testResults.payment)}
      </View>

      {/* Issues Found */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Issues Found</Text>
        
        {issues.map((issue) => (
          <View key={issue.id} style={styles.issueContainer}>
            <View style={styles.issueHeader}>
              <Text style={styles.issueTitle}>Issue #{issue.id}</Text>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeIssue(issue.id)}
              >
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={styles.textArea}
                placeholder="Describe the issue in detail"
                value={issue.description}
                onChangeText={(text) => handleIssueChange(issue.id, 'description', text)}
                multiline
              />
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Severity</Text>
              <View style={styles.buttonGroup}>
                {['low', 'medium', 'high', 'critical'].map((severity) => (
                  <TouchableOpacity
                    key={severity}
                    style={[
                      styles.severityButton,
                      issue.severity === severity ? styles[`${severity}Button`] : styles.severityButtonInactive
                    ]}
                    onPress={() => handleIssueChange(issue.id, 'severity', severity)}
                  >
                    <Text style={styles.severityButtonText}>
                      {severity.charAt(0).toUpperCase() + severity.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Status</Text>
              <View style={styles.buttonGroup}>
                {['open', 'in progress', 'fixed', 'wont fix'].map((status) => (
                  <TouchableOpacity
                    key={status}
                    style={[
                      styles.statusButton,
                      issue.status === status ? styles[`${status.replace(' ', '')}Button`] : styles.statusButtonInactive
                    ]}
                    onPress={() => handleIssueChange(issue.id, 'status', status)}
                  >
                    <Text style={styles.statusButtonText}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        ))}
        
        <TouchableOpacity style={styles.addButton} onPress={addIssue}>
          <Text style={styles.addButtonText}>+ Add Issue</Text>
        </TouchableOpacity>
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Submit Test Report</Text>
      </TouchableOpacity>
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
  progressContainer: {
    padding: 20,
    backgroundColor: ds.colors.cardBackground,
    marginHorizontal: 20,
    marginTop: -20,
    borderRadius: ds.borderRadius.medium,
    ...ds.shadows.medium,
  },
  progressTitle: {
    fontSize: 18,
    fontFamily: ds.typography.fontFamily.semiBold,
    color: ds.colors.text,
    marginBottom: 10,
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: ds.colors.border,
    borderRadius: 5,
    marginBottom: 5,
  },
  progressBar: {
    height: '100%',
    backgroundColor: ds.colors.success,
    borderRadius: 5,
  },
  progressText: {
    fontSize: 14,
    fontFamily: ds.typography.fontFamily.medium,
    color: ds.colors.textSecondary,
    textAlign: 'right',
  },
  section: {
    padding: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: ds.typography.fontFamily.bold,
    color: ds.colors.text,
    marginBottom: 15,
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontFamily: ds.typography.fontFamily.medium,
    color: ds.colors.text,
    marginBottom: 5,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: ds.colors.border,
    borderRadius: ds.borderRadius.small,
    padding: 10,
    fontSize: 16,
    fontFamily: ds.typography.fontFamily.regular,
  },
  textArea: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: ds.colors.border,
    borderRadius: ds.borderRadius.small,
    padding: 10,
    fontSize: 16,
    fontFamily: ds.typography.fontFamily.regular,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  categoryContainer: {
    backgroundColor: ds.colors.cardBackground,
    borderRadius: ds.borderRadius.medium,
    padding: 15,
    marginBottom: 15,
    ...ds.shadows.small,
  },
  categoryTitle: {
    fontSize: 18,
    fontFamily: ds.typography.fontFamily.semiBold,
    color: ds.colors.text,
    marginBottom: 10,
  },
  testItem: {
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: ds.colors.border,
  },
  testHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  testName: {
    fontSize: 16,
    fontFamily: ds.typography.fontFamily.medium,
    color: ds.colors.text,
    flex: 1,
  },
  testButtons: {
    flexDirection: 'row',
  },
  testButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: ds.borderRadius.small,
    marginLeft: 10,
  },
  passButton: {
    backgroundColor: ds.colors.success,
  },
  passButtonInactive: {
    backgroundColor: 'rgba(75, 181, 67, 0.3)',
  },
  failButton: {
    backgroundColor: ds.colors.error,
  },
  failButtonInactive: {
    backgroundColor: 'rgba(239, 68, 68, 0.3)',
  },
  testButtonText: {
    color: 'white',
    fontSize: 14,
    fontFamily: ds.typography.fontFamily.medium,
  },
  notesInput: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: ds.colors.border,
    borderRadius: ds.borderRadius.small,
    padding: 10,
    fontSize: 14,
    fontFamily: ds.typography.fontFamily.regular,
    minHeight: 60,
    textAlignVertical: 'top',
  },
  issueContainer: {
    backgroundColor: ds.colors.cardBackground,
    borderRadius: ds.borderRadius.medium,
    padding: 15,
    marginBottom: 15,
    ...ds.shadows.small,
  },
  issueHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  issueTitle: {
    fontSize: 18,
    fontFamily: ds.typography.fontFamily.semiBold,
    color: ds.colors.text,
  },
  removeButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderRadius: ds.borderRadius.small,
  },
  removeButtonText: {
    color: ds.colors.error,
    fontSize: 14,
    fontFamily: ds.typography.fontFamily.medium,
  },
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  severityButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: ds.borderRadius.small,
    marginRight: 10,
    marginBottom: 10,
  },
  severityButtonInactive: {
    backgroundColor: ds.colors.border,
  },
  lowButton: {
    backgroundColor: '#4BB543',
  },
  med
(Content truncated due to size limit. Use line ranges to read in chunks)