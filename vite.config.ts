import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import viteCompression from 'vite-plugin-compression';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        // React fast refresh and HMR
        react(),
        // SVG as React component
        svgr(),
        // Gzip by default
        viteCompression(),
        // Brotli compression
        viteCompression({ algorithm: 'brotliCompress' })
    ],
    resolve: {
        alias: [{ find: /^@\//, replacement: '/src/' }]
    },
    css: {
        modules: {
            // fix for class names that are not formatted consistently
            generateScopedName: '[name]__[local]--[hash:base64:5]' // Replace with your own format
        },
        // https://vite.dev/config/shared-options.html#css-preprocessoroptions
        // https://sass-lang.com/d/legacy-js-api
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler' // or "modern", "legacy"
            }
        }
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks(id: string, { getModuleInfo }) {
                    // Dynamically check if the module has React-related dependencies
                    const hasReactDependency = (id: string): boolean => {
                        return getModuleInfo(id)?.importedIds.some((importedId) => importedId.includes('react') || importedId.includes('react-dom') || importedId.includes('react-router')) ?? false;
                    };

                    // Caution: React-related packages should be bundled together otherwise it may cause runtime errors
                    if (id.includes('/node_modules/') && hasReactDependency(id)) {
                        return 'react';
                    }

                    // Add your large packages to the list
                    for (const largePackage of ['react-map-gl', 'maplibre-gl']) {
                        if (id.includes(`/node_modules/${largePackage}/`)) {
                            return largePackage;
                        }
                    }

                    // All other packages in the `node_modules` folder will be bundled together
                    if (id.includes('/node_modules/')) {
                        return 'vendors';
                    }

                    // Use the default behavior for other modules
                },
                entryFileNames: 'assets/[name].js',
                chunkFileNames: 'assets/[name].js',
                // get rid of the hash on js/css files
                assetFileNames: 'assets/[name].[ext]'
            }
        }
    }
});
