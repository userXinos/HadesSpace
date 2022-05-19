import i18n from '@/js/Vue/i18n';

const { t } = i18n.global;

export default [
    [
        ['valueX', 'valueY', 'valueZ'],
        (v) => t('VALUE', [v.slice(5)]),
        ['PlayerGoals'],
    ],
];
