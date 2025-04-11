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
  Alert,
} from 'react-native';
import { designSystem as ds } from '../styles/modernDesignSystem';
import { useNavigation } from '@react-navigation/native';

// Placeholder icons - will need actual assets
const ICONS = {
  back: require('../../assets/back-icon.png'),
  check: require('../../assets/check-icon.png'),
  confetti: require('../../assets/confetti-icon.png'),
};

const SubscriptionConfirmationScreen = ({ route }) => {
  const navigation = useNavigation();
  const { plan, billingCycle, price, trialEndDate } = route.params || { 
    plan: 'premium', 
    billingCycle: 'monthly', 
    price: 9.99,
    trialEndDate: '23 April 2025',
  };

  const getPlanName = () => {
    switch (plan) {
      case 'basic':
        return 'Basic Plan';
      case 'premium':
        return 'Premium Plan';
      case 'family':
        return 'Family Plan';
      default:
        return 'Free Trial';
    }
  };

  const getBillingText = () => {
    if (billingCycle === 'yearly') {
      return `$${price} per year`;
    } else {
      return `$${price} per month`;
    }
  };

  const handleGoToDashboard = () => {
    navigation.navigate('Dashboard');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={ds.colors.primary.main} />
      
      <View style={styles.content}>
        <View style={styles.successIconContainer}>
          <Image source={ICONS.confetti} style={styles.confettiIcon} />
          <View style={styles.checkmarkContainer}>
            <Image source={ICONS.check} style={styles.checkIcon} />
          </View>
        </View>
        
        <Text style={styles.title}>Welcome to Quranic Quest!</Text>
        <Text style={styles.subtitle}>Your free trial has started</Text>
        
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Subscription Details</Text>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Plan:</Text>
              <Text style={styles.detailValue}>{getPlanName()}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Billing:</Text>
              <Text style={styles.detailValue}>{getBillingText()}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Trial Period:</Text>
              <Text style={styles.detailValue}>14 days</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>First Billing Date:</Text>
              <Text style={styles.detailValue}>{trialEndDate}</Text>
            </View>
            
            <View style={styles.divider} />
            
            <Text style={styles.noteText}>
              You can cancel your subscription anytime before {trialEndDate} to avoid being charged.
            </Text>
          </View>
        </View>
        
        <View style={styles.featuresContainer}>
          <Text style={styles.featuresTitle}>What's included:</Text>
          
          <View style={styles.featureItem}>
            <View style={styles.featureIconContainer}>
              <Image source={ICONS.check} style={styles.featureIcon} />
            </View>
            <Text style={styles.featureText}>Complete Quran learning content</Text>
          </View>
          
          <View style={styles.featureItem}>
            <View style={styles.featureIconContainer}>
              <Image source={ICONS.check} style={styles.featureIcon} />
            </View>
            <Text style={styles.featureText}>Advanced AI pronunciation feedback</Text>
          </View>
          
          <View style={styles.featureItem}>
            <View style={styles.featureIconContainer}>
              <Image source={ICONS.check} style={styles.featureIcon} />
            </View>
            <Text style={styles.featureText}>Personalized learning paths</Text>
          </View>
          
          {plan === 'family' && (
            <View style={styles.featureItem}>
              <View style={styles.featureIconContainer}>
                <Image source={ICONS.check} style={styles.featureIcon} />
              </View>
              <Text style={styles.featureText}>Family management for up to 5 members</Text>
            </View>
          )}
        </View>
      </View>
      
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.dashboardButton}
          onPress={handleGoToDashboard}
        >
          <Text style={styles.dashboardButtonText}>Go to Dashboard</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.manageButton}
          onPress={() => navigation.navigate('Settings')}
        >
          <Text style={styles.manageButtonText}>Manage Subscription</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ds.colors.primary.main,
  },
  content: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
  },
  successIconContainer: {
    width: 120,
    height: 120,
    marginTop: 40,
    marginBottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confettiIcon: {
    width: 120,
    height: 120,
    position: 'absolute',
    tintColor: 'rgba(255, 255, 255, 0.3)',
  },
  checkmarkContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkIcon: {
    width: 40,
    height: 40,
    tintColor: ds.colors.neutral.white,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: ds.colors.neutral.white,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 32,
    textAlign: 'center',
  },
  cardContainer: {
    width: '100%',
    marginBottom: 24,
  },
  card: {
    backgroundColor: ds.colors.neutral.white,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: ds.colors.text.primary,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 14,
    color: ds.colors.text.secondary,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
    color: ds.colors.text.primary,
  },
  divider: {
    height: 1,
    backgroundColor: ds.colors.neutral.border,
    marginVertical: 16,
  },
  noteText: {
    fontSize: 12,
    color: ds.colors.text.tertiary,
    fontStyle: 'italic',
  },
  featuresContainer: {
    width: '100%',
    marginBottom: 24,
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: ds.colors.neutral.white,
    marginBottom: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  featureIcon: {
    width: 14,
    height: 14,
    tintColor: ds.colors.neutral.white,
  },
  featureText: {
    fontSize: 14,
    color: ds.colors.neutral.white,
  },
  footer: {
    padding: 24,
  },
  dashboardButton: {
    backgroundColor: ds.colors.neutral.white,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  dashboardButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: ds.colors.primary.main,
  },
  manageButton: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  manageButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: ds.colors.neutral.white,
  },
});

export default SubscriptionConfirmationScreen;
