import { Compendium as Client1 } from 'bot_client';
import { Compendium as Client2 } from 'bot_client2';

const clients = [Client1, Client2];

let initialized = false;
let client: Client1|Client2 = new Client1();

const compendiumClient = localStorage.getItem('compendium_client');
if (compendiumClient) {
    switchInstance(parseInt(compendiumClient));
}

export default new Proxy(client, {
    get(target: Client1 | Client2, p: string | symbol): unknown {
        return client[p];
    },
});

export async function init() {
    if (!initialized) {
        console.log(client);
        await client.initialize();
        initialized = true;
    }
}

export function stop() {
    client.shutdown();
    initialized = false;
}

export function switchInstance(clientNum: number) {
    stop();
    client = new clients[clientNum]();
    localStorage.setItem('compendium_client', String(clientNum));
}
