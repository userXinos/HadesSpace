/**
 * @GeneratedBy SpaceBuildings.js runner
 * @OriginalFile raw/Nebula/spacebuildings.csv
 */

export default {
    Shipyard: {
        Name: "Shipyard",
        AllowBuildOnYS: 1,
        MoveHydrogenCostPerSector: 1000,
        TID: "TID_BUILDING_SHIPYARD",
        TID_Description: "TID_BUILDING_SHIPYARD_DESCR",
        TID_INFO_SCREEN: "TID_BUILDING_SHIPYARD_DESCR",
        TID_UPGRADE: "TID_BLD_SHIPYARD_UPGRADE",
        TID_CUSTOM_TUT_SELECT: "TID_TUT_SELECT_SHIPYARD",
        ConceptImage: "portrait_EmptySpace",
        PrefabModel: "station_Shipyard",
        PrefabModel_BuildMenu: "station_Shipyard_ui",
        RequiredPlanetLevel: 1,
        UISortOrder: 1,
        Cost: [800, 1000, 5000, 20000, 80000, 200000, 500000, 1000000, 2000000, 5000000],
        RequiresEmptySector: 0,
        MaxOnOwnSolarSystem: 1,
        MaxPerSector: 1,
        ShipyardCapacity: [4, 5, 7, 8, 10, 12, 13, 14, 15, 16],
        BuildNotifMode: 0,
        ShowInStarLinks: 1,
        ConstructionTime: [5, 60, 1800, 28800, 86400, 172800, 259200, 345600, 432000, 432000],
    },
    ShortRangeScanner: {
        Name: "ShortRangeScanner",
        AllowBuildOnYS: 1,
        CanCancelBuild: 1,
        CancelBuildRefundPct: 90,
        SeparateBuildingPerLevel: 1,
        AllowAdditionalBuildingsAtMaxLevel: 1,
        MoveHydrogenCostPerSector: 500,
        AllowMoveInSameSectorOnly: 1,
        TID: "TID_BUILDING_SHORT_RANGE_SCANNER",
        TID_Description: "TID_BUILDING_SHORT_RANGE_SCANNER_DESCR",
        TID_INFO_SCREEN: "TID_BUILDING_SHORT_RANGE_SCANNER_INFO",
        ConceptImage: "portrait_SpaceBuilding",
        PrefabModel: "station_ShortRangeScanner",
        PrefabModel_BuildMenu: "station_ShortRangeScanner_ui",
        RequiredPlanetLevel: 3,
        UISortOrder: 3,
        Cost: [500, 10000, 20000, 40000, 80000, 150000, 300000, 600000, 1000000, 2000000, 3000000, 4000000],
        SectorUnlockCost: [
            2500, 10000, 20000, 40000, 80000, 150000, 300000, 600000, 1000000, 2000000, 3000000, 4000000,
        ],
        SectorUnlockTime: [600, 28800, 86400, 129600, 172800, 259200, 345600, 432000, 518400, 604800, 604800, 604800],
        RequiresEmptySector: 0,
        MaxPerSector: 1,
        CanScanSectors: 1,
        BuildNotifMode: 2,
        ConstructionTime: [60, 14400, 43200, 86400, 86400, 86400, 86400, 86400, 86400, 86400, 86400, 86400],
    },
    RedStarScanner: {
        Name: "RedStarScanner",
        AllowBuildOnYS: 1,
        MoveHydrogenCostPerSector: 1000,
        TID: "TID_BUILDING_REDSTAR_SCANNER",
        TID_Description: "TID_BUILDING_REDSTAR_SCANNER_DESCR",
        TID_INFO_SCREEN: "TID_BUILDING_REDSTAR_SCANNER_INFO",
        TID_UPGRADE: "TID_BLD_REDSTAR_UPGRADE",
        TID_CUSTOM_TUT_SELECT: "TID_TUT_SELECT_MISSION_BUILDING",
        ConceptImage: "portrait_JumpGate",
        PrefabModel: "station_RedStarScanner",
        PrefabModel_BuildMenu: "station_RedStarScanner_ui",
        RequiredPlanetLevel: 4,
        UISortOrder: 4,
        Cost: [1000, 2000, 20000, 60000, 120000, 250000, 1000000, 2000000, 4000000, 8000000, 16000000, 32000000],
        RequiresEmptySector: 0,
        MaxOnOwnSolarSystem: 1,
        MaxPerSector: 1,
        StarScannerType: 0,
        StargateModel: "JumpGate",
        BuildNotifMode: 1,
        ShowInStarLinks: 1,
        ConstructionTime: [3, 180, 0, 14400, 86400, 172800, 259200, 345600, 432000, 518400, 604800, 864000, 864000],
    },
    ResearchStation: {
        Name: "ResearchStation",
        AllowBuildOnYS: 1,
        MoveHydrogenCostPerSector: 200,
        TID: "TID_BUILDING_RESEARCH",
        TID_Description: "TID_BUILDING_RESEARCH_DESCR",
        TID_INFO_SCREEN: "TID_BUILDING_RESEARCH_INFO",
        TID_UPGRADE: "TID_BLD_RESEARCH_STATION_UPGRADE",
        TID_CUSTOM_TUT_SELECT: "TID_TUT_SELECT_RESEARCH_STATION",
        ConceptImage: "portrait_SpaceBuilding",
        PrefabModel: "station_Research",
        PrefabModel_BuildMenu: "station_Research_ui",
        RequiredPlanetLevel: 5,
        UISortOrder: 5,
        Cost: 1000,
        ResearchSlots: 4,
        RequiresEmptySector: 0,
        MaxOnOwnSolarSystem: 1,
        MaxPerSector: 1,
        BuildNotifMode: 1,
        ShowInStarLinks: 1,
        ConstructionTime: 5,
    },
    DiplomacyCenter: {
        Name: "DiplomacyCenter",
        AllowBuildOnYS: 1,
        SeparateBuildingPerLevel: 1,
        MoveHydrogenCostPerSector: 2000,
        TID: "TID_BUILDING_DIPLOMACY_CENTER",
        TID_Description: "TID_BUILDING_DIPLOMACY_CENTER_DESCR",
        TID_INFO_SCREEN: "TID_BUILDING_DIPLOMACY_CENTER_INFO",
        ConceptImage: "portrait_SpaceBuilding",
        PrefabModel: "station_Diplomacy",
        PrefabModel_BuildMenu: "station_Diplomacy_ui",
        RequiredPlanetLevel: 7,
        UISortOrder: 12,
        Cost: [25000, 500000, 4000000],
        RequiresEmptySector: 0,
        MaxOnOwnSolarSystem: 3,
        MaxPerSector: 1,
        StargateModel: "JumpGate",
        BuildNotifMode: 3,
        ShowInStarLinks: 1,
        ConstructionTime: [28800, 432000, 864000],
    },
    TradingStation: {
        Name: "TradingStation",
        AllowBuildOnYS: 1,
        CanBeRenamed: 1,
        MoveHydrogenCostPerSector: 3000,
        TID: "TID_BUILDING_TRADINGSTATION",
        TID_Description: "TID_BUILDING_TRADINGSTATION_DESCR",
        TID_INFO_SCREEN: "TID_BUILDING_TRADINGSTATION_DESCR",
        ConceptImage: "portrait_SpaceBuilding",
        PrefabModel: "station_trade",
        PrefabModel_BuildMenu: "station_trade_ui",
        RequiredPlanetLevel: 13,
        UISortOrder: 14,
        Cost: [60000, 120000, 250000, 500000, 1000000, 2000000, 3000000, 4000000, 6000000, 8000000],
        TotalShipmentCRPerDay: [5000, 7000, 9500, 14000, 19500, 28000, 38000, 53000, 75000, 105000],
        RequiresEmptySector: 1,
        MaxOnOwnSolarSystem: 3,
        MaxPerSector: 1,
        BuildNotifMode: 1,
        ShowInStarLinks: 1,
        ConstructionTime: [86400, 172800, 345600, 432000, 518400, 604800, 691200, 777600, 864000, 950400],
    },
    WarpLaneHub: {
        Name: "WarpLaneHub",
        AllowBuildOnYS: 1,
        SeparateBuildingPerLevel: 1,
        AllowAdditionalBuildingsAtMaxLevel: 1,
        BuyInPairs: 1,
        MoveHydrogenCostPerSector: 2000,
        TID: "TID_BUILDING_WARPLANE_HUB",
        TID_Description: "TID_BUILDING_WARPLANE_HUB_DESCR",
        TID_INFO_SCREEN: "TID_BUILDING_WARPLANE_HUB_INFO",
        ConceptImage: "portrait_WarpLane",
        PrefabModel: "warpLaneHub",
        PrefabModel_BuildMenu: "warpLaneHub_ui",
        RequiredPlanetLevel: 12,
        UISortOrder: 13,
        Cost: [
            50000, 50000, 100000, 100000, 200000, 200000, 400000, 400000, 800000, 800000, 1500000, 1500000, 3000000,
            3000000, 5000000, 5000000, 6000000, 6000000, 7000000, 7000000, 8000000, 8000000,
        ],
        RequiresEmptySector: 0,
        MaxOnOwnSolarSystem: 24,
        MaxPerSector: 8,
        IsWarpLane: 1,
        OverrideMinAsteroidDistSquared: 1000000,
        BuildNotifMode: 1,
        ConstructionTime: [
            43200, 43200, 86400, 86400, 172800, 172800, 259200, 259200, 345600, 345600, 432000, 432000, 518400, 518400,
            604800, 604800, 691200, 691200, 777600, 777600, 864000, 864000,
        ],
    },
    Stargate: {
        Name: "Stargate",
        AllowBuildOnYS: 0,
        TID: "TID_BUILDING_STARGATE",
        TID_Description: "TID_BUILDING_STARGATE_DESCR",
        TID_INFO_SCREEN: "TID_BUILDING_STARGATE_DESCR",
        ConceptImage: "portrait_JumpGate",
        IsStargate: 1,
        RequiresEmptySector: 0,
        OverrideMinAsteroidDistSquared: 1000000,
        StargateModel: "JumpGate02",
    },
    OrangeStarScanner: {
        Name: "OrangeStarScanner",
        AllowBuildOnYS: 0,
        MoveHydrogenCostPerSector: 1000,
        TID: "TID_BUILDING_ORANGESTAR_SCANNER",
        TID_Description: "TID_BUILDING_ORANGESTAR_SCANNER_DESCR",
        TID_INFO_SCREEN: "TID_BUILDING_ORANGESTAR_SCANNER_INFO",
        ConceptImage: "portrait_JumpGate",
        Model: "redStarScanner",
        RequiredPlanetLevel: 5,
        UISortOrder: 5,
        Cost: 40000,
        RequiresEmptySector: 1,
        MaxOnOwnSolarSystem: 1,
        MaxPerSector: 1,
        StarScannerType: 1,
        StargateModel: "JumpGate",
        ConstructionTime: 86400,
    },
    WhiteStarScanner: {
        Name: "WhiteStarScanner",
        AllowBuildOnYS: 1,
        MoveHydrogenCostPerSector: 1000,
        TID: "TID_BLD_WHITESTAR_SCANNER",
        TID_Description: "TID_BLD_WHITESTAR_SCANNER_DESCR",
        TID_INFO_SCREEN: "TID_BLD_WHITESTAR_SCANNER_DESCR",
        TID_UPGRADE: "TID_BLD_REDSTAR_UPGRADE",
        ConceptImage: "portrait_JumpGate",
        PrefabModel: "station_WhiteStarScanner",
        PrefabModel_BuildMenu: "station_WhiteStarScanner_ui",
        RequiredPlanetLevel: 1,
        UISortOrder: 0,
        Cost: 1,
        RequiresEmptySector: 0,
        MaxOnOwnSolarSystem: 1,
        MaxPerSector: 1,
        StargateModel: "JumpGateWhiteStar",
        BuildNotifMode: 1,
        ShowInStarLinks: 1,
        ConstructionTime: 1,
    },
    TimeModulator: {
        Name: "TimeModulator",
        AllowBuildOnYS: 1,
        MoveHydrogenCostPerSector: 1000,
        AllowMoveInSameSectorOnly: 1,
        TID: "TID_BLD_TIME_MODULATOR",
        TID_Description: "TID_BLD_TIME_MODULATOR_DESCR",
        TID_INFO_SCREEN: "TID_BLD_TIME_MODULATOR_INFO",
        ConceptImage: "portrait_SpaceBuilding",
        PrefabModel: "timeModulator",
        PrefabModel_BuildMenu: "timeModulator_ui",
        RequiredPlanetLevel: 6,
        UISortOrder: 6,
        Cost: [
            1000, 4000, 10000, 30000, 100000, 200000, 400000, 600000, 800000, 1000000, 2000000, 3000000, 4000000,
            5000000, 6000000, 7000000,
        ],
        TimeSpeedupFactor: [
            15000, 17500, 20000, 22500, 25000, 27500, 30000, 32500, 35000, 37500, 40000, 42500, 45000, 50000, 55000,
            60000,
        ],
        TimeSpeedupMaxSeconds: 600,
        TimeSpeedupRegenPerDay: 1200,
        RequiresStarSector: 1,
        MaxOnOwnSolarSystem: 1,
        MaxPerSector: 1,
        BuildNotifMode: 0,
        ShowInStarLinks: 1,
        ConstructionTime: [
            600, 3600, 28800, 172800, 345600, 432000, 518400, 604800, 691200, 777600, 864000, 864000, 864000, 864000,
            864000, 864000,
        ],
        Model: "TimeModulator",
    },
    BlueStarScanner: {
        Name: "BlueStarScanner",
        AllowBuildOnYS: 1,
        MoveHydrogenCostPerSector: 1000,
        TID: "TID_BUILDING_BLUESTAR_SCANNER",
        TID_Description: "TID_BUILDING_BLUESTAR_SCANNER_DESCR",
        TID_INFO_SCREEN: "TID_BUILDING_BLUESTAR_SCANNER_INFO",
        TID_UPGRADE: "TID_BUILDING_BLUESTAR_SCANNER_INFO",
        ConceptImage: "portrait_Anomaly",
        PrefabModel: "station_BlueStarScanner",
        PrefabModel_BuildMenu: "station_BlueStarScanner_ui",
        RequiredPlanetLevel: 9,
        UISortOrder: 9,
        Cost: 20000,
        RequiresEmptySector: 0,
        MaxOnOwnSolarSystem: 1,
        MaxPerSector: 1,
        StarScannerType: 1,
        StargateModel: "JumpGate",
        BuildNotifMode: 1,
        ShowInStarLinks: 1,
        ConstructionTime: 3,
    },
    ShipmentRelay: {
        Name: "ShipmentRelay",
        AllowBuildOnYS: 1,
        MoveHydrogenCostPerSector: 1000,
        TID: "TID_BLD_RELAY",
        TID_Description: "TID_BLD_RELAY_DESCR",
        TID_INFO_SCREEN: "TID_BLD_RELAY_INFO",
        ConceptImage: "portrait_SpaceBuilding",
        PrefabModel: "station_ShipmentRelay",
        PrefabModel_BuildMenu: "station_ShipmentRelay_ui",
        RequiredPlanetLevel: 10,
        UISortOrder: 10,
        Cost: [5000, 6000, 8000, 15000, 25000, 50000, 100000, 200000, 400000, 800000],
        MaxOnOwnSolarSystem: 1,
        MaxPerSector: 1,
        RelayBonusPct: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
        TeleportShipmentsPerHr: 10,
        TeleportShipmentsDurationHr: 24,
        TeleportShipmentActivationFragments: [5, 5, 4, 4, 3, 3, 3, 2, 2, 2],
        FragmentCapacity: [15, 20, 20, 25, 25, 25, 30, 30, 30, 36],
        TeleportShipmentMaxSectors: [3, 4, 5, 6, 7, 8, 10, 12, 14, 18],
        TSHydroCost: [300, 350, 400, 500, 750, 1000, 2000, 3000, 4000, 5000],
        BuildNotifMode: [0, 1],
        ShowInStarLinks: 1,
        ConstructionTime: [14400, 28800, 57600, 86400, 172800, 172800, 172800, 172800, 172800, 172800],
    },
    QuantumStarGate: {
        Name: "QuantumStarGate",
        MoveHydrogenCostPerSector: 1000,
        TID: "TID_BUILDING_QUANTUMSTAR_GATE",
        TID_Description: "TID_BUILDING_QUANTUMSTAR_GATE_DESCR",
        TID_INFO_SCREEN: "TID_BUILDING_QUANTUMSTAR_GATE_INFO",
        TID_UPGRADE: "TID_BUILDING_QUANTUMSTAR_GATE_INFO",
        ConceptImage: "portrait_Anomaly",
        PrefabModel: "station_DarkStarScanner",
        PrefabModel_BuildMenu: "station_DarkStarScanner_ui",
        RequiredPlanetLevel: 0,
        UISortOrder: 20,
        Cost: 12000000,
        MaxOnOwnSolarSystem: 1,
        MaxPerSector: 1,
        StarScannerType: 2,
        StargateModel: "JumpGate_DarkStar",
        ConstructionTime: 86400,
    },
    QuantumScanner: {
        Name: "QuantumScanner",
        AllowBuildOnDS: 1,
        MoveHydrogenCostPerSector: 500,
        AllowMoveInSameSectorOnly: 1,
        TID: "TID_BUILDING_QUANTUM_STAR_SCANNER",
        TID_Description: "TID_BUILDING_QUANTUM_STAR_SCANNER_DESCR",
        TID_INFO_SCREEN: "TID_BUILDING_QUANTUM_STAR_SCANNER_DESCR",
        ConceptImage: "portrait_SpaceBuilding",
        PrefabModel: "station_ShortRangeScanner",
        PrefabModel_BuildMenu: "station_ShortRangeScanner_ui",
        Cost: 1000000,
        RequiresEmptySector: 0,
        MaxOnOwnSolarSystem: 1,
        MaxPerSector: 1,
        BuildNotifMode: 2,
        QSExploreCost: 1000,
        DestroyerTarget: 1,
        MaxHealth: 1000,
        ConstructionTime: 3,
    },
    MineralRefinery: {
        Name: "MineralRefinery",
        AllowBuildOnYS: 0,
        AllowBuildOnDS: 1,
        MoveHydrogenCostPerSector: 5000,
        AllowMoveInSameSectorOnly: 1,
        TID: "TID_BUILDING_MINERAL_REFINERY",
        TID_Description: "TID_BUILDING_MINERAL_REFINERY_DESCR",
        TID_INFO_SCREEN: "TID_BUILDING_MINERAL_REFINERY_DESCR",
        TID_UPGRADE: "TID_BUILDING_MINERAL_REFINERY_DESCR",
        ConceptImage: "portrait_Anomaly",
        PrefabModel: "timeModulator",
        PrefabModel_BuildMenu: "timeModulator_ui",
        Cost: 1000000,
        RequiresStarSector: 1,
        MaxOnOwnSolarSystem: 1,
        MaxPerSector: 1,
        RawMineralsPerItem: [250, 225, 200, 180, 160, 150, 140, 130, 120, 110, 100, 95, 90, 85, 80, 75],
        DestroyerTarget: 1,
        MaxHealth: 1000,
        ConstructionTime: 3,
    },
};
