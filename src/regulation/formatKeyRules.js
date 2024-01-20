import i18n from '@Utils/Vue/i18n';
import locKeys from '@Regulation/locKeys.mjs';
import { regex as FIX_KEY_REGEX } from '@Regulation/postfixes.mjs';

const { t } = i18n.global;

export default [
    [
        ['RushRSHydroDc'],
        (v) => `${t(locKeys[v])} (${t('RS')})`,
    ],
    [
        ['RushYSSpeedIncr'],
        (v) => `${t(locKeys[v])} (${t('YS')})`,
    ],
    [
        ['YSMaxGenesis'],
        (v) => `${t(locKeys[v])} (${t('YS')})`,
    ],
    [
        ['DPS_WS'],
        () => `${t(locKeys['DPH'])} (${t('WS')})`,
    ],
    [
        ['RampDPS0', 'RampDPS1', 'RampDPS2', 'RampDPS_BLS0', 'RampDPS_BLS1', 'RampDPS_BLS2', 'RampDPS_WS0', 'RampDPS_WS1', 'RampDPS_WS2'],
        (v) => {
            const stage = v.slice(-1);
            let str = t('TID_MODULE_DESCR_STAGE_DPS', [stage]);

            if (v.includes('_')) {
                const star = FIX_KEY_REGEX.exec(v.slice(0, -1))?.[1];
                str += ` (${t(locKeys[star] || star)})`;
            }
            return str;
        },
    ],
];


