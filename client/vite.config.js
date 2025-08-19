import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  root: '.',
  server: {
    proxy: {
      '/api': 'http://localhost:4000'
    }
  }
});