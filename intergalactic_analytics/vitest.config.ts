import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true, // <-- ВАЖНО: позволяет использовать describe, test и т.д. без импортов
    setupFiles: './tests/setup.js', // если есть
  },
})