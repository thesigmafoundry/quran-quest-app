import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useLearningPath } from '../contexts/LearningPathContext';
import { modernDesignSystem as ds } from '../styles/modernDesignSystem';
import { Ionicons } from '@expo/vector-icons';

const LearningPathDisplay = ({ navigation }) => {
  const { 
    currentPath, 
    nextUnits, 
    loading, 
    error, 
    fetchCurrentPath, 
    fetchNextUnits,
    getProgressPercentage 
  } = useLearningPath();
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load learning path data when component mounts
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    
    // Fetch current learning path
    const pathResult = await fetchCurrentPath();
    
    // If we have a path, fetch next units
    if (pathResult.success) {
      await fetchNextUnits(5);
    }
    
    setIsLoading(false);
  };

  const handleUnitPress = (unit) => {
    // Navigate to lesson screen with the selected unit
    navigation.navigate('Lessons', { unit });
  };

  if (isLoading || loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={ds.colors.primary} />
        <Text style={styles.loadingText}>Loading your learning path...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load learning path. Please try again.</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadData}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!currentPath) {
    return (
      <View style={styles.noPathContainer}>
        <Text style={styles.noPathText}>You don't have an active learning path yet.</Text>
        <TouchableOpacity 
          style={styles.createPathButton}
          onPress={() => navigation.navigate('Assessment')}
        >
          <Text style={styles.createPathButtonText}>Create Learning Path</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.pathInfoContainer}>
        <Text style={styles.pathTitle}>Your Learning Journey</Text>
        
        <View style={styles.progressContainer}>
          <View style={styles.progressBarBackground}>
            <View 
              style={[
                styles.progressBarFill, 
                { width: `${getProgressPercentage()}%` }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>{Math.round(getProgressPercentage())}% Complete</Text>
        </View>
        
        <View style={styles.pathDetailsContainer}>
          <View style={styles.pathDetailItem}>
            <Ionicons name="calendar-outline" size={20} color={ds.colors.primary} />
            <Text style={styles.pathDetailText}>
              Est. completion: {new Date(currentPath.estimated_completion_date).toLocaleDateString()}
            </Text>
          </View>
          <View style={styles.pathDetailItem}>
            <Ionicons name="school-outline" size={20} color={ds.colors.primary} />
            <Text style={styles.pathDetailText}>
              Level: {currentPath.level.charAt(0).toUpperCase() + currentPath.level.slice(1)}
            </Text>
          </View>
        </View>
      </View>
      
      <View style={styles.nextUnitsContainer}>
        <Text style={styles.nextUnitsTitle}>Continue Learning</Text>
        
        {nextUnits.length === 0 ? (
          <View style={styles.emptyStateContainer}>
            <Text style={styles.emptyStateText}>
              You've completed all units in your current path!
            </Text>
            <TouchableOpacity 
              style={styles.createPathButton}
              onPress={() => navigation.navigate('Assessment')}
            >
              <Text style={styles.createPathButtonText}>Start New Path</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={nextUnits}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.unitCard}
                onPress={() => handleUnitPress(item)}
              >
                <View style={styles.unitCardContent}>
                  <View style={styles.unitTypeContainer}>
                    <View style={[
                      styles.unitTypeBadge,
                      { backgroundColor: getUnitTypeColor(item.content_type) }
                    ]}>
                      <Text style={styles.unitTypeBadgeText}>
                        {formatUnitType(item.content_type)}
                      </Text>
                    </View>
                    <Text style={styles.unitDuration}>
                      {item.estimated_duration_minutes} min
                    </Text>
                  </View>
                  
                  <Text style={styles.unitTitle}>{item.title}</Text>
                  <Text style={styles.unitDescription}>{item.description}</Text>
                  
                  <View style={styles.unitFooter}>
                    <View style={styles.difficultyContainer}>
                      <Text style={styles.difficultyLabel}>Difficulty:</Text>
                      <View style={styles.difficultyDots}>
                        {[1, 2, 3, 4, 5].map((dot) => (
                          <View 
                            key={dot}
                            style={[
                              styles.difficultyDot,
                              dot <= item.difficulty ? styles.activeDifficultyDot : {}
                            ]}
                          />
                        ))}
                      </View>
                    </View>
                    
                    <View style={styles.startButtonContainer}>
                      <Text style={styles.startButtonText}>Start</Text>
                      <Ionicons name="arrow-forward" size={16} color={ds.colors.primary} />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
};

// Helper function to get color based on unit type
const getUnitTypeColor = (type) => {
  switch (type.toLowerCase()) {
    case 'lesson':
      return ds.colors.primary;
    case 'recitation':
      return ds.colors.secondary;
    case 'quiz':
      return ds.colors.tertiary;
    case 'review':
      return ds.colors.warning;
    default:
      return ds.colors.primary;
  }
};

// Helper function to format unit type
const formatUnitType = (type) => {
  return type.charAt(0).toUpperCase() + type.slice(1);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ds.colors.background,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    marginBottom: 20,
  },
  retryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: ds.colors.primary,
    borderRadius: ds.borderRadius.medium,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: ds.typography.fontFamily.medium,
  },
  noPathContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noPathText: {
    fontSize: 16,
    fontFamily: ds.typography.fontFamily.medium,
    color: ds.colors.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
  },
  createPathButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: ds.colors.primary,
    borderRadius: ds.borderRadius.medium,
  },
  createPathButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: ds.typography.fontFamily.medium,
  },
  pathInfoContainer: {
    backgroundColor: ds.colors.cardBackground,
    borderRadius: ds.borderRadius.large,
    padding: 20,
    marginBottom: 20,
    ...ds.shadows.medium,
  },
  pathTitle: {
    fontSize: 20,
    fontFamily: ds.typography.fontFamily.bold,
    color: ds.colors.text,
    marginBottom: 15,
  },
  progressContainer: {
    marginBottom: 15,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: ds.colors.border,
    borderRadius: 4,
    marginBottom: 5,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: ds.colors.primary,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontFamily: ds.typography.fontFamily.medium,
    color: ds.colors.textSecondary,
    textAlign: 'right',
  },
  pathDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pathDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pathDetailText: {
    fontSize: 14,
    fontFamily: ds.typography.fontFamily.regular,
    color: ds.colors.text,
    marginLeft: 5,
  },
  nextUnitsContainer: {
    flex: 1,
  },
  nextUnitsTitle: {
    fontSize: 18,
    fontFamily: ds.typography.fontFamily.semiBold,
    color: ds.colors.text,
    marginBottom: 15,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyStateText: {
    fontSize: 16,
    fontFamily: ds.typography.fontFamily.medium,
    color: ds.colors.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
  },
  unitCard: {
    backgroundColor: ds.colors.cardBackground,
    borderRadius: ds.borderRadius.large,
    marginBottom: 15,
    ...ds.shadows.medium,
    overflow: 'hidden',
  },
  unitCardContent: {
    padding: 15,
  },
  unitTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  unitTypeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: ds.borderRadius.small,
  },
  unitTypeBadgeText: {
    color: 'white',
    fontSize: 12,
    fontFamily: ds.typography.fontFamily.medium,
  },
  unitDuration: {
    fontSize: 12,
    fontFamily: ds.typography.fontFamily.regular,
    color: ds.colors.textSecondary,
  },
  unitTitle: {
    fontSize: 16,
    fontFamily: ds.typography.fontFamily.semiBold,
    color: ds.colors.text,
    marginBottom: 5,
  },
  unitDescription: {
    fontSize: 14,
    fontFamily: ds.typography.fontFamily.regular,
    color: ds.colors.textSecondary,
    marginBottom: 15,
  },
  unitFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  difficultyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  difficultyLabel: {
    fontSize: 12,
    fontFamily: ds.typography.fontFamily.regular,
    color: ds.colors.textSecondary,
    marginRight: 5,
  },
  difficultyDots: {
    flexDirection: 'row',
  },
  difficultyDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: ds.colors.border,
    marginRight: 3,
  },
  activeDifficultyDot: {
    backgroundColor: ds.colors.primary,
  },
  startButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  startButtonText: {
    fontSize: 14,
    fontFamily: ds.typography.fontFamily.medium,
    color: ds.colors.primary,
    marginRight: 5,
  },
});

export default LearningPathDisplay;
