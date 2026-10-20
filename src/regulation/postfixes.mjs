const postfixes = [
    'RS',
    'WS',
    'BS',
    'BLS',
    'BASE',
    'Base', // yes...
    'YS',
    'PVP',
    'PVE',
    'PvE',
    'PvP',
    'QS',
];

export const regex = new RegExp(`_?(${postfixes.join('|')})$`);
export default postfixes;
