import { defineConfig, searchForWorkspaceRoot } from "vite";

// See canvas-recorder-lib's README, "Notes for a project that uses this library".
export default defineConfig({
  // Relative paths so the build works from GitHub Pages or any subdirectory.
  base: "./",
  build: {
    // If something fails in production, it should still be debuggable.
    sourcemap: "inline",
    chunkSizeWarningLimit: 5000,
    target: "esnext",
    // GitHub Pages can serve everything in the docs directory.
    outDir: "docs",
  },
  resolve: {
    // This project and canvas-recorder-lib both use phil-lib.  Make sure there's only one copy.
    dedupe: ["phil-lib"],
  },
  server: {
    // Always the same port.  The video editor saves its work in the browser (IndexedDB),
    // and the browser keeps a separate copy for each port.
    // canvas-recorder uses 5173 and riemann-surfaces-3d uses 5174.
    port: 5175,
    strictPort: true,
    fs: {
      // canvas-recorder-lib is linked from ../canvas-recorder-lib, outside this project.
      // Its transcription worker is loaded by URL, so the folder has to be allowed explicitly.
      allow: [searchForWorkspaceRoot(process.cwd()), "../canvas-recorder-lib"],
    },
  },
});
