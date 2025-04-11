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
  Switch,
} from 'react-native';
import { designSystem as ds } from '../styles/modernDesignSystem';
import { useNavigation } from '@react-navigation/native';

// Placeholder icons - will need actual assets
const ICONS = {
  back: require('../../assets/back-icon.png'),
  profile: require('../../assets/profile-icon.png'),
  notification: require('../../assets/notification-icon.png'),
  language: require('../../assets/language-icon.png'),
  appearance: require('../../assets/appearance-icon.png'),
  subscription: require('../../assets/subscription-icon.png'),
  privacy: require('../../assets/privacy-icon.png'),
  help: require('../../assets/help-icon.png'),
  about: require('../../assets/about-icon.png'),
  logout: require('../../assets/logout-icon.png'),
  chevron: require('../../assets/chevron-right-icon.png'),
};

const SettingsScreen = () => {
  const navigation = useNavigation();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [autoPlayAudio, setAutoPlayAudio] = useState(true);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleNavigate = (screen) => {
    navigation.navigate(screen);
  };

  const renderSettingItem = (icon, title, onPress, showChevron = true) => {
    return (
      <TouchableOpacity style={styles.settingItem} onPress={onPress}>
        <View style={styles.settingIconContainer}>
          <Image source={icon} style={styles.settingIcon} />
        </View>
        <Text style={styles.settingTitle}>{title}</Text>
        {showChevron && (
          <Image source={ICONS.chevron} style={styles.chevronIcon} />
        )}
      </TouchableOpacity>
    );
  };

  const renderSettingWithSwitch = (icon, title, value, onValueChange) => {
    return (
      <View style={styles.settingItem}>
        <View style={styles.settingIconContainer}>
          <Image source={icon} style={styles.settingIcon} />
        </View>
        <Text style={styles.settingTitle}>{title}</Text>
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: ds.colors.neutral.border, true: ds.colors.primary.light }}
          thumbColor={value ? ds.colors.primary.main : ds.colors.neutral.white}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={ds.colors.neutral.white} />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.headerButton}>
          <Image source={ICONS.back} style={styles.headerIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.headerSpacer} />
      </View>
      
      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Image source={require('../../assets/parent-avatar.png')} style={styles.profileImage} />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Ahmed Abdullah</Text>
            <Text style={styles.profileEmail}>ahmed@example.com</Text>
          </View>
          <TouchableOpacity 
            style={styles.editProfileButton}
            onPress={() => handleNavigate('EditProfile')}
          >
            <Text style={styles.editProfileText}>Edit</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Account</Text>
          {renderSettingItem(ICONS.profile, 'Profile Information', () => handleNavigate('ProfileInfo'))}
          {renderSettingItem(ICONS.subscription, 'Subscription', () => handleNavigate('Subscription'))}
        </View>
        
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          {renderSettingWithSwitch(ICONS.notification, 'Notifications', notificationsEnabled, setNotificationsEnabled)}
          {renderSettingItem(ICONS.language, 'Language', () => handleNavigate('Language'))}
          {renderSettingWithSwitch(ICONS.appearance, 'Dark Mode', darkModeEnabled, setDarkModeEnabled)}
          {renderSettingWithSwitch(ICONS.appearance, 'Auto-play Audio', autoPlayAudio, setAutoPlayAudio)}
        </View>
        
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Family</Text>
          {renderSettingItem(null, 'Manage Family Members', () => handleNavigate('FamilyManagement'))}
          {renderSettingItem(null, 'Parental Controls', () => handleNavigate('ParentalControls'))}
        </View>
        
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Support</Text>
          {renderSettingItem(ICONS.help, 'Help & Support', () => handleNavigate('Help'))}
          {renderSettingItem(ICONS.privacy, 'Privacy Policy', () => handleNavigate('Privacy'))}
          {renderSettingItem(ICONS.about, 'About Quranic Quest', () => handleNavigate('About'))}
        </View>
        
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={() => handleNavigate('Welcome')}
        >
          <Image source={ICONS.logout} style={styles.logoutIcon} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
        
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ds.colors.neutral.background,
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
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: ds.colors.neutral.white,
    marginBottom: 16,
  },
  profileImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    marginRight: 16,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: ds.colors.text.primary,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: ds.colors.text.secondary,
  },
  editProfileButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: ds.colors.ui.highlight,
  },
  editProfileText: {
    fontSize: 14,
    fontWeight: '500',
    color: ds.colors.primary.main,
  },
  settingsSection: {
    backgroundColor: ds.colors.neutral.white,
    borderRadius: 12,
    marginBottom: 16,
    paddingVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: ds.colors.text.secondary,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: ds.colors.neutral.border,
  },
  settingIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: ds.colors.ui.highlight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingIcon: {
    width: 16,
    height: 16,
    tintColor: ds.colors.primary.main,
  },
  settingTitle: {
    flex: 1,
    fontSize: 16,
    color: ds.colors.text.primary,
  },
  chevronIcon: {
    width: 16,
    height: 16,
    tintColor: ds.colors.text.tertiary,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginVertical: 24,
    paddingVertical: 12,
    backgroundColor: ds.colors.neutral.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: ds.colors.feedback.error,
  },
  logoutIcon: {
    width: 20,
    height: 20,
    tintColor: ds.colors.feedback.error,
    marginRight: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '500',
    color: ds.colors.feedback.error,
  },
  versionContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  versionText: {
    fontSize: 14,
    color: ds.colors.text.tertiary,
  },
});

export default SettingsScreen;
