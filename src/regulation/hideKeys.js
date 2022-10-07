// noinspection SpellCheckingInspection

export default {
    meta: [
        'TID',
        'TID_Description',
        'Icon',
        'Name',
        'Model',
    ],
    forceTitle: [
        'modules',
        'GhostSpawnSecs',
        'DestinyDisableTimes',
        'BarrageMaxAdditionalEnemies',
    ],
    global: [
        'SpawnedShip',
        'NumMoons',
        'Hide',
        'InitialBlueprints',
        'DoNotAward',
        'ShipAIHandler',
        'AggressiveAI',
        'SpawnedShipOffsets',
        'RequiredPlanetLevel',
        'CanBeBuilt',
        'ScaleEffectsWithZoom',
        'TID_UPGRADE',
        'HideSelection',
        'MoonDistance',
        'MoonSize',
        'MinPlanetDistanceFromCenter',
        'MaxPlanetDistanceFromCenter',
        'AsteroidBeltAxis1Size',
        'AsteroidBeltAxis2Size',
        'TutorialUse',
        'Weight',
        'CrystalsWeight',
        'PlanetSize',
        'ModelFolders',
        'ColorR',
        'ColorG',
        'ColorB',
        'HexGridSizeX',
        'HexGridSizeY',
        'HexGridMaxRadius',
        'HexCellEdgeSize',
        'FixedSector',
        'TID_CUSTOM_TUT_SELECT',
        'CUnitShipmentScaleY',
        'CUnitShipmentSpacingY',
        'CShipmentSizeMin',
        'CShipmentSizeMax',
        'HideModulesOnHUD',
        'GoalRushCostMultiplier',
        'SlotType',
        'WeaponEffectType',
        'WeaponFx',
        'ClientActivationFx',
        'ImpactFX',
        'DestroyedFX',
        'LaunchFX',
        'TID_INFO_SCREEN',
        'ModelScale',
        'AwardLevel',
        'ActivateFX',
        'ActivateFXStaysInPlace',
        'SustainedFX',
        'SpawnFx',
        'SustainedFX_Enemy',
        'BuildNotifMode',
        'ShowInStarLinks',
        'PrefabModel',
        'PrefabModel_BuildMenu',
        'StargateModel',
        'SupernovaFX',
        'SupernovaFXSpawnTimeSec',
        'GroupId',
        'GoalType',
        'GoogleID',
        'ModuleReq',
        'UnlockType',
        'GroupName',
        'GroupPriority',
        'ShowOnPlayerBadge',
        'PreviewLevel',
        'ActivationTargetFX',
        'SortLayer',
        'AllowBuildOnYS',
        'UISortOrder',
        'AppearanceModels',
        'RSLevel',
        'PivotYOffset',
        'LinkDPSBoostPct', // перевёл в урон на парсере

        // временно ?
        'ActivationDelayBLS',
        'BSPenaltyPerSec',
        'BSPenaltyPerSecOnSector',
        'AllowForWSEarlyAccess',
    ],
    byPath: [

        // SpaceBuildings
        'Shipyard.MaxPerSector',
        'BlueStarScanner.StarScannerType',
        'WarpLaneHub.OverrideMinAsteroidDistSquared',
        'ShortRangeScanner.CanScanSectors',

        // Cerberus
        /(Cerberus(\w+)|Dark(\w+))\.BuildCost/,
        /(Cerberus(\w+)|Hydraling(\d+)|Dark(\w+))\.NewModuleSlots/,
        /(Cerberus|Dark)Destroyer\.ApplyModuleOnDockedObjectDestroy/,
        /(Cerberus(\w+)|Hydraling(\d+)|Dark(\w+))\.OnDestroySpawnMinRadius/,
        /(Cerberus(\w+)|Hydraling(\d+)|Dark(\w+))\.OnDestroySpawnMaxRadius/,
        /Dark(\w+)\.BaseCerbShipDataIdx/,
        'Ghosts.ModelToSpawn',
        'Ghosts.RadiusMin',
        // 'Ghosts.RadiusMax', // - в строчках есть перевод, а так хз зачем это

        // Ships
        /(Transport|Miner)\.HP/,
        /(Miner|CorpFlagship)\.FuelUsePer5000Distance/,
        'Transport.MaxShipments',
        'Battleship.InitialModule',
        'Battleship.InitialModuleLevels',
        'Battleship.HydrogenCapacity',
        'CorpFlagship.DesignUpgradeTime',
        'CorpFlagship.BuildCost',
        'CorpFlagship.JumpFuelCosts',

        // Ships.FlagmanModules
        'FlagshipDartBarrage.SingleTarget',
        'FlagshipDroneSwarm.NewModuleSlots',

        // RedStar
        'DarkRedStar.PlanetBomberCoverage', // временно ?
        'RedStar.MaxSectorDistanceToMaxPlanet', // временно ?
        /(Dark)?RedStar\.Star/,
        /(Dark)?RedStar\.RSPublicLateJoin_ClientCacheExpiry/,
        /(Dark)?RedStar\.MaxGateBomberCoverage/,
        /(Dark)?RedStar\.DontAllowUseOfEnemyWSGate/,
        /(Dark)?RedStar\.DisableRSSearchDuringTutorial/,
        /(Dark)?RedStar\.WarnOnSRSPlacementMinNumNeighbors/,
        /(Dark)?RedStar\.PrivateRSEventClientDisplayMode/,

        // RedStar.artifacts
        /(Combat|Utility|Support)\.(Model|RSLevelRequired|MaxModuleLevelToAward|GroupNames|BlueprintTypes)/,

        // YellowStar
        'planet_levels.ShipmentsHydroValuePerDay',
        'yellow_star_sectors.AsteroidsMin',
        'yellow_star_sectors.NumBases',
        'Planets.FuelShipmentModifier',
        'YellowStar.NumPlayersWithAccess',
        'YellowStar.Star',
        'YellowStar.Lifetime',

        // BlueStar
        'BlueStar.Models',
        'BlueStar.Star',
        'BlueStar.CollapseReductionPerCycle',
        'BlueStar.StageStartSec',
        'BlueStar.StarSectorNavpointDistance',
        'BlueStar.MedRiskMining',
        'BlueStar.HighRiskMining',
        'BlueStar.HydrogenSearchCost',
        'BlueStar.MaxBattleshipsPerPlayer',
        'BlueStar.BlueStar_HydroPctPerMatch',
        'BlueStar.BlueStar_CRRewardWinLimit',
        'BlueStar.CollapsePeriod', // времено ?
        'BlueStar.CycleEndTimes',
        'BlueStar.CycleEndCollapseAreaSize',
        'BlueStar.InitialCollapseAreaSize', // не так важно

        // WhiteStar
        'WhiteStar.Star',
        'WhiteStar.Models',
        'WhiteStar.PlayerNumberBrackets',
        'WhiteStar.HQPlanetsPerBracket',
        'WhiteStar.LQPlanetsPerBracket',
        'WhiteStar.HighRiskMining',
        'WhiteStar.FleetDepartTimeInSeconds_WS',
        'WhiteStar.DontAllowUseOfEnemyWSGate',
        'WhiteStar.WSShipXPCollectEnabled',
        'WhiteStar.WSShipMinXP',
        'WhiteStar.WSShipXPEventClientDisplayMode',
        'WhiteStar.WSShipXPEventVersion',
        'WhiteStar.WSHQAsteroidsPerBucket',
        'WhiteStar.WSShipEventTopBrackets',
        'WhiteStar.WSShipEventCRRewards',
        'WhiteStar.SpeedModifierPct', // времено ?
        'WhiteStar.BarrageMaxAdditionalEnemies_WS',

        // Trade
        'Recall.TeleportToTradeStation',
        'ShipmentDrone.MiningPeriod',
        'ShipmentDrone.HP',
        'RelicDrone.MaxShipments',
        'RelicDrone.RelicLoadTicks',
        'RelicDrone.RelicLoadTicksBS',
        'Dispatch.APTPIOTTPYS', // неизвестная единица измерения

        // Mining
        'HydroRocket.InitialBlueprints',
        'MassMining.MineAllInSector',
        'Entrust.SwapLoadWithOtherTransport',
        'MineralStorageCapacity.FuelUseIncrease',
        'MassMining.FuelUseIncrease',
        'HydrogenUpload.WhiteStarScore',
        'MiningDrone.JobCapacity',
        'HydroStorageCapacity.FuelUseIncrease',

        // Weapons
        /(WeakBattery|GuardianBattery|InterceptorMBattery|ColossusLaser|DestroyerVengeance|BomberLauncher|PhoenixShield|DartBarrage)\.(UnlockPrice|UnlockBlueprints|UnlockTime|ShowWSInfo|WhiteStarScore|Install|BCCost)/, // В небуле не неужно модулям церберов
        'PlayerRocketLauncher.MinEffectRadius',
        'ChainRay.MaxIncomingLinks', // хз что это

        // Shields
        'AlphaShield.ShieldStrength',
        'WeakShield.WhiteStarScore',

        // Support
        'Sanctuary.JumpToSafety',
        'Sanctuary.SanctuaryHydroCostPct',
        /^(?!Delta)(\w+)\.AdditionalWaypoint/,
        'Destiny.ReqEnemyShipsInSector',
        'Leap.TeleportToClosestCombat',
        'Bond.PullShips',
        'Bond.MinPublicRSLevel',
        'Bond.BondMinPullVector',
        'Bond.BondWorksOnLoadingTransport',
        'Recall.WhiteStarScore',
        /((\w+)Drone|LaserTurret|DroneSquad)\.(BuildCost|DesignUpgradeCost|DesignUpgradeTime|NewModuleSlots)/,
        'RemoteBomb.Speed',
        'LaserTurret_Laser.WeaponEffectType',
        'LaserTurret.InitialModule',
        'LaserTurret.Speed',
        'LaserTurret.InitialModuleLevels',
        'LaserTurret.MaxPerRS',
        'DeltaRocket.PreventUseOnWsJumpgate',
        /^\w+\.Is\w+/,
        'Impulse.MaxImpulse', // ???
    ],
};
