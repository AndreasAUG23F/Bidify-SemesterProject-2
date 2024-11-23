/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './/*.{html,js,ts}',
    './src/**/*.{html,js,ts}',
    './**/*.{html,js,ts}',
    '!./node_modules//*',
  ],
  theme: {
    extend: {
      components: {
        '.btn': {
          '@apply px-4 py-2 font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600':
            {},
        },
      },
    },
  },
  plugins: [],
};
