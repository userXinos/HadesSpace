import globals from '@Data/globals';

const NUM_GLOBALS = 4;

const timeToPremiumCurrencyTimeValues = [];
const timeToPremiumCurrencyCosts = [];

for (let i = 0; i < NUM_GLOBALS; i++) {
    timeToPremiumCurrencyTimeValues[i] = globals[`PremiumCurrencyTimeValue${i}`];
    timeToPremiumCurrencyCosts[i] = globals[`PremiumCurrencyToTimePrice${i}`];
}

export function sec2crystals(sec) {
    if (sec <= 0) {
        return 0;
    }
    if (sec < timeToPremiumCurrencyTimeValues[0]) {
        return timeToPremiumCurrencyCosts[0];
    }
    for (let i = 1; i < NUM_GLOBALS; i++) {
        if (sec < timeToPremiumCurrencyTimeValues[i]) {
            const num = timeToPremiumCurrencyTimeValues[i] - timeToPremiumCurrencyTimeValues[i - 1];
            const num2 = sec - timeToPremiumCurrencyTimeValues[i - 1];
            const num3 = timeToPremiumCurrencyCosts[i] - timeToPremiumCurrencyCosts[i - 1];
            const num4 = num2 * num3;
            return timeToPremiumCurrencyCosts[i - 1] + num4 / num;
        }
    }
    return timeToPremiumCurrencyCosts[3];
}
