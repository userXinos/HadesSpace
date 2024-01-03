import { reactive } from 'vue';
import i18n from '@Utils/Vue/i18n';
import { loadLocaleMessages } from '@Utils/Vue/i18n';
import JSONCrush from 'jsoncrush';

const NAME_ZERO = 'default entry';
const STRING_FORMAT_LOCALE = 'en';

interface Store<Value> {
    configs: { name: string, temporary?: boolean, value: Value }[],
    selected: number
}

export default class MultiConfig<ConfigValue> {
    public readonly store: Store<ConfigValue>;

    public readonly TIDs: Record<string, string> = {};

    constructor(private readonly localStoreKey: string, private readonly zeroConfig: ConfigValue) {
        this.store = reactive({ configs: [], selected: 0 }) as Store<ConfigValue>;
        this.load();
    }

    public get selectedConfig() {
        return this.store.configs[this.store.selected].value;
    }

    public load() {
        const data = JSON.parse(localStorage.getItem(this.localStoreKey) || '{}');

        if (data) {
            if (data.configs) {
                Object.assign(this.store, data);
                return;
            }
            localStorage.removeItem(this.localStoreKey);
        }
        this.add(this.zeroConfig);
    }

    public save() {
        localStorage.setItem(this.localStoreKey, JSON.stringify(this.store));
    }

    public removeSelected() {
        this.store.configs.splice(this.store.selected, 1);

        if (this.store.configs.length == 0) {
            this.add(this.zeroConfig);
            return;
        }

        this.store.selected = this.store.configs.length - 1;
    }

    public add(data: ConfigValue, { temporary } = { temporary: false }) {
        let i = 0;
        let newName: string;

        do {
            newName = i ? `${NAME_ZERO} #${i}` : NAME_ZERO;
            i++;
        } while (this.store.configs.length && this.store.configs.some((e) => e.name == newName));


        this.store.configs = [...this.store.configs, { name: newName, value: data }];
        this.store.selected = this.store.configs.length - 1;


        if (temporary) { // мб какая-нить логика на основе этого
            // val.configs[val.selected].temporary = true;
        } else {
            this.save();
        }
    }

    public async parseString(text: string) {
        const entries: [string, number][] = [];

        if (!(i18n.global.availableLocales as string[]).includes(STRING_FORMAT_LOCALE)) {
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

    public static stringifyUrl(obj: object): string {
        const json = JSON.stringify(obj);
        return JSONCrush.crush(json);
    }

    public static parseUrl(text: string): object {
        return JSON.parse(JSONCrush.uncrush(text));
    }
}
