"use strict";(self["webpackChunkhades_space"]=self["webpackChunkhades_space"]||[]).push([[595],{95772:(e,a,l)=>{l.r(a),l.d(a,{default:()=>U});var t=l(66252),n=l(2262),u=l(3577),i=l(70131),s=l(37610),c=l(95893),v=l(91296),d=l.n(v),r=l(77451),o=l(74428),m=l(50930),p=l(11361),_=l(2824);const h={class:"container"},I={class:"input-wrap"},Z=["value"],f=(0,t.aZ)({__name:"NumberPicker",props:{value:{},min:{},max:{}},emits:["update:value"],setup(e,{emit:a}){const l=e;function n(e){e<l.min&&(e=l.min),e>l.max&&(e=l.max),a("update:value",e)}return(e,a)=>((0,t.wg)(),(0,t.iD)("div",h,[(0,t._)("div",{class:"minus",onClick:a[0]||(a[0]=e=>n(l.value-1))}),(0,t._)("div",I,[(0,t._)("input",{type:"text",value:e.value,onChange:a[1]||(a[1]=e=>n(parseInt(e.target.value)))},null,40,Z)]),(0,t._)("div",{class:"plus",onClick:a[2]||(a[2]=e=>n(l.value+1))})]))}});var M=l(83744);const T=(0,M.Z)(f,[["__scopeId","data-v-21e64040"]]),A=T;var g=l(58904),L=l(45715),b=l(32169),O=l(51131),S=l(20128),k=l(78642),P=l(91489);const y=e=>((0,t.dD)("data-v-8c9b55a6"),e=e(),(0,t.Cn)(),e),B={class:"container"},N={class:"modal"},C={class:"title"},w=y((()=>(0,t._)("div",null,null,-1))),x={class:"level-picker"},E=(0,t.aZ)({__name:"CompendiumTech",setup(e){const a={RedStarScanner:O.Z.RedStarScanner,ShipmentRelay:O.Z.ShipmentRelay},l={Transport:L.Z.Transport,Miner:L.Z.Miner,Battleship:L.Z.Battleship},{MaxModuleLevel:v}=g["default"],h=Object.fromEntries([...Object.entries(a).map((([e,a])=>[e,a.Cost.length])),...Object.entries(l).map((([e,a])=>[e,a.BuildCost.length])),...Object.keys(S.Z).map((e=>[e,v])),["AllianceLevel",b.Z.XPRequired.length]]),I=Object.fromEntries([...Object.keys(a).map((e=>[e,0])),...Object.keys(l).map((e=>[e,0])),...Object.entries(S.Z).map((([e,a])=>[e,H(a)])),["AllianceLevel",0]]),Z=d()(((...e)=>c.ZP.setTechLevel(...e)),500),{t:f}=(0,i.QT)(),M=f("HS_COMPENDIUM"),T=(0,n.iH)(!1),y=(0,n.iH)(null),E=(0,n.iH)({}),R=(0,n.qj)({size:m.z.SMALL,title:f("TECHNOLOGIES"),data:{value:{},maxLevel:0,minLevel:0,lastAgoUpdate:0,get key(){return this.value.Name}}}),U=setInterval(W,5e3);function j(e){y.value&&(R.data.value=e,R.data.maxLevel=h[e.Name],R.data.minLevel=I[e.Name],T.value=!0,W())}function D(e){return!z(e)?.level}function $(e){const a=(0,s.mX)(R.data.key);return y.value[a]||(y.value[a]={level:0}),0!=R.data.minLevel&&e==R.data.minLevel&&0!=y.value[a].level&&(e=0),y.value[a].level!=e&&(y.value[a].level=e,Z(a,e),W()),e}function H(e){let a=1;for(const[,l]of Object.entries(e))Array.isArray(l)&&l.length>a&&(a=l.length);return v-a+1}function z(e){return y.value?.[(0,s.mX)(e)]||null}function V(){const e=R.data.value;return e.Icon?(0,t.h)(o.Z,{name:e.Icon,dir:e.specialIcon?"icons":"game/Modules"}):e.Model?(0,t.h)(o.Z,{name:e.Model[z(e.Name)?.level-1||5],dir:"game/Ships"}):e.PrefabModel?(0,t.h)(o.Z,{name:e.PrefabModel,dir:"game/SpaceBuildings"}):void 0}function W(){if(T.value){const e=z(R.data.key)?.ts;e&&(R.data.lastAgoUpdate=(new Date-e)/1e3)}}function X(e){const a=[],l=Math.trunc(e/86400),t=Math.trunc(e%86400/3600),n=Math.trunc(e%3600/60),u=Math.trunc(e%60);return 0!=l&&a.push(`${l}${f("TID_DAY_ABBREVIATION")}`),0!=t&&a.push(`${t}${f("TID_HOUR_ABBREVIATION")}`),0!=n&&a.push(`${n}${f("TID_MINUTE_ABBREVIATION")}`),0!=u&&a.push(`${u}${f("TID_SECOND_ABBREVIATION")}`),a.slice(0,2).join(" ")}return(0,t.bv)((()=>{c.ZP.getUser()&&(y.value=c.ZP.getTechLevels())})),(0,t.Ah)((()=>{clearTimeout(U)})),(0,t.YP)(y,(e=>{e&&(E.value=(0,k.Z)(e,{map:([e,a])=>[(0,P.pc)(e),a.level]}))}),{deep:!0}),c.ZP.on("sync",(e=>y.value=e)),c.ZP.on("connected",(()=>y.value=c.ZP.getTechLevels())),c.ZP.on("disconnected",(()=>{y.value=void 0,E.value=void 0})),(e,a)=>{const l=(0,t.Q2)("t");return(0,t.wg)(),(0,t.j4)(p.Z,null,{default:(0,t.w5)((()=>[(0,t.Wm)((0,n.SU)(r.Fb),null,{default:(0,t.w5)((()=>[(0,t._)("title",null,(0,u.zw)((0,n.SU)(M)),1)])),_:1}),(0,t._)("div",null,[(0,t._)("div",B,[(0,t.Wm)(_.Z,{"on-click":j,"is-muted":D,"level-map":E.value},null,8,["level-map"])]),(0,t.Wm)(m.Z,(0,t.dG)({open:T.value,"onUpdate:open":a[0]||(a[0]=e=>T.value=e)},R),{body:(0,t.w5)((()=>[(0,t._)("div",N,[(0,t._)("div",C,[(0,t._)("div",null,[(0,t._)("h2",null,(0,u.zw)(e.$t(R.data.value.TID)),1),(0,t._)("p",null,(0,u.zw)((0,n.SU)(f)("TID_SOCIAL_TIMESTAMP",[X(R.data.lastAgoUpdate)])),1),w]),(0,t.Wm)(V)]),(0,t.wy)((0,t._)("span",null,null,512),[[l,"CURRENT_LVL"]]),(0,t._)("div",x,[(0,t.Wm)(A,{value:z(R.data.key)?.level||0,min:R.data.minLevel,max:R.data.maxLevel,"onUpdate:value":$},null,8,["value","min","max"])])])])),_:1},16,["open"])])])),_:1})}}}),R=(0,M.Z)(E,[["__scopeId","data-v-8c9b55a6"]]),U=R},32169:(e,a,l)=>{l.d(a,{Z:()=>t});const t={Name:"alliance_levels",XPRequired:[0,1,30,100,250,500,1e3,2e3,3e3,5e3,7e3,9e3,11e3,13e3,16e3,2e4,25e3,32e3,4e4,5e4,6e4],MaxMembers:[25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,40,40,40,40,40],PassiveIncomeModifier:[100,102,104,106,108,110,112,114,116,118,120,122,124,126,128,130,132,134,136,138,140],BaseArtifactYieldBonus:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],MaxArtifactYieldBonus:[0,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60],MaxFlagshipLevel:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]}}}]);