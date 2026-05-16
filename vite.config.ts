import { defineConfig } from "vite-plus";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  fmt: {},
  lint: {
    ignorePatterns: [
      ".agents/**",
      ".claude/**",
      ".hermes/**",
      "skills/**",
      "node_modules/**",
      "build/**",
      "dist/**",
      "todos/**",
      "docs/**",
      "ui-review-*",
      "*.umd.js",
    ],
  },
  plugins: [react()],
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  build: {
    target: "esnext",
    outDir: "build",
  },
  server: {
    port: 3000,
    open: true,
  },
});
