import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    hmr: {
      clientPort: 443 // Nếu chạy HTTPS qua ngrok
    },
    allowedHosts: [
      '.ngrok-free.app' // Cho phép tất cả subdomains của Ngrok
    ]
  }
})
