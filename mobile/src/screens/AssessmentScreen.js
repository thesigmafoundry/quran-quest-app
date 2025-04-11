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
  Animated,
} from 'react-native';
import { designSystem as ds } from '../styles/modernDesignSystem';
import { useNavigation } from '@react-navigation/native';

// Placeholder icons - will need actual assets
const ICONS = {
  back: require('../../assets/back-icon.png'),
  check: require('../../assets/check-icon.png'),
  play: require('../../assets/play-icon.png'),
  record: require('../../assets/record-icon.png'),
  next: require('../../assets/next-icon.png'),
};

const AssessmentScreen = ({ route }) => {
  const navigation = useNavigation();
  const parentProfile = route.params?.parentProfile || null;
  const childProfiles = route.params?.childProfiles || [];
  const isFamily = route.params?.isFamily || false;
  
  const [currentStep, setCurrentStep] = useState(0);
  const [assessmentComplete, setAssessmentComplete] = useState(false);
  const [progress, setProgress] = useState(0);
  const [recording, setRecording] = useState(false);
  const [recordingComplete, setRecordingComplete] = useState(false);
  
  // Sample assessment questions
  const assessmentSteps = [
    {
      type: 'introduction',
      title: 'Initial Assessment',
      description: 'Let\'s take a quick assessment to personalize your learning experience. We\'ll ask you to read a few Arabic letters and short verses.',
    },
    {
      type: 'letter_recognition',
      title: 'Letter Recognition',
      description: 'Can you identify these Arabic letters?',
      content: 'ا ب ت ث',
      options: ['Alif, Ba, Ta, Tha', 'Ba, Ta, Tha, Jim', 'Alif, Lam, Mim, Nun'],
    },
    {
      type: 'pronunciation',
      title: 'Pronunciation Practice',
      description: 'Please read the following verse aloud:',
      content: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
      transliteration: 'Bismillāhi r-raḥmāni r-raḥīm',
      translation: 'In the name of Allah, the Most Gracious, the Most Merciful',
    },
    {
      type: 'tajweed',
      title: 'Tajweed Rules',
      description: 'Do you know these tajweed rules?',
      content: 'Which rule applies when a noon saakin (ن) is followed by one of these letters: ي ر م ل و ن?',
      options: ['Idgham', 'Ikhfa', 'Iqlab', 'Izhar'],
    },
    {
      type: 'completion',
      title: 'Assessment Complete',
      description: 'Great job! We\'ve analyzed your responses and created a personalized learning path for you.',
    },
  ];

  const currentAssessment = assessmentSteps[currentStep];

  const handleNext = () => {
    if (currentStep < assessmentSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      setProgress((currentStep + 1) / (assessmentSteps.length - 1));
      setRecordingComplete(false);
    } else {
      setAssessmentComplete(true);
      // Navigate to dashboard after assessment
      navigation.navigate('Dashboard');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setProgress((currentStep - 1) / (assessmentSteps.length - 1));
    } else {
      navigation.goBack();
    }
  };

  const handleOptionSelect = (option) => {
    // In a real app, we would save the selected option
    // For this prototype, we'll just move to the next step
    handleNext();
  };

  const handleStartRecording = () => {
    setRecording(true);
    
    // Simulate recording completion after 3 seconds
    setTimeout(() => {
      setRecording(false);
      setRecordingComplete(true);
    }, 3000);
  };

  const renderProgressBar = () => {
    return (
      <View style={styles.progressContainer}>
        <View style={styles.progressBarContainer}>
          <Animated.View 
            style={[
              styles.progressBar,
              { width: `${progress * 100}%` }
            ]}
          />
        </View>
        <Text style={styles.progressText}>
          Step {currentStep + 1} of {assessmentSteps.length}
        </Text>
      </View>
    );
  };

  const renderIntroduction = () => {
    return (
      <View style={styles.introContainer}>
        <Image 
          source={require('../../assets/assessment-icon.png')} 
          style={styles.introImage}
        />
        <Text style={styles.introTitle}>{currentAssessment.title}</Text>
        <Text style={styles.introDescription}>{currentAssessment.description}</Text>
      </View>
    );
  };

  const renderLetterRecognition = () => {
    return (
      <View style={styles.assessmentContainer}>
        <Text style={styles.assessmentTitle}>{currentAssessment.title}</Text>
        <Text style={styles.assessmentDescription}>{currentAssessment.description}</Text>
        
        <View style={styles.arabicLettersContainer}>
          <Text style={styles.arabicLetters}>{currentAssessment.content}</Text>
        </View>
        
        <View style={styles.optionsContainer}>
          {currentAssessment.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionButton}
              onPress={() => handleOptionSelect(option)}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  const renderPronunciation = () => {
    return (
      <View style={styles.assessmentContainer}>
        <Text style={styles.assessmentTitle}>{currentAssessment.title}</Text>
        <Text style={styles.assessmentDescription}>{currentAssessment.description}</Text>
        
        <View style={styles.verseContainer}>
          <Text style={styles.arabicVerse}>{currentAssessment.content}</Text>
          <Text style={styles.transliteration}>{currentAssessment.transliteration}</Text>
          <Text style={styles.translation}>{currentAssessment.translation}</Text>
        </View>
        
        <View style={styles.audioControlsContainer}>
          <TouchableOpacity style={styles.playButton}>
            <Image source={ICONS.play} style={styles.playIcon} />
            <Text style={styles.playText}>Listen</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.recordButton,
              recording && styles.recordingButton,
              recordingComplete && styles.recordCompleteButton
            ]}
            onPress={handleStartRecording}
            disabled={recording || recordingComplete}
          >
            {recordingComplete ? (
              <Image source={ICONS.check} style={styles.recordIcon} />
            ) : (
              <Image source={ICONS.record} style={styles.recordIcon} />
            )}
            <Text style={styles.recordText}>
              {recording ? 'Recording...' : recordingComplete ? 'Recorded' : 'Record'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderTajweed = () => {
    return (
      <View style={styles.assessmentContainer}>
        <Text style={styles.assessmentTitle}>{currentAssessment.title}</Text>
        <Text style={styles.assessmentDescription}>{currentAssessment.description}</Text>
        
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>{currentAssessment.content}</Text>
        </View>
        
        <View style={styles.optionsContainer}>
          {currentAssessment.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionButton}
              onPress={() => handleOptionSelect(option)}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  const renderCompletion = () => {
    return (
      <View style={styles.completionContainer}>
        <View style={styles.completionIconContainer}>
          <Image source={ICONS.check} style={styles.completionIcon} />
        </View>
        <Text style={styles.completionTitle}>{currentAssessment.title}</Text>
        <Text style={styles.completionDescription}>{currentAssessment.description}</Text>
        
        <View style={styles.resultsContainer}>
          <View style={styles.resultItem}>
            <Text style={styles.resultLabel}>Letter Recognition</Text>
            <View style={styles.resultBarContainer}>
              <View style={[styles.resultBar, { width: '85%', backgroundColor: ds.colors.feedback.success }]} />
            </View>
            <Text style={styles.resultValue}>Advanced</Text>
          </View>
          
          <View style={styles.resultItem}>
            <Text style={styles.resultLabel}>Pronunciation</Text>
            <View style={styles.resultBarContainer}>
              <View style={[styles.resultBar, { width: '70%', backgroundColor: ds.colors.feedback.warning }]} />
            </View>
            <Text style={styles.resultValue}>Intermediate</Text>
          </View>
          
          <View style={styles.resultItem}>
            <Text style={styles.resultLabel}>Tajweed Rules</Text>
            <View style={styles.resultBarContainer}>
              <View style={[styles.resultBar, { width: '40%', backgroundColor: ds.colors.feedback.info }]} />
            </View>
            <Text style={styles.resultValue}>Beginner</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderAssessmentContent = () => {
    switch (currentAssessment.type) {
      case 'introduction':
        return renderIntroduction();
      case 'letter_recognition':
        return renderLetterRecognition();
      case 'pronunciation':
        return renderPronunciation();
      case 'tajweed':
        return renderTajweed();
      case 'completion':
        return renderCompletion();
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={ds.colors.neutral.white} />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.headerButton}>
          <Image source={ICONS.back} style={styles.headerIcon} />
        </TouchableOpacity>
        {renderProgressBar()}
        <View style={styles.headerSpacer} />
      </View>
      
      <ScrollView 
        style={styles.scrollContent} 
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}
      >
        {renderAssessmentContent()}
      </ScrollView>
      
      {currentAssessment.type !== 'introduction' && (
        <View style={styles.footer}>
          {currentAssessment.type === 'pronunciation' ? (
            <TouchableOpacity
              style={[
                styles.nextButton,
                (!recordingComplete) && styles.nextButtonDisabled
              ]}
              onPress={handleNext}
              disabled={!recordingComplete}
            >
              <Text style={styles.nextButtonText}>Continue</Text>
              <Image source={ICONS.next} style={styles.nextIcon} />
            </TouchableOpacity>
          ) : currentAssessment.type === 'completion' ? (
            <TouchableOpacity
              style={styles.nextButton}
              onPress={handleNext}
            >
              <Text style={styles.nextButtonText}>Go to Dashboard</Text>
              <Image source={ICONS.next} style={styles.nextIcon} />
            </TouchableOpacity>
          ) : null}
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ds.colors.neutral.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
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
  headerSpacer: {
    width: 40,
  },
  progressContainer: {
    flex: 1,
    alignItems: 'center',
  },
  progressBarContainer: {
    width: '100%',
    height: 6,
    backgroundColor: ds.colors.neutral.border,
    borderRadius: 3,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: ds.colors.primary.main,
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: ds.colors.text.secondary,
  },
  scrollContent: {
    flex: 1,
  },
  scrollContentContainer: {
    padding: 24,
    paddingBottom: 40,
  },
  introContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  introImage: {
    width: 120,
    height: 120,
    marginBottom: 24,
  },
  introTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: ds.colors.text.primary,
    marginBottom: 16,
    textAlign: 'center',
  },
  introDescription: {
    fontSize: 16,
    color: ds.colors.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  assessmentContainer: {
    paddingVertical: 16,
  },
  assessmentTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: ds.colors.text.primary,
    marginBottom: 12,
  },
  assessmentDescription: {
    fontSize: 16,
    color: ds.colors.text.secondary,
    marginBottom: 24,
    lineHeight: 24,
  },
  arabicLettersContainer: {
    backgroundColor: ds.colors.neutral.background,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
  },
  arabicLetters: {
    fontSize: 36,
    fontFamily: ds.typography.fontFamily.arabic,
    color: ds.colors.text.primary,
    textAlign: 'center',
    letterSpacing: 16,
  },
  optionsContainer: {
    marginBottom: 24,
  },
  optionButton: {
    backgroundColor: ds.colors.neutral.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: ds.colors.neutral.border,
  },
  optionText: {
    fontSize: 16,
    color: ds.colors.text.primary,
  },
  verseContainer: {
    backgroundColor: ds.colors.neutral.background,
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
  },
  arabicVerse: {
    fontSize: 28,
    fontFamily: ds.typography.fontFamily.arabic,
    color: ds.colors.text.primary,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 42,
  },
  transliteration: {
    fontSize: 16,
    color: ds.colors.text.secondary,
    textAlign: 'center',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  translation: {
    fontSize: 14,
    color: ds.colors.text.tertiary,
    textAlign: 'center',
  },
  audioControlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ds.colors.neutral.background,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: ds.colors.neutral.border,
  },
  playIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
    tintColor: ds.colors.text.primary,
  },
  playText: {
    fontSize: 16,
    color: ds.colors.text.primary,
    fontWeight: '500',
  },
  recordButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ds.colors.neutral.white,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: ds.colors.primary.main,
  },
  recordingButton: {
    backgroundColor: ds.colors.feedback.error,
    borderColor: ds.colors.feedback.error,
  },
  recordCompleteButton: {
    backgroundColor: ds.colors.feedback.success,
    borderColor: ds.colors.feedback.success,
  },
  recordIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
    tintColor: ds.colors.prim
(Content truncated due to size limit. Use line ranges to read in chunks)