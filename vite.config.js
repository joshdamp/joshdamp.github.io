import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/',
  build: {
    outDir: 'docs',
    copyPublicDir: true,
    // Enable minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    // Optimize chunks
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-three': ['three'],
          'vendor-motion': ['motion', 'gsap']
        }
      }
    },
    // Target modern browsers
    target: 'es2020',
    // Improve source maps for production
    sourcemap: false
  },
  plugins: [react()],
  server: {
    port: 5173,
    open: true
  },
  // Optimize dependency pre-bundling
  optimizeDeps: {
    include: ['react', 'react-dom', 'motion', 'gsap', 'three']
  }
})
