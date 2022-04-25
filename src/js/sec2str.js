import i18n from '@Scripts/Vue/i18n.js';

const { t } = i18n.global;

export default function(secIn) {
    let result = '';
    const sec = parseInt(secIn, 10);

    const days = Math.floor(sec / 86400);
    const hours = Math.floor((sec - (days * 86400)) / 3600);
    const minutes = Math.floor((sec - (hours * 3600 + days * 86400)) / 60);
    const seconds = sec - (days * 86400 + hours * 3600 + minutes * 60);

    if (days > 0) result += `${days}${t('TID_DAY_ABBREVIATION')}`;
    if (hours > 0) result += ` ${hours}${t('TID_HOUR_ABBREVIATION')}`;
    if (minutes > 0) result += ` ${minutes}${t('TID_MINUTE_ABBREVIATION')}`;
    if (seconds > 0) result += ` ${seconds}${t('TID_SECOND_ABBREVIATION')}`;
    if (secIn < 60) result = `${secIn}${t('TID_SECOND_ABBREVIATION')}`;

    return result || 0;
}
