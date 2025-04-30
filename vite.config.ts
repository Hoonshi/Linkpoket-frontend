import path, { resolve } from 'path';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), svgr()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': resolve(__dirname, 'src/components'),
      '@assets': resolve(__dirname, 'src/assets'),
    },
  },
  assetsInclude: ['**/*.webp'],
  server: {
    https: {
      key: fs.readFileSync('./key.key'), // SSL key 파일 경로
      cert: fs.readFileSync('./cert.crt'), // SSL 인증서 파일 경로
    },
  },
});
