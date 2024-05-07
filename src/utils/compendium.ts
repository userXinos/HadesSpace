import { Compendium as Client1 } from 'bot_client';
import { Compendium as Client2 } from 'bot_client2';
import store from '../../src/store/index';

function getClient() {
    const useClient2 = store.state.userSettings.disableFilters;  // нужно где то что то придумать вместо фильтра
    return useClient2 ? new Client2() : new Client1();
}

const client = getClient();
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
