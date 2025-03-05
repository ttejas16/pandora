/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'background':'#000000',
        // 'bg':'#1A1A1D',
        'primary':'#C147E9'
      },
      animation:{
        'move-y':'move-vertical 1s ease-in-out infinite alternate',
        fadeOut: "fadeOut 0.15s ease-in-out forwards"
      },
      keyframes:{
        'move-vertical':{
          '0%':{ transform:'translateY(-10%)'},
          '100%':{ transform:'translateY(10%)'}
        },
        fadeOut: {
          "0%": { opacity: "0.5",transform:'translateX(0%)' },
          "100%": { opacity: "0",transform:'translateX(10%)' }
        }
      }
    },
  },
  plugins: [],
}

