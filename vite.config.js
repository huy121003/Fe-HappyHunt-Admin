import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Mở rộng để tất cả các IP có thể kết nối
    port: 3000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Alias @ trỏ tới thư mục src
    },
  },
});
