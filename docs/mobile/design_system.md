# Quranic Quest Mobile App - Design System

This document outlines the design system for the Quranic Quest mobile application, providing a consistent framework for the app's visual language, components, and patterns.

## Color Palette

### Primary Colors
- **Primary Purple**: #5D5FEF
  - **Light**: #7B7DF7
  - **Dark**: #4A4CD6
- **Secondary Blue**: #00C2FF
  - **Light**: #33CFFF
  - **Dark**: #00A3D9

### Neutral Colors
- **Background**: #F8FAFC
- **Card Background**: #FFFFFF
- **Border**: #E2E8F0
- **Text Primary**: #1E293B
- **Text Secondary**: #64748B

### Accent Colors
- **Success**: #10B981
- **Warning**: #F59E0B
- **Error**: #EF4444
- **Info**: #3B82F6

### Semantic Colors
- **Achievement Gold**: #F59E0B
- **Progress Green**: #10B981
- **Streak Flame**: #EF4444

## Typography

### Font Family
- **Primary Font**: Inter
- **Arabic Font**: Amiri

### Text Styles
- **Heading 1**: 28px, Bold, Line Height 34px
- **Heading 2**: 24px, Bold, Line Height 30px
- **Heading 3**: 20px, Bold, Line Height 26px
- **Subtitle**: 18px, Medium, Line Height 24px
- **Body Large**: 16px, Regular, Line Height 24px
- **Body Medium**: 14px, Regular, Line Height 20px
- **Body Small**: 12px, Regular, Line Height 18px
- **Caption**: 10px, Regular, Line Height 14px

### Arabic Text Styles
- **Arabic Large**: 32px, Regular, Line Height 48px
- **Arabic Medium**: 24px, Regular, Line Height 36px
- **Arabic Small**: 18px, Regular, Line Height 28px
- **Transliteration**: 14px, Italic, Line Height 20px

## Spacing System

### Base Unit
- Base unit: 4px

### Spacing Scale
- **Tiny**: 4px (1x)
- **XSmall**: 8px (2x)
- **Small**: 12px (3x)
- **Medium**: 16px (4x)
- **Large**: 24px (6x)
- **XLarge**: 32px (8x)
- **2XLarge**: 48px (12x)
- **3XLarge**: 64px (16x)

### Layout Spacing
- **Screen Padding**: 16px
- **Card Padding**: 16px
- **Section Spacing**: 24px
- **Item Spacing**: 12px

## Component Library

### Buttons

#### Primary Button
- Background: Primary Purple (#5D5FEF)
- Text: White (#FFFFFF)
- Height: 48px
- Border Radius: 8px
- Padding: 12px 24px
- Font: Body Large, Bold

#### Secondary Button
- Background: Secondary Blue (#00C2FF)
- Text: White (#FFFFFF)
- Height: 48px
- Border Radius: 8px
- Padding: 12px 24px
- Font: Body Large, Bold

#### Text Button
- Background: Transparent
- Text: Primary Purple (#5D5FEF)
- Height: 48px
- Padding: 12px 24px
- Font: Body Large, Medium

#### Icon Button
- Size: 40px x 40px
- Border Radius: 20px
- Icon Size: 24px

### Cards

#### Feature Card
- Background: White (#FFFFFF)
- Border Radius: 12px
- Shadow: 0px 4px 20px rgba(0, 0, 0, 0.05)
- Border: 1px solid Border Color (#E2E8F0)
- Padding: 16px

#### Profile Card
- Background: White (#FFFFFF)
- Border Radius: 12px
- Shadow: 0px 4px 20px rgba(0, 0, 0, 0.05)
- Border: 1px solid Border Color (#E2E8F0)
- Padding: 16px

#### Achievement Card
- Background: White (#FFFFFF)
- Border Radius: 8px
- Shadow: 0px 2px 10px rgba(0, 0, 0, 0.05)
- Border: 1px solid Border Color (#E2E8F0)
- Padding: 12px

### Input Fields

#### Text Input
- Background: White (#FFFFFF)
- Border: 1px solid Border Color (#E2E8F0)
- Border Radius: 8px
- Height: 48px
- Padding: 12px 16px
- Font: Body Medium

#### Dropdown
- Background: White (#FFFFFF)
- Border: 1px solid Border Color (#E2E8F0)
- Border Radius: 8px
- Height: 48px
- Padding: 12px 16px
- Font: Body Medium

#### Checkbox
- Size: 20px x 20px
- Border Radius: 4px
- Checked Color: Primary Purple (#5D5FEF)

#### Radio Button
- Size: 20px x 20px
- Border Radius: 10px
- Selected Color: Primary Purple (#5D5FEF)

### Navigation

#### Tab Bar
- Background: White (#FFFFFF)
- Height: 56px
- Active Color: Primary Purple (#5D5FEF)
- Inactive Color: Text Secondary (#64748B)
- Icon Size: 24px
- Label: Caption, Medium

#### Header
- Background: White (#FFFFFF)
- Height: 56px
- Title: Heading 3
- Shadow: 0px 2px 10px rgba(0, 0, 0, 0.05)

### Progress Indicators

#### Progress Bar
- Height: 8px
- Border Radius: 4px
- Background: Light Gray (#E2E8F0)
- Fill Color: Primary Purple (#5D5FEF)

#### Circular Progress
- Stroke Width: 4px
- Background: Light Gray (#E2E8F0)
- Fill Color: Primary Purple (#5D5FEF)

#### Streak Counter
- Icon: Flame
- Icon Color: Streak Flame (#EF4444)
- Text: Body Medium, Bold
- Background: White (#FFFFFF)
- Border Radius: 16px
- Padding: 4px 8px

### Iconography

#### Icon Sizes
- **Small**: 16px
- **Medium**: 24px
- **Large**: 32px

#### Icon Types
- Navigation Icons
- Action Icons
- Status Icons
- Achievement Icons
- Feature Icons

### Animations and Transitions

#### Transition Speeds
- **Fast**: 150ms
- **Medium**: 300ms
- **Slow**: 500ms

#### Animation Types
- Page Transitions
- Button Feedback
- Progress Updates
- Achievement Celebrations
- Pronunciation Feedback

## Accessibility Guidelines

### Color Contrast
- Text on background must maintain a minimum contrast ratio of 4.5:1
- Interactive elements must maintain a minimum contrast ratio of 3:1

### Touch Targets
- Minimum touch target size: 44px x 44px
- Minimum spacing between touch targets: 8px

### Text Scaling
- All text must support dynamic type scaling
- Layout must accommodate larger text sizes

### Right-to-Left Support
- All layouts must support RTL languages
- Navigation patterns must adapt to RTL reading direction

## Responsive Behavior

### Device Support
- iPhone SE (smallest supported iOS device)
- Standard smartphones (iPhone, Android)
- Larger smartphones (iPhone Plus, Android)
- Tablets (iPad, Android tablets)

### Adaptive Layouts
- Single column layout for phones
- Two column layout for tablets in landscape
- Flexible card grids that adapt to available space

### Orientation Support
- Portrait orientation optimized
- Landscape orientation supported with adapted layouts

## Dark Mode Support

### Dark Mode Colors
- **Background**: #0F172A
- **Card Background**: #1E293B
- **Border**: #334155
- **Text Primary**: #F8FAFC
- **Text Secondary**: #94A3B8

### Dark Mode Adjustments
- Reduced shadow intensity
- Adjusted color saturation
- Maintained accessibility contrast ratios
