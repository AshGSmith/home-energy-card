import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/power-flow-card-modern.ts"),
      name: "PowerFlowCardModern",
      fileName: "power-flow-card-modern",
      formats: ["es"],
    },
    rollupOptions: {
      external: [],
    },
    outDir: "dist",
    sourcemap: true,
  },
});
