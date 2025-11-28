module.exports = {
  content: ["./src/**/*.{html,js}", "index.html", "js/**/*.js"],
  theme: {
    extend: {
      colors: {
        'primary': '#B3ECFF',
        'secondary': '#F1EAFF',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
      backgroundColor: {
        'dark': '#121212',
        'gray-800': '#1F1F1F',
        'gray-700': '#2D2D2D',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.8s ease forwards',
      },
    },
  },
  plugins: [],
  safelist: [
    'dark-mode',
    'light-mode',
  ],
}