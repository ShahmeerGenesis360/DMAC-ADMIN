import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import svgr from "vite-plugin-svgr";

dotenv.config();

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills(),
    svgr(),
  ],
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
    host: "0.0.0.0",
    port: 5173,
    cors: {
      origin: ["https://admin.medley.money"], // ✅ Allow this domain
      credentials: true,
    },
    proxy: {
      "/socket.io": {
        target: `${ process.env.VITE_PUBLIC_SOCKET}`, // WebSocket server URL
        ws: true, // WebSocket proxying
        changeOrigin: true,
      },
      "/uploads": {
        target: `${ process.env.VITE_UPLOAD_URL}`,
        changeOrigin: true,
      },
    },
  },
});
