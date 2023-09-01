/** @type {import('tailwindcss').Config} */
export default {
  darkMode:'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize:{
        landing:'5rem'
      },
      height:{
        landing:'690px',
        noNav:'93.1vh',
        form:'738px'
      },
      width:{
        '100':'29rem'
      },
      colors:{
        'blue':'#163C85',
      }
    },
    fontFamily:{
      poppins:["poppins","sans-serif"]
    },

  },
  plugins: [],
}