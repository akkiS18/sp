/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E31837',
        secondary: '#000000',
        accent: '#FFFFFF',
        dark: '#0a0a0a',
        darker: '#050505',
        glitch1: '#FF0040',
        glitch2: '#00FFFF',
      },
      fontFamily: {
        bangers: ['Bangers', 'cursive'],
        mono: ['Space Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
