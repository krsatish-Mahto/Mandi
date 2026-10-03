/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#006400',      // Forest Green
        dark: '#0D0D0D',         // Almost Black
        white: '#FFFFFF',        // White
        success: '#28A745',      // Success Green
        warning: '#FFC107',      // Warning Orange
        error: '#DC3545',        // Error Red
        info: '#17A2B8',         // Info Blue
        'light-gray': '#F8F9FA', // Light Gray
        'medium-gray': '#6C757D', // Medium Gray
        'dark-gray': '#343A40',  // Dark Gray
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '48px',
        '3xl': '64px',
      },
      borderRadius: {
        'sm': '4px',
        'md': '6px',
        'lg': '8px',
      },
      boxShadow: {
        'sm': '0 2px 8px rgba(0, 0, 0, 0.1)',
        'md': '0 4px 12px rgba(0, 0, 0, 0.15)',
        'lg': '0 10px 30px rgba(0, 0, 0, 0.3)',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
