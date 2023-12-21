/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{jsx,js}"],
  theme: {
    extend: {
      keyframes: {
        fadeOut: {
          'from': { opacity: 1 },
          'to': { opacity: 0 }
        }
      },
      animation: {
        fadeOut: 'fadeOut 1s forwards'
      },
    },
  },
  plugins: [],
};
