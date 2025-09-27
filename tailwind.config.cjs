// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Georgia', 'Times New Roman', 'serif'],
        sans: ['system-ui', 'sans-serif'],
      },
      colors: {
        'background': '#D1C1B2',
        'section-bg': '#C3B3A3',
        'card-bg': '#F0F0D8',
        'accent-gold': '#D1B35F',
        'button-search': '#E5C97F',
        'button-action': '#A88C6A',
      },
    },
  },
  plugins: [],
};