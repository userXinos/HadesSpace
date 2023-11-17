"use strict";(self["webpackChunkhades_space"]=self["webpackChunkhades_space"]||[]).push([[530],{96265:(e,a,t)=>{t.d(a,{Z:()=>l});var n=t(85888);function l(e){const a=e.split(".").reduce(((e,a)=>e[a]),n.Z);return{filter:([e])=>a.includes(e),sort:([e],[t])=>a.indexOf(e)-a.indexOf(t)}}},59433:(e,a,t)=>{t.r(a),t.d(a,{default:()=>k});var n=t(66252),l=t(2262),r=t(3577),S=t(64357),o=t(70131),i=t(49152),_=t(31303),u=t(4964),s=t(29922),I=t(51131),D=t(53024),d=t(58904),T=t(51382),N=t(82221),m=t(50930),c=t(78642),R=t(96265);function C(e){return e[0].map(((a,t)=>e.map((e=>e[t]))))}const p=e=>((0,n.dD)("data-v-36fbd23d"),e=e(),(0,n.Cn)(),e),E={class:"wrap"},M={class:"container"},A={class:"switch"},P={class:"name"},L=p((()=>(0,n._)("p",null,null,-1))),g=["checked"],O=p((()=>(0,n._)("label",{for:"compact-mode",class:"label"},null,-1))),B=p((()=>(0,n._)("th",null,null,-1))),h=["onChange"],y=["selected","disabled"],v=["onClick"],G=p((()=>(0,n._)("img",{src:S,class:"open-info",alt:"info icon"},null,-1))),U=[G],H={class:"modal-module"},w={class:"chars"},b={class:"output"},f=(0,n.aZ)({__name:"PlanetsCalc",setup(e){const{SP2ShipmentsBoostPct:a}=d["default"],t={CreditStorage:"CreditStorageModifier",FuelStorage:"FuelStorageModifier",CreditsPerHour:"CreditIncomeModifier",FuelPerHour:"FuelIncomeModifier",ShipmentsCRValuePerDay:"CreditShipmentModifier"},S={TotalShipmentCRPerDay:"ShipmentsCRValuePerDay",Cost:"Cost",ConstructionTime:"TimeToUpgrade"},p=["XPAward","Cost","TimeToUpgrade","TimeToUpgradeParallel","RSLevelReq"],G=["CrystalsWeight","Name"],f=Object.keys(u.Z).filter((e=>![...p,...G].includes(e))),x=Object.values(D.Z.NumMoons).reduce(((e,a,t)=>(a&&(Array.isArray(a)?a.forEach(((a,n)=>e[D.Z.PlanetTypes[t][n]]=a)):e[D.Z.PlanetTypes[t]]=a),e)),{}),{t:Y}=(0,o.QT)(),k=(0,l.iH)([]),F=(0,l.iH)({actually:{},plan:{}}),q=(0,l.iH)(!1),W=(0,l.qj)({size:m.z.SMALL,title:"name",data:{planet:{},get key(){return this.planet.Name}}}),Z=(0,n.Fl)((()=>Object.values(k.value)));let j;function V(e){j=e,k.value=e.provideGetterElements(z)}function Q(e){W.title=Y(e.TID),W.data.planet=e,q.value=!0}function X(e,a){return j.outputClasses(e,W.data.key,a)}function J(e,a){let t=0;const n={};for(const l of f)a.total.intermediate[l]={actually:0,plan:0,sum:0};return function(l,r){const S=i.Z.state.userSettings.calcDayCreditLimit/24;let o=0;for(const e of f)a.total.intermediate[e].actually+=a.actually[l]?.[e]||0,a.total.intermediate[e].plan+=a.plan[l]?.[e]||0,a.total.intermediate[e].sum=a.total.intermediate[e].actually+a.total.intermediate[e].plan;if(e[l].RSLevelReq){const n=e[l].RSLevelReq[r.plan[l]]||0;t=a.total.result.RSLevelReq=t<n?n:t}if(e[l].TimeToUpgrade){const t=e[l],i=r.actually[l],_=r.plan[l],u=[];for(let e=0;e<_-i;e++){const a=i+e,n=t.TimeToUpgrade[a]/3600;for(let e=0;e<n;e++)u.push(t.Cost[a]/(t.TimeToUpgrade[a]/3600))}u.length?n[l]=u:delete n[l],Object.keys(n).length&&(C(Object.values(n)).forEach((e=>{const a=e.reduce(((e,a)=>e+a||0),0);o+=Math.ceil(a/S)})),a.total.result.TimeToUpgradeParallel=3600*o)}}}function z(...[e,n,l]){let r=0;const o=(0,c.Z)(u.Z,{filter:([,e])=>Array.isArray(e)}),_=(0,c.Z)(s.Z,{...(0,R.Z)("planets.yellowstar"),map:([n,r])=>(l[n]=(0,c.Z)(o,{map:([e,n])=>{const l=r.MaxUpgradeLevel,S=i.Z.state.userSettings.planetsCalcSp2&&"ShipmentsCRValuePerDay"==e?a/100:0;let o=n.map((a=>a*(e in t?r[t[e]]/100:1+S)));return"ShipmentsCRValuePerDay"==e&&r.Name in x&&(o=n.map((e=>e*(r[t["ShipmentsCRValuePerDay"]]/100+S)*(x[r.Name]+1)))),o.length<l&&o.push(...Array.from({length:l-o.length},(()=>o[o.length-1]))),[e,o]}}),e[n]=r.TID,[n,r])}),D=(0,c.Z)(I.Z.TradingStation,{map:([e,a])=>(Array.isArray(a)&&a.length>r&&(r=a.length),[e in S?S[e]:e,a])});D.MaxUpgradeLevel=r;for(let a=0;D.MaxOnOwnSolarSystem>a;a++){const e={...D,Name:`${D.Name}_${a}`};_[e.Name]=e,l[e.Name]=n(e,r)}return _}return i.Z.subscribe((e=>{e.type==_.Z.SWITCH_PLANETS_CALC_SP2&&j&&(V(j),j.forceReCalc()),e.type==_.Z.SET_CALC_DAY_CREDIT_LIMIT&&j.forceReCalc()})),(e,a)=>{const t=(0,n.Q2)("t");return(0,n.wg)(),(0,n.iD)("div",E,[(0,n._)("div",M,[(0,n.Wm)(T.Z,{input:F.value,"onUpdate:input":a[0]||(a[0]=e=>F.value=e),"stack-chars":p,"calc-total":J,"local-storage-key":"planetsCalc","title-key":"PLANETS_CALC",onSetup:V},null,8,["input"]),(0,n._)("div",A,[(0,n._)("div",null,[(0,n.wy)((0,n._)("p",P,null,512),[[t,"TID_STARTER_PACK_2"]]),L]),(0,n._)("input",{id:"compact-mode",class:"checkbox",type:"checkbox",checked:e.$store.state.userSettings.planetsCalcSp2,onChange:a[1]||(a[1]=a=>e.$store.commit((0,l.SU)(_.Z).SWITCH_PLANETS_CALC_SP2))},null,40,g),O]),(0,n.Wm)(N.Z,{data:{TID:"INPUT_VALUES",Name:"Input",TID2:Z.value.map((e=>e.TID))},"table-opts":{lvlColKey:"№",mergeCells:!1}},{"table-head":(0,n.w5)((()=>[(0,n.wy)((0,n._)("th",null,null,512),[[t,"CURRENT_LVL"]]),(0,n.wy)((0,n._)("th",null,null,512),[[t,"PLAN_LVL"]]),B])),"table-body":(0,n.w5)((({row:e})=>[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(F.value,((a,t)=>((0,n.wg)(),(0,n.iD)("td",{key:t},[(0,n._)("select",{class:"select",onChange:a=>(0,l.SU)(j).onChangeLvl(t,Z.value[e].Name,a.target.value)},[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(Z.value[e].MaxUpgradeLevel+1,((a,S)=>((0,n.wg)(),(0,n.iD)("option",{key:t+a,selected:(0,l.SU)(j).isSelected(t,Z.value[e].Name,S),disabled:(0,l.SU)(j).isDisabled(t,Z.value[e].Name,S)},(0,r.zw)(S),9,y)))),128))],40,h)])))),128)),(0,n._)("td",null,[(0,n._)("div",{onClick:()=>Q(Z.value[e])},U,8,v)])])),_:1},8,["data"])]),(0,n.Wm)(m.Z,(0,n.dG)({open:q.value,"onUpdate:open":a[2]||(a[2]=e=>q.value=e)},W),{body:(0,n.w5)((()=>[(0,n._)("div",H,[(0,n._)("ul",w,[(0,n._)("li",b,[(0,n._)("b",null,(0,r.zw)(e.$t("TID_PLANET_LEVEL_DESCR")),1),(0,n._)("div",null,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(F.value,((e,a)=>((0,n.wg)(),(0,n.iD)("span",{key:a,class:(0,r.C_)(X(a,null))},(0,r.zw)(F.value[a]?.[W.data.key]),3)))),128))])]),((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(Object.keys((0,l.SU)(j).output.plan[W.data.key]||{}).filter((e=>!G.includes(e))),(e=>((0,n.wg)(),(0,n.iD)("li",{key:e,class:"calc.output"},[(0,n._)("b",null,(0,r.zw)((0,l.SU)(j).format.key(e)),1),(0,n._)("div",null,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(F.value,((a,t)=>((0,n.wg)(),(0,n.iD)("span",{key:t,class:(0,r.C_)(X(t,e))},(0,r.zw)((0,l.SU)(j).format.value(e,Math.trunc((0,l.SU)(j).output[t]?.[W.data.key]?.[e])||void 0)),3)))),128))])])))),128))])])])),_:1},16,["open"])])}}});var x=t(83744);const Y=(0,x.Z)(f,[["__scopeId","data-v-36fbd23d"]]),k=Y},4964:(e,a,t)=>{t.d(a,{Z:()=>n});const n={Cost:[0,50,200,400,800,1500,2e3,3e3,4e3,5e3,6e3,8e3,16e3,4e4,6e4,8e4,15e4,2e5,25e4,3e5,35e4,4e5,5e5,8e5,1e6,12e5,15e5,17e5,175e4,2e6,225e4,25e5,275e4,3e6,35e5,4e6,45e5,5e6,55e5,6e6,65e5,7e6,75e5,8e6,9e6,1e7,11e6,12e6,13e6,14e6,15e6,15e6,15e6,15e6,15e6,15e6,15e6,15e6,15e6,15e6,15e6,15e6,15e6,15e6],CreditStorage:[1e3,1400,1800,3e3,4e3,5e3,6e3,7e3,8e3,1e4,12e3,14e3,16e3,18e3,2e4,24e3,3e4,4e4,5e4,6e4,8e4,1e5,12e4,15e4,18e4,21e4,24e4,27e4,3e5,33e4,36e4,4e5,45e4,5e5,55e4,6e5,65e4,7e5,75e4,8e5,85e4,9e5,95e4,1e6,105e4,11e5,115e4,12e5,125e4,13e5,135e4,14e5,145e4,15e5,155e4,16e5,165e4,17e5,175e4,18e5,185e4,19e5,195e4,2e6],FuelStorage:[200,300,400,500,600,800,1e3,1500,2300,3e3,3900,4500,6e3,7200,8500,9900,10800,11300,11500,11700,11700,11700,11700,11700,11700,12600,13100,13500,14e3,14400,15500,16600,17300,18e3,19800,20500,21200,22e3,22700,23400,24100,24800,25600,26300,27e3,27700,28800,30800,32800,34700,36700,38700,40700,42700,44600,46600,48600,50600,52600,54500,56500,58500,60500,63500],XPAward:[0,10,20,30,40,50,60,70,80,90,100,150,200,250,300,350,400,450,500,550,600,650,700,750,800,850,900,950,1e3,1050,1100,1150,1200,1250,1300,1350,1400,1450,1500,1550,1550,1550,1550,1550,1550,1550,1550,1550,1550,1550,1550,1550,1550,1550,1550,1550,1550,1550,1550,1550,1550,1550,1550,1550],CreditsPerHour:[1,2,3,4,5,6,7,8,9,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,68,70,72,74,76,78,80,82,84,86,88,90,92,94,96,98,100,102,104,106,108,110,112,114,116,118],FuelPerHour:[10,10,10,10,10,11,11,12,12,13,14,16,18,20,23,26,29,32,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36],ShipmentsCRValuePerDay:[200,400,600,1e3,1400,1800,2e3,2200,2400,2600,2800,3e3,3050,3100,3150,3200,3250,3300,3350,3400,3450,3500,3550,3600,3700,3800,3900,4e3,4100,4200,4300,4400,4500,4600,5e3,5500,6e3,6500,7e3,7500,8e3,8500,9e3,9500,1e4,10100,10200,10300,10400,10500,10600,10700,10800,10900,11e3,11100,11200,11300,11400,11500,11600,11700,11800,12e3],TimeToUpgrade:[3,3,20,40,60,120,300,600,1200,1800,2400,3600,28800,86400,172800,302400,345600,388800,432e3,475200,518400,561600,604800,648e3,691200,734400,777600,820800,864e3,907200,950400,993600,1036800,108e4,1123200,1166400,1209600,1209600,1209600,1209600,1382400,1382400,1382400,1382400,1382400,1555200,1555200,1555200,1555200,1555200,1728e3,1728e3,1728e3,1728e3,1728e3,1728e3,1728e3,1728e3,1728e3,1728e3,1728e3,1728e3,1728e3,1728e3],CrystalsWeight:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],RSLevelReq:[null,null,null,null,2,2,3,3,3,3,3,3,3,4,4,4,4,4,4,5,5,5,5,5,6,6,6,6,6,7,7,7,7,7,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8],Name:"planet_levels",MaxShipments:[1,2,3,4,6,8,8,10,10,10,10,10,10,12,14,16,16,18,18,20,20,20,20,20,20,20,22,24,26,28,30,32,33,34,35,36,37,38,39,40,41,42,44,46,50,55,60,65,70,75,80,85,90,95,100,105,110,115,120,125,130,135,140,140]}},51131:(e,a,t)=>{t.d(a,{Z:()=>n});const n={Shipyard:{Name:"Shipyard",AllowBuildOnYS:1,MoveHydrogenCostPerSector:100,TID:"TID_BUILDING_SHIPYARD",TID_Description:"TID_BUILDING_SHIPYARD_DESCR",TID_INFO_SCREEN:"TID_BUILDING_SHIPYARD_DESCR",TID_UPGRADE:"TID_BLD_SHIPYARD_UPGRADE",TID_CUSTOM_TUT_SELECT:"TID_TUT_SELECT_SHIPYARD",ConceptImage:"portrait_shipyard",PrefabModel:"station_Shipyard",PrefabModel_BuildMenu:"station_Shipyard_ui",RequiredPlanetLevel:1,UISortOrder:10,Cost:[800,4e3,1e4,2e4,8e4,2e5,5e5,1e6,2e6,5e6],RequiresEmptySector:0,MaxOnOwnSolarSystem:1,MaxPerSector:1,ShipyardCapacity:[4,5,7,8,10,12,13,14,15,16],BuildNotifMode:0,ShowInStarLinks:1,ConstructionTime:[5,60,1800,28800,86400,172800,259200,345600,432e3,432e3]},ShortRangeScanner:{Name:"ShortRangeScanner",AllowBuildOnYS:1,CanCancelBuild:1,CancelBuildRefundPct:90,SeparateBuildingPerLevel:1,AllowAdditionalBuildingsAtMaxLevel:1,MoveHydrogenCostPerSector:50,AllowMoveInSameSectorOnly:1,TID:"TID_BUILDING_SHORT_RANGE_SCANNER",TID_Description:"TID_BUILDING_SHORT_RANGE_SCANNER_DESCR",TID_INFO_SCREEN:"TID_BUILDING_SHORT_RANGE_SCANNER_INFO",ConceptImage:"portrait_SpaceBuilding",PrefabModel:"station_ShortRangeScanner",PrefabModel_BuildMenu:"station_ShortRangeScanner_ui",PrefabModel_WithStarHarvester:"station_HydroScanner",RequiredPlanetLevel:3,UISortOrder:30,Cost:[500,2e3,2e4,4e4,8e4,15e4,3e5,6e5,1e6,2e6,3e6,4e6],SectorUnlockCost:[1500,2e3,2e4,4e4,8e4,15e4,3e5,6e5,1e6,2e6,3e6,4e6],SectorUnlockTime:[60,3600,86400,129600,172800,259200,345600,432e3,518400,604800,604800,604800],RequiresEmptySector:0,MaxPerSector:1,CanScanSectors:1,BuildNotifMode:2,ConstructionTime:[60,600,43200,86400,86400,86400,86400,86400,86400,86400,86400,86400]},RedStarScanner:{Name:"RedStarScanner",AllowBuildOnYS:1,MoveHydrogenCostPerSector:25,TID:"TID_BUILDING_REDSTAR_SCANNER",TID_Description:"TID_BUILDING_REDSTAR_SCANNER_DESCR",TID_INFO_SCREEN:"TID_BUILDING_REDSTAR_SCANNER_INFO",TID_UPGRADE:"TID_BLD_REDSTAR_UPGRADE",TID_CUSTOM_TUT_SELECT:"TID_TUT_SELECT_MISSION_BUILDING",ConceptImage:"portrait_JumpGate",PrefabModel:"station_RedStarScanner",PrefabModel_BuildMenu:"station_RedStarScanner_ui",RequiredPlanetLevel:4,UISortOrder:40,Cost:[1e3,5e3,2e4,6e4,1e5,2e5,6e5,2e6,4e6,8e6,17e6,32e6],RequiresEmptySector:0,MaxOnOwnSolarSystem:1,MaxPerSector:1,StarScannerType:0,StargateModel:"JumpGate",BuildNotifMode:1,ShowInStarLinks:1,ConstructionTime:[3,60,1800,86400,172800,259200,345600,432e3,518400,604800,864e3,864e3]},ResearchStation:{Name:"ResearchStation",AllowBuildOnYS:1,MoveHydrogenCostPerSector:25,TID:"TID_BUILDING_RESEARCH",TID_Description:"TID_BUILDING_RESEARCH_DESCR",TID_INFO_SCREEN:"TID_BUILDING_RESEARCH_INFO",TID_UPGRADE:"TID_BLD_RESEARCH_STATION_UPGRADE",TID_CUSTOM_TUT_SELECT:"TID_TUT_SELECT_RESEARCH_STATION",ConceptImage:"portrait_SpaceBuilding",PrefabModel:"station_Research",PrefabModel_BuildMenu:"station_Research_ui",RequiredPlanetLevel:5,UISortOrder:50,Cost:1e3,ResearchSlots:8,RequiresEmptySector:0,MaxOnOwnSolarSystem:1,MaxPerSector:1,BuildNotifMode:1,ShowInStarLinks:1,ConstructionTime:5},DiplomacyCenter:{Name:"DiplomacyCenter",AllowBuildOnYS:1,SeparateBuildingPerLevel:1,MoveHydrogenCostPerSector:1e3,TID:"TID_BUILDING_DIPLOMACY_CENTER",TID_Description:"TID_BUILDING_DIPLOMACY_CENTER_DESCR",TID_INFO_SCREEN:"TID_BUILDING_DIPLOMACY_CENTER_INFO",ConceptImage:"portrait_SpaceBuilding",PrefabModel:"station_Diplomacy",PrefabModel_BuildMenu:"station_Diplomacy_ui",RequiredPlanetLevel:7,UISortOrder:120,Cost:[25e3,5e5,4e6],RequiresEmptySector:0,MaxOnOwnSolarSystem:3,MaxPerSector:1,StargateModel:"JumpGate",BuildNotifMode:3,ShowInStarLinks:1,ConstructionTime:[28800,432e3,864e3]},TradingStation:{Name:"TradingStation",AllowBuildOnYS:1,CanBeRenamed:1,MoveHydrogenCostPerSector:500,TID:"TID_BUILDING_TRADINGSTATION",TID_Description:"TID_BUILDING_TRADINGSTATION_DESCR",TID_INFO_SCREEN:"TID_BUILDING_TRADINGSTATION_DESCR",ConceptImage:"portrait_SpaceBuilding",PrefabModel:"station_trade",PrefabModel_BuildMenu:"station_trade_ui",RequiredPlanetLevel:13,UISortOrder:140,Cost:[2e3,5e3,5e3,5e3,5e3,5e3,5e3,5e3,5e3,5e3],TotalShipmentCRPerDay:[1500,3e3,4500,6e3,8e3,1e4,12e3,15e3,18e3,25e3],MaxShipments:[15,20,25,30,35,40,50,60,70,80],RequiresEmptySector:1,CenterPlacement:1,RequiresSectorDistance:1,MaxOnOwnSolarSystem:3,MaxPerSector:1,BuildNotifMode:1,ShowInStarLinks:1,RSLevelReq:[null,5,6,7,7,8,8,9,9,10],ConstructionTime:[86400,172800,345600,432e3,518400,604800,691200,777600,864e3,950400]},WarpLaneHub:{Name:"WarpLaneHub",AllowBuildOnYS:1,SeparateBuildingPerLevel:1,AllowAdditionalBuildingsAtMaxLevel:1,BuyInPairs:1,MoveHydrogenCostPerSector:50,TID:"TID_BUILDING_WARPLANE_HUB",TID_Description:"TID_BUILDING_WARPLANE_HUB_DESCR",TID_INFO_SCREEN:"TID_BUILDING_WARPLANE_HUB_INFO",ConceptImage:"portrait_WarpLane",PrefabModel:"warpLaneHub",PrefabModel_BuildMenu:"warpLaneHub_ui",RequiredPlanetLevel:12,UISortOrder:130,Cost:[1e4,1e4,15e3,15e3,2e4,2e4,25e3,25e3,5e4,5e4,1e5,1e5,2e5,2e5,3e5,3e5,4e5,4e5,5e5,5e5,6e5,6e5],RSLevelReq:[5,5,5,5,6,6,6,6,7,7,7,7,7,7,8,8,8,8,9,9,10,10],RequiresEmptySector:0,MaxOnOwnSolarSystem:24,MaxPerSector:8,IsWarpLane:1,OverrideMinAsteroidDistSquared:1e6,BuildNotifMode:1,ConstructionTime:[43200,43200,86400,86400,172800,172800,259200,259200,345600,345600,432e3,432e3,518400,518400,604800,604800,691200,691200,777600,777600,864e3,864e3]},Stargate:{Name:"Stargate",AllowBuildOnYS:0,TID:"TID_BUILDING_STARGATE",TID_Description:"TID_BUILDING_STARGATE_DESCR",TID_INFO_SCREEN:"TID_BUILDING_STARGATE_DESCR",ConceptImage:"portrait_JumpGate",IsStargate:1,RequiresEmptySector:0,OverrideMinAsteroidDistSquared:1e6,StargateModel:"JumpGate02"},OrangeStarScanner:{Name:"OrangeStarScanner",AllowBuildOnYS:0,MoveHydrogenCostPerSector:1e3,TID:"TID_BUILDING_ORANGESTAR_SCANNER",TID_Description:"TID_BUILDING_ORANGESTAR_SCANNER_DESCR",TID_INFO_SCREEN:"TID_BUILDING_ORANGESTAR_SCANNER_INFO",ConceptImage:"portrait_JumpGate",Model:"redStarScanner",RequiredPlanetLevel:5,UISortOrder:50,Cost:4e4,RequiresEmptySector:1,MaxOnOwnSolarSystem:1,MaxPerSector:1,StarScannerType:1,StargateModel:"JumpGate",ConstructionTime:86400},WhiteStarScanner:{Name:"WhiteStarScanner",AllowBuildOnYS:1,MoveHydrogenCostPerSector:100,TID:"TID_BLD_WHITESTAR_SCANNER",TID_Description:"TID_BLD_WHITESTAR_SCANNER_DESCR",TID_INFO_SCREEN:"TID_BLD_WHITESTAR_SCANNER_DESCR",TID_UPGRADE:"TID_BLD_REDSTAR_UPGRADE",ConceptImage:"portrait_JumpGate",PrefabModel:"station_WhiteStarScanner",PrefabModel_BuildMenu:"station_WhiteStarScanner_ui",RequiredPlanetLevel:10,UISortOrder:92,Cost:25e3,RequiresEmptySector:1,MaxOnOwnSolarSystem:1,MaxPerSector:1,StargateModel:"JumpGateWhiteStar",BuildNotifMode:1,ShowInStarLinks:1,ConstructionTime:1},TimeModulator:{Name:"TimeModulator",AllowBuildOnYS:0,MoveHydrogenCostPerSector:1e3,AllowMoveInSameSectorOnly:1,TID:"TID_BLD_STAR_HARVESTER",TID_Description:"TID_BLD_STAR_HARVESTER_BUILD_DESCR",TID_INFO_SCREEN:"TID_BLD_STAR_HARVESTER_DESCR",ConceptImage:"portrait_SpaceBuilding",PrefabModel:"timeModulator",PrefabModel_BuildMenu:"timeModulator_ui",RequiredPlanetLevel:6,UISortOrder:71,Cost:[1e3,4e3,1e4,3e4,1e5,2e5,4e5,6e5,8e5,1e6,2e6,3e6,4e6,5e6,6e6,7e6],RequiresStarSector:1,MaxOnOwnSolarSystem:1,MaxPerSector:1,BuildNotifMode:1,ShowInStarLinks:1,ConstructionTime:[5,3600,28800,172800,345600,432e3,518400,604800,691200,777600,864e3,864e3,864e3,864e3,864e3,864e3]},BlueStarScanner:{Name:"BlueStarScanner",AllowBuildOnYS:1,MoveHydrogenCostPerSector:100,TID:"TID_BUILDING_BLUESTAR_SCANNER",TID_Description:"TID_BUILDING_BLUESTAR_SCANNER_DESCR",TID_INFO_SCREEN:"TID_BUILDING_BLUESTAR_SCANNER_INFO",TID_UPGRADE:"TID_BUILDING_BLUESTAR_SCANNER_INFO",ConceptImage:"portrait_Anomaly",PrefabModel:"station_BlueStarScanner",PrefabModel_BuildMenu:"station_BlueStarScanner_ui",RequiredPlanetLevel:5,UISortOrder:90,Cost:5e3,RequiresEmptySector:0,MaxOnOwnSolarSystem:1,MaxPerSector:1,StarScannerType:1,StargateModel:"JumpGate",BuildNotifMode:1,ShowInStarLinks:1,ConstructionTime:3},ShipmentRelay:{Name:"ShipmentRelay",AllowBuildOnYS:1,MoveHydrogenCostPerSector:100,TID:"TID_BLD_RELAY",TID_Description:"TID_BLD_RELAY_DESCR",TID_INFO_SCREEN:"TID_BLD_RELAY_INFO",ConceptImage:"portrait_SpaceBuilding",PrefabModel:"station_ShipmentRelay",PrefabModel_BuildMenu:"station_ShipmentRelay_ui",RequiredPlanetLevel:4,UISortOrder:55,Cost:[1500,5e3,1e4,2e4,3e4,4e4,5e4,6e4,7e4,8e4,1e5],MaxOnOwnSolarSystem:1,MaxPerSector:1,RelayBonusPct:[0,5,10,20,60,110,150,180,240,330,1100],HydroCostPerShipment:[5,10,20,40,60,80,100,120,140,160,200],BuildNotifMode:[0,1],ShowInStarLinks:1,RSLevelReq:[null,2,3,4,5,6,7,8,9,10,11],ConstructionTime:[3,28800,57600,86400,172800,259200,345600,432e3,518400,604800,604800]},QuantumStarGate:{Name:"QuantumStarGate",MoveHydrogenCostPerSector:1e3,TID:"TID_BUILDING_QUANTUMSTAR_GATE",TID_Description:"TID_BUILDING_QUANTUMSTAR_GATE_DESCR",TID_INFO_SCREEN:"TID_BUILDING_QUANTUMSTAR_GATE_INFO",TID_UPGRADE:"TID_BUILDING_QUANTUMSTAR_GATE_INFO",ConceptImage:"portrait_Anomaly",PrefabModel:"station_DarkStarScanner",PrefabModel_BuildMenu:"station_DarkStarScanner_ui",RequiredPlanetLevel:0,UISortOrder:200,Cost:12e6,MaxOnOwnSolarSystem:1,MaxPerSector:1,StarScannerType:2,StargateModel:"JumpGate_DarkStar",ConstructionTime:86400},QuantumScanner:{Name:"QuantumScanner",MoveHydrogenCostPerSector:500,AllowMoveInSameSectorOnly:1,TID:"TID_BUILDING_QUANTUM_STAR_SCANNER",TID_Description:"TID_BUILDING_QUANTUM_STAR_SCANNER_DESCR",TID_INFO_SCREEN:"TID_BUILDING_QUANTUM_STAR_SCANNER_DESCR",ConceptImage:"portrait_SpaceBuilding",PrefabModel:"station_ShortRangeScanner",PrefabModel_BuildMenu:"station_ShortRangeScanner_ui",Cost:1e6,RequiresEmptySector:0,MaxOnOwnSolarSystem:1,MaxPerSector:1,BuildNotifMode:2,QSExploreCost:1e3,DestroyerTarget:1,MaxHealth:1e3,ConstructionTime:3},MineralRefinery:{Name:"MineralRefinery",AllowBuildOnYS:0,MoveHydrogenCostPerSector:5e3,AllowMoveInSameSectorOnly:1,TID:"TID_BUILDING_MINERAL_REFINERY",TID_Description:"TID_BUILDING_MINERAL_REFINERY_DESCR",TID_INFO_SCREEN:"TID_BUILDING_MINERAL_REFINERY_DESCR",TID_UPGRADE:"TID_BUILDING_MINERAL_REFINERY_DESCR",ConceptImage:"portrait_Anomaly",PrefabModel:"timeModulator",PrefabModel_BuildMenu:"timeModulator_ui",Cost:1e6,RequiresStarSector:1,MaxOnOwnSolarSystem:1,MaxPerSector:1,DestroyerTarget:1,MaxHealth:1e3,ConstructionTime:3},DO_NOT_USE:{Name:"DO_NOT_USE",SeparateBuildingPerLevel:1,MoveHydrogenCostPerSector:500,AllowMoveInSameSectorOnly:1,TID:"TID_BUILDING_HYDRO_SCANNER",TID_Description:"TID_BUILDING_HYDRO_SCANNER_DESCR",TID_INFO_SCREEN:"TID_BUILDING_HYDRO_SCANNER_INFO",ConceptImage:"portrait_SpaceBuilding",PrefabModel:"station_HydroScanner",PrefabModel_BuildMenu:"station_ShortRangeScanner_ui",RequiredPlanetLevel:3,UISortOrder:70,Cost:[12e4,18e4,25e4,5e5,1e6,2e6,4e6,6e6,8e6,1e6,16e6,2e7],MaxPerSector:1,BuildNotifMode:1,RequiresDoneSRS:1,GenAsteroids:[2,5],SimilarBuildingID:1,ConstructionTime:[28800,86400,172800,259200,345600,432e3,432e3,432e3,432e3,604800,604800,604800]},StarHarvester:{Name:"StarHarvester",AllowBuildOnYS:1,MoveHydrogenCostPerSector:50,AllowMoveInSameSectorOnly:1,TID:"TID_BLD_STAR_HARVESTER",TID_Description:"TID_BLD_STAR_HARVESTER_DESCR",TID_INFO_SCREEN:"TID_BLD_STAR_HARVESTER_DESCR",ConceptImage:"portrait_SpaceBuilding",PrefabModel:"timeModulator",PrefabModel_BuildMenu:"timeModulator_ui",RequiredPlanetLevel:10,UISortOrder:95,Cost:[7e4,9e4,14e4,19e4,55e4,15e5,21e5,4e6,8e6,16e6,32e6],RequiresStarSector:1,MaxOnOwnSolarSystem:1,MaxPerSector:1,BuildNotifMode:1,ShowInStarLinks:1,SHHydroPerDay:[1e3,1500,2500,5e3,6e3,8e3,1e4,12e3,14e3,18e3,44e3],ConstructionTime:[86400,86400,86400,172800,172800,259200,259200,259200,432e3,604800,864e3]}}},53024:(e,a,t)=>{t.d(a,{Z:()=>n});const n={Name:["Start","SL0_0","SL0_1","SL0_2","SL0_3","SL0_4","SL1_0","SL1_1","SL1_2","SL2_0","SL2_1","SL2_2","SL3_0","SL3_1","SL3_2","SL4_0","SL4_1","SL4_2","SL5_0","SL5_1","SL5_2","SL6_0","SL6_1","SL6_2","SL7_0","SL7_1","SL7_2","SL8_0","SL8_1","SL8_2","SL9_0","SL9_1","SL9_2","SL10_0","SL10_1","SL10_2"],MinScannerLevel:[0,0,0,0,0,0,1,1,1,2,2,2,3,3,3,4,4,4,5,5,5,6,6,6,7,7,7,8,8,8,9,9,9,10,10,10],Weight:[100,100,100,100,100,100,34,34,34,34,34,34,34,34,34,34,34,34,4,4,4,4,4,4,4,4,4,4,4,4,4,4,2,4,4,4],PlanetTypes:[["desert_lv1","lava_lv1"],"water_lv1",null,null,"terran_lv1",null,"gas_lv1",null,null,"terran_lv2",null,null,"lava_lv2",null,null,"water_lv2","gas_lv2",null,"desert_lv2",null,null,"lava_lv3",null,null,"desert_lv3","water_lv3",null,"terran_lv3",null,null,"ice_variation1",null,null,"ice_variation2",null,null],MinPlanetDistanceFromCenter:[2e3,0,null,null,0,null,250,null,null,500,null,null,1e3,null,null,1e3,1e3,null,1e3,null,null,1e3,null,null,1e3,1e3,null,1e3,null,null,1e3,null,null,1e3,null,null],MaxPlanetDistanceFromCenter:[2e3,200,null,null,200,null,1e3,null,null,1500,null,null,2e3,null,null,2e3,2e3,null,2e3,null,null,2e3,null,null,2e3,2e3,null,2e3,null,null,2e3,null,null,2e3,null,null],NumMoons:[[2,1],1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],MoonDistance:[800,1e3,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],MoonSize:[100,100,null,null,null,null,105,null,null,105,null,105,105,null,null,null,null,null,110,105,105,105,105,105,105,105,105,null,null,null,null,null,null,null,null,null],AsteroidsMin:[3,4,3,4,3,5,5,6,5,6,7,7,8,8,8,9,7,8,10,12,12,9,9,10,11,8,9,10,10,12,11,10,9,8,12,10],AsteroidsMax:[3,4,3,4,3,5,5,6,5,6,7,7,8,8,8,9,7,8,10,12,12,9,9,10,11,8,9,10,10,12,11,10,9,8,12,10],HydrogenPerDay:[600,500,450,300,350,300,300,250,300,350,300,300,400,400,400,400,400,400,350,350,350,400,400,400,400,400,400,500,500,600,700,800,800,1e3,1e3,1e3],AsteroidBeltAxis1Size:[1600,1600,1600,2500,1600,1600,1600,1600,1600,1600,1600,1600,1600,1600,1600,1600,1600,1600,1600,1600,1600,1600,1600,1600,1600,1600,1600,1600,1600,1600,1600,1600,1600,1600,1600,1600],AsteroidBeltAxis2Size:[2500,2500,2500,2500,2500,2500,2500,2500,2500,2500,2500,2500,2500,2500,2500,2500,2500,2500,2500,2500,2500,2500,2500,2500,2500,2500,2500,2500,2500,2500,2500,2500,2500,2500,2500,2500],CerbGroup:[null,{Name:"YS1",NumSentinels:1},{Name:"YS2",NumSentinels:2},{Name:"YS3",NumGuardians:1},{Name:"YS4",NumSentinels:3},{Name:"YS5",NumGuardians:2},{Name:"YS6",NumSentinels:1,NumGuardians:2},{Name:"YS7",NumSentinels:1,NumGuardians:1},{Name:"YS8",NumSentinels:4},{Name:"YS9",NumSentinels:3,NumGuardians:2},{Name:"YS_10",NumSentinels:6},{Name:"YS_11",NumSentinels:8},{Name:"YS_12",NumSentinels:1,NumGuardians:3},{Name:"YS_13",NumSentinels:1,NumGuardians:4},{Name:"YS_14",NumGuardians:7},{Name:"YS_10",NumSentinels:6},{Name:"YS_15",NumSentinels:2,NumGuardians:1},{Name:"YS_16",NumSentinels:5,NumGuardians:1},{Name:"YS_17",NumSentinels:1,NumColossus:1},{Name:"YS3",NumGuardians:1},{Name:"YS9",NumSentinels:3,NumGuardians:2},{Name:"YS_18",NumSentinels:4,NumGuardians:2},{Name:"YS_19",NumSentinels:5,NumGuardians:3},{Name:"YS_20",NumGuardians:3},{Name:"YS_21",NumSentinels:4,NumColossus:1},{Name:"YS_22",NumSentinels:5,NumColossus:1},{Name:"YS_23",NumSentinels:6,NumGuardians:5},{Name:"YS_24",NumSentinels:7,NumGuardians:4},{Name:"YS_25",NumSentinels:8,NumGuardians:6},{Name:"YS_26",NumSentinels:7,NumGuardians:3},{Name:"YS_27",NumSentinels:8,NumGuardians:2},{Name:"YS_28",NumSentinels:3,NumGuardians:2,NumColossus:1},{Name:"YS_29",NumColossus:2},{Name:"YS_18",NumSentinels:4,NumGuardians:2},{Name:"YS_30",NumSentinels:6,NumGuardians:1},{Name:"YS_31",NumSentinels:3,NumGuardians:2,NumColossus:2}],TutorialUse:[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],BSAnomaly:[0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],NumBases:[0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,1,1,0,1,0,0,0,1,0,0,1,2,1,0,1,0,0,2,0,0],BaseType:[null,null,null,null,null,null,null,{Name:"HomeSystem1",TID:"TID_CERB_STATION_HOME1",TID_Description:"TID_CERB_STATION_HOME_DESCR",ConceptImage:"portrait_CerberusStation",SpawnFleetIntervalSeconds:86400,ShipToSpawn:"CerberusGuardian",ShipLevel:0,MaxHP:15e3,MaxShield:15e3,DPS:100,AttackRange:1e3,Model:"CerberusStation_DrkNeb",WeaponFx:"Gun_Projectile01_Weak",ShieldRegenPerMinute:10,ShieldRegenTimeAfterDamage:3600,MaxShips:3,AwardXP:1e3},null,null,null,{Name:"HomeSystem1",TID:"TID_CERB_STATION_HOME1",TID_Description:"TID_CERB_STATION_HOME_DESCR",ConceptImage:"portrait_CerberusStation",SpawnFleetIntervalSeconds:86400,ShipToSpawn:"CerberusGuardian",ShipLevel:0,MaxHP:15e3,MaxShield:15e3,DPS:100,AttackRange:1e3,Model:"CerberusStation_DrkNeb",WeaponFx:"Gun_Projectile01_Weak",ShieldRegenPerMinute:10,ShieldRegenTimeAfterDamage:3600,MaxShips:3,AwardXP:1e3},null,null,null,null,{Name:"HomeSystem2",TID:"TID_CERB_STATION_HOME2",TID_Description:"TID_CERB_STATION_HOME_DESCR",ConceptImage:"portrait_CerberusStation",SpawnFleetIntervalSeconds:86400,ShipToSpawn:"CerberusGuardian",ShipLevel:0,MaxHP:5e4,MaxShield:5e4,DPS:140,AttackRange:1600,Model:"CerberusStation_DrkNeb_lv2",WeaponFx:"Gun_Projectile01",ShieldRegenPerMinute:14,ShieldRegenTimeAfterDamage:3600,MaxShips:5,AwardXP:3e3},{Name:"HomeSystem2",TID:"TID_CERB_STATION_HOME2",TID_Description:"TID_CERB_STATION_HOME_DESCR",ConceptImage:"portrait_CerberusStation",SpawnFleetIntervalSeconds:86400,ShipToSpawn:"CerberusGuardian",ShipLevel:0,MaxHP:5e4,MaxShield:5e4,DPS:140,AttackRange:1600,Model:"CerberusStation_DrkNeb_lv2",WeaponFx:"Gun_Projectile01",ShieldRegenPerMinute:14,ShieldRegenTimeAfterDamage:3600,MaxShips:5,AwardXP:3e3},null,{Name:"HomeSystem3",TID:"TID_CERB_STATION_HOME3",TID_Description:"TID_CERB_STATION_HOME_DESCR",ConceptImage:"portrait_CerberusStation",SpawnFleetIntervalSeconds:86400,ShipToSpawn:"CerberusGuardian",ShipLevel:0,MaxHP:9e4,MaxShield:9e4,DPS:200,AttackRange:2400,Model:"CerberusStation_DrkNeb_lv3",WeaponFx:"Gun_Projectile01_Strong",ShieldRegenPerMinute:20,ShieldRegenTimeAfterDamage:3600,MaxShips:7,AwardXP:5e3},null,null,null,{Name:"HomeSystem3",TID:"TID_CERB_STATION_HOME3",TID_Description:"TID_CERB_STATION_HOME_DESCR",ConceptImage:"portrait_CerberusStation",SpawnFleetIntervalSeconds:86400,ShipToSpawn:"CerberusGuardian",ShipLevel:0,MaxHP:9e4,MaxShield:9e4,DPS:200,AttackRange:2400,Model:"CerberusStation_DrkNeb_lv3",WeaponFx:"Gun_Projectile01_Strong",ShieldRegenPerMinute:20,ShieldRegenTimeAfterDamage:3600,MaxShips:7,AwardXP:5e3},null,null,{Name:"HomeSystem3",TID:"TID_CERB_STATION_HOME3",TID_Description:"TID_CERB_STATION_HOME_DESCR",ConceptImage:"portrait_CerberusStation",SpawnFleetIntervalSeconds:86400,ShipToSpawn:"CerberusGuardian",ShipLevel:0,MaxHP:9e4,MaxShield:9e4,DPS:200,AttackRange:2400,Model:"CerberusStation_DrkNeb_lv3",WeaponFx:"Gun_Projectile01_Strong",ShieldRegenPerMinute:20,ShieldRegenTimeAfterDamage:3600,MaxShips:7,AwardXP:5e3},{Name:"HomeSystem3",TID:"TID_CERB_STATION_HOME3",TID_Description:"TID_CERB_STATION_HOME_DESCR",ConceptImage:"portrait_CerberusStation",SpawnFleetIntervalSeconds:86400,ShipToSpawn:"CerberusGuardian",ShipLevel:0,MaxHP:9e4,MaxShield:9e4,DPS:200,AttackRange:2400,Model:"CerberusStation_DrkNeb_lv3",WeaponFx:"Gun_Projectile01_Strong",ShieldRegenPerMinute:20,ShieldRegenTimeAfterDamage:3600,MaxShips:7,AwardXP:5e3},{Name:"HomeSystem3",TID:"TID_CERB_STATION_HOME3",TID_Description:"TID_CERB_STATION_HOME_DESCR",ConceptImage:"portrait_CerberusStation",SpawnFleetIntervalSeconds:86400,ShipToSpawn:"CerberusGuardian",ShipLevel:0,MaxHP:9e4,MaxShield:9e4,DPS:200,AttackRange:2400,Model:"CerberusStation_DrkNeb_lv3",WeaponFx:"Gun_Projectile01_Strong",ShieldRegenPerMinute:20,ShieldRegenTimeAfterDamage:3600,MaxShips:7,AwardXP:5e3},null,{Name:"HomeSystem3",TID:"TID_CERB_STATION_HOME3",TID_Description:"TID_CERB_STATION_HOME_DESCR",ConceptImage:"portrait_CerberusStation",SpawnFleetIntervalSeconds:86400,ShipToSpawn:"CerberusGuardian",ShipLevel:0,MaxHP:9e4,MaxShield:9e4,DPS:200,AttackRange:2400,Model:"CerberusStation_DrkNeb_lv3",WeaponFx:"Gun_Projectile01_Strong",ShieldRegenPerMinute:20,ShieldRegenTimeAfterDamage:3600,MaxShips:7,AwardXP:5e3},null,null,{Name:"HomeSystem3",TID:"TID_CERB_STATION_HOME3",TID_Description:"TID_CERB_STATION_HOME_DESCR",ConceptImage:"portrait_CerberusStation",SpawnFleetIntervalSeconds:86400,ShipToSpawn:"CerberusGuardian",ShipLevel:0,MaxHP:9e4,MaxShield:9e4,DPS:200,AttackRange:2400,Model:"CerberusStation_DrkNeb_lv3",WeaponFx:"Gun_Projectile01_Strong",ShieldRegenPerMinute:20,ShieldRegenTimeAfterDamage:3600,MaxShips:7,AwardXP:5e3},null,null]}}}]);