import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // 将Vue相关库分离到单独的chunk
          "vue-vendor": ["vue", "vue-router"],
          // 将Element Plus分离到单独的chunk
          "element-plus": ["element-plus"],
          // 将Three.js分离到单独的chunk
          three: ["three"],
          // 将大型组件分离
          "large-components": [
            "./src/views/CreateCenter.vue",
            "./src/views/Preview3D.vue",
            "./src/views/UserProfile.vue",
          ],
        },
      },
    },
    // 调整chunk大小警告限制
    chunkSizeWarningLimit: 1000,
    // 启用代码压缩
    // minify: "terser",
    // terserOptions: {
    //   compress: {
    //     drop_console: true,
    //     drop_debugger: true,
    //   },
    // },
  },
});
