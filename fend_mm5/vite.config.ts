import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'https://api.escuelajs.co',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      },
      '/files': {
        target: 'https://api.escuelajs.co/api/v1',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/files/, '/files')
      }
    }
  }
});
