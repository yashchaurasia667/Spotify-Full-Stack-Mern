import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      // "/api": "https://spotify-full-stack-mern.onrender.com"
      "/api": {
        target: "http://localhost:4000/",
        // target: "https://spotify-full-stack-mern.onrender.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
