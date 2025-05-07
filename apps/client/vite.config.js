/* global process */
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env variables
  const env = loadEnv(mode, process.cwd(), '')
  
  const backendUrl = env.VITE_BACKEND_URL || 'http://localhost:3000';
  const port = parseInt(env.VITE_PORT || '3001');

  return {
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
  }
})