"use strict";(self["webpackChunkhades_space"]=self["webpackChunkhades_space"]||[]).push([[888],{52578:(e,r,i)=>{i.d(r,{Z:()=>I});var t=i(66252),o=i(3577),d=i(49963);const a=e=>((0,t.dD)("data-v-3eae0739"),e=e(),(0,t.Cn)(),e),n={class:"container"},l={class:"title"},s=a((()=>(0,t._)("div",null,null,-1))),p=[s],S=["href"];function _(e,r,i,a,s,_){const D=(0,t.up)("v-data"),M=(0,t.Q2)("t");return(0,t.wg)(),(0,t.iD)("div",n,[Object.keys(i.args.data).length>1?((0,t.wg)(),(0,t.iD)(t.HY,{key:0},[(0,t._)("div",l,[(0,t._)("h2",null,(0,o.zw)(e.$t("CONTENT")),1),(0,t._)("div",{class:(0,o.C_)(["hamburger-icon",{opened:s.contentOpened}]),onClick:r[0]||(r[0]=e=>s.contentOpened=!s.contentOpened)},p,2)]),s.contentOpened?((0,t.wg)(),(0,t.j4)(d.W3,{key:0,tag:"ol",class:"list"},{default:(0,t.w5)((()=>[((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)(i.args.data,(({Name:e,TID:r})=>((0,t.wg)(),(0,t.iD)("li",{key:e},[(0,t.wy)((0,t._)("a",{href:`#${e}`},null,8,S),[[M,r]])])))),128))])),_:1})):(0,t.kq)("",!0)],64)):(0,t.kq)("",!0),((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)(i.args.data,((e,r)=>((0,t.wg)(),(0,t.j4)(D,{key:r,data:e,"table-opts":i.args.tableOpts,"icon-dir":i.args.iconDir},null,8,["data","table-opts","icon-dir"])))),128))])}var D=i(70379);const M={components:{VData:D.Z},props:{args:{type:Object,required:!0}},data(){return{contentOpened:!1}}};var m=i(83744);const T=(0,m.Z)(M,[["render",_],["__scopeId","data-v-3eae0739"]]),I=T},6790:(e,r,i)=>{i.d(r,{Z:()=>M});var t=i(66252),o=i(3577);const d={class:"portrait-container"},a=["src","alt"],n={class:"topic"};function l(e,r,i,l,s,p){const S=(0,t.up)("Head"),_=(0,t.up)("v-content");return(0,t.wg)(),(0,t.iD)("div",null,[(0,t.Wm)(S,null,{default:(0,t.w5)((()=>[(0,t._)("title",null,(0,o.zw)(p.title),1)])),_:1}),(0,t._)("div",d,[i.portrait?((0,t.wg)(),(0,t.iD)("img",{key:0,class:"portrait",src:i.portrait.src,alt:i.portrait.alt},null,8,a)):(0,t.kq)("",!0),(0,t._)("h1",n,(0,o.zw)(p.title),1)]),(0,t.WI)(e.$slots,"default",{},void 0,!0),(0,t.Wm)(_,{args:i.contentArgs},null,8,["args"])])}var s=i(21232),p=i(52578);const S={components:{Head:s.Fb,VContent:p.Z},props:{contentArgs:{type:Object,required:!0},titleLocKey:{type:String,required:!0},portrait:{type:Object,default:null,validator:e=>["src","alt"].every((r=>r in e))}},computed:{title(){return this.$t(this.titleLocKey)}}};var _=i(83744);const D=(0,_.Z)(S,[["render",l],["__scopeId","data-v-166aea6b"]]),M=D},29413:(e,r,i)=>{i.d(r,{Z:()=>o});var t=i(85888);function o(e,{filterByType:{path:r}}){const i={},o=r?r.split(".").reduce(((e,r)=>e[r]),t.Z):null;return Object.entries(e).filter((([e])=>!o||o.includes(e))).sort((([e],[r])=>o?o.indexOf(e)-o.indexOf(r):0)).forEach((([,e])=>{Object.entries(e).forEach((([e,r])=>{e in i?Array.isArray(i[e])?i[e].push(r):i[e]=[i[e],r]:i[e]=r}))})),i}},85888:(e,r,i)=>{i.d(r,{Z:()=>t});const t={capital_ships:{player:["Transport","Miner","Battleship","CorpFlagship"],cerberus:["CerberusSentinel","CerberusGuardian","CerberusInterceptor","CerberusColossus","CerberusDestroyer","CerberusBomber","CerberusPhoenix","CerberusStorm","CerberusGhosts","CerberusHydra","Hydraling1","Hydraling2","CerberusCarrier"],darkCerberus:["DarkSentinel","DarkGuardian","DarkInterceptor","DarkColossus","DarkDestroyer","DarkBomber","DarkPhoenix"]},planets:{yellowstar:["desert_lv1","lava_lv1","water_lv1","terran_lv1","gas_lv1","terran_lv2","lava_lv2","water_lv2","gas_lv2","desert_lv2","lava_lv3","desert_lv3","water_lv3","terran_lv3","ice_variation1","ice_variation2"],redstar:["destroyed01","destroyed02","destroyed03","destroyed04","destroyed05","destroyed06","destroyed07","destroyed08","destroyed09","destroyed10"],whitestar:["whitestar1","whitestar2","whitestar_l1"]}}},29922:(e,r,i)=>{i.d(r,{Z:()=>t});const t={desert_lv1:{Name:"desert_lv1",TID:"TID_PLANET_DESERT_1",TID_Description:"TID_PLANET_DESERT_DESCR",PlanetSize:100,ModelFolders:["desert","desert02","desert03","desert04"],MaxUpgradeLevel:15,CreditIncomeModifier:70,FuelIncomeModifier:50,CreditStorageModifier:100,FuelStorageModifier:100,CreditShipmentModifier:70,FuelShipmentModifier:0,ConceptImage:"portrait_Planet",MaxShipments:10,ShipmentsPerHour:80},desert_lv2:{Name:"desert_lv2",TID:"TID_PLANET_DESERT_2",TID_Description:"TID_PLANET_DESERT_DESCR",PlanetSize:200,ModelFolders:["desert05","desert06","desert07","desert08"],MaxUpgradeLevel:35,CreditIncomeModifier:80,FuelIncomeModifier:0,CreditStorageModifier:100,FuelStorageModifier:100,CreditShipmentModifier:75,FuelShipmentModifier:0,ConceptImage:"portrait_Planet",MaxShipments:24,ShipmentsPerHour:200},desert_lv3:{Name:"desert_lv3",TID:"TID_PLANET_DESERT_3",TID_Description:"TID_PLANET_DESERT_DESCR",PlanetSize:280,ModelFolders:["desert09","desert10","desert11","desert12"],MaxUpgradeLevel:50,CreditIncomeModifier:90,FuelIncomeModifier:0,CreditStorageModifier:100,FuelStorageModifier:100,CreditShipmentModifier:85,FuelShipmentModifier:0,ConceptImage:"portrait_Planet",MaxShipments:36,ShipmentsPerHour:300},lava_lv1:{Name:"lava_lv1",TID:"TID_PLANET_LAVA_1",TID_Description:"TID_PLANET_LAVA_DESCR",PlanetSize:100,ModelFolders:["fire","fire01","fire02","fire03"],MaxUpgradeLevel:15,CreditIncomeModifier:70,FuelIncomeModifier:50,CreditStorageModifier:100,FuelStorageModifier:0,CreditShipmentModifier:90,FuelShipmentModifier:0,ConceptImage:"portrait_Planet",MaxShipments:15,ShipmentsPerHour:120},lava_lv2:{Name:"lava_lv2",TID:"TID_PLANET_LAVA_2",TID_Description:"TID_PLANET_LAVA_DESCR",PlanetSize:180,ModelFolders:["fire04","fire05","fire06","fire07"],MaxUpgradeLevel:35,CreditIncomeModifier:80,FuelIncomeModifier:60,CreditStorageModifier:100,FuelStorageModifier:0,CreditShipmentModifier:95,FuelShipmentModifier:0,ConceptImage:"portrait_Planet",MaxShipments:24,ShipmentsPerHour:200},lava_lv3:{Name:"lava_lv3",TID:"TID_PLANET_LAVA_3",TID_Description:"TID_PLANET_LAVA_DESCR",PlanetSize:300,ModelFolders:["fire08","fire09","fire10"],MaxUpgradeLevel:50,CreditIncomeModifier:90,FuelIncomeModifier:70,CreditStorageModifier:100,FuelStorageModifier:0,CreditShipmentModifier:100,FuelShipmentModifier:0,ConceptImage:"portrait_Planet",MaxShipments:36,ShipmentsPerHour:300},water_lv1:{Name:"water_lv1",TID:"TID_PLANET_WATER_1",TID_Description:"TID_PLANET_WATER_DESCR",PlanetSize:140,ModelFolders:["water","water02","water03","water04"],MaxUpgradeLevel:15,CreditIncomeModifier:100,FuelIncomeModifier:100,CreditStorageModifier:100,FuelStorageModifier:100,CreditShipmentModifier:95,FuelShipmentModifier:0,ConceptImage:"portrait_Planet",MaxShipments:18,ShipmentsPerHour:140},water_lv2:{Name:"water_lv2",TID:"TID_PLANET_WATER_2",TID_Description:"TID_PLANET_WATER_DESCR",PlanetSize:240,ModelFolders:["water05","water06","water07","water08"],MaxUpgradeLevel:35,CreditIncomeModifier:100,FuelIncomeModifier:100,CreditStorageModifier:100,FuelStorageModifier:100,CreditShipmentModifier:100,FuelShipmentModifier:0,ConceptImage:"portrait_Planet",MaxShipments:24,ShipmentsPerHour:200},water_lv3:{Name:"water_lv3",TID:"TID_PLANET_WATER_3",TID_Description:"TID_PLANET_WATER_DESCR",PlanetSize:320,ModelFolders:["water09","water10","water11","water12"],MaxUpgradeLevel:50,CreditIncomeModifier:100,FuelIncomeModifier:100,CreditStorageModifier:100,FuelStorageModifier:100,CreditShipmentModifier:105,FuelShipmentModifier:0,ConceptImage:"portrait_Planet",MaxShipments:38,ShipmentsPerHour:320},terran_lv1:{Name:"terran_lv1",TID:"TID_PLANET_TERRAN_1",TID_Description:"TID_PLANET_TERRAN_DESCR",PlanetSize:120,ModelFolders:["terran01","terran02","terran03","terran04"],MaxUpgradeLevel:15,CreditIncomeModifier:100,FuelIncomeModifier:100,CreditStorageModifier:100,FuelStorageModifier:100,CreditShipmentModifier:115,FuelShipmentModifier:0,ConceptImage:"portrait_Planet",MaxShipments:18,ShipmentsPerHour:150},terran_lv2:{Name:"terran_lv2",TID:"TID_PLANET_TERRAN_2",TID_Description:"TID_PLANET_TERRAN_DESCR",PlanetSize:210,ModelFolders:["terran05","terran06","terran07","terran08"],MaxUpgradeLevel:35,CreditIncomeModifier:100,FuelIncomeModifier:100,CreditStorageModifier:100,FuelStorageModifier:100,CreditShipmentModifier:120,FuelShipmentModifier:0,ConceptImage:"portrait_Planet",MaxShipments:27,ShipmentsPerHour:220},terran_lv3:{Name:"terran_lv3",TID:"TID_PLANET_TERRAN_3",TID_Description:"TID_PLANET_TERRAN_DESCR",PlanetSize:290,ModelFolders:["terran09","terran10","terran11","terran12"],MaxUpgradeLevel:50,CreditIncomeModifier:100,FuelIncomeModifier:100,CreditStorageModifier:100,FuelStorageModifier:100,CreditShipmentModifier:125,FuelShipmentModifier:0,ConceptImage:"portrait_Planet",MaxShipments:35,ShipmentsPerHour:300},gas_lv1:{Name:"gas_lv1",TID:"TID_PLANET_GAS_1",TID_Description:"TID_PLANET_GAS_DESCR",PlanetSize:200,ModelFolders:["gas01","gas05","gas06","gas07","gas09","gas13"],MaxUpgradeLevel:20,CreditIncomeModifier:100,FuelIncomeModifier:100,CreditStorageModifier:100,FuelStorageModifier:100,CreditShipmentModifier:120,FuelShipmentModifier:0,ConceptImage:"portrait_Planet",MaxShipments:22,ShipmentsPerHour:180},gas_lv2:{Name:"gas_lv2",TID:"TID_PLANET_GAS_2",TID_Description:"TID_PLANET_GAS_DESCR",PlanetSize:300,ModelFolders:["gas02","gas03","gas04","gas08","gas10","gas11","gas12"],MaxUpgradeLevel:50,CreditIncomeModifier:100,FuelIncomeModifier:100,CreditStorageModifier:100,FuelStorageModifier:100,CreditShipmentModifier:125,FuelShipmentModifier:0,ConceptImage:"portrait_Planet",MaxShipments:40,ShipmentsPerHour:320},ice:{Name:"ice",TID:"TID_PLANET_ICE",TID_Description:"TID_PLANET_ICE_DESCR",PlanetSize:185,ModelFolders:["ice01","ice02","ice03","ice04"],MaxUpgradeLevel:50,CreditIncomeModifier:100,FuelIncomeModifier:100,CreditStorageModifier:100,FuelStorageModifier:100,CreditShipmentModifier:140,FuelShipmentModifier:0,ConceptImage:"portrait_Planet",MaxShipments:48,ShipmentsPerHour:400},destroyed01:{Name:"destroyed01",TID:"TID_PLANET_DESTROYED",TID_Description:"TID_PLANET_DESTROYED_DESCR",PlanetSize:150,ModelFolders:"destroyed02",RedStarDisplayLevel:1,MaxUpgradeLevel:0,CreditIncomeModifier:0,FuelIncomeModifier:0,CreditStorageModifier:0,FuelStorageModifier:0,CreditShipmentModifier:0,FuelShipmentModifier:0,ConceptImage:"portrait_DyingPlanet",MaxShipments:12,ShipmentsPerHour:100},destroyed02:{Name:"destroyed02",TID:"TID_PLANET_DESTROYED",TID_Description:"TID_PLANET_DESTROYED_DESCR",PlanetSize:150,ModelFolders:"destroyed03",RedStarDisplayLevel:2,MaxUpgradeLevel:0,CreditIncomeModifier:0,FuelIncomeModifier:0,CreditStorageModifier:0,FuelStorageModifier:0,CreditShipmentModifier:0,FuelShipmentModifier:0,ConceptImage:"portrait_DyingPlanet",MaxShipments:12,ShipmentsPerHour:100},destroyed03:{Name:"destroyed03",TID:"TID_PLANET_DESTROYED",TID_Description:"TID_PLANET_DESTROYED_DESCR",PlanetSize:150,ModelFolders:"destroyed06",RedStarDisplayLevel:3,MaxUpgradeLevel:0,CreditIncomeModifier:0,FuelIncomeModifier:0,CreditStorageModifier:0,FuelStorageModifier:0,CreditShipmentModifier:0,FuelShipmentModifier:0,ConceptImage:"portrait_DyingPlanet",MaxShipments:12,ShipmentsPerHour:100},destroyed04:{Name:"destroyed04",TID:"TID_PLANET_DESTROYED",TID_Description:"TID_PLANET_DESTROYED_DESCR",PlanetSize:150,ModelFolders:"destroyed07",RedStarDisplayLevel:4,MaxUpgradeLevel:0,CreditIncomeModifier:0,FuelIncomeModifier:0,CreditStorageModifier:0,FuelStorageModifier:0,CreditShipmentModifier:0,FuelShipmentModifier:0,ConceptImage:"portrait_DyingPlanet",MaxShipments:12,ShipmentsPerHour:100},destroyed05:{Name:"destroyed05",TID:"TID_PLANET_DESTROYED",TID_Description:"TID_PLANET_DESTROYED_DESCR",PlanetSize:150,ModelFolders:"destroyed13",RedStarDisplayLevel:5,MaxUpgradeLevel:0,CreditIncomeModifier:0,FuelIncomeModifier:0,CreditStorageModifier:0,FuelStorageModifier:0,CreditShipmentModifier:0,FuelShipmentModifier:0,ConceptImage:"portrait_DyingPlanet",MaxShipments:12,ShipmentsPerHour:100},ice_variation1:{Name:"ice_variation1",TID:"TID_PLANET_ICE",TID_Description:"TID_PLANET_ICE_DESCR",PlanetSize:210,ModelFolders:["ice05","ice06","ice07","ice08"],MaxUpgradeLevel:50,CreditIncomeModifier:100,FuelIncomeModifier:100,CreditStorageModifier:100,FuelStorageModifier:100,CreditShipmentModifier:140,FuelShipmentModifier:0,ConceptImage:"portrait_Planet",MaxShipments:40,ShipmentsPerHour:320},ice_variation2:{Name:"ice_variation2",TID:"TID_PLANET_ICE",TID_Description:"TID_PLANET_ICE_DESCR",PlanetSize:275,ModelFolders:["ice09","ice10","ice11","ice12"],MaxUpgradeLevel:50,CreditIncomeModifier:100,FuelIncomeModifier:100,CreditStorageModifier:100,FuelStorageModifier:100,CreditShipmentModifier:140,FuelShipmentModifier:0,ConceptImage:"portrait_Planet",MaxShipments:50,ShipmentsPerHour:420},destroyed06:{Name:"destroyed06",TID:"TID_PLANET_DESTROYED",TID_Description:"TID_PLANET_DESTROYED_DESCR",PlanetSize:150,ModelFolders:"destroyed14",RedStarDisplayLevel:6,MaxUpgradeLevel:0,CreditIncomeModifier:0,FuelIncomeModifier:0,CreditStorageModifier:0,FuelStorageModifier:0,CreditShipmentModifier:0,FuelShipmentModifier:0,ConceptImage:"portrait_DyingPlanet",MaxShipments:12,ShipmentsPerHour:100},whitestar1:{Name:"whitestar1",TID:"TID_PLANET_DESTROYED",TID_Description:"TID_WHITE_STAR_PLANET_DESCR",PlanetSize:100,ModelFolders:["destroyed20","destroyed21","destroyed22","destroyed23"],RedStarDisplayLevel:10,MaxUpgradeLevel:0,CreditIncomeModifier:0,FuelIncomeModifier:0,CreditStorageModifier:0,FuelStorageModifier:0,CreditShipmentModifier:0,FuelShipmentModifier:0,ConceptImage:"portrait_PlanetWhiteStar",MaxShipments:12,ShipmentsPerHour:0,TicksPerRelic:720,HydrogenForRelic:150},destroyed07:{Name:"destroyed07",TID:"TID_PLANET_DESTROYED",TID_Description:"TID_PLANET_DESTROYED_DESCR",PlanetSize:150,ModelFolders:"destroyed15",RedStarDisplayLevel:7,MaxUpgradeLevel:0,CreditIncomeModifier:0,FuelIncomeModifier:0,CreditStorageModifier:0,FuelStorageModifier:0,CreditShipmentModifier:0,FuelShipmentModifier:0,ConceptImage:"portrait_DyingPlanet",MaxShipments:12,ShipmentsPerHour:100},whitestar2:{Name:"whitestar2",TID:"TID_PLANET_DESTROYED",TID_Description:"TID_WHITE_STAR_PLANET_DESCR",PlanetSize:100,ModelFolders:["destroyed16","destroyed17","destroyed18","destroyed19"],RedStarDisplayLevel:5,MaxUpgradeLevel:0,CreditIncomeModifier:0,FuelIncomeModifier:0,CreditStorageModifier:0,FuelStorageModifier:0,CreditShipmentModifier:0,FuelShipmentModifier:0,ConceptImage:"portrait_PlanetWhiteStar",MaxShipments:12,ShipmentsPerHour:0,TicksPerRelic:2400,HydrogenForRelic:300},destroyed08:{Name:"destroyed08",TID:"TID_PLANET_DESTROYED",TID_Description:"TID_PLANET_DESTROYED_DESCR",PlanetSize:150,ModelFolders:"destroyed08",RedStarDisplayLevel:8,MaxUpgradeLevel:0,CreditIncomeModifier:0,FuelIncomeModifier:0,CreditStorageModifier:0,FuelStorageModifier:0,CreditShipmentModifier:0,FuelShipmentModifier:0,ConceptImage:"portrait_DyingPlanet",MaxShipments:12,ShipmentsPerHour:100},destroyed09:{Name:"destroyed09",TID:"TID_PLANET_DESTROYED",TID_Description:"TID_PLANET_DESTROYED_DESCR",PlanetSize:150,ModelFolders:"destroyed09",RedStarDisplayLevel:9,MaxUpgradeLevel:0,CreditIncomeModifier:0,FuelIncomeModifier:0,CreditStorageModifier:0,FuelStorageModifier:0,CreditShipmentModifier:0,FuelShipmentModifier:0,ConceptImage:"portrait_DyingPlanet",MaxShipments:12,ShipmentsPerHour:100},destroyed10:{Name:"destroyed10",TID:"TID_PLANET_DESTROYED",TID_Description:"TID_PLANET_DESTROYED_DESCR",PlanetSize:150,ModelFolders:"destroyed10",RedStarDisplayLevel:10,MaxUpgradeLevel:0,CreditIncomeModifier:0,FuelIncomeModifier:0,CreditStorageModifier:0,FuelStorageModifier:0,CreditShipmentModifier:0,FuelShipmentModifier:0,ConceptImage:"portrait_DyingPlanet",MaxShipments:12,ShipmentsPerHour:100},whitestar_l1:{Name:"whitestar_l1",TID:"TID_PLANET_DESTROYED",TID_Description:"TID_WHITE_STAR_PLANET_DESCR",PlanetSize:100,ModelFolders:["desert05","desert06","desert07","desert08"],RedStarDisplayLevel:1,MaxUpgradeLevel:0,CreditIncomeModifier:0,FuelIncomeModifier:0,CreditStorageModifier:0,FuelStorageModifier:0,CreditShipmentModifier:0,FuelShipmentModifier:0,ConceptImage:"portrait_PlanetWhiteStar",MaxShipments:12,ShipmentsPerHour:0,TicksPerRelic:2400,HydrogenForRelic:500},destroyed11:{Name:"destroyed11",TID:"TID_PLANET_DESTROYED",TID_Description:"TID_PLANET_DESTROYED_DESCR",PlanetSize:150,ModelFolders:"destroyed24",RedStarDisplayLevel:11,MaxUpgradeLevel:0,CreditIncomeModifier:0,FuelIncomeModifier:0,CreditStorageModifier:0,FuelStorageModifier:0,CreditShipmentModifier:0,FuelShipmentModifier:0,ConceptImage:"portrait_DyingPlanet",MaxShipments:12,ShipmentsPerHour:100}}}}]);