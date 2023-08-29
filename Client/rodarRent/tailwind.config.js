/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height:{
        landing:'700px'
      },
      lineHeight:{
        landing:'120px'
      },
      fontSize:{
        landing:'4.7rem'
      }
    },
    fontFamily:{
      poppins:["Poppins", "sans-serif"],
      home:['helvetica', 'sans serif']
    },
    colors:{
      'blue':'#163C85',
    }
  },
  plugins: [],
}
