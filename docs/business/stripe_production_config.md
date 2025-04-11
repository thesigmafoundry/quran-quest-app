# Stripe Production Configuration Guide

## Overview
This document outlines the steps to configure Stripe for production use in the Quranic Quest app. The app uses Stripe to handle subscription payments for the premium features after the 14-day free trial period.

## Prerequisites
- Stripe account with completed business verification
- SSL certificate for your domain
- Production backend environment set up

## Configuration Steps

### 1. Stripe Account Setup

1. **Complete Business Verification**
   - Provide all required business documentation
   - Complete identity verification
   - Set up bank account for payouts

2. **Configure Account Settings**
   - Set business name and branding
   - Configure payout schedule
   - Set up tax reporting information
   - Configure email notifications

3. **Set Up Webhook Endpoints**
   - Create a webhook endpoint at `https://api.quranicquest.com/api/webhooks/stripe`
   - Select events to listen for:
     - `customer.subscription.created`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
     - `invoice.payment_succeeded`
     - `invoice.payment_failed`
     - `payment_intent.succeeded`
     - `payment_intent.payment_failed`
   - Note the webhook signing secret for backend configuration

### 2. Product and Price Configuration

1. **Create Subscription Products**
   - Basic Plan
     - Name: "Quranic Quest Basic"
     - Description: "Essential Quranic learning features for one child"
   - Premium Plan
     - Name: "Quranic Quest Premium"
     - Description: "Advanced features with personalized learning paths for one child"
   - Family Plan
     - Name: "Quranic Quest Family"
     - Description: "Premium features for up to 5 children with family progress tracking"

2. **Configure Pricing Options**
   - Basic Plan
     - Monthly: $4.99/month
     - Annual: $49.99/year (save ~17%)
   - Premium Plan
     - Monthly: $9.99/month
     - Annual: $99.99/year (save ~17%)
   - Family Plan
     - Monthly: $14.99/month
     - Annual: $149.99/year (save ~17%)

3. **Set Up Free Trial**
   - Configure 14-day free trial for all subscription plans
   - Set trial end behavior to convert to paid subscription

### 3. Backend Integration

1. **Update Environment Variables**
   ```
   STRIPE_API_KEY=sk_live_...
   STRIPE_PUBLISHABLE_KEY=pk_live_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

2. **Update Product and Price IDs**
   - Replace test IDs with production IDs in the configuration:
   ```python
   # config/payment.py
   STRIPE_PRODUCTS = {
       'basic': {
           'id': 'prod_...',
           'prices': {
               'monthly': 'price_...',
               'annual': 'price_...'
           }
       },
       'premium': {
           'id': 'prod_...',
           'prices': {
               'monthly': 'price_...',
               'annual': 'price_...'
           }
       },
       'family': {
           'id': 'prod_...',
           'prices': {
               'monthly': 'price_...',
               'annual': 'price_...'
           }
       }
   }
   ```

3. **Implement Webhook Handling**
   - Verify webhook signatures
   - Process subscription events
   - Update user subscription status
   - Handle payment failures

### 4. Mobile App Integration

1. **Update API Configuration**
   - Replace test publishable key with production key
   ```javascript
   // src/services/PaymentService.js
   const STRIPE_PUBLISHABLE_KEY = 'pk_live_...';
   ```

2. **Update Product and Price IDs**
   - Replace test IDs with production IDs
   ```javascript
   // src/services/PaymentService.js
   const SUBSCRIPTION_PLANS = {
     basic: {
       id: 'prod_...',
       prices: {
         monthly: 'price_...',
         annual: 'price_...'
       }
     },
     // ... other plans
   };
   ```

3. **Configure Apple Pay / Google Pay**
   - Set up Apple Pay merchant ID
   - Configure Google Pay merchant ID
   - Test payment flows with real cards

### 5. Testing Production Configuration

1. **Test Subscription Creation**
   - Create test subscriptions with real cards
   - Verify webhook events are received and processed
   - Check subscription status is updated in the database

2. **Test Subscription Management**
   - Test upgrading subscription
   - Test downgrading subscription
   - Test cancellation flow

3. **Test Renewal Process**
   - Use Stripe test clock to simulate renewals
   - Verify renewal invoices are created and paid
   - Check subscription extension in the app

4. **Test Failed Payment Handling**
   - Simulate failed payments
   - Verify retry logic works
   - Test dunning management flow

### 6. Compliance and Documentation

1. **Update Terms of Service**
   - Include subscription terms
   - Detail billing practices
   - Explain cancellation policy

2. **Update Privacy Policy**
   - Include information about payment processing
   - Explain what payment data is stored
   - Detail data sharing with Stripe

3. **Create Customer Support Documentation**
   - Subscription FAQ
   - Troubleshooting payment issues
   - Refund policy

### 7. Monitoring and Alerts

1. **Set Up Stripe Monitoring**
   - Configure alerts for failed payments
   - Monitor subscription churn
   - Track revenue metrics

2. **Integrate with App Monitoring**
   - Log payment events
   - Track conversion rates
   - Monitor trial-to-paid conversion

## Production Checklist

- [ ] Stripe account fully verified
- [ ] All subscription products and prices created
- [ ] Webhook endpoint configured and tested
- [ ] Backend updated with production keys and IDs
- [ ] Mobile app updated with production configuration
- [ ] Apple Pay / Google Pay configured
- [ ] All subscription flows tested with real cards
- [ ] Terms of Service and Privacy Policy updated
- [ ] Support documentation created
- [ ] Monitoring and alerts configured

## Troubleshooting Common Issues

### Webhook Events Not Received
- Verify webhook endpoint is publicly accessible
- Check webhook signing secret is correct
- Ensure all required events are selected
- Check server logs for webhook processing errors

### Subscription Creation Failures
- Verify API keys are correct
- Check price IDs exist and are active
- Ensure customer creation is successful
- Verify card is properly tokenized

### Payment Method Issues
- Ensure proper SCA (Strong Customer Authentication) handling
- Verify 3D Secure flows work correctly
- Check for card decline messages
- Ensure proper error handling and user feedback

## Useful Stripe CLI Commands

```bash
# List all products
stripe products list

# List all prices
stripe prices list

# Create a webhook endpoint
stripe webhook create --connect-to https://api.quranicquest.com/api/webhooks/stripe

# Trigger test webhook events
stripe trigger customer.subscription.created

# View recent events
stripe events list
```
