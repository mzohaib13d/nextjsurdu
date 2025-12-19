import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // یہ لائن لازمی ہے

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // یہ Tailwind 4 کو ایکٹیویٹ کرتا ہے
  ],
})