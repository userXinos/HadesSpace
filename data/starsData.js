// generated by e:\projects\HadesStarData\generateGameData.js
// at Tue May 19 2020

let data = {
  YellowStar: {
    Name: "YellowStar",
    TID: "TID_YELLOW_STAR",
    TID_Description: "TID_YELLOW_STAR_DESCR",
    Icon: "star_yellow",
    maxLevel: 1,
  },
  RedStar: {
    Name: "RedStar",
    TID: "TID_RED_STAR",
    TID_Description: "TID_RED_STAR_INFO",
    Icon: "star_red",
    HydrogenSearchCost: [0, 50, 100, 225, 350, 500, 750, 1200, 1800, 2500, 3500, 4000],
    MaxInfluence: [" ", 150, 500, 1500, 3000, 6000, 11000, 18000, 26000, 36000, 80000, 140000],
    RegularInfuenceRange: [" ! ", "0!100", "100!400", "400!1200", "1200!2500", "2500!5000", "5500!10000", "10000!16000", "16000!24000", "24000!34000", "34000!60000", "60000!120000"],
    MaxInfluenceGain: [" ", 30, 40, 50, 60, 70, 80, 100, 125, 150, 200, 200],
    MaxInfluenceLoss: [" ", 5, 10, 15, 15, 20, 20, 25, 25, 30, 30, 30],
    InfluenceAwardThreshold: [" ! ", "10!30", "20!80", "40!225", "100!600", "200!1500", "400!2400", "600!3200", "800!5200", "1000!8000", "1200!13500", "2500!32000"],
    NumMaxPlanets: [" ", 2, 2, 3, 3, 4, 4, 4, 4, 5, 6, 7],
    NumPlayersWithAccess: [1, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4],
    CRAsteroidAmt: [0, 0, 4000, 10000, 20000, 50000, 75000, 100000, 150000, 225000, 300000, 400000],
    MaxBattleshipsPerPlayer: [1, 1, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3],
    DestroyersToSpawn: [" ", " ", " ", " ", " ", " ", 1, 2, 3, 4, 5, 6],
    MinBombers: [" ", " ", " ", " ", " ", " ", " ", 3, 5, 6, 9, 10],
    maxLevel: 12,
    Lifetime: 900,
    SafeInterceptorInPublicRS: 1,
    NoCerbBondTeleportPRS: 1,
    PubRSEMPReqEnemies: 1,
  },
  BlueStar: {
    Name: "BlueStar",
    TID: "TID_BLUE_STAR",
    TID_Description: "TID_BLUE_STAR_INFO",
    Icon: "star_blue",
    NumPlayersWithAccess: 5,
    maxLevel: 5,
    Lifetime: 325,
    StarSectorDPS: 150,
    BlueStar_CRRewardRate: 90,
    BlueStar_CRRewardWinLimitPeriod: 86400,
    BlueStar_HydroPctPerPos: [10, 6, 2.5, 1, 0],
    BlueStar_MaxHydroPerDayPct: 25,
    BlueStar_Fragments: [12, 8, 5, 3, 0],
    BlueStar_SPFactor: 25,
  },
  GreenStar: {
    Name: "GreenStar",
    TID: "TID_TODO",
    TID_Description: "TID_TODO",
    Icon: "star_yellow",
    maxLevel: 1,
  },
  WhiteStar: {
    Name: "WhiteStar",
    TID: "TID_WHITE_STAR",
    TID_Description: "TID_WHITE_STAR_INFO",
    Icon: "star_white",
    WSBucketSizes: [5, 10, 15],
    Score1Thresholds: [5000, 30000, 105000],
    Score2Thresholds: [15000, 60000, 240000],
    Score3Thresholds: [40000, 90000, 360000],
    PlayerNumberBrackets: [8, 12, 16],
    maxLevel: 3,
    TimeSlowdownFactor: 600,
    PreparationTimeHours: 12,
    Lifetime: 432000,
    WSMaxBSPerPlayer: 1,
    WSMaxOtherPerPlayer: 1,
    WSLostBSTimeCooldown: 64800,
    WSLostOtherTimeCooldown: 64800,
    WSJumpBSTimeCooldown: 7200,
    WSJumpOtherTimeCooldown: 7200,
    WSScoreDamageModifier: 1,
    WSScoreMiningModifier: 5,
    WSScoreTransportModifier: 800,
  },
  OrangeStar: {
    Name: "OrangeStar",
    TID: "TID_TODO",
    TID_Description: "TID_TODO",
    Icon: "star_yellow",
    HydrogenSearchCost: 500,
    InfluenceAwardThreshold_Max: 1700,
    MaxInfluenceGain: 50,
    MaxInfluenceLoss: 15,
    NumMaxPlanets: 1,
    NumPlayersWithAccess: 2,
    MaxBattleshipsPerPlayer: 3,
    maxLevel: 1,
    Lifetime: 900,
    MinPlayers: 2,
    RegularInfuenceRange_Min: 2900,
    RegularInfuenceRange_Max: 4000,
    InfluenceAwardThreshold_Min: 500,
  },
  RedStarLarge: {
    Name: "RedStarLarge",
    TID: "TID_RED_STAR",
    TID_Description: "TID_RED_STAR_INFO",
    Icon: "star_red",
    maxLevel: 1,
  },
  Home: {
    Name: "Home",
    NumPlayersWithAccess: 0,
    maxLevel: 1,
    Lifetime: 0,
  },
};

let byTypes = {
  default: ["YellowStar", "RedStar", "BlueStar", "GreenStar", "WhiteStar", "OrangeStar", "RedStarLarge", "Home"],
};

export { data, byTypes };
