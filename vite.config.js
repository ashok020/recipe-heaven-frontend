import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import reactRefresh from "@vitejs/plugin-react-refresh";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    reactRefresh({
      enforceReactRefresh: false,
    }),
  ],
  server: {
    proxy: {
      "/api": {
        target: "https://breakable-plum-dalmatian.cyclic.app",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
