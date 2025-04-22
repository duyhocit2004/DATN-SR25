import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { splitVendorChunkPlugin } from 'vite';
import { compression } from 'vite-plugin-compression2';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    splitVendorChunkPlugin(),
    compression(),
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Thiết lập alias '@' trỏ đến thư mục 'src'
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@headlessui/react', '@heroicons/react'],
          // Add other large dependencies here
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn']
      },
    },
    cssCodeSplit: true,
    sourcemap: false,
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
