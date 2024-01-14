import { reactive } from 'vue';
import JSONCrush from 'jsoncrush';

const NAME_ZERO = 'default entry';

interface Store<Value> {
    configs: { name: string, temporary?: boolean, value: Value }[],
    selected: number
}

export default class MultiConfig<ConfigValue> {
    public readonly store: Store<ConfigValue>;

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

    public static stringifyUrl(obj: object): string {
        const json = JSON.stringify(obj);
        return JSONCrush.crush(json);
    }

    public static parseUrl(text: string): object {
        return JSON.parse(JSONCrush.uncrush(text));
    }
}
