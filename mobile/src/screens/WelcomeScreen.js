import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, Image } from 'react-native';
import { designSystem as ds } from '../styles/modernDesignSystem';

const WelcomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>Q</Text>
        </View>
        <Text style={styles.title}>Welcome to Quranic Quest</Text>
        <Text style={styles.subtitle}>
          An interactive Quran learning experience for your family
        </Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => navigation.navigate('Dashboard')}
        >
          <Text style={styles.primaryButtonText}>Get Started</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.textButton}
          onPress={() => console.log('Sign in pressed')}
        >
          <Text style={styles.textButtonText}>Already have an account? Sign in</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ds.colors.primary.main,
    backgroundGradient: ds.colors.primary.gradient,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  logoContainer: {
    width: 120,
    height: 120,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  logoText: {
    fontSize: 60,
    fontWeight: 'bold',
    color: ds.colors.neutral.white,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: ds.colors.neutral.white,
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    maxWidth: 280,
  },
  actions: {
    width: '100%',
    padding: 32,
  },
  primaryButton: {
    backgroundColor: ds.colors.neutral.white,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  primaryButtonText: {
    color: ds.colors.primary.main,
    fontSize: 16,
    fontWeight: '600',
  },
  textButton: {
    alignItems: 'center',
  },
  textButtonText: {
    color: ds.colors.neutral.white,
    fontSize: 14,
  },
});

export default WelcomeScreen;
