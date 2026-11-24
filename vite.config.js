import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

const apiProxy = {
  '/api': 'http://localhost:3001',
}

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
  ],
  server: {
    proxy: apiProxy,
  },
  preview: {
    proxy: apiProxy,
  },
})