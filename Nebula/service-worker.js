if(!self.define){let e,l={};const a=(a,r)=>(a=new URL(a+".js",r).href,l[a]||new Promise((l=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=l,document.head.appendChild(e)}else e=a,importScripts(a),l()})).then((()=>{let e=l[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(r,i)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(l[n])return;let s={};const u=e=>a(e,n),p={module:{uri:n},exports:s,require:u};l[n]=Promise.all(r.map((e=>p[e]||u(e)))).then((e=>(i(...e),s)))}}define(["./workbox-2d118ab0"],(function(e){"use strict";e.setCacheNameDetails({prefix:"hades-space"}),self.skipWaiting(),e.precacheAndRoute([{url:"/HadesSpace/Nebula/css/326.6e83e137.css",revision:null},{url:"/HadesSpace/Nebula/css/About.0ffbb70d.css",revision:null},{url:"/HadesSpace/Nebula/css/Achievements.1361cde7.css",revision:null},{url:"/HadesSpace/Nebula/css/AllianceLevels.1361cde7.css",revision:null},{url:"/HadesSpace/Nebula/css/BlueStar.1361cde7.css",revision:null},{url:"/HadesSpace/Nebula/css/Cerberus.490fa2f0.css",revision:null},{url:"/HadesSpace/Nebula/css/DarkRedStar.cdd8ecbb.css",revision:null},{url:"/HadesSpace/Nebula/css/Index.cad61b87.css",revision:null},{url:"/HadesSpace/Nebula/css/Mining.1361cde7.css",revision:null},{url:"/HadesSpace/Nebula/css/ModulesCalc.1833412e.css",revision:null},{url:"/HadesSpace/Nebula/css/PlanetsCalc.25d791f3.css",revision:null},{url:"/HadesSpace/Nebula/css/PlayerGoals.1361cde7.css",revision:null},{url:"/HadesSpace/Nebula/css/RedStar.2f6aba6d.css",revision:null},{url:"/HadesSpace/Nebula/css/Shield.1361cde7.css",revision:null},{url:"/HadesSpace/Nebula/css/Ships.13eb0a83.css",revision:null},{url:"/HadesSpace/Nebula/css/SpaceBuildings.1361cde7.css",revision:null},{url:"/HadesSpace/Nebula/css/Support.1361cde7.css",revision:null},{url:"/HadesSpace/Nebula/css/Trade.1361cde7.css",revision:null},{url:"/HadesSpace/Nebula/css/Weapon.1361cde7.css",revision:null},{url:"/HadesSpace/Nebula/css/WhiteStar.386b9f0d.css",revision:null},{url:"/HadesSpace/Nebula/css/YellowStar.be9f8e7e.css",revision:null},{url:"/HadesSpace/Nebula/css/app.498d93d8.css",revision:null},{url:"/HadesSpace/Nebula/favicon/150x150.png",revision:"7ac132d32e3760e93b81d305f4fd25ac"},{url:"/HadesSpace/Nebula/favicon/16x16.png",revision:"bc0a3a9097013db0736970d421bc0516"},{url:"/HadesSpace/Nebula/favicon/192x192.png",revision:"e30ee3ba3b06cfe0d1bf84239b48b31c"},{url:"/HadesSpace/Nebula/favicon/32x32.png",revision:"8c9e4de86ec33dbcbcb752440161a7d1"},{url:"/HadesSpace/Nebula/favicon/512x512.png",revision:"164a0bc1bc5dcf6e8a9c902ff6e808d8"},{url:"/HadesSpace/Nebula/favicon/apple-touch.png",revision:"0380d3c1ed8a06d72833d6a7ab2f72fa"},{url:"/HadesSpace/Nebula/favicon/favicon.png",revision:"59ab6640e691932b8197ec8bdad44229"},{url:"/HadesSpace/Nebula/favicon/safari-pinned-tab.svg",revision:"f0139fcda368ab3f6bf4c4ce34583552"},{url:"/HadesSpace/Nebula/img/AlphaBadge01.aaf854bd.png",revision:null},{url:"/HadesSpace/Nebula/img/AlphaDrone_lv1.dc42619a.png",revision:null},{url:"/HadesSpace/Nebula/img/AlphaDrone_lv1_DrkNeb.8fc73070.png",revision:null},{url:"/HadesSpace/Nebula/img/AlphaDrone_lv2.caff0020.png",revision:null},{url:"/HadesSpace/Nebula/img/AlphaDrone_lv2_DrkNeb.1ab52d80.png",revision:null},{url:"/HadesSpace/Nebula/img/AlphaDrone_lv3.d3b27458.png",revision:null},{url:"/HadesSpace/Nebula/img/AlphaDrone_lv3_DrkNeb.4d5f143b.png",revision:null},{url:"/HadesSpace/Nebula/img/Battleship_Cerberus.a1096a2d.png",revision:null},{url:"/HadesSpace/Nebula/img/Battleship_CerberusHydra.95dc59a2.png",revision:null},{url:"/HadesSpace/Nebula/img/Battleship_CerberusHydra_DrkNeb.2b9d8032.png",revision:null},{url:"/HadesSpace/Nebula/img/Battleship_CerberusHydraling1.11eb1288.png",revision:null},{url:"/HadesSpace/Nebula/img/Battleship_CerberusHydraling1_DrkNeb.8365e151.png",revision:null},{url:"/HadesSpace/Nebula/img/Battleship_CerberusHydraling2.9d873ab0.png",revision:null},{url:"/HadesSpace/Nebula/img/Battleship_CerberusHydraling2_DrkNeb.2050d0a0.png",revision:null},{url:"/HadesSpace/Nebula/img/Battleship_Cerberus_DrkNeb.2e08c1aa.png",revision:null},{url:"/HadesSpace/Nebula/img/Battleship_DrkNeb_lv1.44ad7dea.png",revision:null},{url:"/HadesSpace/Nebula/img/Battleship_DrkNeb_lv2.72a0eaf0.png",revision:null},{url:"/HadesSpace/Nebula/img/Battleship_DrkNeb_lv3.de6d7fc8.png",revision:null},{url:"/HadesSpace/Nebula/img/Battleship_DrkNeb_lv4.bc459d9e.png",revision:null},{url:"/HadesSpace/Nebula/img/Battleship_DrkNeb_lv5.9c342fb8.png",revision:null},{url:"/HadesSpace/Nebula/img/Battleship_DrkNeb_lv6.99c56bcf.png",revision:null},{url:"/HadesSpace/Nebula/img/Battleship_DrkNeb_lv7.2ee58517.png",revision:null},{url:"/HadesSpace/Nebula/img/Battleship_lv0_outline.7b909b5b.png",revision:null},{url:"/HadesSpace/Nebula/img/Battleship_lv2.b92d194c.png",revision:null},{url:"/HadesSpace/Nebula/img/Battleship_lv3.b9989f84.png",revision:null},{url:"/HadesSpace/Nebula/img/Battleship_lv4.04c68df7.png",revision:null},{url:"/HadesSpace/Nebula/img/Battleship_lv5.fb5aa19f.png",revision:null},{url:"/HadesSpace/Nebula/img/Battleship_lv6.f5102c02.png",revision:null},{url:"/HadesSpace/Nebula/img/BlackCitadel.c9cf0466.png",revision:null},{url:"/HadesSpace/Nebula/img/CerberusStation_DrkNeb.793dc304.png",revision:null},{url:"/HadesSpace/Nebula/img/CerberusStation_DrkNeb_lv2.d65ed47c.png",revision:null},{url:"/HadesSpace/Nebula/img/CerberusStation_DrkNeb_lv3.9053d732.png",revision:null},{url:"/HadesSpace/Nebula/img/Cerberus_Destroyer_DrkNeb.6ca301c5.png",revision:null},{url:"/HadesSpace/Nebula/img/Cerberus_DrkNeb_Carrier.437e7c14.png",revision:null},{url:"/HadesSpace/Nebula/img/Cerberus_DrkNeb_Swarm.a9daa268.png",revision:null},{url:"/HadesSpace/Nebula/img/Cerberus_DrkNeb_swarm1.a9daa268.png",revision:null},{url:"/HadesSpace/Nebula/img/Cerberus_swarm1.22483c8b.png",revision:null},{url:"/HadesSpace/Nebula/img/Corp_Flagship_lv1.0d8c3672.png",revision:null},{url:"/HadesSpace/Nebula/img/Corp_Flagship_lv10.880ce430.png",revision:null},{url:"/HadesSpace/Nebula/img/Corp_Flagship_lv10_DrkNeb.ace5012a.png",revision:null},{url:"/HadesSpace/Nebula/img/Corp_Flagship_lv11_DrkNeb.d1d7aa7d.png",revision:null},{url:"/HadesSpace/Nebula/img/Corp_Flagship_lv12_DrkNeb.53dbf7c9.png",revision:null},{url:"/HadesSpace/Nebula/img/Corp_Flagship_lv13_DrkNeb.f70cc605.png",revision:null},{url:"/HadesSpace/Nebula/img/Corp_Flagship_lv1_DrkNeb.eb15636e.png",revision:null},{url:"/HadesSpace/Nebula/img/Corp_Flagship_lv2.a598e6be.png",revision:null},{url:"/HadesSpace/Nebula/img/Corp_Flagship_lv2_DrkNeb.89b20588.png",revision:null},{url:"/HadesSpace/Nebula/img/Corp_Flagship_lv3.1c883634.png",revision:null},{url:"/HadesSpace/Nebula/img/Corp_Flagship_lv3_DrkNeb.6c76acfb.png",revision:null},{url:"/HadesSpace/Nebula/img/Corp_Flagship_lv4.927b5f06.png",revision:null},{url:"/HadesSpace/Nebula/img/Corp_Flagship_lv4_DrkNeb.578457f1.png",revision:null},{url:"/HadesSpace/Nebula/img/Corp_Flagship_lv5.86153017.png",revision:null},{url:"/HadesSpace/Nebula/img/Corp_Flagship_lv5_DrkNeb.f8a4b4c9.png",revision:null},{url:"/HadesSpace/Nebula/img/Corp_Flagship_lv6.4e213061.png",revision:null},{url:"/HadesSpace/Nebula/img/Corp_Flagship_lv6_DrkNeb.2237ea51.png",revision:null},{url:"/HadesSpace/Nebula/img/Corp_Flagship_lv7.4f56ced8.png",revision:null},{url:"/HadesSpace/Nebula/img/Corp_Flagship_lv7_DrkNeb.eb11557f.png",revision:null},{url:"/HadesSpace/Nebula/img/Corp_Flagship_lv8.8b4b7adb.png",revision:null},{url:"/HadesSpace/Nebula/img/Corp_Flagship_lv8_DrkNeb.336839a4.png",revision:null},{url:"/HadesSpace/Nebula/img/Corp_Flagship_lv9.2314cfdb.png",revision:null},{url:"/HadesSpace/Nebula/img/Corp_Flagship_lv9_DrkNeb.19f8495f.png",revision:null},{url:"/HadesSpace/Nebula/img/Distinction_Admiral.72cca942.png",revision:null},{url:"/HadesSpace/Nebula/img/Distinction_BlueStar1.575ba4a2.png",revision:null},{url:"/HadesSpace/Nebula/img/Distinction_BlueStar10.b4dcdc77.png",revision:null},{url:"/HadesSpace/Nebula/img/Distinction_BlueStar50.103aa3e0.png",revision:null},{url:"/HadesSpace/Nebula/img/Distinction_Emperor.72854902.png",revision:null},{url:"/HadesSpace/Nebula/img/Distinction_Governer.ce1b09c7.png",revision:null},{url:"/HadesSpace/Nebula/img/Distinction_WhiteStar1.396fc1f5.png",revision:null},{url:"/HadesSpace/Nebula/img/Fighter_Cerberus.08e3a29a.png",revision:null},{url:"/HadesSpace/Nebula/img/Fighter_Cerberus1.7296e87e.png",revision:null},{url:"/HadesSpace/Nebula/img/Fighter_Cerberus2.5e6523e8.png",revision:null},{url:"/HadesSpace/Nebula/img/Fighter_Cerberus3.8f263137.png",revision:null},{url:"/HadesSpace/Nebula/img/Fighter_Cerberus3_DrkNeb.2dbb69b3.png",revision:null},{url:"/HadesSpace/Nebula/img/Fighter_Cerberus4.f7c2c382.png",revision:null},{url:"/HadesSpace/Nebula/img/Fighter_Cerberus5.9e73ca61.png",revision:null},{url:"/HadesSpace/Nebula/img/Fighter_Cerberus6.f209141e.png",revision:null},{url:"/HadesSpace/Nebula/img/Fighter_Cerberus_DrkNeb.2dbb69b3.png",revision:null},{url:"/HadesSpace/Nebula/img/Fighter_DrkNeb_Cerberus1.92c24f5c.png",revision:null},{url:"/HadesSpace/Nebula/img/Fighter_DrkNeb_Cerberus1_lv1.9bb5c76a.png",revision:null},{url:"/HadesSpace/Nebula/img/Fighter_DrkNeb_Cerberus2.ab993d23.png",revision:null},{url:"/HadesSpace/Nebula/img/Fighter_DrkNeb_Cerberus3.6ca301c5.png",revision:null},{url:"/HadesSpace/Nebula/img/Fighter_DrkNeb_Cerberus4.84ea804b.png",revision:null},{url:"/HadesSpace/Nebula/img/Fighter_DrkNeb_Cerberus5.2561b428.png",revision:null},{url:"/HadesSpace/Nebula/img/Fighter_DrkNeb_Cerberus6.13eff6e6.png",revision:null},{url:"/HadesSpace/Nebula/img/Miner.80d7173a.png",revision:null},{url:"/HadesSpace/Nebula/img/Miner_DrkNeb_lv1.d762b900.png",revision:null},{url:"/HadesSpace/Nebula/img/Miner_DrkNeb_lv2.b9c03206.png",revision:null},{url:"/HadesSpace/Nebula/img/Miner_DrkNeb_lv3.a4e952df.png",revision:null},{url:"/HadesSpace/Nebula/img/Miner_DrkNeb_lv4.523e41c2.png",revision:null},{url:"/HadesSpace/Nebula/img/Miner_DrkNeb_lv5.5140b822.png",revision:null},{url:"/HadesSpace/Nebula/img/Miner_DrkNeb_lv6.36a3b9c5.png",revision:null},{url:"/HadesSpace/Nebula/img/Miner_DrkNeb_lv7.3c8edfbc.png",revision:null},{url:"/HadesSpace/Nebula/img/Miner_lv3.c6430324.png",revision:null},{url:"/HadesSpace/Nebula/img/Miner_lv4.47a2c9c0.png",revision:null},{url:"/HadesSpace/Nebula/img/Miner_lv5.26ec253e.png",revision:null},{url:"/HadesSpace/Nebula/img/Miner_lv6.253c7d95.png",revision:null},{url:"/HadesSpace/Nebula/img/MiningDrone_DrkNeb_lv1.1397be16.png",revision:null},{url:"/HadesSpace/Nebula/img/MiningDrone_DrkNeb_lv10.170d276a.png",revision:null},{url:"/HadesSpace/Nebula/img/MiningDrone_DrkNeb_lv2.5b1b720d.png",revision:null},{url:"/HadesSpace/Nebula/img/MiningDrone_DrkNeb_lv4.43c35729.png",revision:null},{url:"/HadesSpace/Nebula/img/MiningDrone_DrkNeb_lv7.5284c3be.png",revision:null},{url:"/HadesSpace/Nebula/img/MiningDrone_lv10.281adf04.png",revision:null},{url:"/HadesSpace/Nebula/img/MiningDrone_lv4-6.0af21dd8.png",revision:null},{url:"/HadesSpace/Nebula/img/RelicDrone_lv1_DrkNeb.bf0e1948.png",revision:null},{url:"/HadesSpace/Nebula/img/RelicDrone_lv2_DrkNeb.ad0679de.png",revision:null},{url:"/HadesSpace/Nebula/img/RelicDrone_lv3_DrkNeb.ab519c03.png",revision:null},{url:"/HadesSpace/Nebula/img/RemoteBomb_DrkNeb.1a71e1b9.png",revision:null},{url:"/HadesSpace/Nebula/img/ShipmentDrone_lv1_DrkNeb.6fac1a15.png",revision:null},{url:"/HadesSpace/Nebula/img/Transport_DrkNeb_lv1.edbd92ed.png",revision:null},{url:"/HadesSpace/Nebula/img/Transport_DrkNeb_lv2.f8daed19.png",revision:null},{url:"/HadesSpace/Nebula/img/Transport_DrkNeb_lv3.dccadc2f.png",revision:null},{url:"/HadesSpace/Nebula/img/Transport_DrkNeb_lv4.f729b8e0.png",revision:null},{url:"/HadesSpace/Nebula/img/Transport_DrkNeb_lv5.e0dda1ec.png",revision:null},{url:"/HadesSpace/Nebula/img/Transport_DrkNeb_lv6.c92667f6.png",revision:null},{url:"/HadesSpace/Nebula/img/Transport_DrkNeb_lv7.1a2b6054.png",revision:null},{url:"/HadesSpace/Nebula/img/Transport_lv4.1ffabbc4.png",revision:null},{url:"/HadesSpace/Nebula/img/Transport_lv5.c1d279e9.png",revision:null},{url:"/HadesSpace/Nebula/img/Transport_lv6.fd38352c.png",revision:null},{url:"/HadesSpace/Nebula/img/arrow.f223a946.svg",revision:null},{url:"/HadesSpace/Nebula/img/art.7cbfcd9c.png",revision:null},{url:"/HadesSpace/Nebula/img/close.6b363d37.svg",revision:null},{url:"/HadesSpace/Nebula/img/github_logo.b7172519.png",revision:null},{url:"/HadesSpace/Nebula/img/logo.d4b2677b.png",revision:null},{url:"/HadesSpace/Nebula/img/menu.368c620f.svg",revision:null},{url:"/HadesSpace/Nebula/img/news_Update01.4166e256.png",revision:null},{url:"/HadesSpace/Nebula/img/news_Update02.19daf0d6.png",revision:null},{url:"/HadesSpace/Nebula/img/planet.23c4780f.png",revision:null},{url:"/HadesSpace/Nebula/img/planets-calc.73393e3a.png",revision:null},{url:"/HadesSpace/Nebula/img/portrait_AlphaDrone.6eb85669.png",revision:null},{url:"/HadesSpace/Nebula/img/portrait_AlphaRocket.b6eeb13d.png",revision:null},{url:"/HadesSpace/Nebula/img/portrait_Anomaly.282fea85.png",revision:null},{url:"/HadesSpace/Nebula/img/portrait_Asteroids.1dfd1a61.png",revision:null},{url:"/HadesSpace/Nebula/img/portrait_Asteroids_cr.d10f3f4a.png",revision:null},{url:"/HadesSpace/Nebula/img/portrait_Battleship.ad0aaa9a.png",revision:null},{url:"/HadesSpace/Nebula/img/portrait_BlueStar.741a09ad.png",revision:null},{url:"/HadesSpace/Nebula/img/portrait_CerberusBomber.c49ba18e.png",revision:null},{url:"/HadesSpace/Nebula/img/portrait_CerberusCarrier.176e5eed.png",revision:null},{url:"/HadesSpace/Nebula/img/portrait_CerberusColossus.34ff8038.png",revision:null},{url:"/HadesSpace/Nebula/img/portrait_CerberusDestroyer.fa5e72f7.png",revision:null},{url:"/HadesSpace/Nebula/img/portrait_CerberusHydra.177137be.png",revision:null},{url:"/HadesSpace/Nebula/img/portrait_CerberusPhoenix.808baedb.png",revision:null},{url:"/HadesSpace/Nebula/img/portrait_CerberusStation.36e3b3b2.png",revision:null},{url:"/HadesSpace/Nebula/img/portrait_CerberusStorm.72f906f7.png",revision:null},{url:"/HadesSpace/Nebula/img/portrait_CerberusSwarm.65c53c04.png",revision:null},{url:"/HadesSpace/Nebula/img/portrait_CorpFlagship.a867d836.png",revision:null},{url:"/HadesSpace/Nebula/img/portrait_DroneAreaShield.358a1ad0.png",revision:null},{url:"/HadesSpace/Nebula/img/portrait_DyingPlanet.45ade265.png",revision:null},{url:"/HadesSpace/Nebula/img/portrait_EmptySpace.dfd72b26.png",revision:null},{url:"/HadesSpace/Nebula/img/portrait_Guardian.3a2713ae.png",revision:null},{url:"/HadesSpace/Nebula/img/portrait_Interceptor.ea343281.png",revision:null},{url:"/HadesSpace/Nebula/img/portrait_JumpGate.68b7809a.png",revision:null},{url:"/HadesSpace/Nebula/img/portrait_Miner.ad2997e6.png",revision:null},{url:"/HadesSpace/Nebula/img/portrait_MiningDrone.79b1fcac.png",revision:null},{url:"/HadesSpace/Nebula/img/portrait_Planet.6505daee.png",revision:null},{url:"/HadesSpace/Nebula/img/portrait_PlanetWhiteStar.d6e9627d.png",revision:null},{url:"/HadesSpace/Nebula/img/portrait_RedStar.5797a8e0.png",revision:null},{url:"/HadesSpace/Nebula/img/portrait_RemoteBomb.6e8d4260.png",revision:null},{url:"/HadesSpace/Nebula/img/portrait_Sentinel.fc58bceb.png",revision:null},{url:"/HadesSpace/Nebula/img/portrait_ShipmentDrone.90149456.png",revision:null},{url:"/HadesSpace/Nebula/img/portrait_SpaceBuilding.a263596c.png",revision:null},{url:"/HadesSpace/Nebula/img/portrait_Transport.9f9f4458.png",revision:null},{url:"/HadesSpace/Nebula/img/portrait_TurretLaser.eede8f54.png",revision:null},{url:"/HadesSpace/Nebula/img/portrait_Tutorial.0cc16efe.png",revision:null},{url:"/HadesSpace/Nebula/img/portrait_WarpLane.ecbc5ff2.png",revision:null},{url:"/HadesSpace/Nebula/img/portrait_WhiteStar.d70a2bb2.png",revision:null},{url:"/HadesSpace/Nebula/img/portrait_YellowStar.b00882d9.png",revision:null},{url:"/HadesSpace/Nebula/img/relic.6752e037.png",revision:null},{url:"/HadesSpace/Nebula/img/settings.067b9160.svg",revision:null},{url:"/HadesSpace/Nebula/img/star_blue.6e921374.png",revision:null},{url:"/HadesSpace/Nebula/img/star_dark.8a55b2ab.png",revision:null},{url:"/HadesSpace/Nebula/img/star_red.df88105d.png",revision:null},{url:"/HadesSpace/Nebula/img/star_red_dark.9cf734b2.png",revision:null},{url:"/HadesSpace/Nebula/img/star_white.8cb9eb30.png",revision:null},{url:"/HadesSpace/Nebula/img/star_yellow.28f9b515.png",revision:null},{url:"/HadesSpace/Nebula/img/station_BlueStarScanner.6cbb83ac.png",revision:null},{url:"/HadesSpace/Nebula/img/station_Diplomacy.42f1be0b.png",revision:null},{url:"/HadesSpace/Nebula/img/station_RedStarScanner.355c5d1e.png",revision:null},{url:"/HadesSpace/Nebula/img/station_Research.ceacc0b3.png",revision:null},{url:"/HadesSpace/Nebula/img/station_ShipmentRelay.9ea08c8f.png",revision:null},{url:"/HadesSpace/Nebula/img/station_Shipyard.190d1c06.png",revision:null},{url:"/HadesSpace/Nebula/img/station_ShortRangeScanner.a8c7338d.png",revision:null},{url:"/HadesSpace/Nebula/img/station_WhiteStarScanner.3ddf45cc.png",revision:null},{url:"/HadesSpace/Nebula/img/station_trade.dbe63410.png",revision:null},{url:"/HadesSpace/Nebula/img/timeModulator.127450fb.png",revision:null},{url:"/HadesSpace/Nebula/img/warpLaneHub.398191f4.png",revision:null},{url:"/HadesSpace/Nebula/index.html",revision:"660cdbba5c74dfdc9d787d55f8eaad5d"},{url:"/HadesSpace/Nebula/js/100.72be5548.js",revision:null},{url:"/HadesSpace/Nebula/js/146.4fa17ce1.js",revision:null},{url:"/HadesSpace/Nebula/js/256.9ec2cfdb.js",revision:null},{url:"/HadesSpace/Nebula/js/266.349e1391.js",revision:null},{url:"/HadesSpace/Nebula/js/278.c4a14285.js",revision:null},{url:"/HadesSpace/Nebula/js/326.ac13c7f0.js",revision:null},{url:"/HadesSpace/Nebula/js/400.cf38d257.js",revision:null},{url:"/HadesSpace/Nebula/js/431.5e09110b.js",revision:null},{url:"/HadesSpace/Nebula/js/560.b7fc821a.js",revision:null},{url:"/HadesSpace/Nebula/js/561.b7953a60.js",revision:null},{url:"/HadesSpace/Nebula/js/668.aa11ad00.js",revision:null},{url:"/HadesSpace/Nebula/js/762.6b9be9d6.js",revision:null},{url:"/HadesSpace/Nebula/js/806.324daaa7.js",revision:null},{url:"/HadesSpace/Nebula/js/948.47225fba.js",revision:null},{url:"/HadesSpace/Nebula/js/964.75def40f.js",revision:null},{url:"/HadesSpace/Nebula/js/988.b4f1df42.js",revision:null},{url:"/HadesSpace/Nebula/js/About.2eafeda2.js",revision:null},{url:"/HadesSpace/Nebula/js/Achievements.e73f27a7.js",revision:null},{url:"/HadesSpace/Nebula/js/AllianceLevels.40a87660.js",revision:null},{url:"/HadesSpace/Nebula/js/BlueStar.5b05696f.js",revision:null},{url:"/HadesSpace/Nebula/js/Cerberus.04838b17.js",revision:null},{url:"/HadesSpace/Nebula/js/DarkRedStar.c86856dd.js",revision:null},{url:"/HadesSpace/Nebula/js/Index.ec8e5582.js",revision:null},{url:"/HadesSpace/Nebula/js/Mining.bbc4ac45.js",revision:null},{url:"/HadesSpace/Nebula/js/ModulesCalc.4ebfaa6f.js",revision:null},{url:"/HadesSpace/Nebula/js/PlanetsCalc.2714eb17.js",revision:null},{url:"/HadesSpace/Nebula/js/PlayerGoals.9afb6e60.js",revision:null},{url:"/HadesSpace/Nebula/js/RedStar.2e4aec1d.js",revision:null},{url:"/HadesSpace/Nebula/js/Shield.d68d8e64.js",revision:null},{url:"/HadesSpace/Nebula/js/Ships.a4ae47ae.js",revision:null},{url:"/HadesSpace/Nebula/js/SpaceBuildings.a98d1868.js",revision:null},{url:"/HadesSpace/Nebula/js/Support.c29cf5ce.js",revision:null},{url:"/HadesSpace/Nebula/js/Trade.bb6690e9.js",revision:null},{url:"/HadesSpace/Nebula/js/Weapon.6c12ef6e.js",revision:null},{url:"/HadesSpace/Nebula/js/WhiteStar.2c73dafc.js",revision:null},{url:"/HadesSpace/Nebula/js/YellowStar.70825dab.js",revision:null},{url:"/HadesSpace/Nebula/js/app.f0368cd0.js",revision:null},{url:"/HadesSpace/Nebula/js/chunk-vendors.984550c4.js",revision:null},{url:"/HadesSpace/Nebula/manifest.json",revision:"334271836314703960297c9e634cf03d"},{url:"/HadesSpace/Nebula/meta-image.png",revision:"022e8932595c01b098dc42631cb5e1a7"},{url:"/HadesSpace/Nebula/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
