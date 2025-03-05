import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    // arrays: "src/arrays/methods.ts",
  },
  format: ["esm", "cjs"],
  outDir: "dist",
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: false,
});
