import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { modernDesignSystem as ds } from '../styles/modernDesignSystem';
import TestingGuide from './TestingGuide';
import TestReportForm from './TestReportForm';
import PerformanceTestResults from './PerformanceTestResults';
import OptimizationRecommendations from './OptimizationRecommendations';
import TestingSummaryDashboard from './TestingSummaryDashboard';

const TestingHub = () => {
  const [activeTab, setActiveTab] = React.useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <TestingSummaryDashboard />;
      case 'guide':
        return <TestingGuide />;
      case 'report':
        return <TestReportForm />;
      case 'performance':
        return <PerformanceTestResults />;
      case 'optimizations':
        return <OptimizationRecommendations />;
      default:
        return <TestingSummaryDashboard />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'dashboard' && styles.activeTab]}
          onPress={() => setActiveTab('dashboard')}
        >
          <Text style={[styles.tabText, activeTab === 'dashboard' && styles.activeTabText]}>
            Dashboard
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'guide' && styles.activeTab]}
          onPress={() => setActiveTab('guide')}
        >
          <Text style={[styles.tabText, activeTab === 'guide' && styles.activeTabText]}>
            Testing Guide
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'report' && styles.activeTab]}
          onPress={() => setActiveTab('report')}
        >
          <Text style={[styles.tabText, activeTab === 'report' && styles.activeTabText]}>
            Test Report
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'performance' && styles.activeTab]}
          onPress={() => setActiveTab('performance')}
        >
          <Text style={[styles.tabText, activeTab === 'performance' && styles.activeTabText]}>
            Performance
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'optimizations' && styles.activeTab]}
          onPress={() => setActiveTab('optimizations')}
        >
          <Text style={[styles.tabText, activeTab === 'optimizations' && styles.activeTabText]}>
            Optimizations
          </Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        {renderContent()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ds.colors.background,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: ds.colors.border,
    ...ds.shadows.small,
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: ds.colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontFamily: ds.typography.fontFamily.medium,
    color: ds.colors.textSecondary,
  },
  activeTabText: {
    color: ds.colors.primary,
  },
  content: {
    flex: 1,
  },
});

export default TestingHub;
