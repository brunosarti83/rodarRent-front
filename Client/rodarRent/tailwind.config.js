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
      'purple': '#7e5bef',
      'pink': '#ff49db',
      'orange': '#ff7849',
      'green': '#13ce66',
      'yellow': '#ffc82c',
      'gray-dark': '#273444',
      'gray': '#8492a6',
      'gray-light': '#d3dce6',
      'white': '#fff',
    },
  },
  plugins: [],
}
