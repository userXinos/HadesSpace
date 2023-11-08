import globals from '@Data/globals';

const [, timeCristalValues] = getByPrefixKey('PremiumCurrencyTimeValue');
const [, timeCristalCost] = getByPrefixKey('PremiumCurrencyToTimePrice');
const [creditCristalValues, creditCristalCost] = getByPrefixKey('CrystalCostForCredits_');
const [hydrogenCristalValues, hydrogenCristalCost] = getByPrefixKey('CrystalCostForHydrogen_');

export class CrystalConverter {
    static sec2crystals(sec: number): number {
        if (sec <= 0) {
            return 0;
        }
        if (sec < timeCristalValues[0]) {
            return timeCristalCost[0];
        }
        for (let i = 1; i < timeCristalValues.length; i++) {
            if (sec < timeCristalValues[i]) {
                const num = timeCristalValues[i] - timeCristalValues[i - 1];
                const num2 = sec - timeCristalValues[i - 1];
                const num3 = timeCristalCost[i] - timeCristalCost[i - 1];
                const num4 = num2 * num3;
                return timeCristalCost[i - 1] + num4 / num;
            }
        }
        return timeCristalCost[3];
    }

    static credit2crystals(credit: number): number {
        if (credit <= 0) {
            return 0;
        }
        if (credit <= creditCristalValues[0]) {
            return creditCristalCost[0];
        }
        if (credit >= creditCristalValues[6]) {
            return creditCristalCost[6];
        }
        for (let i = 1; i < creditCristalValues.length; i++) {
            if (credit < creditCristalValues[i]) {
                const num = creditCristalValues[i - 1];
                const num2 = creditCristalValues[i];
                const num3 = credit - num;
                const num4 = num2 - num;
                const num5 = creditCristalCost[i] - creditCristalCost[i - 1];
                const num6 = num3 * num5 / num4;
                return creditCristalCost[i - 1] + num6;
            }
        }
        return creditCristalCost[6];
    }

    static hydrogen2crystals(hydrogen: number): number {
        if (hydrogen <= 0) {
            return 0;
        }
        if (hydrogen <= hydrogenCristalValues[0]) {
            return hydrogenCristalCost[0];
        }
        if (hydrogen >= hydrogenCristalValues[5]) {
            return hydrogenCristalCost[5];
        }
        for (let i = 1; i < hydrogenCristalValues.length; i++) {
            if (hydrogen < hydrogenCristalValues[i]) {
                const num = hydrogenCristalValues[i - 1];
                const num2 = hydrogenCristalValues[i];
                const num3 = hydrogen - num;
                const num4 = num2 - num;
                const num5 = hydrogenCristalCost[i] - hydrogenCristalCost[i - 1];
                const num6 = num3 * num5 / num4;
                return hydrogenCristalCost[i - 1] + num6;
            }
        }
        return hydrogenCristalCost[5];
    }

    static crystals2sec(crystals: number): number {
        if (crystals <= 0) {
            return 0;
        }
        if (crystals < timeCristalCost[0]) {
            return timeCristalValues[0];
        }
        for (let i = 1; i < timeCristalCost.length; i++) {
            if (crystals < timeCristalCost[i]) {
                const num = timeCristalCost[i] - timeCristalCost[i - 1];
                const num2 = crystals - timeCristalCost[i - 1];
                const num3 = timeCristalValues[i] - timeCristalValues[i - 1];
                const num4 = num2 * num3;
                return timeCristalValues[i - 1] + num4 / num;
            }
        }
        return timeCristalValues[timeCristalValues.length - 1];
    }

    static crystals2credit(crystals: number): number {
        if (crystals <= 0) {
            return 0;
        }
        if (crystals <= creditCristalCost[0]) {
            return creditCristalValues[0];
        }
        if (crystals >= creditCristalCost[6]) {
            return creditCristalValues[6];
        }
        for (let i = 1; i < creditCristalCost.length; i++) {
            if (crystals < creditCristalCost[i]) {
                const num = creditCristalCost[i - 1];
                const num2 = creditCristalCost[i];
                const num3 = crystals - num;
                const num4 = num2 - num;
                const num5 = creditCristalValues[i] - creditCristalValues[i - 1];
                const num6 = num3 * num5 / num4;
                return creditCristalValues[i - 1] + num6;
            }
        }
        return creditCristalValues[6];
    }

    static crystals2hydrogen(crystals: number): number {
        if (crystals <= 0) {
            return 0;
        }
        if (crystals <= hydrogenCristalCost[0]) {
            return hydrogenCristalValues[0];
        }
        if (crystals >= hydrogenCristalCost[5]) {
            return hydrogenCristalValues[5];
        }
        for (let i = 1; i < hydrogenCristalCost.length; i++) {
            if (crystals < hydrogenCristalCost[i]) {
                const num = hydrogenCristalCost[i - 1];
                const num2 = hydrogenCristalCost[i];
                const num3 = crystals - num;
                const num4 = num2 - num;
                const num5 = hydrogenCristalValues[i] - hydrogenCristalValues[i - 1];
                const num6 = num3 * num5 / num4;
                return hydrogenCristalValues[i - 1] + num6;
            }
        }
        return hydrogenCristalValues[5];
    }
}

function getByPrefixKey(p: string): [number[], number[]] {
    const keys = Object.keys(globals).filter((k) => k.startsWith(p));

    return [
        keys.map((k) => parseInt(k.replace(p, ''))),
        keys.map((k) => (globals as Record<string, unknown>)[k] as number),
    ];
}
