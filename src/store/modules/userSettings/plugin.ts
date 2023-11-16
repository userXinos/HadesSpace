import { Store } from 'vuex';
import types from './types';
import { setSettings } from './storage';

const typesKeys: string[] = Object.values(types);

export default function(store: Store<{ userSettings: Settings }>) {
    store.subscribe(({ type }, state) => {
        if (typesKeys.includes(type)) {
            setSettings(state.userSettings);
        }
    });
}
