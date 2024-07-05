/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "purple": "#8263F2",
        "dark-white": "#F0F4F9",
        "max-dark-white": "#E5EAF1",
        "text-black": "#4E5A6B",
        "light-white": "rgba(255,255,255,0.18)",
        "navy-blue": "#2D6DA6",
        "white": "#FFFFFF",
        
      }
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.text-gradient1': {
          'background': 'linear-gradient(to top left, #006699 0%, #ff99cc 100%)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
        },
        '.text-gradient2': {
          'background': 'linear-gradient(to bottom left, #336699 0%, #ff6699 100%)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
        },
        '.text-gradient3': {
          'background': 'linear-gradient(to bottom left, #66ccff 0%, #ff6699 100%)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
        },
      });
    },
  ],
}

