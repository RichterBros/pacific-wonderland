/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#DD183B',
          reddark: '#CC1939',
          dark: '#140609',
          cream: '#FFEDE6',
        },
      },
      fontFamily: {
        heading: ['Rubik', 'system-ui', 'sans-serif'],
        body: ['Karla', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
