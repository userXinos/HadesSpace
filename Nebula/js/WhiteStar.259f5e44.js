"use strict";(self["webpackChunkhades_space"]=self["webpackChunkhades_space"]||[]).push([[670],{2578:(t,e,a)=>{a.d(e,{Z:()=>m});var r=a(6252),n=a(3577),i=a(9963);const l=t=>((0,r.dD)("data-v-3eae0739"),t=t(),(0,r.Cn)(),t),s={class:"container"},o={class:"title"},c=l((()=>(0,r._)("div",null,null,-1))),d=[c],p=["href"];function u(t,e,a,l,c,u){const g=(0,r.up)("v-data"),v=(0,r.Q2)("t");return(0,r.wg)(),(0,r.iD)("div",s,[Object.keys(a.args.data).length>1?((0,r.wg)(),(0,r.iD)(r.HY,{key:0},[(0,r._)("div",o,[(0,r._)("h2",null,(0,n.zw)(t.$t("CONTENT")),1),(0,r._)("div",{class:(0,n.C_)(["hamburger-icon",{opened:c.contentOpened}]),onClick:e[0]||(e[0]=t=>c.contentOpened=!c.contentOpened)},d,2)]),c.contentOpened?((0,r.wg)(),(0,r.j4)(i.W3,{key:0,tag:"ol",class:"list"},{default:(0,r.w5)((()=>[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(a.args.data,(({Name:t,TID:e})=>((0,r.wg)(),(0,r.iD)("li",{key:t},[(0,r.wy)((0,r._)("a",{href:`#${t}`},null,8,p),[[v,e]])])))),128))])),_:1})):(0,r.kq)("",!0)],64)):(0,r.kq)("",!0),((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(a.args.data,((t,e)=>((0,r.wg)(),(0,r.j4)(g,{key:e,data:t,"table-opts":a.args.tableOpts,"icon-dir":a.args.iconDir},null,8,["data","table-opts","icon-dir"])))),128))])}var g=a(6003);const v={components:{VData:g.Z},props:{args:{type:Object,required:!0}},data(){return{contentOpened:!1}}};var f=a(3744);const h=(0,f.Z)(v,[["render",u],["__scopeId","data-v-3eae0739"]]),m=h},6790:(t,e,a)=>{a.d(e,{Z:()=>v});var r=a(6252),n=a(3577);const i={class:"portrait-container"},l=["src","alt"],s={class:"topic"};function o(t,e,a,o,c,d){const p=(0,r.up)("Head"),u=(0,r.up)("v-content");return(0,r.wg)(),(0,r.iD)("div",null,[(0,r.Wm)(p,null,{default:(0,r.w5)((()=>[(0,r._)("title",null,(0,n.zw)(d.title),1)])),_:1}),(0,r._)("div",i,[a.portrait?((0,r.wg)(),(0,r.iD)("img",{key:0,class:"portrait",src:a.portrait.src,alt:a.portrait.alt},null,8,l)):(0,r.kq)("",!0),(0,r._)("h1",s,(0,n.zw)(d.title),1)]),(0,r.WI)(t.$slots,"default",{},void 0,!0),(0,r.Wm)(u,{args:a.contentArgs},null,8,["args"])])}var c=a(1232),d=a(2578);const p={components:{Head:c.Fb,VContent:d.Z},props:{contentArgs:{type:Object,required:!0},titleLocKey:{type:String,required:!0},portrait:{type:Object,default:null,validator:t=>["src","alt"].every((e=>e in t))}},computed:{title(){return this.$t(this.titleLocKey)}}};var u=a(3744);const g=(0,u.Z)(p,[["render",o],["__scopeId","data-v-166aea6b"]]),v=g},2598:(t,e,a)=>{a.r(e),a.d(e,{default:()=>f});var r=a(6252);function n(t,e,a,n,i,l){const s=(0,r.up)("Page"),o=(0,r.up)("v-data");return(0,r.wg)(),(0,r.iD)("div",null,[(0,r.Wm)(s,{"title-loc-key":"TID_WHITE_STAR","content-args":{data:i.stars,iconDir:"game/Stars",tableOpts:{lvlColKey:"№"}},portrait:{src:i.img,alt:"whiteStars"}},null,8,["content-args","portrait"]),(0,r.Wm)(o,{data:i.planets,"table-opts":{lvlColKey:"№"}},null,8,["data"])])}var i=a(6790),l=a(6003),s=a(6577),o=a(1355),c=a(9413);const d=s.Z.WhiteStar;d.Lifetime=d.Lifetime*d.TimeSlowdownFactor;const p=(0,c.Z)(o.Z,{filterByType:{path:"planets.whitestar"}});p.TID="PLANETS",p.Name="Planets",["CreditIncomeModifier","CreditShipmentModifier","CreditStorageModifier","FuelIncomeModifier","FuelShipmentModifier","FuelStorageModifier","MaxUpgradeLevel","ShipmentsPerHour","ConceptImage"].forEach((t=>delete p[t]));const u={components:{Page:i.Z,VData:l.Z},data(){return{stars:{ws:d},planets:p,img:a(4577)}}};var g=a(3744);const v=(0,g.Z)(u,[["render",n],["__scopeId","data-v-358d5996"]]),f=v},9413:(t,e,a)=>{a.d(e,{Z:()=>n});var r=a(5888);function n(t,{filterByType:{path:e}}){const a={},n=e?e.split(".").reduce(((t,e)=>t[e]),r.Z):null;return Object.entries(t).filter((([t])=>!n||n.includes(t))).sort((([t],[e])=>n?n.indexOf(t)-n.indexOf(e):0)).forEach((([,t])=>{Object.entries(t).forEach((([t,e])=>{t in a?Array.isArray(a[t])?a[t].push(e):a[t]=[a[t],e]:a[t]=e}))})),a}}}]);