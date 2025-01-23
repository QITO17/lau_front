import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/socket.io': {
        target: 'http://laureles-ap.onrender.com',
        changeOrigin: true,
        ws: true, // Habilitar WebSockets si es necesario
      },
    },
  },
})
