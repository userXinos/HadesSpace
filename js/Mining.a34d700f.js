"use strict";(self["webpackChunkhades_space"]=self["webpackChunkhades_space"]||[]).push([[837],{12741:(t,e,r)=>{r.d(e,{Z:()=>f,V:()=>u});var a=r(66252);function o(t,e,r,o,s,n){const i=(0,a.up)("Page");return(0,a.wg)(),(0,a.j4)(i,{"title-loc-key":s.locKey,"content-args":{data:s.data,iconDir:"game/Modules",tableOpts:n.tableOpts},portrait:{src:s.img,alt:`${r.type} modules`}},null,8,["title-loc-key","content-args","portrait"])}var s=r(6790),n=r(20128),i=r(58904),l=r(92022);const{MaxModuleLevel:p}=i.Z,d=!!{NODE_ENV:"production",BASE_URL:"/HadesSpace/"}.VUE_APP_NEBULA_BUILD,c={Trade:"TID_TRADEITEM_ARTIFACT_UTILITY",Mining:"TID_TRADEITEM_ARTIFACT_UTILITY",Shield:"TID_TRADEITEM_ARTIFACT_COMBAT",Weapon:"TID_TRADEITEM_ARTIFACT_COMBAT",Support:"TID_TRADEITEM_ARTIFACT_SUPPORT"},T=(0,l.Z)(n.Z,{filter:([,t])=>!t.Hide,sort:([,t],[,e])=>d?t.RSLevel-e.RSLevel:t.AwardLevel-e.AwardLevel}),u=t=>(0,l.Z)(T,{filter:([,e])=>e.SlotType===t}),_={components:{Page:s.Z},props:{type:{type:String,required:!0},portrait:{type:String,required:!0},postFilter:{type:Function,default:t=>t}},data(){return{data:this.postFilter(this.addArtifactName(u(this.type))),img:r(17181)(`./${this.portrait}.png`),locKey:`TYPE_MOD_${this.type.toUpperCase()}`}},computed:{tableOpts(){const t=new Map;return{get colLvlStartAt(){if(d&&this.data?.body?.default){const e=this.data.body.default;t.has(e)||t.set(e,0);const r=t.get(e);if(r<1){let r=0;for(const t of this.data.body.default)r=r<t.length?t.length-1:r;return t.set(e,r),p-r}return p-r}return 1}}}},methods:{addArtifactName(t){for(const e of Object.values(t))e.SlotType&&e.RSLevel&&(e.artifact=`${this.$t(c[e.SlotType])} ${this.$t("TID_LEVEL_GENERIC",[e.RSLevel]).toLowerCase()}`);return t}}};var A=r(83744);const I=(0,A.Z)(_,[["render",o]]),f=I},84744:(t,e,r)=>{r.r(e),r.d(e,{default:()=>p});var a=r(66252);function o(t,e,r,o,s,n){const i=(0,a.up)("ModulePage");return(0,a.wg)(),(0,a.j4)(i,{type:"Mining",portrait:"portrait_Asteroids_cr"})}var s=r(12741);const n={components:{ModulePage:s.Z}};var i=r(83744);const l=(0,i.Z)(n,[["render",o]]),p=l}}]);