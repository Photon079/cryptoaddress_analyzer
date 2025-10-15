/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1a1b26',
          light: '#24283b',
          dark: '#16161e',
        },
        accent: {
          DEFAULT: '#7aa2f7',
          light: '#b4f9f8',
          dark: '#2ac3de',
        },
        text: {
          primary: '#a9b1d6',
          secondary: '#9aa5ce',
          muted: '#565f89',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}
