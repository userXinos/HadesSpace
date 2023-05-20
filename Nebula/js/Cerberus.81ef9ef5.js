"use strict";(self["webpackChunkhades_space"]=self["webpackChunkhades_space"]||[]).push([[362],{4602:(e,t,r)=>{r.d(t,{Z:()=>D});var a=r(6252),s=r(3577),n=r(9963);const i={class:"container"},o={class:"title"},l=["href"],c={key:0},u={key:0,class:"icon"};function d(e,t,r,d,p,S){const _=(0,a.up)("icon"),g=(0,a.up)("v-data");return(0,a.wg)(),(0,a.iD)("div",i,[Object.keys(r.args.data).length>1?((0,a.wg)(),(0,a.iD)(a.HY,{key:0},[(0,a._)("div",o,[(0,a._)("div",{class:(0,s.C_)(["chat-icon",[p.contentOpened?"opened":"closed"]]),onClick:t[0]||(t[0]=e=>p.contentOpened=!p.contentOpened)},null,2)]),(0,a.Wm)(n.uT,null,{default:(0,a.w5)((()=>[p.contentOpened?((0,a.wg)(),(0,a.iD)("ol",{key:0,class:(0,s.C_)(["list",{"with-icons":"iconDir"in r.args}])},[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(r.args.data,(t=>((0,a.wg)(),(0,a.iD)("li",{key:t.Name},[(0,a._)("a",{href:`#${t.Name}`},["iconDir"in r.args?((0,a.wg)(),(0,a.iD)("div",c,[t.PrefabModel||t.Icon||t.Model?((0,a.wg)(),(0,a.iD)("div",u,[(0,a.Wm)(_,{name:S.getRandomIfArr(t.PrefabModel||t.Icon||t.Model),dir:r.args.iconDir},null,8,["name","dir"])])):(0,a.kq)("",!0),(0,a._)("p",null,(0,s.zw)(e.$t(t.TID)),1)])):((0,a.wg)(),(0,a.iD)(a.HY,{key:1},[(0,a.Uk)((0,s.zw)(e.$t(t.TID)),1)],64))],8,l)])))),128))],2)):(0,a.kq)("",!0)])),_:1})],64)):(0,a.kq)("",!0),((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(r.args.data,((e,t)=>((0,a.wg)(),(0,a.j4)(g,{key:t,data:e,"table-opts":r.args.tableOpts,"icon-dir":r.args.iconDir},null,8,["data","table-opts","icon-dir"])))),128))])}var p=r(7190),S=r(8449);const _={components:{VData:p.Z,Icon:S.Z},props:{args:{type:Object,required:!0}},data(){return{contentOpened:!0}},methods:{getRandomIfArr(e){if(Array.isArray(e)){const t=Math.floor(Math.random()*e.length);return e[t]}return e}}};var g=r(3744);const h=(0,g.Z)(_,[["render",d],["__scopeId","data-v-adfe23e4"]]),D=h},569:(e,t,r)=>{r.d(t,{Z:()=>_});var a=r(6252),s=r(3577);const n={class:"portrait-container"},i=["src","alt"],o={class:"topic"};function l(e,t,r,l,c,u){const d=(0,a.up)("v-head"),p=(0,a.up)("v-content");return(0,a.wg)(),(0,a.iD)("div",null,[(0,a.Wm)(d,null,{default:(0,a.w5)((()=>[(0,a._)("title",null,(0,s.zw)(u.title),1)])),_:1}),(0,a._)("div",n,[r.portrait?((0,a.wg)(),(0,a.iD)("img",{key:0,class:"portrait",src:r.portrait.src,alt:r.portrait.alt},null,8,i)):(0,a.kq)("",!0),(0,a._)("h1",o,(0,s.zw)(u.title),1)]),(0,a.WI)(e.$slots,"default",{},void 0,!0),(0,a.Wm)(p,{args:r.contentArgs},null,8,["args"])])}var c=r(7451),u=r(4602);const d={components:{VHead:c.Fb,VContent:u.Z},props:{contentArgs:{type:Object,required:!0},titleLocKey:{type:String,required:!0},portrait:{type:Object,default:null,validator:e=>["src","alt"].every((t=>t in e))}},computed:{title(){return this.$t(this.titleLocKey)}}};var p=r(3744);const S=(0,p.Z)(d,[["render",l],["__scopeId","data-v-adad4e2a"]]),_=S},2393:(e,t,r)=>{r.r(t),r.d(t,{default:()=>H});var a=r(6252),s=r(3577);const n=e=>((0,a.dD)("data-v-ceea6290"),e=e(),(0,a.Cn)(),e),i={class:"container"},o=n((()=>(0,a._)("h2",null,(0,s.zw)("Categories"),-1))),l={class:"list"},c={key:0},u=n((()=>(0,a._)("a",{href:"#DarkCerberus"},"Dark cerberus",-1))),d=[u],p=n((()=>(0,a._)("li",null,[(0,a._)("a",{href:"#CerberusStations"},"Cerberus stations")],-1))),S={key:0},_={class:"portrait-container"},g=["src"],h={id:"DarkCerberus",class:"topic"},D={href:"#DarkCerberus",class:"link-topic"},m={class:"portrait-container"},C=["src"],b={id:"CerberusStations",class:"topic"},w={href:"#CerberusStations",class:"link-topic"};function k(e,t,r,n,u,k){const v=(0,a.up)("Page"),T=(0,a.up)("v-content"),I=(0,a.Q2)("t");return(0,a.wg)(),(0,a.iD)("div",null,[(0,a.Wm)(v,{"title-loc-key":"CERBERUS","content-args":{data:u.ships,iconDir:"game/Ships"},portrait:{src:u.cerberusPortrait,alt:"cerberus"}},{default:(0,a.w5)((()=>[(0,a._)("div",i,[o,(0,a._)("div",l,[(0,a._)("ol",null,[u.isNebulaBuild?((0,a.wg)(),(0,a.iD)("li",c,d)):(0,a.kq)("",!0),p])])])])),_:1},8,["content-args","portrait"]),u.isNebulaBuild?((0,a.wg)(),(0,a.iD)("div",S,[(0,a._)("div",_,[(0,a._)("img",{class:"portrait",src:u.darkCerberusPortrait,alt:"dark cerberus"},null,8,g),(0,a._)("h1",h,[(0,a._)("a",D,(0,s.zw)("Dark "+e.$t("CERBERUS")),1)])]),(0,a.Wm)(T,{args:{data:u.darkShips,iconDir:"game/Ships"}},null,8,["args"])])):(0,a.kq)("",!0),(0,a._)("div",null,[(0,a._)("div",m,[(0,a._)("img",{class:"portrait",src:u.stationPortrait,alt:"cerberus station"},null,8,C),(0,a._)("h1",b,[(0,a.wy)((0,a._)("a",w,null,512),[[I,"TID_CERB_STATION_HOME2"]])])]),(0,a.Wm)(T,{args:{data:u.stations,iconDir:"game/SpaceBuildings"}},null,8,["args"])])])}var v=r(569),T=r(4602),I=r(5341),y=r(2022),f=r(4804);const O={HomeSystem1:{Name:"HomeSystem1",TID:"TID_CERB_STATION_HOME1",TID_Description:"TID_CERB_STATION_HOME_DESCR",ConceptImage:"portrait_CerberusStation",SpawnFleetIntervalSeconds:86400,ShipToSpawn:"CerberusGuardian",ShipLevel:0,MaxHP:15e3,MaxShield:15e3,DPS:100,AttackRange:1e3,Model:"CerberusStation_DrkNeb",WeaponFx:"Gun_Projectile01_Weak",ShieldRegenPerMinute:10,ShieldRegenTimeAfterDamage:3600,MaxShips:3,AwardXP:1e3},HomeSystem2:{Name:"HomeSystem2",TID:"TID_CERB_STATION_HOME2",TID_Description:"TID_CERB_STATION_HOME_DESCR",ConceptImage:"portrait_CerberusStation",SpawnFleetIntervalSeconds:86400,ShipToSpawn:"CerberusGuardian",ShipLevel:0,MaxHP:5e4,MaxShield:5e4,DPS:140,AttackRange:1600,Model:"CerberusStation_DrkNeb_lv2",WeaponFx:"Gun_Projectile01",ShieldRegenPerMinute:14,ShieldRegenTimeAfterDamage:3600,MaxShips:5,AwardXP:3e3},HomeSystem3:{Name:"HomeSystem3",TID:"TID_CERB_STATION_HOME3",TID_Description:"TID_CERB_STATION_HOME_DESCR",ConceptImage:"portrait_CerberusStation",SpawnFleetIntervalSeconds:86400,ShipToSpawn:"CerberusGuardian",ShipLevel:0,MaxHP:9e4,MaxShield:9e4,DPS:200,AttackRange:2400,Model:"CerberusStation_DrkNeb_lv3",WeaponFx:"Gun_Projectile01_Strong",ShieldRegenPerMinute:20,ShieldRegenTimeAfterDamage:3600,MaxShips:7,AwardXP:5e3}};f.Z.CerberusGhosts.GhostSpawnSecs&&(f.Z.CerberusGhosts.GhostSpawnSecs=f.Z.CerberusGhosts.GhostSpawnSecs[0]),f.Z.CerberusColossus.modules[1].SalvageHullPercent&&f.Z.CerberusColossus.modules[1].SalvageHullPercent.pop();const M=["BSScore","BCCost","FuelUseIncrease","TID_Artifact","UnlockBlueprints","UnlockPrice","UnlockTime","WhiteStarScore"],P={components:{Page:v.Z,VContent:T.Z},data(){return{isNebulaBuild:!0,ships:this.getShips("capital_ships.cerberus"),darkShips:this.getShips("capital_ships.darkCerberus"),stations:(0,y.Z)(O,{map:([e,t])=>(t.ShipToSpawn&&(t.ShipToSpawn=this.getShipLocName(t.ShipToSpawn)),[e,t])}),cerberusPortrait:r(6192),darkCerberusPortrait:r(6596),stationPortrait:r(8061)}},methods:{getShips(e){return(0,y.Z)(f.Z,{...(0,I.Z)(e),map:([e,t])=>{if(t.modules&&(t.modules=t.modules.map((e=>(0,y.Z)(e,{filter:([e])=>!M.includes(e)})))),t.OnDestroySpawn){const e=t.OnDestroySpawn,r=String(t.OnDestroySpawnCount);t.OnDestroySpawn=`${r}x ${this.getShipLocName(e)}`,delete t.OnDestroySpawnCount}return[e,t]}})},getShipLocName(e){return e in f.Z?this.$t(f.Z[e].TID):e}}};var R=r(3744);const A=(0,R.Z)(P,[["render",k],["__scopeId","data-v-ceea6290"]]),H=A}}]);