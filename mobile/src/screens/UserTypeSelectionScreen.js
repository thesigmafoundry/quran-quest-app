import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { designSystem as ds } from '../styles/modernDesignSystem';
import { useNavigation } from '@react-navigation/native';

// Icons for user types
const PARENT_ICON = require('../../assets/parent-icon.png'); // Placeholder - will need actual assets
const CHILD_ICON = require('../../assets/child-icon.png');   // Placeholder - will need actual assets
const FAMILY_ICON = require('../../assets/family-icon.png'); // Placeholder - will need actual assets

const UserTypeSelectionScreen = () => {
  const navigation = useNavigation();
  const [selectedType, setSelectedType] = useState(null);

  const handleContinue = () => {
    if (!selectedType) return;
    
    // Navigate to appropriate next screen based on selection
    switch (selectedType) {
      case 'parent':
        navigation.navigate('ParentSetup');
        break;
      case 'child':
        navigation.navigate('ChildProfile');
        break;
      case 'family':
        navigation.navigate('ParentSetup', { isFamily: true });
        break;
      default:
        break;
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const SelectionCard = ({ type, title, description, icon, onSelect }) => {
    const isSelected = selectedType === type;
    
    return (
      <TouchableOpacity
        style={[
          styles.card,
          isSelected && styles.selectedCard,
        ]}
        onPress={() => onSelect(type)}
        activeOpacity={0.8}
      >
        <View style={styles.cardContent}>
          <Image source={icon} style={styles.cardIcon} />
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardTitle}>{title}</Text>
            <Text style={styles.cardDescription}>{description}</Text>
          </View>
        </View>
        {isSelected && (
          <View style={styles.checkmarkContainer}>
            <View style={styles.checkmark}>
              <Text style={styles.checkmarkText}>✓</Text>
            </View>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={ds.colors.neutral.white} />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Who will be using Quranic Quest?</Text>
          <Text style={styles.subtitle}>Select your role to personalize your experience</Text>
        </View>

        <View style={styles.cardsContainer}>
          <SelectionCard
            type="parent"
            title="Parent"
            description="Manage your children's learning journey"
            icon={PARENT_ICON}
            onSelect={setSelectedType}
          />
          
          <SelectionCard
            type="child"
            title="Child"
            description="Learn Quran with interactive lessons"
            icon={CHILD_ICON}
            onSelect={setSelectedType}
          />
          
          <SelectionCard
            type="family"
            title="Family"
            description="Set up accounts for the whole family"
            icon={FAMILY_ICON}
            onSelect={setSelectedType}
          />
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.continueButton,
            !selectedType && styles.continueButtonDisabled,
          ]}
          onPress={handleContinue}
          disabled={!selectedType}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ds.colors.neutral.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: ds.colors.text.primary,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: ds.colors.text.secondary,
    textAlign: 'center',
  },
  cardsContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: 16,
  },
  card: {
    backgroundColor: ds.colors.neutral.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedCard: {
    borderColor: ds.colors.primary.main,
    backgroundColor: ds.colors.ui.highlight,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  cardIcon: {
    width: 48,
    height: 48,
    marginRight: 16,
    tintColor: ds.colors.primary.main,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: ds.colors.text.primary,
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: ds.colors.text.secondary,
  },
  checkmarkContainer: {
    marginLeft: 12,
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: ds.colors.primary.main,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkText: {
    color: ds.colors.neutral.white,
    fontSize: 14,
    fontWeight: '700',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: ds.colors.neutral.border,
  },
  backButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  backButtonText: {
    color: ds.colors.primary.main,
    fontSize: 16,
    fontWeight: '500',
  },
  continueButton: {
    backgroundColor: ds.colors.primary.main,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  continueButtonDisabled: {
    backgroundColor: ds.colors.neutral.border,
    shadowOpacity: 0,
    elevation: 0,
  },
  continueButtonText: {
    color: ds.colors.neutral.white,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default UserTypeSelectionScreen;
