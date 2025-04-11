import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { modernDesignSystem as ds } from '../styles/modernDesignSystem';

const OptimizationRecommendations = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  // Optimization recommendations data
  const optimizations = [
    {
      id: 1,
      category: 'Performance',
      title: 'Optimize Pronunciation Assessment API',
      priority: 'high',
      impact: 'high',
      effort: 'medium',
      description: 'The pronunciation assessment API currently exceeds response time targets, especially on older devices. This affects user experience during recitation practice.',
      recommendations: [
        'Implement server-side caching for common recitations',
        'Optimize audio preprocessing pipeline',
        'Reduce AI model complexity or implement model quantization',
        'Add progress indicators during assessment to improve perceived performance',
        'Consider implementing a two-phase assessment: quick feedback followed by detailed analysis'
      ],
      codeChanges: [
        {
          file: '/services/pronunciation.py',
          changes: 'Implement LRU cache for processed audio and assessment results'
        },
        {
          file: '/api/routes/pronunciation.py',
          changes: 'Add streaming response option for progressive feedback'
        }
      ]
    },
    {
      id: 2,
      category: 'Performance',
      title: 'Improve Lesson Screen Transitions',
      priority: 'medium',
      impact: 'medium',
      effort: 'low',
      description: 'Screen transitions to and from lesson screens are slower than target, particularly on older devices. This creates a perception of sluggishness during navigation.',
      recommendations: [
        'Implement lazy loading for lesson content',
        'Optimize image loading with proper caching',
        'Reduce component re-renders with React.memo and useMemo',
        'Implement skeleton screens for smoother perceived performance',
        'Consider code splitting to reduce initial bundle size'
      ],
      codeChanges: [
        {
          file: '/src/screens/ModernLessonScreen.js',
          changes: 'Implement React.memo for child components and optimize rendering'
        },
        {
          file: '/src/components/LearningPathDisplay.js',
          changes: 'Add virtualized lists for better performance with large datasets'
        }
      ]
    },
    {
      id: 3,
      category: 'Battery',
      title: 'Reduce Battery Consumption During Recording',
      priority: 'medium',
      impact: 'medium',
      effort: 'medium',
      description: 'Audio recording sessions consume more battery than expected, particularly on older devices. This may discourage users from practicing recitation.',
      recommendations: [
        'Optimize audio recording settings (sample rate, channels)',
        'Implement more efficient audio processing algorithms',
        'Add battery-saving mode option for longer sessions',
        'Implement intelligent recording that stops automatically after silence',
        'Optimize background processing during recording'
      ],
      codeChanges: [
        {
          file: '/src/components/AudioRecorder.js',
          changes: 'Update recording configuration with optimized settings'
        },
        {
          file: '/services/audio.py',
          changes: 'Implement more efficient audio processing algorithms'
        }
      ]
    },
    {
      id: 4,
      category: 'Performance',
      title: 'Enhance Performance on Older Devices',
      priority: 'medium',
      impact: 'high',
      effort: 'high',
      description: 'The app shows significantly degraded performance on older devices, which may exclude users with budget constraints or older hardware.',
      recommendations: [
        'Implement device-specific optimizations based on device capability detection',
        'Reduce animation complexity on lower-end devices',
        'Implement more aggressive asset compression for older devices',
        'Consider simplified UI options for low-end devices',
        'Add performance monitoring to detect and address issues on specific devices'
      ],
      codeChanges: [
        {
          file: '/src/utils/deviceDetection.js',
          changes: 'Create utility to detect device capabilities and set app configuration accordingly'
        },
        {
          file: '/src/styles/modernDesignSystem.js',
          changes: 'Add conditional styling based on device performance tier'
        }
      ]
    },
    {
      id: 5,
      category: 'Memory',
      title: 'Optimize Memory Usage in Family Management',
      priority: 'low',
      impact: 'medium',
      effort: 'low',
      description: 'The Family Management screen shows increasing memory usage over time, especially when managing multiple child profiles.',
      recommendations: [
        'Implement proper cleanup of resources when navigating away from screen',
        'Optimize image handling for profile pictures',
        'Reduce state duplication across components',
        'Implement pagination for families with many children',
        'Add memory profiling to identify specific memory-intensive operations'
      ],
      codeChanges: [
        {
          file: '/src/screens/FamilyManagementScreen.js',
          changes: 'Add proper cleanup in useEffect return function'
        },
        {
          file: '/src/components/ChildProfileItem.js',
          changes: 'Optimize image handling and implement proper caching'
        }
      ]
    },
    {
      id: 6,
      category: 'Network',
      title: 'Improve Offline Mode Robustness',
      priority: 'high',
      impact: 'high',
      effort: 'high',
      description: 'The offline mode occasionally fails to properly sync data when returning online, leading to potential data loss or inconsistencies.',
      recommendations: [
        'Implement robust conflict resolution for offline changes',
        'Add better error handling for failed sync attempts',
        'Implement background sync with retry mechanisms',
        'Add visual indicators for content that has pending sync',
        'Implement data integrity checks after sync operations'
      ],
      codeChanges: [
        {
          file: '/src/contexts/OfflineContext.js',
          changes: 'Enhance sync logic with conflict resolution and retry mechanisms'
        },
        {
          file: '/src/api/api.js',
          changes: 'Improve error handling for network transitions'
        }
      ]
    },
    {
      id: 7,
      category: 'UX',
      title: 'Enhance Pronunciation Feedback Clarity',
      priority: 'high',
      impact: 'high',
      effort: 'medium',
      description: 'User testing revealed that pronunciation feedback is sometimes confusing for younger users or beginners. The technical terminology and complex feedback can be overwhelming.',
      recommendations: [
        'Implement age-appropriate feedback language based on user profile',
        'Add visual representations of pronunciation issues',
        'Include audio examples of correct pronunciation',
        'Simplify feedback for beginners with progressive detail levels',
        'Add celebratory animations for successful pronunciations to increase motivation'
      ],
      codeChanges: [
        {
          file: '/src/components/PronunciationFeedback.js',
          changes: 'Implement age-appropriate feedback rendering'
        },
        {
          file: '/services/pronunciation.py',
          changes: 'Add support for simplified feedback mode for beginners'
        }
      ]
    },
    {
      id: 8,
      category: 'Security',
      title: 'Enhance Payment Information Security',
      priority: 'high',
      impact: 'high',
      effort: 'medium',
      description: 'While payment processing is handled by Stripe, additional security measures can be implemented to protect sensitive user information during the payment flow.',
      recommendations: [
        'Implement additional encryption for payment-related API calls',
        'Add secure storage for temporary payment tokens',
        'Implement automatic timeout and data clearing for payment screens',
        'Add additional verification steps for subscription changes',
        'Implement comprehensive logging for payment-related activities'
      ],
      codeChanges: [
        {
          file: '/src/screens/PaymentDetailsScreen.js',
          changes: 'Add automatic timeout and secure field clearing'
        },
        {
          file: '/src/services/PaymentService.js',
          changes: 'Enhance encryption for payment-related API calls'
        }
      ]
    }
  ];

  const renderPriorityBadge = (priority) => {
    let backgroundColor;
    switch (priority) {
      case 'high':
        backgroundColor = ds.colors.error;
        break;
      case 'medium':
        backgroundColor = ds.colors.warning;
        break;
      case 'low':
        backgroundColor = ds.colors.success;
        break;
      default:
        backgroundColor = ds.colors.textSecondary;
    }

    return (
      <View style={[styles.badge, { backgroundColor }]}>
        <Text style={styles.badgeText}>{priority.toUpperCase()}</Text>
      </View>
    );
  };

  const renderImpactEffortBadges = (impact, effort) => {
    return (
      <View style={styles.badgeContainer}>
        <View style={styles.badgeGroup}>
          <Text style={styles.badgeLabel}>Impact:</Text>
          <View style={[styles.badge, { backgroundColor: getImpactColor(impact) }]}>
            <Text style={styles.badgeText}>{impact.toUpperCase()}</Text>
          </View>
        </View>
        <View style={styles.badgeGroup}>
          <Text style={styles.badgeLabel}>Effort:</Text>
          <View style={[styles.badge, { backgroundColor: getEffortColor(effort) }]}>
            <Text style={styles.badgeText}>{effort.toUpperCase()}</Text>
          </View>
        </View>
      </View>
    );
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'high':
        return ds.colors.success;
      case 'medium':
        return ds.colors.primary;
      case 'low':
        return ds.colors.textSecondary;
      default:
        return ds.colors.textSecondary;
    }
  };

  const getEffortColor = (effort) => {
    switch (effort) {
      case 'high':
        return ds.colors.error;
      case 'medium':
        return ds.colors.warning;
      case 'low':
        return ds.colors.success;
      default:
        return ds.colors.textSecondary;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Optimization Recommendations</Text>
        <Text style={styles.subtitle}>Prioritized improvements based on testing results</Text>
      </View>

      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Optimization Summary</Text>
        <Text style={styles.summaryText}>
          Based on comprehensive testing across multiple devices and scenarios, we've identified 8 key areas
          for optimization. These recommendations are prioritized by their impact on user experience and
          technical performance. High-priority items should be addressed before the initial release, while
          medium and low priority items can be scheduled for subsequent updates.
        </Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{optimizations.filter(o => o.priority === 'high').length}</Text>
          <Text style={styles.statLabel}>High Priority</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{optimizations.filter(o => o.priority === 'medium').length}</Text>
          <Text style={styles.statLabel}>Medium Priority</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{optimizations.filter(o => o.priority === 'low').length}</Text>
          <Text style={styles.statLabel}>Low Priority</Text>
        </View>
      </View>

      <View style={styles.filtersContainer}>
        <Text style={styles.filtersTitle}>Categories:</Text>
        <View style={styles.filterButtons}>
          <TouchableOpacity style={[styles.filterButton, styles.activeFilter]}>
            <Text style={styles.filterButtonText}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterButtonText}>Performance</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterButtonText}>UX</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterButtonText}>Security</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.optimizationsContainer}>
        {optimizations.map((optimization) => (
          <View key={optimization.id} style={styles.optimizationCard}>
            <View style={styles.optimizationHeader}>
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryText}>{optimization.category}</Text>
              </View>
              {renderPriorityBadge(optimization.priority)}
            </View>
            
            <Text style={styles.optimizationTitle}>{optimization.title}</Text>
            
            {renderImpactEffortBadges(optimization.impact, optimization.effort)}
            
            <Text style={styles.optimizationDescription}>{optimization.description}</Text>
            
            {expandedSection === optimization.id && (
              <View style={styles.expandedContent}>
                <View style={styles.recommendationsContainer}>
                  <Text style={styles.recommendationsTitle}>Recommendations</Text>
                  {optimization.recommendations.map((recommendation, index) => (
                    <View key={index} style={styles.recommendationItem}>
                      <Text style={styles.recommendationBullet}>•</Text>
                      <Text style={styles.recommendationText}>{recommendation}</Text>
                    </View>
                  ))}
                </View>
                
                <View style={styles.codeChangesContainer}>
                  <Text style={styles.codeChangesTitle}>Suggested Code Changes</Text>
                  {optimization.codeChanges.map((change, index) => (
                    <View key={index} style={styles.codeChangeItem}>
                      <Text style={styles.codeChangeFile}>{change.file}</Text>
                      <Text style={styles.codeChangeDescription}>{change.changes}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
            
            <TouchableOpacity 
              style={styles.expandButton}
              onPress={() => toggleSection(optimization.id)}
            >
              <Text style={styles.expandButtonText}>
                {expandedSection === optimization.id ? 'Show Less' : 'Show More'}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <View style={styles.implementationPlanContainer}>
        <Text style={styles.implementationPlanTitle}>Implementation Plan</Text>
        <View style={styles.timelineContainer}>
          <View style={styles.timelineItem}>
            <View style={styles.timelineHeader}>
              <View style={styles.timelineDot} />
              <Text style={styles.timelinePhase}>Phase 1 (Pre
(Content truncated due to size limit. Use line ranges to read in chunks)