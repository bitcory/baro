/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,css}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Noto Sans KR', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Duotone Friendly palette
        'duo': {
          // Primary - Indigo/Violet
          'primary': '#6366f1',
          'primary-light': '#818cf8',
          'primary-dark': '#4f46e5',
          // Background shades
          'bg': '#fafafa',
          'surface': '#ffffff',
          'muted': '#f4f4f5',
          // Text
          'text': '#18181b',
          'text-muted': '#71717a',
          'text-light': '#a1a1aa',
          // Accent
          'accent': '#8b5cf6',
          'accent-light': '#a78bfa',
        },
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'soft': '0 2px 8px -2px rgba(0, 0, 0, 0.08)',
        'soft-md': '0 4px 12px -4px rgba(0, 0, 0, 0.1)',
        'soft-lg': '0 8px 24px -8px rgba(0, 0, 0, 0.12)',
        'soft-xl': '0 12px 32px -12px rgba(0, 0, 0, 0.15)',
        'glow': '0 0 20px rgba(99, 102, 241, 0.3)',
        'glow-lg': '0 0 40px rgba(99, 102, 241, 0.4)',
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out',
        'slide-up': 'slide-up 0.4s ease-out',
        'scale-in': 'scale-in 0.2s ease-out',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
    },
  },
  plugins: [],
}
