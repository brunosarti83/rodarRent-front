/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize:{
        landing:'5rem'
      },
    },
    fontFamily:{
      poppins:["poppins","sans-serif"]
    },

    height:{
      landing:'690px'
    }
  },
  plugins: [],
}