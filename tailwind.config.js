/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Colors - Exact Netflix/Prime Video palette
      colors: {
        // Brand
        brand: {
          red: '#E50914',
          'red-hover': '#F40612',
          'red-dark': '#B20710',
        },
        // Background (Netflix exact)
        background: {
          primary: '#141414',
          secondary: '#181818',
          tertiary: '#1f1f1f',
          elevated: '#2a2a2a',
        },
        // Text (Netflix exact)
        text: {
          primary: '#ffffff',
          secondary: '#e5e5e5',
          tertiary: '#b3b3b3',
          muted: '#737373',
          disabled: '#404040',
        },
        // Semantic
        success: '#46d369',
        warning: '#e5a50a',
        error: '#e50914',
        info: '#0071eb',
        // Quality badges
        '4k': '#00dc82',
        fhd: '#0071eb',
        hd: '#737373',
      },
      // Typography
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'xs': ['11px', { lineHeight: '16px' }],
        'sm': ['13px', { lineHeight: '20px' }],
        'base': ['15px', { lineHeight: '24px' }],
        'lg': ['17px', { lineHeight: '28px' }],
        'xl': ['20px', { lineHeight: '28px' }],
        '2xl': ['24px', { lineHeight: '32px' }],
        '3xl': ['28px', { lineHeight: '36px' }],
        '4xl': ['40px', { lineHeight: '48px' }],
        '5xl': ['56px', { lineHeight: '64px' }],
        '6xl': ['72px', { lineHeight: '80px' }],
      },
      fontWeight: {
        light: '300',
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
      },
      letterSpacing: {
        tighter: '-0.02em',
        tight: '-0.01em',
        normal: '0',
        wide: '0.01em',
        wider: '0.02em',
      },
      // Spacing (4px base grid)
      spacing: {
        'px': '1px',
        '0.5': '2px',
        '1': '4px',
        '1.5': '6px',
        '2': '8px',
        '2.5': '10px',
        '3': '12px',
        '3.5': '14px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
        '7': '28px',
        '8': '32px',
        '9': '36px',
        '10': '40px',
        '11': '44px',
        '12': '48px',
        '14': '56px',
        '16': '64px',
        '20': '80px',
        '24': '96px',
        '28': '112px',
        '32': '128px',
      },
      // Sizing
      width: {
        'header-mobile': '56px',
        'header-tablet': '64px',
        'header-desktop': '72px',
      },
      height: {
        'header-mobile': '56px',
        'header-tablet': '64px',
        'header-desktop': '72px',
      },
      // Border Radius
      borderRadius: {
        'none': '0',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '20px',
        '3xl': '24px',
        'full': '9999px',
      },
      // Shadows (Netflix-style)
      boxShadow: {
        'none': 'none',
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        // Netflix card shadows
        'card-rest': '0 2px 8px rgba(0, 0, 0, 0.5)',
        'card-hover': '0 8px 24px rgba(0, 0, 0, 0.7)',
        // Button shadows
        'button-rest': '0 1px 2px rgba(0, 0, 0, 0.3)',
        'button-hover': '0 4px 12px rgba(229, 9, 20, 0.4)',
        // Overlay
        'overlay': '0 0 0 100vmax rgba(0, 0, 0, 0.7)',
      },
      // Animation
      animation: {
        'fade-in': 'fadeIn 200ms cubic-bezier(0.4, 0, 0.2, 1)',
        'fade-out': 'fadeOut 200ms cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-up': 'slideUp 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-down': 'slideDown 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        'scale-in': 'scaleIn 150ms cubic-bezier(0.4, 0, 0.2, 1)',
        'scale-out': 'scaleOut 150ms cubic-bezier(0.4, 0, 0.2, 1)',
        'card-scale': 'cardScale 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        scaleOut: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0.95)', opacity: '0' },
        },
        cardScale: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.05)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
      transitionDuration: {
        'instant': '100ms',
        'fast': '150ms',
        'normal': '200ms',
        'slow': '300ms',
        'slower': '400ms',
        'cinematic': '500ms',
      },
      transitionTimingFunction: {
        'linear': 'linear',
        'ease': 'ease',
        'ease-in': 'cubic-bezier(0.4, 0, 1, 1)',
        'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
        'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'spring': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'cinematic': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      // Aspect Ratios
      aspectRatio: {
        'poster': '2 / 3',
        'backdrop': '16 / 9',
        'square': '1 / 1',
      },
      // Breakpoints
      screens: {
        'mobile': '320px',
        'mobile-lg': '480px',
        'tablet': '768px',
        'tablet-lg': '1024px',
        'desktop': '1280px',
        'desktop-lg': '1536px',
        'desktop-xl': '1920px',
      },
      // Gradients
      backgroundImage: {
        'gradient-hero': 'linear-gradient(to top, #141414 0%, transparent 100%)',
        'gradient-card': 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
        'gradient-text': 'linear-gradient(to right, #ffffff 0%, transparent 100%)',
        'gradient-brand': 'linear-gradient(135deg, #E50914 0%, #ff4757 100%)',
        'gradient-vignette': 'radial-gradient(circle, transparent 50%, #141414 100%)',
      },
      // Backdrop Blur
      backdropBlur: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
      },
      // Z-Index
      zIndex: {
        'base': '0',
        'dropdown': '100',
        'sticky': '200',
        'overlay': '300',
        'modal': '400',
        'popover': '500',
        'tooltip': '600',
        'toast': '700',
        'max': '9999',
      },
    },
  },
  plugins: [],
}
