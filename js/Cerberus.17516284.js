"use strict";(self["webpackChunkhades_space"]=self["webpackChunkhades_space"]||[]).push([[362],{7786:(e,t,a)=>{a.d(t,{Z:()=>S});var r=a(6252),s=a(3577);const n={class:"container"},i={class:"list"},o=["href"];function l(e,t,a,l,c,u){const p=(0,r.up)("v-data"),d=(0,r.Q2)("t");return(0,r.wg)(),(0,r.iD)("div",n,[Object.keys(a.args.data).length>1?((0,r.wg)(),(0,r.iD)(r.HY,{key:0},[(0,r._)("h2",null,(0,s.zw)(e.$t("CONTENT")),1),(0,r._)("div",i,[(0,r._)("ol",null,[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(a.args.data,(({Name:e,TID:t})=>((0,r.wg)(),(0,r.iD)("li",{key:e},[(0,r.wy)((0,r._)("a",{href:`#${e}`},null,8,o),[[d,t]])])))),128))])])],64)):(0,r.kq)("",!0),((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(a.args.data,((e,t)=>((0,r.wg)(),(0,r.j4)(p,{key:t,data:e,"table-opts":a.args.tableOpts,"icon-dir":a.args.iconDir},null,8,["data","table-opts","icon-dir"])))),128))])}var c=a(428);const u={components:{VData:c.Z},props:{args:{type:Object,default:()=>({}),required:!0}}};var p=a(3744);const d=(0,p.Z)(u,[["render",l],["__scopeId","data-v-46131bcd"]]),S=d},7346:(e,t,a)=>{a.d(t,{Z:()=>_});var r=a(6252),s=a(3577);const n={class:"portrait-container"},i=["src","alt"],o={class:"topic"};function l(e,t,a,l,c,u){const p=(0,r.up)("Head"),d=(0,r.up)("v-content");return(0,r.wg)(),(0,r.iD)("div",null,[(0,r.Wm)(p,null,{default:(0,r.w5)((()=>[(0,r._)("title",null,(0,s.zw)(c.title),1)])),_:1}),(0,r._)("div",n,[a.portrait?((0,r.wg)(),(0,r.iD)("img",{key:0,class:"portrait",src:a.portrait.src,alt:a.portrait.alt},null,8,i)):(0,r.kq)("",!0),(0,r._)("h1",o,(0,s.zw)(c.title),1)]),(0,r.Wm)(d,{args:a.contentArgs},null,8,["args"])])}var c=a(1232),u=a(7786);const p={components:{Head:c.Fb,VContent:u.Z},props:{contentArgs:{type:Object,requested:!0,default:()=>({})},titleLocKey:{type:String,requested:!0,default:null},portrait:{type:Object,requested:!1,default:null,validator:e=>["src","alt"].every((t=>t in e))}},data(){return{title:this.$t(this.titleLocKey)}}};var d=a(3744);const S=(0,d.Z)(p,[["render",l],["__scopeId","data-v-5d8d711a"]]),_=S},7033:(e,t,a)=>{a.r(t),a.d(t,{default:()=>T});var r=a(6252);const s={class:"portrait-container"},n=["src"],i={id:"CerberusStations",class:"topic"},o={href:"#CerberusStations",class:"link-topic"};function l(e,t,a,l,c,u){const p=(0,r.up)("Page"),d=(0,r.up)("v-content"),S=(0,r.Q2)("t");return(0,r.wg)(),(0,r.iD)("div",null,[(0,r.Wm)(p,{"title-loc-key":"CERBERUS","content-args":{data:c.ships,iconDir:"game/Ships"},portrait:{src:c.cerberusPortrait,alt:"cerberus"}},null,8,["content-args","portrait"]),(0,r._)("div",null,[(0,r._)("div",s,[(0,r._)("img",{class:"portrait",src:c.stationPortrait,alt:"cerberus station"},null,8,n),(0,r._)("h1",i,[(0,r.wy)((0,r._)("a",o,null,512),[[S,"TID_CERB_STATION_HOME2"]])])]),(0,r.Wm)(d,{args:{data:c.stations,iconDir:"game/SpaceBuildings"}},null,8,["args"])])])}var c=a(7346),u=a(7786),p=a(1334),d=a(553),S=a(5715);const _={HomeSystem1:{Name:"HomeSystem1",TID:"TID_CERB_STATION_HOME1",TID_Description:"TID_CERB_STATION_HOME_DESCR",ConceptImage:"portrait_CerberusStation",SpawnFleetIntervalSeconds:86400,ShipToSpawn:"CerberusGuardian",ShipLevel:0,MaxHP:2e4,MaxShield:2e4,DPS:100,AttackRange:1e3,Model:"CerberusStation",WeaponFx:"Gun_Projectile01_Weak",ShieldRegenPerMinute:10,ShieldRegenTimeAfterDamage:3600,MaxShips:3,AwardXP:1e3},HomeSystem2:{Name:"HomeSystem2",TID:"TID_CERB_STATION_HOME2",TID_Description:"TID_CERB_STATION_HOME_DESCR",ConceptImage:"portrait_CerberusStation",SpawnFleetIntervalSeconds:86400,ShipToSpawn:"CerberusGuardian",ShipLevel:0,MaxHP:5e4,MaxShield:5e4,DPS:140,AttackRange:1600,Model:"CerberusStation_lv2",WeaponFx:"Gun_Projectile01",ShieldRegenPerMinute:14,ShieldRegenTimeAfterDamage:3600,MaxShips:5,AwardXP:3e3},HomeSystem3:{Name:"HomeSystem3",TID:"TID_CERB_STATION_HOME3",TID_Description:"TID_CERB_STATION_HOME_DESCR",ConceptImage:"portrait_CerberusStation",SpawnFleetIntervalSeconds:86400,ShipToSpawn:"CerberusGuardian",ShipLevel:0,MaxHP:9e4,MaxShield:9e4,DPS:200,AttackRange:2400,Model:"CerberusStation_lv3",WeaponFx:"Gun_Projectile01_Strong",ShieldRegenPerMinute:20,ShieldRegenTimeAfterDamage:3600,MaxShips:7,AwardXP:5e3}};S.Z.CerberusGhosts.GhostSpawnSecs=S.Z.CerberusGhosts.GhostSpawnSecs[0],S.Z.CerberusColossus.modules[1].SalvageHullPercent.pop();const g=["BSScore","BCCost","FuelUseIncrease","TID_Artifact","UnlockBlueprints","UnlockPrice","UnlockTime","WhiteStarScore"],m={components:{Page:c.Z,VContent:u.Z},data(){return{ships:(0,p.Z)(S.Z,"capital_ships.cerberus",{map:([e,t])=>(t.modules&&(t.modules=t.modules.map((e=>(0,d.Z)(e,{filter:([e])=>!g.includes(e)})))),[e,t])}),stations:_,cerberusPortrait:a(8339),stationPortrait:a(2947)}}};var h=a(3744);const D=(0,h.Z)(m,[["render",l],["__scopeId","data-v-2126d61d"]]),T=D}}]);