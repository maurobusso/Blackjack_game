/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "app.js",
    "index.html"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

//npx tailwindcss -i input.css -o dist/output.css --watch