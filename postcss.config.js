const tailwindcss = require('tailwindcss')
const autoprefixer = require('autoprefixer')
const clean = require('postcss-clean')

module.exports = {
  plugins: [
    tailwindcss,
    autoprefixer,
    ...(process.env.NODE_ENV === 'production'
      ? [clean]
      : [])
  ]
}
