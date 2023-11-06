import { Compendium } from 'bot_client';

const client = new Compendium();
let initialized = false;

export default client;

export async function init() {
    if (!initialized) {
        await client.initialize();
        initialized = true;
    }
}

export function stop() {
    client.shutdown();
}
