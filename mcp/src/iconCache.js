import { mkdirSync, statSync, existsSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import sharp from 'sharp';

import { BASE_ICONS_DIR } from '../config.js';

const ROOT_DIR = dirname(fileURLToPath(import.meta.url));
const CACHE_ROOT = join(ROOT_DIR, '../.cache/icons');
const ICON_DIRS = ['Modules', 'Ships', 'SpaceBuildings', 'Stars', 'Distinctions'];

const WIDTH = 50;
const QUALITY = 92;
const COMPRESSION_LEVEL = 9;

const DIR_SET = new Set(ICON_DIRS);

async function buildCache() {
    for (const dir of ICON_DIRS) {
        const srcDir = join(BASE_ICONS_DIR, dir);
        const cacheDir = join(CACHE_ROOT, dir);
        mkdirSync(cacheDir, { recursive: true });

        for (const file of readdirSync(srcDir).filter((f) => f.endsWith('.png'))) {
            const srcPath = join(srcDir, file);
            const dstPath = join(cacheDir, file);

            const srcStat = statSync(srcPath);
            const dstStat = existsSync(dstPath) ? statSync(dstPath) : null;
            if (dstStat && dstStat.mtimeMs >= srcStat.mtimeMs) continue;

            const out = sharp(srcPath)
                .resize({ width: WIDTH })
                .toFormat('png', { palette: true, quality: QUALITY, compressionLevel: COMPRESSION_LEVEL });

            await out.toFile(dstPath);
        }
    }
}

/**
 * @param {string} dir
 * @param {string} file
 * @return {string|null}
 */
export function cachedIconPath(dir, file) {
    if (!DIR_SET.has(dir)) return null;
    return join(CACHE_ROOT, dir, file);
}

await buildCache();
