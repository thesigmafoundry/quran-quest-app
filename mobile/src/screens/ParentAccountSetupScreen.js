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
  Switch,
} from 'react-native';
import { designSystem as ds } from '../styles/modernDesignSystem';
import { useNavigation } from '@react-navigation/native';

// Placeholder avatar image - will need actual asset
const PARENT_AVATAR = require('../../assets/parent-avatar.png');

const ParentAccountSetupScreen = ({ route }) => {
  const navigation = useNavigation();
  const childProfiles = route.params?.childProfiles || [];
  const isFamily = route.params?.isFamily || false;
  
  const [parentProfile, setParentProfile] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    receiveUpdates: true,
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!parentProfile.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!parentProfile.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(parentProfile.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!parentProfile.password) {
      newErrors.password = 'Password is required';
    } else if (parentProfile.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (parentProfile.password !== parentProfile.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validateForm()) {
      // Navigate to next screen in onboarding flow
      navigation.navigate('Assessment', { 
        parentProfile,
        childProfiles,
        isFamily
      });
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={ds.colors.neutral.white} />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Set Up Parent Account</Text>
          <Text style={styles.subtitle}>Create your account to manage your family's learning</Text>
        </View>

        <View style={styles.avatarSection}>
          <View style={styles.avatarContainer}>
            <Image source={PARENT_AVATAR} style={styles.avatar} />
            <TouchableOpacity style={styles.changeAvatarButton}>
              <Text style={styles.changeAvatarText}>Change</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.formSection}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Full Name</Text>
            <TextInput
              style={[styles.textInput, errors.name && styles.inputError]}
              placeholder="Enter your name"
              value={parentProfile.name}
              onChangeText={(text) => setParentProfile(prev => ({ ...prev, name: text }))}
            />
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email Address</Text>
            <TextInput
              style={[styles.textInput, errors.email && styles.inputError]}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={parentProfile.email}
              onChangeText={(text) => setParentProfile(prev => ({ ...prev, email: text }))}
            />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              style={[styles.textInput, errors.password && styles.inputError]}
              placeholder="Create a password"
              secureTextEntry
              value={parentProfile.password}
              onChangeText={(text) => setParentProfile(prev => ({ ...prev, password: text }))}
            />
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Confirm Password</Text>
            <TextInput
              style={[styles.textInput, errors.confirmPassword && styles.inputError]}
              placeholder="Confirm your password"
              secureTextEntry
              value={parentProfile.confirmPassword}
              onChangeText={(text) => setParentProfile(prev => ({ ...prev, confirmPassword: text }))}
            />
            {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
          </View>
          
          <View style={styles.switchGroup}>
            <View style={styles.switchContent}>
              <Text style={styles.switchLabel}>Receive updates and tips</Text>
              <Text style={styles.switchDescription}>Get learning tips and activity summaries via email</Text>
            </View>
            <Switch
              value={parentProfile.receiveUpdates}
              onValueChange={(value) => setParentProfile(prev => ({ ...prev, receiveUpdates: value }))}
              trackColor={{ false: ds.colors.neutral.border, true: ds.colors.primary.light }}
              thumbColor={parentProfile.receiveUpdates ? ds.colors.primary.main : ds.colors.neutral.white}
            />
          </View>
        </View>

        <View style={styles.termsSection}>
          <Text style={styles.termsText}>
            By continuing, you agree to our{' '}
            <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
            <Text style={styles.termsLink}>Privacy Policy</Text>
          </Text>
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
  avatarSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarContainer: {
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  changeAvatarButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: ds.colors.ui.highlight,
  },
  changeAvatarText: {
    fontSize: 14,
    fontWeight: '500',
    color: ds.colors.primary.main,
  },
  formSection: {
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 20,
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
  inputError: {
    borderColor: ds.colors.feedback.error,
  },
  errorText: {
    fontSize: 14,
    color: ds.colors.feedback.error,
    marginTop: 4,
  },
  switchGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingVertical: 12,
  },
  switchContent: {
    flex: 1,
    marginRight: 16,
  },
  switchLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: ds.colors.text.primary,
    marginBottom: 4,
  },
  switchDescription: {
    fontSize: 14,
    color: ds.colors.text.secondary,
  },
  termsSection: {
    marginBottom: 24,
  },
  termsText: {
    fontSize: 14,
    color: ds.colors.text.secondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  termsLink: {
    color: ds.colors.primary.main,
    fontWeight: '500',
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

export default ParentAccountSetupScreen;
