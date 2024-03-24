/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#3CE800',
        'neutral-150': 'F0F0F0',
      },
      fontFamily: {
        sans: ['Noto Sans KR', 'sans-serif'],
      },
      boxShadow: {
        blur: '0 0px 5px rgb(0 0 0 / 0.25)',
        'blur-sm': '0 0px 4px rgb(0 0 0 / 0.05)',
      },
    },
  },
  plugins: [],
};
