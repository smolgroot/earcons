import { defineConfig } from "tsup";

export default defineConfig([
  // ESM + CJS for bundlers (with types)
  {
    entry: ["src/index.ts"],
    format: ["esm", "cjs"],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: true,
    treeshake: true,
    minify: false,
    target: "es2020",
  },
  // IIFE for CDN / <script> tag usage
  {
    entry: { "earcon.min": "src/index.ts" },
    format: ["iife"],
    globalName: "Earcon",
    dts: false,
    sourcemap: false,
    clean: false,
    minify: true,
    target: "es2020",
    outDir: "dist",
  },
]);
