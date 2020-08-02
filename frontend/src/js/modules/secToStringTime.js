export default function(getStr, sec) {
  let result = '';
  sec = parseInt(sec, 10);
  const days = Math.floor(sec / 86400);
  const hours = Math.floor((sec - (days * 86400)) / 3600);
  const minutes = Math.floor((sec - (hours * 3600 + days * 86400)) / 60);
  const seconds = sec - (days * 86400 + hours * 3600 + minutes * 60);

  if (days > 0) result += `${days}${getStr('days')}`;
  if (hours > 0) result += ` ${hours}${getStr('hours')}`;
  if (minutes > 0) result += ` ${minutes}${getStr('min')}`;
  if (seconds > 0) result += ` ${seconds}${getStr('sec')}`;
  return result || 0;
}
