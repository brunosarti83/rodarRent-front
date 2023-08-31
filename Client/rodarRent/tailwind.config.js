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
      height:{
        landing:'690px',
        noNav:'91.5vh'
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