import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      // sending each api call to nginx (port 80)
      // The default port of "http://localhost" is 80
      // The default port of "https://localhost" is 443
      // The default port of "http://localhost:3000" is 3000
      // The default port of "https://localhost:3000" is 3000
      "/auth": {
        target: "http://localhost",
        changeOrigin: true,
      },
      "/chat": {
        target: "http://localhost",
        changeOrigin: true,
        ws: true, // Enable WebSockets for the chat service
      },
      "/data": {
        target: "http://localhost",
        changeOrigin: true,
      },
    },
  },
})
