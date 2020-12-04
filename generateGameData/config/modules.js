export const starHeaders = [
  'EffectDurationx10',
  'ActivationDelay',
  'ActivationPrep',
  'MaxDPSTime',
  'APTPIOTTP',
  'DisableTime',
  'ProximityTriggerSec',
  'RelicLoad',
  'SpawnLifetime',
];
export const combineKeys = { // TODO
  FlagshipDartBarrage: 'FlagshipWeaponModule',
  FlagshipAreaShield: 'FlagshipShieldModule',
};
export const starsOrder = ['YS', 'RS', 'WS', 'BS'];
export const excludeKeysStringStar = ['NoCerbBondTeleportPRS'];
export function otherFix(obj) {
  obj.TimeWarp.Icon = 'Mod_TimeWarp_Icon'; // ошибка в таблице, 'w' в иконках в верхнем регистре
  obj['MiningBoost']['WhiteStarScore'].unshift(0); // ошибка в таблице, не хватает "0"
  obj['Destiny']['WhiteStarScore'].unshift(0); // ошибка в таблице, не хватает "0"
  obj['MiningDrone']['MiningSpeed'] = [29.1, 33.3, 37.5, 41.7, 45.8, 52.2, 58.8, 65.2, 74.1, 85.7]; // хз как считать это
  obj['FlagshipDartBarrage']['TID_Description'] = obj['FlagshipDartBarrage']['TID_Description'][0]; // какие-то буквы лишние в таблице
}
