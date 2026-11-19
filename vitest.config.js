/**
 * testTimeout is low on purpose: a correct-but-exponential solution in the
 * dsa track should fail fast instead of hanging the watcher.
 */
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    testTimeout: 2000,
  },
});
