import { describe, expect, test } from '@jest/globals';
import tableMask from '@Utils/tableMask';

const raw = {
    head: {
        projectile: ['HP_PvP', 'DamagePvE', 'DamagePvP'],
        default: ['UnlockBlueprints', 'UnlockPrice', 'UnlockTime'],
    },
    body: {
        projectile: [
            [300, 600, 1000, 1500, 2000],
            [3000, 6000, 10000, 15000, 20000],
            [6000, 9000, 12000, 16000, 20000],
        ],
        default: [
            [1000, 8000, 25000, 50000, 100000],
            [2000000, 2250000, 2500000, 3000000, 3500000],
            [1036800, 1036800, 1209600, 1382400, 1728000],
        ],
    },
};


describe('tableMask', () => {
    test('enable mergeCells', () => {
        expect(tableMask(raw, true)).toStrictEqual({
            head: [
                [
                    { value: 'UnlockBlueprints', rowspan: 2, colspan: 1 },
                    { value: 'UnlockPrice', rowspan: 2, colspan: 1 },
                    { value: 'UnlockTime', rowspan: 2, colspan: 1 },
                    { value: 'projectile', colspan: 3 },
                ],
                [
                    { value: 'HP_PvP' },
                    { value: 'DamagePvE' },
                    { value: 'DamagePvP' },
                ],
            ],
            body: [
                [
                    { key: 'UnlockBlueprints', value: 1000, rowspan: 1, colspan: 1, hide: false },
                    { key: 'UnlockPrice', value: 2000000, rowspan: 1, colspan: 1, hide: false },
                    { key: 'UnlockTime', value: 1036800, rowspan: 2, colspan: 1, hide: false },
                    { key: 'HP_PvP', value: 300, rowspan: 1, colspan: 1, hide: false },
                    { key: 'DamagePvE', value: 3000, rowspan: 1, colspan: 1, hide: false },
                    { key: 'DamagePvP', value: 6000, rowspan: 1, colspan: 1, hide: false },
                ],
                [
                    { key: 'UnlockBlueprints', value: 8000, rowspan: 1, colspan: 1, hide: false },
                    { key: 'UnlockPrice', value: 2250000, rowspan: 1, colspan: 1, hide: false },
                    { key: 'UnlockTime', value: 1036800, rowspan: 1, colspan: 1, hide: true },
                    { key: 'HP_PvP', value: 600, rowspan: 1, colspan: 1, hide: false },
                    { key: 'DamagePvE', value: 6000, rowspan: 1, colspan: 1, hide: false },
                    { key: 'DamagePvP', value: 9000, rowspan: 1, colspan: 1, hide: false },
                ],
                [
                    { key: 'UnlockBlueprints', value: 25000, rowspan: 1, colspan: 1, hide: false },
                    { key: 'UnlockPrice', value: 2500000, rowspan: 1, colspan: 1, hide: false },
                    { key: 'UnlockTime', value: 1209600, rowspan: 1, colspan: 1, hide: false },
                    { key: 'HP_PvP', value: 1000, rowspan: 1, colspan: 1, hide: false },
                    { key: 'DamagePvE', value: 10000, rowspan: 1, colspan: 1, hide: false },
                    { key: 'DamagePvP', value: 12000, rowspan: 1, colspan: 1, hide: false },
                ],
                [
                    { key: 'UnlockBlueprints', value: 50000, rowspan: 1, colspan: 1, hide: false },
                    { key: 'UnlockPrice', value: 3000000, rowspan: 1, colspan: 1, hide: false },
                    { key: 'UnlockTime', value: 1382400, rowspan: 1, colspan: 1, hide: false },
                    { key: 'HP_PvP', value: 1500, rowspan: 1, colspan: 1, hide: false },
                    { key: 'DamagePvE', value: 15000, rowspan: 1, colspan: 1, hide: false },
                    { key: 'DamagePvP', value: 16000, rowspan: 1, colspan: 1, hide: false },
                ],
                [
                    { key: 'UnlockBlueprints', value: 100000, rowspan: 1, colspan: 1, hide: false },
                    { key: 'UnlockPrice', value: 3500000, rowspan: 1, colspan: 1, hide: false },
                    { key: 'UnlockTime', value: 1728000, rowspan: 1, colspan: 1, hide: false },
                    { key: 'HP_PvP', value: 2000, rowspan: 1, colspan: 1, hide: false },
                    { key: 'DamagePvE', value: 20000, rowspan: 1, colspan: 1, hide: false },
                    { key: 'DamagePvP', value: 20000, rowspan: 1, colspan: 1, hide: false },
                ],
            ],
        });
    });

    test('disable mergeCells', () => {
        expect(tableMask(raw, false)).toStrictEqual({
            head: [
                [
                    { value: 'UnlockBlueprints', rowspan: 2, colspan: 1 },
                    { value: 'UnlockPrice', rowspan: 2, colspan: 1 },
                    { value: 'UnlockTime', rowspan: 2, colspan: 1 },
                    { value: 'projectile', colspan: 3 },
                ],
                [
                    { value: 'HP_PvP' },
                    { value: 'DamagePvE' },
                    { value: 'DamagePvP' },
                ],
            ],
            body: [
                [
                    { key: 'UnlockBlueprints', value: 1000, rowspan: 1, colspan: 1, hide: false },
                    { key: 'UnlockPrice', value: 2000000, rowspan: 1, colspan: 1, hide: false },
                    { key: 'UnlockTime', value: 1036800, rowspan: 1, colspan: 1, hide: false },
                    { key: 'HP_PvP', value: 300, rowspan: 1, colspan: 1, hide: false },
                    { key: 'DamagePvE', value: 3000, rowspan: 1, colspan: 1, hide: false },
                    { key: 'DamagePvP', value: 6000, rowspan: 1, colspan: 1, hide: false },
                ],
                [
                    { key: 'UnlockBlueprints', value: 8000, rowspan: 1, colspan: 1, hide: false },
                    { key: 'UnlockPrice', value: 2250000, rowspan: 1, colspan: 1, hide: false },
                    { key: 'UnlockTime', value: 1036800, rowspan: 1, colspan: 1, hide: false },
                    { key: 'HP_PvP', value: 600, rowspan: 1, colspan: 1, hide: false },
                    { key: 'DamagePvE', value: 6000, rowspan: 1, colspan: 1, hide: false },
                    { key: 'DamagePvP', value: 9000, rowspan: 1, colspan: 1, hide: false },
                ],
                [
                    { key: 'UnlockBlueprints', value: 25000, rowspan: 1, colspan: 1, hide: false },
                    { key: 'UnlockPrice', value: 2500000, rowspan: 1, colspan: 1, hide: false },
                    { key: 'UnlockTime', value: 1209600, rowspan: 1, colspan: 1, hide: false },
                    { key: 'HP_PvP', value: 1000, rowspan: 1, colspan: 1, hide: false },
                    { key: 'DamagePvE', value: 10000, rowspan: 1, colspan: 1, hide: false },
                    { key: 'DamagePvP', value: 12000, rowspan: 1, colspan: 1, hide: false },
                ],
                [
                    { key: 'UnlockBlueprints', value: 50000, rowspan: 1, colspan: 1, hide: false },
                    { key: 'UnlockPrice', value: 3000000, rowspan: 1, colspan: 1, hide: false },
                    { key: 'UnlockTime', value: 1382400, rowspan: 1, colspan: 1, hide: false },
                    { key: 'HP_PvP', value: 1500, rowspan: 1, colspan: 1, hide: false },
                    { key: 'DamagePvE', value: 15000, rowspan: 1, colspan: 1, hide: false },
                    { key: 'DamagePvP', value: 16000, rowspan: 1, colspan: 1, hide: false },
                ],
                [
                    { key: 'UnlockBlueprints', value: 100000, rowspan: 1, colspan: 1, hide: false },
                    { key: 'UnlockPrice', value: 3500000, rowspan: 1, colspan: 1, hide: false },
                    { key: 'UnlockTime', value: 1728000, rowspan: 1, colspan: 1, hide: false },
                    { key: 'HP_PvP', value: 2000, rowspan: 1, colspan: 1, hide: false },
                    { key: 'DamagePvE', value: 20000, rowspan: 1, colspan: 1, hide: false },
                    { key: 'DamagePvP', value: 20000, rowspan: 1, colspan: 1, hide: false },
                ],
            ],
        });
    });
});
