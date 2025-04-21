import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc' // Pastikan import ini benar

export default defineConfig({
  plugins: [react()],
})