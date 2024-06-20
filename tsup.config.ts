import { defineConfig } from "tsup";

export default defineConfig([
  // Normal build
  {
    entry: ["./src/index.ts"],
    clean: true,
    format: ["esm", "cjs"],
    minify: false,
    dts: true,
    outDir: "./dist",
  },
  // Minified build
  {
    entry: ["./src/index.ts"],
    clean: true,
    format: ["esm", "cjs"],
    minify: true,
    dts: false,
    outDir: "./dist",
    outExtension: ({ format }) => ({
      js: format === "cjs" ? ".min.cjs" : ".min.js",
    }),
  }
]);
