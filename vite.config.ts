import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/home-energy-card.ts",
      formats: ["es"],
      fileName: () => "home-energy-card.js",
    },
    outDir: "dist",
    rollupOptions: {
      external: [],
    },
  },
});
