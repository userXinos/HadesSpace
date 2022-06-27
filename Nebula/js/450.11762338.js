"use strict";(self["webpackChunkhades_space"]=self["webpackChunkhades_space"]||[]).push([[450],{6450:(t,e,n)=>{n.d(e,{Z:()=>V});var l=n(6252),o=n(3577),s=n(9963);const i={class:"topic"},a={class:"total-table"},r={key:0,colspan:"3"},u={class:"buttons"},c={class:"reset-buttons"},p={class:"settings-modal"},h={class:"config-category"},d={class:"flex-end"},f={class:"select"},g={class:"name"},y=["value"],m={class:"input"},C={class:"name"},w=["placeholder"],b={class:"flex-end margin-bottom"},v={class:"input"},_={class:"name"},M={class:"flex-end margin-bottom"};function S(t,e,n,S,O,T){const k=(0,l.up)("Head"),E=(0,l.up)("modal"),I=(0,l.up)("confirm"),$=(0,l.Q2)("t");return(0,l.wg)(),(0,l.iD)("div",null,[(0,l.Wm)(k,null,{default:(0,l.w5)((()=>[(0,l._)("title",null,(0,o.zw)(t.title),1)])),_:1}),(0,l._)("h1",i,(0,o.zw)(t.title),1),(0,l._)("table",a,[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(t.output.total.intermediate,((e,n)=>((0,l.wg)(),(0,l.iD)("tr",{key:n},[(0,l._)("td",null,(0,o.zw)(t.format.key(n)),1),((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(e,((e,s)=>((0,l.wg)(),(0,l.iD)("td",{key:n+s,class:(0,o.C_)(t.totalTableClasses(s,n))},(0,o.zw)(e.toLocaleString("ru-RU")),3)))),128))])))),128)),((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(t.output.total.result,((e,n)=>((0,l.wg)(),(0,l.iD)("tr",{key:n,class:"result"},[(0,l._)("td",null,(0,o.zw)(t.format.key(n)),1),e>0?((0,l.wg)(),(0,l.iD)("td",r,[(0,l._)("b",null,(0,o.zw)(t.format.value(n,e)),1)])):(0,l.kq)("",!0)])))),128))]),(0,l._)("div",u,[(0,l._)("button",{class:"settings",onClick:e[0]||(e[0]=e=>t.settingsModal=!0)}),(0,l._)("div",c,[(0,l._)("button",{class:"button yellow",name:"plan",onClick:e[1]||(e[1]=(...e)=>t.onReset&&t.onReset(...e))},(0,o.zw)(t.$t("RESET_PLAN")),1),(0,l._)("button",{class:"button red",name:"all",onClick:e[2]||(e[2]=(...e)=>t.onReset&&t.onReset(...e))},(0,o.zw)(t.$t("RESET_ALL")),1)])]),(0,l.Wm)(E,{open:t.settingsModal,"onUpdate:open":[e[9]||(e[9]=e=>t.settingsModal=e),e[10]||(e[10]=()=>t.ConfigManager.save())],title:t.$t("CALCULATOR_SETTINGS")+" (Alpha)",size:t.modalSizes.MEDIUM},{body:(0,l.w5)((()=>[(0,l._)("div",p,[(0,l._)("div",h,[(0,l.wy)((0,l._)("p",null,null,512),[[$,"CONFIG"]]),(0,l._)("div",d,[(0,l._)("button",{class:(0,o.C_)(`button ${t.buttonCopy.color}`),onClick:e[3]||(e[3]=(...e)=>t.copyConfig&&t.copyConfig(...e))},(0,o.zw)(t.buttonCopy.text),3),(0,l.wy)((0,l._)("button",{class:"button green",onClick:e[4]||(e[4]=e=>t.newModal=!0)},null,512),[[$,"CREATE"]])])]),(0,l._)("div",f,[(0,l.wy)((0,l._)("p",g,null,512),[[$,"LIST"]]),(0,l.wy)((0,l._)("select",{"onUpdate:modelValue":e[5]||(e[5]=e=>t.ConfigManager.value.selected=e),onChange:e[6]||(e[6]=e=>t.fullUpdate())},[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(t.ConfigManager.value.configs,((t,e)=>((0,l.wg)(),(0,l.iD)("option",{key:e,value:e},(0,o.zw)(t.name),9,y)))),128))],544),[[s.bM,t.ConfigManager.value.selected]])]),(0,l._)("div",m,[(0,l.wy)((0,l._)("p",C,null,512),[[$,"TID_CHANGE_NAME_TITLE"]]),(0,l.wy)((0,l._)("input",{"onUpdate:modelValue":e[7]||(e[7]=e=>t.ConfigManager.value.configs[t.ConfigManager.value.selected].name=e),placeholder:t.$t("TID_CORP_NAME_LABEL")},null,8,w),[[s.nr,t.ConfigManager.value.configs[t.ConfigManager.value.selected].name]])]),(0,l._)("div",b,[(0,l.wy)((0,l._)("button",{class:"button red",onClick:e[8]||(e[8]=(...e)=>t.removeConfig&&t.removeConfig(...e))},null,512),[[$,"TID_INBOX_DELETE_MESSAGE"]])])])])),_:1},8,["open","title","size"]),(0,l.Wm)(I,{onSetShow:t.setShowConfirm},null,8,["onSetShow"]),(0,l.Wm)(E,{open:t.newModal,"onUpdate:open":e[13]||(e[13]=e=>t.newModal=e),title:t.$t("CREATE"),size:t.modalSizes.SMALL},{body:(0,l.w5)((()=>[(0,l._)("div",v,[(0,l.wy)((0,l._)("p",_,null,512),[[$,"FROM_TEXT_FORMAT"]]),(0,l.wy)((0,l._)("input",{"onUpdate:modelValue":e[11]||(e[11]=e=>t.newConfigFromText=e)},null,512),[[s.nr,t.newConfigFromText]])]),(0,l._)("div",M,[(0,l.wy)((0,l._)("button",{class:"button green",onClick:e[12]||(e[12]=(...e)=>t.createConfig&&t.createConfig(...e))},null,512),[[$,"TID_OK"]])])])),_:1},8,["open","title","size"])])}var O=n(1232);const T={class:"wrap"},k={key:0,class:"container"},E={class:"buttons"};function I(t,e,n,i,a,r){const u=(0,l.up)("modal"),c=(0,l.Q2)("t");return(0,l.wg)(),(0,l.j4)(u,{title:"Confirm",open:t.show,"onUpdate:open":t.modalUpdate},{default:(0,l.w5)((()=>[(0,l.Wm)(s.uT,null,{default:(0,l.w5)((()=>[(0,l._)("div",T,[t.show?((0,l.wg)(),(0,l.iD)("div",k,[(0,l.Uk)((0,o.zw)(t.text)+" ",1),(0,l._)("div",E,[(0,l.wy)((0,l._)("button",{onClick:e[0]||(e[0]=e=>t.close(t.defeat))},null,512),[[c,"TID_CANCEL"]]),(0,l.wy)((0,l._)("button",{onClick:e[1]||(e[1]=e=>t.close(t.confirm))},null,512),[[c,"TID_OK"]])])])):(0,l.kq)("",!0)])])),_:1})])),_:1},8,["open","onUpdate:open"])}var $=n(139);const A=(0,l.aZ)({name:"Confirm",components:{Modal:$.Z},emits:["setShow"],data(){return{text:"",show:!1,confirm:()=>null,defeat:()=>null}},created(){this.$emit("setShow",this.open.bind(this))},methods:{modalUpdate(){this.close(this.defeat)},open(t){return this.show=!0,this.text=t,new Promise(((t,e)=>{this.confirm=t,this.defeat=e}))},close(t){t(),this.show=!1,this.confirm=()=>null,this.defeat=()=>null}}});var U=n(3744);const x=(0,U.Z)(A,[["render",I],["__scopeId","data-v-ec916228"]]),D=x;var R=n(7798),j=n(9114),L=n(2262),z=n(2022),K=n(8471);function N(t,e){const n=(0,L.qj)({actually:{},plan:{},total:{intermediate:{},result:{}}}),l={};for(const d of t)n.total.result[d]=0;const o=e(l,n);return{provideGetterElements:s,output:n,update:i};function s(t){return t(h,l)}function i(e,l){const s=(t,n,...l)=>a((([l],o,s)=>c(Object.fromEntries(s),l,e.actually[t],n)),t,...l),i=(t,e,...n)=>a((([,t])=>Array.isArray(t)?t[e-1]:t),t,...n);l?(r(n.plan,l,((...t)=>s(l,e.plan[l],...t))),r(n.actually,l,((...t)=>i(l,e.actually[l],...t)))):(u(e.plan,n.plan,s),u(e.actually,n.actually,i)),p(n.total);for(const[a,r]of Object.entries(n.plan))if(Object.keys(r).length){for(const e of t)n.total.result[e]+=r[e];o(a,e)}}function a(t,e,...n){const[[o]]=n;if(Z(l[e][o])){const n=(0,z.Z)(l[e][o],{map:(...e)=>[e[0][0],t(...e)]});return[o,n]}return[o,t(...n)]}function r(t,e,n){t[e]=(0,z.Z)(l[e],{map:n})}function u(t,e,n){if(Object.keys(t).length)for(const[l,o]of Object.entries(t))o?r(e,l,((...t)=>n(l,o,...t))):e[l]={};else for(const l of Object.keys(e))delete e[l]}function c(e,n,l,o){const s=e[n],i=l>0?s[l-1]:0;let a=s[o-1];if(!Array.isArray(s))return!l&&o?s:0;if(t.includes(n)){a=0;let t=l>0?l-1:0;while(t<=o-1)a+=s[t],t++}return a-i}function p(t){for(const e in t)if(e in t){if(Z(t[e])){p(t[e]);continue}t[e]=0}}function h(e,n){const l=(0,K.K)(e);return o(l),l;function o(e){for(const l in e)if(l in e){const o=e[l],s="boolean"==typeof o[1]?o[0]:o;if(Z(s)){const t=h(s,n);Object.keys(t).length?e[l]=t:delete e[l];continue}if((!Array.isArray(s)||s.length!=n)&&!t.includes(l)){delete e[l];continue}"boolean"==typeof o[1]&&(e[l]=s)}return e}}}function Z(t){return"object"===typeof t&&!Array.isArray(t)&&null!==t}var F=n(5925);const q={crush:(t,e=50)=>{const n="",l=(t,l)=>{let o=l.length,s="";const i=t=>encodeURI(encodeURIComponent(t)).replace(/%../g,"i").length,a=t=>{let e=t.charCodeAt(0),n=t.charCodeAt(t.length-1);return e>=56320&&e<=57343||n>=55296&&n<=56319};let r={};for(let n=2;n<e;n++)for(let e=0;e<t.length-n;++e){let l=t.substr(e,n);if(r[l])continue;if(a(l))continue;let o=1;for(let s=t.indexOf(l,e+n);s>=0;++o)s=t.indexOf(l,s+n);o>1&&(r[l]=o)}while(1){for(;o--&&t.includes(l[o]););if(o<0)break;let e,a=l[o],u=0,c=i(a);for(let t in r){let l=r[t],o=(l-1)*i(t)-(l+1)*c;s.length||(o-=i(n)),o<=0?delete r[t]:o>u&&(e=t,u=o)}if(!e)break;t=t.split(e).join(a)+a+e,s=a+s;let p={};for(let n in r){let l=n.split(e).join(a),o=0;for(let e=t.indexOf(l);e>=0;++o)e=t.indexOf(l,e+l.length);o>1&&(p[l]=o)}r=p}return{a:t,b:s}};let o=[];const s="-_.!~*'()";for(let r=127;--r;)(r>=48&&r<=57||r>=65&&r<=90||r>=97&&r<=122||s.includes(String.fromCharCode(r)))&&o.push(String.fromCharCode(r));for(let r=32;r<255;++r){let t=String.fromCharCode(r);"\\"==t||o.includes(t)||o.unshift(t)}t=t.replace(new RegExp(n,"g"),""),t=G(t);const i=l(t,o);let a=i.a;return i.b.length&&(a+=n+i.b),a+="_",a},uncrush:t=>{t=t.substring(0,t.length-1);const e=t.split("");let n=e[0];if(e.length>1){let t=e[1];for(let e of t){let t=n.split(e);n=t.join(t.pop())}}return G(n,0)}},G=(t,e=1)=>{const n=[['"',"'"],["':","!"],[",'","~"],["}",")","\\","\\"],["{","(","\\","\\"]],l=(t,e)=>{let n=new RegExp(`${(e[2]?e[2]:"")+e[0]}|${(e[3]?e[3]:"")+e[1]}`,"g");return t.replace(n,(t=>t===e[0]?e[1]:e[0]))};if(e)for(let o=0;o<n.length;++o)t=l(t,n[o]);else for(let o=n.length;o--;)t=l(t,n[o]);return t},P="new entry",H="en";class Y{value;TIDs={};localStoreKey;constructor(t){this.value=(0,L.qj)({configs:[],selected:0}),this.localStoreKey=t,this.load()}get selectedConfig(){return this.value.configs[this.value.selected].value}load(){const t=JSON.parse(localStorage.getItem(this.localStoreKey)||"{}");t.configs?Object.assign(this.value,t):Object.keys(t).length&&t.actually&&t.plan?this.add(t):this.add()}save(){localStorage.setItem(this.localStoreKey,JSON.stringify(this.value))}removeSelected(){this.value.configs.splice(this.value.selected,1),0!=this.value.configs.length?this.value.selected=this.value.configs.length-1:this.add()}add(t,{temporary:e}={temporary:!1}){const n=this.value;let l,o=0;do{l=o?`${P} #${o}`:P,o++}while(n.configs.length&&n.configs.some((t=>t.name==l)));n.configs=[...n.configs,{name:l,value:t||{actually:{},plan:{}}}],n.selected=n.configs.length-1,e||this.save()}async parseString(t){const e=[];F.ZP.global.availableLocales.includes(H)||await(0,F.J1)(H);for(const[n,l]of Object.entries(this.TIDs)){const o=F.ZP.global.t(l,H),s=new RegExp(`${o}\\s+?(\\d+?)\\s?`,"mi"),[,i]=t.match(s)||[void 0,"0"];e.push([n,parseInt(i)])}return Object.fromEntries(e.filter((([,t])=>t)))}stringifyUrl(){const t=JSON.stringify(this.selectedConfig.actually);return q.crush(t)}parseUrl(t){return JSON.parse(q.uncrush(t))}}const J=(0,l.aZ)({name:"Calculator",components:{Head:O.Fb,Confirm:D,Modal:$.Z},emits:["update:input","setup"],setup({stackChars:t,calcTotal:e,localStorageKey:n}){const{provideGetterElements:l,output:o,update:s}=N(t,e),i=new Y(n),a=t=>l.apply(null,[(...e)=>t(i.TIDs,...e)]);return{output:o,updateLogicOutput:s,provideGetterElements:t=>a(t),ConfigManager:i}},props:{stackChars:{type:Array,required:!0},calcTotal:{type:Function,required:!0},localStorageKey:{type:String,required:!0},titleKey:{type:String,required:!0},input:{type:Object,required:!0}},data(){return{resetConfirm:()=>Promise.prototype,modalSizes:$.z,settingsModal:!1,newModal:!1,newConfigFromText:"",buttonCopy:{text:this.$t("COPY"),color:"yellow"},format:{key:t=>(0,j.Z)(t,this.$route.name),value:(t,e)=>(0,R.Z)(t,e,null)}}},computed:{title(){return this.$t(this.titleKey)},totalResultKeys(){return Object.keys(this.output.total.result)},currentUrl(){return`${location.origin}${location.pathname}`}},created(){if(this.$route.query.m){const t=this.ConfigManager.parseUrl(this.$route.query.m);this.ConfigManager.add({actually:t,plan:t},{temporary:!0}),this.$router.push(this.currentUrl)}this.fullUpdate(),this.$emit("setup",{onChangeLvl:this.onChangeLvl,isSelected:this.isSelected,isDisabled:this.isDisabled,outputClasses:this.outputClasses,provideGetterElements:this.provideGetterElements,output:this.output})},methods:{setShowConfirm(t){this.resetConfirm=t},updateInput(){this.$emit("update:input",this.ConfigManager.selectedConfig)},updateOutput(t){this.$nextTick((()=>{this.updateLogicOutput(this.input,t)}))},fullUpdate(){this.updateInput(),this.updateOutput()},async onReset(t){if("all"==t.target.name)await this.resetConfirm("Reset all ? Are you serious ?").then((()=>{for(const t in this.input)t in this.input&&(this.ConfigManager.selectedConfig[t]={})})).catch((()=>{}));else if(this.input.plan)for(const e in this.input.plan)e in this.input.plan&&(this.ConfigManager.selectedConfig.plan[e]=this.input.actually[e]);this.updateOutput(),this.ConfigManager.save()},async removeConfig(){const{name:t}=this.ConfigManager.value.configs[this.ConfigManager.value.selected];await this.resetConfirm(this.$t("REMOVE_CONFIG",[t])).then((()=>{this.ConfigManager.removeSelected(),this.fullUpdate()})).catch((()=>{}))},async createConfig(){let t={};this.newConfigFromText&&await this.ConfigManager.parseString(this.newConfigFromText).then((e=>t=e)).catch((t=>{alert(t.message),console.error(t)})),this.ConfigManager.add({actually:t,plan:t}),this.newConfigFromText="",this.newModal=!1,this.fullUpdate()},copyConfig(){const t=this.ConfigManager.stringifyUrl();navigator.clipboard.writeText(`${this.currentUrl}?m=${t}`).then((()=>{this.buttonCopy.text=this.$t("COPIED"),this.buttonCopy.color="green",setTimeout((()=>{this.buttonCopy.text=this.$t("COPY"),this.buttonCopy.color="yellow"}),2e3)})).catch((t=>{this.buttonCopy.text="Error",this.buttonCopy.color="red",alert(t.message),console.error(t)}))},totalTableClasses(t,e){const n=this.output.total.intermediate[e];if("plan"==t)return{"yellow-color plus":n.plan,hide:0==n.plan};if("sum"==t){const t=n.sum>n.actually;return{"green-color ":t,muffle:!t,hide:0==n.sum}}return{}},onChangeLvl(t,e,n){return n="string"===typeof n?parseInt(n):n,0==n?(delete this.input[t][e],delete this.output[t][e]):this.ConfigManager.selectedConfig[t][e]=n,this.updateInput(),this.updateOutput(e),this.ConfigManager.save(),n},isSelected(t,e,n){let l=this.input.plan[e]||0;const o=this.input.actually[e];return o>l&&(l=this.onChangeLvl("plan",e,o)),"plan"==t?n==l:this.input[t][e]==n},isDisabled(t,e,n){return!("plan"!=t||!this.input.actually)&&n<this.input.actually[e]},outputClasses(t,e,n){if("actually"==t)return{none:n&&this.totalResultKeys.includes(n)};if("plan"==t){const l=n?this.output[t][e][n]:void 0;return{"yellow-color":(!this.input.actually[e]||this.input.plan[e]>this.input.actually[e])&&"object"!==typeof l,plus:!n||n&&!this.totalResultKeys.includes(n),none:this.input.plan[e]==this.input.actually[e]}}return{}}}}),W=(0,U.Z)(J,[["render",S],["__scopeId","data-v-0caaf332"]]),V=W}}]);