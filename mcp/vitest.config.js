import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vitest/config';

// Под vitest резолвит не Node, а Vite, поэтому алиасы приложения (@Data, @Utils)
// дублируются здесь: тесты грузят тот же самый crystalConverter.ts, что и сервер.
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

export default defineConfig({
    resolve: {
        alias: {
            '@Data': resolve(ROOT, 'parser/dist'),
            '@Utils': resolve(ROOT, 'src/utils'),
        },
    },
});
