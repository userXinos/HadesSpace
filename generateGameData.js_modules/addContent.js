// добавить захардкоженый контент
function addContent(type) {
  let result = {}
  let content = null
  result['export'] = type
  switch (type) {
    case 'modulesData':
      let modulesByTypes = {
        trade: ['TransportCapacity', 'ShipmentComputer', 'Trader', 'Rush', 'TradeBurst', 'ShipmentDrone', 'Offload', 'ShipmentBeam', 'Entrust', 'Dispatch', 'Recall'],
        mining: ['MiningBoost', 'MineralStorageCapacity', 'Enrich', 'MassMining', 'HydrogenUpload', 'MiningUnity', 'Crunch', 'Genesis', 'HydroRocket', 'MiningDrone'],
        weapon: ['WeakBattery', 'Battery', 'Laser', 'MassBattery', 'DualLaser', 'Barrage', 'DartLauncher'],
        shield: ['WeakShield', 'StandardShield', 'PassiveShield', 'StrongShield', 'MirrorShield', 'BlastShield', 'AreaShield'],
        support: ['EMP', 'Teleport', 'RedStarExtender', 'Repair', 'TimeWarp', 'Unity', 'Sanctuary', 'Stealth', 'Fortify', 'Impulse', 'AlphaRocket', 'Salvage', 'Supress', 'Destiny', 'Barrier', 'Vengeance', 'DeltaRocket', 'Leap', 'Bond', 'AlphaDrone', 'Suspend', 'OmegaRocket'],
        cerberus: ['GuardianBattery', 'WeakBattery', 'InterceptorMBattery', 'ColossusLaser', 'DestroyerVengeance', 'BomberLauncher', 'PhoenixShield', 'DartBarrage'],
        flagship: ['Recoil', 'Immolation', 'EMPRocket']
      }
      result['content'] = 'let modulesByTypes= ' + JSON.stringify(modulesByTypes, null, 2)
      result['export'] += ',modulesByTypes'
      break;
    case 'shipsData':
      let shipsByTypes = {
        player: ['Transport', 'Miner', 'Battleship', 'CorpFlagship'],
        cerberus: ['CerberusSentinel', 'CerberusGuardian', 'CerberusInterceptor', 'CerberusColossus', 'CerberusDestroyer', 'CerberusBomber', 'CerberusPhoenix', 'CerberusStorm', 'CerberusGhosts'],
        drones: ['ShipmentDrone', 'MiningDrone', 'AlphaDrone']
      }
      result['content'] = 'let shipsByTypes= ' + JSON.stringify(shipsByTypes, null, 2)
      result['export'] += ',shipsByTypes'
      break;
    case 'planetsData':
      let planetsByTypes = {
        yellowstar: ['desert_lv1', 'lava_lv1', 'water_lv1', 'terran_lv1', 'gas_lv1', 'terran_lv2', 'lava_lv2', 'water_lv2', 'gas_lv2', 'desert_lv2', 'lava_lv3', 'desert_lv3', 'water_lv3', 'terran_lv3', 'ice_variation1', 'ice_variation2'],
        redstar: ['destroyed01', 'destroyed02', 'destroyed03', 'destroyed04', 'destroyed05', 'destroyed06', 'destroyed07', 'destroyed08', 'destroyed09', 'destroyed10'],
        whitestar: ['whitestar1', 'whitestar2', 'whitestar_l1']
      }
      result['content'] = 'let planetsByTypes= ' + JSON.stringify(planetsByTypes, null, 2)
      result['export'] += ', planetsByTypes'
      break;
    case 'artifactsData':
      let artifactsByTypes = {
        data: ['Combat', 'Utility', 'Support'],
        blueprints: ['blueprintsCombat', 'blueprintsUtility', 'blueprintsSupport'],
      }
      result['content'] = 'let artifactsByTypes= ' + JSON.stringify(artifactsByTypes, null, 2)
      result['export'] += ',artifactsByTypes'
      break;
    case 'spacebuildingsData':
      let spacebuildingsByTypes = {
        player: ['Shipyard', 'ShortRangeScanner', 'RedStarScanner', 'ResearchStation', 'DiplomacyCenter', 'TradingStation', 'WarpLaneHub', 'WhiteStarScanner', 'TimeModulator', 'BlueStarScanner', 'ShipmentRelay'],
        other: ['Stargate', 'OrangeStarScanner']
      }
      result['content'] = 'let spacebuildingsByTypes= ' + JSON.stringify(spacebuildingsByTypes, null, 2)
      result['export'] += ',spacebuildingsByTypes'
      break;
    case 'player_goalsData':
      let player_goalsByTypes = {
        all: ['SalvageArtifacts', 'DestroySentinels', 'DestroyGuardians', 'DestroyColossus', 'DestroyInterceptor', 'DestroyPhoenix', 'ReachInfluence', 'MineHydrogenInRS', 'UploadHydroRS', 'EMPPEnemyShips', 'RepairOtherPlayerShips', 'UseAlphaRocket', 'EntrustArtifacts', 'UseDestinyNoSanct', 'DeliverShipmentsBatch', 'UseShipmentComputer', 'UseTradeBoostOrBurst', 'UseShipmentDrone', 'UseCrunch', 'UseSalvage', 'UseShipmentBeam', 'UseBlastShield', 'UseMiningDrone', 'UseGenesis', 'UseOffload', 'EarnFragments', 'WinBSWithEMP1', 'WinBSWithEMP2', 'WinBSWithEMP3', 'WinBSWithRepair1', 'WinBSWithRepair2', 'WinBSWithRepair3', 'WinBSWithTimeWarp', 'WinBSWithStealth1', 'WinBSWithStealth2', 'WinBSWithFortify1', 'WinBSWithFortify2', 'WinBSWithSalvage1', 'WinBSWithSalvage2', 'WinBSWithSupress1', 'WinBSWithSupress2', 'WinBSWithImpulse1', 'WinBSWithImpulse2', 'WinBSWithAlphaRocket1', 'WinBSWithAlphaRocket2', 'WinBSWithDestiny', 'WinBSWithVengeance', 'WinBSWithDeltaRocket', 'WinBSWithBarrier', 'WinBSWithAlphaDrone', 'WinBSWithBond', 'WinBSWithOmegaRocket']
      }
      result['content'] = 'let player_goalsByTypes= ' + JSON.stringify(player_goalsByTypes, null, 2)
      result['export'] += ',player_goalsByTypes'
      break;
    default:
      break;
  }
  return result
}

exports.default = addContent 