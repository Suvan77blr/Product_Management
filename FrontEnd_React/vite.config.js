import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Need to config still

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/login': 'http://localhost:3000',
      '/users': 'http://localhost:3000',
      '/products': 'http://localhost:3000',
    },
  },
});
