module.exports = {
  purge: [],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'bmazon-primary': 'rgb(34 43 51)',
        'bmazon-secondary': 'rgb(244 235 228)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
