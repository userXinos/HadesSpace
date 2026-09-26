import { z } from 'zod';

import sec2str from '../sec2str.js';

import { READ_ONLY } from './shared.js';

const UNITS = ['crystals', 'seconds', 'credits', 'hydrogen'];

// The app's own CrystalConverter names the two directions separately, so the unit
// table carries both method names instead of branching on the unit at each call site.
const CONVERTERS = {
    seconds: { toCrystals: 'sec2crystals', fromCrystals: 'crystals2sec' },
    credits: { toCrystals: 'credit2crystals', fromCrystals: 'crystals2credit' },
    hydrogen: { toCrystals: 'hydrogen2crystals', fromCrystals: 'crystals2hydrogen' },
};

function roundToTwo(num) {
    return +`${Math.round(Number(`${num}e+2`))}e-2`;
}

function displayOf(unit, value) {
    if (value === 0) return '0';
    return unit === 'seconds' ? `${sec2str(value)} (${value} s)` : String(value);
}

export function convert(CrystalConverter, { amount, from, to }) {
    const value = from === 'crystals' ?
        CrystalConverter[CONVERTERS[to].fromCrystals](amount) :
        CrystalConverter[CONVERTERS[from].toCrystals](amount);

    return { from, amount, to, value, rounded: roundToTwo(value), display: displayOf(to, value) };
}

export function registerConvertCrystals(server, CrystalConverter) {
    server.registerTool(
        'convert_crystals',
        {
            title: 'Convert crystals, time, credits and hydrogen',
            description:
            'REQUIRED for every crystal/time/credit/hydrogen conversion. ' +
            'Do NOT compute, estimate, interpolate, extrapolate, or round ratios yourself — the curve is piecewise and non-linear, ' +
            'so any value you derive from known points is WRONG by construction. ' +
            'If you need a value, call this tool with the exact amount. ' +
            'Calling it multiple times with different amounts is correct; guessing is not. ' +
            'Amounts outside the priced range are clamped to the nearest limit and are not real prices.',
            annotations: READ_ONLY,
            inputSchema: {
                amount: z.number().finite().describe('the value to convert, non-negative'),
                from: z.enum(UNITS).describe('unit of the input amount'),
                to: z.enum(UNITS).describe('unit to convert the amount to'),
            },
            outputSchema: {
                from: z.string(),
                amount: z.number(),
                to: z.string(),
                value: z.number(),
                rounded: z.number(),
                display: z.string(),
            },
        },
        async ({ amount, from, to }) => {
            if (!Number.isFinite(amount) || amount < 0) {
                throw new Error(`amount must be a non-negative number, got ${amount}`);
            }
            if (from === to) {
                throw new Error(`from and to are both "${from}", pick a different unit to convert to`);
            }

            const result = convert(CrystalConverter, { amount, from, to });
            return { content: [{ type: 'text', text: `**${result.amount} ${result.from}** -> ${result.display}` }], structuredContent: result };
        },
    );
}
