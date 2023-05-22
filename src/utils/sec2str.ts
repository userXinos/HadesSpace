import i18n from '@Utils/Vue/i18n';

const { t } = i18n.global;

export default function(sec: number) {
    const result = [];
    const days = Math.trunc(sec / 86400);
    const hours = Math.trunc((sec % 86400) / 3600);
    const minutes = Math.trunc((sec % 3600) / 60);
    const seconds = Math.trunc(sec % 60);

    if (days != 0) result.push(`${days}${t('TID_DAY_ABBREVIATION')}`);
    if (hours != 0) result.push(`${hours}${t('TID_HOUR_ABBREVIATION')}`);
    if (minutes != 0) result.push(`${minutes}${t('TID_MINUTE_ABBREVIATION')}`);
    if (seconds != 0) result.push(`${seconds}${t('TID_SECOND_ABBREVIATION')}`);
    if (!result.length && sec) result.push(`${sec}${t('TID_SECOND_ABBREVIATION')}`);

    return result.join(' ');
}
