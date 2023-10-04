import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],

  resolve: {
    alias: {
      services: '/src/services',
      types: '/src/types',
    },
  },

  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
})
