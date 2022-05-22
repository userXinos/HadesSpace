import { reactive } from 'vue';
import i18n from '@Scripts/Vue/i18n';
import JSONCrush from 'jsoncrush';

import { Input } from '@/composables/calculator';

const { t } = i18n.global;

interface Config {
    configs: { name: string, temporary?: boolean, value: Input }[],
    selected: number
}

const NAME_ZERO = 'new entry';

export default class CalculatorConfig {
    public readonly value: Config;

    public readonly TIDs: Record<string, string> = {};

    private readonly localStoreKey: string;


    constructor(lsKey: string) {
        this.value = reactive({ configs: [], selected: 0 }) as Config;
        this.localStoreKey = lsKey;

        this.load();
    }

    public get selectedConfig() {
        return this.value.configs[this.value.selected].value;
    }

    public load() {
        const data = JSON.parse(localStorage.getItem(this.localStoreKey) || '{}');

        if (data.configs) {
            Object.assign(this.value, data);
            return;
        }
        if (Object.keys(data).length && (data.actually && data.plan)) {
            this.add(data);
            return;
        }
        this.add();
    }

    public save() {
        localStorage.setItem(this.localStoreKey, JSON.stringify(this.value));
    }

    public removeSelected() {
        this.value.configs.splice(this.value.selected, 1);

        if (this.value.configs.length == 0) {
            this.add();
            return;
        }

        this.value.selected = this.value.configs.length - 1;
    }

    public add(data?: Input, { temporary } = { temporary: false }) {
        const val = this.value;
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

    public parseString(text: string) {
        const entries: [string, number][] = [];

        for (const [key, TID] of Object.entries(this.TIDs)) {
            const name = t(TID, 'en');
            const regex = new RegExp(`${name}\\s+?(\\d+?)\\s`, 'mi');
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
        if (text) {
            const parsed = JSON.parse(JSONCrush.uncrush(text));

            this.add({
                actually: parsed,
                plan: parsed,
            }, { temporary: true });
        }
    }
}
