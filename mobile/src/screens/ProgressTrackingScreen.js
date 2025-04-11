import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import { designSystem as ds } from '../styles/modernDesignSystem';
import { useNavigation } from '@react-navigation/native';

// Placeholder icons - will need actual assets
const ICONS = {
  back: require('../../assets/back-icon.png'),
  clock: require('../../assets/clock-icon.png'),
  book: require('../../assets/book-icon.png'),
  star: require('../../assets/star-icon.png'),
  letter: require('../../assets/letter-icon.png'),
  sound: require('../../assets/sound-icon.png'),
  brain: require('../../assets/brain-icon.png'),
  medal: require('../../assets/medal-icon.png'),
  streak: require('../../assets/streak-icon.png'),
  practice: require('../../assets/practice-icon.png'),
  review: require('../../assets/review-icon.png'),
  home: require('../../assets/home-icon.png'),
  microphone: require('../../assets/microphone-icon.png'),
  chart: require('../../assets/chart-icon.png'),
  settings: require('../../assets/settings-icon.png'),
};

const ProgressTrackingScreen = () => {
  const navigation = useNavigation();
  const [timeFilter, setTimeFilter] = useState('Last 7 Days');
  const [activeTab, setActiveTab] = useState('Progress');

  // Mock data for progress tracking
  const progressData = {
    stats: {
      hoursPracticed: '3.5',
      hoursPracticedChange: '+0.5 from last week',
      versesCompleted: '12',
      versesCompletedChange: '+3 from last week',
      accuracy: '87%',
      accuracyChange: '+2% from last week',
    },
    dailyActivity: [
      {day: 'Mon', minutes: 15},
      {day: 'Tue', minutes: 20},
      {day: 'Wed', minutes: 10},
      {day: 'Thu', minutes: 25},
      {day: 'Fri', minutes: 30},
      {day: 'Sat', minutes: 15},
      {day: 'Sun', minutes: 0},
    ],
    targetMinutes: 20,
    skills: [
      {
        icon: 'letter',
        label: 'Letter Recognition',
        progress: 90,
        level: 'Advanced',
      },
      {
        icon: 'sound',
        label: 'Pronunciation',
        progress: 75,
        level: 'Intermediate',
      },
      {
        icon: 'book',
        label: 'Tajweed Rules',
        progress: 45,
        level: 'Beginner',
      },
      {
        icon: 'brain',
        label: 'Memorization',
        progress: 60,
        level: 'Intermediate',
      },
    ],
    achievements: [
      {
        icon: 'medal',
        title: 'Perfect Pronunciation',
        description: 'Achieved 100% accuracy in pronunciation practice',
        date: '2 days ago',
      },
      {
        icon: 'streak',
        title: '10-Day Streak',
        description: 'Practiced for 10 consecutive days',
        date: '5 days ago',
      },
    ],
    suggestions: [
      {
        icon: 'practice',
        title: 'Practice Pronunciation',
        description: 'Focus on improving your tajweed for better accuracy',
        buttonText: 'Start Practice',
        action: 'Practice',
      },
      {
        icon: 'review',
        title: 'Review Previous Lessons',
        description: 'Strengthen your understanding of completed verses',
        buttonText: 'Review',
        action: 'Review',
      },
    ],
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleNavigate = (screen) => {
    navigation.navigate(screen);
  };

  const renderStatCard = (icon, value, label, change) => {
    return (
      <View style={styles.statCard}>
        <View style={styles.statIconContainer}>
          <Image source={ICONS[icon]} style={styles.statIcon} />
        </View>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statLabel}>{label}</Text>
        <Text style={styles.statChange}>{change}</Text>
      </View>
    );
  };

  const renderActivityChart = () => {
    // In a real implementation, this would use a charting library
    // For this prototype, we'll create a simple visual representation
    return (
      <View style={styles.chartContainer}>
        <View style={styles.chartBars}>
          {progressData.dailyActivity.map((day, index) => (
            <View key={index} style={styles.chartDayColumn}>
              <View style={styles.barContainer}>
                <View 
                  style={[
                    styles.bar, 
                    { 
                      height: day.minutes * 2,
                      backgroundColor: day.minutes >= progressData.targetMinutes 
                        ? ds.colors.primary.main 
                        : ds.colors.neutral.border
                    }
                  ]} 
                />
                {progressData.targetMinutes > 0 && (
                  <View 
                    style={[
                      styles.targetLine,
                      { bottom: progressData.targetMinutes * 2 }
                    ]}
                  />
                )}
              </View>
              <Text style={styles.dayLabel}>{day.day}</Text>
            </View>
          ))}
        </View>
        <View style={styles.chartLegend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: ds.colors.primary.main }]} />
            <Text style={styles.legendText}>Minutes Practiced</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendLine, { backgroundColor: ds.colors.feedback.info }]} />
            <Text style={styles.legendText}>Daily Target ({progressData.targetMinutes} min)</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderSkillProgress = (skill) => {
    const getLevelColor = (level) => {
      switch (level) {
        case 'Beginner':
          return ds.colors.feedback.info;
        case 'Intermediate':
          return ds.colors.feedback.warning;
        case 'Advanced':
          return ds.colors.feedback.success;
        default:
          return ds.colors.text.tertiary;
      }
    };

    return (
      <View key={skill.label} style={styles.skillItem}>
        <View style={styles.skillHeader}>
          <View style={styles.skillIconContainer}>
            <Image source={ICONS[skill.icon]} style={styles.skillIcon} />
          </View>
          <View style={styles.skillInfo}>
            <Text style={styles.skillLabel}>{skill.label}</Text>
            <View style={styles.skillLevelContainer}>
              <Text 
                style={[
                  styles.skillLevel, 
                  { color: getLevelColor(skill.level) }
                ]}
              >
                {skill.level}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.skillProgressContainer}>
          <View 
            style={[
              styles.skillProgressBar, 
              { width: `${skill.progress}%` }
            ]} 
          />
        </View>
      </View>
    );
  };

  const renderAchievement = (achievement) => {
    return (
      <View key={achievement.title} style={styles.achievementItem}>
        <View style={styles.achievementIconContainer}>
          <Image source={ICONS[achievement.icon]} style={styles.achievementIcon} />
        </View>
        <View style={styles.achievementContent}>
          <Text style={styles.achievementTitle}>{achievement.title}</Text>
          <Text style={styles.achievementDescription}>{achievement.description}</Text>
        </View>
        <Text style={styles.achievementDate}>{achievement.date}</Text>
      </View>
    );
  };

  const renderSuggestion = (suggestion) => {
    return (
      <View key={suggestion.title} style={styles.suggestionCard}>
        <View style={styles.suggestionContent}>
          <View style={styles.suggestionIconContainer}>
            <Image source={ICONS[suggestion.icon]} style={styles.suggestionIcon} />
          </View>
          <View style={styles.suggestionTextContent}>
            <Text style={styles.suggestionTitle}>{suggestion.title}</Text>
            <Text style={styles.suggestionDescription}>{suggestion.description}</Text>
          </View>
        </View>
        <TouchableOpacity 
          style={styles.suggestionButton}
          onPress={() => handleNavigate(suggestion.action)}
        >
          <Text style={styles.suggestionButtonText}>{suggestion.buttonText}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={ds.colors.neutral.white} />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.headerButton}>
          <Image source={ICONS.back} style={styles.headerIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Progress</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>{timeFilter}</Text>
          <Text style={styles.filterArrow}>▼</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.statsContainer}>
          {renderStatCard(
            'clock',
            progressData.stats.hoursPracticed,
            'Hours Practiced',
            progressData.stats.hoursPracticedChange
          )}
          {renderStatCard(
            'book',
            progressData.stats.versesCompleted,
            'Verses Completed',
            progressData.stats.versesCompletedChange
          )}
          {renderStatCard(
            'star',
            progressData.stats.accuracy,
            'Accuracy',
            progressData.stats.accuracyChange
          )}
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Daily Activity</Text>
          {renderActivityChart()}
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills Mastery</Text>
          <View style={styles.skillsContainer}>
            {progressData.skills.map(skill => renderSkillProgress(skill))}
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Achievements</Text>
          <View style={styles.achievementsContainer}>
            {progressData.achievements.map(achievement => renderAchievement(achievement))}
          </View>
          <TouchableOpacity 
            style={styles.viewAllButton}
            onPress={() => handleNavigate('Achievements')}
          >
            <Text style={styles.viewAllText}>View All Achievements</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Suggested Next Steps</Text>
          <View style={styles.suggestionsContainer}>
            {progressData.suggestions.map(suggestion => renderSuggestion(suggestion))}
          </View>
        </View>
        
        <View style={styles.bottomPadding} />
      </ScrollView>
      
      <View style={styles.tabBar}>
        {[
          { icon: 'home', label: 'Home', screen: 'Dashboard' },
          { icon: 'book', label: 'Lessons', screen: 'Lessons' },
          { icon: 'microphone', label: 'Practice', screen: 'Practice' },
          { icon: 'chart', label: 'Progress', screen: 'Progress' },
          { icon: 'settings', label: 'Settings', screen: 'Settings' },
        ].map((tab, index) => (
          <TouchableOpacity 
            key={index}
            style={styles.tabItem}
            onPress={() => {
              setActiveTab(tab.label);
              handleNavigate(tab.screen);
            }}
          >
            <Image 
              source={ICONS[tab.icon]} 
              style={[
                styles.tabIcon,
                activeTab === tab.label && styles.activeTabIcon
              ]} 
            />
            <Text 
              style={[
                styles.tabLabel,
                activeTab === tab.label && styles.activeTabLabel
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ds.colors.neutral.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: ds.colors.neutral.white,
    borderBottomWidth: 1,
    borderBottomColor: ds.colors.neutral.border,
  },
  headerButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  headerIcon: {
    width: 24,
    height: 24,
    tintColor: ds.colors.text.primary,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: ds.colors.text.primary,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: ds.colors.neutral.background,
  },
  filterText: {
    fontSize: 14,
    color: ds.colors.text.secondary,
    marginRight: 4,
  },
  filterArrow: {
    fontSize: 10,
    color: ds.colors.text.tertiary,
  },
  scrollContent: {
    flex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: ds.colors.neutral.white,
    marginBottom: 12,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    marginHorizontal: 4,
    borderRadius: 12,
    backgroundColor: ds.colors.neutral.background,
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: ds.colors.ui.highlight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statIcon: {
    width: 20,
    height: 20,
    tintColor: ds.colors.primary.main,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: ds.colors.text.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: ds.colors.text.secondary,
    textAlign: 'center',
    marginBottom: 4,
  },
  statChange: {
    fontSize: 10,
    color: ds.colors.feedback.success,
  },
  section: {
    backgroundColor: ds.colors.neutral.white,
    padding: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: ds.colors.text.primary,
    marginBottom: 16,
  },
  chartContainer: {
    marginBottom: 16,
  },
  chartBars: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 150,
    marginBottom: 16,
    position: 'relative',
  },
  chartDayColumn: {
    alignItems: 'center',
    flex: 1,
  },
  barContainer: {
    height: 120,
    justifyContent: 'flex-end',
    marginBottom: 8,
    position: 'relative',
  },
  bar: {
    width: 16,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  targetLine: {
    position: 'absolute',
    left: -4,
    right: -4,
    height: 2,
    backgroundColor: ds.colors.feedback.info,
  },
  dayLabel: {
    fontSize: 12,
    color: ds.colors.text.tertiary,
  },
  chartLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  legendLine: {
    width: 12,
    height: 2,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: ds.colors.text.secondary,
  },
  skillsContainer: {
    marginBottom: 8,
  },
  skillItem: {
    marginBottom: 16,
  },
  skillHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  skillIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: ds
(Content truncated due to size limit. Use line ranges to read in chunks)