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
          cerberus: cerberusList,
          drones: dronesList
        }
        result['content'] = 'let shipsByTypes= ' + JSON.stringify(shipsByTypes, null, 2)
        result['export'] += ',shipsByTypes'
        break;
      default:
        break;
    }
    return result
  }

  module.exports = { addContent }