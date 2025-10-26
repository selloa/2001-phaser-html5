import { defineConfig } from 'vite'

export default defineConfig({
  base: '/2001-phaser-html5/',
  server: {
    port: 5173,
    open: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})