import{j as at,s as W,d as lt,g as ot,aI as ut,aK as it,i as $,a as q,z as rt,aL as ct,r as pt,o as S,b as T,e as U,h as j,f,t as I,u as v,H as ft,F as z,B as N,w as F,A as G,x as dt,S as x,M as Y,J as yt,K as mt,E as Ct,p as gt,q as _t,_ as vt}from"./index-CFubWPy9.js";import{M as Z,a as bt}from"./MultiConfigGUI-37eqWSKH.js";import{o as B,i as J,k as At,v as ht}from"./Data-lTdtglJC.js";import{s as V}from"./globals-zpsYnYkF.js";function Et(d,M){const m=at({actually:{},plan:{},total:{intermediate:{},result:{}}}),C={};for(const a of d)m.total.result[a]=0;const R=M(C,m);return{provideGetterElements:b,output:m,update:o};function b(a){return a(y,C)}function o(a,n){const c=(s,p)=>w(s,([r],_,E)=>A(Object.fromEntries(E),r,a.actually[s],p)),u=(s,p)=>w(s,([,r])=>Array.isArray(r)?r[p-1]:r);n?(h(m.plan,n,c(n,a.plan[n])),h(m.actually,n,u(n,a.actually[n]))):(L(a.plan,m.plan,c),L(a.actually,m.actually,u)),O(m.total);for(const[s,p]of Object.entries(m.plan))if(Object.keys(p).length){for(const r of d)m.total.result[r]+=p[r];R(s,a)}}function w(a,n){return(...c)=>{const[[u]]=c;if(k(C[a][u])){const p=B(C[a][u],{map:(...r)=>[r[0][0],n(...r)]});return[u,p]}const s=n(...c);return[u,s]}}function h(a,n,c){C[n]&&(a[n]=B(C[n],{map:c}))}function L(a,n,c){if(Object.keys(a).length)for(const[u,s]of Object.entries(a))s?h(n,u,c(u,s)):n[u]={};else for(const u of Object.keys(n))delete n[u]}function A(a,n,c,u){const s=a[n],p=c>0?s[c-1]:0;let r=s[u-1];if(!Array.isArray(s))return!c&&u?s:0;if(d.includes(n)){r=0;let _=c>0?c-1:0;for(;_<=u-1;)r+=s[_],_++}return r-p}function O(a){for(const n in a)if(n in a){if(k(a[n])){O(a[n]);continue}a[n]=0}}function y(a,n){const c=St(a);return u(c),c;function u(s){for(const p in s)if(p in s){const r=s[p],_=typeof r[1]=="boolean"?r[0]:r;if(k(_)){const E=y(_,n);Object.keys(E).length?s[p]=E:delete s[p];continue}else if(!(Array.isArray(_)&&_.length==n)&&!d.includes(p)){delete s[p];continue}typeof r[1]=="boolean"&&(s[p]=_)}return s}}}function k(d){return typeof d=="object"&&!Array.isArray(d)&&d!==null}function St(d){const M=W(),m=B(d,{map:([C,R])=>[C,[R,J(C,d.Name)]],filter:([C,[,R]])=>{var b,o;return C.startsWith("_")||J(C,null,{asMeta:!0,asTitle:!1})?!1:(o=(b=M==null?void 0:M.state)==null?void 0:b.userSettings)!=null&&o.disableFilters?!0:!R}});if(d.projectile){const{projectile:C}=m;delete m.projectile,m.projectile=C}return m}const Tt=d=>(gt("data-v-2dc1f263"),d=d(),_t(),d),It={class:"topic"},Mt={class:"total-table"},Rt={key:0,colspan:"3"},wt={class:"buttons"},Lt={class:"reset-buttons"},Ot={class:"settings-modal"},Dt={class:"input-wrap"},Ut=["value"],Ft={class:"input"},Gt={class:"name"},Kt=Tt(()=>f("p",{class:"name"},"Example: Fortify 8 Bond 5",-1)),$t={class:"flex-end margin-bottom"},jt=lt({__name:"Calculator",props:{stackChars:{},calcTotal:{},localStorageKey:{},titleKey:{},input:{}},emits:["update:input","setup"],setup(d,{emit:M}){const m=Z,C=W(),{t:R}=ot(),b=ut(),o=d,w=M,h={key:e=>At(e,b.currentRoute.value.name),value:(e,t)=>ht(e,t,b.currentRoute.value.name)},{provideGetterElements:L,output:A,update:O}=Et(o.stackChars,o.calcTotal),y=new m(o.localStorageKey,{actually:{},plan:{}}),a=it(()=>{_(),E(),y.save()},100),n={output:A,onChangeLvl:K,isSelected:tt,isDisabled:et,outputClasses:nt,forceReCalc:D,format:h,Config:y.store,provideGetterElements:e=>L((...t)=>e(y.TIDs,...t))},c=$(!1),u=$(!1),s=$(""),p=q(()=>R(o.titleKey)),r=q(()=>Object.keys(A.total.result));if(b.currentRoute.value.query.d){const e=Z.parseUrl(b.currentRoute.value.query.d),t={actually:{...e},plan:{...e}};y.add(t,{temporary:!0})}D(),w("setup",n),rt(()=>y.store.selected,()=>{D()});function _(){w("update:input",y.selectedConfig)}function E(e){ct(()=>O(o.input,e))}function D(){_(),E()}async function P(e){if(e.target.name=="all")await C.dispatch(mt.OPEN_CONFIRM,"Reset all ? Are you serious ?").then(()=>{for(const t in o.input)t in o.input&&(y.selectedConfig[t]={})}).catch(()=>{});else if(o.input.plan)for(const t in o.input.plan)t in o.input.plan&&(y.selectedConfig.plan[t]=o.input.actually[t]);E(),y.save()}async function X(){let e={};s.value&&await y.parseString(s.value).then(t=>e=t).catch(t=>{alert(t.message),console.error(t)}),y.add({actually:{...e},plan:{...e}}),s.value="",u.value=!1,D()}function Q(e,t){const l=A.total.intermediate[t];if(e=="plan")return{"yellow-color plus":l.plan,hide:l.plan==0};if(e=="sum"){const i=l.sum>l.actually;return{"green-color ":i,muffle:!i,hide:l.sum==0}}return{}}function K(e,t,l){l=typeof l=="string"?parseInt(l):l,l==0?(delete o.input[e][t],delete A[e][t]):y.selectedConfig[e][t]=l;const i=o.input.plan[t]||0,g=o.input.actually[t];return g>i&&K("plan",t,g),a(),l}function tt(e,t,l){let i=o.input.plan[t]||0;const g=o.input.actually[t];return g>i&&(i=K("plan",t,g)),e=="plan"?l==i:o.input[e][t]==l}function et(e,t,l){return e!="plan"||!o.input.actually?!1:l<o.input.actually[t]}function nt(e,t,l){if(e=="actually")return{none:l&&r.value.includes(l),actually:!0};if(e=="plan"){const i=l?A[e][t][l]:void 0;return{"yellow-color":(o.input.actually[t]?o.input.plan[t]>o.input.actually[t]:!0)&&typeof i!="object",plus:!l||l&&!r.value.includes(l),none:o.input.plan[t]==o.input.actually[t],plan:!0}}return{}}return(e,t)=>{const l=pt("t");return S(),T("div",null,[U(v(ft),null,{default:j(()=>[f("title",null,I(p.value),1)]),_:1}),f("h1",It,I(p.value),1),f("table",Mt,[(S(!0),T(z,null,N(v(A).total.intermediate,(i,g)=>(S(),T("tr",{key:g},[f("td",{class:G([v(V)(g),"stats-style"])},I(h.key(g)),3),(S(!0),T(z,null,N(i,(st,H)=>(S(),T("td",{key:g+H,class:G(Q(H,g))},I(st.toLocaleString("ru-RU")),3))),128))]))),128)),(S(!0),T(z,null,N(v(A).total.result,(i,g)=>(S(),T("tr",{key:g,class:"result"},[f("td",{class:G([v(V)(g),"stats-style"])},I(h.key(g)),3),i>0?(S(),T("td",Rt,[f("b",null,I(h.value(g,i)),1)])):Ct("",!0)]))),128))]),f("div",wt,[f("button",{class:"settings",onClick:t[0]||(t[0]=i=>c.value=!0)}),f("div",Lt,[f("button",{class:"button yellow",name:"plan",onClick:P},I(e.$t("RESET_PLAN")),1),f("button",{class:"button red",name:"all",onClick:P},I(e.$t("RESET_ALL")),1)])]),U(Y,{open:c.value,"onUpdate:open":[t[2]||(t[2]=i=>c.value=i),t[3]||(t[3]=()=>v(y).save())],title:e.$t("CALCULATOR_SETTINGS"),size:v(x).MEDIUM},{body:j(()=>[f("div",Ot,[f("div",Dt,[F(f("p",{class:G(["stats-style",v(V)("CreditStorage")])},null,2),[[l,"TID_PLANET_UPG_CREDIT_YIELD"]]),f("input",{value:e.$store.state.userSettings.calcDayCreditLimit,type:"number",min:"0",onInput:t[1]||(t[1]=i=>e.$store.commit(v(dt).SET_CALC_DAY_CREDIT_LIMIT,parseInt(i.target.value)))},null,40,Ut)]),U(bt,{"on-create-new":()=>u.value=!0,instance:v(y),"data-to-string":v(y).selectedConfig.actually},null,8,["on-create-new","instance","data-to-string"])])]),_:1},8,["open","title","size"]),U(Y,{open:u.value,"onUpdate:open":t[5]||(t[5]=i=>u.value=i),title:e.$t("CREATE"),size:v(x).SMALL},{body:j(()=>[f("div",Ft,[F(f("p",Gt,null,512),[[l,"FROM_TEXT_FORMAT"]]),Kt,F(f("input",{"onUpdate:modelValue":t[4]||(t[4]=i=>s.value=i)},null,512),[[yt,s.value]])]),f("div",$t,[F(f("button",{class:"button green",onClick:X},null,512),[[l,"TID_OK"]])])]),_:1},8,["open","title","size"])])}}}),Bt=vt(jt,[["__scopeId","data-v-2dc1f263"]]);export{Bt as C};