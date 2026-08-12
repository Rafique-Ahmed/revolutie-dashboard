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
      react(),
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
          // ✅ Fix: Use a function instead of an object for manualChunks
          manualChunks: (id: string) => {
            if (id.includes('node_modules')) {
              if (id.includes('react')) {
                return 'react-vendor';
              }
              if (id.includes('lucide-react') || id.includes('framer-motion')) {
                return 'ui-vendor';
              }
              if (id.includes('react-hook-form') || id.includes('zod') || id.includes('@hookform/resolvers')) {
                return 'form-vendor';
              }
              if (id.includes('recharts')) {
                return 'chart-vendor';
              }
              if (id.includes('zustand')) {
                return 'state-vendor';
              }
              if (id.includes('axios')) {
                return 'api-vendor';
              }
              if (id.includes('clsx') || id.includes('tailwind-merge') || id.includes('date-fns')) {
                return 'utils-vendor';
              }
              return 'vendor';
            }
            return 'main';
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

    // ✅ Fix: Use oxc instead of esbuild (since Vite 8 uses Rolldown)
    // Remove or comment out esbuild options if using oxc
    // esbuild: {
    //   drop: isProduction ? ['console', 'debugger'] : [],
    //   keepNames: true,
    // },
  };
});