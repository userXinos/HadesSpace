"use strict";(self["webpackChunkhades_space"]=self["webpackChunkhades_space"]||[]).push([[677],{26750:(e,t,r)=>{r.d(t,{Z:()=>g,V:()=>u});var a=r(66252);function l(e,t,r,l,o,n){const s=(0,a.up)("Page");return(0,a.wg)(),(0,a.j4)(s,{"title-loc-key":o.locKey,"content-args":{data:o.data,iconDir:"game/Modules"},portrait:{src:o.img,alt:`${r.type} modules`}},null,8,["title-loc-key","content-args","portrait"])}var o=r(17346),n=r(20128),s=r(92022);const p=(0,s.Z)(n.Z,{filter:([,e])=>!e.Hide,sort:([,e],[,t])=>e.AwardLevel-t.AwardLevel}),u=e=>(0,s.Z)(p,{filter:([,t])=>t.SlotType===e}),i={components:{Page:o.Z},props:{type:{type:String,requested:!0,default:null},portrait:{type:String,requested:!0,default:null},postFilter:{type:Function,requested:!1,default:e=>e}},data(){return{data:this.postFilter(u(this.type)),img:r(17181)(`./${this.portrait}.png`),locKey:`TYPE_MOD_${this.type.toUpperCase()}`}}};var c=r(83744);const d=(0,c.Z)(i,[["render",l]]),g=d},39857:(e,t,r)=>{r.r(t),r.d(t,{default:()=>u});var a=r(66252);function l(e,t,r,l,o,n){const s=(0,a.up)("ModulePage");return(0,a.wg)(),(0,a.j4)(s,{type:"Support",portrait:"portrait_AlphaDrone","post-filter":n.postFilter},null,8,["post-filter"])}var o=r(26750);const n={components:{ModulePage:o.Z},methods:{postFilter(e){const t={...e.Salvage};return t.SalvageHullPercent&&(t.SalvageHullPercent={RS:t.SalvageHullPercent[0],WS:t.SalvageHullPercent[1]},e.Salvage=t),e}}};var s=r(83744);const p=(0,s.Z)(n,[["render",l]]),u=p}}]);