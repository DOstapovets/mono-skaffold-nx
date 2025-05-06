import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

const backendUrl = process.env.VITE_BACKEND_URL || 'http://localhost:3000';
const port = process.env.VITE_PORT || 3001;

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port,
    host: '0.0.0.0',
    allowedHosts: true,
    proxy: {
      '/health': {
        target: backendUrl,
        changeOrigin: true,
        secure: false,
      },
      '/api': {
        target: backendUrl,
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
