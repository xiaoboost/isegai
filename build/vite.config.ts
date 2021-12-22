import { defineConfig } from "vite";
import { resolve } from './utils';

import windiCSS from 'vite-plugin-windicss';
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  root: resolve("src"),
  build: {
    outDir: '../dist',
  },
  resolve: {
    mainFields: ['source', 'type', 'main'],
    alias: {
      src: resolve("src"),
    },
  },
  plugins: [
    react(),
    windiCSS(),
  ],
});
