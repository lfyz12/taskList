/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Text"', '"SF Pro Display"', '"Helvetica Neue"', 'Arial', 'sans-serif'],
      },
      colors: {
        apple: {
          blue: '#007AFF',
          gray: { 50: '#F5F5F7', 100: '#E8E8ED', 200: '#D2D2D7', 300: '#AEAEB2', 400: '#8E8E93', 500: '#636366', 600: '#48484A', 700: '#363639', 800: '#2C2C2E', 900: '#1C1C1E' },
          red: '#FF3B30',
          green: '#34C759',
          orange: '#FF9500',
        }
      },
      boxShadow: {
        'apple-sm': '0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.03)',
        'apple-md': '0 4px 12px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.03)',
        'apple-lg': '0 8px 30px rgba(0, 0, 0, 0.06), 0 2px 8px rgba(0, 0, 0, 0.03)',
        'apple-inner': 'inset 0 1px 2px rgba(0, 0, 0, 0.03)',
      },
      borderRadius: {
        'apple': '10px',
        'apple-lg': '14px',
        'apple-xl': '20px',
      },
    },
  },
  plugins: [],
}
