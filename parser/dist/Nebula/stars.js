/**
 * @GeneratedBy Stars.js runner
 * @OriginalFile raw/Nebula/stars.csv
 * @UsedFiles solar_system_gen_data.csv, globals.csv
 */

export default {
    YellowStar: {
        Name: "YellowStar",
        HexGridSizeX: 3,
        HexGridSizeY: 3,
        HexGridMaxRadius: 3,
        HexCellEdgeSize: 4000,
        SpeedModifierPct: 300,
        Lifetime: 0,
        NumPlayersWithAccess: 0,
        IsHome: 1,
        Star: "YellowStar",
        TID: "TID_YELLOW_STAR",
        TID_Description: "TID_YELLOW_STAR_DESCR",
        ConceptImage: "portrait_YellowStar",
        AppearanceModels: [
            "Home_Star",
            "Home_Star_1",
            "Home_Star_2",
            "Home_Star_3",
            "Home_Star_4",
            "Home_Star_5",
            "Home_Star_6",
            "Home_Star_7",
            "Home_Star_8",
            "Home_Star_9",
            "Home_Star_10",
            "Home_Star_11",
            "Home_Star_12",
            "Home_Star_13",
            "Home_Star_14",
        ],
        YSCommonVariations: 9,
        SecurityRating: 0,
        Icon: "star_yellow",
    },
    RedStar: {
        Name: "RedStar",
        TID: "TID_RED_STAR",
        TID_Description: "TID_RED_STAR_INFO",
        ConceptImage: "portrait_RedStar",
        AppearanceModels: [
            null,
            "Red_Star",
            "Red_Star_1",
            "Red_Star_2",
            "Red_Star_3",
            "Red_Star_4",
            "Red_Star_5",
            "Red_Star_6",
            "Red_Star_7",
            "Red_Star_8",
            "Red_Star_9",
            "Red_Star_10",
            "Red_Star_11",
        ],
        SecurityRating: 0,
        Icon: "star_red",
        SupernovaFX: "RedStarExplode_FX",
        SupernovaFXSpawnTimeSec: 3,
        FixedSector: [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            "TutorialRedStar",
            "Mine_Risk0_Lv1",
        ],
        HexGridSizeX: [0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        HexGridSizeY: [1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3],
        HexGridMaxRadius: [1, 1, 1, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3],
        HexCellEdgeSize: [1500, 1650, 2500, 2000, 2500, 2250, 2300, 2400, 2600, 2900, 2300, 2400, 2600],
        SpeedModifierPct: 200,
        Lifetime: 900,
        NumPlayersWithAccess: [1, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
        MaxBattleshipsPerPlayer: [1, 1, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3],
        Star: "RedStar",
        HydrogenSearchCost: [0, 50, 100, 250, 500, 750, 1000, 1200, 1800, 2500, 3500, 4000, 4500],
        CroidAmt: [0, 0, 4000, 10000, 20000, 50000, 75000, 100000, 150000, 225000, 300000, 400000, 500000],
        DisableRSSearchDuringTutorial: 1,
        WarnOnSRSPlacementMinNumNeighbors: 3,
        PrivateRSEventClientDisplayMode: 2,
        SafeInterceptorInPublicRS: 1,
        NoCerbBondTeleportPRS: 1,
        RSPublicLateJoin_MaxTimeAvailable: 300,
        RSPublicLateJoin_MaxTimeOffTotal: 180,
        RSPublicLateJoin_ClientCacheExpiry: 30,
        RSPublicLateJoin_MinStarLevel: 5,
        MinDarkRSLevel: 5,
        DRSArtifactBonus: 50,
        NumMaxPlanets: [null, 2, 2, 3, 3, 4, 4, 4, 4, 4, 5, 5, 5],
        LowerPlanetsMinLevel: [null, 1, 1, 1, 1, 2, 2, 3, 4, 5, 6, 6, 7],
        MaxInfluenceLoss: [null, 5, 10, 15, 15, 20, 20, 25, 25, 30, 30, 30, 30],
        MaxInfluenceGain: [null, 30, 40, 50, 60, 70, 80, 100, 125, 150, 200, 200, 200],
        DestroyersToSpawn: [null, null, null, null, null, null, 4, 4, 4, 4, 5, 5, 5],
        MinBombers: [null, null, null, null, null, null, null, 3, 5, 6, 9, 11, 11],
        MaxPlanetBomberCoverage: [null, null, null, null, null, null, null, 3, 3, 4, 5, 6, 6],
        MaxGateBomberCoverage: [null, null, null, null, null, null, null, 1, 2, 2, 3, 4, 5],
        GhostSpawnSecs: [
            90,
            80,
            70,
            65,
            60,
            60,
            60,
            50,
            50,
            45,
            45,
            45,
            40,
            40,
            35,
            35,
            35,
            30,
            [90, 80, 70, 65, 60, 60, 60, 50, 50, 45, 45, 45, 40, 40, 35, 35, 35, 30],
            [90, 80, 70, 65, 60, 60, 60, 50, 50, 45, 45, 45, 40, 40, 35, 35, 35, 30],
        ],
        GhostSpawner: [null, null, null, null, null, null, null, null, null, null, 0, 1, 2],
        NumLowerPlanets: [null, 0, 1, 2, [2, 3], [2, 3], [2, 3], [2, 3], [2, 3], [2, 3], [4, 5], [4, 5], [4, 5]],
        MedRiskMining: [
            null,
            [1, 2],
            [1, 3],
            [2, 4],
            [4, 5],
            [5, 6],
            [5, 6],
            [6, 7],
            [6, 7],
            7,
            [9, 12],
            [9, 12],
            [9, 12],
        ],
        HighRiskMining: [null, 0, 1, [1, 2], [2, 4], [3, 4], [3, 4], [2, 3], [2, 3], 4, [6, 8], [6, 8], [6, 8]],
        Influence: [
            null,
            [0, 150],
            [80, 500],
            [550, 1500],
            [1100, 3000],
            [1900, 6000],
            [2900, 11000],
            [3900, 18000],
            [6900, 26000],
            [9900, 36000],
            [12400, 80000],
            [15000, 140000],
            [17500, 180000],
        ],
        RegularInfuenceRange: [
            null,
            [0, 100],
            [100, 400],
            [400, 1200],
            [1200, 2500],
            [2500, 5000],
            [5500, 10000],
            [10000, 16000],
            [16000, 24000],
            [24000, 34000],
            [34000, 60000],
            [60000, 120000],
            [120000, 160000],
        ],
        InfluenceAwardThreshold: [
            null,
            [10, 30],
            [20, 80],
            [40, 225],
            [100, 600],
            [200, 1500],
            [400, 2400],
            [600, 3200],
            [800, 5200],
            [1000, 8000],
            [1200, 13500],
            [2500, 32000],
            [5000, 55000],
        ],
    },
    BlueStar: {
        Name: "BlueStar",
        TID: "TID_BLUE_STAR",
        TID_Description: "TID_BLUE_STAR_INFO",
        ConceptImage: "portrait_BlueStar",
        AppearanceModels: "Blue_Star",
        SecurityRating: 2,
        Icon: "star_blue",
        SupernovaFX: "BlueStarExplode_FX",
        SupernovaFXSpawnTimeSec: 3,
        HexGridSizeX: 3,
        HexGridSizeY: 3,
        HexGridMaxRadius: 3,
        HexCellEdgeSize: 1900,
        SpeedModifierPct: 200,
        Lifetime: 220,
        NumPlayersWithAccess: 5,
        MaxBattleshipsPerPlayer: 3,
        Star: "BlueStar",
        HydrogenSearchCost: 750,
        CollapsePeriod: 20,
        InitialCollapseAreaSize: 14200,
        CycleEndTimes: [80, 180, 220],
        CycleEndCollapseAreaSize: [7000, 1600, 0],
        StarSectorDPS: 150,
        StarSectorNavpoints: 3,
        StarSectorNavpointDistance: [1000, 1300],
        BlueStar_CRRewardWinLimit: 1,
        BlueStar_CRRewardWinLimitPeriod: 86400,
        BlueStar_HydroPctPerMatch: 10,
        BlueStar_HydroPctPerPos: [100, 60, 25, 10, 0],
        BlueStar_MaxHydroPerDayPct: 25,
        BlueStar_CreditPctPerPos: [100, 60, 30, 0, 0],
        BlueStar_RankedMatchesPerDay: 3,
        BlueStar_Fragments: [12, 8, 5, 3, 0],
        BlueStar_SPFactor: 25,
        MedRiskMining: [10, 14],
        HighRiskMining: [7, 9],
    },
    GreenStar: {
        Name: "GreenStar",
        TID: "TID_TODO",
        TID_Description: "TID_TODO",
        ConceptImage: "portrait_YellowStar",
        AppearanceModels: "Green_Star",
        SecurityRating: 0,
        Icon: "star_yellow",
    },
    WhiteStar: {
        Name: "WhiteStar",
        TID: "TID_WHITE_STAR",
        TID_Description: "TID_WHITE_STAR_INFO",
        ConceptImage: "portrait_WhiteStar",
        AppearanceModels: ["White_Star", "White_Star_02"],
        SecurityRating: 1,
        Icon: "star_white",
        TimeSlowdownFactor: 600,
        PreparationTimeHours: 12,
        SupernovaFX: "WhiteStarExplode_FX",
        SupernovaFXSpawnTimeSec: 7,
        HexGridSizeX: 3,
        HexGridSizeY: 3,
        HexGridMaxRadius: 3,
        HexCellEdgeSize: 2500,
        SpeedModifierPct: 200,
        Lifetime: 720,
        Star: "WhiteStar",
        PlayerNumberBrackets: 8,
        HQPlanetsPerBracket: [2, 3],
        LQPlanetsPerBracket: [2, 4],
        ExtraAsteroidSpawnTick: [2880, 5760, 5760],
        ExtraAsteroidSpawnRingDistance: [2, 1, 1],
        ExtraAsteroidSpawnAmt: [800, 3000, 3000],
        FleetDepartTimeInSeconds_WS: 60,
        MaxWaypointsWS: 5,
        WSMaxBSPerPlayer: 1,
        WSMaxOtherPerPlayer: 1,
        WSLostShipTimeCooldown: 64800,
        WSDisbandCooldown: 86400,
        WSJumpBSTimeCooldown: 7200,
        WSJumpOtherTimeCooldown: 7200,
        WSBucketSizes: [6, 12],
        WSHQAsteroidsPerBucket: [4, 6, 8],
        DontAllowUseOfEnemyWSGate: 1,
        BarrageMaxAdditionalEnemies_WS: 4,
        WSShipXPCollectEnabled: 0,
        WSShipMinXP: 1000,
        WSShipXPEventClientDisplayMode: 0,
        WSShipEventTopBrackets: [3, 20, 200],
        WSShipEventCRRewards: [8000, 3000, 1000],
        WSShipXPEventVersion: 2,
        WSScoreDamageModifier: 1,
        WSScoreMiningModifier: 5,
        WSScoreTransportModifier: 800,
        Thresholds: [
            [5000, 15000, 40000],
            [30000, 60000, 90000],
            [105000, 240000, 360000],
        ],
        HighRiskMining: [4, 6],
    },
    OrangeStar: {
        Name: "OrangeStar",
        TID: "TID_TODO",
        TID_Description: "TID_TODO",
        ConceptImage: "portrait_YellowStar",
        AppearanceModels: "Orange_Star",
        SecurityRating: 2,
        Icon: "star_yellow",
        HexGridSizeX: 1,
        HexGridSizeY: 1,
        HexGridMaxRadius: 1,
        HexCellEdgeSize: 2000,
        Lifetime: 900,
        MaxBattleshipsPerPlayer: 3,
        Star: "OrangeStar",
        HydrogenSearchCost: 500,
        NumMaxPlanets: 1,
        MaxInfluenceLoss: 15,
        MaxInfluenceGain: 50,
        Players: [2],
        NumLowerPlanets: [3, 4],
        MedRiskMining: [4, 5],
        HighRiskMining: [3, 4],
        RegularInfuenceRange: [2900, 4000],
        InfluenceAwardThreshold: [500, 1700],
    },
    RedStarLarge: {
        Name: "RedStarLarge",
        TID: "TID_RED_STAR",
        TID_Description: "TID_RED_STAR_INFO",
        ConceptImage: "portrait_RedStar",
        AppearanceModels: "Red_StarLarge",
        SecurityRating: 0,
        Icon: "star_red",
    },
    QuantumStar: {
        Name: "QuantumStar",
        TID: "TID_QUANTUM_STAR",
        TID_Description: "TID_QUANTUM_STAR_INFO",
        ConceptImage: "portrait_EmptySpace",
        AppearanceModels: "Quantum_Star_1",
        Icon: "star_dark",
        HexGridSizeX: [3, 2, 2],
        HexGridSizeY: [0, 0, 2],
        HexGridMaxRadius: [0, -2, 2],
        HexCellEdgeSize: [5000, 5000, 4000],
        Lifetime: 0,
        NumPlayersWithAccess: 0,
        Star: "QuantumStar",
        CerbWaveSec: [300, 900, 1800],
        DarknessSec: [82800, 255600, 601200],
        NumBuildingDestroyers: [
            [2, 3],
            [2, 3],
            [2, 3],
        ],
        BuildingDestroyersTimes: [
            [60, 120],
            [60, 120],
            [60, 120],
        ],
    },
    DarkRedStar: {
        Name: "DarkRedStar",
        TID: "TID_RED_STAR",
        TID_Description: "TID_RED_STAR_INFO",
        ConceptImage: "portrait_RedStar",
        AppearanceModels: [
            null,
            "Red_Star",
            "Red_Star_1",
            "Red_Star_2",
            "DRed_Star_3",
            "DRed_Star_4",
            "DRed_Star_5",
            "DRed_Star_6",
            "DRed_Star_7",
            "DRed_Star_8",
            "DRed_Star_9",
            "DRed_Star_10",
            "DRed_Star_11",
        ],
        SecurityRating: 0,
        Icon: "star_red_dark",
        SupernovaFX: "RedStarExplode_FX",
        SupernovaFXSpawnTimeSec: 3,
        FixedSector: [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            "TutorialRedStar",
            "Mine_Risk0_Lv1",
        ],
        HexGridSizeX: [0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        HexGridSizeY: [1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3],
        HexGridMaxRadius: [1, 1, 1, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3],
        HexCellEdgeSize: [1500, 1650, 2500, 2000, 2500, 2250, 2300, 2400, 2600, 2900, 2300, 2400, 2600],
        SpeedModifierPct: 200,
        Lifetime: 900,
        NumPlayersWithAccess: [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        MaxBattleshipsPerPlayer: [1, 1, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3],
        Star: "DarkRedStar",
        HydrogenSearchCost: [0, 50, 100, 250, 550, 800, 1200, 1500, 2000, 2750, 4000, 4500, 5000],
        CroidAmt: [0, 0, 0, 0, 30000, 75000, 100000, 150000, 225000, 300000, 400000, 500000, 600000],
        NumMaxPlanets: [null, 2, 2, 3, 3, 4, 4, 4, 4, 4, 5, 5, 5],
        LowerPlanetsMinLevel: [null, 1, 1, 1, 1, 2, 2, 3, 4, 5, 6, 6, 7],
        MaxInfluenceLoss: [null, 5, 10, 15, 15, 20, 20, 25, 25, 30, 30, 30, 30],
        MaxInfluenceGain: [null, 36, 48, 60, 70, 85, 100, 120, 150, 180, 240, 260, 300],
        DestroyersToSpawn: [null, null, null, null, null, null, 4, 4, 4, 4, 5, 5, 5],
        MinBombers: [null, null, null, null, null, null, null, 3, 5, 6, 9, 11, 11],
        MaxPlanetBomberCoverage: [null, null, null, null, null, null, null, 3, 3, 4, 5, 6, 6],
        MaxGateBomberCoverage: [null, null, null, null, null, null, null, 1, 2, 2, 3, 4, 5],
        GhostSpawnSecs: [
            90,
            80,
            70,
            65,
            60,
            60,
            60,
            50,
            50,
            45,
            45,
            45,
            40,
            40,
            35,
            35,
            35,
            30,
            [90, 80, 70, 65, 60, 60, 60, 50, 50, 45, 45, 45, 40, 40, 35, 35, 35, 30],
            [90, 80, 70, 65, 60, 60, 60, 50, 50, 45, 45, 45, 40, 40, 35, 35, 35, 30],
        ],
        GhostSpawner: [null, null, null, null, null, null, null, null, null, null, 0, 1, 2],
        NumLowerPlanets: [null, 0, 1, 2, [2, 3], [2, 3], [2, 3], [2, 3], [2, 3], [2, 3], [4, 5], [4, 5], [4, 5]],
        MedRiskMining: [
            null,
            [1, 2],
            [1, 3],
            [2, 4],
            [4, 5],
            [5, 6],
            [5, 6],
            [6, 7],
            [6, 7],
            7,
            [9, 12],
            [9, 12],
            [9, 12],
        ],
        HighRiskMining: [null, 0, 1, [1, 2], [2, 4], [3, 4], [3, 4], [2, 3], [2, 3], 4, [6, 8], [6, 8], [6, 8]],
        Influence: [
            null,
            [0, 180],
            [80, 600],
            [550, 1800],
            [1100, 3600],
            [1900, 7200],
            [2900, 13200],
            [3900, 21600],
            [6900, 31200],
            [9900, 43200],
            [12400, 100000],
            [15000, 170000],
            [17500, 220000],
        ],
        RegularInfuenceRange: [
            null,
            [0, 120],
            [100, 480],
            [400, 1440],
            [1200, 3000],
            [2500, 6000],
            [5500, 12000],
            [10000, 19200],
            [16000, 28800],
            [24000, 40800],
            [34000, 72000],
            [60000, 144000],
            [120000, 192000],
        ],
        InfluenceAwardThreshold: [
            null,
            [10, 30],
            [20, 80],
            [40, 225],
            [100, 600],
            [160, 1200],
            [320, 1920],
            [480, 2560],
            [640, 4160],
            [800, 6400],
            [960, 10800],
            [2000, 25600],
            [4000, 44000],
        ],
    },
};
