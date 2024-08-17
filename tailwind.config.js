/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "playfair": ['Playfair Display', 'serif'],
        "lato": ['Lato', 'sans-serif']
      }
    },
  },
  plugins: [],
}

