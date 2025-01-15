import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import { nodePolyfills } from "vite-plugin-node-polyfills";

dotenv.config();

export default defineConfig({
  plugins: [react(), nodePolyfills()],
  define: {
    // Inject environment variables into the client
    "process.env": JSON.stringify(process.env),
  },
  base: "/", // Use './' for relative paths if deploying to a subdirectory
  build: {
    outDir: "dist", // Ensure output directory is 'dist'
    emptyOutDir: true,
  },
  server: {
    proxy: {
      "/uploads": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
});
