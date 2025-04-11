import React, { useState, useEffect } from 'react';
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
import { useSubscription } from '../hooks/useSubscription';

// Placeholder icons - will need actual assets
const ICONS = {
  back: require('../../assets/back-icon.png'),
  check: require('../../assets/check-icon.png'),
  star: require('../../assets/star-icon.png'),
  family: require('../../assets/family-icon.png'),
  crown: require('../../assets/crown-icon.png'),
};

const SubscriptionScreenConnected = ({ route }) => {
  const navigation = useNavigation();
  const [selectedPlan, setSelectedPlan] = useState('premium');
  const [billingCycle, setBillingCycle] = useState('yearly');
  
  // Mock user ID - in a real app, this would come from authentication
  const userId = 'user_123';
  
  // Use the subscription hook
  const {
    isLoading,
    subscription,
    isTrialActive,
    trialDaysRemaining,
    startFreeTrial,
    createSubscription,
  } = useSubscription(userId);

  // Subscription plans data
  const plans = {
    free: {
      name: 'Free Trial',
      price: {
        monthly: 0,
        yearly: 0,
      },
      features: [
        'Basic Quran learning content',
        'Limited pronunciation feedback',
        'Progress tracking for 1 user',
        '14-day access only',
      ],
      notIncluded: [
        'Advanced tajweed lessons',
        'Personalized learning paths',
        'Family accounts',
        'Offline access',
      ],
    },
    basic: {
      name: 'Basic',
      price: {
        monthly: 4.99,
        yearly: 49.99,
      },
      features: [
        'Complete Quran learning content',
        'Basic pronunciation feedback',
        'Progress tracking for 1 user',
        'Email support',
      ],
      notIncluded: [
        'Advanced tajweed lessons',
        'Personalized learning paths',
        'Family accounts',
      ],
    },
    premium: {
      name: 'Premium',
      price: {
        monthly: 9.99,
        yearly: 99.99,
      },
      features: [
        'Complete Quran learning content',
        'Advanced AI pronunciation feedback',
        'Personalized learning paths',
        'Progress tracking for 1 user',
        'Offline access',
        'Priority support',
      ],
      notIncluded: [
        'Family accounts',
      ],
    },
    family: {
      name: 'Family',
      price: {
        monthly: 14.99,
        yearly: 149.99,
      },
      features: [
        'All Premium features',
        'Up to 5 family members',
        'Family progress dashboard',
        'Parental controls',
        'Family challenges and activities',
        'Premium support',
      ],
      notIncluded: [],
    },
  };

  useEffect(() => {
    // Check if user already has an active subscription
    if (subscription && subscription.isActive) {
      if (subscription.status === 'trial') {
        Alert.alert(
          'Free Trial Active',
          `You have ${trialDaysRemaining} days remaining in your free trial.`,
          [
            { text: 'Continue Trial', style: 'cancel' },
            { 
              text: 'Upgrade Now', 
              onPress: () => console.log('User wants to upgrade from trial') 
            },
          ]
        );
      } else {
        Alert.alert(
          'Subscription Active',
          `You already have an active ${subscription.planId} subscription.`,
          [
            { text: 'OK', style: 'cancel' },
            { 
              text: 'Manage Subscription', 
              onPress: () => navigation.navigate('Settings') 
            },
          ]
        );
      }
    }
  }, [subscription, trialDaysRemaining]);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
  };

  const handleContinue = async () => {
    if (isLoading) return;
    
    try {
      // If user doesn't have an active subscription, start with free trial
      if (!subscription || !subscription.isActive) {
        const trialStarted = await startFreeTrial();
        
        if (trialStarted) {
          // Navigate to payment details to set up payment method for after trial
          navigation.navigate('PaymentDetails', { 
            plan: selectedPlan, 
            billingCycle,
            price: plans[selectedPlan].price[billingCycle],
            isTrialActive: true,
          });
        }
      } else {
        // User already has a subscription, navigate to payment details to change plan
        navigation.navigate('PaymentDetails', { 
          plan: selectedPlan, 
          billingCycle,
          price: plans[selectedPlan].price[billingCycle],
          isTrialActive: subscription.status === 'trial',
        });
      }
    } catch (error) {
      console.error('Error handling subscription:', error);
      Alert.alert('Error', 'There was a problem processing your request. Please try again later.');
    }
  };

  const renderPlanCard = (planKey) => {
    const plan = plans[planKey];
    const isSelected = selectedPlan === planKey;
    const price = plan.price[billingCycle];
    const isYearly = billingCycle === 'yearly';
    const discount = isYearly ? 'Save 16%' : null;
    
    return (
      <TouchableOpacity
        style={[
          styles.planCard,
          isSelected && styles.selectedPlanCard,
          planKey === 'family' && styles.familyPlanCard,
        ]}
        onPress={() => handleSelectPlan(planKey)}
        activeOpacity={0.8}
      >
        <View style={styles.planHeader}>
          <View>
            <Text style={styles.planName}>{plan.name}</Text>
            <View style={styles.priceContainer}>
              {price > 0 ? (
                <>
                  <Text style={styles.currencySymbol}>$</Text>
                  <Text style={styles.planPrice}>{price}</Text>
                  <Text style={styles.billingPeriod}>/{isYearly ? 'year' : 'month'}</Text>
                </>
              ) : (
                <Text style={styles.planPrice}>Free</Text>
              )}
            </View>
          </View>
          
          {isSelected && (
            <View style={styles.selectedCheckmark}>
              <Image source={ICONS.check} style={styles.checkIcon} />
            </View>
          )}
          
          {planKey === 'premium' && (
            <View style={styles.popularBadge}>
              <Text style={styles.popularText}>Popular</Text>
            </View>
          )}
          
          {discount && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>{discount}</Text>
            </View>
          )}
        </View>
        
        <View style={styles.planFeatures}>
          {plan.features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <View style={styles.featureIconContainer}>
                <Image source={ICONS.check} style={styles.featureIcon} />
              </View>
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
          
          {plan.notIncluded.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <View style={[styles.featureIconContainer, styles.notIncludedIconContainer]}>
                <Text style={styles.notIncludedIcon}>×</Text>
              </View>
              <Text style={styles.notIncludedText}>{feature}</Text>
            </View>
          ))}
        </View>
      </TouchableOpacity>
    );
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading subscription information...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={ds.colors.neutral.white} />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.headerButton}>
          <Image source={ICONS.back} style={styles.headerIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Choose Your Plan</Text>
        <View style={styles.headerSpacer} />
      </View>
      
      <View style={styles.billingToggle}>
        <TouchableOpacity
          style={[
            styles.billingOption,
            billingCycle === 'monthly' && styles.selectedBillingOption,
          ]}
          onPress={() => setBillingCycle('monthly')}
        >
          <Text 
            style={[
              styles.billingOptionText,
              billingCycle === 'monthly' && styles.selectedBillingOptionText,
            ]}
          >
            Monthly
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.billingOption,
            billingCycle === 'yearly' && styles.selectedBillingOption,
          ]}
          onPress={() => setBillingCycle('yearly')}
        >
          <Text 
            style={[
              styles.billingOptionText,
              billingCycle === 'yearly' && styles.selectedBillingOptionText,
            ]}
          >
            Yearly
          </Text>
          <View style={styles.saveBadge}>
            <Text style={styles.saveText}>Save 16%</Text>
          </View>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Available Plans</Text>
        
        {renderPlanCard('free')}
        {renderPlanCard('basic')}
        {renderPlanCard('premium')}
        {renderPlanCard('family')}
        
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>All plans include:</Text>
          <View style={styles.infoItem}>
            <Image source={ICONS.star} style={styles.infoIcon} />
            <Text style={styles.infoText}>Cancel anytime</Text>
          </View>
          <View style={styles.infoItem}>
            <Image source={ICONS.star} style={styles.infoIcon} />
            <Text style={styles.infoText}>14-day free trial for new users</Text>
          </View>
          <View style={styles.infoItem}>
            <Image source={ICONS.star} style={styles.infoIcon} />
            <Text style={styles.infoText}>Automatic renewal (can be turned off)</Text>
          </View>
        </View>
        
        <View style={styles.bottomPadding} />
      </ScrollView>
      
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            isLoading && styles.disabledButton
          ]}
          onPress={handleContinue}
          disabled={isLoading}
        >
          <Text style={styles.continueButtonText}>
            {subscription && subscription.isActive && subscription.status !== 'trial'
              ? 'Change Plan'
              : 'Start Free Trial'}
          </Text>
        </TouchableOpacity>
        
        <Text style={styles.footerText}>
          {subscription && subscription.isActive && subscription.status !== 'trial'
            ? 'Your subscription will be updated at the end of your current billing period.'
            : 'Your free trial will start today. You won\'t be charged until after your trial ends.'}
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ds.colors.neutral.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ds.colors.neutral.background,
  },
  loadingText: {
    fontSize: 16,
    color: ds.colors.text.secondary,
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
  headerSpacer: {
    width: 40,
  },
  billingToggle: {
    flexDirection: 'row',
    backgroundColor: ds.colors.neutral.white,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: ds.colors.neutral.border,
  },
  billingOption: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: ds.colors.neutral.background,
    marginHorizontal: 4,
    position: 'relative',
  },
  selectedBillingOption: {
    backgroundColor: ds.colors.ui.highlight,
  },
  billingOptionText: {
    fontSize: 14,
    fontWeight: '500',
    color: ds.colors.text.secondary,
  },
  selectedBillingOptionText: {
    color: ds.colors.primary.main,
  },
  saveBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: ds.colors.feedback.success,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  saveText: {
    fontSize: 10,
    fontWeight: '600',
    color: ds.colors.neutral.white,
  },
  scrollContent: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: ds.colors.text.primary,
    marginBottom: 16,
  },
  planCard: {
    backgroundColor: ds.colors.neutral.white,
    borderRadius: 16,
    marginBottom: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: ds.colors.neutral.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedPlanCard: {
    borderColor: ds.colors.primary.main,
    borderWidth: 2,
    backgroundColor: ds.colors.ui.highlight,
  },
  familyPlanCard: {
    borderColor: ds.colors.secondary.main,
    backgroundColor: 'rgba(0, 194, 255, 0.05)',
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
    position: 'relative',
  },
  planName: {
    fontSize: 20,
    fontWeight: '700',
    color: ds.colors.text.primary,
    marginBottom: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  currencySymbol: {
    fontSize: 16,
    fontWeight: '500',
    color: ds.colors.text.primary,
  },
  planPrice: {
    fontSize: 28,
    fontWeight: '700',
    color: ds.colors.text.primary,
  },
  billingPeriod: {
    fontSize: 14,
    color: ds.colors.text.secondary,
    marginLeft: 2,
  },
  selectedCheckmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: ds.colors.primary.main,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkIcon: {
    width: 14,
    height: 14,
    tintColor: ds.colors.neutral.white,
  },
  popularBadge: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: ds.colors.primary.main,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  popularText: {
    fontSize: 12,
    fontWeight: '600',
    color: ds.colors.neutral.white,
  },
  discountBadge: {
    position: 'absolute',
    top: 30,
    right: 0,
    backgroundColor: ds.colors.feedback.success,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  discountText: {
    fontSize: 10,
    fontWeight: '600',
    color: ds.colors.neutral.white,
  },
  planFeatures: {
    marginTop: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureIconContainer: {
    width: 20,
    height: 20,
    borderRadius: 1
(Content truncated due to size limit. Use line ranges to read in chunks)