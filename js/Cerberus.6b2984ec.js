"use strict";(self["webpackChunkhades_space"]=self["webpackChunkhades_space"]||[]).push([[362],{14602:(e,t,r)=>{r.d(t,{Z:()=>D});var a=r(66252),s=r(3577),n=r(49963);const i={class:"container"},o={class:"title"},l=["href"],c={key:0},p={key:0,class:"icon"};function u(e,t,r,u,d,S){const _=(0,a.up)("icon"),g=(0,a.up)("v-data");return(0,a.wg)(),(0,a.iD)("div",i,[Object.keys(r.args.data).length>1?((0,a.wg)(),(0,a.iD)(a.HY,{key:0},[(0,a._)("div",o,[(0,a._)("div",{class:(0,s.C_)(["chat-icon",[d.contentOpened?"opened":"closed"]]),onClick:t[0]||(t[0]=e=>d.contentOpened=!d.contentOpened)},null,2)]),(0,a.Wm)(n.uT,null,{default:(0,a.w5)((()=>[d.contentOpened?((0,a.wg)(),(0,a.iD)("ol",{key:0,class:(0,s.C_)(["list",{"with-icons":"iconDir"in r.args}])},[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(r.args.data,(t=>((0,a.wg)(),(0,a.iD)("li",{key:t.Name},[(0,a._)("a",{href:`#${t.Name}`},["iconDir"in r.args?((0,a.wg)(),(0,a.iD)("div",c,[t.PrefabModel||t.Icon||t.Model?((0,a.wg)(),(0,a.iD)("div",p,[(0,a.Wm)(_,{name:S.getRandomIfArr(t.PrefabModel||t.Icon||t.Model),dir:r.args.iconDir},null,8,["name","dir"])])):(0,a.kq)("",!0),(0,a._)("p",null,(0,s.zw)(e.$t(t.TID)),1)])):((0,a.wg)(),(0,a.iD)(a.HY,{key:1},[(0,a.Uk)((0,s.zw)(e.$t(t.TID)),1)],64))],8,l)])))),128))],2)):(0,a.kq)("",!0)])),_:1})],64)):(0,a.kq)("",!0),((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(r.args.data,((e,t)=>((0,a.wg)(),(0,a.j4)(g,{key:t,data:e,"table-opts":r.args.tableOpts,"icon-dir":r.args.iconDir},null,8,["data","table-opts","icon-dir"])))),128))])}var d=r(57190),S=r(48449);const _={components:{VData:d.Z,Icon:S.Z},props:{args:{type:Object,required:!0}},data(){return{contentOpened:!0}},methods:{getRandomIfArr(e){if(Array.isArray(e)){const t=Math.floor(Math.random()*e.length);return e[t]}return e}}};var g=r(83744);const h=(0,g.Z)(_,[["render",u],["__scopeId","data-v-adfe23e4"]]),D=h},10569:(e,t,r)=>{r.d(t,{Z:()=>_});var a=r(66252),s=r(3577);const n={class:"portrait-container"},i=["src","alt"],o={class:"topic"};function l(e,t,r,l,c,p){const u=(0,a.up)("v-head"),d=(0,a.up)("v-content");return(0,a.wg)(),(0,a.iD)("div",null,[(0,a.Wm)(u,null,{default:(0,a.w5)((()=>[(0,a._)("title",null,(0,s.zw)(p.title),1)])),_:1}),(0,a._)("div",n,[r.portrait?((0,a.wg)(),(0,a.iD)("img",{key:0,class:"portrait",src:r.portrait.src,alt:r.portrait.alt},null,8,i)):(0,a.kq)("",!0),(0,a._)("h1",o,(0,s.zw)(p.title),1)]),(0,a.WI)(e.$slots,"default",{},void 0,!0),(0,a.Wm)(d,{args:r.contentArgs},null,8,["args"])])}var c=r(77451),p=r(14602);const u={components:{VHead:c.Fb,VContent:p.Z},props:{contentArgs:{type:Object,required:!0},titleLocKey:{type:String,required:!0},portrait:{type:Object,default:null,validator:e=>["src","alt"].every((t=>t in e))}},computed:{title(){return this.$t(this.titleLocKey)}}};var d=r(83744);const S=(0,d.Z)(u,[["render",l],["__scopeId","data-v-adad4e2a"]]),_=S},28220:(e,t,r)=>{r.r(t),r.d(t,{default:()=>M});var a=r(66252),s=r(3577);const n=e=>((0,a.dD)("data-v-ceea6290"),e=e(),(0,a.Cn)(),e),i={class:"container"},o=n((()=>(0,a._)("h2",null,(0,s.zw)("Categories"),-1))),l={class:"list"},c={key:0},p=n((()=>(0,a._)("a",{href:"#DarkCerberus"},"Dark cerberus",-1))),u=[p],d=n((()=>(0,a._)("li",null,[(0,a._)("a",{href:"#CerberusStations"},"Cerberus stations")],-1))),S={key:0},_={class:"portrait-container"},g=["src"],h={id:"DarkCerberus",class:"topic"},D={href:"#DarkCerberus",class:"link-topic"},m={class:"portrait-container"},C=["src"],b={id:"CerberusStations",class:"topic"},w={href:"#CerberusStations",class:"link-topic"};function k(e,t,r,n,p,k){const v=(0,a.up)("Page"),I=(0,a.up)("v-content"),T=(0,a.Q2)("t");return(0,a.wg)(),(0,a.iD)("div",null,[(0,a.Wm)(v,{"title-loc-key":"CERBERUS","content-args":{data:p.ships,iconDir:"game/Ships"},portrait:{src:p.cerberusPortrait,alt:"cerberus"}},{default:(0,a.w5)((()=>[(0,a._)("div",i,[o,(0,a._)("div",l,[(0,a._)("ol",null,[p.isNebulaBuild?((0,a.wg)(),(0,a.iD)("li",c,u)):(0,a.kq)("",!0),d])])])])),_:1},8,["content-args","portrait"]),p.isNebulaBuild?((0,a.wg)(),(0,a.iD)("div",S,[(0,a._)("div",_,[(0,a._)("img",{class:"portrait",src:p.darkCerberusPortrait,alt:"dark cerberus"},null,8,g),(0,a._)("h1",h,[(0,a._)("a",D,(0,s.zw)("Dark "+e.$t("CERBERUS")),1)])]),(0,a.Wm)(I,{args:{data:p.darkShips,iconDir:"game/Ships"}},null,8,["args"])])):(0,a.kq)("",!0),(0,a._)("div",null,[(0,a._)("div",m,[(0,a._)("img",{class:"portrait",src:p.stationPortrait,alt:"cerberus station"},null,8,C),(0,a._)("h1",b,[(0,a.wy)((0,a._)("a",w,null,512),[[T,"TID_CERB_STATION_HOME2"]])])]),(0,a.Wm)(I,{args:{data:p.stations,iconDir:"game/SpaceBuildings"}},null,8,["args"])])])}var v=r(10569),I=r(14602),T=r(66801),y=r(92022),E=r(45715);const O={HomeSystem1:{Name:"HomeSystem1",TID:"TID_CERB_STATION_HOME1",TID_Description:"TID_CERB_STATION_HOME_DESCR",ConceptImage:"portrait_CerberusStation",SpawnFleetIntervalSeconds:86400,ShipToSpawn:"CerberusGuardian",ShipLevel:0,MaxHP:2e4,MaxShield:2e4,DPS:100,AttackRange:1e3,Model:"CerberusStation",WeaponFx:"Gun_Projectile01_Weak",ShieldRegenPerMinute:10,ShieldRegenTimeAfterDamage:3600,MaxShips:3,AwardXP:1e3},HomeSystem2:{Name:"HomeSystem2",TID:"TID_CERB_STATION_HOME2",TID_Description:"TID_CERB_STATION_HOME_DESCR",ConceptImage:"portrait_CerberusStation",SpawnFleetIntervalSeconds:86400,ShipToSpawn:"CerberusGuardian",ShipLevel:0,MaxHP:5e4,MaxShield:5e4,DPS:140,AttackRange:1600,Model:"CerberusStation_lv2",WeaponFx:"Gun_Projectile01",ShieldRegenPerMinute:14,ShieldRegenTimeAfterDamage:3600,MaxShips:5,AwardXP:3e3},HomeSystem3:{Name:"HomeSystem3",TID:"TID_CERB_STATION_HOME3",TID_Description:"TID_CERB_STATION_HOME_DESCR",ConceptImage:"portrait_CerberusStation",SpawnFleetIntervalSeconds:86400,ShipToSpawn:"CerberusGuardian",ShipLevel:0,MaxHP:9e4,MaxShield:9e4,DPS:200,AttackRange:2400,Model:"CerberusStation_lv3",WeaponFx:"Gun_Projectile01_Strong",ShieldRegenPerMinute:20,ShieldRegenTimeAfterDamage:3600,MaxShips:7,AwardXP:5e3}};E.Z.CerberusGhosts.GhostSpawnSecs&&(E.Z.CerberusGhosts.GhostSpawnSecs=E.Z.CerberusGhosts.GhostSpawnSecs[0]),E.Z.CerberusColossus.modules[1].SalvageHullPercent&&E.Z.CerberusColossus.modules[1].SalvageHullPercent.pop();const P=["BSScore","BCCost","FuelUseIncrease","TID_Artifact","UnlockBlueprints","UnlockPrice","UnlockTime","WhiteStarScore"],f={components:{Page:v.Z,VContent:I.Z},data(){return{isNebulaBuild:!!{NODE_ENV:"production",BASE_URL:"/HadesSpace/",VERSION:"3.2.0"}.VUE_APP_NEBULA_BUILD,ships:this.getShips("capital_ships.cerberus"),darkShips:this.getShips("capital_ships.darkCerberus"),stations:(0,y.Z)(O,{map:([e,t])=>(t.ShipToSpawn&&(t.ShipToSpawn=this.getShipLocName(t.ShipToSpawn)),[e,t])}),cerberusPortrait:r(58339),darkCerberusPortrait:r(17181)(`./${{NODE_ENV:"production",BASE_URL:"/HadesSpace/",VERSION:"3.2.0"}.VUE_APP_NEBULA_BUILD?"portrait_CerberusCarrier":"portrait_CerberusDestroyer"}.png`),stationPortrait:r(62947)}},methods:{getShips(e){return(0,y.Z)(E.Z,{...(0,T.Z)(e),map:([e,t])=>{if(t.modules&&(t.modules=t.modules.map((e=>(0,y.Z)(e,{filter:([e])=>!P.includes(e)})))),t.OnDestroySpawn){const e=t.OnDestroySpawn,r=String(t.OnDestroySpawnCount);t.OnDestroySpawn=`${r}x ${this.getShipLocName(e)}`,delete t.OnDestroySpawnCount}return[e,t]}})},getShipLocName(e){return e in E.Z?this.$t(E.Z[e].TID):e}}};var A=r(83744);const R=(0,A.Z)(f,[["render",k],["__scopeId","data-v-ceea6290"]]),M=R}}]);