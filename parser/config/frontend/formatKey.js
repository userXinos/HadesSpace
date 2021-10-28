export default [
  [
    ['blueprintsSupport'],
    (v, o) => `${o.getStr('lvl')} ${v++}`,
  ],
  [
    ['blueprintsCombat', 'blueprintsUtility'],
    (v, o) => `${o.getStr('lvl')} ${v}`,
  ],
  [
    ['WhiteStar'],
    (v, o) => {
      if (/Score\dThresholds/.test(v)) {
        return o.getStr('ScoreNThresholds') + ' ' + v.replace(/Score(\d)Thresholds/, '$1');
      } else {
        return o.getStr(v);
      }
    },
  ],
];
