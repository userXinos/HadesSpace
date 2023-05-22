import { reactive } from 'vue';
import i18n, { loadLocaleMessages } from '@Utils/Vue/i18n';
import JSONCrush from 'jsoncrush';

import type { Input, InputValue, Config } from '@/typings/calculator';

const NAME_ZERO = 'new entry';
const STRING_FORMAT_LOCALE = 'en';

export default class CalculatorConfig {
    public readonly store: Config;

    public readonly TIDs: Record<string, string> = {};


    constructor(private readonly localStoreKey: string) {
        this.store = reactive({ configs: [], selected: 0 }) as Config;
        this.load();
    }

    public get selectedConfig() {
        return this.store.configs[this.store.selected].value;
    }

    public load() {
        const data = JSON.parse(localStorage.getItem(this.localStoreKey) || '{}');

        if (data.configs) {
            Object.assign(this.store, data);
            return;
        }
        if (Object.keys(data).length && (data.actually && data.plan)) {
            this.add(data);
            return;
        }
        this.add();
    }

    public save() {
        localStorage.setItem(this.localStoreKey, JSON.stringify(this.store));
    }

    public removeSelected() {
        this.store.configs.splice(this.store.selected, 1);

        if (this.store.configs.length == 0) {
            this.add();
            return;
        }

        this.store.selected = this.store.configs.length - 1;
    }

    public add(data?: Input, { temporary } = { temporary: false }) {
        const val = this.store;
        let i = 0;
        let newName: string;

        do {
            newName = i ? `${NAME_ZERO} #${i}` : NAME_ZERO;
            i++;
        } while (val.configs.length && val.configs.some((e) => e.name == newName));


        val.configs = [
            ...val.configs,
            { name: newName, value: data || { actually: {}, plan: {} } },
        ];
        val.selected = val.configs.length - 1;


        if (temporary) { // @TODO мб какая-нить логика на основе этого
            // val.configs[val.selected].temporary = true;
        } else {
            this.save();
        }
    }

    public async parseString(text: string) {
        const entries: [string, number][] = [];

        if (!i18n.global.availableLocales.includes(STRING_FORMAT_LOCALE)) {
            await loadLocaleMessages(STRING_FORMAT_LOCALE);
        }

        for (const [key, TID] of Object.entries(this.TIDs)) {
            const name = i18n.global.t(TID, STRING_FORMAT_LOCALE);
            const regex = new RegExp(`${name}\\s+?(\\d+)\\s?`, 'mi'); // EMP       99
            const [, lvl] = text.match(regex) || [undefined, '0'];

            entries.push([key, parseInt(lvl as string)]);
        }
        return Object.fromEntries(entries.filter(([, l]) => l));
    }

    public stringifyUrl() {
        const json = JSON.stringify(this.selectedConfig.actually);
        return JSONCrush.crush(json);
    }

    public parseUrl(text: string) {
        return JSON.parse(JSONCrush.uncrush(text)) as InputValue;
    }
}
