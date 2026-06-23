import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      // The website lives at mosaic/website; the catalog is the source of truth
      // one level up. Import it directly so edits to mosaic.json flow to the site.
      '@catalog': fileURLToPath(new URL('../catalog', import.meta.url)),
      '@taxonomy': fileURLToPath(new URL('../taxonomy', import.meta.url)),
    }
  },
  server: {
    fs: {
      // allow the dev server to read the sibling catalog/ and taxonomy/ dirs
      allow: [fileURLToPath(new URL('..', import.meta.url))]
    }
  }
})
