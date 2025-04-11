import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import PaymentService from '../services/PaymentService';

/**
 * Hook to manage subscription state and operations
 * @param {string} userId - The ID of the user
 * @returns {object} - Subscription state and methods
 */
export const useSubscription = (userId) => {
  const [isLoading, setIsLoading] = useState(true);
  const [subscription, setSubscription] = useState(null);
  const [trialDaysRemaining, setTrialDaysRemaining] = useState(0);
  const [isTrialActive, setIsTrialActive] = useState(false);

  // Initialize payment service and load subscription data
  useEffect(() => {
    const initializePayment = async () => {
      try {
        setIsLoading(true);
        
        // Initialize payment service
        await PaymentService.initialize();
        
        // Check if trial is active
        const trialActive = await PaymentService.isTrialActive();
        setIsTrialActive(trialActive);
        
        if (trialActive) {
          // Get trial days remaining
          const daysRemaining = await PaymentService.getTrialDaysRemaining();
          setTrialDaysRemaining(daysRemaining);
        }
        
        // Get current subscription
        const currentSubscription = await PaymentService.getSubscription(userId);
        setSubscription(currentSubscription);
      } catch (error) {
        console.error('Failed to initialize payment:', error);
        Alert.alert('Error', 'Failed to load subscription information. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    if (userId) {
      initializePayment();
    }
  }, [userId]);

  /**
   * Start a free trial for the user
   */
  const startFreeTrial = async () => {
    try {
      setIsLoading(true);
      const success = await PaymentService.startFreeTrial(userId);
      
      if (success) {
        setIsTrialActive(true);
        setTrialDaysRemaining(14); // TRIAL_DURATION_DAYS
        
        // Update subscription state
        const currentSubscription = await PaymentService.getSubscription(userId);
        setSubscription(currentSubscription);
        
        return true;
      } else {
        Alert.alert('Error', 'Failed to start free trial. Please try again later.');
        return false;
      }
    } catch (error) {
      console.error('Failed to start free trial:', error);
      Alert.alert('Error', 'Failed to start free trial. Please try again later.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Create a subscription for the user
   * @param {string} planId - The ID of the subscription plan
   * @param {string} paymentMethodId - The ID of the payment method
   */
  const createSubscription = async (planId, paymentMethodId) => {
    try {
      setIsLoading(true);
      const newSubscription = await PaymentService.createSubscription(userId, planId, paymentMethodId);
      
      // Update subscription state
      setSubscription({
        ...newSubscription,
        isActive: true,
      });
      
      return true;
    } catch (error) {
      console.error('Failed to create subscription:', error);
      Alert.alert('Error', 'Failed to create subscription. Please try again later.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Cancel the user's subscription
   */
  const cancelSubscription = async () => {
    try {
      setIsLoading(true);
      const success = await PaymentService.cancelSubscription(userId);
      
      if (success) {
        // Update subscription state
        const currentSubscription = await PaymentService.getSubscription(userId);
        setSubscription(currentSubscription);
        
        return true;
      } else {
        Alert.alert('Error', 'Failed to cancel subscription. Please try again later.');
        return false;
      }
    } catch (error) {
      console.error('Failed to cancel subscription:', error);
      Alert.alert('Error', 'Failed to cancel subscription. Please try again later.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Update the user's subscription plan
   * @param {string} newPlanId - The ID of the new subscription plan
   */
  const updateSubscription = async (newPlanId) => {
    try {
      setIsLoading(true);
      const updatedSubscription = await PaymentService.updateSubscription(userId, newPlanId);
      
      // Update subscription state
      setSubscription({
        ...updatedSubscription,
        isActive: true,
      });
      
      return true;
    } catch (error) {
      console.error('Failed to update subscription:', error);
      Alert.alert('Error', 'Failed to update subscription. Please try again later.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    subscription,
    isTrialActive,
    trialDaysRemaining,
    startFreeTrial,
    createSubscription,
    cancelSubscription,
    updateSubscription,
  };
};
