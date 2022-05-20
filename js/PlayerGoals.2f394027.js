"use strict";(self["webpackChunkhades_space"]=self["webpackChunkhades_space"]||[]).push([[636],{7786:(e,l,a)=>{a.d(l,{Z:()=>o});var r=a(6252),n=a(3577);const T={class:"container"},i={class:"list"},_=["href"];function D(e,l,a,D,t,u){const I=(0,r.up)("v-data"),R=(0,r.Q2)("t");return(0,r.wg)(),(0,r.iD)("div",T,[Object.keys(a.args.data).length>1?((0,r.wg)(),(0,r.iD)(r.HY,{key:0},[(0,r._)("h2",null,(0,n.zw)(e.$t("CONTENT")),1),(0,r._)("div",i,[(0,r._)("ol",null,[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(a.args.data,(({Name:e,TID:l})=>((0,r.wg)(),(0,r.iD)("li",{key:e},[(0,r.wy)((0,r._)("a",{href:`#${e}`},null,8,_),[[R,l]])])))),128))])])],64)):(0,r.kq)("",!0),((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(a.args.data,((e,l)=>((0,r.wg)(),(0,r.j4)(I,{key:l,data:e,"table-opts":a.args.tableOpts,"icon-dir":a.args.iconDir},null,8,["data","table-opts","icon-dir"])))),128))])}var t=a(428);const u={components:{VData:t.Z},props:{args:{type:Object,default:()=>({}),required:!0}}};var I=a(3744);const R=(0,I.Z)(u,[["render",D],["__scopeId","data-v-46131bcd"]]),o=R},7346:(e,l,a)=>{a.d(l,{Z:()=>E});var r=a(6252),n=a(3577);const T={class:"portrait-container"},i=["src","alt"],_={class:"topic"};function D(e,l,a,D,t,u){const I=(0,r.up)("Head"),R=(0,r.up)("v-content");return(0,r.wg)(),(0,r.iD)("div",null,[(0,r.Wm)(I,null,{default:(0,r.w5)((()=>[(0,r._)("title",null,(0,n.zw)(t.title),1)])),_:1}),(0,r._)("div",T,[a.portrait?((0,r.wg)(),(0,r.iD)("img",{key:0,class:"portrait",src:a.portrait.src,alt:a.portrait.alt},null,8,i)):(0,r.kq)("",!0),(0,r._)("h1",_,(0,n.zw)(t.title),1)]),(0,r.Wm)(R,{args:a.contentArgs},null,8,["args"])])}var t=a(1232),u=a(7786);const I={components:{Head:t.Fb,VContent:u.Z},props:{contentArgs:{type:Object,requested:!0,default:()=>({})},titleLocKey:{type:String,requested:!0,default:null},portrait:{type:Object,requested:!1,default:null,validator:e=>["src","alt"].every((l=>l in e))}},data(){return{title:this.$t(this.titleLocKey)}}};var R=a(3744);const o=(0,R.Z)(I,[["render",D],["__scopeId","data-v-5d8d711a"]]),E=o},5724:(e,l,a)=>{a.r(l),a.d(l,{default:()=>s});var r=a(6252);function n(e,l,a,n,T,i){const _=(0,r.up)("Page");return(0,r.wg)(),(0,r.j4)(_,{"content-args":{data:e.data},"title-loc-key":"TID_EMPIRE_OBJECTIVES"},null,8,["content-args"])}var T=a(7346),i=a(1334);const _={TUT_ExpandSector:{Name:"TUT_ExpandSector",TID:"TID_TUT_REVEAL_SECTOR",TID_Description:"TID_TUT_REVEAL_SECTOR_INFO",TutorialIdx:2,GoalType:"Tut_ExpandToNewSector",TimeLimitHr:0,CRRewardPerDay:3500,FuelRewardPerDay:100},TUT_DoShipments:{Name:"TUT_DoShipments",TID:"TID_OBJ_DELIVER_SHIPMENTS",TID_Description:"TID_OBJ_DELIVER_SHIPMENTS_DESCR",TutorialIdx:1,GoalType:"Tut_DoShipments",TimeLimitHr:0,GoalTarget:5,CRRewardPerDay:2e3,FuelRewardPerDay:100},TUT_DoRedStar:{Name:"TUT_DoRedStar",TID:"TID_OBJECTIVE_RS_TITLE",TID_Description:"TID_OBJECTIVE_RS_MSG",TutorialIdx:3,GoalType:"Tut_DoRedStar",TimeLimitHr:0,CRRewardPerDay:4e3,FuelRewardPerDay:250},TUT_DoResearch:{Name:"TUT_DoResearch",TID:"TID_OBJECTIVE_DO_RESEARCH",TID_Description:"TID_OBJECTIVE_DO_RESEARCH_DESCR",TutorialIdx:4,GoalType:"Tut_DoResearch",TimeLimitHr:0,CRRewardPerDay:1500,FuelRewardPerDay:100},TUT_InstallModule:{Name:"TUT_InstallModule",TID:"TID_OBJECTIVE_DO_INSTALL_MODULE",TID_Description:"TID_OBJECTIVE_DO_INSTALL_MODULE_DESCR",TutorialIdx:5,GoalType:"Tut_DoInstallModule",TimeLimitHr:0,GoalTarget:2,IntParam:0,CRRewardPerDay:2500,FuelRewardPerDay:100},PT_UpgradeShipyard:{Name:"PT_UpgradeShipyard",TID:"TID_TUT_UPGRADE_SHIPYARD",TID_Description:"TID_TUT_UPGRADE_SHIPYARD_DESCR",TID_HINT:"TID_OBJECTIVE_UPGRADE_SHIPYARD_HINT",Weight:1e4,GroupId:11,GoalType:"UpgradeBuilding",AppearsOnceOnly:1,GoalTarget:2,StringParam:"Shipyard",XPReward:40,CRRewardPerDay:2e3,FuelRewardPerDay:0,TimeLimit:[1,0]},PT_UpgradePlanets:{Name:"PT_UpgradePlanets",TID:"TID_PT_UPGRADE_PLANETS",TID_Description:"TID_PT_UPGRADE_PLANETS_DESCR",TID_HINT:"TID_PT_UPGRADE_PLANETS_HINT",Weight:10001,GroupId:20,GoalType:"UpgradeAllPlanets",AppearsOnceOnly:1,GoalTarget:5,IntParam:3,XPReward:40,CRRewardPerDay:1500,FuelRewardPerDay:100,TimeLimit:[3,0]},PT_EarnShipmentCredits:{Name:"PT_EarnShipmentCredits",TID:"TID_OBJ_EARN_CREDITS",TID_Description:"TID_OBJ_EARN_CREDITS_DESCR",TID_HINT:"TID_OBJ_SHIPMENTS_HINT",Weight:10002,GroupId:8,GoalType:"EarnShipmentCredits",AppearsOnceOnly:1,MaxPlayerLevel:9,GoalTarget:500,XPReward:40,CRRewardPerDay:1e3,FuelRewardPerDay:200,TimeLimit:[5,0]},PT_FillResearchStation:{Name:"PT_FillResearchStation",TID:"TID_PT_FILL_RESEARCH",TID_Description:"TID_PT_FILL_RESEARCH_DESCR",TID_HINT:"TID_PT_FILL_RESEARCH_HINT",Weight:10003,GroupId:12,GoalType:"FillResearchStation",AppearsOnceOnly:1,MaxPlayerLevel:9,XPReward:40,CRRewardPerDay:2e3,FuelRewardPerDay:200,TimeLimit:[10,0]},PT_InstallBattery:{Name:"PT_InstallBattery",TID:"TID_OBJ_INSTALL_MODULE",TID_Description:"TID_OBJ_INSTALL_MODULE_DESCR",TID_HINT:"TID_OBJ_INSTALL_MODULE_HINT",Weight:10005,GroupId:15,GoalType:"Tut_DoInstallModule",AppearsOnceOnly:1,MaxPlayerLevel:9,GoalTarget:1,IntParam:13,XPReward:40,CRRewardPerDay:1e3,FuelRewardPerDay:100,TimeLimit:[15,0]},EG_UpgradePlanet1:{Name:"EG_UpgradePlanet1",TID:"TID_OBJECTIVE_UPGRADE_PLANET",TID_Description:"TID_OBJECTIVE_UPGRADE_PLANET_DESCR",TID_HINT:"TID_OBJECTIVE_UPGRADE_PLANET_HINT",Weight:80,GroupId:20,GoalType:"UpgradePlanetToLevel",MaxPlayerLevel:5,GoalTarget:6,StringParam:[1,5],XPReward:20,CRRewardPerDay:2e3,FuelRewardPerDay:25,TimeLimit:[30,0]},EG_UpgradePlanet2:{Name:"EG_UpgradePlanet2",TID:"TID_OBJECTIVE_UPGRADE_PLANET",TID_Description:"TID_OBJECTIVE_UPGRADE_PLANET_DESCR",TID_HINT:"TID_OBJECTIVE_UPGRADE_PLANET_HINT",Weight:80,GroupId:20,GoalType:"UpgradePlanetToLevel",TimeLimitHr:1,GoalTarget:7,StringParam:[1,6],XPReward:40,CRRewardPerDay:2500,FuelRewardPerDay:50,PlayerLevel:[6,8]},EG_UpgradePlanet3:{Name:"EG_UpgradePlanet3",TID:"TID_OBJECTIVE_UPGRADE_PLANET",TID_Description:"TID_OBJECTIVE_UPGRADE_PLANET_DESCR",TID_HINT:"TID_OBJECTIVE_UPGRADE_PLANET_HINT",Weight:80,GroupId:20,GoalType:"UpgradePlanetToLevel",TimeLimitHr:4,GoalTarget:8,StringParam:[1,7],XPReward:80,CRRewardPerDay:3e3,FuelRewardPerDay:100,PlayerLevel:[9,11]},EG_UpgradePlanet4:{Name:"EG_UpgradePlanet4",TID:"TID_OBJECTIVE_UPGRADE_PLANET",TID_Description:"TID_OBJECTIVE_UPGRADE_PLANET_DESCR",TID_HINT:"TID_OBJECTIVE_UPGRADE_PLANET_HINT",Weight:80,GroupId:20,GoalType:"UpgradePlanetToLevel",TimeLimitHr:8,GoalTarget:9,StringParam:[1,8],XPReward:140,CRRewardPerDay:3500,FuelRewardPerDay:150,PlayerLevel:[12,15]},EG_UpgradeToRS2:{Name:"EG_UpgradeToRS2",TID:"TID_OBJECTIVE_UPGRADE_TO_RS",TID_Description:"TID_OBJECTIVE_UPGRADE_TO_RS_DESCR",TID_HINT:"TID_OBJECTIVE_UPGRADE_TO_RS_HINT",Weight:1e3,GroupId:1,GoalType:"UpgradeToRSLevel",MinInfluence:80,GoalTarget:2,XPReward:80,CRRewardPerDay:0,FuelRewardPerDay:0,CrystalReward:20,TimeLimit:[30,0]},EG_UpgradeToRS3:{Name:"EG_UpgradeToRS3",TID:"TID_OBJECTIVE_UPGRADE_TO_RS",TID_Description:"TID_OBJECTIVE_UPGRADE_TO_RS_DESCR",TID_HINT:"TID_OBJECTIVE_UPGRADE_TO_RS_HINT",Weight:1e3,GroupId:1,GoalType:"UpgradeToRSLevel",TimeLimitHr:4,MinInfluence:450,GoalTarget:3,XPReward:200,CRRewardPerDay:0,FuelRewardPerDay:0,CrystalReward:40},EG_GainInfluence1:{Name:"EG_GainInfluence1",TID:"TID_OBJECTIVE_GAIN_INFLUENCE",TID_Description:"TID_OBJECTIVE_GAIN_INFLUENCE_DESCR",TID_HINT:"TID_OBJECTIVE_GAIN_INFLUENCE_HINT",Weight:150,GroupId:2,GoalType:"GainInfluence",MaxPlayerLevel:15,MaxInfluence:99,GoalTarget:30,XPReward:40,CRRewardPerDay:2e3,FuelRewardPerDay:25,TimeLimit:[30,0]},EG_GainInfluence2:{Name:"EG_GainInfluence2",TID:"TID_OBJECTIVE_GAIN_INFLUENCE",TID_Description:"TID_OBJECTIVE_GAIN_INFLUENCE_DESCR",TID_HINT:"TID_OBJECTIVE_GAIN_INFLUENCE_HINT",Weight:150,GroupId:2,GoalType:"GainInfluence",TimeLimitMin:20,MaxPlayerLevel:15,GoalTarget:60,XPReward:80,CRRewardPerDay:2500,FuelRewardPerDay:50,Influence:[100,249]},EG_GainInfluence3:{Name:"EG_GainInfluence3",TID:"TID_OBJECTIVE_GAIN_INFLUENCE",TID_Description:"TID_OBJECTIVE_GAIN_INFLUENCE_DESCR",TID_HINT:"TID_OBJECTIVE_GAIN_INFLUENCE_HINT",Weight:150,GroupId:2,GoalType:"GainInfluence",TimeLimitMin:30,MinRSLevel:2,MaxPlayerLevel:15,GoalTarget:80,XPReward:150,CRRewardPerDay:3e3,FuelRewardPerDay:75,Influence:[250,399]},EG_GainInfluence4:{Name:"EG_GainInfluence4",TID:"TID_OBJECTIVE_GAIN_INFLUENCE",TID_Description:"TID_OBJECTIVE_GAIN_INFLUENCE_DESCR",TID_HINT:"TID_OBJECTIVE_GAIN_INFLUENCE_HINT",Weight:150,GroupId:2,GoalType:"GainInfluence",TimeLimitHr:1,MinRSLevel:2,MaxPlayerLevel:15,GoalTarget:120,XPReward:200,CRRewardPerDay:3500,FuelRewardPerDay:100,Influence:[400,500]},EG_GainInfluence5:{Name:"EG_GainInfluence5",TID:"TID_OBJECTIVE_GAIN_INFLUENCE",TID_Description:"TID_OBJECTIVE_GAIN_INFLUENCE_DESCR",TID_HINT:"TID_OBJECTIVE_GAIN_INFLUENCE_HINT",Weight:150,GroupId:2,GoalType:"GainInfluence",TimeLimitHr:2,MinRSLevel:2,MaxPlayerLevel:15,MinInfluence:501,GoalTarget:150,XPReward:300,CRRewardPerDay:4e3,FuelRewardPerDay:150},EG_JoinCorp:{Name:"EG_JoinCorp",TID:"TID_OBJ_JOIN_CORP",TID_Description:"TID_OBJ_JOIN_CORP_DESCR",TID_HINT:"TID_OBJ_JOIN_CORP_HINT",Weight:100,GroupId:3,GoalType:"JoinCorp",AppearsOnceOnly:1,TimeLimitHr:1,MinInfluence:250,XPReward:80,CRRewardPerDay:0,FuelRewardPerDay:0,CrystalReward:25,PlayerLevel:[8,30]},EG_Salvage1:{Name:"EG_Salvage1",TID:"TID_OBJ_SALVAGE_ARTIFACTS",TID_Description:"TID_OBJ_SALVAGE_ARTIFACTS_DESCR",TID_HINT:"TID_OBJ_SALVAGE_HINT",Weight:100,GroupId:4,GoalType:"SalvageArtifacts",TimeLimitHr:1,MaxRSLevel:1,MaxPlayerLevel:15,GoalTarget:3,StringParam:1,XPReward:80,CRRewardPerDay:1500,FuelRewardPerDay:100},EG_Salvage2:{Name:"EG_Salvage2",TID:"TID_OBJ_SALVAGE_ARTIFACTS",TID_Description:"TID_OBJ_SALVAGE_ARTIFACTS_DESCR",TID_HINT:"TID_OBJ_SALVAGE_HINT",Weight:100,GroupId:4,GoalType:"SalvageArtifacts",TimeLimitHr:2,MaxPlayerLevel:15,GoalTarget:5,StringParam:2,XPReward:200,CRRewardPerDay:4e3,FuelRewardPerDay:300,RSLevel:[2]},EG_Research1:{Name:"EG_Research1",TID:"TID_OBJ_RESEARCH_ARTIFACTS",TID_Description:"TID_OBJ_RESEARCH_ARTIFACTS_DESCR",TID_HINT:"TID_OBJ_RESEARCH_HINT",Weight:100,GroupId:4,GoalType:"ResearchArtifacts",TimeLimitHr:4,MaxRSLevel:1,MaxPlayerLevel:15,GoalTarget:2,StringParam:1,XPReward:80,CRRewardPerDay:2e3,FuelRewardPerDay:100},EG_Research2:{Name:"EG_Research2",TID:"TID_OBJ_RESEARCH_ARTIFACTS",TID_Description:"TID_OBJ_RESEARCH_ARTIFACTS_DESCR",TID_HINT:"TID_OBJ_RESEARCH_HINT",Weight:100,GroupId:4,GoalType:"ResearchArtifacts",TimeLimitHr:8,MaxPlayerLevel:15,GoalTarget:4,StringParam:2,XPReward:200,CRRewardPerDay:3e3,FuelRewardPerDay:200,RSLevel:[2]},EG_Mine1:{Name:"EG_Mine1",TID:"TID_OBJ_MINE",TID_Description:"TID_OBJ_MINE_DESC",TID_HINT:"TID_OBJ_MINE_HINT",GroupId:6,GoalType:"MineHydrogen",TimeLimitHr:4,GoalTarget:200,IntParam:5,XPReward:80,CRRewardPerDay:1500,FuelRewardPerDay:200,PlayerLevel:[8,11]},EG_Mine2:{Name:"EG_Mine2",TID:"TID_OBJ_MINE",TID_Description:"TID_OBJ_MINE_DESC",TID_HINT:"TID_OBJ_MINE_HINT",GroupId:6,GoalType:"MineHydrogen",TimeLimitHr:12,GoalTarget:500,IntParam:7,XPReward:200,CRRewardPerDay:2e3,FuelRewardPerDay:400,PlayerLevel:[12,15]},EG_UpgradeMiners:{Name:"EG_UpgradeMiners",TID:"TID_OBJ_UPGRADE_MINER",TID_Description:"TID_OBJ_UPGRADE_MINER_DESCR",TID_HINT:"TID_OBJ_UPGRADE_MINER_HINT",Weight:500,GroupId:7,GoalType:"UpgradeShip",TimeLimitHr:4,MinPlayerLevel:8,GoalTarget:2,StringParam:"Miner",XPReward:300,CRRewardPerDay:2500,FuelRewardPerDay:400},EG_Shipments1:{Name:"EG_Shipments1",TID:"TID_OBJ_DELIVER_SHIPMENTS",TID_Description:"TID_OBJ_DELIVER_SHIPMENTS_DESCR",TID_HINT:"TID_OBJ_SHIPMENTS_HINT",GroupId:8,GoalType:"Tut_DoShipments",TimeLimitHr:1,GoalTarget:40,XPReward:80,CRRewardPerDay:2e3,FuelRewardPerDay:250,PlayerLevel:[5,8]},EG_Shipments2:{Name:"EG_Shipments2",TID:"TID_OBJ_DELIVER_SHIPMENTS",TID_Description:"TID_OBJ_DELIVER_SHIPMENTS_DESCR",TID_HINT:"TID_OBJ_SHIPMENTS_HINT",GroupId:8,GoalType:"Tut_DoShipments",TimeLimitHr:2,GoalTarget:100,XPReward:200,CRRewardPerDay:3500,FuelRewardPerDay:500,PlayerLevel:[9,15]},EG_UnlockSector1:{Name:"EG_UnlockSector1",TID:"TID_OBJ_REVEAL_SECTOR",TID_Description:"TID_OBJ_REVEAL_SECTOR_DESCR",TID_HINT:"TID_OBJ_REVEAL_SECTOR_HINT",Weight:150,GroupId:9,GoalType:"UnlockSector",TimeLimitHr:1,MaxPlayerLevel:7,IntParam:3,XPReward:150,CRRewardPerDay:1500,FuelRewardPerDay:200},EG_UnlockSector2:{Name:"EG_UnlockSector2",TID:"TID_OBJ_REVEAL_SECTOR",TID_Description:"TID_OBJ_REVEAL_SECTOR_DESCR",TID_HINT:"TID_OBJ_REVEAL_SECTOR_HINT",GroupId:9,GoalType:"UnlockSector",TimeLimitHr:8,MinPlayerLevel:8,IntParam:5,XPReward:300,CRRewardPerDay:2500,FuelRewardPerDay:350},EG_DestroyCerberus1:{Name:"EG_DestroyCerberus1",TID:"TID_OBJ_CLEAR_CERB_HOME_STAR",TID_Description:"TID_OBJ_CLEAR_CERB_HOME_STAR_DESCR",TID_HINT:"TID_OBJ_CLEAR_CERB_HOME_STAR_HINT",GroupId:10,GoalType:"DestroyCerberusInHomeStar",TimeLimitHr:1,MaxPlayerLevel:9,IntParam:1,XPReward:80,CRRewardPerDay:1500,FuelRewardPerDay:200},EG_DestroyCerberus2:{Name:"EG_DestroyCerberus2",TID:"TID_OBJ_CLEAR_CERB_HOME_STAR",TID_Description:"TID_OBJ_CLEAR_CERB_HOME_STAR_DESCR",TID_HINT:"TID_OBJ_CLEAR_CERB_HOME_STAR_HINT",GroupId:10,GoalType:"DestroyCerberusInHomeStar",TimeLimitHr:4,IntParam:3,XPReward:150,CRRewardPerDay:2500,FuelRewardPerDay:350,PlayerLevel:[10,15]},EG_ConstructSecondSRS:{Name:"EG_ConstructSecondSRS",TID:"TID_CONSTRUCT_SPACE_STATION",TID_Description:"TID_OBJ_SECOND_SRS_DESCR",TID_HINT:"TID_OBJ_SECOND_SRS_HINT",Weight:10007,GroupId:13,GoalType:"ConstructSecondSRS",TimeLimitHr:24,XPReward:150,CRRewardPerDay:5e3,FuelRewardPerDay:250,PlayerLevel:[10,30]},EG_BuildTimeModulator:{Name:"EG_BuildTimeModulator",TID:"TID_CONSTRUCT_SPACE_STATION",TID_Description:"TID_OBJ_BUILD_TIME_MODULATOR_DESCR",TID_HINT:"TID_OBJ_BUILD_TIME_MODULATOR_HINT",Weight:10008,GroupId:14,GoalType:"ConstructTimeModulator",TimeLimitHr:2,MinPlayerLevel:8,XPReward:300,CrystalReward:20},SalvageArtifacts:{Name:"SalvageArtifacts",TID:"TID_OBJ_SALVAGE_ARTIFACTS",TID_Description:"TID_OBJ_SALVAGE_ARTIFACTS_DESCR",Weight:50,GroupId:1e3,GoalType:"SalvageArtifacts",TimeLimitDays:[1,1,1,1,1,1,1,1,2,2,2,2,2,3,3,3,3,3,3,3],MinPlayerLevel:12,GoalTarget:[2,4,6,8,10,12,14,16,24,24,28,24,20,36,32,34,36,38,40,42],StringParam:[2,2,3,3,4,4,4,4,5,6,6,7,7,7,8,8,8,8,8,8],CRRewardPerDay:[5e3,7500,1e4,12500,15e3,2e4,25e3,3e4,35e3,4e4,45e3,5e4,55e3,6e4,65e3,7e4,75e3,8e4,85e3,9e4],FuelRewardPerDay:[500,800,1200,1600,2e3,2500,3e3,3500,4e3,5e3,6e3,7e3,8e3,9e3,1e4,11e3,12e3,13e3,14e3,15e3],RSLevel:[[3,4],[3,5],[4,6],[4,6],[4,6],[5,7],[5,7],[5,null],[5,null],[6,null],[6,null],[7,null],[7,null],[7,null],[8,null],[8,null],[8,null],[8,null],[8,null],[8,null]]},DestroySentinels:{Name:"DestroySentinels",TID:"TID_OBJ_DESTROY_CERBERUS",TID_Description:"TID_OBJ_DESTROY_CERBERUS_DESCR",Weight:100,GroupId:2e3,GoalType:"DestroyCerberusShips",TimeLimitDays:[1,1,1,1,1,1,1,2,2,2,2,2,2,2,3,3,3,3,3,3],MaxRSLevel:[2,3,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],MinPlayerLevel:12,GoalTarget:[4,7,10,14,18,22,26,30,35,40,45,50,55,60,65,70,75,80,85,90],StringParam:"CerberusSentinel",CRRewardPerDay:[5e3,7500,1e4,12500,15e3,2e4,25e3,3e4,35e3,4e4,45e3,5e4,55e3,6e4,65e3,7e4,75e3,8e4,85e3,9e4],FuelRewardPerDay:[500,800,1200,1600,2e3,2500,3e3,3500,4e3,5e3,6e3,7e3,8e3,9e3,1e4,11e3,12e3,13e3,14e3,15e3]},DestroyGuardians:{Name:"DestroyGuardians",TID:"TID_OBJ_DESTROY_CERBERUS",TID_Description:"TID_OBJ_DESTROY_CERBERUS_DESCR",Weight:100,GroupId:2e3,GoalType:"DestroyCerberusShips",TimeLimitDays:[1,1,1,1,1,1,1,2,2,2,2,2,2,2,3,3,3,3,3,3],MinRSLevel:2,MaxRSLevel:[2,3,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],MinPlayerLevel:12,GoalTarget:[2,4,6,8,10,13,16,19,22,25,28,31,34,37,40,43,46,49,52,55],StringParam:"CerberusGuardian",CRRewardPerDay:[5e3,7500,1e4,12500,15e3,2e4,25e3,3e4,35e3,4e4,45e3,5e4,55e3,6e4,65e3,7e4,75e3,8e4,85e3,9e4],FuelRewardPerDay:[500,800,1200,1600,2e3,2500,3e3,3500,4e3,5e3,6e3,7e3,8e3,9e3,1e4,11e3,12e3,13e3,14e3,15e3]},DestroyColossus:{Name:"DestroyColossus",TID:"TID_OBJ_DESTROY_CERBERUS",TID_Description:"TID_OBJ_DESTROY_CERBERUS_DESCR",Weight:100,GroupId:2e3,GoalType:"DestroyCerberusShips",TimeLimitDays:[1,1,1,1,1,1,1,2,2,2,2,2,2,2,3,3,3,3,3,3],MinRSLevel:5,MaxRSLevel:[5,6,7,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],MinPlayerLevel:12,GoalTarget:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,16,18,20,22,24,26],StringParam:"CerberusColossus",CRRewardPerDay:[5e3,7500,1e4,12500,15e3,2e4,25e3,3e4,35e3,4e4,45e3,5e4,55e3,6e4,65e3,7e4,75e3,8e4,85e3,9e4],FuelRewardPerDay:[500,800,1200,1600,2e3,2500,3e3,3500,4e3,5e3,6e3,7e3,8e3,9e3,1e4,11e3,12e3,13e3,14e3,15e3]},DestroyInterceptor:{Name:"DestroyInterceptor",TID:"TID_OBJ_DESTROY_CERBERUS",TID_Description:"TID_OBJ_DESTROY_CERBERUS_DESCR",Weight:100,GroupId:2e3,GoalType:"DestroyCerberusShips",TimeLimitDays:[1,1,1,1,1,1,1,2,2,2,2,2,2,2,3,3,3,3,3,3],MinRSLevel:4,MaxRSLevel:[5,6,7,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],MinPlayerLevel:12,GoalTarget:[1,2,3,5,7,9,12,15,18,21,24,27,30,33,36,39,42,45,48,51],StringParam:"CerberusInterceptor",CRRewardPerDay:[5e3,7500,1e4,12500,15e3,2e4,25e3,3e4,35e3,4e4,45e3,5e4,55e3,6e4,65e3,7e4,75e3,8e4,85e3,9e4],FuelRewardPerDay:[500,800,1200,1600,2e3,2500,3e3,3500,4e3,5e3,6e3,7e3,8e3,9e3,1e4,11e3,12e3,13e3,14e3,15e3]},DestroyPhoenix:{Name:"DestroyPhoenix",TID:"TID_OBJ_DESTROY_CERBERUS",TID_Description:"TID_OBJ_DESTROY_CERBERUS_DESCR",Weight:100,GroupId:2e3,GoalType:"DestroyCerberusShips",TimeLimitDays:[1,1,1,1,1,1,1,2,2,2,2,2,2],MinPlayerLevel:12,GoalTarget:[1,2,3,4,5,6,7,8,9,10,11,12,13],StringParam:"CerberusPhoenix",CRRewardPerDay:[3e4,35e3,4e4,45e3,5e4,55e3,6e4,65e3,7e4,8e4,9e4,1e5,11e4],FuelRewardPerDay:[5e3,6e3,7e3,8e3,9e3,1e4,11e3,12e3,13e3,14e3,16e3,18e3,2e4],RSLevel:[8,null,null,null,null,null,null,null,null,null,null,null,null]},ReachInfluence:{Name:"ReachInfluence",TID:"TID_OBJECTIVE_GAIN_INFLUENCE",TID_Description:"TID_OBJECTIVE_REACH_INFLUENCE_DESCR",Weight:100,GroupId:1e5,GoalType:"ReachInfluence",TimeLimitDays:[1,1,2,2,2,3,3,3,4,4,5,5],MinRSLevel:[3,4,5,6,7,7,7,8,8,8,9,9],MinPlayerLevel:12,GoalTarget:[800,2500,4500,9e3,11e3,13e3,15e3,17e3,2e4,23e3,25e3,27e3],CRRewardPerDay:[5e3,1e4,2e4,3e4,4e4,5e4,6e4,7e4,8e4,1e5,12e4,15e4],FuelRewardPerDay:[500,1e3,2e3,3500,5e3,8e3,1e4,12500,15e3,17500,2e4,22500],Influence:[[1600,750],[3e3,2400],[7500,4400],[9500,8900],[11e3,10900],[13e3,12900],[15e3,14900],[18e3,16900],[21e3,19900],[23e3,22900],[25e3,24900],null]},MineHydrogenInRS:{Name:"MineHydrogenInRS",TID:"TID_OBJ_MINE_RS",TID_Description:"TID_OBJ_MINE_RS_DESC",Weight:100,GroupId:3e3,GoalType:"MineHydrogenInRS",TimeLimitDays:1,MinRSLevel:3,MaxRSLevel:[4,5,6,7,8,9,null,null,null,null,null,null,null,null,null,null,null,null,null,null],MinPlayerLevel:12,GoalTarget:[150,300,600,1500,3e3,4500,6e3,7500,9e3,12e3,15e3,18e3,21e3,24e3,3e4,36e3,42e3,48e3,54e3,6e4],CRRewardPerDay:[5e3,7500,1e4,12500,15e3,2e4,25e3,3e4,35e3,4e4,45e3,5e4,55e3,6e4,65e3,7e4,75e3,8e4,85e3,9e4],FuelRewardPerDay:[500,800,1200,1600,2e3,2500,3e3,3500,4e3,5e3,6e3,7e3,8e3,9e3,1e4,11e3,12e3,13e3,14e3,15e3]},UploadHydroRS:{Name:"UploadHydroRS",TID:"TID_USE_MINING_MODULE",TID_Description:"TID_UPLOAD_HYDRO_RS",Weight:100,GroupId:3e3,GoalType:"UploadHydrogenFromRS",TimeLimitDays:1,ModuleReq:26,MaxRSLevel:[4,5,6,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],MinPlayerLevel:12,GoalTarget:[100,200,400,1e3,2e3,3e3,4e3,5e3,6e3,8e3,1e4,12e3,14e3,16e3,2e4,24e3,28e3,32e3,36e3,4e4],CRRewardPerDay:[5e3,7500,1e4,12500,15e3,2e4,25e3,3e4,35e3,4e4,45e3,5e4,55e3,6e4,65e3,7e4,75e3,8e4,85e3,9e4],FuelRewardPerDay:[500,800,1200,1600,2e3,2500,3e3,3500,4e3,5e3,6e3,7e3,8e3,9e3,1e4,11e3,12e3,13e3,14e3,15e3]},EMPPEnemyShips:{Name:"EMPPEnemyShips",TID:"TID_USE_SUPPORT_MODULE",TID_Description:"TID_USE_EMP",Weight:100,GroupId:12e3,GoalType:"EMPPEnemyShips",TimeLimitDays:1,ModuleReq:4,MaxRSLevel:[4,5,6,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],MinPlayerLevel:8,GoalTarget:[4,8,12,16,20,25,30,35,40,45,50,60,70,80,90,100,120,140,160,180],CRRewardPerDay:[5e3,7500,1e4,12500,15e3,2e4,25e3,3e4,35e3,4e4,45e3,5e4,55e3,6e4,65e3,7e4,75e3,8e4,85e3,9e4],FuelRewardPerDay:[500,800,1200,1600,2e3,2500,3e3,3500,4e3,5e3,6e3,7e3,8e3,9e3,1e4,11e3,12e3,13e3,14e3,15e3]},RepairOtherPlayerShips:{Name:"RepairOtherPlayerShips",TID:"TID_USE_SUPPORT_MODULE",TID_Description:"TID_USE_REPAIR",Weight:80,GroupId:11e3,GoalType:"RepairOtherPlayerShips",TimeLimitDays:1,ModuleReq:5,MaxRSLevel:[4,5,6,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],MinPlayerLevel:8,GoalTarget:[2e3,4e3,8e3,12e3,16e3,2e4,3e4,35e3,4e4,45e3,5e4,55e3,6e4,65e3,7e4,75e3,8e4,85e3,9e4,1e5],CRRewardPerDay:[5e3,7500,1e4,12500,15e3,2e4,25e3,3e4,35e3,4e4,45e3,5e4,55e3,6e4,65e3,7e4,75e3,8e4,85e3,9e4],FuelRewardPerDay:[500,800,1200,1600,2e3,2500,3e3,3500,4e3,5e3,6e3,7e3,8e3,9e3,1e4,11e3,12e3,13e3,14e3,15e3]},UseAlphaRocket:{Name:"UseAlphaRocket",TID:"TID_USE_SUPPORT_MODULE",TID_Description:"TID_USE_ALPHA_ROCKET",Weight:100,GroupId:11e3,GoalType:"UseAlphaRocket",TimeLimitDays:1,ModuleReq:41,MaxRSLevel:[4,5,6,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],MinPlayerLevel:8,GoalTarget:[5e3,8e3,12e3,17e3,22e3,28e3,34e3,4e4,46e3,52e3,6e4,7e4,8e4,9e4,1e5,11e4,12e4,13e4,14e4,15e4],CRRewardPerDay:[15e3,2e4,25e3,3e4,35e3,4e4,45e3,5e4,55e3,6e4,65e3,7e4,75e3,8e4,85e3,9e4,95e3,1e5,105e3,11e4],FuelRewardPerDay:[2e3,2500,3e3,3500,4e3,4500,5e3,5500,6e3,7e3,8e3,1e4,12e3,14e3,16e3,2e4,25e3,3e4,35e3,4e4]},EntrustArtifacts:{Name:"EntrustArtifacts",TID:"TID_USE_SUPPORT_MODULE",TID_Description:"TID_USE_ENTRUST",Weight:50,GroupId:11e3,GoalType:"EntrustInRS",TimeLimitDays:1,ModuleReq:45,MinPlayerLevel:8,GoalTarget:[2,4,4,6,6,7,8,6,8,4],IntParam:[5,5,6,6,7,7,7,8,8,9],CRRewardPerDay:[2e4,3e4,4e4,5e4,6e4,7e4,8e4,9e4,1e5,11e4],FuelRewardPerDay:[1e3,2e3,3e3,4e3,5e3,6e3,8e3,12e3,16e3,2e4],RSLevel:[5,[5,6],[6,null],[6,null],[7,null],[7,null],[7,null],[8,null],[8,null],[9,null]]},UseDestinyNoSanct:{Name:"UseDestinyNoSanct",TID:"TID_USE_SUPPORT_MODULE",TID_Description:"TID_USE_DESTINY_NO_SANCT",Weight:100,GroupId:12e3,GoalType:"UseDestinyNoSanct",TimeLimitDays:1,ModuleReq:23,MinPlayerLevel:8,GoalTarget:[1,2,3,4,5,6,2,3,4,5,6,7,3,4,5,6,8,6,6,6],IntParam:[5,5,5,5,5,5,6,6,6,6,6,6,7,7,7,7,7,8,9,10],CRRewardPerDay:[26e3,3e4,34e3,38e3,42e3,46e3,5e4,55e3,6e4,65e3,7e4,75e3,8e4,9e4,1e5,11e4,12e4,13e4,14e4,15e4],FuelRewardPerDay:[2e3,3e3,4e3,5e3,6e3,7e3,8e3,9e3,1e4,12e3,14e3,16e3,18e3,2e4,22e3,24e3,26e3,3e4,36e3,4e4],RSLevel:[5,5,[5,6],[5,6],[5,6],[5,7],[6,7],[6,7],[6,8],[6,8],[6,8],[6,9],[7,null],[7,null],[7,null],[7,null],[7,null],[8,null],[9,null],[10,null]]},DeliverShipmentsBatch:{Name:"DeliverShipmentsBatch",TID:"TID_DELIVER_SHIPMENT_BATCH",TID_Description:"TID_DELIVER_SHIPMENT_BATCH_DESCR",Weight:100,GroupId:2e4,GoalType:"DeliverShipmentsBatch",TimeLimitDays:1,MinPlayerLevel:8,GoalTarget:[4,6,8,10,10,12,14,8,10,12,6,8,8,8,8,8,8,8,9,10],IntParam:[3,3,3,3,4,4,4,5,5,5,6,6,7,8,9,10,12,14,16,16],CRRewardPerDay:[5e3,7500,1e4,12500,15e3,2e4,25e3,3e4,35e3,4e4,45e3,5e4,55e3,6e4,65e3,7e4,75e3,8e4,85e3,9e4],FuelRewardPerDay:[500,800,1200,1600,2e3,2500,3e3,3500,4e3,5e3,6e3,7e3,8e3,9e3,1e4,11e3,12e3,13e3,14e3,15e3],RSLevel:[[3,4],[4,5],[4,6],[4,null],[5,null],[5,null],[5,null],[6,null],[6,null],[6,null],null,null,null,null,null,null,null,null,null,null]},UseShipmentComputer:{Name:"UseShipmentComputer",TID:"TID_USE_TRADE_MODULE",TID_Description:"TID_USE_SHIPMENT_COMPUTER",Weight:100,GroupId:2e4,GoalType:"UseShipmentComputer",TimeLimitDays:1,ModuleReq:1,MaxRSLevel:[3,4,5,6,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],MinPlayerLevel:8,GoalTarget:[10,20,40,60,80,100,150,200,250,300,350,400,450,500,600,700,800,1e3,1200,1500],CRRewardPerDay:[5e3,7500,1e4,12500,15e3,2e4,25e3,3e4,35e3,4e4,45e3,5e4,55e3,6e4,65e3,7e4,75e3,8e4,85e3,9e4],FuelRewardPerDay:[500,800,1200,1600,2e3,2500,3e3,3500,4e3,5e3,6e3,7e3,8e3,9e3,1e4,11e3,12e3,13e3,14e3,15e3]},UseTradeBoostOrBurst:{Name:"UseTradeBoostOrBurst",TID:"TID_USE_TRADE_MODULE",TID_Description:"TID_USE_TRADEBOOST",Weight:75,GroupId:2e4,GoalType:"UseTradeBoost",TimeLimitDays:1,ModuleReq:2,MaxRSLevel:[4,5,6,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],MinPlayerLevel:8,GoalTarget:[100,200,400,600,1e3,1500,2e3,3e3,4e3,5e3,6e3,8e3,9e3,1e4,11e3,12e3,14e3,16e3,18e3,2e4],CRRewardPerDay:[5e3,7500,1e4,12500,15e3,2e4,25e3,3e4,35e3,4e4,45e3,5e4,55e3,6e4,65e3,7e4,75e3,8e4,85e3,9e4],FuelRewardPerDay:[500,800,1200,1600,2e3,2500,3e3,3500,4e3,5e3,6e3,7e3,8e3,9e3,1e4,11e3,12e3,13e3,14e3,15e3]},PT_SalvageArtifacts:{Name:"PT_SalvageArtifacts",TID:"TID_OBJ_SALVAGE_ARTIFACTS",TID_Description:"TID_OBJ_SALVAGE_ARTIFACTS_DESCR",TID_HINT:"TID_OBJ_SALVAGE_HINT",Weight:10004,GroupId:4,GoalType:"SalvageArtifacts",AppearsOnceOnly:1,MaxPlayerLevel:9,GoalTarget:1,StringParam:1,XPReward:40,CRRewardPerDay:2e3,FuelRewardPerDay:200,TimeLimit:[5,0]},UseShipmentDrone:{Name:"UseShipmentDrone",TID:"TID_USE_TRADE_MODULE",TID_Description:"TID_USE_SHIPMENT_DRONE",Weight:100,GroupId:2e4,GoalType:"UseShipmentDrone",TimeLimitDays:1,ModuleReq:22,MaxRSLevel:[5,5,6,7,8,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],MinPlayerLevel:8,GoalTarget:[500,1e3,2e3,3e3,4e3,5e3,6e3,8e3,1e4,12500,15e3,17500,2e4,3e4,5e4,75e3,1e5,2e5,35e4,5e5],CRRewardPerDay:[5e3,7500,1e4,12500,15e3,2e4,25e3,3e4,35e3,4e4,45e3,5e4,55e3,6e4,65e3,7e4,75e3,8e4,85e3,9e4],FuelRewardPerDay:[500,800,1200,1600,2e3,2500,3e3,3500,4e3,5e3,6e3,7e3,8e3,9e3,1e4,11e3,12e3,13e3,14e3,15e3]},UseCrunch:{Name:"UseCrunch",TID:"TID_USE_MINING_MODULE",TID_Description:"TID_USE_CRUNCH",Weight:100,GroupId:3e3,GoalType:"UseCrunch",TimeLimitDays:1,ModuleReq:39,MaxRSLevel:[5,6,7,8,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],MinPlayerLevel:8,GoalTarget:[300,350,400,500,600,800,1e3,1200,1400,1600,1800,2e3,2250,2500,3e3,4e3,5e3,6e3,7e3,8e3],CRRewardPerDay:[5e3,7500,1e4,12500,15e3,2e4,25e3,3e4,35e3,4e4,45e3,5e4,55e3,6e4,65e3,7e4,75e3,8e4,85e3,9e4],FuelRewardPerDay:[500,800,1200,1600,2e3,2500,3e3,3500,4e3,5e3,6e3,7e3,8e3,9e3,1e4,11e3,12e3,13e3,14e3,15e3]},UseSalvage:{Name:"UseSalvage",TID:"TID_USE_SUPPORT_MODULE",TID_Description:"TID_USE_SALVAGE",Weight:100,GroupId:12e3,GoalType:"UseSalvage",TimeLimitDays:1,ModuleReq:20,MaxRSLevel:[5,6,7,8,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],MinPlayerLevel:8,GoalTarget:[1e3,3e3,6e3,1e4,15e3,2e4,25e3,3e4,4e4,5e4,6e4,7e4,8e4,1e5,12e4,14e4,16e4,18e4,2e5,22e4],CRRewardPerDay:[5e3,7500,1e4,12500,15e3,2e4,25e3,3e4,35e3,4e4,45e3,5e4,55e3,6e4,65e3,7e4,75e3,8e4,85e3,9e4],FuelRewardPerDay:[500,800,1200,1600,2e3,2500,3e3,3500,4e3,5e3,6e3,7e3,8e3,9e3,1e4,11e3,12e3,13e3,14e3,15e3]},UseShipmentBeam:{Name:"UseShipmentBeam",TID:"TID_USE_TRADE_MODULE",TID_Description:"TID_USE_SHIPMENTBEAM",Weight:100,GroupId:2e4,GoalType:"UseShipmentBeam",TimeLimitDays:1,ModuleReq:37,MaxRSLevel:[5,6,7,8,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],MinPlayerLevel:8,GoalTarget:[15,25,35,50,70,90,110,130,150,170,190,210,230,260,290,320,350,380,410,440],CRRewardPerDay:[5e3,7500,1e4,12500,15e3,2e4,25e3,3e4,35e3,4e4,45e3,5e4,55e3,6e4,65e3,7e4,75e3,8e4,85e3,9e4],FuelRewardPerDay:[500,1600,2400,3200,4e3,5e3,6e3,7e3,8e3,1e4,12e3,14e3,16e3,18e3,2e4,22e3,24e3,26e3,28e3,3e4]},UseBlastShield:{Name:"UseBlastShield",TID:"TID_USE_SHIELD_MODULE",TID_Description:"TID_USE_BLASTSHIELD",Weight:100,GroupId:3e4,GoalType:"UseBlastShield",TimeLimitDays:1,ModuleReq:52,MinRSLevel:7,MinPlayerLevel:8,GoalTarget:[5e3,1e4,2e4,3e4,4e4,5e4,6e4,7e4,8e4,9e4,1e5,12e4,14e4,16e4,18e4,2e5,24e4,28e4,32e4,4e5],CRRewardPerDay:[5e3,7500,1e4,12500,15e3,2e4,25e3,3e4,35e3,4e4,45e3,5e4,55e3,6e4,65e3,7e4,75e3,8e4,85e3,9e4],FuelRewardPerDay:[500,800,1200,1600,2e3,2500,3e3,3500,4e3,5e3,6e3,7e3,8e3,9e3,1e4,11e3,12e3,13e3,14e3,15e3]},UseMiningDrone:{Name:"UseMiningDrone",TID:"TID_USE_MINING_MODULE",TID_Description:"TID_USE_MININGDRONE",Weight:100,GroupId:3e3,GoalType:"UseMiningDrone",TimeLimitDays:1,ModuleReq:55,MaxRSLevel:[5,6,7,8,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],MinPlayerLevel:8,GoalTarget:[100,200,300,400,500,600,800,1e3,1250,1500,1750,2e3,2500,3e3,3500,4e3,4500,5e3,5500,6e3],CRRewardPerDay:[5e3,7500,1e4,12500,15e3,2e4,25e3,3e4,35e3,4e4,45e3,5e4,55e3,6e4,65e3,7e4,75e3,8e4,85e3,9e4],FuelRewardPerDay:[500,800,1200,1600,2e3,2500,3e3,3500,4e3,5e3,6e3,7e3,8e3,9e3,1e4,11e3,12e3,13e3,14e3,15e3]},UseGenesis:{Name:"UseGenesis",TID:"TID_USE_MINING_MODULE",TID_Description:"TID_USE_GENESIS",Weight:100,GroupId:3e3,GoalType:"UseGenesis",TimeLimitDays:1,ModuleReq:44,MaxRSLevel:[5,6,7,8,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],MinPlayerLevel:8,GoalTarget:[3,5,7,9,12,15,18,21,23,25,27,29,31,33,35,37,39,41,43,45],CRRewardPerDay:[5e3,7500,1e4,12500,15e3,2e4,25e3,3e4,35e3,4e4,45e3,5e4,55e3,6e4,65e3,7e4,75e3,8e4,85e3,9e4],FuelRewardPerDay:[500,800,1200,1600,2e3,2500,3e3,3500,4e3,5e3,6e3,7e3,8e3,9e3,1e4,11e3,12e3,13e3,14e3,15e3]},UseOffload:{Name:"UseOffload",TID:"TID_USE_TRADE_MODULE",TID_Description:"TID_USE_OFFLOAD",Weight:100,GroupId:2e4,GoalType:"UseOffload",TimeLimitDays:1,ModuleReq:46,MaxRSLevel:[5,6,7,8,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],MinPlayerLevel:8,GoalTarget:[5,10,20,30,40,60,80,100,120,150,200,250,300,400,500,600,700,800,900,1e3],CRRewardPerDay:[5e3,7500,1e4,12500,15e3,2e4,25e3,3e4,35e3,4e4,45e3,5e4,55e3,6e4,65e3,7e4,75e3,8e4,85e3,9e4],FuelRewardPerDay:[500,800,1200,1600,2e3,2500,3e3,3500,4e3,5e3,6e3,7e3,8e3,9e3,1e4,11e3,12e3,13e3,14e3,15e3]},EarnFragments:{Name:"EarnFragments",TID:"TID_EARN_FRAGMENTS",TID_Description:"TID_EARN_FRAGMENTS_DESCR",GroupId:5e4,GoalType:"WinBSFragments",TimeLimitDays:1,MinPlayerLevel:8,GoalTarget:[4,8,10,12,14,16,18,20,22,24,26,28,30,33,36,39,42,45,48,50],CRRewardPerDay:[5e3,7500,1e4,12500,15e3,2e4,25e3,3e4,35e3,4e4,45e3,5e4,55e3,6e4,65e3,7e4,75e3,8e4,85e3,9e4],FuelRewardPerDay:[500,800,1200,1600,2e3,2500,3e3,3500,4e3,5e3,6e3,7e3,8e3,9e3,1e4,11e3,12e3,13e3,14e3,15e3],MinRSLevel:[6,6,7,7,7,7,7,7,7,8,9,10,null,null,null,null,null,null,null,null]},WinBSWithModule:{Name:["EMP","EMP","EMP","Repair","Repair","Repair","TimeWarp","Stealth","Stealth","Fortify","Fortify","Salvage","Salvage","Supress","Supress","Impulse","Impulse","AlphaRocket","AlphaRocket","Destiny","Vengeance","DeltaRocket","Barrier","AlphaDrone","Bond","OmegaRocket"],TID:"TID_WIN_BS_WITH_MODULE",TID_Description:"TID_WIN_BS_WITH_MODULE_DESCR",GroupId:4e4,GoalType:"WinBSWithModule",TimeLimitDays:1,ModuleReq:[4,4,4,5,5,5,10,15,15,19,19,20,20,21,21,32,32,41,41,23,36,51,31,49,50,53],MaxRSLevel:[4,5,4,5,5,5,5,5,5,5,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],GoalTarget:1,CRRewardPerDay:[1e4,2e4,4e4,1e4,2e4,4e4,4e4,2e4,4e4,2e4,4e4,2e4,4e4,2e4,4e4,2e4,4e4,2e4,4e4,4e4,4e4,4e4,4e4,4e4,4e4,4e4],FuelRewardPerDay:[1e3,2500,5e3,1e3,2500,5e3,5e3,2500,5e3,2500,5e3,2500,5e3,2500,5e3,2500,5e3,2500,5e3,5e3,5e3,5e3,5e3,5e3,5e3,5e3],MinRSLevel:[5,6,5,6,6,6,6,6,6,6,6,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]}},D=["X","Y","Z"],t={SalvageArtifacts:["StringParam","GoalTarget"],DeliverShipmentsBatch:["IntParam","GoalTarget"],DestroySentinels:["StringParam","GoalTarget"],DestroyGuardians:["StringParam","GoalTarget"],DestroyColossus:["StringParam","GoalTarget"],DestroyInterceptor:["StringParam","GoalTarget"],DestroyPhoenix:["StringParam","GoalTarget"],EntrustArtifacts:["GoalTarget","IntParam","RSLevel"],UseDestinyNoSanct:["GoalTarget","IntParam"],WinBSWithModule:["Name"]},u="GoalTarget",I=(0,i.Z)(_,"player_goals.fixed",{map:([e,l])=>(e in t?t[e].forEach(((e,a)=>{l[`value${D[a]}`]=l[e],delete l[e]})):u in l&&(l[`value${D[0]}`]=l[u],delete l[u]),[e,l])});I.WinBSWithModule.Name="WinBSWithModule";const R={components:{Page:T.Z},data:()=>({data:I})};var o=a(3744);const E=(0,o.Z)(R,[["render",n]]),s=E},1334:(e,l,a)=>{a.d(l,{Z:()=>T});var r=a(5888),n=a(553);function T(e,l,a){const T=l.split(".").reduce(((e,l)=>e[l]),r.Z);return(0,n.Z)(e,{filter:([e])=>T.includes(e),sort:([e],[l])=>T.indexOf(e)-T.indexOf(l),...a})}},5888:(e,l,a)=>{a.d(l,{Z:()=>r});const r={capital_ships:{player:["Transport","Miner","Battleship","CorpFlagship"],cerberus:["CerberusSentinel","CerberusGuardian","CerberusInterceptor","CerberusColossus","CerberusDestroyer","CerberusBomber","CerberusPhoenix","CerberusStorm","CerberusGhosts","CerberusHydra","Hydraling1","Hydraling2"],drones:["ShipmentDrone","MiningDrone","AlphaDrone","RelicDrone"]},planets:{yellowstar:["desert_lv1","lava_lv1","water_lv1","terran_lv1","gas_lv1","terran_lv2","lava_lv2","water_lv2","gas_lv2","desert_lv2","lava_lv3","desert_lv3","water_lv3","terran_lv3","ice_variation1","ice_variation2"],redstar:["destroyed01","destroyed02","destroyed03","destroyed04","destroyed05","destroyed06","destroyed07","destroyed08","destroyed09","destroyed10"],whitestar:["whitestar1","whitestar2","whitestar_l1"]},spacebuildings:{player:["Shipyard","ShortRangeScanner","RedStarScanner","ResearchStation","DiplomacyCenter","TradingStation","WarpLaneHub","WhiteStarScanner","TimeModulator","BlueStarScanner","ShipmentRelay"]},player_goals:{all:["SalvageArtifacts","DestroySentinels","DestroyGuardians","DestroyColossus","DestroyInterceptor","DestroyPhoenix","ReachInfluence","MineHydrogenInRS","UploadHydroRS","EMPPEnemyShips","RepairOtherPlayerShips","UseAlphaRocket","EntrustArtifacts","UseDestinyNoSanct","DeliverShipmentsBatch","UseShipmentComputer","UseTradeBoostOrBurst","UseShipmentDrone","UseCrunch","UseSalvage","UseShipmentBeam","UseBlastShield","UseMiningDrone","UseGenesis","UseOffload","EarnFragments","WinBSWithEMP1","WinBSWithEMP2","WinBSWithEMP3","WinBSWithRepair1","WinBSWithRepair2","WinBSWithRepair3","WinBSWithTimeWarp","WinBSWithStealth1","WinBSWithStealth2","WinBSWithFortify1","WinBSWithFortify2","WinBSWithSalvage1","WinBSWithSalvage2","WinBSWithSupress1","WinBSWithSupress2","WinBSWithImpulse1","WinBSWithImpulse2","WinBSWithAlphaRocket1","WinBSWithAlphaRocket2","WinBSWithDestiny","WinBSWithVengeance","WinBSWithDeltaRocket","WinBSWithBarrier","WinBSWithAlphaDrone","WinBSWithBond","WinBSWithOmegaRocket"],fixed:["MineHydrogenInRS","SalvageArtifacts","ReachInfluence","DeliverShipmentsBatch","EarnFragments","DestroySentinels","DestroyGuardians","DestroyColossus","DestroyInterceptor","DestroyPhoenix","UploadHydroRS","UseCrunch","UseMiningDrone","UseGenesis","UseBlastShield","EMPPEnemyShips","RepairOtherPlayerShips","UseAlphaRocket","EntrustArtifacts","UseDestinyNoSanct","UseSalvage","UseShipmentComputer","UseTradeBoostOrBurst","UseShipmentDrone","UseShipmentBeam","UseOffload","WinBSWithModule"]}}}}]);