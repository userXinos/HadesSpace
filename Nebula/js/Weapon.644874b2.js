"use strict";(self["webpackChunkhades_space"]=self["webpackChunkhades_space"]||[]).push([[749],{2741:(t,e,a)=>{a.d(e,{Z:()=>I,V:()=>u});var r=a(6252);function o(t,e,a,o,s,n){const l=(0,r.up)("Page");return(0,r.wg)(),(0,r.j4)(l,{"title-loc-key":s.locKey,"content-args":{data:s.data,iconDir:"game/Modules",tableOpts:n.tableOpts},portrait:{src:s.img,alt:`${a.type} modules`}},null,8,["title-loc-key","content-args","portrait"])}var s=a(6790),n=a(5284),l=a(2206),i=a(2022);const{MaxModuleLevel:p}=l.Z,d=!0,T={Trade:"TID_TRADEITEM_ARTIFACT_UTILITY",Mining:"TID_TRADEITEM_ARTIFACT_UTILITY",Shield:"TID_TRADEITEM_ARTIFACT_COMBAT",Weapon:"TID_TRADEITEM_ARTIFACT_COMBAT",Support:"TID_TRADEITEM_ARTIFACT_SUPPORT"},c=(0,i.Z)(n.Z,{filter:([,t])=>!t.Hide,sort:([,t],[,e])=>d?t.RSLevel-e.RSLevel:t.AwardLevel-e.AwardLevel}),u=t=>(0,i.Z)(c,{filter:([,e])=>e.SlotType===t}),A={components:{Page:s.Z},props:{type:{type:String,required:!0},portrait:{type:String,required:!0},postFilter:{type:Function,default:t=>t}},data(){return{data:this.postFilter(this.addArtifactName(u(this.type))),img:a(5691)(`./${this.portrait}.png`),locKey:`TYPE_MOD_${this.type.toUpperCase()}`}},computed:{tableOpts(){const t=new Map;return{get colLvlStartAt(){if(d&&this.data?.body?.default){const e=this.data.body.default;t.has(e)||t.set(e,0);const a=t.get(e);if(a<1){let a=0;for(const t of this.data.body.default)a=a<t.length?t.length-1:a;return t.set(e,a),p-a}return p-a}return 1}}}},methods:{addArtifactName(t){for(const e of Object.values(t))e.SlotType&&e.RSLevel&&(e.artifact=`${this.$t(T[e.SlotType])} ${this.$t("TID_LEVEL_GENERIC",[e.RSLevel]).toLowerCase()}`);return t}}};var _=a(3744);const h=(0,_.Z)(A,[["render",o]]),I=h},2817:(t,e,a)=>{a.r(e),a.d(e,{default:()=>p});var r=a(6252);function o(t,e,a,o,s,n){const l=(0,r.up)("ModulePage");return(0,r.wg)(),(0,r.j4)(l,{type:"Weapon",portrait:"portrait_WhiteStar"})}var s=a(2741);const n={components:{ModulePage:s.Z}};var l=a(3744);const i=(0,l.Z)(n,[["render",o]]),p=i}}]);