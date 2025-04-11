import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  TextInput,
  ScrollView,
} from 'react-native';
import { designSystem as ds } from '../styles/modernDesignSystem';
import { useNavigation } from '@react-navigation/native';

// Placeholder avatar images - will need actual assets
const AVATARS = [
  require('../../assets/avatar1.png'),
  require('../../assets/avatar2.png'),
  require('../../assets/avatar3.png'),
  require('../../assets/avatar4.png'),
  require('../../assets/avatar5.png'),
  require('../../assets/avatar6.png'),
];

const ChildProfileSetupScreen = ({ route }) => {
  const navigation = useNavigation();
  const isFamily = route.params?.isFamily || false;
  
  const [childProfile, setChildProfile] = useState({
    name: '',
    avatar: null,
    age: null,
    experience: null,
    learningGoals: [],
  });

  const ageOptions = ['5-7 years', '8-10 years', '11-13 years', '14-15 years'];
  const experienceOptions = ['Beginner', 'Intermediate', 'Advanced'];
  const learningGoalOptions = [
    'Learn to read Arabic letters',
    'Improve pronunciation',
    'Memorize short surahs',
    'Understand meaning',
    'Learn tajweed rules',
  ];

  const handleContinue = () => {
    // Validate required fields
    if (!childProfile.name || !childProfile.avatar || !childProfile.age || !childProfile.experience || childProfile.learningGoals.length === 0) {
      // Show validation error (would implement proper error handling in production)
      alert('Please complete all fields');
      return;
    }
    
    // Navigate to next screen in onboarding flow
    if (isFamily) {
      // If family account, could navigate to add another child or to parent setup
      navigation.navigate('ParentSetup', { childProfiles: [childProfile] });
    } else {
      // If single child account, navigate to assessment or dashboard
      navigation.navigate('Assessment', { childProfile });
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const toggleLearningGoal = (goal) => {
    setChildProfile(prev => {
      const updatedGoals = [...prev.learningGoals];
      
      if (updatedGoals.includes(goal)) {
        // Remove goal if already selected
        return {
          ...prev,
          learningGoals: updatedGoals.filter(g => g !== goal)
        };
      } else {
        // Add goal if not already selected
        return {
          ...prev,
          learningGoals: [...updatedGoals, goal]
        };
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={ds.colors.neutral.white} />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Set Up Child Profile</Text>
          <Text style={styles.subtitle}>Help us personalize the learning experience</Text>
        </View>

        {/* Avatar Selection */}
        <View style={styles.avatarSection}>
          <Text style={styles.sectionLabel}>Choose an Avatar</Text>
          <View style={styles.avatarGrid}>
            {AVATARS.map((avatar, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.avatarOption,
                  childProfile.avatar === index && styles.selectedAvatarOption,
                ]}
                onPress={() => setChildProfile(prev => ({ ...prev, avatar: index }))}
              >
                <Image source={avatar} style={styles.avatarImage} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Name Input */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Child's Name</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter name"
            value={childProfile.name}
            onChangeText={(text) => setChildProfile(prev => ({ ...prev, name: text }))}
          />
        </View>

        {/* Age Selection */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Age</Text>
          <View style={styles.optionsContainer}>
            {ageOptions.map((age, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  childProfile.age === age && styles.selectedOptionButton,
                ]}
                onPress={() => setChildProfile(prev => ({ ...prev, age }))}
              >
                <Text 
                  style={[
                    styles.optionText,
                    childProfile.age === age && styles.selectedOptionText,
                  ]}
                >
                  {age}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Experience Level */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Quran Reading Experience</Text>
          <View style={styles.radioGroup}>
            {experienceOptions.map((experience, index) => (
              <TouchableOpacity
                key={index}
                style={styles.radioOption}
                onPress={() => setChildProfile(prev => ({ ...prev, experience }))}
              >
                <View style={[
                  styles.radioButton,
                  childProfile.experience === experience && styles.radioButtonSelected,
                ]}>
                  {childProfile.experience === experience && (
                    <View style={styles.radioButtonInner} />
                  )}
                </View>
                <Text style={styles.radioText}>{experience}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Learning Goals */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Learning Goals (Select all that apply)</Text>
          <View style={styles.checkboxGroup}>
            {learningGoalOptions.map((goal, index) => (
              <TouchableOpacity
                key={index}
                style={styles.checkboxOption}
                onPress={() => toggleLearningGoal(goal)}
              >
                <View style={[
                  styles.checkbox,
                  childProfile.learningGoals.includes(goal) && styles.checkboxSelected,
                ]}>
                  {childProfile.learningGoals.includes(goal) && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </View>
                <Text style={styles.checkboxText}>{goal}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ds.colors.neutral.white,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: ds.colors.text.primary,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: ds.colors.text.secondary,
    textAlign: 'center',
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: ds.colors.text.primary,
    marginBottom: 12,
  },
  avatarSection: {
    marginBottom: 24,
  },
  avatarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: -8,
  },
  avatarOption: {
    width: 80,
    height: 80,
    borderRadius: 40,
    margin: 8,
    padding: 4,
    borderWidth: 2,
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ds.colors.neutral.background,
  },
  selectedAvatarOption: {
    borderColor: ds.colors.primary.main,
    backgroundColor: ds.colors.ui.highlight,
  },
  avatarImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  inputSection: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: ds.colors.text.primary,
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: ds.colors.neutral.background,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: ds.colors.neutral.border,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  optionButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    marginHorizontal: 4,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: ds.colors.neutral.border,
    backgroundColor: ds.colors.neutral.background,
  },
  selectedOptionButton: {
    borderColor: ds.colors.primary.main,
    backgroundColor: ds.colors.ui.highlight,
  },
  optionText: {
    fontSize: 14,
    color: ds.colors.text.secondary,
  },
  selectedOptionText: {
    color: ds.colors.primary.main,
    fontWeight: '500',
  },
  radioGroup: {
    marginTop: 8,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  radioButton: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: ds.colors.neutral.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  radioButtonSelected: {
    borderColor: ds.colors.primary.main,
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: ds.colors.primary.main,
  },
  radioText: {
    fontSize: 16,
    color: ds.colors.text.primary,
  },
  checkboxGroup: {
    marginTop: 8,
  },
  checkboxOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: ds.colors.neutral.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkboxSelected: {
    backgroundColor: ds.colors.primary.main,
    borderColor: ds.colors.primary.main,
  },
  checkmark: {
    color: ds.colors.neutral.white,
    fontSize: 14,
    fontWeight: '700',
  },
  checkboxText: {
    fontSize: 16,
    color: ds.colors.text.primary,
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: ds.colors.neutral.border,
    backgroundColor: ds.colors.neutral.white,
  },
  backButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  backButtonText: {
    color: ds.colors.primary.main,
    fontSize: 16,
    fontWeight: '500',
  },
  continueButton: {
    backgroundColor: ds.colors.primary.main,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  continueButtonText: {
    color: ds.colors.neutral.white,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ChildProfileSetupScreen;
