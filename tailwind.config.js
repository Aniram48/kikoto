/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        cormorant: ['"Cormorant Garamond"', 'serif'],
        barlow: ['"Barlow Condensed"', 'sans-serif'],
      },

      colors: {
        navy: '#0a1628',
        deepnavy:  '#0d2137',
        water: '#1a3a5c',
        sail: '#f0ece3',
        accent: '#e8c840',
        sky: '#6bb8d4'
      },

      animation: {
        wave: 'waveMove 8s ease-in-out infinite',
        wave2: 'waveMove2 12s ease-in-out infinite',
      },
      screens: {
          '3xl': '1500px',
          'md2': '1000px',
      },

      keyframes: {
        waveMove: {
          '0%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(-25%)' },
          '100%': { transform: 'translateX(0)' },
        },
        waveMove2: {
          '0%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(-15%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}