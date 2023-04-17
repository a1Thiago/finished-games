const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    fontSize: {
      xs: 14,
      sm: 16,
      md: 18,
      lg: 20,
      xl: 24,
      '2xl': 40,
    },

    screens: {
      'tablet': { 'max': '767px' },
      'mobile': { 'max': '414px' },
      'xsmobile': { 'max': '320px' },
      ...defaultTheme.screens,
    },

    colors: {
      transparent: 'transparent',
      'white': '#fff',

      black: {
        60: '#00000099',
        100: '#000'
      },

      blue: {
        100: '#A5B0D04D',
        200: '#A5B0D080',
        300: '#4B61A1E5',
        400: '#4B61A1',
        450: '#1E3A8AE5',
        500: '#1E3A8A',
        700: '#0F1D45',
      },

      redAlert: {
        60: '#ED4F32E5',
        100: '#ED4F32'
      }
    },

    boxShadow: {
      custom: '1px 1px 5px 1px #A5B0D080'
    },

    extend: {
      fontFamily: {
        sans: 'Inter, sans-serif'
      }
    },
  },
  plugins: [],
}
