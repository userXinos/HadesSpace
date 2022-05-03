import { reactive } from 'vue';

import levels from '@Data/planet_levels.js';

const ROW_KEYS: Record<RowKeys, string> = {
    CreditStorage: 'CreditStorageModifier',
    FuelStorage: 'FuelStorageModifier',
    CreditsPerHour: 'CreditIncomeModifier',
    FuelPerHour: 'FuelIncomeModifier',
    ShipmentsCRValuePerDay: 'CreditShipmentModifier',
};
const ROW_KEYS_TOTAL: RowKeysTotal[] = ['Cost', 'TimeToUpgrade'];
const COL_NAMES: ColNames[] = ['actually', 'plan', 'result'];
const KEYS_ALIASES_TS: Record<string, string> = {
    ShipmentsCRValuePerDay: 'TotalShipmentCRPerDay',
    Cost: 'Cost',
    TimeToUpgrade: 'ConstructionTime',
};

export type Input = Record<InputKeys, PlanetsLevel>
export interface Output {
    calculated: {
        [key in RowKeys]: {
            [key in ColNames]: number
        }
    },
    total: {
        [key in RowKeysTotal]: number
    }
}
export interface PlanetsLevel {
    [key: string]: number
}
export interface Data {
    [key: string]: number[] | string[]
}
export type InputKeys = 'actually'|'plan';
export type ColNames = 'actually'|'plan'|'result';
export type RowKeys = 'CreditStorage'|'FuelStorage'|'CreditsPerHour'|'FuelPerHour'|'ShipmentsCRValuePerDay';
export type RowKeysTotal = 'Cost'|'TimeToUpgrade';

export default function planetsCalcLogic(planetsYS: Data, TradingStation: Data, planetsIds: string[]) {
    const output = reactive({ calculated: {}, total: {} }) as Output;

    return { output, update };


    function update(input: Input) {
        initOutput();

        Object.entries(input).forEach(([key, value]) => {
            if (Object.keys(value).length) {
                updateCol(key as ColNames, value);
            }
        });

        // вычислить прирост плана
        for (const value of Object.values(output.calculated)) {
            value.plan = value.plan - value.actually;
        }
        updateCol('result', input.plan);

        calculateTotal(input);
    }

    function initOutput() {
        output.calculated = Object.keys(ROW_KEYS).reduce((acc, key) => ({
            ...acc,
            [key]: COL_NAMES.reduce((a, k) => ({ ...a, [k]: 0 }), {}),
        }), {} as Output['calculated']);
        output.total = ROW_KEYS_TOTAL.reduce((acc, key) => ({
            ...acc,
            [key]: 0,
        }), {} as Output['total']);
    }
    function updateCol(mode: ColNames, obj: PlanetsLevel) {
        for (const item of Object.keys(obj)) {
            const itemLvl = obj[item] - 1;
            const itemIndex = planetsIds.indexOf(item);

            if (!obj[item]) return;

            for (const key of Object.keys(output.calculated) as RowKeys[]) {
                let num1: number;
                let num2: number;

                if (mode == 'result') { // обновить результат
                    num1 = output.calculated[key].plan;
                    num2 = output.calculated[key].actually;
                } else {
                    num1 = output.calculated[key][mode] || 0;
                    if (ROW_KEYS[key]) {
                        num2 = levels[key][itemLvl] * (planetsYS[ROW_KEYS[key]][itemIndex] as number) / 100;

                        if (item.includes('TradingStation')) {
                            num2 = 0;
                            if (key in KEYS_ALIASES_TS) {
                                num2 = TradingStation[KEYS_ALIASES_TS[key]][itemLvl] as number;
                            }
                        }
                    } else {
                        num2 = levels[key][itemLvl];
                    }
                }
                output.calculated[key][mode] = num1 + num2;
            }
        }
    }
    function calculateTotal(obj: Input) {
        for (const item of Object.keys(obj.plan)) {
            if (obj.plan[item] == 0) return;

            for (const key of Object.keys(output.total) as RowKeysTotal[]) {
                const PlanIndexLvl = obj.plan[item] - 1;
                const ActuallyIndexLvl = (obj.actually[item] || 0) - 1;
                const num1 = (output.total[key] == undefined) ? 0 : output.total[key];
                let num2 = 0;

                for (let level = ActuallyIndexLvl; PlanIndexLvl > level; level++) {
                    let data = levels[key][level + 1] || 0;

                    if (item.includes('TradingStation') && key in KEYS_ALIASES_TS) {
                        data = TradingStation[KEYS_ALIASES_TS[key]][level + 1] as number || 0;
                    }
                    num2 = num2 + data;
                }
                output.total[key] = num1 + num2;
            }
        }
    }
}
