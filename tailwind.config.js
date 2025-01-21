/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'bg':'#000000',
        // 'bg':'#1A1A1D',
        'primary':'#C147E9'
      },
      animation:{
        'move-y':'move-vertical 1s ease-in-out infinite alternate'
      },
      keyframes:{
        'move-vertical':{
          '0%':{ transform:'translateY(-10%)'},
          '100%':{ transform:'translateY(10%)'}
        }
      }
    },
  },
  plugins: [],
}

