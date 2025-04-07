/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        blue: {
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#121d42'
        },
      },
    },
  },
  plugins: [],
};