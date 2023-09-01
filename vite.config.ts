import { build, defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [dts({ rollupTypes: true }), react()],
  server: {
    port: 7890,
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
        "react-router-dom",
        "cancelable-promise",
        "@jhnnsrs/mikro",
        "@jhnnsrs/fakts",
        "@jhnnsrs/fluss",
        "@jhnnsrs/herre",
        "@jhnnsrs/rekuest",
        "@jhnnsrs/datalayer",
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "cancelable-promise": "CancelablePromise",
          "@jhnnsrs/mikro": "Mikro",
          "@jhnnsrs/fakts": "Fakts",
          "@jhnnsrs/fluss": "Fluss",
          "@jhnnsrs/herre": "Herre",
          "@jhnnsrs/rekuest": "Rekuest",
          "@jhnnsrs/datalayer": "Datalayer",
        },
      },
    },
  },
});
