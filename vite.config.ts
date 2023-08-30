import { build, defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts({ rollupTypes: true })],
  server: {
    port: 6789,
    strictPort: true,
  },
  build: {
    lib: {
      entry: "src/arkitekt/index.tsx",
      name: "arkitekt",
      formats: ["es"],
    },

    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "cancelable-promise",
        "@jhnnsrs/mikro",
        "@jhnnsrs/fakts",
        "@jhnnsrs/herre",
        "@jhnnsrs/rekuest",
        "@jhnnsrs/datalayer",
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
