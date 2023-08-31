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
      animation:{
        
      },
      height:{
        landing:'690px'
      }
    },
    fontFamily:{
      poppins:["poppins","sans-serif"]
    },
    colors:{
      'blue':'#163C85',
    }
  },
  plugins: [],
}