// vite.config.ts
import { defineConfig, ConfigEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv) => {
  const isAnalyze = mode === 'analyze';
  const isProduction = mode === 'production';

  return {
    plugins: [
      react({
        // ✅ Remove 'fastRefresh' - it's not needed
        // React Fast Refresh is enabled by default
      }),
      // Bundle analyzer (only in analyze mode)
      isAnalyze && visualizer({
        filename: 'dist/stats.html',
        open: true,
        gzipSize: true,
        brotliSize: true,
        template: 'treemap',
      }),
    ].filter(Boolean),

    server: {
      port: 5173,
      proxy: {
        '/api': {
          target: 'http://localhost:8000',
          changeOrigin: true,
          secure: false,
        },
      },
      hmr: {
        overlay: true,
      },
    },

    preview: {
      port: 5173,
    },

    build: {
      sourcemap: isAnalyze || !isProduction,
      minify: isProduction ? 'esbuild' : false,
      target: 'es2020',
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'ui-vendor': ['lucide-react', 'framer-motion'],
            'form-vendor': ['react-hook-form', 'zod', '@hookform/resolvers'],
            'chart-vendor': ['recharts'],
            'state-vendor': ['zustand'],
            'api-vendor': ['axios'],
            'utils-vendor': ['clsx', 'tailwind-merge', 'date-fns'],
          },
          assetFileNames: 'assets/[name].[hash][extname]',
          chunkFileNames: 'assets/[name].[hash].js',
          entryFileNames: 'assets/[name].[hash].js',
        },
      },
      cssCodeSplit: true,
      cssMinify: isProduction,
    },

    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        'lucide-react',
        'framer-motion',
        'react-hook-form',
        'zod',
        '@hookform/resolvers',
        'recharts',
        'zustand',
        'axios',
        'react-hot-toast',
        'clsx',
        'tailwind-merge',
        'date-fns',
      ],
      exclude: [],
    },

    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@components': path.resolve(__dirname, './src/components'),
        '@pages': path.resolve(__dirname, './src/pages'),
        '@hooks': path.resolve(__dirname, './src/hooks'),
        '@services': path.resolve(__dirname, './src/services'),
        '@store': path.resolve(__dirname, './src/store'),
        '@api': path.resolve(__dirname, './src/api'),
        '@utils': path.resolve(__dirname, './src/utils'),
        '@types': path.resolve(__dirname, './src/types'),
        '@lib': path.resolve(__dirname, './src/lib'),
        '@assets': path.resolve(__dirname, './src/assets'),
      },
    },

    envPrefix: 'VITE_',

    // ✅ Fix esbuild configuration
    esbuild: {
      // Only drop console in production
      drop: isProduction ? ['console', 'debugger'] : [],
      // Keep names for better debugging
      keepNames: true,
    },
  };
});