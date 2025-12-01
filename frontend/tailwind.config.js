/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', 
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'accent': {
          DEFAULT: '#007AFF',
          light: '#3399FF',   
          dark: '#0055CC',    
        },

        // UI Colors - Light mode values (dark mode applied via CSS variables)
        'ui-primary': 'var(--color-ui-primary)',
        'ui-secondary': 'var(--color-ui-secondary)',

        // Text Colors
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
      },
    },
  },
  plugins: [],
}