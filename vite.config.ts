import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // Use './' for relative paths if deploying to a subdirectory
  build: {
    outDir: 'dist', // Ensure output directory is 'dist'
    emptyOutDir: true
  }
});
