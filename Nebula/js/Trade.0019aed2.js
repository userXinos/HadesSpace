"use strict";(self["webpackChunkhades_space"]=self["webpackChunkhades_space"]||[]).push([[683],{2741:(t,e,r)=>{r.d(e,{Z:()=>_,V:()=>c});var a=r(6252);function o(t,e,r,o,n,s){const p=(0,a.up)("Page");return(0,a.wg)(),(0,a.j4)(p,{"title-loc-key":n.locKey,"content-args":{data:n.data,iconDir:"game/Modules",tableOpts:s.tableOpts},portrait:{src:n.img,alt:`${r.type} modules`}},null,8,["title-loc-key","content-args","portrait"])}var n=r(6790),s=r(5284),p=r(2206),i=r(2022);const{MaxModuleLevel:l}=p.Z,d=!0,T={Trade:"TID_TRADEITEM_ARTIFACT_UTILITY",Mining:"TID_TRADEITEM_ARTIFACT_UTILITY",Shield:"TID_TRADEITEM_ARTIFACT_COMBAT",Weapon:"TID_TRADEITEM_ARTIFACT_COMBAT",Support:"TID_TRADEITEM_ARTIFACT_SUPPORT"},u=(0,i.Z)(s.Z,{filter:([,t])=>!t.Hide,sort:([,t],[,e])=>d?t.RSLevel-e.RSLevel:t.AwardLevel-e.AwardLevel}),c=t=>(0,i.Z)(u,{filter:([,e])=>e.SlotType===t}),h={components:{Page:n.Z},props:{type:{type:String,required:!0},portrait:{type:String,required:!0},postFilter:{type:Function,default:t=>t}},data(){return{data:this.postFilter(this.addArtifactName(c(this.type))),img:r(5691)(`./${this.portrait}.png`),locKey:`TYPE_MOD_${this.type.toUpperCase()}`}},computed:{tableOpts(){const t=new Map;return{get colLvlStartAt(){if(d&&this.data?.body?.default){const e=this.data.body.default;t.has(e)||t.set(e,0);const r=t.get(e);if(r<1){let r=0;for(const t of this.data.body.default)r=r<t.length?t.length-1:r;return t.set(e,r),l-r}return l-r}return 1}}}},methods:{addArtifactName(t){for(const e of Object.values(t))e.SlotType&&e.RSLevel&&(e.artifact=`${this.$t(T[e.SlotType])} ${this.$t("TID_LEVEL_GENERIC",[e.RSLevel]).toLowerCase()}`);return t}}};var f=r(3744);const A=(0,f.Z)(h,[["render",o]]),_=A},427:(t,e,r)=>{r.r(e),r.d(e,{default:()=>l});var a=r(6252);function o(t,e,r,o,n,s){const p=(0,a.up)("ModulePage");return(0,a.wg)(),(0,a.j4)(p,{type:"Trade",portrait:"portrait_ShipmentDrone","post-filter":s.postFilter},null,8,["post-filter"])}var n=r(2741);const s={components:{ModulePage:n.Z},methods:{postFilter(t){const e={...t.ShipmentDrone};return e.DroneShipmentBonusMax=e.DroneShipmentBonus.map(((t,r)=>(e.SpawnCapacity[r]-1)*t)),delete e.PreventUseOnWsJumpgate,t.ShipmentDrone=e,t}}};var p=r(3744);const i=(0,p.Z)(s,[["render",o]]),l=i}}]);