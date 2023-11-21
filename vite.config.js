import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA as pwa } from 'vite-plugin-pwa';
import dynamicImport from 'vite-plugin-dynamic-import';
import { version } from './package.json';

import { resolve } from 'path';

const path = (...p) => resolve(__dirname, ...p);
const isDev = process.env.NODE_ENV === 'development';
const currentDate = new Date();

export default defineConfig({
    base: (isDev ? '/' : `/HadesSpace/`),
    server: {
        port: 8080,
    },
    define: {
        'process.env.VERSION': JSON.stringify(version),
        'process.env.BUILD_TIMESTAMP': currentDate.getTime(),
    },
    resolve: {
        alias: {
            '@': path('src'),

            '@Data': path('parser/dist'),
            '@i18n': path('i18n/dist'),
            '@Regulation': path('src/regulation'),
            '@Img': path('src/img'),
            '@Utils': path('src/utils'),
            '@Store': path('src/store'),
            '@Handlers': path('src/utils/Handlers'),
        },
    },
    assetsInclude: ['**/*.md'],
    plugins: [
        dynamicImport(),
        vue(),
        pwa({
            registerType: 'autoUpdate',
            mode: process.env.NODE_ENV,
            devOptions: {
                enabled: isDev,
                type: 'module',
            },
            workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg,md}'],
            },
            includeAssets: ['favicon.svg'],
            manifest: {
                name: 'Hades Space',
                short_name: 'HadesSpace',
                themeColor: '#161b1d',
                icons: [
                    { 'src': 'favicon/32x32.png', 'sizes': '32x32', 'type': 'image/png' },
                    { 'src': 'favicon/16x16.png', 'sizes': '16x16', 'type': 'image/png' },
                    { 'src': 'favicon/512x512.png', 'sizes': '512x512', 'type': 'image/png' },
                    { 'src': 'favicon/192x192.png', 'sizes': '192x192', 'type': 'image/png' },
                    { 'src': 'favicon/512x512.png', 'sizes': '512x512', 'type': 'image/png', 'purpose': 'maskable' },
                    { 'src': 'favicon/192x192.png', 'sizes': '192x192', 'type': 'image/png', 'purpose': 'maskable' },
                ],
            },
        }),
    ],
});
