import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/js/main.jsx"],
            refresh: true,
        }),
        react(),
        tailwindcss(),
    ],

    build: {
        target: "es2020",
        cssCodeSplit: true,
        minify: "esbuild",
        chunkSizeWarningLimit: 600,

        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (
                        id.includes("node_modules/react/") ||
                        id.includes("node_modules/react-dom/") ||
                        id.includes("node_modules/scheduler/")
                    ) {
                        return "vendor-react";
                    }
                    if (id.includes("node_modules/react-router")) {
                        return "vendor-router";
                    }
                    if (id.includes("node_modules/@tailwindcss")) {
                        return "vendor-tailwind";
                    }
                },
                chunkFileNames: "js/[name]-[hash].js",
                entryFileNames: "js/[name]-[hash].js",
                assetFileNames: "assets/[name]-[hash].[ext]",
            },
        },
    },
});
