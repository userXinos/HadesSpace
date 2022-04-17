export default [
    [
        ['valueX', 'valueY', 'valueZ'],
        (v, { $t }) => $t('VALUE', [v.slice(5)]),
        ['PlayerGoals'],
    ],
];
