import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Thiết lập alias '@' trỏ đến thư mục 'src'
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://provinces.open-api.vn',
        changeOrigin: true,
        secure: false,  // Bỏ kiểm tra SSL nếu cần (dành cho môi trường dev)
        rewrite: (path) => path.replace(/^\/api/, '') // Bỏ tiền tố '/api'
      }
    }
  }  
});
