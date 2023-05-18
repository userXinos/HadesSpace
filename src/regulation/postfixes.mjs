const e = [
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

export const regex = new RegExp(`_?(${e.join('|')})$`);
export default e;
