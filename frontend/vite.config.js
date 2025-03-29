import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./", // 👈 Ensures correct relative paths
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
