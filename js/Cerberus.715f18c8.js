"use strict";(self["webpackChunkhades_space"]=self["webpackChunkhades_space"]||[]).push([[362],{2255:(e,t,a)=>{a.d(t,{Z:()=>S});var r=a(6252),s=a(3577);const n={class:"cont"},i={class:"list"},o=["href"];function l(e,t,a,l,c,u){const p=(0,r.up)("v-data"),d=(0,r.Q2)("t");return(0,r.wg)(),(0,r.iD)("div",n,[Object.keys(a.args.data).length>1?((0,r.wg)(),(0,r.iD)(r.HY,{key:0},[(0,r._)("h2",null,(0,s.zw)(e.$t("CONTENT")),1),(0,r._)("div",i,[(0,r._)("ol",null,[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(a.args.data,(({Name:e,TID:t})=>((0,r.wg)(),(0,r.iD)("li",{key:e},[(0,r.wy)((0,r._)("a",{href:`#${e}`},null,8,o),[[d,t]])])))),128))])])],64)):(0,r.kq)("",!0),((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(a.args.data,((e,t)=>((0,r.wg)(),(0,r.j4)(p,{key:t,data:e,"table-opts":a.args.tableOpts,"icon-dir":a.args.iconDir},null,8,["data","table-opts","icon-dir"])))),128))])}var c=a(9171);const u={components:{VData:c.Z},props:{args:{type:Object,default:()=>{},required:!0}}};var p=a(3744);const d=(0,p.Z)(u,[["render",l],["__scopeId","data-v-55992194"]]),S=d},9750:(e,t,a)=>{a.d(t,{Z:()=>S});var r=a(6252),s=a(3577);const n={class:"topic"},i=["src","alt"];function o(e,t,a,o,l,c){const u=(0,r.up)("Head"),p=(0,r.up)("v-content");return(0,r.wg)(),(0,r.iD)("div",null,[(0,r.Wm)(u,null,{default:(0,r.w5)((()=>[(0,r._)("title",null,(0,s.zw)(l.title),1)])),_:1}),(0,r._)("h1",n,(0,s.zw)(l.title),1),a.portrait?((0,r.wg)(),(0,r.iD)("img",{key:0,class:"portrait",src:a.portrait.src,alt:a.portrait.alt},null,8,i)):(0,r.kq)("",!0),(0,r.Wm)(p,{args:a.contentArgs},null,8,["args"])])}var l=a(1232),c=a(2255);const u={components:{Head:l.Fb,VContent:c.Z},props:{contentArgs:{type:Object,requested:!0,default:()=>({})},titleLocKey:{type:String,requested:!0,default:null},portrait:{type:Object,requested:!1,default:null,validator:e=>["src","alt"].every((t=>t in e))}},data(){return{title:this.$t(this.titleLocKey)}}};var p=a(3744);const d=(0,p.Z)(u,[["render",o],["__scopeId","data-v-07d09103"]]),S=d},5499:(e,t,a)=>{a.r(t),a.d(t,{default:()=>D});var r=a(6252);const s={id:"CerberusStations",class:"topic"},n={href:"#CerberusStations",class:"link-topic"},i=["src"];function o(e,t,a,o,l,c){const u=(0,r.up)("Page"),p=(0,r.up)("v-content"),d=(0,r.Q2)("t");return(0,r.wg)(),(0,r.iD)("div",null,[(0,r.Wm)(u,{"title-loc-key":"CERBERUS","content-args":{data:l.ships,iconDir:"game/Ships"},portrait:{src:l.cerberusPortrait,alt:"cerberus"}},null,8,["content-args","portrait"]),(0,r._)("div",null,[(0,r._)("h1",s,[(0,r.wy)((0,r._)("a",n,null,512),[[d,"TID_CERB_STATION_HOME2"]])]),(0,r._)("img",{class:"portrait",src:l.stationPortrait,alt:"cerberus station"},null,8,i),(0,r.Wm)(p,{args:{data:l.stations,iconDir:"game/SpaceBuildings"}},null,8,["args"])])])}var l=a(9750),c=a(2255),u=a(1334),p=a(553),d=a(5715);const S={HomeSystem1:{Name:"HomeSystem1",TID:"TID_CERB_STATION_HOME1",TID_Description:"TID_CERB_STATION_HOME_DESCR",ConceptImage:"portrait_CerberusStation",SpawnFleetIntervalSeconds:86400,ShipToSpawn:"CerberusGuardian",ShipLevel:0,MaxHP:2e4,MaxShield:2e4,DPS:100,AttackRange:1e3,Model:"CerberusStation",WeaponFx:"Gun_Projectile01_Weak",ShieldRegenPerMinute:10,ShieldRegenTimeAfterDamage:3600,MaxShips:3,AwardXP:1e3},HomeSystem2:{Name:"HomeSystem2",TID:"TID_CERB_STATION_HOME2",TID_Description:"TID_CERB_STATION_HOME_DESCR",ConceptImage:"portrait_CerberusStation",SpawnFleetIntervalSeconds:86400,ShipToSpawn:"CerberusGuardian",ShipLevel:0,MaxHP:5e4,MaxShield:5e4,DPS:140,AttackRange:1600,Model:"CerberusStation_lv2",WeaponFx:"Gun_Projectile01",ShieldRegenPerMinute:14,ShieldRegenTimeAfterDamage:3600,MaxShips:5,AwardXP:3e3},HomeSystem3:{Name:"HomeSystem3",TID:"TID_CERB_STATION_HOME3",TID_Description:"TID_CERB_STATION_HOME_DESCR",ConceptImage:"portrait_CerberusStation",SpawnFleetIntervalSeconds:86400,ShipToSpawn:"CerberusGuardian",ShipLevel:0,MaxHP:9e4,MaxShield:9e4,DPS:200,AttackRange:2400,Model:"CerberusStation_lv3",WeaponFx:"Gun_Projectile01_Strong",ShieldRegenPerMinute:20,ShieldRegenTimeAfterDamage:3600,MaxShips:7,AwardXP:5e3}};d.Z.CerberusGhosts.GhostSpawnSecs=d.Z.CerberusGhosts.GhostSpawnSecs[0],d.Z.CerberusColossus.modules[1].SalvageHullPercent.pop();const _=["BSScore","BCCost","FuelUseIncrease","TID_Artifact","UnlockBlueprints","UnlockPrice","UnlockTime","WhiteStarScore"],g={components:{Page:l.Z,VContent:c.Z},data(){return{ships:(0,u.Z)(d.Z,"capital_ships.cerberus",{map:([e,t])=>(t.modules&&(t.modules=t.modules.map((e=>(0,p.Z)(e,{filter:([e])=>!_.includes(e)})))),[e,t])}),stations:S,cerberusPortrait:a(8339),stationPortrait:a(2947)}}};var m=a(3744);const h=(0,m.Z)(g,[["render",o],["__scopeId","data-v-41173382"]]),D=h}}]);