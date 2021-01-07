import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  server: {
    port: 8888,
    open: true,
    host: "localhost",
  },
  build: {
    minify: "esbuild",
    outDir: "dist",
    base: "./",
  },
  alias: {
    "/@/": path.resolve(__dirname, "./src")+'/',
  },
  plugins: [vue()],
});
