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
  ActivityIndicator,
} from 'react-native';
import { designSystem as ds } from '../styles/modernDesignSystem';
import { useNavigation } from '@react-navigation/native';
import { useSubscription } from '../hooks/useSubscription';

// Placeholder icons - will need actual assets
const ICONS = {
  back: require('../../assets/back-icon.png'),
  check: require('../../assets/check-icon.png'),
  lock: require('../../assets/lock-icon.png'),
  card: require('../../assets/card-icon.png'),
};

const PaymentDetailsScreenConnected = ({ route }) => {
  const navigation = useNavigation();
  const { plan, billingCycle, price, isTrialActive } = route.params || { 
    plan: 'premium', 
    billingCycle: 'monthly', 
    price: 9.99,
    isTrialActive: false,
  };
  
  // Mock user ID - in a real app, this would come from authentication
  const userId = 'user_123';
  
  // Use the subscription hook
  const {
    isLoading,
    subscription,
    createSubscription,
  } = useSubscription(userId);

  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardholderName: '',
    expiryDate: '',
    cvv: '',
  });
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!cardDetails.cardNumber.trim()) {
      newErrors.cardNumber = 'Card number is required';
    } else if (!/^\d{16}$/.test(cardDetails.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Invalid card number';
    }
    
    if (!cardDetails.cardholderName.trim()) {
      newErrors.cardholderName = 'Cardholder name is required';
    }
    
    if (!cardDetails.expiryDate.trim()) {
      newErrors.expiryDate = 'Expiry date is required';
    } else if (!/^\d{2}\/\d{2}$/.test(cardDetails.expiryDate)) {
      newErrors.expiryDate = 'Invalid format (MM/YY)';
    }
    
    if (!cardDetails.cvv.trim()) {
      newErrors.cvv = 'CVV is required';
    } else if (!/^\d{3,4}$/.test(cardDetails.cvv)) {
      newErrors.cvv = 'Invalid CVV';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSubmit = async () => {
    if (isProcessing) return;
    
    if (paymentMethod === 'creditCard' && !validateForm()) {
      return;
    }
    
    try {
      setIsProcessing(true);
      
      // In a real app, we would process the payment method here
      // and get a payment method ID from Stripe
      const mockPaymentMethodId = 'pm_' + Math.random().toString(36).substring(2, 15);
      
      // If the user is in a trial, we're just setting up the payment method for later
      if (isTrialActive) {
        // In a real app, we would attach the payment method to the customer
        // but not charge them until the trial ends
        
        // Navigate to confirmation screen
        navigation.navigate('SubscriptionConfirmation', {
          plan,
          billingCycle,
          price,
          trialEndDate: '23 April 2025',
        });
      } else {
        // Create or update subscription with the payment method
        const success = await createSubscription(plan, mockPaymentMethodId);
        
        if (success) {
          // Navigate to confirmation screen
          navigation.navigate('SubscriptionConfirmation', {
            plan,
            billingCycle,
            price,
            trialEndDate: '23 April 2025',
          });
        } else {
          Alert.alert('Error', 'Failed to process payment. Please try again.');
        }
      }
    } catch (error) {
      console.error('Payment processing error:', error);
      Alert.alert('Error', 'An error occurred while processing your payment. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const formatCardNumber = (text) => {
    // Remove all non-digit characters
    const cleaned = text.replace(/\D/g, '');
    // Add space after every 4 digits
    const formatted = cleaned.replace(/(\d{4})(?=\d)/g, '$1 ');
    return formatted.substring(0, 19); // Limit to 16 digits + 3 spaces
  };

  const formatExpiryDate = (text) => {
    // Remove all non-digit characters
    const cleaned = text.replace(/\D/g, '');
    // Format as MM/YY
    if (cleaned.length > 2) {
      return `${cleaned.substring(0, 2)}/${cleaned.substring(2, 4)}`;
    }
    return cleaned;
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

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={ds.colors.primary.main} />
        <Text style={styles.loadingText}>Loading payment information...</Text>
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
        <Text style={styles.headerTitle}>Payment Details</Text>
        <View style={styles.headerSpacer} />
      </View>
      
      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.planSummary}>
          <Text style={styles.summaryTitle}>Subscription Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Plan:</Text>
            <Text style={styles.summaryValue}>{getPlanName()}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Billing:</Text>
            <Text style={styles.summaryValue}>{getBillingText()}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Free Trial:</Text>
            <Text style={styles.summaryValue}>14 days</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Today:</Text>
            <Text style={styles.totalValue}>$0.00</Text>
          </View>
          <Text style={styles.trialNote}>
            {isTrialActive 
              ? 'Your free trial is active. You won\'t be charged until your trial ends.'
              : 'Your free trial starts today. You won\'t be charged until April 23, 2025.'}
          </Text>
        </View>
        
        <View style={styles.paymentMethodSection}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          
          <View style={styles.paymentOptions}>
            <TouchableOpacity
              style={[
                styles.paymentOption,
                paymentMethod === 'creditCard' && styles.selectedPaymentOption,
              ]}
              onPress={() => setPaymentMethod('creditCard')}
            >
              <View style={styles.paymentOptionContent}>
                <Image source={ICONS.card} style={styles.paymentIcon} />
                <Text style={styles.paymentOptionText}>Credit Card</Text>
              </View>
              {paymentMethod === 'creditCard' && (
                <View style={styles.selectedCheckmark}>
                  <Image source={ICONS.check} style={styles.checkIcon} />
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>
        
        {paymentMethod === 'creditCard' && (
          <View style={styles.cardDetailsSection}>
            <Text style={styles.sectionTitle}>Card Details</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Card Number</Text>
              <View style={[
                styles.textInputContainer,
                errors.cardNumber && styles.inputError
              ]}>
                <Image source={ICONS.card} style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="1234 5678 9012 3456"
                  keyboardType="numeric"
                  value={cardDetails.cardNumber}
                  onChangeText={(text) => setCardDetails(prev => ({ 
                    ...prev, 
                    cardNumber: formatCardNumber(text) 
                  }))}
                  maxLength={19}
                />
              </View>
              {errors.cardNumber && <Text style={styles.errorText}>{errors.cardNumber}</Text>}
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Cardholder Name</Text>
              <View style={[
                styles.textInputContainer,
                errors.cardholderName && styles.inputError
              ]}>
                <TextInput
                  style={styles.textInput}
                  placeholder="John Doe"
                  value={cardDetails.cardholderName}
                  onChangeText={(text) => setCardDetails(prev => ({ ...prev, cardholderName: text }))}
                />
              </View>
              {errors.cardholderName && <Text style={styles.errorText}>{errors.cardholderName}</Text>}
            </View>
            
            <View style={styles.rowInputs}>
              <View style={[styles.inputGroup, { flex: 1, marginRight: 12 }]}>
                <Text style={styles.inputLabel}>Expiry Date</Text>
                <View style={[
                  styles.textInputContainer,
                  errors.expiryDate && styles.inputError
                ]}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="MM/YY"
                    keyboardType="numeric"
                    value={cardDetails.expiryDate}
                    onChangeText={(text) => setCardDetails(prev => ({ 
                      ...prev, 
                      expiryDate: formatExpiryDate(text) 
                    }))}
                    maxLength={5}
                  />
                </View>
                {errors.expiryDate && <Text style={styles.errorText}>{errors.expiryDate}</Text>}
              </View>
              
              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text style={styles.inputLabel}>CVV</Text>
                <View style={[
                  styles.textInputContainer,
                  errors.cvv && styles.inputError
                ]}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="123"
                    keyboardType="numeric"
                    value={cardDetails.cvv}
                    onChangeText={(text) => setCardDetails(prev => ({ ...prev, cvv: text }))}
                    maxLength={4}
                    secureTextEntry
                  />
                </View>
                {errors.cvv && <Text style={styles.errorText}>{errors.cvv}</Text>}
              </View>
            </View>
          </View>
        )}
        
        <View style={styles.securityNote}>
          <Image source={ICONS.lock} style={styles.lockIcon} />
          <Text style={styles.securityText}>
            Your payment information is encrypted and secure. We never store your full card details.
          </Text>
        </View>
        
        <View style={styles.termsSection}>
          <Text style={styles.termsText}>
            By continuing, you agree to our{' '}
            <Text style={styles.termsLink}>Terms of Service</Text>,{' '}
            <Text style={styles.termsLink}>Privacy Policy</Text>, and{' '}
            <Text style={styles.termsLink}>Subscription Terms</Text>.
          </Text>
        </View>
        
        <View style={styles.bottomPadding} />
      </ScrollView>
      
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.submitButton,
            (isProcessing || isLoading) && styles.disabledButton
          ]}
          onPress={handleSubmit}
          disabled={isProcessing || isLoading}
        >
          {isProcessing ? (
            <ActivityIndicator size="small" color={ds.colors.neutral.white} />
          ) : (
            <Text style={styles.submitButtonText}>
              {isTrialActive ? 'Save Payment Method' : 'Start Free Trial'}
            </Text>
          )}
        </TouchableOpacity>
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
    marginTop: 16,
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
  scrollContent: {
    flex: 1,
    padding: 16,
  },
  planSummary: {
    backgroundColor: ds.colors.neutral.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: ds.colors.text.primary,
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: ds.colors.text.secondary,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '500',
    color: ds.colors.text.primary,
  },
  divider: {
    height: 1,
    backgroundColor: ds.colors.neutral.border,
    marginVertical: 12,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: ds.colors.text.primary,
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: ds.colors.text.primary,
  },
  trialNote: {
    fontSize: 12,
    color: ds.colors.text.tertiary,
    fontStyle: 'italic',
  },
  paymentMethodSection: {
    backgroundColor: ds.colors.neutral.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: ds.colors.text.primary,
    marginBottom: 16,
  },
  paymentOptions: {
    marginBottom: 8,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderWidth: 1,
    borderColor: ds.colors.neutral.border,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: ds.colors.neutral.b
(Content truncated due to size limit. Use line ranges to read in chunks)