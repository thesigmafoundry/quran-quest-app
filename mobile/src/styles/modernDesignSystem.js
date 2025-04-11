/* Modern Design System for Quranic Quest App
 * Inspired by Apple and Uber design language
 */

// Colors
const colors = {
  // Primary palette
  primary: {
    main: '#5D5FEF',
    light: '#7B7DF7',
    dark: '#4A4CD6',
    gradient: 'linear-gradient(135deg, #5D5FEF 0%, #7B7DF7 100%)',
  },
  
  // Secondary palette
  secondary: {
    main: '#00C2FF',
    light: '#33CFFF',
    dark: '#00A3D9',
  },
  
  // Neutral palette (inspired by Apple's clean aesthetic)
  neutral: {
    white: '#FFFFFF',
    background: '#F5F7FA',
    card: '#FFFFFF',
    border: '#E5E9F0',
    divider: '#F0F2F5',
  },
  
  // Text colors
  text: {
    primary: '#1A1F36',
    secondary: '#4F566B',
    tertiary: '#8792A2',
    inverse: '#FFFFFF',
  },
  
  // Feedback colors
  feedback: {
    success: '#36B37E',
    warning: '#FFAB00',
    error: '#FF5630',
    info: '#00B8D9',
  },
  
  // Special UI elements
  ui: {
    highlight: 'rgba(93, 95, 239, 0.08)',
    overlay: 'rgba(26, 31, 54, 0.4)',
    shimmer: 'linear-gradient(90deg, #F0F2F5 0%, #FFFFFF 50%, #F0F2F5 100%)',
  }
};

// Typography
const typography = {
  fontFamily: {
    base: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    arabic: '"Amiri", "Traditional Arabic", serif',
  },
  
  // Font sizes follow an 8px scale for harmony
  fontSize: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
    xxl: '24px',
    xxxl: '32px',
    display: '40px',
  },
  
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.8,
  }
};

// Spacing (8px grid system)
const spacing = {
  xxs: '4px',
  xs: '8px',
  sm: '12px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  xxl: '48px',
  xxxl: '64px',
};

// Shadows (subtle, inspired by Apple's design)
const shadows = {
  sm: '0px 1px 2px rgba(0, 0, 0, 0.05)',
  md: '0px 2px 4px rgba(0, 0, 0, 0.05), 0px 4px 6px rgba(0, 0, 0, 0.03)',
  lg: '0px 10px 15px rgba(0, 0, 0, 0.04), 0px 4px 6px rgba(0, 0, 0, 0.02)',
  xl: '0px 20px 25px rgba(0, 0, 0, 0.05), 0px 10px 10px rgba(0, 0, 0, 0.02)',
};

// Border radius
const borderRadius = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  circle: '50%',
};

// Animation
const animation = {
  duration: {
    fast: '150ms',
    normal: '250ms',
    slow: '350ms',
  },
  easing: {
    easeOut: 'cubic-bezier(0.16, 1, 0.3, 1)',
    easeInOut: 'cubic-bezier(0.65, 0, 0.35, 1)',
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
};

// Z-index scale
const zIndex = {
  background: -1,
  default: 1,
  content: 10,
  overlay: 100,
  modal: 200,
  toast: 300,
  tooltip: 400,
};

// Export the design system
export const designSystem = {
  colors,
  typography,
  spacing,
  shadows,
  borderRadius,
  animation,
  zIndex,
};

// Common component styles
export const componentStyles = {
  // Card styles
  card: {
    container: {
      backgroundColor: colors.neutral.card,
      borderRadius: borderRadius.md,
      padding: spacing.lg,
      boxShadow: shadows.sm,
    },
    interactive: {
      backgroundColor: colors.neutral.card,
      borderRadius: borderRadius.md,
      padding: spacing.lg,
      boxShadow: shadows.sm,
      transition: `all ${animation.duration.normal} ${animation.easing.easeOut}`,
      ':hover': {
        boxShadow: shadows.md,
        transform: 'translateY(-2px)',
      },
    },
  },
  
  // Button styles
  button: {
    primary: {
      backgroundColor: colors.primary.main,
      color: colors.text.inverse,
      borderRadius: borderRadius.md,
      padding: `${spacing.sm} ${spacing.lg}`,
      fontWeight: typography.fontWeight.semibold,
      boxShadow: shadows.sm,
      border: 'none',
    },
    secondary: {
      backgroundColor: 'transparent',
      color: colors.primary.main,
      borderRadius: borderRadius.md,
      padding: `${spacing.sm} ${spacing.lg}`,
      fontWeight: typography.fontWeight.semibold,
      border: `1px solid ${colors.primary.main}`,
    },
    text: {
      backgroundColor: 'transparent',
      color: colors.primary.main,
      padding: `${spacing.sm} ${spacing.md}`,
      fontWeight: typography.fontWeight.medium,
      border: 'none',
    },
    icon: {
      width: '40px',
      height: '40px',
      borderRadius: borderRadius.circle,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.neutral.white,
      boxShadow: shadows.sm,
      border: 'none',
    },
  },
  
  // Input styles
  input: {
    container: {
      backgroundColor: colors.neutral.white,
      borderRadius: borderRadius.md,
      border: `1px solid ${colors.neutral.border}`,
      padding: `${spacing.sm} ${spacing.md}`,
      transition: `all ${animation.duration.fast} ${animation.easing.easeOut}`,
      ':focus-within': {
        borderColor: colors.primary.main,
        boxShadow: `0 0 0 2px ${colors.ui.highlight}`,
      },
    },
    text: {
      fontSize: typography.fontSize.md,
      color: colors.text.primary,
      lineHeight: typography.lineHeight.normal,
    },
    label: {
      fontSize: typography.fontSize.sm,
      color: colors.text.secondary,
      marginBottom: spacing.xs,
    },
  },
  
  // Navigation styles
  navigation: {
    tabBar: {
      container: {
        backgroundColor: colors.neutral.white,
        borderTopWidth: '1px',
        borderTopColor: colors.neutral.border,
        paddingVertical: spacing.xs,
        paddingHorizontal: spacing.md,
        boxShadow: '0px -1px 2px rgba(0, 0, 0, 0.03)',
      },
      item: {
        padding: spacing.xs,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      },
      icon: {
        marginBottom: spacing.xxs,
      },
      label: {
        fontSize: typography.fontSize.xs,
        color: colors.text.tertiary,
      },
      active: {
        color: colors.primary.main,
        fontWeight: typography.fontWeight.medium,
      },
    },
    header: {
      container: {
        backgroundColor: colors.neutral.white,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.lg,
        borderBottomWidth: '1px',
        borderBottomColor: colors.neutral.border,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      title: {
        fontSize: typography.fontSize.lg,
        fontWeight: typography.fontWeight.semibold,
        color: colors.text.primary,
      },
    },
  },
};

export default designSystem;
