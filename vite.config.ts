import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
      '@shared': path.resolve(__dirname, '../src'),
      // Force single React instance (prevent duplicate when importing from @shared)
      'react': path.resolve(__dirname, '../node_modules/react'),
      'react-dom': path.resolve(__dirname, '../node_modules/react-dom'),
    },
    dedupe: ['react', 'react-dom'],
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
    // Optimize for Vercel speed
    target: 'esnext',
    cssMinify: true,
    rollupOptions: {
      output: {
        // Single-page landing: inline everything for faster load
        manualChunks: undefined,
      },
    },
  },
})
