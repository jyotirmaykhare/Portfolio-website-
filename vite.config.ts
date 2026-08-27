import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  // Listen on both IPv4 (127.0.0.1) and IPv6 (::1) so "localhost" never
  // refuses connections regardless of how the OS resolves it.
  server: {
    host: true,
  },
  build: {
    sourcemap: false,
  },
});
