/** @type {import("tailwindcss").Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'background-base': '#121212',
        'background-highlight': '#1f1f1f',
        'background-press': '#000',
        'background-elevated-base': '#1f1f1f',
        'background-elevated-highlight': '#2a2a2a',
        'background-elevated-press': '#191919',
        'background-tinted-base': 'hsla(0,0%,100%,.1)',
        'background-tinted-highlight': 'hsla(0,0%,100%,.14)',
        'background-tinted-press': 'hsla(0,0%,100%,.05)',
        'text-base': '#fff',
        'text-subdued': '#b3b3b3',
        'text-bright-accent': '#1ed760',
        'text-negative': '#f3727f',
        'text-warning': '#ffa42b',
        'text-positive': '#1ed760',
        'text-announcement': '#4cb3ff',
        'essential-base': '#fff',
        'essential-subdued': '#7c7c7c',
        'essential-bright-accent': '#1ed760',
        'essential-negative': '#ed2c3f',
        'essential-warning': '#ffa42b',
        'essential-positive': '#1ed760',
        'essential-announcement': '#4cb3ff',
        'decorative-base': '#fff',
        'decorative-subdued': '#292929'
      }
    },
  },
  plugins: [],
}