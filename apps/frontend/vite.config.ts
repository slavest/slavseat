import react from '@vitejs/plugin-react';

import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import path from 'path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vanillaExtractPlugin(),
    VitePWA({
      base: '/',
      includeAssets: ['booksy.svg', 'booksy-app-256.png', 'booksy-app-512.png'],
      manifest: {
        name: 'Booksy 좌석예약',
        short_name: 'Booksy',
        theme_color: '#ffffff',
        icons: [
          // {
          //   src: 'vite-512.png', // <== don't add slash, for testing
          //   sizes: '192x192',
          //   type: 'image/png',
          // },
          {
            src: 'booksy-app-256.png', // <== don't remove slash, for testing
            sizes: '256x256',
            type: 'image/png',
          },
          {
            src: 'booksy-app-512.png', // <== don't remove slash, for testing
            sizes: '512x512',
            type: 'image/png',
          },
          // {
          //   src: 'vite-512.png', // <== don't add slash, for testing
          //   sizes: '512x512',
          //   type: 'image/png',
          //   purpose: 'any maskable',
          // },
        ],
      },
      devOptions: {
        enabled: true,
        /* when using generateSW the PWA plugin will switch to classic */
        type: 'classic',
        navigateFallback: 'index.html',
      },
      workbox: {
        navigateFallbackDenylist: [/^\/api/],
        cleanupOutdatedCaches: true,
      },
    }),
  ],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
  server: {
    proxy: {
      '/api': { target: 'http://localhost:3000', changeOrigin: true },
    },
  },
});
