import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { usePronunciation } from '../contexts/PronunciationContext';
import { modernDesignSystem as ds } from '../styles/modernDesignSystem';

const PronunciationFeedback = ({ assessmentId }) => {
  const { getDetailedFeedback, detailedFeedback, loading, error } = usePronunciation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch detailed feedback when component mounts
    if (assessmentId) {
      fetchFeedback();
    }
  }, [assessmentId]);

  const fetchFeedback = async () => {
    setIsLoading(true);
    await getDetailedFeedback(assessmentId);
    setIsLoading(false);
  };

  if (isLoading || loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={ds.colors.primary} />
        <Text style={styles.loadingText}>Loading detailed feedback...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load feedback. Please try again.</Text>
      </View>
    );
  }

  if (!detailedFeedback) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No feedback available.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.feedbackContainer}>
        <Text style={styles.overallFeedbackTitle}>Overall Feedback</Text>
        <Text style={styles.overallFeedbackText}>{detailedFeedback.overall_feedback}</Text>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Phonetic Breakdown</Text>
        {detailedFeedback.phonetic_breakdown.map((segment, index) => (
          <View key={index} style={styles.segmentContainer}>
            <View style={styles.segmentHeader}>
              <Text style={styles.segmentText}>{segment.segment}</Text>
              <View style={[styles.scoreContainer, { backgroundColor: getScoreColor(segment.score) }]}>
                <Text style={styles.scoreText}>{segment.score}</Text>
              </View>
            </View>
            <Text style={styles.feedbackText}>{segment.feedback}</Text>
          </View>
        ))}

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Practice Suggestions</Text>
        {detailedFeedback.practice_suggestions.map((suggestion, index) => (
          <View key={index} style={styles.suggestionContainer}>
            <Text style={styles.suggestionNumber}>{index + 1}</Text>
            <Text style={styles.suggestionText}>{suggestion}</Text>
          </View>
        ))}

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Recommended Exercises</Text>
        {detailedFeedback.recommended_exercises.map((exercise, index) => (
          <View key={index} style={styles.exerciseContainer}>
            <Text style={styles.exerciseTitle}>{exercise.title}</Text>
            <Text style={styles.exerciseDescription}>{exercise.description}</Text>
            <View style={styles.difficultyContainer}>
              <Text style={styles.difficultyLabel}>Difficulty:</Text>
              <Text style={styles.difficultyText}>{exercise.difficulty}</Text>
            </View>
          </View>
        ))}

        {detailedFeedback.comparison_to_previous && detailedFeedback.comparison_to_previous.previous_attempts > 0 && (
          <>
            <View style={styles.divider} />
            <Text style={styles.sectionTitle}>Progress Comparison</Text>
            <View style={styles.progressContainer}>
              <Text style={styles.progressText}>
                Previous attempts: {detailedFeedback.comparison_to_previous.previous_attempts}
              </Text>
              <Text style={styles.progressText}>
                Last assessment: {detailedFeedback.comparison_to_previous.last_assessment_date}
              </Text>
              <Text style={styles.progressText}>
                Overall improvement: 
                <Text style={getImprovementStyle(detailedFeedback.comparison_to_previous.overall_improvement)}>
                  {' '}{detailedFeedback.comparison_to_previous.overall_improvement > 0 ? '+' : ''}
                  {detailedFeedback.comparison_to_previous.overall_improvement}
                </Text>
              </Text>
              <Text style={styles.progressMessage}>{detailedFeedback.comparison_to_previous.progress}</Text>
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
};

// Helper function to get color based on score
const getScoreColor = (score) => {
  if (score >= 90) return ds.colors.success;
  if (score >= 70) return ds.colors.primary;
  if (score >= 50) return ds.colors.warning;
  return ds.colors.error;
};

// Helper function to get style based on improvement
const getImprovementStyle = (improvement) => {
  if (improvement > 0) return styles.positiveImprovement;
  if (improvement < 0) return styles.negativeImprovement;
  return styles.neutralImprovement;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ds.colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    fontFamily: ds.typography.fontFamily.medium,
    color: ds.colors.textSecondary,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    fontFamily: ds.typography.fontFamily.medium,
    color: ds.colors.error,
    textAlign: 'center',
  },
  feedbackContainer: {
    padding: 20,
  },
  overallFeedbackTitle: {
    fontSize: 22,
    fontFamily: ds.typography.fontFamily.bold,
    color: ds.colors.text,
    marginBottom: 10,
  },
  overallFeedbackText: {
    fontSize: 16,
    fontFamily: ds.typography.fontFamily.regular,
    color: ds.colors.text,
    lineHeight: 24,
  },
  divider: {
    height: 1,
    backgroundColor: ds.colors.border,
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: ds.typography.fontFamily.semiBold,
    color: ds.colors.text,
    marginBottom: 15,
  },
  segmentContainer: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: ds.colors.cardBackground,
    borderRadius: ds.borderRadius.medium,
    ...ds.shadows.small,
  },
  segmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  segmentText: {
    fontSize: 16,
    fontFamily: ds.typography.fontFamily.semiBold,
    color: ds.colors.text,
  },
  scoreContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: ds.borderRadius.small,
  },
  scoreText: {
    fontSize: 14,
    fontFamily: ds.typography.fontFamily.bold,
    color: 'white',
  },
  feedbackText: {
    fontSize: 14,
    fontFamily: ds.typography.fontFamily.regular,
    color: ds.colors.text,
    lineHeight: 20,
  },
  suggestionContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    padding: 10,
    backgroundColor: ds.colors.cardBackground,
    borderRadius: ds.borderRadius.medium,
    ...ds.shadows.small,
  },
  suggestionNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: ds.colors.primary,
    color: 'white',
    textAlign: 'center',
    lineHeight: 24,
    fontFamily: ds.typography.fontFamily.bold,
    marginRight: 10,
  },
  suggestionText: {
    flex: 1,
    fontSize: 14,
    fontFamily: ds.typography.fontFamily.regular,
    color: ds.colors.text,
    lineHeight: 20,
  },
  exerciseContainer: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: ds.colors.cardBackground,
    borderRadius: ds.borderRadius.medium,
    ...ds.shadows.small,
  },
  exerciseTitle: {
    fontSize: 16,
    fontFamily: ds.typography.fontFamily.semiBold,
    color: ds.colors.text,
    marginBottom: 5,
  },
  exerciseDescription: {
    fontSize: 14,
    fontFamily: ds.typography.fontFamily.regular,
    color: ds.colors.text,
    lineHeight: 20,
    marginBottom: 10,
  },
  difficultyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  difficultyLabel: {
    fontSize: 14,
    fontFamily: ds.typography.fontFamily.medium,
    color: ds.colors.textSecondary,
    marginRight: 5,
  },
  difficultyText: {
    fontSize: 14,
    fontFamily: ds.typography.fontFamily.medium,
    color: ds.colors.text,
  },
  progressContainer: {
    padding: 15,
    backgroundColor: ds.colors.cardBackground,
    borderRadius: ds.borderRadius.medium,
    ...ds.shadows.small,
  },
  progressText: {
    fontSize: 14,
    fontFamily: ds.typography.fontFamily.regular,
    color: ds.colors.text,
    marginBottom: 5,
  },
  progressMessage: {
    fontSize: 14,
    fontFamily: ds.typography.fontFamily.medium,
    color: ds.colors.text,
    marginTop: 5,
  },
  positiveImprovement: {
    color: ds.colors.success,
    fontFamily: ds.typography.fontFamily.semiBold,
  },
  negativeImprovement: {
    color: ds.colors.error,
    fontFamily: ds.typography.fontFamily.semiBold,
  },
  neutralImprovement: {
    color: ds.colors.textSecondary,
    fontFamily: ds.typography.fontFamily.semiBold,
  },
});

export default PronunciationFeedback;
