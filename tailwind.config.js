/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx", "./src/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        'neural-purple': {
          50: '#f4f3ff',
          100: '#ebe8ff',
          500: '#6366f1',
          600: '#5b21b6',
          700: '#4c1d95',
          800: '#3730a3',
          900: '#312e81',
        },
        'plasma-coral': {
          50: '#fef2f2',
          100: '#fee2e2',
          500: '#ff4b6b', 
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        'void-black': {
          50: '#f8fafc',
          100: '#f1f5f9',
          500: '#64748b',
          700: '#334155',
          900: '#0f0f23',
        },
        'cyber-lime': {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#84cc16',
          600: '#65a30d',
          700: '#4d7c0f',
          800: '#365314',
          900: '#1a2e05',
        },
        'ice-blue': {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
        },
        'neural-gold': {
          50: '#fffbeb',
          100: '#fef3c7',
          500: '#fbbf24',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
      },
      fontFamily: {
        'satoshi': ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-hero': ['40px', { lineHeight: '48px', letterSpacing: '-0.02em' }],
        'display-major': ['32px', { lineHeight: '40px', letterSpacing: '-0.01em' }],
        'display-standard': ['28px', { lineHeight: '36px' }],
        'title-premium': ['24px', { lineHeight: '32px' }],
        'title-standard': ['20px', { lineHeight: '28px' }],
        'body-enhanced': ['18px', { lineHeight: '27px' }],
        'body-primary': ['16px', { lineHeight: '24px' }],
        'body-secondary': ['14px', { lineHeight: '21px' }],
        'caption-smart': ['12px', { lineHeight: '18px', letterSpacing: '0.01em' }],
        'price-hero': ['24px', { lineHeight: '32px', letterSpacing: '-0.01em' }],
        'price-standard': ['18px', { lineHeight: '26px' }],
        'button-text': ['16px', { lineHeight: '24px', letterSpacing: '0.005em' }],
      },
      spacing: {
        'hairline': '2px',
        'tight': '4px',
        'cozy': '8px',
        'comfortable': '12px',
        'spacious': '16px',
        'generous': '24px',
        'expansive': '32px',
        'dramatic': '48px',
        'monumental': '64px',
      },
      borderRadius: {
        'flux': '16px',
        'neural': '12px',
        'pill': '24px',
      },
      boxShadow: {
        'neural': '0px 4px 20px rgba(99, 102, 241, 0.08)',
        'neural-hover': '0px 8px 32px rgba(99, 102, 241, 0.15)',
        'plasma': '0px 4px 16px rgba(255, 75, 107, 0.24)',
      },
      backgroundImage: {
        'neural-flow': 'linear-gradient(135deg, #6366f1, #8b5cf6)',
        'plasma-flow': 'linear-gradient(135deg, #ff4b6b, #ff6b9d)',
        'cyber-flow': 'linear-gradient(135deg, #84cc16, #65a30d)',
        'card-gradient': 'linear-gradient(180deg, #ffffff, #f8fafc)',
      },
      animation: {
        'shimmer': 'shimmer 1.8s ease-in-out infinite',
        'pulse-soft': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-4px)' },
        },
      },
    },
  },
  plugins: [],
}

