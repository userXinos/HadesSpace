import { registerHooks } from 'node:module';

import { resolve } from './loader/hooks.js';

registerHooks({ resolve });

let CrystalConverter;

try {
    ({ CrystalConverter } = await import('@Utils/crystalConverter'));
} catch (error) {
    const message =
        `mcp server cannot load the crystal converter: "${error.message}". ` +
        `This is the mcp server's own dependency and needs a Node that strips TypeScript types at runtime — ` +
        `Node >= 22.18 (see package.json "engines").`;
    const wrapped = new Error(message);
    wrapped.cause = error;
    throw wrapped;
}

export { CrystalConverter };
