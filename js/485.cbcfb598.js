"use strict";(self["webpackChunkhades_space"]=self["webpackChunkhades_space"]||[]).push([[485],{57823:(e,t,a)=>{a.d(t,{E:()=>o,g:()=>n});const r="https://cdn.discordapp.com/";function n(e,t,a=80){const n=new URL(`avatars/${e}/${t}.webp`,r);return n.searchParams.set("size",String(a)),n}function o(e,t,a=96){const n=new URL(`icons/${e}/${t}.webp`,r);return n.searchParams.set("size",String(a)),n}},72688:(e,t,a)=>{a.d(t,{Z:()=>w});var r=a(66252),n=a(2262),o=a(3577),l=a(49963),i=a(70131),_=a(95893),S=a(57823),I=a(11815),u=a(50930),s=a(76068);const c=e=>((0,r.dD)("data-v-f515be64"),e=e(),(0,r.Cn)(),e),D={class:"header"},d={class:"content"},T={key:0,class:"logged fetching"},R={class:"avatar"},N=["src"],E=["src"],C=c((()=>(0,r._)("p",null,null,-1))),m={class:"avatar"},p=["src","alt"],M=["src","alt"],A={key:2,class:"not-logged"},v=c((()=>(0,r._)("div",{class:"footer"},[(0,r._)("div",{class:"content"},[(0,r._)("p",null,[(0,r.Uk)("Powered by "),(0,r._)("a",{href:"https://hs-compendium.com/",target:"_blank"},"HS Compendium")])])],-1))),B={class:"input"},L={class:"name"},O={class:"error-msg"},P=/[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}/,U=(0,r.aZ)({__name:"CompendiumPage",setup(e){const{t}=(0,i.QT)(),a=(0,n.iH)(!1),c=(0,n.iH)(""),U=(0,n.iH)(""),g=(0,n.iH)(!1),y=(0,n.iH)(),w=(0,n.iH)();let G=()=>Promise.prototype;async function f(){let e;if(!c.value)return void(U.value=t("CANNOT_BE_EMPTY"));if(!P.test(c.value))return void(U.value=t("INCORRECT_CODE"));g.value=!0;try{e=await _.ZP.checkConnectCode(c.value)}catch(n){return U.value=n.toString(),console.error(n),void(g.value=!1)}g.value=!1,a.value=!1;const r=await G(t("CONFIRM_LOGIN",[e.guild.name,e.user.username])).catch((()=>(a.value=!0,!0)));r||(g.value=!0,await _.ZP.connect(e),y.value=_.ZP.getUser(),w.value=_.ZP.getGuild(),g.value=!1)}function h(){G(t("TID_SETTINGS_DLG_SIGN_OUT")).then((()=>{_.ZP.logout(),y.value=void 0,w.value=void 0})).catch((()=>{}))}return(0,r.bv)((async()=>{g.value=!0,await(0,_.S1)();const e=_.ZP.getUser();g.value=!1,e?(y.value=e,w.value=_.ZP.getGuild()):a.value=!0})),(e,t)=>{const i=(0,r.Q2)("t");return(0,r.wg)(),(0,r.iD)("div",null,[(0,r._)("div",D,[(0,r._)("div",d,[g.value&&!y.value?((0,r.wg)(),(0,r.iD)("div",T,[(0,r._)("div",R,[(0,r._)("img",{src:(0,n.SU)(I),alt:"memberImage avatar"},null,8,N),(0,r._)("img",{src:(0,n.SU)(I),alt:"memberImage avatar"},null,8,E)]),C])):(0,r.kq)("",!0),y.value?((0,r.wg)(),(0,r.iD)("div",{key:1,class:"logged",onClick:h},[(0,r._)("div",m,[(0,r._)("img",{src:(0,n.SU)(S.E)(w.value.id,w.value.icon),alt:`${w.value.name} icon`,onError:t[0]||(t[0]=e=>e.target.src=(0,n.SU)(I))},null,40,p),(0,r._)("img",{src:(0,n.SU)(S.g)(y.value.id,y.value.avatar),alt:`${y.value.username} avatar`,onError:t[1]||(t[1]=e=>e.target.src=(0,n.SU)(I))},null,40,M)]),(0,r._)("p",null,(0,o.zw)(y.value.username),1)])):(0,r.kq)("",!0),g.value||y.value?(0,r.kq)("",!0):((0,r.wg)(),(0,r.iD)("div",A,[(0,r.wy)((0,r._)("span",null,null,512),[[i,"TID_SETTINGS_DLG_NOT_SIGNED_IN"]]),(0,r._)("button",{class:"button accent",onClick:t[2]||(t[2]=e=>a.value=!0)},(0,o.zw)(e.$t("TID_SETTINGS_DLG_SIGN_IN")),1)]))])]),(0,r.WI)(e.$slots,"default"),v,(0,r.Wm)(u.Z,{open:a.value,"onUpdate:open":t[4]||(t[4]=e=>a.value=e),title:e.$t("TID_SETTINGS_DLG_SIGN_IN"),size:(0,n.SU)(u.z).SMALL},{body:(0,r.w5)((()=>[(0,r._)("div",B,[(0,r._)("p",L,[(0,r.wy)((0,r._)("span",null,null,512),[[i,"ENTER_CODE"]]),(0,r._)("span",O,(0,o.zw)(U.value),1)]),(0,r.wy)((0,r._)("input",{"onUpdate:modelValue":t[3]||(t[3]=e=>c.value=e)},null,512),[[l.nr,c.value]])]),(0,r._)("div",{class:(0,o.C_)(["code-req-btn-wrap",{disable:g.value}])},[(0,r.wy)((0,r._)("button",{class:"button accent",onClick:f},null,512),[[i,"TID_LINK_DEVICE_DLG_SUBMIT_CODE_BTN"]])],2)])),_:1},8,["open","title","size"]),(0,r.Wm)(s.Z,{onSetShow:t[5]||(t[5]=e=>{(0,n.dq)(G)?G.value=e:G=e})})])}}});var g=a(83744);const y=(0,g.Z)(U,[["__scopeId","data-v-f515be64"]]),w=y},2824:(e,t,a)=>{a.d(t,{Z:()=>U});var r=a(66252),n=a(3577),o=a(2262),l=a(45715),i=a(51131),_=a(52946),S=a(74428),I=a(76216),u=a(37928),s=a(53269),c=a(85888);const D={class:"sections-group other"},d={class:"type",name:"spaceBuildings"},T=["onClick"],R={key:0,class:"level"},N={class:"type",name:"ships"},E=["onClick"],C={key:0,class:"level"},m={class:"type",name:"alliance"},p={class:"item"},M={key:0,class:"level"},A={class:"sections-group modules"},v=["onClick"],B={key:0,class:"level"},L=(0,r.aZ)({__name:"CompendiumTechList",props:{levelMap:{default:()=>({})},onClick:{type:Function,default:()=>{}},isMuted:{type:Function,default:()=>!1}},setup(e){const t={RedStarScanner:i.Z.RedStarScanner,ShipmentRelay:i.Z.ShipmentRelay},a={Transport:l.Z.Transport,Miner:l.Z.Miner,Battleship:l.Z.Battleship},L={Name:"AllianceLevel",TID:"TID_CORP_TAB_MY_CORP",Icon:"corpXp",specialIcon:!0},O=Object.fromEntries(c.Z.artifact.map((e=>[e,(0,_.VV)(e)]))),P={key:e=>(0,I.Z)(e,u.Z.currentRoute.value.name),value:(e,t)=>(0,s.Z)(e,t,u.Z.currentRoute.value.name)};return(e,l)=>{const i=(0,r.Q2)("t");return(0,r.wg)(),(0,r.iD)("div",null,[(0,r._)("div",D,[(0,r._)("section",d,[(0,r.wy)((0,r._)("h3",null,null,512),[[i,"TID_BUILDING_LEVEL_DESCR"]]),(0,r._)("ul",null,[((0,r.wg)(),(0,r.iD)(r.HY,null,(0,r.Ko)(t,((t,a)=>(0,r._)("li",{key:a,class:"item"},[(0,r._)("div",{class:(0,n.C_)({mute:e.isMuted(t.Name)}),onClick:()=>e.onClick(t)},[(0,r.Wm)(S.Z,{name:t.PrefabModel,dir:"game/SpaceBuildings"},null,8,["name"]),e.levelMap?.[t.Name]?((0,r.wg)(),(0,r.iD)("span",R,(0,n.zw)(e.levelMap[t.Name]),1)):(0,r.kq)("",!0)],10,T)]))),64))])]),(0,r._)("section",N,[(0,r.wy)((0,r._)("h3",null,null,512),[[i,"TID_PRODUCTION_DLG_SHIPS"]]),(0,r._)("ul",null,[((0,r.wg)(),(0,r.iD)(r.HY,null,(0,r.Ko)(a,((t,a)=>(0,r._)("li",{key:a,class:"item"},[(0,r._)("div",{class:(0,n.C_)({mute:e.isMuted(t.Name)}),onClick:()=>e.onClick(t)},[(0,r.Wm)(S.Z,{name:t.Name in e.levelMap?t.Model[e.levelMap[t.Name]-1]:t.Model[4],dir:"game/Ships"},null,8,["name"]),e.levelMap?.[t.Name]?((0,r.wg)(),(0,r.iD)("span",C,(0,n.zw)(e.levelMap[t.Name]),1)):(0,r.kq)("",!0)],10,E)]))),64))])]),(0,r._)("section",m,[(0,r.wy)((0,r._)("h3",null,null,512),[[i,"TID_CHAT_TAB_CORPORATION"]]),(0,r._)("ul",null,[(0,r._)("li",p,[(0,r._)("div",{class:(0,n.C_)({mute:e.isMuted("AllianceLevel")}),onClick:l[0]||(l[0]=()=>e.onClick(L))},[(0,r.Wm)(S.Z,{name:"corpXp",dir:"icons"}),e.levelMap?.["AllianceLevel"]?((0,r.wg)(),(0,r.iD)("span",M,(0,n.zw)(e.levelMap["AllianceLevel"]),1)):(0,r.kq)("",!0)],2)])])])]),(0,r._)("div",A,[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)((0,o.SU)(O),((t,a)=>((0,r.wg)(),(0,r.iD)("section",{key:a,class:"type",name:"modules"},[(0,r._)("h3",null,(0,n.zw)(P.key(a)),1),(0,r._)("ul",null,[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(t,(t=>((0,r.wg)(),(0,r.iD)("li",{key:t.Name,class:"item"},[(0,r._)("div",{class:(0,n.C_)({mute:e.isMuted(t.Name)}),onClick:()=>e.onClick(t)},[(0,r.Wm)(S.Z,{name:t.Icon,dir:"game/Modules"},null,8,["name"]),e.levelMap?.[t.Name]?((0,r.wg)(),(0,r.iD)("span",B,(0,n.zw)(e.levelMap[t.Name]),1)):(0,r.kq)("",!0)],10,v)])))),128))])])))),128))])])}}});var O=a(83744);const P=(0,O.Z)(L,[["__scopeId","data-v-0c03ffa7"]]),U=P},76068:(e,t,a)=>{a.d(t,{Z:()=>D});var r=a(66252),n=a(49963),o=a(3577),l=a(2262),i=a(50930);const _={class:"wrap"},S={key:0,class:"container"},I={class:"buttons"},u=(0,r.aZ)({__name:"TheConfirm",emits:["setShow"],setup(e,{emit:t}){const a=(0,l.iH)(""),u=(0,l.iH)(!1);let s,c;function D(){T(c)}function d(e){return u.value=!0,a.value=e,new Promise(((e,t)=>{s=e,c=t}))}function T(e){e(),u.value=!1,s=()=>null,c=()=>null}return t("setShow",d),(e,t)=>{const d=(0,r.Q2)("t");return(0,r.wg)(),(0,r.j4)(i.Z,{title:"Confirm",open:u.value,"onUpdate:open":D},{default:(0,r.w5)((()=>[(0,r.Wm)(n.uT,null,{default:(0,r.w5)((()=>[(0,r._)("div",_,[u.value?((0,r.wg)(),(0,r.iD)("div",S,[(0,r.Uk)((0,o.zw)(a.value)+" ",1),(0,r._)("div",I,[(0,r.wy)((0,r._)("button",{onClick:t[0]||(t[0]=e=>T((0,l.SU)(c)))},null,512),[[d,"TID_CANCEL"]]),(0,r.wy)((0,r._)("button",{onClick:t[1]||(t[1]=e=>T((0,l.SU)(s)))},null,512),[[d,"TID_OK"]])])])):(0,r.kq)("",!0)])])),_:1})])),_:1},8,["open"])}}});var s=a(83744);const c=(0,s.Z)(u,[["__scopeId","data-v-7b674cbe"]]),D=c},51131:(e,t,a)=>{a.d(t,{Z:()=>r});const r={Shipyard:{Name:"Shipyard",AllowBuildOnYS:1,MoveHydrogenCostPerSector:100,TID:"TID_BUILDING_SHIPYARD",TID_Description:"TID_BUILDING_SHIPYARD_DESCR",TID_INFO_SCREEN:"TID_BUILDING_SHIPYARD_DESCR",TID_UPGRADE:"TID_BLD_SHIPYARD_UPGRADE",TID_CUSTOM_TUT_SELECT:"TID_TUT_SELECT_SHIPYARD",ConceptImage:"portrait_shipyard",PrefabModel:"station_Shipyard",PrefabModel_BuildMenu:"station_Shipyard_ui",RequiredPlanetLevel:1,UISortOrder:10,Cost:[800,4e3,1e4,2e4,8e4,2e5,5e5,1e6,2e6,5e6],RequiresEmptySector:0,MaxOnOwnSolarSystem:1,MaxPerSector:1,ShipyardCapacity:[4,5,7,8,10,12,13,14,15,16],BuildNotifMode:0,ShowInStarLinks:1,ConstructionTime:[5,60,1800,28800,86400,172800,259200,345600,432e3,432e3]},ShortRangeScanner:{Name:"ShortRangeScanner",AllowBuildOnYS:1,CanCancelBuild:1,CancelBuildRefundPct:90,SeparateBuildingPerLevel:1,AllowAdditionalBuildingsAtMaxLevel:1,MoveHydrogenCostPerSector:50,AllowMoveInSameSectorOnly:1,TID:"TID_BUILDING_SHORT_RANGE_SCANNER",TID_Description:"TID_BUILDING_SHORT_RANGE_SCANNER_DESCR",TID_INFO_SCREEN:"TID_BUILDING_SHORT_RANGE_SCANNER_INFO",ConceptImage:"portrait_SpaceBuilding",PrefabModel:"station_ShortRangeScanner",PrefabModel_BuildMenu:"station_ShortRangeScanner_ui",PrefabModel_WithStarHarvester:"station_HydroScanner",RequiredPlanetLevel:3,UISortOrder:30,Cost:[500,2e3,2e4,4e4,8e4,15e4,3e5,6e5,1e6,2e6,3e6,4e6],SectorUnlockCost:[1500,2e3,2e4,4e4,8e4,15e4,3e5,6e5,1e6,2e6,3e6,4e6],SectorUnlockTime:[60,3600,86400,129600,172800,259200,345600,432e3,518400,604800,604800,604800],RequiresEmptySector:0,MaxPerSector:1,CanScanSectors:1,BuildNotifMode:2,ConstructionTime:[60,600,43200,86400,86400,86400,86400,86400,86400,86400,86400,86400]},RedStarScanner:{Name:"RedStarScanner",AllowBuildOnYS:1,MoveHydrogenCostPerSector:25,TID:"TID_BUILDING_REDSTAR_SCANNER",TID_Description:"TID_BUILDING_REDSTAR_SCANNER_DESCR",TID_INFO_SCREEN:"TID_BUILDING_REDSTAR_SCANNER_INFO",TID_UPGRADE:"TID_BLD_REDSTAR_UPGRADE",TID_CUSTOM_TUT_SELECT:"TID_TUT_SELECT_MISSION_BUILDING",ConceptImage:"portrait_JumpGate",PrefabModel:"station_RedStarScanner",PrefabModel_BuildMenu:"station_RedStarScanner_ui",RequiredPlanetLevel:4,UISortOrder:40,Cost:[1e3,5e3,2e4,6e4,1e5,2e5,6e5,2e6,4e6,8e6,17e6,32e6],RequiresEmptySector:0,MaxOnOwnSolarSystem:1,MaxPerSector:1,StarScannerType:0,StargateModel:"JumpGate",BuildNotifMode:1,ShowInStarLinks:1,ConstructionTime:[3,60,1800,86400,172800,259200,345600,432e3,518400,604800,864e3,864e3]},ResearchStation:{Name:"ResearchStation",AllowBuildOnYS:1,MoveHydrogenCostPerSector:25,TID:"TID_BUILDING_RESEARCH",TID_Description:"TID_BUILDING_RESEARCH_DESCR",TID_INFO_SCREEN:"TID_BUILDING_RESEARCH_INFO",TID_UPGRADE:"TID_BLD_RESEARCH_STATION_UPGRADE",TID_CUSTOM_TUT_SELECT:"TID_TUT_SELECT_RESEARCH_STATION",ConceptImage:"portrait_SpaceBuilding",PrefabModel:"station_Research",PrefabModel_BuildMenu:"station_Research_ui",RequiredPlanetLevel:5,UISortOrder:50,Cost:1e3,ResearchSlots:8,RequiresEmptySector:0,MaxOnOwnSolarSystem:1,MaxPerSector:1,BuildNotifMode:1,ShowInStarLinks:1,ConstructionTime:5},DiplomacyCenter:{Name:"DiplomacyCenter",AllowBuildOnYS:1,SeparateBuildingPerLevel:1,MoveHydrogenCostPerSector:1e3,TID:"TID_BUILDING_DIPLOMACY_CENTER",TID_Description:"TID_BUILDING_DIPLOMACY_CENTER_DESCR",TID_INFO_SCREEN:"TID_BUILDING_DIPLOMACY_CENTER_INFO",ConceptImage:"portrait_SpaceBuilding",PrefabModel:"station_Diplomacy",PrefabModel_BuildMenu:"station_Diplomacy_ui",RequiredPlanetLevel:7,UISortOrder:120,Cost:[25e3,5e5,4e6],RequiresEmptySector:0,MaxOnOwnSolarSystem:3,MaxPerSector:1,StargateModel:"JumpGate",BuildNotifMode:3,ShowInStarLinks:1,ConstructionTime:[28800,432e3,864e3]},TradingStation:{Name:"TradingStation",AllowBuildOnYS:1,CanBeRenamed:1,MoveHydrogenCostPerSector:500,TID:"TID_BUILDING_TRADINGSTATION",TID_Description:"TID_BUILDING_TRADINGSTATION_DESCR",TID_INFO_SCREEN:"TID_BUILDING_TRADINGSTATION_DESCR",ConceptImage:"portrait_SpaceBuilding",PrefabModel:"station_trade",PrefabModel_BuildMenu:"station_trade_ui",RequiredPlanetLevel:13,UISortOrder:140,Cost:[2e3,5e3,5e3,5e3,5e3,5e3,5e3,5e3,5e3,5e3],TotalShipmentCRPerDay:[1500,3e3,4500,6e3,8e3,1e4,12e3,15e3,18e3,25e3],MaxShipments:[15,20,25,30,35,40,50,60,70,80],RequiresEmptySector:1,CenterPlacement:1,RequiresSectorDistance:1,MaxOnOwnSolarSystem:3,MaxPerSector:1,BuildNotifMode:1,ShowInStarLinks:1,RSLevelReq:[null,5,6,7,7,8,8,9,9,10],ConstructionTime:[86400,172800,345600,432e3,518400,604800,691200,777600,864e3,950400]},WarpLaneHub:{Name:"WarpLaneHub",AllowBuildOnYS:1,SeparateBuildingPerLevel:1,AllowAdditionalBuildingsAtMaxLevel:1,BuyInPairs:1,MoveHydrogenCostPerSector:50,TID:"TID_BUILDING_WARPLANE_HUB",TID_Description:"TID_BUILDING_WARPLANE_HUB_DESCR",TID_INFO_SCREEN:"TID_BUILDING_WARPLANE_HUB_INFO",ConceptImage:"portrait_WarpLane",PrefabModel:"warpLaneHub",PrefabModel_BuildMenu:"warpLaneHub_ui",RequiredPlanetLevel:12,UISortOrder:130,Cost:[1e4,1e4,15e3,15e3,2e4,2e4,25e3,25e3,5e4,5e4,1e5,1e5,2e5,2e5,3e5,3e5,4e5,4e5,5e5,5e5,6e5,6e5],RSLevelReq:[5,5,5,5,6,6,6,6,7,7,7,7,7,7,8,8,8,8,9,9,10,10],RequiresEmptySector:0,MaxOnOwnSolarSystem:24,MaxPerSector:8,IsWarpLane:1,OverrideMinAsteroidDistSquared:1e6,BuildNotifMode:1,ConstructionTime:[43200,43200,86400,86400,172800,172800,259200,259200,345600,345600,432e3,432e3,518400,518400,604800,604800,691200,691200,777600,777600,864e3,864e3]},Stargate:{Name:"Stargate",AllowBuildOnYS:0,TID:"TID_BUILDING_STARGATE",TID_Description:"TID_BUILDING_STARGATE_DESCR",TID_INFO_SCREEN:"TID_BUILDING_STARGATE_DESCR",ConceptImage:"portrait_JumpGate",IsStargate:1,RequiresEmptySector:0,OverrideMinAsteroidDistSquared:1e6,StargateModel:"JumpGate02"},OrangeStarScanner:{Name:"OrangeStarScanner",AllowBuildOnYS:0,MoveHydrogenCostPerSector:1e3,TID:"TID_BUILDING_ORANGESTAR_SCANNER",TID_Description:"TID_BUILDING_ORANGESTAR_SCANNER_DESCR",TID_INFO_SCREEN:"TID_BUILDING_ORANGESTAR_SCANNER_INFO",ConceptImage:"portrait_JumpGate",Model:"redStarScanner",RequiredPlanetLevel:5,UISortOrder:50,Cost:4e4,RequiresEmptySector:1,MaxOnOwnSolarSystem:1,MaxPerSector:1,StarScannerType:1,StargateModel:"JumpGate",ConstructionTime:86400},WhiteStarScanner:{Name:"WhiteStarScanner",AllowBuildOnYS:1,MoveHydrogenCostPerSector:100,TID:"TID_BLD_WHITESTAR_SCANNER",TID_Description:"TID_BLD_WHITESTAR_SCANNER_DESCR",TID_INFO_SCREEN:"TID_BLD_WHITESTAR_SCANNER_DESCR",TID_UPGRADE:"TID_BLD_REDSTAR_UPGRADE",ConceptImage:"portrait_JumpGate",PrefabModel:"station_WhiteStarScanner",PrefabModel_BuildMenu:"station_WhiteStarScanner_ui",RequiredPlanetLevel:10,UISortOrder:92,Cost:25e3,RequiresEmptySector:1,MaxOnOwnSolarSystem:1,MaxPerSector:1,StargateModel:"JumpGateWhiteStar",BuildNotifMode:1,ShowInStarLinks:1,ConstructionTime:1},TimeModulator:{Name:"TimeModulator",AllowBuildOnYS:0,MoveHydrogenCostPerSector:1e3,AllowMoveInSameSectorOnly:1,TID:"TID_BLD_STAR_HARVESTER",TID_Description:"TID_BLD_STAR_HARVESTER_BUILD_DESCR",TID_INFO_SCREEN:"TID_BLD_STAR_HARVESTER_DESCR",ConceptImage:"portrait_SpaceBuilding",PrefabModel:"timeModulator",PrefabModel_BuildMenu:"timeModulator_ui",RequiredPlanetLevel:6,UISortOrder:71,Cost:[1e3,4e3,1e4,3e4,1e5,2e5,4e5,6e5,8e5,1e6,2e6,3e6,4e6,5e6,6e6,7e6],RequiresStarSector:1,MaxOnOwnSolarSystem:1,MaxPerSector:1,BuildNotifMode:1,ShowInStarLinks:1,ConstructionTime:[5,3600,28800,172800,345600,432e3,518400,604800,691200,777600,864e3,864e3,864e3,864e3,864e3,864e3]},BlueStarScanner:{Name:"BlueStarScanner",AllowBuildOnYS:1,MoveHydrogenCostPerSector:100,TID:"TID_BUILDING_BLUESTAR_SCANNER",TID_Description:"TID_BUILDING_BLUESTAR_SCANNER_DESCR",TID_INFO_SCREEN:"TID_BUILDING_BLUESTAR_SCANNER_INFO",TID_UPGRADE:"TID_BUILDING_BLUESTAR_SCANNER_INFO",ConceptImage:"portrait_Anomaly",PrefabModel:"station_BlueStarScanner",PrefabModel_BuildMenu:"station_BlueStarScanner_ui",RequiredPlanetLevel:5,UISortOrder:90,Cost:5e3,RequiresEmptySector:0,MaxOnOwnSolarSystem:1,MaxPerSector:1,StarScannerType:1,StargateModel:"JumpGate",BuildNotifMode:1,ShowInStarLinks:1,ConstructionTime:3},ShipmentRelay:{Name:"ShipmentRelay",AllowBuildOnYS:1,MoveHydrogenCostPerSector:100,TID:"TID_BLD_RELAY",TID_Description:"TID_BLD_RELAY_DESCR",TID_INFO_SCREEN:"TID_BLD_RELAY_INFO",ConceptImage:"portrait_SpaceBuilding",PrefabModel:"station_ShipmentRelay",PrefabModel_BuildMenu:"station_ShipmentRelay_ui",RequiredPlanetLevel:4,UISortOrder:55,Cost:[1500,5e3,1e4,2e4,3e4,4e4,5e4,6e4,7e4,8e4,1e5],MaxOnOwnSolarSystem:1,MaxPerSector:1,RelayBonusPct:[0,5,10,20,60,110,150,180,240,330,1100],HydroCostPerShipment:[5,10,20,40,60,80,100,120,140,160,200],BuildNotifMode:[0,1],ShowInStarLinks:1,RSLevelReq:[null,2,3,4,5,6,7,8,9,10,11],ConstructionTime:[3,28800,57600,86400,172800,259200,345600,432e3,518400,604800,604800]},QuantumStarGate:{Name:"QuantumStarGate",MoveHydrogenCostPerSector:1e3,TID:"TID_BUILDING_QUANTUMSTAR_GATE",TID_Description:"TID_BUILDING_QUANTUMSTAR_GATE_DESCR",TID_INFO_SCREEN:"TID_BUILDING_QUANTUMSTAR_GATE_INFO",TID_UPGRADE:"TID_BUILDING_QUANTUMSTAR_GATE_INFO",ConceptImage:"portrait_Anomaly",PrefabModel:"station_DarkStarScanner",PrefabModel_BuildMenu:"station_DarkStarScanner_ui",RequiredPlanetLevel:0,UISortOrder:200,Cost:12e6,MaxOnOwnSolarSystem:1,MaxPerSector:1,StarScannerType:2,StargateModel:"JumpGate_DarkStar",ConstructionTime:86400},QuantumScanner:{Name:"QuantumScanner",MoveHydrogenCostPerSector:500,AllowMoveInSameSectorOnly:1,TID:"TID_BUILDING_QUANTUM_STAR_SCANNER",TID_Description:"TID_BUILDING_QUANTUM_STAR_SCANNER_DESCR",TID_INFO_SCREEN:"TID_BUILDING_QUANTUM_STAR_SCANNER_DESCR",ConceptImage:"portrait_SpaceBuilding",PrefabModel:"station_ShortRangeScanner",PrefabModel_BuildMenu:"station_ShortRangeScanner_ui",Cost:1e6,RequiresEmptySector:0,MaxOnOwnSolarSystem:1,MaxPerSector:1,BuildNotifMode:2,QSExploreCost:1e3,DestroyerTarget:1,MaxHealth:1e3,ConstructionTime:3},MineralRefinery:{Name:"MineralRefinery",AllowBuildOnYS:0,MoveHydrogenCostPerSector:5e3,AllowMoveInSameSectorOnly:1,TID:"TID_BUILDING_MINERAL_REFINERY",TID_Description:"TID_BUILDING_MINERAL_REFINERY_DESCR",TID_INFO_SCREEN:"TID_BUILDING_MINERAL_REFINERY_DESCR",TID_UPGRADE:"TID_BUILDING_MINERAL_REFINERY_DESCR",ConceptImage:"portrait_Anomaly",PrefabModel:"timeModulator",PrefabModel_BuildMenu:"timeModulator_ui",Cost:1e6,RequiresStarSector:1,MaxOnOwnSolarSystem:1,MaxPerSector:1,DestroyerTarget:1,MaxHealth:1e3,ConstructionTime:3},DO_NOT_USE:{Name:"DO_NOT_USE",SeparateBuildingPerLevel:1,MoveHydrogenCostPerSector:500,AllowMoveInSameSectorOnly:1,TID:"TID_BUILDING_HYDRO_SCANNER",TID_Description:"TID_BUILDING_HYDRO_SCANNER_DESCR",TID_INFO_SCREEN:"TID_BUILDING_HYDRO_SCANNER_INFO",ConceptImage:"portrait_SpaceBuilding",PrefabModel:"station_HydroScanner",PrefabModel_BuildMenu:"station_ShortRangeScanner_ui",RequiredPlanetLevel:3,UISortOrder:70,Cost:[12e4,18e4,25e4,5e5,1e6,2e6,4e6,6e6,8e6,1e6,16e6,2e7],MaxPerSector:1,BuildNotifMode:1,RequiresDoneSRS:1,GenAsteroids:[2,5],SimilarBuildingID:1,ConstructionTime:[28800,86400,172800,259200,345600,432e3,432e3,432e3,432e3,604800,604800,604800]},StarHarvester:{Name:"StarHarvester",AllowBuildOnYS:1,MoveHydrogenCostPerSector:50,AllowMoveInSameSectorOnly:1,TID:"TID_BLD_STAR_HARVESTER",TID_Description:"TID_BLD_STAR_HARVESTER_DESCR",TID_INFO_SCREEN:"TID_BLD_STAR_HARVESTER_DESCR",ConceptImage:"portrait_SpaceBuilding",PrefabModel:"timeModulator",PrefabModel_BuildMenu:"timeModulator_ui",RequiredPlanetLevel:10,UISortOrder:95,Cost:[7e4,9e4,14e4,19e4,55e4,15e5,21e5,4e6,8e6,16e6,32e6],RequiresStarSector:1,MaxOnOwnSolarSystem:1,MaxPerSector:1,BuildNotifMode:1,ShowInStarLinks:1,SHHydroPerDay:[1e3,1500,2500,5e3,6e3,8e3,1e4,12e3,14e3,18e3,44e3],ConstructionTime:[86400,86400,86400,172800,172800,259200,259200,259200,432e3,604800,864e3]}}}}]);