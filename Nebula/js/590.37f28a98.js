"use strict";(self["webpackChunkhades_space"]=self["webpackChunkhades_space"]||[]).push([[590],{1590:(e,t,n)=>{n.d(t,{Z:()=>B});var l=n(6252),o=n(2262),a=n(3577),s=n(9963),i=n(6513),r=n(7928),c=n(7451),u=n(1322);const p={class:"wrap"},f={key:0,class:"container"},d={class:"buttons"},g=(0,l.aZ)({__name:"TheConfirm",emits:["setShow"],setup(e,{emit:t}){const n=(0,o.iH)(""),i=(0,o.iH)(!1);let r,c;function g(){h(c)}function y(e){return i.value=!0,n.value=e,new Promise(((e,t)=>{r=e,c=t}))}function h(e){e(),i.value=!1,r=()=>null,c=()=>null}return t("setShow",y),(e,t)=>{const y=(0,l.Q2)("t");return(0,l.wg)(),(0,l.j4)(u.Z,{title:"Confirm",open:i.value,"onUpdate:open":g},{default:(0,l.w5)((()=>[(0,l.Wm)(s.uT,null,{default:(0,l.w5)((()=>[(0,l._)("div",p,[i.value?((0,l.wg)(),(0,l.iD)("div",f,[(0,l.Uk)((0,a.zw)(n.value)+" ",1),(0,l._)("div",d,[(0,l.wy)((0,l._)("button",{onClick:t[0]||(t[0]=e=>h((0,o.SU)(c)))},null,512),[[y,"TID_CANCEL"]]),(0,l.wy)((0,l._)("button",{onClick:t[1]||(t[1]=e=>h((0,o.SU)(r)))},null,512),[[y,"TID_OK"]])])])):(0,l.kq)("",!0)])])),_:1})])),_:1},8,["open"])}}});var y=n(3744);const h=(0,y.Z)(g,[["__scopeId","data-v-7472dee3"]]),_=h;var m=n(3013),v=n(6216),w=n(8642),b=n(4078);function C(e,t){const n=(0,o.qj)({actually:{},plan:{},total:{intermediate:{},result:{}}}),l={};for(const o of e)n.total.result[o]=0;const a=t(l,n);return{provideGetterElements:s,output:n,update:i};function s(e){return e(d,l)}function i(t,l){const o=(e,n)=>r(e,(([l],o,a)=>p(Object.fromEntries(a),l,t.actually[e],n))),s=(e,t)=>r(e,(([,e])=>Array.isArray(e)?e[t-1]:e));l?(c(n.plan,l,o(l,t.plan[l])),c(n.actually,l,s(l,t.actually[l]))):(u(t.plan,n.plan,o),u(t.actually,n.actually,s)),f(n.total);for(const[i,r]of Object.entries(n.plan))if(Object.keys(r).length){for(const t of e)n.total.result[t]+=r[t];a(i,t)}}function r(e,t){return(...n)=>{const[[o]]=n;if(S(l[e][o])){const n=(0,w.Z)(l[e][o],{map:(...e)=>[e[0][0],t(...e)]});return[o,n]}const a=t(...n);return[o,a]}}function c(e,t,n){l[t]&&(e[t]=(0,w.Z)(l[t],{map:n}))}function u(e,t,n){if(Object.keys(e).length)for(const[l,o]of Object.entries(e))o?c(t,l,n(l,o)):t[l]={};else for(const l of Object.keys(t))delete t[l]}function p(t,n,l,o){const a=t[n],s=l>0?a[l-1]:0;let i=a[o-1];if(!Array.isArray(a))return!l&&o?a:0;if(e.includes(n)){i=0;let e=l>0?l-1:0;while(e<=o-1)i+=a[e],e++}return i-s}function f(e){for(const t in e)if(t in e){if(S(e[t])){f(e[t]);continue}e[t]=0}}function d(t,n){const l=(0,b.K)(t);return o(l),l;function o(t){for(const l in t)if(l in t){const o=t[l],a="boolean"==typeof o[1]?o[0]:o;if(S(a)){const e=d(a,n);Object.keys(e).length?t[l]=e:delete t[l];continue}if((!Array.isArray(a)||a.length!=n)&&!e.includes(l)){delete t[l];continue}"boolean"==typeof o[1]&&(t[l]=a)}return t}}}function S(e){return"object"===typeof e&&!Array.isArray(e)&&null!==e}const E={crush:(e,t=50)=>{const n="",l=(e,l)=>{let o=l.length,a="";const s=e=>encodeURI(encodeURIComponent(e)).replace(/%../g,"i").length,i=e=>{let t=e.charCodeAt(0),n=e.charCodeAt(e.length-1);return t>=56320&&t<=57343||n>=55296&&n<=56319};let r={};for(let n=2;n<t;n++)for(let t=0;t<e.length-n;++t){let l=e.substr(t,n);if(r[l])continue;if(i(l))continue;let o=1;for(let a=e.indexOf(l,t+n);a>=0;++o)a=e.indexOf(l,a+n);o>1&&(r[l]=o)}while(1){for(;o--&&e.includes(l[o]););if(o<0)break;let t,i=l[o],c=0,u=s(i);for(let e in r){let l=r[e],o=(l-1)*s(e)-(l+1)*u;a.length||(o-=s(n)),o<=0?delete r[e]:o>c&&(t=e,c=o)}if(!t)break;e=e.split(t).join(i)+i+t,a=i+a;let p={};for(let n in r){let l=n.split(t).join(i),o=0;for(let t=e.indexOf(l);t>=0;++o)t=e.indexOf(l,t+l.length);o>1&&(p[l]=o)}r=p}return{a:e,b:a}};let o=[];const a="-_.!~*'()";for(let r=127;--r;)(r>=48&&r<=57||r>=65&&r<=90||r>=97&&r<=122||a.includes(String.fromCharCode(r)))&&o.push(String.fromCharCode(r));for(let r=32;r<255;++r){let e=String.fromCharCode(r);"\\"==e||o.includes(e)||o.unshift(e)}e=e.replace(new RegExp(n,"g"),""),e=k(e);const s=l(e,o);let i=s.a;return s.b.length&&(i+=n+s.b),i+="_",i},uncrush:e=>{e=e.substring(0,e.length-1);const t=e.split("");let n=t[0];if(t.length>1){let e=t[1];for(let t of e){let e=n.split(t);n=e.join(e.pop())}}return k(n,0)}},k=(e,t=1)=>{const n=[['"',"'"],["':","!"],[",'","~"],["}",")","\\","\\"],["{","(","\\","\\"]],l=(e,t)=>{let n=new RegExp(`${(t[2]?t[2]:"")+t[0]}|${(t[3]?t[3]:"")+t[1]}`,"g");return e.replace(n,(e=>e===t[0]?t[1]:t[0]))};if(t)for(let o=0;o<n.length;++o)e=l(e,n[o]);else for(let o=n.length;o--;)e=l(e,n[o]);return e},O="new entry",T="en";class U{localStoreKey;store;TIDs={};constructor(e){this.localStoreKey=e,this.store=(0,o.qj)({configs:[],selected:0}),this.load()}get selectedConfig(){return this.store.configs[this.store.selected].value}load(){const e=JSON.parse(localStorage.getItem(this.localStoreKey)||"{}");e.configs?Object.assign(this.store,e):Object.keys(e).length&&e.actually&&e.plan?this.add(e):this.add()}save(){localStorage.setItem(this.localStoreKey,JSON.stringify(this.store))}removeSelected(){this.store.configs.splice(this.store.selected,1),0!=this.store.configs.length?this.store.selected=this.store.configs.length-1:this.add()}add(e,{temporary:t}={temporary:!1}){const n=this.store;let l,o=0;do{l=o?`${O} #${o}`:O,o++}while(n.configs.length&&n.configs.some((e=>e.name==l)));n.configs=[...n.configs,{name:l,value:e||{actually:{},plan:{}}}],n.selected=n.configs.length-1,t||this.save()}async parseString(e){const t=[];i["default"].global.availableLocales.includes(T)||await(0,i.J)(T);for(const[n,l]of Object.entries(this.TIDs)){const o=i["default"].global.t(l,T),a=new RegExp(`${o}\\s+?(\\d+)\\s?`,"mi"),[,s]=e.match(a)||[void 0,"0"];t.push([n,parseInt(s)])}return Object.fromEntries(t.filter((([,e])=>e)))}stringifyUrl(){const e=JSON.stringify(this.selectedConfig.actually);return E.crush(e)}parseUrl(e){return JSON.parse(E.uncrush(e))}}const A=e=>((0,l.dD)("data-v-1e008246"),e=e(),(0,l.Cn)(),e),D={class:"topic"},I={class:"total-table"},j={key:0,colspan:"3"},R={class:"buttons"},z={class:"reset-buttons"},L={class:"settings-modal"},x={class:"config-category"},Z={class:"flex-end"},$={class:"select"},K={class:"name"},N=["value"],H={class:"input"},M={class:"name"},F=["placeholder"],G={class:"flex-end margin-bottom"},P={class:"input"},Y={class:"name"},q=A((()=>(0,l._)("p",{class:"name"},"Example: Fortify 8 Bond 5",-1))),J={class:"flex-end margin-bottom"},W=(0,l.aZ)({__name:"Calculator",props:{stackChars:{},calcTotal:{},localStorageKey:{},titleKey:{},input:{}},emits:["update:input","setup"],setup(e,{emit:t}){const n=e,{t:p}=i["default"].global,f=!0,d={key:e=>(0,v.Z)(e,r.Z.currentRoute.name),value:(e,t)=>(0,m.Z)(e,t,r.Z.currentRoute.value.name)},{provideGetterElements:g,output:y,update:h}=C(n.stackChars,n.calcTotal),w=new U(n.localStorageKey),b={output:y,onChangeLvl:se,isSelected:ie,isDisabled:re,outputClasses:ce,format:d,provideGetterElements:e=>g(((...t)=>e(w.TIDs,...t)))};let S=()=>Promise.prototype;const E=(0,o.iH)(!1),k=(0,o.iH)(!1),O=(0,o.iH)(""),T=(0,o.iH)({text:p("COPY"),color:"yellow"}),A=(0,l.Fl)((()=>p(n.titleKey))),W=(0,l.Fl)((()=>Object.keys(y.total.result))),V=(0,l.Fl)((()=>`${location.origin}${location.pathname}`));if(r.Z.currentRoute.value.query.d){const e=w.parseUrl(r.Z.currentRoute.value.query.d),t={actually:e,plan:e};w.add(t,{temporary:!0}),r.Z.replace({path:`${location.pathname}`})}function B(e){S=e}function Q(){t("update:input",w.selectedConfig)}function X(e){(0,l.Y3)((()=>h(n.input,e)))}function ee(){Q(),X()}async function te(e){if("all"==e.target.name)await S("Reset all ? Are you serious ?").then((()=>{for(const e in n.input)e in n.input&&(w.selectedConfig[e]={})})).catch((()=>{}));else if(n.input.plan)for(const t in n.input.plan)t in n.input.plan&&(w.selectedConfig.plan[t]=n.input.actually[t]);X(),w.save()}async function ne(){const{name:e}=w.store.configs[w.store.selected];await S(p("REMOVE_CONFIG",[e])).then((()=>{w.removeSelected(),ee()})).catch((()=>{}))}async function le(){let e={};O.value&&await w.parseString(O.value).then((t=>e=t)).catch((e=>{alert(e.message),console.error(e)})),w.add({actually:{...e},plan:{...e}}),O.value="",k.value=!1,ee()}function oe(){const e=w.stringifyUrl();navigator.clipboard.writeText(`${V.value}?d=${e}`).then((()=>{T.value={text:p("COPIED"),color:"green"},setTimeout((()=>T.value={text:p("COPY"),color:"yellow"}),2e3)})).catch((e=>{T.value={text:p("Error"),color:"red"},alert(e.message),console.error(e)}))}function ae(e,t){const n=y.total.intermediate[t];if("plan"==e)return{"yellow-color plus":n.plan,hide:0==n.plan};if("sum"==e){const e=n.sum>n.actually;return{"green-color ":e,muffle:!e,hide:0==n.sum}}return{}}function se(e,t,l){return l="string"===typeof l?parseInt(l):l,0==l?(delete n.input[e][t],delete y[e][t]):w.selectedConfig[e][t]=l,Q(),X(t),w.save(),l}function ie(e,t,l){let o=n.input.plan[t]||0;const a=n.input.actually[t];return a>o&&(o=se("plan",t,a)),"plan"==e?l==o:n.input[e][t]==l}function re(e,t,l){return!("plan"!=e||!n.input.actually)&&l<n.input.actually[t]}function ce(e,t,l){if("actually"==e)return{none:l&&W.value.includes(l),actually:!0};if("plan"==e){const o=l?y[e][t][l]:void 0;return{"yellow-color":(!n.input.actually[t]||n.input.plan[t]>n.input.actually[t])&&"object"!==typeof o,plus:!l||l&&!W.value.includes(l),none:n.input.plan[t]==n.input.actually[t],plan:!0}}return{}}return ee(),t("setup",b),(e,t)=>{const n=(0,l.Q2)("t");return(0,l.wg)(),(0,l.iD)("div",null,[(0,l.Wm)((0,o.SU)(c.Fb),null,{default:(0,l.w5)((()=>[(0,l._)("title",null,(0,a.zw)(A.value),1)])),_:1}),(0,l._)("h1",D,(0,a.zw)(A.value),1),(0,l._)("table",I,[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)((0,o.SU)(y).total.intermediate,((e,t)=>((0,l.wg)(),(0,l.iD)("tr",{key:t},[(0,l._)("td",null,(0,a.zw)(d.key(t)),1),((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(e,((e,n)=>((0,l.wg)(),(0,l.iD)("td",{key:t+n,class:(0,a.C_)(ae(n,t))},(0,a.zw)(e.toLocaleString("ru-RU")),3)))),128))])))),128)),((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)((0,o.SU)(y).total.result,((e,t)=>((0,l.wg)(),(0,l.iD)("tr",{key:t,class:"result"},[(0,l._)("td",null,(0,a.zw)(d.key(t)),1),e>0?((0,l.wg)(),(0,l.iD)("td",j,[(0,l._)("b",null,(0,a.zw)(d.value(t,e)),1)])):(0,l.kq)("",!0)])))),128))]),(0,l._)("div",R,[(0,l._)("button",{class:"settings",onClick:t[0]||(t[0]=e=>E.value=!0)}),(0,l._)("div",z,[(0,l._)("button",{class:"button yellow",name:"plan",onClick:te},(0,a.zw)(e.$t("RESET_PLAN")),1),(0,l._)("button",{class:"button red",name:"all",onClick:te},(0,a.zw)(e.$t("RESET_ALL")),1)])]),(0,l.Wm)(u.Z,{open:E.value,"onUpdate:open":[t[5]||(t[5]=e=>E.value=e),t[6]||(t[6]=()=>(0,o.SU)(w).save())],title:e.$t("CALCULATOR_SETTINGS")+" (Alpha)",size:(0,o.SU)(u.z).MEDIUM},{body:(0,l.w5)((()=>[(0,l._)("div",L,[(0,l._)("div",x,[(0,l.wy)((0,l._)("p",null,null,512),[[n,"CONFIG"]]),(0,l._)("div",Z,[(0,l._)("button",{class:(0,a.C_)(`button ${T.value.color}`),onClick:oe},(0,a.zw)(T.value.text),3),(0,l.wy)((0,l._)("button",{class:"button green",onClick:t[1]||(t[1]=e=>k.value=!0)},null,512),[[n,"CREATE"]])])]),(0,l._)("div",$,[(0,l.wy)((0,l._)("p",K,null,512),[[n,"LIST"]]),(0,l.wy)((0,l._)("select",{"onUpdate:modelValue":t[2]||(t[2]=e=>(0,o.SU)(w).store.selected=e),onChange:t[3]||(t[3]=e=>ee())},[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)((0,o.SU)(w).store.configs,((e,t)=>((0,l.wg)(),(0,l.iD)("option",{key:t,value:t},(0,a.zw)(e.name),9,N)))),128))],544),[[s.bM,(0,o.SU)(w).store.selected]])]),(0,l._)("div",H,[(0,l.wy)((0,l._)("p",M,null,512),[[n,"TID_CHANGE_NAME_TITLE"]]),(0,l.wy)((0,l._)("input",{"onUpdate:modelValue":t[4]||(t[4]=e=>(0,o.SU)(w).store.configs[(0,o.SU)(w).store.selected].name=e),placeholder:e.$t("TID_CORP_NAME_LABEL")},null,8,F),[[s.nr,(0,o.SU)(w).store.configs[(0,o.SU)(w).store.selected].name]])]),(0,l._)("div",G,[(0,l._)("button",{class:"button red",onClick:ne},(0,a.zw)(e.$t(f?"TID_SOCIAL_DELETE_MESSAGE":"TID_INBOX_DELETE_MESSAGE")),1)])])])),_:1},8,["open","title","size"]),(0,l.Wm)(_,{onSetShow:B}),(0,l.Wm)(u.Z,{open:k.value,"onUpdate:open":t[8]||(t[8]=e=>k.value=e),title:e.$t("CREATE"),size:(0,o.SU)(u.z).SMALL},{body:(0,l.w5)((()=>[(0,l._)("div",P,[(0,l.wy)((0,l._)("p",Y,null,512),[[n,"FROM_TEXT_FORMAT"]]),q,(0,l.wy)((0,l._)("input",{"onUpdate:modelValue":t[7]||(t[7]=e=>O.value=e)},null,512),[[s.nr,O.value]])]),(0,l._)("div",J,[(0,l.wy)((0,l._)("button",{class:"button green",onClick:le},null,512),[[n,"TID_OK"]])])])),_:1},8,["open","title","size"])])}}}),V=(0,y.Z)(W,[["__scopeId","data-v-1e008246"]]),B=V}}]);