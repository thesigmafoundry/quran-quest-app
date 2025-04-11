import React, { createContext, useState, useContext } from 'react';
import { subscriptionAPI } from '../api/api';

// Create Subscription Context
const SubscriptionContext = createContext();

// Custom hook to use the subscription context
export const useSubscription = () => useContext(SubscriptionContext);

// Subscription Provider Component
export const SubscriptionProvider = ({ children }) => {
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);
  const [subscriptionPlans, setSubscriptionPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch subscription status
  const fetchSubscriptionStatus = async () => {
    try {
      setLoading(true);
      setError(null);
      const status = await subscriptionAPI.getSubscriptionStatus();
      setSubscriptionStatus(status);
      return { success: true, status };
    } catch (err) {
      setError('Failed to fetch subscription status');
      return { success: false, error: 'Failed to fetch subscription status' };
    } finally {
      setLoading(false);
    }
  };

  // Fetch available subscription plans
  const fetchSubscriptionPlans = async () => {
    try {
      setLoading(true);
      setError(null);
      const plans = await subscriptionAPI.getSubscriptionPlans();
      setSubscriptionPlans(plans);
      return { success: true, plans };
    } catch (err) {
      setError('Failed to fetch subscription plans');
      return { success: false, error: 'Failed to fetch subscription plans' };
    } finally {
      setLoading(false);
    }
  };

  // Create a new subscription
  const createSubscription = async (planId, paymentMethodId) => {
    try {
      setLoading(true);
      setError(null);
      const result = await subscriptionAPI.createSubscription(planId, paymentMethodId);
      
      // Update subscription status after creation
      await fetchSubscriptionStatus();
      
      return { success: true, result };
    } catch (err) {
      setError('Failed to create subscription');
      return { success: false, error: 'Failed to create subscription' };
    } finally {
      setLoading(false);
    }
  };

  // Cancel current subscription
  const cancelSubscription = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await subscriptionAPI.cancelSubscription();
      
      // Update subscription status after cancellation
      await fetchSubscriptionStatus();
      
      return { success: true, result };
    } catch (err) {
      setError('Failed to cancel subscription');
      return { success: false, error: 'Failed to cancel subscription' };
    } finally {
      setLoading(false);
    }
  };

  // Update subscription plan
  const updateSubscription = async (planId) => {
    try {
      setLoading(true);
      setError(null);
      const result = await subscriptionAPI.updateSubscription(planId);
      
      // Update subscription status after update
      await fetchSubscriptionStatus();
      
      return { success: true, result };
    } catch (err) {
      setError('Failed to update subscription');
      return { success: false, error: 'Failed to update subscription' };
    } finally {
      setLoading(false);
    }
  };

  // Check if subscription is active
  const isSubscriptionActive = () => {
    if (!subscriptionStatus) return false;
    
    return (
      subscriptionStatus.status === 'active' || 
      subscriptionStatus.status === 'trial'
    ) && (
      !subscriptionStatus.expiry_date || 
      new Date(subscriptionStatus.expiry_date) > new Date()
    );
  };

  // Check if user is in trial period
  const isInTrialPeriod = () => {
    if (!subscriptionStatus) return false;
    
    return (
      subscriptionStatus.status === 'trial' && 
      new Date(subscriptionStatus.expiry_date) > new Date()
    );
  };

  // Get days remaining in trial or subscription
  const getDaysRemaining = () => {
    if (!subscriptionStatus || !subscriptionStatus.expiry_date) return 0;
    
    const expiry = new Date(subscriptionStatus.expiry_date);
    const today = new Date();
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays > 0 ? diffDays : 0;
  };

  // Provide subscription context to children components
  return (
    <SubscriptionContext.Provider
      value={{
        subscriptionStatus,
        subscriptionPlans,
        loading,
        error,
        fetchSubscriptionStatus,
        fetchSubscriptionPlans,
        createSubscription,
        cancelSubscription,
        updateSubscription,
        isSubscriptionActive,
        isInTrialPeriod,
        getDaysRemaining,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};
