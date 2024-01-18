/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './client/**/*.js',
    './client/**/*.jsx',
    './**/*.html'
  ],
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
