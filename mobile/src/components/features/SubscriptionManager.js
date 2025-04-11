import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useSubscription } from '../contexts/SubscriptionContext';
import { useAuth } from '../contexts/AuthContext';
import { modernDesignSystem as ds } from '../styles/modernDesignSystem';
import { Ionicons } from '@expo/vector-icons';

const SubscriptionManager = ({ navigation }) => {
  const { 
    subscriptionStatus, 
    subscriptionPlans, 
    loading, 
    error, 
    fetchSubscriptionStatus, 
    fetchSubscriptionPlans,
    isSubscriptionActive,
    isInTrialPeriod,
    getDaysRemaining
  } = useSubscription();
  
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    // Load subscription data when component mounts
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    
    // Fetch subscription status and plans
    await fetchSubscriptionStatus();
    await fetchSubscriptionPlans();
    
    setIsLoading(false);
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  const handleSubscribe = () => {
    if (selectedPlan) {
      // Navigate to payment details screen with selected plan
      navigation.navigate('PaymentDetails', { plan: selectedPlan });
    }
  };

  const handleManageSubscription = () => {
    // Navigate to subscription management screen
    navigation.navigate('SubscriptionManagement');
  };

  if (isLoading || loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={ds.colors.primary} />
        <Text style={styles.loadingText}>Loading subscription information...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load subscription information. Please try again.</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadData}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Subscription Status Card */}
      <View style={styles.statusCard}>
        <View style={styles.statusHeader}>
          <Text style={styles.statusTitle}>Subscription Status</Text>
          {isSubscriptionActive() && (
            <View style={styles.activeStatusBadge}>
              <Text style={styles.activeStatusText}>Active</Text>
            </View>
          )}
          {!isSubscriptionActive() && !isInTrialPeriod() && (
            <View style={[styles.activeStatusBadge, styles.inactiveStatusBadge]}>
              <Text style={styles.inactiveStatusText}>Inactive</Text>
            </View>
          )}
          {isInTrialPeriod() && (
            <View style={[styles.activeStatusBadge, styles.trialStatusBadge]}>
              <Text style={styles.activeStatusText}>Trial</Text>
            </View>
          )}
        </View>

        {isSubscriptionActive() && subscriptionStatus && (
          <View style={styles.statusDetails}>
            <View style={styles.statusItem}>
              <Ionicons name="calendar-outline" size={20} color={ds.colors.primary} />
              <Text style={styles.statusItemText}>
                {isInTrialPeriod() ? 'Trial ends' : 'Renews'}: {new Date(subscriptionStatus.expiry_date).toLocaleDateString()}
              </Text>
            </View>
            <View style={styles.statusItem}>
              <Ionicons name="time-outline" size={20} color={ds.colors.primary} />
              <Text style={styles.statusItemText}>
                {getDaysRemaining()} days remaining
              </Text>
            </View>
            {subscriptionStatus.plan && (
              <View style={styles.statusItem}>
                <Ionicons name="bookmark-outline" size={20} color={ds.colors.primary} />
                <Text style={styles.statusItemText}>
                  Plan: {subscriptionStatus.plan.name}
                </Text>
              </View>
            )}
            
            <TouchableOpacity 
              style={styles.manageButton}
              onPress={handleManageSubscription}
            >
              <Text style={styles.manageButtonText}>Manage Subscription</Text>
            </TouchableOpacity>
          </View>
        )}

        {!isSubscriptionActive() && !isInTrialPeriod() && (
          <View style={styles.inactiveMessage}>
            <Text style={styles.inactiveMessageText}>
              You don't have an active subscription. Subscribe now to access all features!
            </Text>
          </View>
        )}

        {isInTrialPeriod() && (
          <View style={styles.trialMessage}>
            <Text style={styles.trialMessageText}>
              You're currently in your 14-day free trial. {getDaysRemaining()} days remaining.
            </Text>
          </View>
        )}
      </View>

      {/* Subscription Plans */}
      {(!isSubscriptionActive() || isInTrialPeriod()) && (
        <View style={styles.plansContainer}>
          <Text style={styles.plansTitle}>Choose a Plan</Text>
          
          {subscriptionPlans.map((plan) => (
            <TouchableOpacity 
              key={plan.id}
              style={[
                styles.planCard,
                selectedPlan?.id === plan.id ? styles.selectedPlanCard : {}
              ]}
              onPress={() => handlePlanSelect(plan)}
            >
              <View style={styles.planHeader}>
                <Text style={styles.planName}>{plan.name}</Text>
                {plan.popular && (
                  <View style={styles.popularBadge}>
                    <Text style={styles.popularBadgeText}>Popular</Text>
                  </View>
                )}
              </View>
              
              <Text style={styles.planPrice}>
                ${plan.price}/{plan.interval}
              </Text>
              
              <Text style={styles.planDescription}>
                {plan.description}
              </Text>
              
              <View style={styles.planFeatures}>
                {plan.features.map((feature, index) => (
                  <View key={index} style={styles.featureItem}>
                    <Ionicons name="checkmark-circle" size={18} color={ds.colors.success} />
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>
              
              {selectedPlan?.id === plan.id && (
                <View style={styles.selectedIndicator}>
                  <Ionicons name="checkmark-circle" size={24} color={ds.colors.primary} />
                </View>
              )}
            </TouchableOpacity>
          ))}
          
          <TouchableOpacity 
            style={[
              styles.subscribeButton,
              !selectedPlan ? styles.disabledButton : {}
            ]}
            onPress={handleSubscribe}
            disabled={!selectedPlan}
          >
            <Text style={styles.subscribeButtonText}>
              {isInTrialPeriod() ? 'Subscribe Now' : 'Continue'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
      
      {/* Features Overview */}
      <View style={styles.featuresContainer}>
        <Text style={styles.featuresTitle}>Premium Features</Text>
        
        <View style={styles.featureCard}>
          <Ionicons name="mic" size={24} color={ds.colors.primary} />
          <View style={styles.featureCardContent}>
            <Text style={styles.featureCardTitle}>Advanced Pronunciation Feedback</Text>
            <Text style={styles.featureCardDescription}>
              Get detailed feedback on your Quranic recitation with personalized improvement suggestions.
            </Text>
          </View>
        </View>
        
        <View style={styles.featureCard}>
          <Ionicons name="school" size={24} color={ds.colors.primary} />
          <View style={styles.featureCardContent}>
            <Text style={styles.featureCardTitle}>Personalized Learning Paths</Text>
            <Text style={styles.featureCardDescription}>
              AI-generated learning paths tailored to your child's age, level, and learning goals.
            </Text>
          </View>
        </View>
        
        <View style={styles.featureCard}>
          <Ionicons name="people" size={24} color={ds.colors.primary} />
          <View style={styles.featureCardContent}>
            <Text style={styles.featureCardTitle}>Family Management</Text>
            <Text style={styles.featureCardDescription}>
              Add multiple children profiles and track their progress individually.
            </Text>
          </View>
        </View>
        
        <View style={styles.featureCard}>
          <Ionicons name="cloud-download" size={24} color={ds.colors.primary} />
          <View style={styles.featureCardContent}>
            <Text style={styles.featureCardTitle}>Offline Access</Text>
            <Text style={styles.featureCardDescription}>
              Download lessons and practice materials for offline use.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ds.colors.background,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    fontFamily: ds.typography.fontFamily.medium,
    color: ds.colors.textSecondary,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    fontFamily: ds.typography.fontFamily.medium,
    color: ds.colors.error,
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: ds.colors.primary,
    borderRadius: ds.borderRadius.medium,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: ds.typography.fontFamily.medium,
  },
  statusCard: {
    backgroundColor: ds.colors.cardBackground,
    borderRadius: ds.borderRadius.large,
    padding: 20,
    marginBottom: 20,
    ...ds.shadows.medium,
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  statusTitle: {
    fontSize: 18,
    fontFamily: ds.typography.fontFamily.bold,
    color: ds.colors.text,
  },
  activeStatusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: ds.colors.success,
    borderRadius: ds.borderRadius.small,
  },
  activeStatusText: {
    color: 'white',
    fontSize: 12,
    fontFamily: ds.typography.fontFamily.medium,
  },
  inactiveStatusBadge: {
    backgroundColor: ds.colors.error,
  },
  inactiveStatusText: {
    color: 'white',
    fontSize: 12,
    fontFamily: ds.typography.fontFamily.medium,
  },
  trialStatusBadge: {
    backgroundColor: ds.colors.warning,
  },
  statusDetails: {
    marginTop: 10,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  statusItemText: {
    fontSize: 14,
    fontFamily: ds.typography.fontFamily.regular,
    color: ds.colors.text,
    marginLeft: 10,
  },
  manageButton: {
    backgroundColor: ds.colors.secondary,
    borderRadius: ds.borderRadius.medium,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  manageButtonText: {
    color: 'white',
    fontSize: 14,
    fontFamily: ds.typography.fontFamily.medium,
  },
  inactiveMessage: {
    marginTop: 10,
  },
  inactiveMessageText: {
    fontSize: 14,
    fontFamily: ds.typography.fontFamily.regular,
    color: ds.colors.text,
    lineHeight: 20,
  },
  trialMessage: {
    marginTop: 10,
    backgroundColor: ds.colors.warningLight,
    borderRadius: ds.borderRadius.medium,
    padding: 10,
  },
  trialMessageText: {
    fontSize: 14,
    fontFamily: ds.typography.fontFamily.medium,
    color: ds.colors.warning,
    lineHeight: 20,
  },
  plansContainer: {
    marginBottom: 20,
  },
  plansTitle: {
    fontSize: 18,
    fontFamily: ds.typography.fontFamily.bold,
    color: ds.colors.text,
    marginBottom: 15,
  },
  planCard: {
    backgroundColor: ds.colors.cardBackground,
    borderRadius: ds.borderRadius.large,
    padding: 20,
    marginBottom: 15,
    ...ds.shadows.medium,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedPlanCard: {
    borderColor: ds.colors.primary,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  planName: {
    fontSize: 18,
    fontFamily: ds.typography.fontFamily.bold,
    color: ds.colors.text,
  },
  popularBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: ds.colors.primary,
    borderRadius: ds.borderRadius.small,
  },
  popularBadgeText: {
    color: 'white',
    fontSize: 12,
    fontFamily: ds.typography.fontFamily.medium,
  },
  planPrice: {
    fontSize: 24,
    fontFamily: ds.typography.fontFamily.bold,
    color: ds.colors.text,
    marginBottom: 10,
  },
  planDescription: {
    fontSize: 14,
    fontFamily: ds.typography.fontFamily.regular,
    color: ds.colors.textSecondary,
    marginBottom: 15,
    lineHeight: 20,
  },
  planFeatures: {
    marginBottom: 10,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureText: {
    fontSize: 14,
    fontFamily: ds.typography.fontFamily.regular,
    color: ds.colors.text,
    marginLeft: 10,
  },
  selectedIndicator: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  subscribeButton: {
    backgroundColor: ds.colors.primary,
    borderRadius: ds.borderRadius.medium,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  disabledButton: {
    backgroundColor: ds.colors.border,
  },
  subscribeButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: ds.typography.fontFamily.semiBold,
  },
  featuresContainer: {
    marginBottom: 20,
  },
  featuresTitle: {
    fontSize: 18,
    fontFamily: ds.typography.fontFamily.bold,
    color: ds.colors.text,
    marginBottom: 15,
  },
  featureCard: {
    backgroundColor: ds.colors.cardBackground,
    borderRadius: ds.borderRadius.large,
    padding: 15,
    marginBottom: 15,
    ...ds.shadows.small,
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureCardContent: {
    marginLeft: 15,
    flex: 1,
  },
  featureCardTitle: {
    fontSize: 16,
    fontFamily: ds.typography.fontFamily.semiBold,
    color: ds.colors.text,
    marginBottom: 5,
  },
  featureCardDescription: {
    fontSize: 14,
    fontFamily: ds.typography.fontFamily.regular,
    color: ds.colors.textSecondary,
    lineHeight: 20,
  },
});

export default SubscriptionManager;
