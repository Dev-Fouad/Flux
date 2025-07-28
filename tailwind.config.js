const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx", "./src/**/*.{js,jsx,ts,tsx}", "./src/components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        'neural-purple': {
          50: '#f4f3ff',
          500: '#6366f1',
        },
        'plasma-coral': {
          100: '#fee2e2',
          500: '#ff4b6b', 
        },
        'void-black': {
          100: '#f1f5f9',
          200: '#e2e8f0',
          500: '#64748b',
          700: '#334155',
          900: '#0f0f23',
        },
        'cyber-lime': {
          500: '#84cc16',
        },
      },
      fontFamily: {
        'satoshi': ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-major': ['32px', { lineHeight: '40px', letterSpacing: '-0.01em' }],
        'title-premium': ['24px', { lineHeight: '32px' }],
        'title-standard': ['20px', { lineHeight: '28px' }],
        'body-primary': ['16px', { lineHeight: '24px' }],
        'body-secondary': ['14px', { lineHeight: '21px' }],
        'caption-smart': ['12px', { lineHeight: '18px', letterSpacing: '0.01em' }],
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
      },
      borderRadius: {
        'flux': '16px',
        'neural': '12px',
        'pill': '24px',
      },
    },
  },
  plugins: [],
}
