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
  add: require('../../assets/add-icon.png'),
  view: require('../../assets/view-icon.png'),
  settings: require('../../assets/settings-icon.png'),
  notification: require('../../assets/notification-icon.png'),
  goal: require('../../assets/goal-icon.png'),
  time: require('../../assets/time-icon.png'),
  group: require('../../assets/group-icon.png'),
  challenge: require('../../assets/challenge-icon.png'),
  home: require('../../assets/home-icon.png'),
  book: require('../../assets/book-icon.png'),
  microphone: require('../../assets/microphone-icon.png'),
  chart: require('../../assets/chart-icon.png'),
};

// Placeholder avatar images
const AVATARS = {
  avatar1: require('../../assets/avatar1.png'),
  avatar2: require('../../assets/avatar2.png'),
};

const FamilyManagementScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('Home');

  // Mock data for the family dashboard
  const familyData = {
    activeMembers: 3,
    totalPractice: '8.5 hrs',
    weeklyGoal: '75%',
    children: [
      {
        id: 1,
        name: 'Ahmed',
        avatar: 'avatar1',
        age: '9 years',
        level: 'Intermediate',
        streak: '14 days',
        lastActive: 'Today',
        progress: 85,
        stats: [
          { label: 'Lessons Completed', value: '24' },
          { label: 'Accuracy', value: '92%' },
          { label: 'Practice Time', value: '4.2 hrs' },
        ],
        achievements: [
          'Completed Surah Al-Fatiha',
          'Perfect Pronunciation Badge',
        ],
      },
      {
        id: 2,
        name: 'Fatima',
        avatar: 'avatar2',
        age: '7 years',
        level: 'Beginner',
        streak: '8 days',
        lastActive: 'Yesterday',
        progress: 62,
        stats: [
          { label: 'Lessons Completed', value: '15' },
          { label: 'Accuracy', value: '85%' },
          { label: 'Practice Time', value: '2.8 hrs' },
        ],
        achievements: [
          'Learned 10 Arabic Letters',
          '7-Day Streak Badge',
        ],
      },
    ],
    weeklyData: [
      {day: 'Mon', ahmed: 15, fatima: 10},
      {day: 'Tue', ahmed: 20, fatima: 15},
      {day: 'Wed', ahmed: 10, fatima: 5},
      {day: 'Thu', ahmed: 25, fatima: 20},
      {day: 'Fri', ahmed: 30, fatima: 15},
      {day: 'Sat', ahmed: 15, fatima: 10},
      {day: 'Sun', ahmed: 0, fatima: 0},
    ],
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleAddFamilyMember = () => {
    navigation.navigate('ChildProfile');
  };

  const handleViewChildDetails = (childId) => {
    navigation.navigate('ChildDetails', { childId });
  };

  const handleManageChildAccount = (childId) => {
    navigation.navigate('ManageChild', { childId });
  };

  const handleNavigate = (screen) => {
    navigation.navigate(screen);
  };

  const renderChildProfileCard = (child) => {
    return (
      <View key={child.id} style={styles.profileCard}>
        <View style={styles.profileHeader}>
          <Image source={AVATARS[child.avatar]} style={styles.avatar} />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{child.name}</Text>
            <View style={styles.profileMeta}>
              <Text style={styles.profileMetaText}>{child.age}</Text>
              <View style={styles.dot} />
              <Text style={styles.profileMetaText}>{child.level}</Text>
            </View>
          </View>
          <View style={styles.streakContainer}>
            <Text style={styles.streakValue}>{child.streak}</Text>
            <Text style={styles.streakLabel}>streak</Text>
          </View>
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressBarContainer}>
            <View 
              style={[
                styles.progressBar, 
                { width: `${child.progress}%` }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>{child.progress}% complete</Text>
        </View>

        <View style={styles.statsContainer}>
          {child.stats.map((stat, index) => (
            <View key={index} style={styles.statItem}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.achievementsContainer}>
          <Text style={styles.achievementsTitle}>Recent Achievements</Text>
          {child.achievements.map((achievement, index) => (
            <View key={index} style={styles.achievementItem}>
              <View style={styles.achievementBadge} />
              <Text style={styles.achievementText}>{achievement}</Text>
            </View>
          ))}
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => handleViewChildDetails(child.id)}
          >
            <Image source={ICONS.view} style={styles.actionIcon} />
            <Text style={styles.actionText}>View Details</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => handleManageChildAccount(child.id)}
          >
            <Image source={ICONS.settings} style={styles.actionIcon} />
            <Text style={styles.actionText}>Manage</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderWeeklyChart = () => {
    // In a real implementation, this would use a charting library
    // For this prototype, we'll create a simple visual representation
    return (
      <View style={styles.chartContainer}>
        <View style={styles.chartLegend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: ds.colors.primary.main }]} />
            <Text style={styles.legendText}>Ahmed</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: ds.colors.secondary.main }]} />
            <Text style={styles.legendText}>Fatima</Text>
          </View>
        </View>
        
        <View style={styles.chartBars}>
          {familyData.weeklyData.map((day, index) => (
            <View key={index} style={styles.chartDayColumn}>
              <View style={styles.barContainer}>
                <View style={styles.barWrapper}>
                  <View 
                    style={[
                      styles.bar, 
                      { 
                        height: day.ahmed * 2, 
                        backgroundColor: ds.colors.primary.main 
                      }
                    ]} 
                  />
                  <View 
                    style={[
                      styles.bar, 
                      { 
                        height: day.fatima * 2, 
                        backgroundColor: ds.colors.secondary.main 
                      }
                    ]} 
                  />
                </View>
              </View>
              <Text style={styles.dayLabel}>{day.day}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const renderControlCard = (icon, title, description, action) => {
    return (
      <TouchableOpacity 
        style={styles.controlCard}
        onPress={() => handleNavigate(action)}
      >
        <Image source={icon} style={styles.controlIcon} />
        <View style={styles.controlContent}>
          <Text style={styles.controlTitle}>{title}</Text>
          <Text style={styles.controlDescription}>{description}</Text>
        </View>
        <View style={styles.controlArrow}>
          <Text style={styles.controlArrowText}>›</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderRecommendationCard = (icon, title, description, buttonText, action) => {
    return (
      <View style={styles.recommendationCard}>
        <View style={styles.recommendationContent}>
          <Image source={icon} style={styles.recommendationIcon} />
          <View style={styles.recommendationTextContent}>
            <Text style={styles.recommendationTitle}>{title}</Text>
            <Text style={styles.recommendationDescription}>{description}</Text>
          </View>
        </View>
        <TouchableOpacity 
          style={styles.recommendationButton}
          onPress={() => handleNavigate(action)}
        >
          <Text style={styles.recommendationButtonText}>{buttonText}</Text>
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
        <Text style={styles.headerTitle}>Family Dashboard</Text>
        <TouchableOpacity onPress={handleAddFamilyMember} style={styles.headerButton}>
          <Image source={ICONS.add} style={styles.headerIcon} />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.familySummary}>
          <Text style={styles.sectionTitle}>Family Activity</Text>
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statBoxValue}>{familyData.activeMembers}</Text>
              <Text style={styles.statBoxLabel}>Active Members</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statBoxValue}>{familyData.totalPractice}</Text>
              <Text style={styles.statBoxLabel}>Total Practice</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statBoxValue}>{familyData.weeklyGoal}</Text>
              <Text style={styles.statBoxLabel}>Weekly Goal</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Children's Progress</Text>
          {familyData.children.map(child => renderChildProfileCard(child))}
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Weekly Overview</Text>
          {renderWeeklyChart()}
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Parent Controls</Text>
          {renderControlCard(
            ICONS.notification, 
            'Notifications', 
            'Set up alerts for children\'s activity', 
            'Notifications'
          )}
          {renderControlCard(
            ICONS.goal, 
            'Learning Goals', 
            'Set and manage learning objectives', 
            'LearningGoals'
          )}
          {renderControlCard(
            ICONS.time, 
            'Screen Time', 
            'Manage app usage limits', 
            'ScreenTime'
          )}
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommendations</Text>
          {renderRecommendationCard(
            ICONS.group,
            'Family Learning Session',
            'Schedule a group session to practice together',
            'Schedule',
            'ScheduleSession'
          )}
          {renderRecommendationCard(
            ICONS.challenge,
            'Weekly Challenge',
            'Set up a friendly competition between family members',
            'Create Challenge',
            'CreateChallenge'
          )}
        </View>
        
        <View style={styles.bottomPadding} />
      </ScrollView>
      
      <View style={styles.tabBar}>
        {[
          { icon: ICONS.home, label: 'Home', screen: 'Dashboard' },
          { icon: ICONS.book, label: 'Lessons', screen: 'Lessons' },
          { icon: ICONS.microphone, label: 'Practice', screen: 'Practice' },
          { icon: ICONS.chart, label: 'Progress', screen: 'Progress' },
          { icon: ICONS.settings, label: 'Settings', screen: 'Settings' },
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
              source={tab.icon} 
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
  scrollContent: {
    flex: 1,
  },
  familySummary: {
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
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    backgroundColor: ds.colors.neutral.background,
    borderRadius: 12,
    marginHorizontal: 4,
  },
  statBoxValue: {
    fontSize: 20,
    fontWeight: '700',
    color: ds.colors.primary.main,
    marginBottom: 4,
  },
  statBoxLabel: {
    fontSize: 12,
    color: ds.colors.text.secondary,
    textAlign: 'center',
  },
  section: {
    backgroundColor: ds.colors.neutral.white,
    padding: 16,
    marginBottom: 12,
  },
  profileCard: {
    backgroundColor: ds.colors.neutral.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: ds.colors.neutral.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: ds.colors.text.primary,
    marginBottom: 4,
  },
  profileMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileMetaText: {
    fontSize: 14,
    color: ds.colors.text.secondary,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: ds.colors.text.tertiary,
    marginHorizontal: 6,
  },
  streakContainer: {
 
(Content truncated due to size limit. Use line ranges to read in chunks)