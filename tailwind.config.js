/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Brand palette — Deep Teal leads, no pure black anywhere.
        teal: {
          DEFAULT: '#174E50',
          50: '#EDF3F3',
          100: '#D5E4E4',
          200: '#AAC9C9',
          300: '#7FA9AA',
          400: '#4F8284',
          500: '#174E50',
          600: '#124041',
          700: '#0E3233',
          800: '#0A2526',
          900: '#061818',
        },
        ivory: '#F7F3EB',
        copper: {
          DEFAULT: '#C58B52',
          100: '#F6EADB',
          200: '#EACFAF',
          300: '#DBB083',
          400: '#CD9C67',
          500: '#C58B52',
          600: '#A97443',
          700: '#8A5D36',
        },
        forest: {
          DEFAULT: '#315B49',
          100: '#E4EDE8',
          200: '#C6D9CE',
          300: '#9EBFAE',
          400: '#6E9A82',
          500: '#315B49',
          600: '#274A3B',
        },
        sale: '#B83232',
        softgray: '#6B6B6B',
        line: '#E5E2DB',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(23, 78, 80, 0.04), 0 8px 24px rgba(23, 78, 80, 0.06)',
        'card-hover': '0 4px 12px rgba(23, 78, 80, 0.08), 0 18px 42px rgba(23, 78, 80, 0.12)',
        modal: '0 24px 70px rgba(23, 78, 80, 0.25)',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        toastIn: {
          '0%': { opacity: '0', transform: 'translateX(24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
        fadeIn: 'fadeIn 0.4s ease-out both',
        toastIn: 'toastIn 0.3s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],
}
