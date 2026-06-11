import { defineConfig } from "vite-plus";

export default defineConfig({
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
