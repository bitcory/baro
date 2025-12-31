/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,css}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'Noto Sans KR', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        // Duotone palette (for IntroPage)
        'duo': {
          'primary': '#6366f1',
          'primary-light': '#818cf8',
          'primary-dark': '#4f46e5',
          'bg': '#fafafa',
          'surface': '#ffffff',
          'muted': '#f4f4f5',
          'text': '#18181b',
          'text-muted': '#71717a',
          'text-light': '#a1a1aa',
          'accent': '#8b5cf6',
          'accent-light': '#a78bfa',
        },
        // Memphis UI palette
        'memphis': {
          // Primary colors
          'pink': '#FF6B9D',
          'yellow': '#FFE156',
          'teal': '#00D4AA',
          'blue': '#4ECDC4',
          'orange': '#FF8C42',
          'purple': '#9B5DE5',
          // Background
          'bg': '#FFF8F0',
          'cream': '#FFFBEB',
          'surface': '#FFFFFF',
          // Text
          'black': '#1A1A2E',
          'gray': '#6B7280',
          'gray-light': '#9CA3AF',
          // Accent
          'red': '#FF6B6B',
          'mint': '#88D8B0',
        },
      },
      borderRadius: {
        'memphis': '0px',
        'blob': '60% 40% 30% 70% / 60% 30% 70% 40%',
      },
      boxShadow: {
        // Duotone soft shadows (for IntroPage)
        'soft-lg': '0 8px 24px -8px rgba(0, 0, 0, 0.12)',
        'glow': '0 0 20px rgba(99, 102, 241, 0.3)',
        // Memphis shadows
        'memphis': '4px 4px 0px #1A1A2E',
        'memphis-sm': '2px 2px 0px #1A1A2E',
        'memphis-lg': '6px 6px 0px #1A1A2E',
        'memphis-xl': '8px 8px 0px #1A1A2E',
        'memphis-pink': '4px 4px 0px #FF6B9D',
        'memphis-yellow': '4px 4px 0px #FFE156',
        'memphis-teal': '4px 4px 0px #00D4AA',
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out',
        'slide-up': 'slide-up 0.4s ease-out',
        'scale-in': 'scale-in 0.2s ease-out',
        'wiggle': 'wiggle 0.5s ease-in-out infinite',
        'bounce-slow': 'bounce 2s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
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
        'wiggle': {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
