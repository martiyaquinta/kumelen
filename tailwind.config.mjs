/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,ts}'],
  theme: {
    extend: {
      colors: {
        azul:          '#0D3D9F',
        naranja:       '#FF6A00',
        'azul-claro':  '#E6F0FF',
        'gris-suave':  '#F2F4F7',
        'gris-oscuro': '#2B2F36',
      },
      fontFamily: {
        display: ['"Barlow Condensed"', 'sans-serif'],
        body:    ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
