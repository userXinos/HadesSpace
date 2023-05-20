const postfixes = [
    'RS',
    'WS',
    'BS',
    'BLS',
    'BASE',
    'YS',
    'NonYS',
    'PVP',
    'PVE',
    'PvE',
    'PvP'
];

export const regex = new RegExp(`_?(${postfixes.join('|')})$`);
export default postfixes;