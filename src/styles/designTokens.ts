/**
 * StreamFlix Design Tokens
 * Pixel-perfect design system for premium streaming experience
 */

export const designTokens = {
  // ============================================
  // COLOR PALETTE - EXACT VALUES
  // ============================================
  colors: {
    // Primary Brand
    primary: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
      950: '#450a0a',
    },
    // Netflix Red (Brand Color)
    brand: {
      red: '#E50914',
      redHover: '#F40612',
      redDark: '#B20710',
    },
    // Neutrals - Background
    background: {
      primary: '#141414',      // Main background (Netflix)
      secondary: '#181818',     // Card background
      tertiary: '#1f1f1f',      // Hover state
      elevated: '#2a2a2a',      // Modal/Dropdown
      overlay: 'rgba(0, 0, 0, 0.7)',
    },
    // Neutrals - Text
    text: {
      primary: '#ffffff',
      secondary: '#e5e5e5',
      tertiary: '#b3b3b3',
      muted: '#737373',
      disabled: '#404040',
    },
    // Neutrals - Border
    border: {
      light: '#404040',
      medium: '#333333',
      dark: '#2a2a2a',
    },
    // Semantic Colors
    semantic: {
      success: '#46d369',       // Match score (Netflix green)
      warning: '#e5a50a',
      error: '#e50914',
      info: '#0071eb',
    },
    // Quality Badges
    quality: {
      '4K': '#00dc82',
      'FHD': '#0071eb',
      'HD': '#737373',
    },
    // Maturity Ratings
    ratings: {
      'PG': '#00dc82',
      'PG-13': '#e5a50a',
      'R': '#e50914',
      'TV-MA': '#e50914',
    },
  },

  // ============================================
  // TYPOGRAPHY - EXACT SPECIFICATIONS
  // ============================================
  typography: {
    // Font Families
    fontFamily: {
      sans: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      display: '"Poppins", "Inter", sans-serif',
      mono: '"JetBrains Mono", monospace',
    },
    // Font Sizes (px)
    fontSize: {
      xs: 11,      // Captions
      sm: 13,      // Secondary text
      base: 15,    // Body text
      lg: 17,      // Lead text
      xl: 20,      // H3
      '2xl': 24,   // H2
      '3xl': 28,   // H1 mobile
      '4xl': 40,   // H1 tablet
      '5xl': 56,   // H1 desktop
      '6xl': 72,   // Hero titles
    },
    // Font Weights
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
    // Line Heights
    lineHeight: {
      none: 1,
      tight: 1.25,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.625,
      loose: 2,
    },
    // Letter Spacing
    letterSpacing: {
      tighter: '-0.02em',
      tight: '-0.01em',
      normal: '0',
      wide: '0.01em',
      wider: '0.02em',
    },
  },

  // ============================================
  // SPACING SYSTEM - 4PX BASE GRID
  // ============================================
  spacing: {
    px: '1px',
    0: '0',
    0.5: '2px',
    1: '4px',
    1.5: '6px',
    2: '8px',
    2.5: '10px',
    3: '12px',
    3.5: '14px',
    4: '16px',
    5: '20px',
    6: '24px',
    7: '28px',
    8: '32px',
    9: '36px',
    10: '40px',
    11: '44px',
    12: '48px',
    14: '56px',
    16: '64px',
    20: '80px',
    24: '96px',
    28: '112px',
    32: '128px',
  },

  // ============================================
  // SIZING - COMPONENT SPECIFIC
  // ============================================
  sizing: {
    // Header
    header: {
      mobile: 56,
      tablet: 64,
      desktop: 72,
    },
    // Cards
    card: {
      poster: {
        mobile: 120,
        tablet: 180,
        desktop: 240,
      },
      landscape: {
        mobile: 200,
        tablet: 300,
        desktop: 400,
      },
    },
    // Buttons
    button: {
      sm: {
        height: 32,
        paddingX: 16,
      },
      md: {
        height: 40,
        paddingX: 24,
      },
      lg: {
        height: 48,
        paddingX: 32,
      },
      xl: {
        height: 56,
        paddingX: 40,
      },
    },
    // Icons
    icon: {
      xs: 12,
      sm: 16,
      md: 20,
      lg: 24,
      xl: 32,
      '2xl': 40,
    },
  },

  // ============================================
  // BORDER RADIUS - EXACT PIXEL VALUES
  // ============================================
  borderRadius: {
    none: '0',
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    '2xl': '20px',
    '3xl': '24px',
    full: '9999px',
  },

  // ============================================
  // SHADOWS - LAYERED ELEVATION SYSTEM
  // ============================================
  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    // Netflix-style card shadows
    card: {
      rest: '0 2px 8px rgba(0, 0, 0, 0.5)',
      hover: '0 8px 24px rgba(0, 0, 0, 0.7)',
    },
    // Button shadows
    button: {
      rest: '0 1px 2px rgba(0, 0, 0, 0.3)',
      hover: '0 4px 12px rgba(229, 9, 20, 0.4)',
    },
  },

  // ============================================
  // ANIMATION - CINEMATIC TIMING
  // ============================================
  animation: {
    // Duration (ms)
    duration: {
      instant: 100,
      fast: 150,
      normal: 200,
      slow: 300,
      slower: 400,
      cinematic: 500,
    },
    // Easing Functions
    easing: {
      linear: 'linear',
      ease: 'ease',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      // Netflix-style spring
      spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      // Smooth cinematic
      cinematic: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    },
    // Delays
    delay: {
      none: '0ms',
      xs: '50ms',
      sm: '100ms',
      md: '200ms',
      lg: '300ms',
      xl: '500ms',
    },
  },

  // ============================================
  // Z-INDEX LAYERS - STACKING CONTEXT
  // ============================================
  zIndex: {
    base: 0,
    dropdown: 100,
    sticky: 200,
    overlay: 300,
    modal: 400,
    popover: 500,
    tooltip: 600,
    toast: 700,
  },

  // ============================================
  // BREAKPOINTS - RESPONSIVE DESIGN
  // ============================================
  breakpoints: {
    mobile: '320px',
    mobileLg: '480px',
    tablet: '768px',
    tabletLg: '1024px',
    desktop: '1280px',
    desktopLg: '1536px',
    desktopXl: '1920px',
  },

  // ============================================
  // GRADIENTS - SIGNATURE STYLES
  // ============================================
  gradients: {
    // Hero overlay (bottom to top fade)
    hero: 'linear-gradient(to top, #141414 0%, transparent 100%)',
    // Card hover overlay
    cardHover: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
    // Text fade for truncated text
    textFade: 'linear-gradient(to right, #ffffff 0%, transparent 100%)',
    // Brand gradient
    brand: 'linear-gradient(135deg, #E50914 0%, #ff4757 100%)',
    // Vignette effect
    vignette: 'radial-gradient(circle, transparent 50%, #141414 100%)',
  },

  // ============================================
  // BACKDROP FILTERS - GLASSMORPHISM
  // ============================================
  backdrop: {
    blur: {
      sm: 'blur(4px)',
      md: 'blur(8px)',
      lg: 'blur(12px)',
      xl: 'blur(16px)',
    },
  },

  // ============================================
  // TRANSITION PROPERTIES
  // ============================================
  transition: {
    all: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
    transform: 'transform 200ms cubic-bezier(0.4, 0, 0.2, 1)',
    opacity: 'opacity 200ms cubic-bezier(0.4, 0, 0.2, 1)',
    colors: 'color, background-color 200ms cubic-bezier(0.4, 0, 0.2, 1)',
    shadow: 'box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1)',
    // Netflix card scale
    cardScale: 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

// Export as CSS custom properties for Tailwind
export const cssVariables = `
:root {
  /* Colors */
  --color-brand-red: ${designTokens.colors.brand.red};
  --color-brand-red-hover: ${designTokens.colors.brand.redHover};
  --color-brand-red-dark: ${designTokens.colors.brand.redDark};
  
  /* Background */
  --bg-primary: ${designTokens.colors.background.primary};
  --bg-secondary: ${designTokens.colors.background.secondary};
  --bg-tertiary: ${designTokens.colors.background.tertiary};
  --bg-elevated: ${designTokens.colors.background.elevated};
  
  /* Text */
  --text-primary: ${designTokens.colors.text.primary};
  --text-secondary: ${designTokens.colors.text.secondary};
  --text-tertiary: ${designTokens.colors.text.tertiary};
  --text-muted: ${designTokens.colors.text.muted};
  
  /* Typography */
  --font-sans: ${designTokens.typography.fontFamily.sans};
  --font-display: ${designTokens.typography.fontFamily.display};
  
  /* Spacing */
  --header-height-mobile: ${designTokens.sizing.header.mobile}px;
  --header-height-tablet: ${designTokens.sizing.header.tablet}px;
  --header-height-desktop: ${designTokens.sizing.header.desktop}px;
  
  /* Border Radius */
  --radius-sm: ${designTokens.borderRadius.sm};
  --radius-md: ${designTokens.borderRadius.md};
  --radius-lg: ${designTokens.borderRadius.lg};
  
  /* Shadows */
  --shadow-card-rest: ${designTokens.shadows.card.rest};
  --shadow-card-hover: ${designTokens.shadows.card.hover};
  
  /* Animation */
  --duration-fast: ${designTokens.animation.duration.fast}ms;
  --duration-normal: ${designTokens.animation.duration.normal}ms;
  --duration-slow: ${designTokens.animation.duration.slow}ms;
  --easing-cinematic: ${designTokens.animation.easing.cinematic};
}
`;

export default designTokens;
