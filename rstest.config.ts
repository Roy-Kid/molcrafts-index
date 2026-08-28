import path from "node:path";
import { defineConfig } from "@rstest/core";

export default defineConfig({
  /* Same alias as rsbuild.config.ts, so tests resolve `@/` the way the app does. */
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  /* Unit tests only. Browser-driven checks belong in `regressions/`. */
  include: ["tests/**/*.test.ts"],
  testEnvironment: "node",
});
