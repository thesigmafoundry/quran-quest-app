import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Import screens
import WelcomeScreen from './screens/WelcomeScreen';
import UserTypeSelectionScreen from './screens/UserTypeSelectionScreen';
import ChildProfileSetupScreen from './screens/ChildProfileSetupScreen';
import ParentAccountSetupScreen from './screens/ParentAccountSetupScreen';
import AssessmentScreen from './screens/AssessmentScreen';
import DashboardScreen from './screens/DashboardScreen';
import LessonScreen from './screens/LessonScreen';
import ProgressTrackingScreen from './screens/ProgressTrackingScreen';
import FamilyManagementScreen from './screens/FamilyManagementScreen';
import SettingsScreen from './screens/SettingsScreen';
import SubscriptionScreen from './screens/SubscriptionScreen';
import PaymentDetailsScreen from './screens/PaymentDetailsScreen';
import SubscriptionConfirmationScreen from './screens/SubscriptionConfirmationScreen';

// Import context providers
import { AuthProvider } from './contexts/AuthContext';
import { LearningPathProvider } from './contexts/LearningPathContext';
import { PronunciationProvider } from './contexts/PronunciationContext';
import { SubscriptionProvider } from './contexts/SubscriptionContext';

// Create navigators
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Tab Navigator
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Lessons') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'Progress') {
            iconName = focused ? 'stats-chart' : 'stats-chart-outline';
          } else if (route.name === 'Family') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6A3DE8',
        tabBarInactiveTintColor: '#888888',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0,
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.1,
          shadowRadius: 5,
          height: 60,
          paddingBottom: 5,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Lessons" component={LessonScreen} />
      <Tab.Screen name="Progress" component={ProgressTrackingScreen} />
      <Tab.Screen name="Family" component={FamilyManagementScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

// Main App with Navigation
const App = () => {
  return (
    <AuthProvider>
      <SubscriptionProvider>
        <LearningPathProvider>
          <PronunciationProvider>
            <NavigationContainer>
              <Stack.Navigator
                initialRouteName="Welcome"
                screenOptions={{
                  headerShown: false,
                  cardStyle: { backgroundColor: '#FFFFFF' },
                }}
              >
                {/* Onboarding Flow */}
                <Stack.Screen name="Welcome" component={WelcomeScreen} />
                <Stack.Screen name="UserTypeSelection" component={UserTypeSelectionScreen} />
                <Stack.Screen name="ChildProfileSetup" component={ChildProfileSetupScreen} />
                <Stack.Screen name="ParentAccountSetup" component={ParentAccountSetupScreen} />
                <Stack.Screen name="Assessment" component={AssessmentScreen} />
                
                {/* Main App Flow */}
                <Stack.Screen name="MainApp" component={TabNavigator} />
                
                {/* Subscription Flow */}
                <Stack.Screen name="Subscription" component={SubscriptionScreen} />
                <Stack.Screen name="PaymentDetails" component={PaymentDetailsScreen} />
                <Stack.Screen name="SubscriptionConfirmation" component={SubscriptionConfirmationScreen} />
              </Stack.Navigator>
            </NavigationContainer>
          </PronunciationProvider>
        </LearningPathProvider>
      </SubscriptionProvider>
    </AuthProvider>
  );
};

export default App;
