import { fileURLToPath } from 'url';
import { cpSync, existsSync, mkdirSync, rmSync } from 'fs';
import { join } from 'path';
import { defineConfig } from 'vite';
import type { Plugin } from 'vite';

function syncToStaticEsm(): Plugin {
  return {
    name: 'sync-to-static-esm',
    closeBundle() {
      const distDir = join(process.cwd(), 'dist');
      const staticDir = fileURLToPath(new URL('../src/main/resources/static', import.meta.url));
      const esmTargetDir = join(staticDir, 'esm');

      if (!existsSync(staticDir)) {
        mkdirSync(staticDir, { recursive: true });
      }

      // Remove legacy single-file UMD bundle if present
      const legacyUmd = join(staticDir, 'data-statistics.umd.js');
      if (existsSync(legacyUmd)) {
        rmSync(legacyUmd, { force: true });
      }

      // Cleanly sync ESM loader and lazy chunks
      rmSync(esmTargetDir, { recursive: true, force: true });
      cpSync(distDir, esmTargetDir, { recursive: true });
      console.log(`✓ Synced on-demand ESM bundle to ${esmTargetDir}`);
    }
  };
}

export default defineConfig({
  build: {
    target: 'es2022',
    emptyOutDir: true,
    lib: {
      entry: './src/loader.ts',
      formats: ['es'],
      fileName: () => 'loader.js'
    },
    rollupOptions: {
      output: {
        chunkFileNames: 'chunks/[name]-[hash].js',
        assetFileNames: 'chunks/[name]-[hash][extname]',
        manualChunks(id) {
          if (id.includes('node_modules/chart.js') || id.includes('node_modules/@kurkle/color')) {
            return 'chart';
          }
          if (id.includes('node_modules/lit') || id.includes('node_modules/@lit')) {
            return 'lit';
          }
          return undefined;
        }
      }
    }
  },
  plugins: [syncToStaticEsm()],
  server: {
    port: 3001
  }
});
