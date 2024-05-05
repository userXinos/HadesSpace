import{d as q,g as F,i as O,j as D,S as C,a as g,k as K,r as X,o as Z,c as J,h as u,e as s,f as n,t as _,u as r,H as Q,w as k,m as y,M as N,n as W,l as Y,p as E,q as I,I as L,s as ee,v as ae,_ as te}from"./index-Q2u_jA1O.js";import{c as ne}from"./compendiumTechList-ClYepeq1.js";import{s as oe}from"./sec2str-q48Tz-Qf.js";import{m as x,g as se,t as le}from"./ModulePage.vue_vue_type_script_setup_true_lang-CUyggLMa.js";import{C as ie}from"./CompendiumPage-C4JFZUjT.js";import{T as re}from"./TechList-BFYsFFRj.js";import{N as ce}from"./NumberPicker-BIaelThf.js";import{V as de}from"./Data-DFSuyNen.js";import{g as me}from"./globals-rLCyQm-J.js";import{s as h}from"./capital_ships-BOrq68-Q.js";import{a as pe}from"./alliance_levels-B_mmXvbC.js";import{s as B}from"./spacebuildings-iMzfIrfg.js";import"./Page-DouUPVe0.js";import"./byTypes-DiOuyN-I.js";const ue=c=>(ee("data-v-cfd2a4c9"),c=c(),ae(),c),ve={class:"container"},fe={class:"modal"},ge={class:"title"},_e=ue(()=>n("div",null,null,-1)),Ie={class:"level-picker"},Le=q({__name:"CompendiumTech",setup(c){const M={RedStarScanner:B.RedStarScanner,ShipmentRelay:B.ShipmentRelay},T={Transport:h.Transport,Miner:h.Miner,Battleship:h.Battleship},{MaxModuleLevel:P}=me,A=Object.fromEntries([...Object.entries(M).map(([e,a])=>[e,a.Cost.length]),...Object.entries(T).map(([e,a])=>[e,a.BuildCost.length]),...Object.keys(x).map(e=>[e,P]),["AllianceLevel",pe.XPRequired.length]]),R=Object.fromEntries([...Object.keys(M).map(e=>[e,0]),...Object.keys(T).map(e=>[e,0]),...Object.entries(x).map(([e,a])=>[e,se(a)]),["AllianceLevel",0]]),{data:o,levelMap:j,setTechLevel:U}=ne(),{t:d}=F(),w=d("HS_COMPENDIUM"),m=O(!1),v=O(!1),t=D({size:C.SMALL,title:d("TECHNOLOGIES"),data:{value:{},maxLevel:0,minLevel:0,lastAgoUpdate:0,get key(){return this.value.Name}}}),S=D({size:C.LARGE,title:d("TECHNOLOGIES"),data:{data:g(()=>t.data.value),iconDir:g(()=>b(t.data.value)),tableOpts:g(le)}}),H=setInterval(f,5e3);K(()=>{clearTimeout(H)});function V(e){o.value&&(t.data.value=e,t.data.maxLevel=A[e.Name],t.data.minLevel=R[e.Name],m.value=!0,f())}function G(e){var a;return!((a=p(e))!=null&&a.level)}function z(e){const a=E(t.data.key);return o.value[a]||(o.value[a]={level:0}),t.data.minLevel!=0&&e==t.data.minLevel&&o.value[a].level!=0&&(e=0),o.value[a].level!=e&&(o.value[a].level=e,U(a,e),f()),e}function p(e){var a;return((a=o.value)==null?void 0:a[E(e)])||null}function $(){var i;const e=t.data.value,a=b(e);if(e.Icon)return I(L,{name:e.Icon,dir:a});if(e.Model)return I(L,{name:e.Model[((i=p(e.Name))==null?void 0:i.level)-1||5],dir:a});if(e.PrefabModel)return I(L,{name:e.PrefabModel,dir:a})}function b(e){if(e.Icon)return e.specialIcon?"icons":"game/Modules";if(e.Model)return"game/Ships";if(e.PrefabModel)return"game/SpaceBuildings"}function f(){var e;if(m.value){const a=(e=p(t.data.key))==null?void 0:e.ts;a&&(t.data.lastAgoUpdate=(new Date().getTime()-a)/1e3)}}return(e,a)=>{const i=X("t");return Z(),J(ie,null,{default:u(()=>[s(r(Q),null,{default:u(()=>[n("title",null,_(r(w)),1)]),_:1}),n("div",null,[n("div",ve,[s(re,{"on-click":V,"is-muted":G,"level-map":r(j)},null,8,["level-map"])]),s(N,y({open:m.value,"onUpdate:open":a[1]||(a[1]=l=>m.value=l)},t),{body:u(()=>{var l;return[n("div",fe,[n("div",ge,[n("div",null,[n("h2",null,_(e.$t(t.data.value.TID)),1),n("p",null,_(r(d)("TID_SOCIAL_TIMESTAMP",[r(oe)(t.data.lastAgoUpdate)])),1),k(n("button",{class:"button accent",onClick:a[0]||(a[0]=he=>v.value=!0)},null,512),[[i,"TID_MORE_INFO_BTN"]]),_e]),s($)]),k(n("span",null,null,512),[[i,"CURRENT_LVL"]]),n("div",Ie,[s(ce,{value:((l=p(t.data.key))==null?void 0:l.level)||0,min:t.data.minLevel,max:t.data.maxLevel,"onUpdate:value":z},null,8,["value","min","max"])])])]}),_:1},16,["open"]),s(N,y({open:v.value,"onUpdate:open":a[2]||(a[2]=l=>v.value=l)},S),{body:u(()=>[s(de,W(Y(S.data)),null,16)]),_:1},16,["open"])])]),_:1})}}}),Ae=te(Le,[["__scopeId","data-v-cfd2a4c9"]]);export{Ae as default};
