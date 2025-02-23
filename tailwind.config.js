module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    // Add other paths where you use Tailwind classes
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 4s linear infinite', // Slow rotation
      },
    },
  },
  plugins: [],
}


