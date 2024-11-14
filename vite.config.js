import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/snapArt",
  plugins: [react()],
  server: {
    proxy: {
      "/api/v1": {
        target: "https://snapearn.online",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
