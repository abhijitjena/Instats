/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{html,js,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        martian: ['Martian Mono', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        vinasans: ['Vina Sans', 'sans-serif'],
        pikachu: ['Unbounded', 'sans-serif'],
      },
    },
  },
  plugins: [require('tailwindcss-bg-patterns')],
};
