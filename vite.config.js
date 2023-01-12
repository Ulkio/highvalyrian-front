import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@c": path.resolve(__dirname, "./src/components"),
      "@p": path.resolve(__dirname, "./src/pages"),
      "~": path.resolve(__dirname, "./public/assets"),
    },
  },
});
