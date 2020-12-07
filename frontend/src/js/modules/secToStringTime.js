export default function(getStr, secIn) {
  let result = '';
  const sec = parseInt(secIn, 10);

  const days = Math.round(sec / 86400);
  const hours = Math.round((sec - (days * 86400)) / 3600);
  const minutes = Math.round((sec - (hours * 3600 + days * 86400)) / 60);
  const seconds = sec - (days * 86400 + hours * 3600 + minutes * 60);

  if (days > 0) result += `${days}${getStr('days')}`;
  if (hours > 0) result += ` ${hours}${getStr('hours')}`;
  if (minutes > 0) result += ` ${minutes}${getStr('min')}`;
  if (seconds > 0) result += ` ${seconds}${getStr('sec')}`;
  if (secIn < 60) result = `${secIn}${getStr('sec')}`;
  return result || 0;
}
