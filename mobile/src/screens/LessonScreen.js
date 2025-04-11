import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import { designSystem as ds } from '../styles/modernDesignSystem';

const ModernLessonScreen = ({ navigation }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  
  const handleRecordPress = () => {
    setIsRecording(true);
    
    // Simulate recording completion after 2 seconds
    setTimeout(() => {
      setIsRecording(false);
      setShowFeedback(true);
    }, 2000);
  };
  
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
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Surah Al-Fatiha</Text>
        
        <TouchableOpacity style={styles.settingsButton}>
          <Text style={styles.settingsButtonText}>⚙️</Text>
        </TouchableOpacity>
      </View>
      
      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar} />
      </View>
      <Text style={styles.progressText}>Verse 3 of 7</Text>
      
      {/* Main Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Verse Display */}
        <View style={styles.verseCard}>
          <Text style={styles.arabicText}>الرَّحْمَٰنِ الرَّحِيمِ</Text>
          <Text style={styles.transliterationText}>Ar-Raḥmāni r-Raḥīm</Text>
          <Text style={styles.translationText}>The Most Gracious, the Most Merciful</Text>
        </View>
        
        {/* Audio Player */}
        <TouchableOpacity style={styles.audioButton}>
          <View style={styles.audioButtonInner}>
            <Text style={styles.audioButtonText}>▶️</Text>
          </View>
          <Text style={styles.audioButtonLabel}>Listen carefully, then practice reading aloud</Text>
        </TouchableOpacity>
        
        {/* Word by Word */}
        <Text style={styles.sectionTitle}>Word by Word</Text>
        
        <View style={styles.wordCardsContainer}>
          <View style={styles.wordCard}>
            <Text style={styles.wordArabic}>الرَّحْمَٰنِ</Text>
            <Text style={styles.wordTransliteration}>Ar-Raḥmāni</Text>
            <Text style={styles.wordTranslation}>The Most Gracious</Text>
          </View>
          
          <View style={styles.wordCard}>
            <Text style={styles.wordArabic}>الرَّحِيمِ</Text>
            <Text style={styles.wordTransliteration}>r-Raḥīm</Text>
            <Text style={styles.wordTranslation}>The Most Merciful</Text>
          </View>
        </View>
        
        {/* Practice Section */}
        <Text style={styles.sectionTitle}>Practice Pronunciation</Text>
        
        <TouchableOpacity 
          style={[
            styles.recordButton, 
            isRecording && styles.recordingButton
          ]}
          onPress={handleRecordPress}
          disabled={isRecording}
        >
          <Text style={styles.recordButtonText}>🎤</Text>
          <Text style={styles.recordButtonLabel}>
            {isRecording ? 'Recording...' : 'Tap to record your recitation'}
          </Text>
        </TouchableOpacity>
        
        {/* AI Feedback */}
        {showFeedback && (
          <View style={styles.feedbackCard}>
            <Text style={styles.feedbackTitle}>AI Feedback</Text>
            <Text style={styles.feedbackText}>
              Your pronunciation of "الرَّحْمَٰنِ" is excellent! Try to extend the vowel sound in "الرَّحِيمِ" a bit longer.
            </Text>
            <TouchableOpacity style={styles.feedbackButton}>
              <Text style={styles.feedbackButtonText}>Get Detailed Feedback</Text>
            </TouchableOpacity>
          </View>
        )}
        
        {/* Navigation Controls */}
        <View style={styles.navigationControls}>
          <TouchableOpacity style={styles.navButton}>
            <Text style={styles.navButtonText}>Previous</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.navButton}>
            <Text style={styles.navButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
        
        {/* Add some bottom padding */}
        <View style={{ height: 40 }} />
      </ScrollView>
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 24,
    color: ds.colors.text.primary,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: ds.colors.text.primary,
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsButtonText: {
    fontSize: 20,
    color: ds.colors.text.primary,
  },
  progressContainer: {
    height: 4,
    backgroundColor: ds.colors.neutral.divider,
    marginHorizontal: 24,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    width: '40%',
    backgroundColor: ds.colors.primary.main,
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: ds.colors.text.tertiary,
    marginTop: 4,
    marginHorizontal: 24,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  verseCard: {
    backgroundColor: ds.colors.neutral.white,
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  arabicText: {
    fontSize: 32,
    fontWeight: '500',
    color: ds.colors.text.primary,
    marginBottom: 16,
    textAlign: 'center',
    fontFamily: 'System',
  },
  transliterationText: {
    fontSize: 18,
    color: ds.colors.text.secondary,
    marginBottom: 8,
    textAlign: 'center',
  },
  translationText: {
    fontSize: 16,
    color: ds.colors.text.tertiary,
    textAlign: 'center',
  },
  audioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  audioButtonInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: ds.colors.primary.main,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  audioButtonText: {
    fontSize: 24,
    color: ds.colors.text.inverse,
  },
  audioButtonLabel: {
    fontSize: 14,
    color: ds.colors.text.secondary,
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: ds.colors.text.primary,
    marginBottom: 16,
  },
  wordCardsContainer: {
    marginBottom: 32,
  },
  wordCard: {
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
  wordArabic: {
    fontSize: 24,
    fontWeight: '500',
    color: ds.colors.text.primary,
    marginBottom: 8,
    textAlign: 'center',
  },
  wordTransliteration: {
    fontSize: 16,
    color: ds.colors.text.secondary,
    marginBottom: 4,
    textAlign: 'center',
  },
  wordTranslation: {
    fontSize: 14,
    color: ds.colors.text.tertiary,
    textAlign: 'center',
  },
  recordButton: {
    backgroundColor: ds.colors.neutral.white,
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  recordingButton: {
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 59, 48, 0.3)',
  },
  recordButtonText: {
    fontSize: 32,
    marginBottom: 16,
  },
  recordButtonLabel: {
    fontSize: 14,
    color: ds.colors.text.secondary,
  },
  feedbackCard: {
    backgroundColor: ds.colors.neutral.white,
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  feedbackTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: ds.colors.text.primary,
    marginBottom: 8,
  },
  feedbackText: {
    fontSize: 14,
    color: ds.colors.text.secondary,
    marginBottom: 16,
    lineHeight: 20,
  },
  feedbackButton: {
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
  feedbackButtonText: {
    color: ds.colors.text.inverse,
    fontWeight: '600',
    fontSize: 14,
  },
  navigationControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  navButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: ds.colors.neutral.white,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  navButtonText: {
    color: ds.colors.text.primary,
    fontWeight: '600',
    fontSize: 14,
  },
});

export default ModernLessonScreen;
