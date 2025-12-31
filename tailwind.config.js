/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,css}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Noto Sans KR', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Neo-Brutalism Dark color palette
        'neo': {
          'bg': '#0f0f1a',
          'card': '#1a1a2e',
          'surface': '#252545',
          'yellow': '#FFE156',
          'green': '#7CFF6B',
          'blue': '#6BB5FF',
          'pink': '#FF6BB5',
          'purple': '#B56BFF',
          'orange': '#FF9F6B',
          'red': '#FF6B6B',
          'cyan': '#6BFFF0',
        },
      },
      borderWidth: {
        '3': '3px',
        '4': '4px',
      },
      boxShadow: {
        'neo': '4px 4px 0px 0px rgba(0,0,0,1)',
        'neo-sm': '2px 2px 0px 0px rgba(0,0,0,1)',
        'neo-lg': '6px 6px 0px 0px rgba(0,0,0,1)',
        'neo-hover': '6px 6px 0px 0px rgba(0,0,0,1)',
      },
      animation: {
        'bounce-neo': 'bounce-neo 0.3s ease-in-out',
        'slide-up': 'slide-up 0.3s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
        'scale-in': 'scale-in 0.2s ease-out',
      },
      keyframes: {
        'bounce-neo': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(-2px, -2px)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
