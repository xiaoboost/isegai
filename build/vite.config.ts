import { defineConfig, Plugin, PluginOption } from "vite";
import { resolve } from "./utils";

import windiCSS from "vite-plugin-windicss";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  const root = resolve("src");
  const plugins: (Plugin | PluginOption | PluginOption[])[] = [
    react(),
    windiCSS({
      config: resolve('build/windi.config.ts'),
    }),
  ];

  if (command === "build") {
    plugins.push(checker({ typescript: true }));
  }

  return {
    root,
    build: {
      outDir: "../dist",
    },
    define: {
      NO: JSON.stringify(mode),
    },
    resolve: {
      mainFields: ["source", "module", "main"],
      alias: {
        src: resolve("src"),
      },
    },
    plugins,
  };
});
