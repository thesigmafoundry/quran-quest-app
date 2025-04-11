import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, ScrollView, Image } from 'react-native';
import { designSystem as ds } from '../styles/modernDesignSystem';

const ModernDashboardScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Status Bar */}
      <View style={styles.statusBar}>
        <Text style={styles.time}>9:41</Text>
        <View style={styles.statusIcons}>
          <Text style={styles.statusIcon}>📶</Text>
          <Text style={styles.statusIcon}>🔋</Text>
        </View>
      </View>
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Assalamu Alaikum, Ahmed</Text>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>A</Text>
        </View>
      </View>
      
      {/* Main Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statTitle}>Streak</Text>
            <View style={styles.statValue}>
              <Text style={styles.statIcon}>🔥</Text>
              <Text style={styles.statValueText}>14</Text>
            </View>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statTitle}>Today</Text>
            <Text style={styles.statValueText}>11/15 min</Text>
          </View>
        </View>
        
        {/* Continue Learning Section */}
        <Text style={styles.sectionTitle}>Continue Learning</Text>
        
        <View style={styles.lessonCard}>
          <View style={styles.lessonHeader}>
            <View style={styles.lessonIcon}>
              <Text style={styles.lessonIconText}>📖</Text>
            </View>
            <View style={styles.lessonInfo}>
              <Text style={styles.lessonTitle}>Continue Your Lesson</Text>
              <Text style={styles.lessonSubtitle}>Surah Al-Fatiha: Verse 3</Text>
            </View>
          </View>
          
          <View style={styles.progressContainer}>
            <View style={styles.progressBar} />
          </View>
          
          <TouchableOpacity 
            style={styles.lessonAction}
            onPress={() => navigation.navigate('Lesson')}
          >
            <Text style={styles.lessonActionText}>Continue</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.practiceCard}>
          <View style={styles.lessonHeader}>
            <View style={[styles.lessonIcon, styles.practiceIcon]}>
              <Text style={styles.lessonIconText}>🎤</Text>
            </View>
            <View style={styles.lessonInfo}>
              <Text style={styles.lessonTitle}>Practice Pronunciation</Text>
              <Text style={styles.lessonSubtitle}>10-minute interactive session</Text>
            </View>
          </View>
          
          <TouchableOpacity 
            style={styles.lessonAction}
            onPress={() => console.log('Start practice')}
          >
            <Text style={styles.lessonActionText}>Start Practice</Text>
          </TouchableOpacity>
        </View>
        
        {/* Achievements Section */}
        <Text style={styles.sectionTitle}>Recent Achievements</Text>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.achievementsContainer}
          contentContainerStyle={styles.achievementsContent}
        >
          <View style={styles.achievementCard}>
            <View style={styles.achievementIcon}>
              <Text style={styles.achievementIconText}>⭐</Text>
            </View>
            <Text style={styles.achievementTitle}>Perfect Pronunciation</Text>
            <Text style={styles.achievementSubtitle}>Mastered 5 letters</Text>
          </View>
          
          <View style={styles.achievementCard}>
            <View style={styles.achievementIcon}>
              <Text style={styles.achievementIconText}>📅</Text>
            </View>
            <Text style={styles.achievementTitle}>7-Day Streak</Text>
            <Text style={styles.achievementSubtitle}>Practiced every day</Text>
          </View>
          
          <View style={styles.achievementCard}>
            <View style={styles.achievementIcon}>
              <Text style={styles.achievementIconText}>📚</Text>
            </View>
            <Text style={styles.achievementTitle}>First Surah</Text>
            <Text style={styles.achievementSubtitle}>Completed Al-Fatiha</Text>
          </View>
        </ScrollView>
        
        {/* Family Progress Section */}
        <Text style={styles.sectionTitle}>Family Progress</Text>
        
        <View style={styles.familyMember}>
          <View style={styles.familyAvatar}>
            <Text style={styles.familyAvatarText}>A</Text>
          </View>
          <View style={styles.familyInfo}>
            <Text style={styles.familyName}>Ahmed</Text>
            <View style={styles.familyProgressContainer}>
              <View style={[styles.familyProgressBar, { width: '85%' }]} />
            </View>
          </View>
          <View style={styles.familyStreak}>
            <Text style={styles.familyStreakText}>14 🔥</Text>
          </View>
        </View>
        
        <View style={styles.familyMember}>
          <View style={[styles.familyAvatar, styles.secondaryAvatar]}>
            <Text style={styles.familyAvatarText}>F</Text>
          </View>
          <View style={styles.familyInfo}>
            <Text style={styles.familyName}>Fatima</Text>
            <View style={styles.familyProgressContainer}>
              <View style={[styles.familyProgressBar, { width: '62%' }]} />
            </View>
          </View>
          <View style={styles.familyStreak}>
            <Text style={styles.familyStreakText}>8 🔥</Text>
          </View>
        </View>
        
        {/* Add some bottom padding */}
        <View style={{ height: 100 }} />
      </ScrollView>
      
      {/* Tab Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={[styles.tab, styles.activeTab]}>
          <Text style={[styles.tabIcon, styles.activeTabIcon]}>🏠</Text>
          <Text style={[styles.tabLabel, styles.activeTabLabel]}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabIcon}>📚</Text>
          <Text style={styles.tabLabel}>Lessons</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabIcon}>🎤</Text>
          <Text style={styles.tabLabel}>Practice</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabIcon}>📊</Text>
          <Text style={styles.tabLabel}>Progress</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabIcon}>⚙️</Text>
          <Text style={styles.tabLabel}>Settings</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ds.colors.neutral.background,
  },
  statusBar: {
    height: 44,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  time: {
    fontWeight: '600',
    fontSize: 14,
    color: ds.colors.text.primary,
  },
  statusIcons: {
    flexDirection: 'row',
  },
  statusIcon: {
    marginLeft: 8,
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: ds.colors.text.primary,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: ds.colors.primary.main,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  avatarText: {
    color: ds.colors.text.inverse,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: ds.colors.neutral.white,
    borderRadius: 16,
    padding: 16,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statCard: {
    flex: 1,
    backgroundColor: ds.colors.neutral.white,
    borderRadius: 16,
    padding: 16,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statTitle: {
    fontSize: 12,
    color: ds.colors.text.tertiary,
    marginBottom: 8,
  },
  statValue: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statIcon: {
    marginRight: 8,
    color: ds.colors.primary.main,
  },
  statValueText: {
    fontSize: 20,
    fontWeight: '700',
    color: ds.colors.text.primary,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: ds.colors.text.primary,
    marginTop: 24,
    marginBottom: 16,
  },
  lessonCard: {
    backgroundColor: ds.colors.neutral.white,
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  lessonHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  lessonIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: ds.colors.primary.main,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  practiceIcon: {
    backgroundColor: ds.colors.secondary.main,
  },
  lessonIconText: {
    fontSize: 20,
    color: ds.colors.text.inverse,
  },
  lessonInfo: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: ds.colors.text.primary,
    marginBottom: 4,
  },
  lessonSubtitle: {
    fontSize: 14,
    color: ds.colors.text.secondary,
  },
  progressContainer: {
    height: 4,
    backgroundColor: ds.colors.neutral.divider,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 16,
  },
  progressBar: {
    height: '100%',
    width: '60%',
    backgroundColor: ds.colors.primary.main,
    borderRadius: 2,
  },
  lessonAction: {
    alignSelf: 'flex-start',
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: ds.colors.primary.main,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  lessonActionText: {
    color: ds.colors.text.inverse,
    fontWeight: '600',
    fontSize: 14,
  },
  practiceCard: {
    backgroundColor: ds.colors.neutral.white,
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  achievementsContainer: {
    marginBottom: 24,
  },
  achievementsContent: {
    paddingBottom: 16,
  },
  achievementCard: {
    width: 120,
    backgroundColor: ds.colors.neutral.white,
    borderRadius: 16,
    padding: 16,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: ds.colors.primary.main,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    alignSelf: 'center',
  },
  achievementIconText: {
    fontSize: 20,
    color: ds.colors.text.inverse,
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: ds.colors.text.primary,
    textAlign: 'center',
    marginBottom: 4,
  },
  achievementSubtitle: {
    fontSize: 12,
    color: ds.colors.text.secondary,
    textAlign: 'center',
  },
  familyMember: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: ds.colors.neutral.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  familyAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: ds.colors.primary.main,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  secondaryAvatar: {
    backgroundColor: ds.colors.secondary.main,
  },
  familyAvatarText: {
    color: ds.colors.text.inverse,
    fontWeight: '600',
  },
  familyInfo: {
    flex: 1,
  },
  familyName: {
    fontSize: 14,
    fontWeight: '600',
    color: ds.colors.text.primary,
    marginBottom: 4,
  },
  familyProgressContainer: {
    height: 4,
    backgroundColor: ds.colors.neutral.divider,
    borderRadius: 2,
    overflow: 'hidden',
  },
  familyProgressBar: {
    height: '100%',
    backgroundColor: ds.colors.primary.main,
    borderRadius: 2,
  },
  familyStreak: {
    marginLeft: 16,
  },
  familyStreakText: {
    fontSize: 14,
    fontWeight: '600',
    color: ds.colors.text.primary,
  },
  tabBar: {
    height: 83,
    backgroundColor: ds.colors.neutral.white,
    borderTopWidth: 1,
    borderTopColor: ds.colors.neutral.divider,
    flexDirection: 'row',
    paddingBottom: 16,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
  },
  tabIcon: {
    fontSize: 24,
    marginBottom: 4,
    color: ds.colors.text.tertiary,
  },
  tabLabel: {
    fontSize: 10,
    color: ds.colors.text.tertiary,
  },
  activeTab: {
    color: ds.colors.primary.main,
  },
  activeTabIcon: {
    color: ds.colors.primary.main,
  },
  activeTabLabel: {
    color: ds.colors.primary.main,
    fontWeight: '600',
  },
});

export default ModernDashboardScreen;
