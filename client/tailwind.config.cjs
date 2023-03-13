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
      lg: 24,
      xl: 32,
      '2xl': 48,
    },

    colors: {

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
      custom: '2px 2px 4px 4px #A5B0D080'
    },

    extend: {
      fontFamily: {
        sans: 'Inter, sans-serif'
      }
    },
  },
  plugins: [],
}
