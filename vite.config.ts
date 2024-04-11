import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import EnvironmentPlugin from "vite-plugin-environment";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [svgr(), react(), EnvironmentPlugin("all", { prefix: "REACT_APP" })],
    server: {
      port: 7093,
      proxy: {
        "/api": {
          target: env.REACT_APP_BACKEND,
          changeOrigin: true,
        },
        "/llm": {
          target: env.REACT_APP_LLM,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/llm/, ""),
        },
      },
    },
    build: {
      target: ["es2020", "edge88", "firefox78", "chrome87", "safari13"],
    },
  };
});
