import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    preserveSymlinks: true,
  },
  build: {
    // Broad mobile compatibility across Android Chrome, iOS Safari (14+), and iPadOS tablets
    target: ['es2020', 'safari14', 'chrome87', 'firefox78'],
    cssTarget: ['safari14', 'chrome87'],
  },
  server: {
    host: true,
    port: 5173,
    cors: true,
    allowedHosts: true,
  },
  preview: {
    host: true,
    port: 5173,
    cors: true,
    allowedHosts: true,
  },
})
