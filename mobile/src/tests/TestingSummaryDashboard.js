import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { modernDesignSystem as ds } from '../styles/modernDesignSystem';

const TestingSummaryDashboard = () => {
  // Sample test summary data
  const testSummary = {
    overallProgress: 85,
    categories: {
      usability: { completed: 3, total: 3, percentage: 100 },
      compatibility: { completed: 2, total: 2, percentage: 100 },
      performance: { completed: 2, total: 3, percentage: 67 },
      offline: { completed: 2, total: 2, percentage: 100 },
      security: { completed: 1, total: 2, percentage: 50 },
      payment: { completed: 3, total: 3, percentage: 100 },
    },
    issues: {
      total: 12,
      byPriority: {
        critical: 1,
        high: 3,
        medium: 5,
        low: 3
      },
      byStatus: {
        open: 4,
        inProgress: 3,
        fixed: 5,
        wontFix: 0
      }
    },
    optimizations: {
      total: 8,
      implemented: 3,
      pending: 5
    },
    deviceCoverage: [
      { name: 'iPhone 13', tested: true },
      { name: 'iPhone SE', tested: true },
      { name: 'Samsung Galaxy S21', tested: true },
      { name: 'Google Pixel 6', tested: true },
      { name: 'iPad Pro', tested: false },
      { name: 'Samsung Galaxy Tab', tested: false }
    ],
    osCoverage: [
      { name: 'iOS 15', tested: true },
      { name: 'iOS 14', tested: true },
      { name: 'Android 12', tested: true },
      { name: 'Android 11', tested: true },
      { name: 'Android 10', tested: false }
    ]
  };

  const renderProgressBar = (percentage) => {
    return (
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${percentage}%` }]} />
      </View>
    );
  };

  const renderCategoryProgress = (category, data) => {
    return (
      <View style={styles.categoryProgressItem}>
        <View style={styles.categoryProgressHeader}>
          <Text style={styles.categoryName}>{category}</Text>
          <Text style={styles.categoryPercentage}>{data.percentage}%</Text>
        </View>
        {renderProgressBar(data.percentage)}
        <Text style={styles.categoryDetail}>
          {data.completed} of {data.total} tests passed
        </Text>
      </View>
    );
  };

  const renderIssuesByPriority = () => {
    const { byPriority } = testSummary.issues;
    const total = testSummary.issues.total;
    
    return (
      <View style={styles.issueBreakdownContainer}>
        <View style={styles.issueTypeHeader}>
          <Text style={styles.issueTypeTitle}>By Priority</Text>
        </View>
        
        <View style={styles.issueTypeItem}>
          <View style={[styles.issuePriorityIndicator, styles.criticalPriority]} />
          <Text style={styles.issueTypeLabel}>Critical</Text>
          <Text style={styles.issueTypeCount}>{byPriority.critical}</Text>
          <Text style={styles.issueTypePercentage}>
            {Math.round((byPriority.critical / total) * 100)}%
          </Text>
        </View>
        
        <View style={styles.issueTypeItem}>
          <View style={[styles.issuePriorityIndicator, styles.highPriority]} />
          <Text style={styles.issueTypeLabel}>High</Text>
          <Text style={styles.issueTypeCount}>{byPriority.high}</Text>
          <Text style={styles.issueTypePercentage}>
            {Math.round((byPriority.high / total) * 100)}%
          </Text>
        </View>
        
        <View style={styles.issueTypeItem}>
          <View style={[styles.issuePriorityIndicator, styles.mediumPriority]} />
          <Text style={styles.issueTypeLabel}>Medium</Text>
          <Text style={styles.issueTypeCount}>{byPriority.medium}</Text>
          <Text style={styles.issueTypePercentage}>
            {Math.round((byPriority.medium / total) * 100)}%
          </Text>
        </View>
        
        <View style={styles.issueTypeItem}>
          <View style={[styles.issuePriorityIndicator, styles.lowPriority]} />
          <Text style={styles.issueTypeLabel}>Low</Text>
          <Text style={styles.issueTypeCount}>{byPriority.low}</Text>
          <Text style={styles.issueTypePercentage}>
            {Math.round((byPriority.low / total) * 100)}%
          </Text>
        </View>
      </View>
    );
  };

  const renderIssuesByStatus = () => {
    const { byStatus } = testSummary.issues;
    const total = testSummary.issues.total;
    
    return (
      <View style={styles.issueBreakdownContainer}>
        <View style={styles.issueTypeHeader}>
          <Text style={styles.issueTypeTitle}>By Status</Text>
        </View>
        
        <View style={styles.issueTypeItem}>
          <View style={[styles.issueStatusIndicator, styles.openStatus]} />
          <Text style={styles.issueTypeLabel}>Open</Text>
          <Text style={styles.issueTypeCount}>{byStatus.open}</Text>
          <Text style={styles.issueTypePercentage}>
            {Math.round((byStatus.open / total) * 100)}%
          </Text>
        </View>
        
        <View style={styles.issueTypeItem}>
          <View style={[styles.issueStatusIndicator, styles.inProgressStatus]} />
          <Text style={styles.issueTypeLabel}>In Progress</Text>
          <Text style={styles.issueTypeCount}>{byStatus.inProgress}</Text>
          <Text style={styles.issueTypePercentage}>
            {Math.round((byStatus.inProgress / total) * 100)}%
          </Text>
        </View>
        
        <View style={styles.issueTypeItem}>
          <View style={[styles.issueStatusIndicator, styles.fixedStatus]} />
          <Text style={styles.issueTypeLabel}>Fixed</Text>
          <Text style={styles.issueTypeCount}>{byStatus.fixed}</Text>
          <Text style={styles.issueTypePercentage}>
            {Math.round((byStatus.fixed / total) * 100)}%
          </Text>
        </View>
        
        <View style={styles.issueTypeItem}>
          <View style={[styles.issueStatusIndicator, styles.wontFixStatus]} />
          <Text style={styles.issueTypeLabel}>Won't Fix</Text>
          <Text style={styles.issueTypeCount}>{byStatus.wontFix}</Text>
          <Text style={styles.issueTypePercentage}>
            {Math.round((byStatus.wontFix / total) * 100)}%
          </Text>
        </View>
      </View>
    );
  };

  const renderDeviceCoverage = () => {
    return (
      <View style={styles.coverageContainer}>
        <Text style={styles.coverageTitle}>Device Coverage</Text>
        <View style={styles.deviceList}>
          {testSummary.deviceCoverage.map((device, index) => (
            <View key={index} style={styles.deviceItem}>
              <Text style={styles.deviceName}>{device.name}</Text>
              <View style={[
                styles.deviceStatus,
                device.tested ? styles.deviceTested : styles.deviceNotTested
              ]}>
                <Text style={styles.deviceStatusText}>
                  {device.tested ? 'Tested' : 'Not Tested'}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const renderOSCoverage = () => {
    return (
      <View style={styles.coverageContainer}>
        <Text style={styles.coverageTitle}>OS Coverage</Text>
        <View style={styles.deviceList}>
          {testSummary.osCoverage.map((os, index) => (
            <View key={index} style={styles.deviceItem}>
              <Text style={styles.deviceName}>{os.name}</Text>
              <View style={[
                styles.deviceStatus,
                os.tested ? styles.deviceTested : styles.deviceNotTested
              ]}>
                <Text style={styles.deviceStatusText}>
                  {os.tested ? 'Tested' : 'Not Tested'}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Testing Summary Dashboard</Text>
        <Text style={styles.subtitle}>Quranic Quest App - v1.0.0</Text>
      </View>

      <View style={styles.overallProgressContainer}>
        <Text style={styles.overallProgressTitle}>Overall Testing Progress</Text>
        <View style={styles.overallProgressContent}>
          <View style={styles.progressCircleContainer}>
            <Text style={styles.progressPercentage}>{testSummary.overallProgress}%</Text>
            <Text style={styles.progressLabel}>Complete</Text>
          </View>
          <View style={styles.progressStatsContainer}>
            <View style={styles.progressStat}>
              <Text style={styles.progressStatValue}>{testSummary.issues.byStatus.fixed}</Text>
              <Text style={styles.progressStatLabel}>Issues Fixed</Text>
            </View>
            <View style={styles.progressStat}>
              <Text style={styles.progressStatValue}>{testSummary.issues.byStatus.open + testSummary.issues.byStatus.inProgress}</Text>
              <Text style={styles.progressStatLabel}>Issues Pending</Text>
            </View>
            <View style={styles.progressStat}>
              <Text style={styles.progressStatValue}>{testSummary.optimizations.implemented}</Text>
              <Text style={styles.progressStatLabel}>Optimizations Implemented</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Test Categories</Text>
        <View style={styles.categoryProgressContainer}>
          {renderCategoryProgress('Usability', testSummary.categories.usability)}
          {renderCategoryProgress('Compatibility', testSummary.categories.compatibility)}
          {renderCategoryProgress('Performance', testSummary.categories.performance)}
          {renderCategoryProgress('Offline Functionality', testSummary.categories.offline)}
          {renderCategoryProgress('Security', testSummary.categories.security)}
          {renderCategoryProgress('Payment Integration', testSummary.categories.payment)}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Issues Breakdown</Text>
        <View style={styles.issuesContainer}>
          <View style={styles.issuesSummary}>
            <View style={styles.issueStat}>
              <Text style={styles.issueStatValue}>{testSummary.issues.total}</Text>
              <Text style={styles.issueStatLabel}>Total Issues</Text>
            </View>
            <View style={styles.issueStat}>
              <Text style={styles.issueStatValue}>{testSummary.issues.byStatus.fixed}</Text>
              <Text style={styles.issueStatLabel}>Fixed</Text>
            </View>
            <View style={styles.issueStat}>
              <Text style={[styles.issueStatValue, styles.pendingValue]}>
                {testSummary.issues.byStatus.open + testSummary.issues.byStatus.inProgress}
              </Text>
              <Text style={styles.issueStatLabel}>Pending</Text>
            </View>
          </View>
          
          <View style={styles.issueBreakdownRow}>
            {renderIssuesByPriority()}
            {renderIssuesByStatus()}
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Optimizations</Text>
        <View style={styles.optimizationsContainer}>
          <View style={styles.optimizationsSummary}>
            <View style={styles.optimizationStat}>
              <Text style={styles.optimizationStatValue}>{testSummary.optimizations.total}</Text>
              <Text style={styles.optimizationStatLabel}>Total</Text>
            </View>
            <View style={styles.optimizationStat}>
              <Text style={styles.optimizationStatValue}>{testSummary.optimizations.implemented}</Text>
              <Text style={styles.optimizationStatLabel}>Implemented</Text>
            </View>
            <View style={styles.optimizationStat}>
              <Text style={styles.optimizationStatValue}>{testSummary.optimizations.pending}</Text>
              <Text style={styles.optimizationStatLabel}>Pending</Text>
            </View>
          </View>
          
          <View style={styles.optimizationProgress}>
            <View style={styles.optimizationProgressHeader}>
              <Text style={styles.optimizationProgressTitle}>Implementation Progress</Text>
              <Text style={styles.optimizationProgressPercentage}>
                {Math.round((testSummary.optimizations.implemented / testSummary.optimizations.total) * 100)}%
              </Text>
            </View>
            {renderProgressBar(Math.round((testSummary.optimizations.implemented / testSummary.optimizations.total) * 100))}
          </View>
          
          <TouchableOpacity style={styles.viewDetailsButton}>
            <Text style={styles.viewDetailsButtonText}>View Optimization Details</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Test Coverage</Text>
        <View style={styles.coverageRow}>
          {renderDeviceCoverage()}
          {renderOSCoverage()}
        </View>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>View Full Test Report</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.secondaryButton]}>
          <Text style={styles.secondaryButtonText}>Export Results</Text>
        </TouchableOpacity>
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
  overallProgressContainer: {
    margin: 20,
    padding: 20,
    backgroundColor: ds.colors.cardBackground,
    borderRadius: ds.borderRadius.medium,
    ...ds.shadows.medium,
  },
  overallProgressTitle: {
    fontSize: 18,
    fontFamily: ds.typography.fontFamily.bold,
    color: ds.colors.text,
    marginBottom: 15,
  },
  overallProgressContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressCircleContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(106, 61, 232, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 8,
    borderColor: ds.colors.primary,
  },
  progressPercentage: {
    fontSize: 28,
    fontFamily: ds.typography.fontFamily.bold,
    color: ds.colors.primary,
  },
  progressLabel: {
    fontSize: 14,
    fontFamily: ds.typography.fontFamily.medium,
    color: ds.colors.textSecondary,
  },
  progressStatsContainer: {
    flex: 1,
    marginLeft: 20,
  },
  progressStat: {
    marginBottom: 15,
  },
  progressStatValue: {
    fontSize: 18,
    fontFamily: ds.typography.fontFamily.bold,
    color: ds.colors.text,
  },
  progressStatLabel: {
    fontSize: 14,
    fontFamily: ds.typography.fontFamily.regular,
    color: ds.colors.textSecondary,
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
  categoryProgressContainer: {
    backgroundColor: ds.colors.cardBackground,
    borderRadius: ds.borderRadius.medium,
    padding: 15,
    ...ds.shadows.small,
  },
  categoryProgressItem: {
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: ds.colors.border,
  },
  categoryProgressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marg
(Content truncated due to size limit. Use line ranges to read in chunks)