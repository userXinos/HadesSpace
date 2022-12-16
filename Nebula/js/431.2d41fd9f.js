"use strict";(self["webpackChunkhades_space"]=self["webpackChunkhades_space"]||[]).push([[431],{5341:(e,a,t)=>{t.d(a,{Z:()=>_});var o=t(5888);function _(e){const a=e.split(".").reduce(((e,a)=>e[a]),o.Z);return{filter:([e])=>a.includes(e),sort:([e],[t])=>a.indexOf(e)-a.indexOf(t)}}},5888:(e,a,t)=>{t.d(a,{Z:()=>o});const o={capital_ships:{player:["Transport","Miner","Battleship","CorpFlagship"],cerberus:["CerberusSentinel","CerberusGuardian","CerberusInterceptor","CerberusColossus","CerberusDestroyer","CerberusBomber","CerberusPhoenix","CerberusStorm","CerberusGhosts","CerberusHydra","Hydraling1","Hydraling2","CerberusCarrier"],darkCerberus:["DarkSentinel","DarkGuardian","DarkInterceptor","DarkColossus","DarkDestroyer","DarkBomber","DarkPhoenix"]},planets:{yellowstar:["desert_lv1","lava_lv1","water_lv1","terran_lv1","gas_lv1","terran_lv2","lava_lv2","water_lv2","gas_lv2","desert_lv2","lava_lv3","desert_lv3","water_lv3","terran_lv3","ice_variation1","ice_variation2"],redstar:["destroyed01","destroyed02","destroyed03","destroyed04","destroyed05","destroyed06","destroyed07","destroyed08","destroyed09","destroyed10"],whitestar:["whitestar1","whitestar2","whitestar_l1"]}}},4804:(e,a,t)=>{t.d(a,{Z:()=>o});const o={Transport:{Name:"Transport",TID:"TID_SHIP_TRANSPORT",TID_Description:"TID_SHIP_TRANSPORT_DESCR",TID_INFO_SCREEN:"TID_SHIP_TRANSPORT_INFO",TID_UPGRADE:"TID_UPGRADE_TRANSPORT_DESIGN",ConceptImage:"portrait_Transport",Model:["Transport_DrkNeb_lv1","Transport_DrkNeb_lv2","Transport_DrkNeb_lv3","Transport_DrkNeb_lv4","Transport_DrkNeb_lv5","Transport_DrkNeb_lv6","Transport_DrkNeb_lv7"],ModelScale:100,SortLayer:3,PivotYOffset:[48,52,60,46,50,60,63],IsCombatShip:0,CanBeBuilt:1,NewModuleSlots:"Trade",BuildCost:[250,1e3,5e3,1e5,2e5,5e5,1e6],DesignUpgradeCost:[0,1e4,6e4,3e5,1e6,7e6,2e7],DesignUpgradeTime:[0,120,86400,259200,604800,864e3,864e3],RequiredPlanetLevel:1,HP:1,JobCapacity:[1,2,6,10,15,30,100],Speed_YS:200,Speed_NonYS:96,FuelUsePer5000Distance:[10,18,40,50,55,70,140]},Miner:{Name:"Miner",TID:"TID_SHIP_MINER",TID_Description:"TID_SHIP_MINER_DESCR",TID_INFO_SCREEN:"TID_SHIP_MINER_INFO",TID_UPGRADE:"TID_UPGRADE_MINER_DESIGN",ConceptImage:"portrait_Miner",Model:["Miner_DrkNeb_lv1","Miner_DrkNeb_lv2","Miner_DrkNeb_lv3","Miner_DrkNeb_lv4","Miner_DrkNeb_lv5","Miner_DrkNeb_lv6","Miner_DrkNeb_lv7"],ModelScale:100,SortLayer:3,PivotYOffset:0,IsCombatShip:0,CanBeBuilt:1,NewModuleSlots:"Mining",BuildCost:[400,800,8e3,1e5,2e5,5e5,1e6],DesignUpgradeCost:[0,5e3,5e4,25e4,8e5,6e6,24e6],DesignUpgradeTime:[0,120,86400,259200,604800,864e3,864e3],RequiredPlanetLevel:2,HP:1,NumSectorsToMine:[1,2,3,4,5,6,7],HydrogenCapacity:[20,200,400,800,1200,1600,2e3],MiningPeriod:[1e3,800,500,250,100,75,65],MiningPeriod_WS:[120,100,80,60,48,44,40],Speed_YS:400,Speed_NonYS:96,FuelUsePer5000Distance:0},Battleship:{Name:"Battleship",TID:"TID_SHIP_BATTLESHIP",TID_Description:"TID_SHIP_BATTLESHIP_DESCR",TID_INFO_SCREEN:"TID_SHIP_BATTLESHIP_DESCR",TID_UPGRADE:"TID_UPGRADE_BS_DESIGN",ConceptImage:"portrait_Battleship",Model:["Battleship_DrkNeb_lv1","Battleship_DrkNeb_lv2","Battleship_DrkNeb_lv3","Battleship_DrkNeb_lv4","Battleship_DrkNeb_lv5","Battleship_DrkNeb_lv6","Battleship_DrkNeb_lv7"],ModelScale:100,SortLayer:3,IsCombatShip:1,CanBeBuilt:1,NewModuleSlots:[["Weapon","Shield"],"Support","Drone","Support","Support","Support","Drone"],BuildCost:[500,1e3,1e4,1e5,4e5,1e6,2e6],DesignUpgradeCost:[0,3e4,14e4,4e5,15e5,8e6,28e6],BLSDailyCRReward:[1e4,6e4,12e4,15e4,22e4,35e4,4e5],DesignUpgradeTime:[0,120,86400,259200,604800,864e3,864e3],RequiredPlanetLevel:3,HP:[4200,5e3,6e3,7e3,8e3,9e3,1e4],HealRate:[350,417,500,583,667,750,833],HydrogenCapacity:0,Speed_YS:220,Speed_NonYS:100,FuelUsePer5000Distance:0,BSPenaltyPerSec:[500,1e3,2e3,4e3,6e3,7e3,8e3],modules:[{Name:"WeakBattery",TID:"TID_MODULE_WEAK_BATTERY",TID_Description:"TID_MODULE_WEAK_BATTERY_DESCR",RSLevel:1,Icon:"Mod_Weak_Battery_Icon",InitialBlueprints:1,Hide:1,HideSelection:1,DoNotAward:1,UnlockBlueprints:1,UnlockPrice:0,UnlockTime:0,SlotType:"Weapon",ActivationType:"Passive",WeaponEffectType:"bullets",WeaponFx:"Gun_Projectile01_Weak",EffectRadius:1200,DPS:64}]},CerberusSentinel:{Name:"CerberusSentinel",TID:"TID_SHIP_CERB_FIGHTER",TID_Description:"TID_SHIP_CERB_FIGHTER_DESCR",TID_INFO_SCREEN:"TID_SHIP_CERB_FIGHTER_DESCR",ConceptImage:"portrait_Sentinel",Model:"Fighter_DrkNeb_Cerberus2_lv1",ModelScale:95,SortLayer:4,IsCombatShip:1,CanBeBuilt:0,NewModuleSlots:"Weapon",BuildCost:0,RequiredPlanetLevel:0,HP:600,Speed_YS:50,Speed_NonYS:50,ShipAIHandler:4,AIUpdateIntervalSeconds:14,AggressiveAI:0,InfluencePoints:10,BSPenaltyPerSec:1500,modules:[{Name:"SentinelBattery",TID:"TID_MODULE_BATTERY",TID_Description:"TID_MODULE_BATTERY_DESCR",Icon:"Mod_Battery_Icon",InitialBlueprints:0,Hide:1,DoNotAward:1,SlotType:"Weapon",ActivationType:"Passive",WeaponEffectType:"bullets",WeaponFx:"Gun_Projectile01_Strong",EffectRadius:1200,DPS:210,DPS_BS:210,DPS_WS:210}]},CerberusGuardian:{Name:"CerberusGuardian",TID:"TID_SHIP_CERB_SECTOR_GUARDIAN",TID_Description:"TID_SHIP_CERB_SECTOR_GUARDIAN_DESCR",TID_INFO_SCREEN:"TID_SHIP_CERB_SECTOR_GUARDIAN_DESCR",ConceptImage:"portrait_Guardian",Model:"Fighter_DrkNeb_Cerberus1_lv1",ModelScale:100,SortLayer:3,IsCombatShip:1,CanBeBuilt:0,NewModuleSlots:"Weapon",BuildCost:0,RequiredPlanetLevel:0,HP:5600,Speed_YS:55,Speed_NonYS:55,ShipAIHandler:4,AIUpdateIntervalSeconds:8,AggressiveAI:1,InfluencePoints:20,BSPenaltyPerSec:400,modules:[{Name:"GuardianBattery",TID:"TID_MODULE_WEAK_BATTERY",TID_Description:"TID_MODULE_WEAK_BATTERY_DESCR",RSLevel:1,Icon:"Mod_Battery_Icon",InitialBlueprints:1,Hide:1,DoNotAward:1,UnlockBlueprints:1,UnlockPrice:0,UnlockTime:0,SlotType:"Weapon",ActivationType:"Passive",WeaponEffectType:"bullets",WeaponFx:"Gun_Projectile01_Weak",EffectRadius:1200,DPS:60}]},CerberusColossus:{Name:"CerberusColossus",TID:"TID_SHIP_CERB_COLOSSUS",TID_Description:"TID_SHIP_CERB_COLOSSUS_DESCR",TID_INFO_SCREEN:"TID_SHIP_CERB_COLOSSUS_DESCR",ConceptImage:"portrait_CerberusColossus",Model:"Battleship_Cerberus_DrkNeb_lv1",ModelScale:95,SortLayer:2,IsCombatShip:1,CanBeBuilt:0,NewModuleSlots:["Weapon","Support"],BuildCost:0,RequiredPlanetLevel:0,HP:15e3,Speed_YS:60,Speed_NonYS:60,ShipAIHandler:4,AIUpdateIntervalSeconds:10,AggressiveAI:1,InfluencePoints:150,BSPenaltyPerSec:1200,modules:[{Name:"ColossusLaser",TID:"TID_MODULE_LASER",TID_Description:"TID_MODULE_LASER_DESCR",RSLevel:1,Icon:"Mod_Laser_Icon",Hide:1,DoNotAward:1,SlotType:"Weapon",ActivationType:"Passive",WeaponEffectType:"beam",EffectRadius:1200,RampDPS0:60,RampDPS1:150,RampDPS2:500,RampDPS_BLS0:60,RampDPS_BLS1:150,RampDPS_BLS2:500,RampDPS_WS0:60,RampDPS_WS1:150,RampDPS_WS2:500,DPSRampTimes:10,DPSRampTimesWS:6e3,DPSRampTimesBS:20},{Name:"ColossusSalvage",TID:"TID_MODULE_SALVAGE",TID_Description:"TID_MODULE_SALVAGE_DESCR",RSLevel:1,Icon:"Mod_Salvage_Icon",Hide:1,DoNotAward:1,SlotType:"Support",ActivationType:"Passive",ActivateFX:"Salvage_activate",ScaleEffectsWithZoom:1,SalvageAmountRS:1e4}]},CerberusInterceptor:{Name:"CerberusInterceptor",TID:"TID_SHIP_CERB_INTERCEPTOR",TID_Description:"TID_SHIP_CERB_INTERCEPTOR_DESCR",TID_INFO_SCREEN:"TID_SHIP_CERB_INTERCEPTOR_DESCR",ConceptImage:"portrait_Interceptor",Model:"Fighter_Cerberus3_DrkNeb_lv1",ModelScale:105,SortLayer:2,IsCombatShip:1,CanBeBuilt:0,NewModuleSlots:"Weapon",BuildCost:0,RequiredPlanetLevel:0,HP:4500,Speed_YS:130,Speed_NonYS:130,ShipAIHandler:5,AIUpdateIntervalSeconds:15,AggressiveAI:1,InfluencePoints:40,BSPenaltyPerSec:800,modules:[{Name:"InterceptorMBattery",TID:"TID_MODULE_MASS_BATTERY",TID_Description:"TID_MODULE_MASS_BATTERY_DESCR",RSLevel:1,Icon:"Mod_MassBattery_Icon",Hide:1,DoNotAward:1,SlotType:"Weapon",ActivationType:"Passive",WeaponEffectType:"bullets",WeaponFx:"Gun_Projectile01_Strong",EffectRadius:1200,DPS:90,MaxTargets:4}]},CerberusDestroyer:{Name:"CerberusDestroyer",TID:"TID_SHIP_CERB_DESTROYER",TID_Description:"TID_SHIP_CERB_DESTROYER_DESCR",TID_INFO_SCREEN:"TID_SHIP_CERB_DESTROYER_DESCR",ConceptImage:"portrait_CerberusDestroyer",Model:"Cerberus_Destroyer_DrkNeb_lv1",ModelScale:100,SortLayer:3,IsCombatShip:1,CanBeBuilt:0,NewModuleSlots:"Support",BuildCost:0,RequiredPlanetLevel:0,HP:8e3,Speed_YS:45,Speed_NonYS:45,ShipAIHandler:6,PlanetDamagePerSecFP:55550,ApplyModuleOnDockedObjectDestroy:1,AIUpdateIntervalSeconds:20,AggressiveAI:1,InfluencePoints:80,modules:[{Name:"DestroyerVengeance",TID:"TID_MODULE_DESTROYER_VENGEANCE",TID_Description:"TID_MODULE_DESTROYER_VENGEANCE_DESCR",RSLevel:1,Icon:"Mod_Vengeance_Icon",Hide:1,HideSelection:1,DoNotAward:1,UnlockBlueprints:0,UnlockPrice:0,UnlockTime:0,SlotType:"Support",ActivationType:"Passive",ActivateFX:"Destiny_activate",ActivateFXStaysInPlace:1,EffectRadius:1e3,AOEDamage:2e3,ApplyAOEDamageOnDestroy:1}]},CerberusPhoenix:{Name:"CerberusPhoenix",TID:"TID_SHIP_CERB_PHOENIX",TID_Description:"TID_SHIP_CERB_PHOENIX_DESCR",TID_INFO_SCREEN:"TID_SHIP_CERB_PHOENIX_DESCR",ConceptImage:"portrait_CerberusPhoenix",Model:"Fighter_DrkNeb_Cerberus4_lv1",ModelScale:100,SortLayer:3,IsCombatShip:1,CanBeBuilt:0,NewModuleSlots:["Weapon","Shield"],BuildCost:0,RequiredPlanetLevel:0,HP:3e4,Speed_YS:45,Speed_NonYS:45,ShipAIHandler:7,AIUpdateIntervalSeconds:10,AggressiveAI:1,InfluencePoints:180,BSPenaltyPerSec:1e3,OnDestroySpawn:"CerberusSentinel",OnDestroySpawnCount:3,OnDestroySpawnMinRadius:300,OnDestroySpawnMaxRadius:600,SpawnFx:"SentinelSpawn_Fx",modules:[{Name:"PhoenixDualLaser",TID:"TID_MODULE_DUAL_LASER",TID_Description:"TID_MODULE_DUAL_LASER_DESCR",Icon:"Mod_DualLaser_Icon",Hide:1,DoNotAward:1,SlotType:"Weapon",ActivationType:"Passive",WeaponEffectType:"beam",EffectRadius:1200,RampDPS0:120,RampDPS1:300,RampDPS2:450,RampDPS_BLS0:120,RampDPS_BLS1:300,RampDPS_BLS2:450,RampDPS_WS0:120,RampDPS_WS1:300,RampDPS_WS2:450,DPSRampTimes:15,DPSRampTimes_BLS:15,MaxTargets:2,DPSRampTimesWS:9e3},{Name:"PhoenixShield",TID:"TID_MODULE_AREA_SHIELD",TID_Description:"TID_MODULE_AREA_SHIELD_DESCR_CERB",RSLevel:1,Icon:"Mod_AreaShieldRed_Icon",Hide:1,DoNotAward:1,SlotType:"Shield",ActivationType:"Activated",SustainedFX:"AreaShieldEnemy_Sustained",ActivationDelay:300,EffectRadius:1400,EffectDurationx10:18e3,ShieldStrength:2e4,IsAreaShield:1,ActivationDelayWS:18e4,EffectDurationx10WS:108e5,ActivationDelayBS:600,EffectDurationx10BS:36e3}]},TutBattleship:{Name:"TutBattleship",TID:"TID_SHIP_BATTLESHIP",TID_Description:"TID_SHIP_BATTLESHIP_DESCR",TID_INFO_SCREEN:"TID_SHIP_BATTLESHIP_DESCR",TID_UPGRADE:"TID_UPGRADE_BS_DESIGN",ConceptImage:"portrait_Battleship",Model:"Battleship_DrkNeb_lv3",ModelScale:100,SortLayer:3,IsCombatShip:1,IsDrone:1,CanBeBuilt:0,NewModuleSlots:"Weapon",BuildCost:0,DesignUpgradeCost:0,DesignUpgradeTime:0,RequiredPlanetLevel:0,HP:6e3,HydrogenCapacity:0,Speed_YS:100,Speed_NonYS:100,FuelUsePer5000Distance:0,ShipAIHandler:9,AIUpdateIntervalSeconds:4,modules:[{Name:"WeakBattery",TID:"TID_MODULE_WEAK_BATTERY",TID_Description:"TID_MODULE_WEAK_BATTERY_DESCR",RSLevel:1,Icon:"Mod_Weak_Battery_Icon",InitialBlueprints:1,Hide:1,HideSelection:1,DoNotAward:1,UnlockBlueprints:1,UnlockPrice:0,UnlockTime:0,SlotType:"Weapon",ActivationType:"Passive",WeaponEffectType:"bullets",WeaponFx:"Gun_Projectile01_Weak",EffectRadius:1200,DPS:64}]},CerberusBomber:{Name:"CerberusBomber",TID:"TID_SHIP_CERBERUS_BOMBER",TID_Description:"TID_SHIP_CERBERUS_BOMBER_DESCR",TID_INFO_SCREEN:"TID_SHIP_CERBERUS_BOMBER_DESCR",ConceptImage:"portrait_CerberusBomber",Model:"Fighter_DrkNeb_Cerberus5_lv1",ModelScale:100,SortLayer:3,IsCombatShip:1,CanBeBuilt:0,NewModuleSlots:"Weapon",BuildCost:0,RequiredPlanetLevel:0,HP:35e3,Speed_YS:40,Speed_NonYS:40,ShipAIHandler:11,AIUpdateIntervalSeconds:2,AggressiveAI:1,InfluencePoints:200,BSPenaltyPerSec:1500,BSPenaltyPerSecOnSector:250,modules:[{Name:"BomberLauncher",TID:"TID_MODULE_ROCKET_LAUNCHER",TID_Description:"TID_MODULE_ROCKET_LAUNCHER_DESCR",RSLevel:1,Icon:"Mod_BomberRocket_Icon",InitialBlueprints:0,Hide:1,DoNotAward:1,SlotType:"Weapon",ActivationType:"Activated",WeaponEffectType:"projectile",WeaponFx:"BomberRocket",ActivateFX:"BomberLauncher_activate",ScaleEffectsWithZoom:1,ActivationDelay:24,StopCountdownOnDisable:1,projectile:{Name:"BomberRocket",TID:"TID_MODULE_ROCKET_LAUNCHER",TID_Description:"TID_BOMBER_ROCKET_DESCR",SpeedPVE:90,SpeedPVP:90,HP:900,Damage:2500,DamageWhenNeutralized:800,DamageRange:1200,DamageRangeWhenNeutralized:800,AdditionalWaypoint:0,Model:"projectiles/BomberRocket_DrkNeb",ImpactFX:"projectiles/BomberRocketHit_FX",DestroyedFX:"projectiles/OmegaRocketDeath_FX"},ActivationDelayWS:14400,ActivationDelayBS:48}]},BlueStarBot:{Name:"BlueStarBot",TID:"TID_SHIP_BATTLESHIP",TID_Description:"TID_SHIP_BATTLESHIP_DESCR",TID_INFO_SCREEN:"TID_SHIP_BATTLESHIP_DESCR",TID_UPGRADE:"TID_UPGRADE_BS_DESIGN",ConceptImage:"portrait_Battleship",Model:["Battleship_DrkNeb_lv1","Battleship_DrkNeb_lv2","Battleship_DrkNeb_lv3","Battleship_DrkNeb_lv4","Battleship_DrkNeb_lv5"],ModelScale:100,SortLayer:3,IsCombatShip:1,CanBeBuilt:0,NewModuleSlots:[["Weapon","Shield"],"Support","Support","Support","Support"],HP:[4200,6e3,8e3,1e4,12e3],HydrogenCapacity:0,Speed_YS:100,Speed_NonYS:100,ShipAIHandler:12,AIUpdateIntervalSeconds:5,BSPenaltyPerSec:[500,1e3,1500,3e3,5e3],modules:[{Name:"WeakBattery",TID:"TID_MODULE_WEAK_BATTERY",TID_Description:"TID_MODULE_WEAK_BATTERY_DESCR",RSLevel:1,Icon:"Mod_Weak_Battery_Icon",InitialBlueprints:1,Hide:1,HideSelection:1,DoNotAward:1,UnlockBlueprints:1,UnlockPrice:0,UnlockTime:0,SlotType:"Weapon",ActivationType:"Passive",WeaponEffectType:"bullets",WeaponFx:"Gun_Projectile01_Weak",EffectRadius:1200,DPS:64}]},CerberusStorm:{Name:"CerberusStorm",TID:"TID_SHIP_STORM",TID_Description:"TID_SHIP_STORM_DESCR",TID_INFO_SCREEN:"TID_SHIP_STORM_DESCR",ConceptImage:"portrait_CerberusStorm",Model:"Fighter_DrkNeb_Cerberus6_lv1",ModelScale:100,SortLayer:3,IsCombatShip:1,CanBeBuilt:0,NewModuleSlots:"Weapon",BuildCost:0,RequiredPlanetLevel:0,HP:3e4,Speed_YS:6,Speed_NonYS:6,ShipAIHandler:13,InfluencePoints:150,RadialMoveRadius:1600,modules:[{Name:"StormDarts",TID:"TID_MODULE_DART_BARRAGE",TID_Description:"TID_MODULE_DART_BARRAGE_DESCR",RSLevel:1,Icon:"Mod_DartBarrage_Icon",InitialBlueprints:0,Hide:1,DoNotAward:1,SlotType:"Weapon",ActivationType:"Passive",WeaponEffectType:"projectile",WeaponFx:"StormDarts",ActivateFX:"BomberLauncher_activate",ScaleEffectsWithZoom:1,ActivationDelay:5,EffectRadius:2500,MaxTargets:16,StopCountdownOnDisable:1,projectile:{Name:"StormDarts",TID:"TID_DART_MISSILE",TID_Description:"TID_DART_MISSILE_DESCR",SpeedPVE:140,SpeedPVP:140,HP:350,Damage:1200,DamageRange:1e3,AdditionalWaypoint:0,Model:"projectiles/DartRocket_DrkNeb",ImpactFX:"projectiles/DartRocketHit_FX",DestroyedFX:"projectiles/DartRocketDeath_FX",LaunchFX:"projectiles/AlphaRocketLaunch_FX",SingleTarget:1},ActivationDelayWS:3e3,ActivationDelayBS:10}]},CerberusGhosts:{Name:"CerberusGhosts",TID:"TID_SHIP_CERB_GHOSTS",TID_Description:"TID_SHIP_CERB_GHOSTS_DESCR",TID_INFO_SCREEN:"TID_SHIP_CERB_GHOSTS_DESCR",ConceptImage:"portrait_CerberusSwarm",Model:"Cerberus_DrkNeb_Swarm_lv1",ModelScale:100,SortLayer:3,IsCombatShip:1,CanBeBuilt:0,NewModuleSlots:"Weapon",BuildCost:0,RequiredPlanetLevel:0,HP:200,Speed_YS:150,Speed_NonYS:150,InfluencePoints:0,SpawnFx:"SentinelSpawn_Fx",modules:[{Name:"GhostBattery",TID:"TID_MODULE_BATTERY",TID_Description:"TID_MODULE_BATTERY_DESCR",Icon:"Mod_Battery_Icon",InitialBlueprints:0,Hide:1,DoNotAward:1,SlotType:"Weapon",ActivationType:"Passive",WeaponEffectType:"bullets",WeaponFx:"Gun_Projectile01_Strong",EffectRadius:1200,DPS:150,DPS_BS:150,DPS_WS:150}],shipSpawners:{Name:"Ghosts",TID:"TID_GHOST_SPAWNER",TID_Description:"TID_GHOST_SPAWNER_DESCR",ConceptImage:"portrait_CerberusSwarm",ModelToSpawn:"CerberusGhosts",NumToSpawn:14,SpawnDelay:40,RadiusMin:80,RadiusMax:900,SpawnFx:"SentinelSpawn_Fx",MoveUpdateSec:5}},CorpFlagship:{Name:"CorpFlagship",TID:"TID_CORP_FLAGSHIP",TID_Description:"TID_CORP_FLAGSHIP_DESCR",TID_INFO_SCREEN:"TID_CORP_FLAGSHIP_DESCR",ConceptImage:"portrait_CorpFlagship",Model:["Corp_Flagship_lv1_DrkNeb","Corp_Flagship_lv2_DrkNeb","Corp_Flagship_lv3_DrkNeb","Corp_Flagship_lv4_DrkNeb","Corp_Flagship_lv5_DrkNeb","Corp_Flagship_lv5_DrkNeb","Corp_Flagship_lv6_DrkNeb","Corp_Flagship_lv6_DrkNeb","Corp_Flagship_lv7_DrkNeb","Corp_Flagship_lv7_DrkNeb","Corp_Flagship_lv8_DrkNeb","Corp_Flagship_lv8_DrkNeb","Corp_Flagship_lv9_DrkNeb","Corp_Flagship_lv9_DrkNeb","Corp_Flagship_lv10_DrkNeb","Corp_Flagship_lv11_DrkNeb","Corp_Flagship_lv11_DrkNeb","Corp_Flagship_lv12_DrkNeb","Corp_Flagship_lv12_DrkNeb","Corp_Flagship_lv13_DrkNeb"],ModelScale:100,SortLayer:3,IsCombatShip:1,CanBeBuilt:0,BuildCost:0,DesignUpgradeCost:[2e5,6e5,2e6,5e6,2e7,4e7,6e7,8e7,1e8,14e7,18e7,22e7,26e7,3e8,35e7,5e8,8e8,12e8,16e8,2e9],DesignUpgradeTime:0,RequiredPlanetLevel:0,HP:[5e3,5500,6050,6650,7300,8e3,8800,9700,10700,11800,13e3,14200,15600,17500,2e4,22500,25e3,27500,3e4,32500],Speed_YS:80,Speed_NonYS:80,FuelUsePer5000Distance:100,modules:{Battery:[1,2,3,4,5,6,7,8,9,10,10,11,11,12,12,12,12,12,12,12],Immolation:[0,1,1,2,2,3,3,3,3,4,4,4,4,5,5,5,5,5,5,5],Recoil:[0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],FlagshipStealth:[0,0,0,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12],FlagshipDroneSwarm:[0,0,0,0,1,2,3,4,5,6,7,8,9,9,10,10,11,11,12,13],EMPRocket:[0,0,0,0,0,1,2,3,4,5,6,7,8,8,8,8,8,8,8,8],FlagshipRocketCluster:[0,0,0,0,0,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14],FlagshipDartBarrage:[0,0,0,0,0,0,0,0,0,1,1,1,2,2,3,3,3,3,3,3],FlagshipAreaShield:[0,0,0,0,0,0,0,1,1,1,2,2,2,3,3,3,3,3,3,3]}},Hydraling2:{Name:"Hydraling2",TID:"TID_SHIP_CERB_HYDRA_2",TID_Description:"TID_SHIP_CERB_HYDRA_2_DESCR",TID_INFO_SCREEN:"TID_SHIP_CERB_HYDRA_2_DESCR",ConceptImage:"portrait_CerberusHydra",Model:"Battleship_CerberusHydraling2_DrkNeb",ModelScale:150,SortLayer:1,IsCombatShip:1,CanBeBuilt:0,NewModuleSlots:"Weapon",BuildCost:0,HP:12e3,Speed_YS:100,Speed_NonYS:100,ShipAIHandler:4,AIUpdateIntervalSeconds:20,AggressiveAI:1,InfluencePoints:100,EMPResist:80,modules:[{Name:"HydraBarrage",TID:"TID_MODULE_HYDRA_BARRAGE",TID_Description:"TID_MODULE_HYDRA_BARRAGE_DESCR",RSLevel:1,Icon:"Mod_Barrage_Icon",Hide:1,DoNotAward:1,SlotType:"Weapon",ActivationType:"Passive",WeaponEffectType:"bullets",WeaponFx:"Gun_Projectile01_Strong",EffectRadius:1400,DPS:40,AddDPSPerTarget:200}]},Hydraling1:{Name:"Hydraling1",TID:"TID_SHIP_CERB_HYDRA_1",TID_Description:"TID_SHIP_CERB_HYDRA_1_DESCR",TID_INFO_SCREEN:"TID_SHIP_CERB_HYDRA_1_DESCR",ConceptImage:"portrait_CerberusHydra",Model:"Battleship_CerberusHydraling1_DrkNeb",ModelScale:150,SortLayer:1,IsCombatShip:1,CanBeBuilt:0,NewModuleSlots:"Weapon",BuildCost:0,HP:3e4,Speed_YS:100,Speed_NonYS:100,ShipAIHandler:4,AIUpdateIntervalSeconds:20,AggressiveAI:1,InfluencePoints:200,OnDestroySpawn:"Hydraling2",OnDestroySpawnCount:2,OnDestroySpawnMinRadius:300,OnDestroySpawnMaxRadius:600,SpawnFx:"SentinelSpawn_Fx",EMPResist:80,modules:[{level:2,Name:"HydraBarrage",TID:"TID_MODULE_HYDRA_BARRAGE",TID_Description:"TID_MODULE_HYDRA_BARRAGE_DESCR",RSLevel:1,Icon:"Mod_Barrage_Icon",Hide:1,DoNotAward:1,SlotType:"Weapon",ActivationType:"Passive",WeaponEffectType:"bullets",WeaponFx:"Gun_Projectile01_Strong",EffectRadius:1400,DPS:60,AddDPSPerTarget:300}]},CerberusHydra:{Name:"CerberusHydra",TID:"TID_SHIP_CERB_HYDRA",TID_Description:"TID_SHIP_CERB_HYDRA_DESCR",TID_INFO_SCREEN:"TID_SHIP_CERB_HYDRA_DESCR",ConceptImage:"portrait_CerberusHydra",Model:"Battleship_CerberusHydra_DrkNeb",ModelScale:200,SortLayer:0,IsCombatShip:1,CanBeBuilt:0,NewModuleSlots:"Weapon",BuildCost:0,RequiredPlanetLevel:0,HP:6e4,Speed_YS:80,Speed_NonYS:80,ShipAIHandler:4,AIUpdateIntervalSeconds:20,AggressiveAI:1,InfluencePoints:500,OnDestroySpawn:"Hydraling1",OnDestroySpawnCount:2,OnDestroySpawnMinRadius:300,OnDestroySpawnMaxRadius:600,SpawnFx:"SentinelSpawn_Fx",EMPResist:80,modules:[{level:3,Name:"HydraBarrage",TID:"TID_MODULE_HYDRA_BARRAGE",TID_Description:"TID_MODULE_HYDRA_BARRAGE_DESCR",RSLevel:1,Icon:"Mod_Barrage_Icon",Hide:1,DoNotAward:1,SlotType:"Weapon",ActivationType:"Passive",WeaponEffectType:"bullets",WeaponFx:"Gun_Projectile01_Strong",EffectRadius:1400,DPS:120,AddDPSPerTarget:500}]},CerberusStormBLS:{Name:"CerberusStormBLS",TID:"TID_SHIP_STORM",TID_Description:"TID_SHIP_STORM_DESCR",TID_INFO_SCREEN:"TID_SHIP_STORM_DESCR",ConceptImage:"portrait_CerberusStorm",Model:"Fighter_DrkNeb_Cerberus6_lv1",ModelScale:100,SortLayer:3,IsCombatShip:1,CanBeBuilt:0,NewModuleSlots:"Weapon",BuildCost:0,RequiredPlanetLevel:0,HP:3e4,Speed_YS:6,Speed_NonYS:6,ShipAIHandler:13,InfluencePoints:150,RadialMoveRadius:1200,modules:[{Name:"StormDarts",TID:"TID_MODULE_DART_BARRAGE",TID_Description:"TID_MODULE_DART_BARRAGE_DESCR",RSLevel:1,Icon:"Mod_DartBarrage_Icon",InitialBlueprints:0,Hide:1,DoNotAward:1,SlotType:"Weapon",ActivationType:"Passive",WeaponEffectType:"projectile",WeaponFx:"StormDarts",ActivateFX:"BomberLauncher_activate",ScaleEffectsWithZoom:1,ActivationDelay:5,EffectRadius:2500,MaxTargets:16,StopCountdownOnDisable:1,projectile:{Name:"StormDarts",TID:"TID_DART_MISSILE",TID_Description:"TID_DART_MISSILE_DESCR",SpeedPVE:140,SpeedPVP:140,HP:350,Damage:1200,DamageRange:1e3,AdditionalWaypoint:0,Model:"projectiles/DartRocket_DrkNeb",ImpactFX:"projectiles/DartRocketHit_FX",DestroyedFX:"projectiles/DartRocketDeath_FX",LaunchFX:"projectiles/AlphaRocketLaunch_FX",SingleTarget:1},ActivationDelayWS:3e3,ActivationDelayBS:10}]},CerberusCarrier:{Name:"CerberusCarrier",TID:"TID_SHIP_CERB_CARRIER",TID_Description:"TID_SHIP_CERB_CARRIER_DESCR",TID_INFO_SCREEN:"TID_SHIP_CERB_CARRIER_DESCR",ConceptImage:"portrait_CerberusCarrier",Model:"Cerberus_DrkNeb_Carrier",ModelScale:200,SortLayer:0,IsCombatShip:1,CanBeBuilt:0,NewModuleSlots:"Weapon",BuildCost:0,RequiredPlanetLevel:0,HP:5e4,Speed_YS:50,Speed_NonYS:50,ShipAIHandler:15,AIUpdateIntervalSeconds:5,InfluencePoints:150,PeriodSpawnTicks:90,PeriodSpawnType:"CerberusSentinel",PeriodSpawnCount:3,SpawnFx:"SentinelSpawn_Fx",RadialMoveRadius:1600,AITeleportDelay:15,modules:[{Name:"CarrierLaser",TID:"TID_MODULE_CARRIER_LASER",TID_Description:"TID_MODULE_CARRIER_LASER_DESCR",RSLevel:1,Icon:"Mod_TurretLaser_Icon",Hide:1,DoNotAward:1,SlotType:"Weapon",ActivationType:"Passive",WeaponEffectType:"beam",EffectRadius:1200,RampDPS0:60,RampDPS1:300,RampDPS2:600,RampDPS_BLS0:60,RampDPS_BLS1:300,RampDPS_BLS2:600,RampDPS_WS0:60,RampDPS_WS1:300,RampDPS_WS2:600,DPSRampTimes:10,MaxTargets:8,SpawnedShip:26,IndependentLaserRampUp:1,DPSRampTimesWS:6e3,DPSRampTimesBS:20}]},DarkSentinel:{Name:"DarkSentinel",TID:"TID_SHIP_CERB_DARK_SENTINEL",TID_Description:"TID_SHIP_CERB_FIGHTER_DESCR",TID_INFO_SCREEN:"TID_SHIP_CERB_FIGHTER_DESCR",ConceptImage:"portrait_Sentinel",Model:"Fighter_DrkNeb_Cerberus2_lv1",ModelScale:95,SortLayer:4,IsCombatShip:1,CanBeBuilt:0,NewModuleSlots:"Weapon",BuildCost:0,RequiredPlanetLevel:0,HP:1200,Speed_YS:50,Speed_NonYS:50,ShipAIHandler:4,AIUpdateIntervalSeconds:14,AggressiveAI:0,InfluencePoints:10,BSPenaltyPerSec:1500,BaseCerbShipDataIdx:3,modules:[{level:2,Name:"SentinelBattery",TID:"TID_MODULE_BATTERY",TID_Description:"TID_MODULE_BATTERY_DESCR",Icon:"Mod_Battery_Icon",InitialBlueprints:0,Hide:1,DoNotAward:1,SlotType:"Weapon",ActivationType:"Passive",WeaponEffectType:"bullets",WeaponFx:"Gun_Projectile01_Strong",EffectRadius:1200,DPS:250,DPS_BS:250,DPS_WS:250}]},DarkGuardian:{Name:"DarkGuardian",TID:"TID_SHIP_CERB_DARK_GUARDIAN",TID_Description:"TID_SHIP_CERB_SECTOR_GUARDIAN_DESCR",TID_INFO_SCREEN:"TID_SHIP_CERB_SECTOR_GUARDIAN_DESCR",ConceptImage:"portrait_Guardian",Model:"Fighter_DrkNeb_Cerberus1_lv1",ModelScale:100,SortLayer:3,IsCombatShip:1,CanBeBuilt:0,NewModuleSlots:"Weapon",BuildCost:0,RequiredPlanetLevel:0,HP:8e3,Speed_YS:55,Speed_NonYS:55,ShipAIHandler:4,AIUpdateIntervalSeconds:8,AggressiveAI:1,InfluencePoints:20,BSPenaltyPerSec:400,BaseCerbShipDataIdx:4,modules:[{level:2,Name:"GuardianBattery",TID:"TID_MODULE_WEAK_BATTERY",TID_Description:"TID_MODULE_WEAK_BATTERY_DESCR",RSLevel:1,Icon:"Mod_Battery_Icon",InitialBlueprints:1,Hide:1,DoNotAward:1,UnlockBlueprints:1,UnlockPrice:0,UnlockTime:0,SlotType:"Weapon",ActivationType:"Passive",WeaponEffectType:"bullets",WeaponFx:"Gun_Projectile01_Weak",EffectRadius:1200,DPS:80}]},DarkColossus:{Name:"DarkColossus",TID:"TID_SHIP_CERB_DARK_COLOSSUS",TID_Description:"TID_SHIP_CERB_COLOSSUS_DESCR",TID_INFO_SCREEN:"TID_SHIP_CERB_COLOSSUS_DESCR",ConceptImage:"portrait_CerberusColossus",Model:"Battleship_Cerberus_DrkNeb_lv1",ModelScale:95,SortLayer:2,IsCombatShip:1,CanBeBuilt:0,NewModuleSlots:["Weapon","Support"],BuildCost:0,RequiredPlanetLevel:0,HP:2e4,Speed_YS:60,Speed_NonYS:60,ShipAIHandler:4,AIUpdateIntervalSeconds:10,AggressiveAI:1,InfluencePoints:150,BSPenaltyPerSec:1200,BaseCerbShipDataIdx:5,modules:[{level:2,Name:"ColossusLaser",TID:"TID_MODULE_LASER",TID_Description:"TID_MODULE_LASER_DESCR",RSLevel:1,Icon:"Mod_Laser_Icon",Hide:1,DoNotAward:1,SlotType:"Weapon",ActivationType:"Passive",WeaponEffectType:"beam",EffectRadius:1200,RampDPS0:100,RampDPS1:200,RampDPS2:600,RampDPS_BLS0:140,RampDPS_BLS1:250,RampDPS_BLS2:330,RampDPS_WS0:140,RampDPS_WS1:250,RampDPS_WS2:330,DPSRampTimes:20,DPSRampTimesWS:12e3,DPSRampTimesBS:40},{Name:"ColossusSalvage",TID:"TID_MODULE_SALVAGE",TID_Description:"TID_MODULE_SALVAGE_DESCR",RSLevel:1,Icon:"Mod_Salvage_Icon",Hide:1,DoNotAward:1,SlotType:"Support",ActivationType:"Passive",ActivateFX:"Salvage_activate",ScaleEffectsWithZoom:1,SalvageAmountRS:1e4}]},DarkInterceptor:{Name:"DarkInterceptor",TID:"TID_SHIP_CERB_DARK_INTERCEPTOR",TID_Description:"TID_SHIP_CERB_INTERCEPTOR_DESCR",TID_INFO_SCREEN:"TID_SHIP_CERB_INTERCEPTOR_DESCR",ConceptImage:"portrait_Interceptor",Model:"Fighter_Cerberus3_DrkNeb_lv1",ModelScale:105,SortLayer:2,IsCombatShip:1,CanBeBuilt:0,NewModuleSlots:"Weapon",BuildCost:0,RequiredPlanetLevel:0,HP:9e3,Speed_YS:160,Speed_NonYS:160,ShipAIHandler:5,AIUpdateIntervalSeconds:15,AggressiveAI:1,InfluencePoints:40,BSPenaltyPerSec:800,BaseCerbShipDataIdx:6,modules:[{level:2,Name:"InterceptorMBattery",TID:"TID_MODULE_MASS_BATTERY",TID_Description:"TID_MODULE_MASS_BATTERY_DESCR",RSLevel:1,Icon:"Mod_MassBattery_Icon",Hide:1,DoNotAward:1,SlotType:"Weapon",ActivationType:"Passive",WeaponEffectType:"bullets",WeaponFx:"Gun_Projectile01_Strong",EffectRadius:1200,DPS:110,MaxTargets:6}]},DarkDestroyer:{Name:"DarkDestroyer",TID:"TID_SHIP_CERB_DARK_DESTROYER",TID_Description:"TID_SHIP_CERB_DESTROYER_DESCR",TID_INFO_SCREEN:"TID_SHIP_CERB_DESTROYER_DESCR",ConceptImage:"portrait_CerberusDestroyer",Model:"Cerberus_Destroyer_DrkNeb_lv1",ModelScale:100,SortLayer:3,IsCombatShip:1,CanBeBuilt:0,NewModuleSlots:["Weapon","Support"],BuildCost:0,RequiredPlanetLevel:0,HP:1e4,Speed_YS:45,Speed_NonYS:45,ShipAIHandler:6,PlanetDamagePerSecFP:55550,ApplyModuleOnDockedObjectDestroy:1,AIUpdateIntervalSeconds:20,AggressiveAI:1,InfluencePoints:80,BaseCerbShipDataIdx:7,modules:[{Name:"DarkDestroyerPulse",TID:"TID_MODULE_PULSE",TID_Description:"TID_MODULE_PULSE_DESCR",Icon:"Mod_Pulse_Icon",Hide:1,DoNotAward:1,SlotType:"Weapon",ActivationType:"Passive",WeaponEffectType:"pulse",ActivateFX:"Pulse_activate",ActivationDelay:5,EffectRadius:1350,DPS:200,StopCountdownOnDisable:1,ActivationDelayWS:3e3,ActivationDelayBS:10},{level:2,Name:"DestroyerVengeance",TID:"TID_MODULE_DESTROYER_VENGEANCE",TID_Description:"TID_MODULE_DESTROYER_VENGEANCE_DESCR",RSLevel:1,Icon:"Mod_Vengeance_Icon",Hide:1,HideSelection:1,DoNotAward:1,UnlockBlueprints:0,UnlockPrice:0,UnlockTime:0,SlotType:"Support",ActivationType:"Passive",ActivateFX:"Destiny_activate",ActivateFXStaysInPlace:1,EffectRadius:1e3,AOEDamage:5e3,ApplyAOEDamageOnDestroy:1}]},DarkBomber:{Name:"DarkBomber",TID:"TID_SHIP_CERBERUS_DARK_BOMBER",TID_Description:"TID_SHIP_CERBERUS_BOMBER_DESCR",TID_INFO_SCREEN:"TID_SHIP_CERBERUS_BOMBER_DESCR",ConceptImage:"portrait_CerberusBomber",Model:"Fighter_DrkNeb_Cerberus5_lv1",ModelScale:100,SortLayer:3,IsCombatShip:1,CanBeBuilt:0,NewModuleSlots:"Weapon",BuildCost:0,RequiredPlanetLevel:0,HP:48e3,Speed_YS:60,Speed_NonYS:60,ShipAIHandler:11,AIUpdateIntervalSeconds:2,AggressiveAI:1,InfluencePoints:200,BSPenaltyPerSec:1500,BSPenaltyPerSecOnSector:250,BaseCerbShipDataIdx:13,modules:[{level:2,Name:"BomberLauncher",TID:"TID_MODULE_ROCKET_LAUNCHER",TID_Description:"TID_MODULE_ROCKET_LAUNCHER_DESCR",RSLevel:1,Icon:"Mod_BomberRocket_Icon",InitialBlueprints:0,Hide:1,DoNotAward:1,SlotType:"Weapon",ActivationType:"Activated",WeaponEffectType:"projectile",WeaponFx:"BomberRocket",ActivateFX:"BomberLauncher_activate",ScaleEffectsWithZoom:1,ActivationDelay:20,StopCountdownOnDisable:1,projectile:{Name:"BomberRocket",TID:"TID_MODULE_ROCKET_LAUNCHER",TID_Description:"TID_BOMBER_ROCKET_DESCR",SpeedPVE:90,SpeedPVP:90,HP:1e3,Damage:4e3,DamageWhenNeutralized:1250,DamageRange:1200,DamageRangeWhenNeutralized:800,AdditionalWaypoint:0,Model:"projectiles/BomberRocket_DrkNeb",ImpactFX:"projectiles/BomberRocketHit_FX",DestroyedFX:"projectiles/OmegaRocketDeath_FX"},ActivationDelayWS:12e3,ActivationDelayBS:40}]},DarkPhoenix:{Name:"DarkPhoenix",TID:"TID_SHIP_CERBERUS_DARK_PHOENIX",TID_Description:"TID_SHIP_CERB_PHOENIX_DESCR",TID_INFO_SCREEN:"TID_SHIP_CERB_PHOENIX_DESCR",ConceptImage:"portrait_CerberusPhoenix",Model:"Fighter_DrkNeb_Cerberus4_lv1",ModelScale:100,SortLayer:3,IsCombatShip:1,CanBeBuilt:0,NewModuleSlots:["Weapon","Shield"],BuildCost:0,RequiredPlanetLevel:0,HP:5e4,Speed_YS:45,Speed_NonYS:45,ShipAIHandler:7,AIUpdateIntervalSeconds:10,AggressiveAI:1,InfluencePoints:180,BSPenaltyPerSec:1e3,OnDestroySpawn:"DarkSentinel",OnDestroySpawnCount:5,OnDestroySpawnMinRadius:300,OnDestroySpawnMaxRadius:600,SpawnFx:"SentinelSpawn_Fx",BaseCerbShipDataIdx:8,modules:[{level:2,Name:"PhoenixDualLaser",TID:"TID_MODULE_DUAL_LASER",TID_Description:"TID_MODULE_DUAL_LASER_DESCR",Icon:"Mod_DualLaser_Icon",Hide:1,DoNotAward:1,SlotType:"Weapon",ActivationType:"Passive",WeaponEffectType:"beam",EffectRadius:1200,RampDPS0:140,RampDPS1:350,RampDPS2:500,RampDPS_BLS0:140,RampDPS_BLS1:350,RampDPS_BLS2:500,RampDPS_WS0:140,RampDPS_WS1:350,RampDPS_WS2:500,DPSRampTimes:30,DPSRampTimes_BLS:30,MaxTargets:2,DPSRampTimesWS:18e3},{level:2,Name:"PhoenixShield",TID:"TID_MODULE_AREA_SHIELD",TID_Description:"TID_MODULE_AREA_SHIELD_DESCR_CERB",RSLevel:1,Icon:"Mod_AreaShieldRed_Icon",Hide:1,DoNotAward:1,SlotType:"Shield",ActivationType:"Activated",SustainedFX:"AreaShieldEnemy_Sustained",ActivationDelay:300,EffectRadius:1400,EffectDurationx10:18e3,ShieldStrength:25e3,IsAreaShield:1,ActivationDelayWS:18e4,EffectDurationx10WS:108e5,ActivationDelayBS:600,EffectDurationx10BS:36e3}]},TutorialSentinel:{Name:"TutorialSentinel",TID:"TID_SHIP_CERB_FIGHTER",TID_Description:"TID_SHIP_CERB_FIGHTER_DESCR",TID_INFO_SCREEN:"TID_SHIP_CERB_FIGHTER_DESCR",ConceptImage:"portrait_Sentinel",Model:"Fighter_DrkNeb_Cerberus2_lv1",ModelScale:95,SortLayer:4,IsCombatShip:1,CanBeBuilt:0,NewModuleSlots:"Weapon",BuildCost:0,RequiredPlanetLevel:0,HP:600,Speed_YS:50,Speed_NonYS:50,ShipAIHandler:4,AIUpdateIntervalSeconds:14,AggressiveAI:0,InfluencePoints:10,BSPenaltyPerSec:1500,ExclusiveTutorialTarget:11,modules:[{Name:"SentinelBattery",TID:"TID_MODULE_BATTERY",TID_Description:"TID_MODULE_BATTERY_DESCR",Icon:"Mod_Battery_Icon",InitialBlueprints:0,Hide:1,DoNotAward:1,SlotType:"Weapon",ActivationType:"Passive",WeaponEffectType:"bullets",WeaponFx:"Gun_Projectile01_Strong",EffectRadius:1200,DPS:210,DPS_BS:210,DPS_WS:210}]}}}}]);