if(!self.define){let e,l={};const a=(a,i)=>(a=new URL(a+".js",i).href,l[a]||new Promise((l=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=l,document.head.appendChild(e)}else e=a,importScripts(a),l()})).then((()=>{let e=l[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(i,r)=>{const s=e||("document"in self?document.currentScript.src:"")||location.href;if(l[s])return;let n={};const u=e=>a(e,s),p={module:{uri:s},exports:n,require:u};l[s]=Promise.all(i.map((e=>p[e]||u(e)))).then((e=>(r(...e),n)))}}define(["./workbox-db5fc017"],(function(e){"use strict";e.setCacheNameDetails({prefix:"hades-space"}),self.skipWaiting(),e.precacheAndRoute([{url:"/HadesSpace/Nebula/css/190.1e26a24f.css",revision:null},{url:"/HadesSpace/Nebula/css/435.0939250f.css",revision:null},{url:"/HadesSpace/Nebula/css/449.abbe0c3c.css",revision:null},{url:"/HadesSpace/Nebula/css/About.03334180.css",revision:null},{url:"/HadesSpace/Nebula/css/Achievements.b9e02da3.css",revision:null},{url:"/HadesSpace/Nebula/css/AllianceLevels.b9e02da3.css",revision:null},{url:"/HadesSpace/Nebula/css/BlueStar.b9e02da3.css",revision:null},{url:"/HadesSpace/Nebula/css/Cerberus.ea4fe5b7.css",revision:null},{url:"/HadesSpace/Nebula/css/DarkRedStar.a0f8207a.css",revision:null},{url:"/HadesSpace/Nebula/css/Drone.b9e02da3.css",revision:null},{url:"/HadesSpace/Nebula/css/Index.a34217a2.css",revision:null},{url:"/HadesSpace/Nebula/css/Mining.b9e02da3.css",revision:null},{url:"/HadesSpace/Nebula/css/ModulesCalc.0ba491f1.css",revision:null},{url:"/HadesSpace/Nebula/css/PlanetsCalc.c4e071d4.css",revision:null},{url:"/HadesSpace/Nebula/css/PlayerGoals.b9e02da3.css",revision:null},{url:"/HadesSpace/Nebula/css/RedStar.1996f5ae.css",revision:null},{url:"/HadesSpace/Nebula/css/Shield.b9e02da3.css",revision:null},{url:"/HadesSpace/Nebula/css/Ships.ba700655.css",revision:null},{url:"/HadesSpace/Nebula/css/SpaceBuildings.b9e02da3.css",revision:null},{url:"/HadesSpace/Nebula/css/Support.b9e02da3.css",revision:null},{url:"/HadesSpace/Nebula/css/Trade.b9e02da3.css",revision:null},{url:"/HadesSpace/Nebula/css/Weapon.b9e02da3.css",revision:null},{url:"/HadesSpace/Nebula/css/WhiteStar.9041c27e.css",revision:null},{url:"/HadesSpace/Nebula/css/YellowStar.a312b4ca.css",revision:null},{url:"/HadesSpace/Nebula/css/app.9d352ca0.css",revision:null},{url:"/HadesSpace/Nebula/favicon/150x150.png",revision:"7ac132d32e3760e93b81d305f4fd25ac"},{url:"/HadesSpace/Nebula/favicon/16x16.png",revision:"bc0a3a9097013db0736970d421bc0516"},{url:"/HadesSpace/Nebula/favicon/192x192.png",revision:"e30ee3ba3b06cfe0d1bf84239b48b31c"},{url:"/HadesSpace/Nebula/favicon/32x32.png",revision:"8c9e4de86ec33dbcbcb752440161a7d1"},{url:"/HadesSpace/Nebula/favicon/512x512.png",revision:"164a0bc1bc5dcf6e8a9c902ff6e808d8"},{url:"/HadesSpace/Nebula/favicon/apple-touch.png",revision:"0380d3c1ed8a06d72833d6a7ab2f72fa"},{url:"/HadesSpace/Nebula/favicon/favicon.png",revision:"59ab6640e691932b8197ec8bdad44229"},{url:"/HadesSpace/Nebula/favicon/safari-pinned-tab.svg",revision:"f0139fcda368ab3f6bf4c4ce34583552"},{url:"/HadesSpace/Nebula/img/AlphaBadge01.aaf854bd.png",revision:null},{url:"/HadesSpace/Nebula/img/AlphaBadge01_DN.fa4561ef.png",revision:null},{url:"/HadesSpace/Nebula/img/AlphaDrone_lv1.7b4fa546.png",revision:null},{url:"/HadesSpace/Nebula/img/AlphaDrone_lv1_DrkNeb.fd46b8de.png",revision:null},{url:"/HadesSpace/Nebula/img/AlphaDrone_lv2.26c40c1f.png",revision:null},{url:"/HadesSpace/Nebula/img/AlphaDrone_lv2_DrkNeb.5ea63abb.png",revision:null},{url:"/HadesSpace/Nebula/img/AlphaDrone_lv3.9cae5dd3.png",revision:null},{url:"/HadesSpace/Nebula/img/AlphaDrone_lv3_DrkNeb.394bdbf0.png",revision:null},{url:"/HadesSpace/Nebula/img/Battleship_Cerberus.4fed567a.png",revision:null},{url:"/HadesSpace/Nebula/img/Battleship_CerberusHydra.5c79e83d.png",revision:null},{url:"/HadesSpace/Nebula/img/Battleship_CerberusHydra_DrkNeb.a504065d.png",revision:null},{url:"/HadesSpace/Nebula/img/Battleship_CerberusHydraling1.91795f53.png",revision:null},{url:"/HadesSpace/Nebula/img/Battleship_CerberusHydraling1_DrkNeb.c4098188.png",revision:null},{url:"/HadesSpace/Nebula/img/Battleship_CerberusHydraling2.cb94f9e1.png",revision:null},{url:"/HadesSpace/Nebula/img/Battleship_CerberusHydraling2_DrkNeb.793f6778.png",revision:null},{url:"/HadesSpace/Nebula/img/Battleship_Cerberus_DrkNeb.39eed6f5.png",revision:null},{url:"/HadesSpace/Nebula/img/Battleship_DrkNeb_lv1.a2545f81.png",revision:null},{url:"/HadesSpace/Nebula/img/Battleship_DrkNeb_lv2.65396d3a.png",revision:null},{url:"/HadesSpace/Nebula/img/Battleship_DrkNeb_lv3.b9cd5aa8.png",revision:null},{url:"/HadesSpace/Nebula/img/Battleship_DrkNeb_lv4.4e9debf8.png",revision:null},{url:"/HadesSpace/Nebula/img/Battleship_DrkNeb_lv5.1120cc90.png",revision:null},{url:"/HadesSpace/Nebula/img/Battleship_DrkNeb_lv6.ce8697c9.png",revision:null},{url:"/HadesSpace/Nebula/img/Battleship_DrkNeb_lv7.5d2eba49.png",revision:null},{url:"/HadesSpace/Nebula/img/Battleship_lv2.4a741f2b.png",revision:null},{url:"/HadesSpace/Nebula/img/Battleship_lv3.46077545.png",revision:null},{url:"/HadesSpace/Nebula/img/Battleship_lv4.46c7d85f.png",revision:null},{url:"/HadesSpace/Nebula/img/Battleship_lv5.a79b1b79.png",revision:null},{url:"/HadesSpace/Nebula/img/Battleship_lv6.33a1de6f.png",revision:null},{url:"/HadesSpace/Nebula/img/BlackCitadel.c9cf0466.png",revision:null},{url:"/HadesSpace/Nebula/img/CerberusStation_DrkNeb.793dc304.png",revision:null},{url:"/HadesSpace/Nebula/img/CerberusStation_DrkNeb_lv2.d65ed47c.png",revision:null},{url:"/HadesSpace/Nebula/img/CerberusStation_DrkNeb_lv3.9053d732.png",revision:null},{url:"/HadesSpace/Nebula/img/Cerberus_DrkNeb_Carrier.947ad652.png",revision:null},{url:"/HadesSpace/Nebula/img/Cerberus_swarm1.35e8ff64.png",revision:null},{url:"/HadesSpace/Nebula/img/Corp_Flagship_lv1.9dbc5ee6.png",revision:null},{url:"/HadesSpace/Nebula/img/Corp_Flagship_lv10.061dd2c9.png",revision:null},{url:"/HadesSpace/Nebula/img/Corp_Flagship_lv10_DrkNeb.80e64dbc.png",revision:null},{url:"/HadesSpace/Nebula/img/Corp_Flagship_lv11_DrkNeb.85f70518.png",revision:null},{url:"/HadesSpace/Nebula/img/Corp_Flagship_lv12_DrkNeb.043135f2.png",revision:null},{url:"/HadesSpace/Nebula/img/Corp_Flagship_lv13_DrkNeb.974ed605.png",revision:null},{url:"/HadesSpace/Nebula/img/Corp_Flagship_lv1_DrkNeb.232fd4ec.png",revision:null},{url:"/HadesSpace/Nebula/img/Corp_Flagship_lv2.5d3f32c4.png",revision:null},{url:"/HadesSpace/Nebula/img/Corp_Flagship_lv2_DrkNeb.05c790fb.png",revision:null},{url:"/HadesSpace/Nebula/img/Corp_Flagship_lv3.23169e4e.png",revision:null},{url:"/HadesSpace/Nebula/img/Corp_Flagship_lv3_DrkNeb.b48ccdd6.png",revision:null},{url:"/HadesSpace/Nebula/img/Corp_Flagship_lv4.de990ede.png",revision:null},{url:"/HadesSpace/Nebula/img/Corp_Flagship_lv4_DrkNeb.8ad17991.png",revision:null},{url:"/HadesSpace/Nebula/img/Corp_Flagship_lv5.c3a27925.png",revision:null},{url:"/HadesSpace/Nebula/img/Corp_Flagship_lv5_DrkNeb.49c1db8b.png",revision:null},{url:"/HadesSpace/Nebula/img/Corp_Flagship_lv6.1f439037.png",revision:null},{url:"/HadesSpace/Nebula/img/Corp_Flagship_lv6_DrkNeb.90519f00.png",revision:null},{url:"/HadesSpace/Nebula/img/Corp_Flagship_lv7.a5daecdc.png",revision:null},{url:"/HadesSpace/Nebula/img/Corp_Flagship_lv7_DrkNeb.bbe80db4.png",revision:null},{url:"/HadesSpace/Nebula/img/Corp_Flagship_lv8.454638e5.png",revision:null},{url:"/HadesSpace/Nebula/img/Corp_Flagship_lv8_DrkNeb.6bd3ed90.png",revision:null},{url:"/HadesSpace/Nebula/img/Corp_Flagship_lv9.cbce880e.png",revision:null},{url:"/HadesSpace/Nebula/img/Corp_Flagship_lv9_DrkNeb.70eacd37.png",revision:null},{url:"/HadesSpace/Nebula/img/DecoyDrone_DrkNeb_lv1.01cd683d.png",revision:null},{url:"/HadesSpace/Nebula/img/DecoyDrone_DrkNeb_lv2.4cde38c7.png",revision:null},{url:"/HadesSpace/Nebula/img/DecoyDrone_DrkNeb_lv3.c2e41610.png",revision:null},{url:"/HadesSpace/Nebula/img/DecoyDrone_DrkNeb_lv4.f687d9b0.png",revision:null},{url:"/HadesSpace/Nebula/img/DecoyDrone_DrkNeb_lv5.7d9d8e0e.png",revision:null},{url:"/HadesSpace/Nebula/img/Distinction_Admiral.50508555.png",revision:null},{url:"/HadesSpace/Nebula/img/Distinction_Admiral_Legacy.67f10e58.png",revision:null},{url:"/HadesSpace/Nebula/img/Distinction_BlueStar1.23df34fb.png",revision:null},{url:"/HadesSpace/Nebula/img/Distinction_BlueStar10.6ae6c392.png",revision:null},{url:"/HadesSpace/Nebula/img/Distinction_BlueStar10_Legacy.d2435c81.png",revision:null},{url:"/HadesSpace/Nebula/img/Distinction_BlueStar1_Legacy.ce059ecc.png",revision:null},{url:"/HadesSpace/Nebula/img/Distinction_BlueStar50.ac652b78.png",revision:null},{url:"/HadesSpace/Nebula/img/Distinction_BlueStar50_Legacy.374bb433.png",revision:null},{url:"/HadesSpace/Nebula/img/Distinction_Emperor.8031c8af.png",revision:null},{url:"/HadesSpace/Nebula/img/Distinction_Emperor_Legacy.91d54d44.png",revision:null},{url:"/HadesSpace/Nebula/img/Distinction_Governer.ce7c2a58.png",revision:null},{url:"/HadesSpace/Nebula/img/Distinction_Governer_Legacy.e05f7c30.png",revision:null},{url:"/HadesSpace/Nebula/img/Distinction_WhiteStar1.6f38cbc7.png",revision:null},{url:"/HadesSpace/Nebula/img/Distinction_WhiteStar1_Legacy.2d7fc467.png",revision:null},{url:"/HadesSpace/Nebula/img/Fighter_Cerberus.45dcc956.png",revision:null},{url:"/HadesSpace/Nebula/img/Fighter_Cerberus1.77cf5b46.png",revision:null},{url:"/HadesSpace/Nebula/img/Fighter_Cerberus2.511de6cf.png",revision:null},{url:"/HadesSpace/Nebula/img/Fighter_Cerberus3.d3d03297.png",revision:null},{url:"/HadesSpace/Nebula/img/Fighter_Cerberus4.5e8029d7.png",revision:null},{url:"/HadesSpace/Nebula/img/Fighter_Cerberus5.b5632adb.png",revision:null},{url:"/HadesSpace/Nebula/img/Fighter_Cerberus6.4bea00f3.png",revision:null},{url:"/HadesSpace/Nebula/img/Fighter_Cerberus_DrkNeb.484a4140.png",revision:null},{url:"/HadesSpace/Nebula/img/Fighter_DrkNeb_Cerberus1.b9321ad2.png",revision:null},{url:"/HadesSpace/Nebula/img/Fighter_DrkNeb_Cerberus2.fb035e2d.png",revision:null},{url:"/HadesSpace/Nebula/img/Fighter_DrkNeb_Cerberus3.70b107da.png",revision:null},{url:"/HadesSpace/Nebula/img/Fighter_DrkNeb_Cerberus4.8fb11d33.png",revision:null},{url:"/HadesSpace/Nebula/img/Fighter_DrkNeb_Cerberus5.5fd91904.png",revision:null},{url:"/HadesSpace/Nebula/img/Fighter_DrkNeb_Cerberus6.c4b7aa3e.png",revision:null},{url:"/HadesSpace/Nebula/img/Miner.027fbf36.png",revision:null},{url:"/HadesSpace/Nebula/img/Miner_DrkNeb_lv2.c65839bc.png",revision:null},{url:"/HadesSpace/Nebula/img/Miner_DrkNeb_lv3.e9580d77.png",revision:null},{url:"/HadesSpace/Nebula/img/Miner_DrkNeb_lv4.61621056.png",revision:null},{url:"/HadesSpace/Nebula/img/Miner_DrkNeb_lv5.f7f25a13.png",revision:null},{url:"/HadesSpace/Nebula/img/Miner_DrkNeb_lv6.91027d8d.png",revision:null},{url:"/HadesSpace/Nebula/img/Miner_DrkNeb_lv7.9224857c.png",revision:null},{url:"/HadesSpace/Nebula/img/Miner_lv3.c18232ee.png",revision:null},{url:"/HadesSpace/Nebula/img/Miner_lv4.03d93315.png",revision:null},{url:"/HadesSpace/Nebula/img/Miner_lv5.63bceea8.png",revision:null},{url:"/HadesSpace/Nebula/img/Miner_lv6.c9e58327.png",revision:null},{url:"/HadesSpace/Nebula/img/MiningDrone_lv10.d30e358f.png",revision:null},{url:"/HadesSpace/Nebula/img/MiningDrone_lv4-6.6eace2b5.png",revision:null},{url:"/HadesSpace/Nebula/img/RelicDrone_lv1_DrkNeb.5201d785.png",revision:null},{url:"/HadesSpace/Nebula/img/RelicDrone_lv2_DrkNeb.beb61f9f.png",revision:null},{url:"/HadesSpace/Nebula/img/RelicDrone_lv3_DrkNeb.354f5db9.png",revision:null},{url:"/HadesSpace/Nebula/img/RemoteBomb_DrkNeb.1a71e1b9.png",revision:null},{url:"/HadesSpace/Nebula/img/RepairDrone_DrkNeb_lv1.bc9caca8.png",revision:null},{url:"/HadesSpace/Nebula/img/RepairDrone_DrkNeb_lv2.5778dda9.png",revision:null},{url:"/HadesSpace/Nebula/img/RepairDrone_DrkNeb_lv3.ec1e2adb.png",revision:null},{url:"/HadesSpace/Nebula/img/RepairDrone_DrkNeb_lv4.a435b26b.png",revision:null},{url:"/HadesSpace/Nebula/img/RepairDrone_DrkNeb_lv5.c03aeb20.png",revision:null},{url:"/HadesSpace/Nebula/img/ShipmentDrone_lv1_DrkNeb.7489d1b7.png",revision:null},{url:"/HadesSpace/Nebula/img/Transport_lv4.09d514f5.png",revision:null},{url:"/HadesSpace/Nebula/img/Transport_lv5.f046ce77.png",revision:null},{url:"/HadesSpace/Nebula/img/Transport_lv6.8f79e518.png",revision:null},{url:"/HadesSpace/Nebula/img/arrow.16903621.svg",revision:null},{url:"/HadesSpace/Nebula/img/art.7cbfcd9c.png",revision:null},{url:"/HadesSpace/Nebula/img/blueStar_Fragments.3259f068.svg",revision:null},{url:"/HadesSpace/Nebula/img/clock.e3e3bc1e.svg",revision:null},{url:"/HadesSpace/Nebula/img/close.6b363d37.svg",revision:null},{url:"/HadesSpace/Nebula/img/credit.45d17641.svg",revision:null},{url:"/HadesSpace/Nebula/img/flt_friendly.b2f59a38.svg",revision:null},{url:"/HadesSpace/Nebula/img/fuel.e6f48255.svg",revision:null},{url:"/HadesSpace/Nebula/img/github_logo.b7172519.png",revision:null},{url:"/HadesSpace/Nebula/img/influence.faa5833c.svg",revision:null},{url:"/HadesSpace/Nebula/img/logo.d4b2677b.png",revision:null},{url:"/HadesSpace/Nebula/img/menu.368c620f.svg",revision:null},{url:"/HadesSpace/Nebula/img/mining_route.51fc86b0.svg",revision:null},{url:"/HadesSpace/Nebula/img/news_Update01.4166e256.png",revision:null},{url:"/HadesSpace/Nebula/img/news_Update02.19daf0d6.png",revision:null},{url:"/HadesSpace/Nebula/img/outbound.62c4c954.svg",revision:null},{url:"/HadesSpace/Nebula/img/planet.23c4780f.png",revision:null},{url:"/HadesSpace/Nebula/img/planets-calc.73393e3a.png",revision:null},{url:"/HadesSpace/Nebula/img/portrait_AlphaDrone.6eb85669.png",revision:null},{url:"/HadesSpace/Nebula/img/portrait_AlphaRocket.b6eeb13d.png",revision:null},{url:"/HadesSpace/Nebula/img/portrait_Anomaly.282fea85.png",revision:null},{url:"/HadesSpace/Nebula/img/portrait_Asteroids.1dfd1a61.png",revision:null},{url:"/HadesSpace/Nebula/img/portrait_Asteroids_cr.d10f3f4a.png",revision:null},{url:"/HadesSpace/Nebula/img/portrait_Battleship.ad0aaa9a.png",revision:null},{url:"/HadesSpace/Nebula/img/portrait_BlueStar.741a09ad.png",revision:null},{url:"/HadesSpace/Nebula/img/portrait_CerberusBomber.c49ba18e.png",revision:null},{url:"/HadesSpace/Nebula/img/portrait_CerberusCarrier.176e5eed.png",revision:null},{url:"/HadesSpace/Nebula/img/portrait_CerberusColossus.34ff8038.png",revision:null},{url:"/HadesSpace/Nebula/img/portrait_CerberusDestroyer.fa5e72f7.png",revision:null},{url:"/HadesSpace/Nebula/img/portrait_CerberusHydra.177137be.png",revision:null},{url:"/HadesSpace/Nebula/img/portrait_CerberusPhoenix.808baedb.png",revision:null},{url:"/HadesSpace/Nebula/img/portrait_CerberusStation.36e3b3b2.png",revision:null},{url:"/HadesSpace/Nebula/img/portrait_CerberusStorm.72f906f7.png",revision:null},{url:"/HadesSpace/Nebula/img/portrait_CerberusSwarm.65c53c04.png",revision:null},{url:"/HadesSpace/Nebula/img/portrait_CorpFlagship.a867d836.png",revision:null},{url:"/HadesSpace/Nebula/img/portrait_DroneAreaShield.358a1ad0.png",revision:null},{url:"/HadesSpace/Nebula/img/portrait_DyingPlanet.45ade265.png",revision:null},{url:"/HadesSpace/Nebula/img/portrait_EmptySpace.dfd72b26.png",revision:null},{url:"/HadesSpace/Nebula/img/portrait_Guardian.3a2713ae.png",revision:null},{url:"/HadesSpace/Nebula/img/portrait_Interceptor.ea343281.png",revision:null},{url:"/HadesSpace/Nebula/img/portrait_JumpGate.68b7809a.png",revision:null},{url:"/HadesSpace/Nebula/img/portrait_Miner.ad2997e6.png",revision:null},{url:"/HadesSpace/Nebula/img/portrait_MiningDrone.79b1fcac.png",revision:null},{url:"/HadesSpace/Nebula/img/portrait_Planet.6505daee.png",revision:null},{url:"/HadesSpace/Nebula/img/portrait_PlanetWhiteStar.d6e9627d.png",revision:null},{url:"/HadesSpace/Nebula/img/portrait_RedStar.5797a8e0.png",revision:null},{url:"/HadesSpace/Nebula/img/portrait_RemoteBomb.6e8d4260.png",revision:null},{url:"/HadesSpace/Nebula/img/portrait_Sentinel.fc58bceb.png",revision:null},{url:"/HadesSpace/Nebula/img/portrait_ShipmentDrone.90149456.png",revision:null},{url:"/HadesSpace/Nebula/img/portrait_SpaceBuilding.a263596c.png",revision:null},{url:"/HadesSpace/Nebula/img/portrait_Transport.9f9f4458.png",revision:null},{url:"/HadesSpace/Nebula/img/portrait_TurretLaser.eede8f54.png",revision:null},{url:"/HadesSpace/Nebula/img/portrait_Tutorial.0cc16efe.png",revision:null},{url:"/HadesSpace/Nebula/img/portrait_WarpLane.ecbc5ff2.png",revision:null},{url:"/HadesSpace/Nebula/img/portrait_WhiteStar.d70a2bb2.png",revision:null},{url:"/HadesSpace/Nebula/img/portrait_YellowStar.b00882d9.png",revision:null},{url:"/HadesSpace/Nebula/img/relic.6752e037.png",revision:null},{url:"/HadesSpace/Nebula/img/settings.f901efb7.svg",revision:null},{url:"/HadesSpace/Nebula/img/shipments.5a390ca3.svg",revision:null},{url:"/HadesSpace/Nebula/img/star_blue.6e921374.png",revision:null},{url:"/HadesSpace/Nebula/img/star_dark.8a55b2ab.png",revision:null},{url:"/HadesSpace/Nebula/img/star_red.df88105d.png",revision:null},{url:"/HadesSpace/Nebula/img/star_red_dark.9cf734b2.png",revision:null},{url:"/HadesSpace/Nebula/img/star_white.8cb9eb30.png",revision:null},{url:"/HadesSpace/Nebula/img/star_yellow.28f9b515.png",revision:null},{url:"/HadesSpace/Nebula/img/station_BlueStarScanner.6cbb83ac.png",revision:null},{url:"/HadesSpace/Nebula/img/station_Diplomacy.42f1be0b.png",revision:null},{url:"/HadesSpace/Nebula/img/station_RedStarScanner.355c5d1e.png",revision:null},{url:"/HadesSpace/Nebula/img/station_Research.ceacc0b3.png",revision:null},{url:"/HadesSpace/Nebula/img/station_ShipmentRelay.9ea08c8f.png",revision:null},{url:"/HadesSpace/Nebula/img/station_Shipyard.190d1c06.png",revision:null},{url:"/HadesSpace/Nebula/img/station_ShortRangeScanner.a8c7338d.png",revision:null},{url:"/HadesSpace/Nebula/img/station_WhiteStarScanner.3ddf45cc.png",revision:null},{url:"/HadesSpace/Nebula/img/station_trade.dbe63410.png",revision:null},{url:"/HadesSpace/Nebula/img/timeModulator.127450fb.png",revision:null},{url:"/HadesSpace/Nebula/img/warpLaneHub.398191f4.png",revision:null},{url:"/HadesSpace/Nebula/img/сrystal.e0ca9fb0.svg",revision:null},{url:"/HadesSpace/Nebula/index.html",revision:"a88635d383cb7c054c788aa611d8113d"},{url:"/HadesSpace/Nebula/js/190.f0437ff8.js",revision:null},{url:"/HadesSpace/Nebula/js/275.77446b3d.js",revision:null},{url:"/HadesSpace/Nebula/js/335.b630d028.js",revision:null},{url:"/HadesSpace/Nebula/js/383.cd563d24.js",revision:null},{url:"/HadesSpace/Nebula/js/398.d6225358.js",revision:null},{url:"/HadesSpace/Nebula/js/431.b3d1bf1a.js",revision:null},{url:"/HadesSpace/Nebula/js/435.2c0b2466.js",revision:null},{url:"/HadesSpace/Nebula/js/445.426c7a76.js",revision:null},{url:"/HadesSpace/Nebula/js/449.73ab00df.js",revision:null},{url:"/HadesSpace/Nebula/js/454.0c20d89d.js",revision:null},{url:"/HadesSpace/Nebula/js/506.b228b22c.js",revision:null},{url:"/HadesSpace/Nebula/js/707.b2fa3805.js",revision:null},{url:"/HadesSpace/Nebula/js/708.8a92b2db.js",revision:null},{url:"/HadesSpace/Nebula/js/782.9ff82275.js",revision:null},{url:"/HadesSpace/Nebula/js/891.2fb7bff7.js",revision:null},{url:"/HadesSpace/Nebula/js/950.6ceb9f20.js",revision:null},{url:"/HadesSpace/Nebula/js/955.c5de03dc.js",revision:null},{url:"/HadesSpace/Nebula/js/About.565e93a2.js",revision:null},{url:"/HadesSpace/Nebula/js/Achievements.57b2e2e9.js",revision:null},{url:"/HadesSpace/Nebula/js/AllianceLevels.a0bcf539.js",revision:null},{url:"/HadesSpace/Nebula/js/BlueStar.b83048aa.js",revision:null},{url:"/HadesSpace/Nebula/js/Cerberus.f6896a9a.js",revision:null},{url:"/HadesSpace/Nebula/js/DarkRedStar.ee8ec065.js",revision:null},{url:"/HadesSpace/Nebula/js/Drone.009772cc.js",revision:null},{url:"/HadesSpace/Nebula/js/Index.996947b4.js",revision:null},{url:"/HadesSpace/Nebula/js/Mining.81f12788.js",revision:null},{url:"/HadesSpace/Nebula/js/ModulesCalc.c7a33351.js",revision:null},{url:"/HadesSpace/Nebula/js/PlanetsCalc.bc00fc9d.js",revision:null},{url:"/HadesSpace/Nebula/js/PlayerGoals.d7449c94.js",revision:null},{url:"/HadesSpace/Nebula/js/RedStar.2f3792c2.js",revision:null},{url:"/HadesSpace/Nebula/js/Shield.eb7e4c6d.js",revision:null},{url:"/HadesSpace/Nebula/js/Ships.144e5925.js",revision:null},{url:"/HadesSpace/Nebula/js/SpaceBuildings.58cc470d.js",revision:null},{url:"/HadesSpace/Nebula/js/Support.9d276c8a.js",revision:null},{url:"/HadesSpace/Nebula/js/Trade.936cc441.js",revision:null},{url:"/HadesSpace/Nebula/js/Weapon.0333e2b3.js",revision:null},{url:"/HadesSpace/Nebula/js/WhiteStar.8989e34f.js",revision:null},{url:"/HadesSpace/Nebula/js/YellowStar.b54e7dea.js",revision:null},{url:"/HadesSpace/Nebula/js/app.f07e9571.js",revision:null},{url:"/HadesSpace/Nebula/js/chunk-vendors.54281082.js",revision:null},{url:"/HadesSpace/Nebula/manifest.json",revision:"334271836314703960297c9e634cf03d"},{url:"/HadesSpace/Nebula/meta-image.png",revision:"022e8932595c01b098dc42631cb5e1a7"},{url:"/HadesSpace/Nebula/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
