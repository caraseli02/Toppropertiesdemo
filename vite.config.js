import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite-plus";

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    outDir: "build",
  },
  test: {
    include: ["src/**/*.test.js"],
  },
  lint: {
    ignorePatterns: ["build/**", "docs/**", "node_modules/**"],
  },
});
