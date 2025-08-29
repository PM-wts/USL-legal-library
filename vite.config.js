import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: true, // listen on all network interfaces
    allowedHosts: ['49df62920f4a.ngrok-free.app'], // your ngrok host
    port: 5173 // optional, your dev server port
  },
})
