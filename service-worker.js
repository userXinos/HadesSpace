if(!self.define){let e,r={};const i=(i,a)=>(i=new URL(i+".js",a).href,r[i]||new Promise((r=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=r,document.head.appendChild(e)}else e=i,importScripts(i),r()})).then((()=>{let e=r[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(a,l)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(r[n])return;let s={};const p=e=>i(e,n),u={module:{uri:n},exports:s,require:p};r[n]=Promise.all(a.map((e=>u[e]||p(e)))).then((e=>(l(...e),s)))}}define(["./workbox-2d118ab0"],(function(e){"use strict";e.setCacheNameDetails({prefix:"hades-space"}),self.skipWaiting(),e.precacheAndRoute([{url:"/HadesSpace/404.html",revision:"dec0e5853338d708b6f2602239bfa350"},{url:"/HadesSpace/CartographerRU/images/instruct1.png",revision:"3daeb2770a2eab92dd45e5f27f069a29"},{url:"/HadesSpace/CartographerRU/images/instruct2.png",revision:"d5e4d6d6b7f07d0ff221669cc1eaf5c3"},{url:"/HadesSpace/CartographerRU/images/layers-2x.png",revision:"4f0283c6ce28e888000e978e537a6a56"},{url:"/HadesSpace/CartographerRU/images/layers.png",revision:"a6137456ed160d7606981aa57c559898"},{url:"/HadesSpace/CartographerRU/images/marker-icon-2x.png",revision:"401d815dc206b8dc1b17cd0e37695975"},{url:"/HadesSpace/CartographerRU/images/marker-icon.png",revision:"2273e3d8ad9264b7daa5bdbf8e6b47f8"},{url:"/HadesSpace/CartographerRU/images/marker-shadow.png",revision:"44a526eed258222515aa21eaffd14a96"},{url:"/HadesSpace/CartographerRU/index.html",revision:"967e7ae310782280782a85e74138ad17"},{url:"/HadesSpace/CartographerRU/leaflet.css",revision:"83499c88888e27f85435b14fc288e632"},{url:"/HadesSpace/CartographerRU/leaflet.js",revision:"762a6b64eba28bd621f2fc8aba9168d6"},{url:"/HadesSpace/CartographerRU/style.css",revision:"450fc463b8b1a349df717056fbb3e078"},{url:"/HadesSpace/css/927.35afad80.css",revision:null},{url:"/HadesSpace/css/About.0ffbb70d.css",revision:null},{url:"/HadesSpace/css/Achievements.7f740007.css",revision:null},{url:"/HadesSpace/css/AllianceLevels.7f740007.css",revision:null},{url:"/HadesSpace/css/BlueStar.7f740007.css",revision:null},{url:"/HadesSpace/css/Cerberus.9d5a709b.css",revision:null},{url:"/HadesSpace/css/DarkRedStar.06cbf73b.css",revision:null},{url:"/HadesSpace/css/Index.cad61b87.css",revision:null},{url:"/HadesSpace/css/Mining.7f740007.css",revision:null},{url:"/HadesSpace/css/ModulesCalc.b4b7454a.css",revision:null},{url:"/HadesSpace/css/PlanetsCalc.408b0720.css",revision:null},{url:"/HadesSpace/css/PlayerGoals.7f740007.css",revision:null},{url:"/HadesSpace/css/RedStar.184d46cf.css",revision:null},{url:"/HadesSpace/css/Shield.7f740007.css",revision:null},{url:"/HadesSpace/css/Ships.24c2abda.css",revision:null},{url:"/HadesSpace/css/SpaceBuildings.7f740007.css",revision:null},{url:"/HadesSpace/css/Support.7f740007.css",revision:null},{url:"/HadesSpace/css/Trade.7f740007.css",revision:null},{url:"/HadesSpace/css/Weapon.7f740007.css",revision:null},{url:"/HadesSpace/css/WhiteStar.741e9b82.css",revision:null},{url:"/HadesSpace/css/YellowStar.5c3a1690.css",revision:null},{url:"/HadesSpace/css/app.32c1d008.css",revision:null},{url:"/HadesSpace/favicon/150x150.png",revision:"7ac132d32e3760e93b81d305f4fd25ac"},{url:"/HadesSpace/favicon/16x16.png",revision:"bc0a3a9097013db0736970d421bc0516"},{url:"/HadesSpace/favicon/192x192.png",revision:"2416bdc39ec05133a5ec65109f01514f"},{url:"/HadesSpace/favicon/32x32.png",revision:"8c9e4de86ec33dbcbcb752440161a7d1"},{url:"/HadesSpace/favicon/512x512.png",revision:"1addb7269b39c6dece2e4f716d6a12f2"},{url:"/HadesSpace/favicon/apple-touch.png",revision:"969a2ad199640e64204cf322eb397e16"},{url:"/HadesSpace/favicon/favicon.png",revision:"59ab6640e691932b8197ec8bdad44229"},{url:"/HadesSpace/favicon/safari-pinned-tab.svg",revision:"f0139fcda368ab3f6bf4c4ce34583552"},{url:"/HadesSpace/img/AlphaBadge01.aaf854bd.png",revision:null},{url:"/HadesSpace/img/AlphaDrone_lv1.27f991aa.png",revision:null},{url:"/HadesSpace/img/AlphaDrone_lv1_DrkNeb.8fc73070.png",revision:null},{url:"/HadesSpace/img/AlphaDrone_lv2.c798ffc1.png",revision:null},{url:"/HadesSpace/img/AlphaDrone_lv2_DrkNeb.1ab52d80.png",revision:null},{url:"/HadesSpace/img/AlphaDrone_lv3.41c0a2c9.png",revision:null},{url:"/HadesSpace/img/AlphaDrone_lv3_DrkNeb.4d5f143b.png",revision:null},{url:"/HadesSpace/img/Battleship_CerberusHydra.d7af3bd6.png",revision:null},{url:"/HadesSpace/img/Battleship_CerberusHydra_DrkNeb.2b9d8032.png",revision:null},{url:"/HadesSpace/img/Battleship_CerberusHydraling1.bb18845c.png",revision:null},{url:"/HadesSpace/img/Battleship_CerberusHydraling1_DrkNeb.8365e151.png",revision:null},{url:"/HadesSpace/img/Battleship_CerberusHydraling2.22ef566c.png",revision:null},{url:"/HadesSpace/img/Battleship_CerberusHydraling2_DrkNeb.2050d0a0.png",revision:null},{url:"/HadesSpace/img/Battleship_Cerberus_DrkNeb.2e08c1aa.png",revision:null},{url:"/HadesSpace/img/Battleship_Cerberus_lv1.d305e782.png",revision:null},{url:"/HadesSpace/img/Battleship_DrkNeb_lv1.44ad7dea.png",revision:null},{url:"/HadesSpace/img/Battleship_DrkNeb_lv2.72a0eaf0.png",revision:null},{url:"/HadesSpace/img/Battleship_DrkNeb_lv3.de6d7fc8.png",revision:null},{url:"/HadesSpace/img/Battleship_DrkNeb_lv4.bc459d9e.png",revision:null},{url:"/HadesSpace/img/Battleship_DrkNeb_lv5.e731547c.png",revision:null},{url:"/HadesSpace/img/Battleship_DrkNeb_lv6.99c56bcf.png",revision:null},{url:"/HadesSpace/img/Battleship_lv1.a9c983f9.png",revision:null},{url:"/HadesSpace/img/Battleship_lv2.6c9cb279.png",revision:null},{url:"/HadesSpace/img/Battleship_lv3.7915ea44.png",revision:null},{url:"/HadesSpace/img/Battleship_lv4.498b350b.png",revision:null},{url:"/HadesSpace/img/Battleship_lv5.a45ff6ea.png",revision:null},{url:"/HadesSpace/img/Battleship_lv6.72df93e7.png",revision:null},{url:"/HadesSpace/img/BlackCitadel.c9cf0466.png",revision:null},{url:"/HadesSpace/img/CerberusStation.793dc304.png",revision:null},{url:"/HadesSpace/img/CerberusStation_DrkNeb.793dc304.png",revision:null},{url:"/HadesSpace/img/CerberusStation_DrkNeb_lv2.d65ed47c.png",revision:null},{url:"/HadesSpace/img/CerberusStation_DrkNeb_lv3.9053d732.png",revision:null},{url:"/HadesSpace/img/CerberusStation_lv2.d65ed47c.png",revision:null},{url:"/HadesSpace/img/CerberusStation_lv3.9053d732.png",revision:null},{url:"/HadesSpace/img/Cerberus_Destroyer_DrkNeb.6ca301c5.png",revision:null},{url:"/HadesSpace/img/Cerberus_Destroyer_lv1.35ddf7a2.png",revision:null},{url:"/HadesSpace/img/Cerberus_DrkNeb_Carrier.437e7c14.png",revision:null},{url:"/HadesSpace/img/Cerberus_DrkNeb_Swarm.a9daa268.png",revision:null},{url:"/HadesSpace/img/Cerberus_DrkNeb_swarm1.a9daa268.png",revision:null},{url:"/HadesSpace/img/Cerberus_Swarm_lv1.3bec4210.png",revision:null},{url:"/HadesSpace/img/Corp_Flagship_lv1.914e210a.png",revision:null},{url:"/HadesSpace/img/Corp_Flagship_lv10.90b795c5.png",revision:null},{url:"/HadesSpace/img/Corp_Flagship_lv10_DrkNeb.ace5012a.png",revision:null},{url:"/HadesSpace/img/Corp_Flagship_lv11_DrkNeb.d1d7aa7d.png",revision:null},{url:"/HadesSpace/img/Corp_Flagship_lv12_DrkNeb.53dbf7c9.png",revision:null},{url:"/HadesSpace/img/Corp_Flagship_lv13_DrkNeb.f70cc605.png",revision:null},{url:"/HadesSpace/img/Corp_Flagship_lv1_DrkNeb.eb15636e.png",revision:null},{url:"/HadesSpace/img/Corp_Flagship_lv2.72288a4c.png",revision:null},{url:"/HadesSpace/img/Corp_Flagship_lv2_DrkNeb.89b20588.png",revision:null},{url:"/HadesSpace/img/Corp_Flagship_lv3.a8156624.png",revision:null},{url:"/HadesSpace/img/Corp_Flagship_lv3_DrkNeb.6c76acfb.png",revision:null},{url:"/HadesSpace/img/Corp_Flagship_lv4.8a761994.png",revision:null},{url:"/HadesSpace/img/Corp_Flagship_lv4_DrkNeb.578457f1.png",revision:null},{url:"/HadesSpace/img/Corp_Flagship_lv5.5f539430.png",revision:null},{url:"/HadesSpace/img/Corp_Flagship_lv5_DrkNeb.f8a4b4c9.png",revision:null},{url:"/HadesSpace/img/Corp_Flagship_lv6.3dbb83ff.png",revision:null},{url:"/HadesSpace/img/Corp_Flagship_lv6_DrkNeb.2237ea51.png",revision:null},{url:"/HadesSpace/img/Corp_Flagship_lv7.19781c8b.png",revision:null},{url:"/HadesSpace/img/Corp_Flagship_lv7_DrkNeb.eb11557f.png",revision:null},{url:"/HadesSpace/img/Corp_Flagship_lv8.3dab74b1.png",revision:null},{url:"/HadesSpace/img/Corp_Flagship_lv8_DrkNeb.336839a4.png",revision:null},{url:"/HadesSpace/img/Corp_Flagship_lv9.0bd45b63.png",revision:null},{url:"/HadesSpace/img/Corp_Flagship_lv9_DrkNeb.19f8495f.png",revision:null},{url:"/HadesSpace/img/Distinction_Admiral.72cca942.png",revision:null},{url:"/HadesSpace/img/Distinction_BlueStar1.575ba4a2.png",revision:null},{url:"/HadesSpace/img/Distinction_BlueStar10.b4dcdc77.png",revision:null},{url:"/HadesSpace/img/Distinction_BlueStar50.103aa3e0.png",revision:null},{url:"/HadesSpace/img/Distinction_Emperor.72854902.png",revision:null},{url:"/HadesSpace/img/Distinction_Governer.ce1b09c7.png",revision:null},{url:"/HadesSpace/img/Distinction_WhiteStar1.396fc1f5.png",revision:null},{url:"/HadesSpace/img/Fighter_Cerberus1_lv1.94cd35a6.png",revision:null},{url:"/HadesSpace/img/Fighter_Cerberus2_lv1.58f35199.png",revision:null},{url:"/HadesSpace/img/Fighter_Cerberus3_DrkNeb.2dbb69b3.png",revision:null},{url:"/HadesSpace/img/Fighter_Cerberus3_lv1.6414a30e.png",revision:null},{url:"/HadesSpace/img/Fighter_Cerberus4_lv1.dc60a8a3.png",revision:null},{url:"/HadesSpace/img/Fighter_Cerberus5_lv1.be53baac.png",revision:null},{url:"/HadesSpace/img/Fighter_Cerberus6_lv1.7322224d.png",revision:null},{url:"/HadesSpace/img/Fighter_Cerberus_DrkNeb.2dbb69b3.png",revision:null},{url:"/HadesSpace/img/Fighter_DrkNeb_Cerberus1.92c24f5c.png",revision:null},{url:"/HadesSpace/img/Fighter_DrkNeb_Cerberus1_lv1.9bb5c76a.png",revision:null},{url:"/HadesSpace/img/Fighter_DrkNeb_Cerberus2.ab993d23.png",revision:null},{url:"/HadesSpace/img/Fighter_DrkNeb_Cerberus3.6ca301c5.png",revision:null},{url:"/HadesSpace/img/Fighter_DrkNeb_Cerberus4.84ea804b.png",revision:null},{url:"/HadesSpace/img/Fighter_DrkNeb_Cerberus5.2561b428.png",revision:null},{url:"/HadesSpace/img/Fighter_DrkNeb_Cerberus6.13eff6e6.png",revision:null},{url:"/HadesSpace/img/Miner_DrkNeb_lv1.d762b900.png",revision:null},{url:"/HadesSpace/img/Miner_DrkNeb_lv2.b9c03206.png",revision:null},{url:"/HadesSpace/img/Miner_DrkNeb_lv3.a4e952df.png",revision:null},{url:"/HadesSpace/img/Miner_DrkNeb_lv4.523e41c2.png",revision:null},{url:"/HadesSpace/img/Miner_DrkNeb_lv5.5140b822.png",revision:null},{url:"/HadesSpace/img/Miner_DrkNeb_lv6.36a3b9c5.png",revision:null},{url:"/HadesSpace/img/Miner_lv1.0c18c064.png",revision:null},{url:"/HadesSpace/img/Miner_lv2.e2feedec.png",revision:null},{url:"/HadesSpace/img/Miner_lv3.fc359dc2.png",revision:null},{url:"/HadesSpace/img/Miner_lv4.6c383dd3.png",revision:null},{url:"/HadesSpace/img/Miner_lv5.57a244f9.png",revision:null},{url:"/HadesSpace/img/Miner_lv6.a5896521.png",revision:null},{url:"/HadesSpace/img/MiningDrone_DrkNeb_lv1.13e8c628.png",revision:null},{url:"/HadesSpace/img/MiningDrone_DrkNeb_lv10.170d276a.png",revision:null},{url:"/HadesSpace/img/MiningDrone_DrkNeb_lv2.5b1b720d.png",revision:null},{url:"/HadesSpace/img/MiningDrone_DrkNeb_lv4.43c35729.png",revision:null},{url:"/HadesSpace/img/MiningDrone_DrkNeb_lv7.5284c3be.png",revision:null},{url:"/HadesSpace/img/MiningDrone_lv10.d93070bb.png",revision:null},{url:"/HadesSpace/img/MiningDrone_lv4-6.f2c09a10.png",revision:null},{url:"/HadesSpace/img/RelicDrone_lv1_DrkNeb.bf0e1948.png",revision:null},{url:"/HadesSpace/img/RelicDrone_lv2_DrkNeb.ad0679de.png",revision:null},{url:"/HadesSpace/img/RelicDrone_lv3_DrkNeb.ab519c03.png",revision:null},{url:"/HadesSpace/img/RemoteBomb.1a71e1b9.png",revision:null},{url:"/HadesSpace/img/RemoteBomb_DrkNeb.1a71e1b9.png",revision:null},{url:"/HadesSpace/img/ResearchMagnify_Icon.8e5097e1.png",revision:null},{url:"/HadesSpace/img/ResearchStation.f3eacc10.png",revision:null},{url:"/HadesSpace/img/ShipmentDrone_lv1_DrkNeb.6fac1a15.png",revision:null},{url:"/HadesSpace/img/SpaceBuilding.76875c04.png",revision:null},{url:"/HadesSpace/img/TimeModulator.d347ba73.png",revision:null},{url:"/HadesSpace/img/Transport_DrkNeb_lv1.d03fe6ea.png",revision:null},{url:"/HadesSpace/img/Transport_DrkNeb_lv2.bc0ed84d.png",revision:null},{url:"/HadesSpace/img/Transport_DrkNeb_lv3.b9db7b6f.png",revision:null},{url:"/HadesSpace/img/Transport_DrkNeb_lv4.3ed4b63b.png",revision:null},{url:"/HadesSpace/img/Transport_DrkNeb_lv5.f76d22c6.png",revision:null},{url:"/HadesSpace/img/Transport_DrkNeb_lv6.9f23012b.png",revision:null},{url:"/HadesSpace/img/Transport_lv1.714e7819.png",revision:null},{url:"/HadesSpace/img/Transport_lv2.9fd01882.png",revision:null},{url:"/HadesSpace/img/Transport_lv3.13b9e323.png",revision:null},{url:"/HadesSpace/img/Transport_lv4.33a1cd43.png",revision:null},{url:"/HadesSpace/img/Transport_lv5.6b637562.png",revision:null},{url:"/HadesSpace/img/Transport_lv6.926e51c5.png",revision:null},{url:"/HadesSpace/img/arrow.f223a946.svg",revision:null},{url:"/HadesSpace/img/art.20563834.png",revision:null},{url:"/HadesSpace/img/art.7cbfcd9c.png",revision:null},{url:"/HadesSpace/img/calc.ad6c3479.png",revision:null},{url:"/HadesSpace/img/close.6b363d37.svg",revision:null},{url:"/HadesSpace/img/github_logo.b7172519.png",revision:null},{url:"/HadesSpace/img/logo.d4b2677b.png",revision:null},{url:"/HadesSpace/img/menu.368c620f.svg",revision:null},{url:"/HadesSpace/img/news_Update01.4166e256.png",revision:null},{url:"/HadesSpace/img/news_Update02.19daf0d6.png",revision:null},{url:"/HadesSpace/img/planet.0c7f5afd.png",revision:null},{url:"/HadesSpace/img/planet.23c4780f.png",revision:null},{url:"/HadesSpace/img/planets-calc.73393e3a.png",revision:null},{url:"/HadesSpace/img/portrait_AlphaDrone.4d1ef0b4.png",revision:null},{url:"/HadesSpace/img/portrait_AlphaDrone.6eb85669.png",revision:null},{url:"/HadesSpace/img/portrait_AlphaRocket.b6eeb13d.png",revision:null},{url:"/HadesSpace/img/portrait_AlphaRocket.d329eada.png",revision:null},{url:"/HadesSpace/img/portrait_Anomaly.282fea85.png",revision:null},{url:"/HadesSpace/img/portrait_Anomaly.b0b901d3.png",revision:null},{url:"/HadesSpace/img/portrait_Asteroids.1dfd1a61.png",revision:null},{url:"/HadesSpace/img/portrait_Asteroids.faac7845.png",revision:null},{url:"/HadesSpace/img/portrait_Asteroids_cr.d10f3f4a.png",revision:null},{url:"/HadesSpace/img/portrait_Asteroids_cr.e5b2dd80.png",revision:null},{url:"/HadesSpace/img/portrait_Battleship.669e1f40.png",revision:null},{url:"/HadesSpace/img/portrait_Battleship.ad0aaa9a.png",revision:null},{url:"/HadesSpace/img/portrait_BlueStar.741a09ad.png",revision:null},{url:"/HadesSpace/img/portrait_BlueStar.863634dc.png",revision:null},{url:"/HadesSpace/img/portrait_CerberusBomber.494e56d4.png",revision:null},{url:"/HadesSpace/img/portrait_CerberusBomber.c49ba18e.png",revision:null},{url:"/HadesSpace/img/portrait_CerberusCarrier.176e5eed.png",revision:null},{url:"/HadesSpace/img/portrait_CerberusColossus.34ff8038.png",revision:null},{url:"/HadesSpace/img/portrait_CerberusColossus.44aef0af.png",revision:null},{url:"/HadesSpace/img/portrait_CerberusDestroyer.5b3b391c.png",revision:null},{url:"/HadesSpace/img/portrait_CerberusDestroyer.fa5e72f7.png",revision:null},{url:"/HadesSpace/img/portrait_CerberusHydra.177137be.png",revision:null},{url:"/HadesSpace/img/portrait_CerberusHydra.3c165bb0.png",revision:null},{url:"/HadesSpace/img/portrait_CerberusPhoenix.808baedb.png",revision:null},{url:"/HadesSpace/img/portrait_CerberusPhoenix.b317a46d.png",revision:null},{url:"/HadesSpace/img/portrait_CerberusStation.36e3b3b2.png",revision:null},{url:"/HadesSpace/img/portrait_CerberusStation.ea729e88.png",revision:null},{url:"/HadesSpace/img/portrait_CerberusStorm.67347016.png",revision:null},{url:"/HadesSpace/img/portrait_CerberusStorm.72f906f7.png",revision:null},{url:"/HadesSpace/img/portrait_CerberusSwarm.65c53c04.png",revision:null},{url:"/HadesSpace/img/portrait_CerberusSwarm.be212cd2.png",revision:null},{url:"/HadesSpace/img/portrait_CorpFlagship.a1ff8970.png",revision:null},{url:"/HadesSpace/img/portrait_CorpFlagship.a867d836.png",revision:null},{url:"/HadesSpace/img/portrait_DroneAreaShield.358a1ad0.png",revision:null},{url:"/HadesSpace/img/portrait_DroneAreaShield.828abe30.png",revision:null},{url:"/HadesSpace/img/portrait_DyingPlanet.428747e1.png",revision:null},{url:"/HadesSpace/img/portrait_DyingPlanet.45ade265.png",revision:null},{url:"/HadesSpace/img/portrait_EmptySpace.856e2286.png",revision:null},{url:"/HadesSpace/img/portrait_EmptySpace.dfd72b26.png",revision:null},{url:"/HadesSpace/img/portrait_Guardian.3a2713ae.png",revision:null},{url:"/HadesSpace/img/portrait_Guardian.59056577.png",revision:null},{url:"/HadesSpace/img/portrait_Interceptor.ddacf2fc.png",revision:null},{url:"/HadesSpace/img/portrait_Interceptor.ea343281.png",revision:null},{url:"/HadesSpace/img/portrait_JumpGate.68b7809a.png",revision:null},{url:"/HadesSpace/img/portrait_JumpGate.6cf43704.png",revision:null},{url:"/HadesSpace/img/portrait_Miner.903a4c36.png",revision:null},{url:"/HadesSpace/img/portrait_Miner.ad2997e6.png",revision:null},{url:"/HadesSpace/img/portrait_MiningDrone.6cde0288.png",revision:null},{url:"/HadesSpace/img/portrait_MiningDrone.79b1fcac.png",revision:null},{url:"/HadesSpace/img/portrait_Planet.6505daee.png",revision:null},{url:"/HadesSpace/img/portrait_Planet.ff39d859.png",revision:null},{url:"/HadesSpace/img/portrait_PlanetWhiteStar.2eb63641.png",revision:null},{url:"/HadesSpace/img/portrait_PlanetWhiteStar.d6e9627d.png",revision:null},{url:"/HadesSpace/img/portrait_RedStar.5797a8e0.png",revision:null},{url:"/HadesSpace/img/portrait_RedStar.c8115e46.png",revision:null},{url:"/HadesSpace/img/portrait_RemoteBomb.1b6e36e2.png",revision:null},{url:"/HadesSpace/img/portrait_RemoteBomb.6e8d4260.png",revision:null},{url:"/HadesSpace/img/portrait_Sentinel.bb999e3e.png",revision:null},{url:"/HadesSpace/img/portrait_Sentinel.fc58bceb.png",revision:null},{url:"/HadesSpace/img/portrait_ShipmentDrone.7f9eeec5.png",revision:null},{url:"/HadesSpace/img/portrait_ShipmentDrone.90149456.png",revision:null},{url:"/HadesSpace/img/portrait_SpaceBuilding.1e0ef13e.png",revision:null},{url:"/HadesSpace/img/portrait_SpaceBuilding.a263596c.png",revision:null},{url:"/HadesSpace/img/portrait_Transport.9f9f4458.png",revision:null},{url:"/HadesSpace/img/portrait_Transport.ba4c36cf.png",revision:null},{url:"/HadesSpace/img/portrait_TurretLaser.c15277e9.png",revision:null},{url:"/HadesSpace/img/portrait_TurretLaser.eede8f54.png",revision:null},{url:"/HadesSpace/img/portrait_Tutorial.0cc16efe.png",revision:null},{url:"/HadesSpace/img/portrait_Tutorial.fcf711b7.png",revision:null},{url:"/HadesSpace/img/portrait_WarpLane.53408e80.png",revision:null},{url:"/HadesSpace/img/portrait_WarpLane.ecbc5ff2.png",revision:null},{url:"/HadesSpace/img/portrait_WhiteStar.4a3799f0.png",revision:null},{url:"/HadesSpace/img/portrait_WhiteStar.d70a2bb2.png",revision:null},{url:"/HadesSpace/img/portrait_YellowStar.326cc44e.png",revision:null},{url:"/HadesSpace/img/portrait_YellowStar.b00882d9.png",revision:null},{url:"/HadesSpace/img/redStarScanner.6efd8e9b.png",revision:null},{url:"/HadesSpace/img/relic.6752e037.png",revision:null},{url:"/HadesSpace/img/settings.067b9160.svg",revision:null},{url:"/HadesSpace/img/star_blue.6e921374.png",revision:null},{url:"/HadesSpace/img/star_dark.8a55b2ab.png",revision:null},{url:"/HadesSpace/img/star_red.df88105d.png",revision:null},{url:"/HadesSpace/img/star_red_dark.8a55b2ab.png",revision:null},{url:"/HadesSpace/img/star_white.8cb9eb30.png",revision:null},{url:"/HadesSpace/img/star_yellow.28f9b515.png",revision:null},{url:"/HadesSpace/img/station_BlueStarScanner.6cbb83ac.png",revision:null},{url:"/HadesSpace/img/station_Diplomacy.42f1be0b.png",revision:null},{url:"/HadesSpace/img/station_RedStarScanner.355c5d1e.png",revision:null},{url:"/HadesSpace/img/station_Research.ceacc0b3.png",revision:null},{url:"/HadesSpace/img/station_ShipmentRelay.9ea08c8f.png",revision:null},{url:"/HadesSpace/img/station_Shipyard.190d1c06.png",revision:null},{url:"/HadesSpace/img/station_ShortRangeScanner.a8c7338d.png",revision:null},{url:"/HadesSpace/img/station_WhiteStarScanner.3ddf45cc.png",revision:null},{url:"/HadesSpace/img/station_trade.dbe63410.png",revision:null},{url:"/HadesSpace/img/timeModulator.127450fb.png",revision:null},{url:"/HadesSpace/img/warpLaneHub.398191f4.png",revision:null},{url:"/HadesSpace/index.html",revision:"55c7bf077fbb7549a55f9931ca4eaf62"},{url:"/HadesSpace/js/256.e61b959b.js",revision:null},{url:"/HadesSpace/js/274.94c27aff.js",revision:null},{url:"/HadesSpace/js/278.5e9dbdbe.js",revision:null},{url:"/HadesSpace/js/400.0d3243e3.js",revision:null},{url:"/HadesSpace/js/450.643ff2a4.js",revision:null},{url:"/HadesSpace/js/560.772a726f.js",revision:null},{url:"/HadesSpace/js/561.beefcecd.js",revision:null},{url:"/HadesSpace/js/668.0625cbe0.js",revision:null},{url:"/HadesSpace/js/806.fcc0f99b.js",revision:null},{url:"/HadesSpace/js/85.cb31b36f.js",revision:null},{url:"/HadesSpace/js/868.2522e236.js",revision:null},{url:"/HadesSpace/js/888.cf038424.js",revision:null},{url:"/HadesSpace/js/927.0c9f0b59.js",revision:null},{url:"/HadesSpace/js/948.22eb1c47.js",revision:null},{url:"/HadesSpace/js/964.570297a4.js",revision:null},{url:"/HadesSpace/js/988.43dd6d6e.js",revision:null},{url:"/HadesSpace/js/About.57a96e89.js",revision:null},{url:"/HadesSpace/js/Achievements.55fdda0e.js",revision:null},{url:"/HadesSpace/js/AllianceLevels.c2fe5c39.js",revision:null},{url:"/HadesSpace/js/BlueStar.2de41737.js",revision:null},{url:"/HadesSpace/js/Cerberus.4ce10e0e.js",revision:null},{url:"/HadesSpace/js/DarkRedStar.081503a7.js",revision:null},{url:"/HadesSpace/js/Index.f2be1712.js",revision:null},{url:"/HadesSpace/js/Mining.a34d700f.js",revision:null},{url:"/HadesSpace/js/ModulesCalc.2f6434ee.js",revision:null},{url:"/HadesSpace/js/PlanetsCalc.c21313d6.js",revision:null},{url:"/HadesSpace/js/PlayerGoals.a28eca31.js",revision:null},{url:"/HadesSpace/js/RedStar.e85e6aa7.js",revision:null},{url:"/HadesSpace/js/Shield.19842f34.js",revision:null},{url:"/HadesSpace/js/Ships.f3e658b6.js",revision:null},{url:"/HadesSpace/js/SpaceBuildings.717965b9.js",revision:null},{url:"/HadesSpace/js/Support.f4b26d7d.js",revision:null},{url:"/HadesSpace/js/Trade.8c9e292a.js",revision:null},{url:"/HadesSpace/js/Weapon.df2f04f3.js",revision:null},{url:"/HadesSpace/js/WhiteStar.b49338b1.js",revision:null},{url:"/HadesSpace/js/YellowStar.8c514e74.js",revision:null},{url:"/HadesSpace/js/app.c3eb738c.js",revision:null},{url:"/HadesSpace/js/chunk-vendors.1293702c.js",revision:null},{url:"/HadesSpace/manifest.json",revision:"334271836314703960297c9e634cf03d"},{url:"/HadesSpace/meta-image.png",revision:"ebb83cdcac2992bb6f891618c45cc2f0"},{url:"/HadesSpace/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
