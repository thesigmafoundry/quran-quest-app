# Quranic Quest Mobile App UI Mockups

This document provides a summary of the UI mockups created for the Quranic Quest mobile application, an AI-driven Quran learning app designed specifically for Muslim immigrant families in Western countries.

## Overview

The mockups have been created as structured JSON specifications that define the layout, components, and interactions for each key screen of the application. These specifications can be used as a reference for implementing the UI in React Native.

## Key Screens

### Onboarding Flow
- **Welcome Screen** (`onboarding_welcome.json`): Initial app introduction with logo, title, and get started button
- **User Type Selection** (`onboarding_user_type.json`): Selection between parent, child, or family account types
- **Child Profile Setup** (`onboarding_child_profile.json`): Form for setting up a child's profile with name, age, experience level, and learning goals

### Main App Screens
- **Dashboard** (`dashboard_main.json`): Main app interface with daily goals, lesson cards, achievements, and family progress
- **Lesson Interface** (`lesson_interface.json`): Interactive lesson screen with Arabic text, audio controls, word-by-word breakdown, and pronunciation practice
- **Progress Tracking** (`progress_tracking.json`): Detailed statistics, charts, skills mastery tracking, achievements, and suggested actions
- **Family Management** (`family_management.json`): Parent dashboard with children's profiles, weekly overview, parent controls, and family recommendations

## User Flows

The user flows document (`user_flows.md`) outlines the key user journeys through the application:

1. **Onboarding Flow**: From welcome screen to dashboard
2. **Daily Learning Flow**: From dashboard through lessons and back
3. **Family Management Flow**: Parent journey for managing children's accounts
4. **Progress Review Flow**: Journey for reviewing learning progress
5. **Settings and Preferences Flow**: Journey for managing app settings

## Design System

The design system document (`design_system.md`) provides a comprehensive guide for the visual language of the app, including:

- **Color Palette**: Primary purple/blue colors with supporting neutrals and accents
- **Typography**: Font styles for both Latin and Arabic scripts
- **Spacing System**: Consistent spacing scale based on 4px units
- **Component Library**: Specifications for buttons, cards, input fields, and more
- **Accessibility Guidelines**: Ensuring the app is usable by all
- **Responsive Behavior**: Adapting to different device sizes and orientations

## Implementation Notes

These mockups are designed to be implemented in React Native, with the AI components being developed in Python using API calls to LLMs (OpenAI, Gemini, Anthropic models) as specified.

The mockups follow a component-based architecture that aligns with React Native development practices, making it straightforward to translate these specifications into actual code.

## Next Steps

1. Review these mockups and provide feedback on any adjustments needed
2. Begin implementing the React Native application structure
3. Develop the core UI components based on the design system
4. Implement the screen layouts following the mockup specifications
5. Connect the screens according to the defined user flows
6. Develop the Python backend for AI functionality
