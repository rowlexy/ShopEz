import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import tailgridsPlugin from 'tailgrids/plugin'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss({
      config: {
        content: ["./src/**/*.{js,jsx,ts,tsx}"],
        theme: {
          extend: {},
        },
        plugins: [tailgridsPlugin],
      }
    })
  ],
  define: {
    global: 'globalThis',
    'process.env': {}, // Some packages look for this
  },
  resolve: {
    alias: {
      fs: false,
      path: false,
      buffer: false,
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
