import { Compendium as Client1 } from 'bot_client';
import { Compendium as Client2 } from 'bot_client2';
import { ref } from 'vue';

const clients = [Client1, Client2];

let initialized = false;
const client = ref<Client1|Client2>(new Client1());

const compendiumClient = localStorage.getItem('compendium_client');
if (compendiumClient) {
    switchInstance(parseInt(compendiumClient));
}

export default client;

export async function init() {
    if (!initialized) {
        await client.value.initialize();
        initialized = true;
    }
}

export function stop() {
    client.value.shutdown();
    initialized = false;
}

export async function switchInstance(clientNum: number) {
    stop();
    client.value = new clients[clientNum]();
    localStorage.setItem('compendium_client', String(clientNum));
    await init();
}
