(()=>{var e={1758:(e,t,n)=>{var a={"./de.json":[9806,806],"./en.json":[561,561],"./es.json":[9988,988],"./fr.json":[8560,560],"./it.json":[7948,948],"./jp.json":[4964,964],"./ko.json":[2256,256],"./pt.json":[1668,668],"./ru.json":[1278,278],"./zh-si.json":[9400,400]};function o(e){if(!n.o(a,e))return Promise.resolve().then((()=>{var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=a[e],o=t[0];return n.e(t[1]).then((()=>n.t(o,19)))}o.keys=()=>Object.keys(a),o.id=1758,e.exports=o},5925:(e,t,n)=>{"use strict";n.d(t,{J1:()=>c,ZP:()=>r,g:()=>l});var a=n(6252),o=n(9150),s=n(1578);const i=(0,o.o)({locale:s.Z.state.userSettings.language});d(),c(i.global.locale);const r=i;async function l(e){await c(e),d(),i.global.locale=e}async function c(e){const t=await n(1758)(`./${e}.json`).then((e=>e.default));return i.global.setLocaleMessage(e,t),(0,a.Y3)()}function d(){document.querySelector("html")?.setAttribute("lang",i.global.locale)}},9782:(e,t,n)=>{"use strict";n.d(t,{s:()=>v,U:()=>S});const a=!0,o=[{name:"Index",path:"/",component:()=>Promise.all([n.e(921),n.e(726)]).then(n.bind(n,9894))},{text:{locKey:"TID_SHIP_UPGRADE_DLG_TITLE"},children:[{name:"Trade",text:{locKey:"TYPE_MOD_TRADE"},path:"/trade",component:()=>Promise.all([n.e(921),n.e(379),n.e(740),n.e(683)]).then(n.bind(n,70)),icon:{name:a?"Mod_ArtifactBoost_Icon":"Mod_TransportAutopilot_Icon",dir:"game/Modules"}},{name:"Mining",text:{locKey:"TYPE_MOD_MINING"},path:"/mining",component:()=>Promise.all([n.e(921),n.e(379),n.e(740),n.e(837)]).then(n.bind(n,4744)),icon:{name:a?"Mod_Enrich_Icon":"Mod_MiningBoost_Icon",dir:"game/Modules"}},{name:"Weapon",text:{locKey:"TYPE_MOD_WEAPON"},path:"/weapon",component:()=>Promise.all([n.e(921),n.e(379),n.e(740),n.e(749)]).then(n.bind(n,2817)),icon:{name:a?"Mod_ChainRay_Icon":"Mod_Barrage_Icon",dir:"game/Modules"}},{name:"Shield",text:{locKey:"TYPE_MOD_SHIELD"},path:"/shield",component:()=>Promise.all([n.e(921),n.e(379),n.e(740),n.e(662)]).then(n.bind(n,6566)),icon:{name:"Mod_PassiveShield_Icon",dir:"game/Modules"}},{name:"Support",text:{locKey:"TYPE_MOD_SUPPORT"},path:"/support",component:()=>Promise.all([n.e(921),n.e(379),n.e(740),n.e(677)]).then(n.bind(n,3249)),icon:{name:a?"Mod_DeltaDrone_Icon":"Mod_Destiny_Icon",dir:"game/Modules"}}]},{text:{locKey:"SECTIONS"},children:[{name:"Planets",text:{locKey:"PLANETS"},path:"/yellowstar#Planets",icon:{name:"planet",dir:"icons"}},{name:"Ships",text:{locKey:"TID_PRODUCTION_DLG_SHIPS"},path:"/ships",component:()=>Promise.all([n.e(921),n.e(379),n.e(740),n.e(431),n.e(406)]).then(n.bind(n,619)),icon:{name:a?"Transport_DrkNeb_lv5":"Miner_lv6",dir:"game/Ships"}},{name:"Cerberus",text:{locKey:"CERBERUS"},path:"/cerberus",component:()=>Promise.all([n.e(921),n.e(379),n.e(431),n.e(362)]).then(n.bind(n,9441)),icon:{name:a?"Fighter_DrkNeb_Cerberus5_lv1":"Fighter_Cerberus6_lv1",dir:"game/Ships"}},{name:"SpaceBuildings",text:{locKey:"TID_PRODUCTION_DLG_STATIONS"},path:"/spacebuildings",component:()=>Promise.all([n.e(921),n.e(379),n.e(142)]).then(n.bind(n,3796)),icon:{name:"station_trade",dir:"game/SpaceBuildings"}},{text:{locKey:"TID_OBJECT_ACTION_ARTIFACTS"},path:"/redstar#Artifacts",icon:{name:"art",dir:"icons",bg:""}},{name:"AllianceLevels",text:{locKey:"TID_CORP_LEVELS_LABEL"},path:"/alliancelevels",component:()=>Promise.all([n.e(921),n.e(379),n.e(626)]).then(n.bind(n,9194)),icon:{name:"relic",dir:"icons"}},{name:"PlayerGoals",text:{locKey:"TID_EMPIRE_OBJECTIVES"},path:"/playergoals",component:()=>Promise.all([n.e(921),n.e(379),n.e(636)]).then(n.bind(n,3320)),icon:{name:"influence",dir:"icons"}},{name:"Achievements",text:{locKey:"TID_PLAYER_INFO_DLG_TAB_ACHIEVEMENTS"},path:"/achievements",component:()=>Promise.all([n.e(921),n.e(379),n.e(607)]).then(n.bind(n,470)),icon:{name:"Leaderboards",dir:"icons"}},{name:"Distinctions",text:{locKey:"TID_PLAYER_INFO_SECTION_BADGES"},path:"/distinctions",component:()=>Promise.all([n.e(921),n.e(379),n.e(607)]).then(n.bind(n,4951)),icon:{name:"Distinction_Emperor",dir:"game/Distinctions"}}]},{text:{locKey:"STARS"},children:[{name:"YellowStar",text:{locKey:"TID_YELLOW_STAR"},path:"/yellowstar",component:()=>Promise.all([n.e(921),n.e(379),n.e(762),n.e(790)]).then(n.bind(n,2036)),icon:{name:"star_yellow",dir:"game/Stars"}},{name:"RedStar",text:{locKey:"TID_RED_STAR"},path:"/redstar",component:()=>Promise.all([n.e(921),n.e(379),n.e(65)]).then(n.bind(n,5701)),icon:{name:"star_red",dir:"game/Stars"}},a?{name:"DarkRedStar",text:{locKey:"TID_DARK_RED_STAR_LABEL"},path:"/darkredstar",component:()=>Promise.all([n.e(921),n.e(379),n.e(934)]).then(n.bind(n,174)),icon:{name:"star_red_dark",dir:"game/Stars"}}:void 0,{name:"WhiteStar",text:{locKey:"TID_WHITE_STAR"},path:"/whitestar",component:()=>Promise.all([n.e(921),n.e(379),n.e(762),n.e(670)]).then(n.bind(n,2598)),icon:{name:"star_white",dir:"game/Stars"}},{name:"BlueStar",text:{locKey:"TID_BLUE_STAR"},path:"/bluestar",component:()=>Promise.all([n.e(921),n.e(379),n.e(261)]).then(n.bind(n,2228)),icon:{name:"star_blue",dir:"game/Stars"}}]},{text:{locKey:"OTHER"},children:[{name:"PlanetsCalc",text:{locKey:"PLANETS_CALC"},path:"/planetscalc",component:()=>Promise.all([n.e(921),n.e(379),n.e(762),n.e(450),n.e(530)]).then(n.bind(n,6273)),icon:{name:"planets-calc",dir:"icons"}},{name:"ModulesCalc",text:{locKey:"MODULES_CALC"},path:"/modulescalc",component:()=>Promise.all([n.e(921),n.e(379),n.e(740),n.e(450),n.e(752)]).then(n.bind(n,4362)),icon:{name:"modules-calc",dir:"icons"}},{text:{locKey:"SWITCH_ACCS",params:["by Raerten","up to Android 10"]},path:{externalLink:"https://github.com/Raerten/HSAccs"},icon:{name:"github_logo",dir:"icons"}},{name:"About",text:{locKey:"ABOUT"},path:"/about",component:()=>n.e(74).then(n.bind(n,6334)),icon:{name:"info",dir:"icons"}}]}];var s=n(6252);const i=e=>((0,s.dD)("data-v-77ab1840"),e=e(),(0,s.Cn)(),e),r={class:"container"},l=i((()=>(0,s._)("title",null,"Page not found",-1))),c=i((()=>(0,s._)("h1",{class:"glitch"}," 404 ",-1))),d=i((()=>(0,s._)("p",null," Page not found ",-1))),u=(0,s.Uk)(" Home ");function p(e,t,n,a,o,i){const p=(0,s.up)("Head"),m=(0,s.up)("router-link");return(0,s.wg)(),(0,s.iD)("div",r,[(0,s.Wm)(p,null,{default:(0,s.w5)((()=>[l])),_:1}),c,d,(0,s.Wm)(m,{to:"/"},{default:(0,s.w5)((()=>[u])),_:1})])}var m=n(1232);const h={components:{Head:m.Fb}};var g=n(3744);const _=(0,g.Z)(h,[["render",p],["__scopeId","data-v-77ab1840"]]),f=_,b={path:"/:pathMatch(.*)*",name:"NotFound",component:f};function v(){return[...o.reduce(e,[]),b];function e(t,{name:n,path:a,component:o,children:s}){return o&&t.push({name:n,path:a,component:o}),s&&t.push(...s.filter(Boolean).reduce(e,[])),t}}function S(){return o.filter((e=>e.children)).map((t=>e(t)));function e({text:t,path:n,icon:a,children:o}){return{text:t,icon:a,children:o?o.filter(Boolean).map(e):void 0,link:{path:n?.externalLink||n,type:n?.externalLink?"external":"router"}}}}},6641:(e,t,n)=>{"use strict";var a=n(9963),o=n(6252);const s=e=>((0,o.dD)("data-v-62eaabcc"),e=e(),(0,o.Cn)(),e),i=s((()=>(0,o._)("title",null,"Hades Space",-1))),r=s((()=>(0,o._)("div",{class:"target-wrap"},[(0,o._)("div",{id:"table-head-target"})],-1)));function l(e,t,n,a,s,l){const c=(0,o.up)("Head"),d=(0,o.up)("vue-progress-bar"),u=(0,o.up)("Sidebar"),p=(0,o.up)("the-header"),m=(0,o.up)("router-view"),h=(0,o.up)("go-top"),g=(0,o.Q2)("touch");return(0,o.wg)(),(0,o.iD)("div",null,[(0,o.Wm)(c,null,{default:(0,o.w5)((()=>[i])),_:1}),(0,o.Wm)(d),e.isMinMode?((0,o.wg)(),(0,o.j4)(u,{key:0,open:e.sidebarIsOpen,"onUpdate:open":t[0]||(t[0]=t=>e.sidebarIsOpen=t),"swipe-handler":e.swipeHandler},null,8,["open","swipe-handler"])):(0,o.kq)("",!0),(0,o.wy)(((0,o.wg)(),(0,o.iD)("div",null,[(0,o._)("div",null,[(0,o.Wm)(p,{"is-min-mode":e.isMinMode,"open-sidebar":()=>e.setShowSidebar(!0)},null,8,["is-min-mode","open-sidebar"]),r,(0,o.Wm)(m)])])),[[g,e.swipeHandler,"swipe"]]),(0,o.Wm)(h)])}var c=n(2262),d=n(1232);function u(e,t,n,s,i,r){return(0,o.wg)(),(0,o.j4)(a.uT,null,{default:(0,o.w5)((()=>[i.show?((0,o.wg)(),(0,o.iD)("div",{key:0,class:"btn",onClick:t[0]||(t[0]=(...e)=>r.scrollToTop&&r.scrollToTop(...e))})):(0,o.kq)("",!0)])),_:1})}const p={data(){return{show:!1}},created(){this.hide=this.debounce((()=>this.show=!1))},mounted(){document.addEventListener("scroll",this.scroll)},unmounted(){document.removeEventListener("scroll",this.scroll)},methods:{scrollToTop(){window.scrollTo({top:0,behavior:"smooth"})},scroll(){const e=window.scrollY>300;this.show!=e&&(this.show=e,this.hide())},debounce(e,t=4e3){let n;return(...a)=>{clearTimeout(n),n=setTimeout((()=>{e.apply(this,a)}),t)}}}};var m=n(3744);const h=(0,m.Z)(p,[["render",u],["__scopeId","data-v-13da1cb8"]]),g=h,_=e=>((0,o.dD)("data-v-a344e8a4"),e=e(),(0,o.Cn)(),e),f={class:"offset"},b={class:"header"},v={class:"buttons"},S={class:"logo"},w=_((()=>(0,o._)("div",{class:"image"},null,-1)));function y(e,t,n,a,s,i){const r=(0,o.up)("navigation"),l=(0,o.up)("settings"),c=(0,o.up)("router-link");return(0,o.wg)(),(0,o.iD)("div",f,[(0,o._)("header",b,[(0,o._)("div",v,[n.isMinMode?((0,o.wg)(),(0,o.iD)("div",{key:0,class:"sidebar",onClick:t[0]||(t[0]=(...e)=>n.openSidebar&&n.openSidebar(...e))})):((0,o.wg)(),(0,o.iD)(o.HY,{key:1},[(0,o.Wm)(r),(0,o.Wm)(l)],64))]),(0,o._)("div",S,[(0,o.Wm)(c,{to:"/"},{default:(0,o.w5)((()=>[w])),_:1})])])])}var C=n(3577);const E=e=>((0,o.dD)("data-v-cddef5d2"),e=e(),(0,o.Cn)(),e),D={class:"container"},L={class:"sections"},T=["onClick"],O=E((()=>(0,o._)("div",{class:"icon"},null,-1))),A={class:"name"},k={class:"name"},I=["href"],M={class:"name"};function P(e,t,n,s,i,r){const l=(0,o.up)("router-link"),c=(0,o.Q2)("click-outside");return(0,o.wg)(),(0,o.iD)("nav",D,[(0,o.wy)(((0,o.wg)(),(0,o.iD)("ul",L,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(i.sections,((t,n)=>((0,o.wg)(),(0,o.iD)("li",{key:n,class:"section",onClick:()=>r.select(n)},[(0,o._)("div",null,[(0,o._)("div",{class:(0,C.C_)({selected:i.selected==n})},[O,(0,o._)("h2",A,(0,C.zw)(e.$te(t.text.locKey)?e.$t(t.text.locKey):""),1)],2),(0,o.Wm)(a.W3,{name:"list",tag:"ul",class:"list",style:(0,C.j5)({"--total":t.children.length})},{default:(0,o.w5)((()=>[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(i.selected===n?t.children:[],((t,n)=>((0,o.wg)(),(0,o.iD)("li",{key:n,style:(0,C.j5)({"--i":n+1})},["router"==t.link.type?((0,o.wg)(),(0,o.j4)(l,{key:0,to:t.link.path},{default:(0,o.w5)((()=>[(0,o._)("h2",k,(0,C.zw)(e.$t(t.text.locKey,t.text.params)),1)])),_:2},1032,["to"])):(0,o.kq)("",!0),"external"==t.link.type?((0,o.wg)(),(0,o.iD)("a",{key:1,href:t.link.path,target:"_blank"},[(0,o._)("h2",M,(0,C.zw)(e.$t(t.text.locKey,t.text.params)),1)],8,I)):(0,o.kq)("",!0)],4)))),128))])),_:2},1032,["style"])])],8,T)))),128))])),[[c,()=>r.select(null)]])])}var N=n(9782);const x={name:"Navigation",data(){return{sections:(0,N.U)(),selected:null}},created(){this.$router.afterEach((()=>{this.select(null)}))},methods:{select(e){this.selected!==e?this.selected=e:this.selected=null}}},j=(0,m.Z)(x,[["render",P],["__scopeId","data-v-cddef5d2"]]),R=j,K=e=>((0,o.dD)("data-v-89bdfa5c"),e=e(),(0,o.Cn)(),e),H=K((()=>(0,o._)("div",{class:"icon"},null,-1))),W=K((()=>(0,o._)("span",{class:"name"},"Settings",-1))),Z=[H,W],B={class:"select"},U={class:"name"},F=["value"],G={class:"switch"},$=K((()=>(0,o._)("div",null,[(0,o._)("p",{class:"name"}," Disable filters "),(0,o._)("p",{class:"description"},"Disable all characteristic filters used to hide unimportant information")],-1))),z=["checked"],Y=K((()=>(0,o._)("label",{for:"disable-filters",class:"label"},null,-1)));function q(e,t,n,s,i,r){const l=(0,o.up)("Modal");return(0,o.wg)(),(0,o.iD)("div",null,[(0,o._)("div",{class:"button",onClick:t[0]||(t[0]=e=>i.isOpenModal=!0)},Z),(0,o.Wm)(l,{open:i.isOpenModal,"onUpdate:open":t[4]||(t[4]=e=>i.isOpenModal=e),title:e.$te("TID_SETTINGS_DLG_LANGUAGE")?e.$t("TID_SETTINGS_DLG_TITLE"):""},{body:(0,o.w5)((()=>[(0,o._)("div",B,[(0,o._)("p",U,(0,C.zw)(e.$t("TID_SETTINGS_DLG_LANGUAGE")),1),(0,o.wy)((0,o._)("select",{"onUpdate:modelValue":t[1]||(t[1]=e=>i.languageCode=e),onChange:t[2]||(t[2]=(...e)=>r.changeLanguage&&r.changeLanguage(...e))},[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(i.languages,(e=>((0,o.wg)(),(0,o.iD)("option",{key:e.Code,value:e.Code},(0,C.zw)(e.Name),9,F)))),128))],544),[[a.bM,i.languageCode]])]),(0,o._)("div",G,[$,(0,o._)("input",{id:"disable-filters",class:"checkbox",type:"checkbox",checked:e.$store.state.userSettings.disableFilters,onChange:t[3]||(t[3]=(...e)=>r.switchDisableFilters&&r.switchDisableFilters(...e))},null,40,z),Y])])),_:1},8,["open","title"])])}var V=n(139),J=n(1303),Q=n(9979);const X={name:"Settings",components:{Modal:V.Z},data(){return{isOpenModal:!1,languages:Q.Z,languageCode:this.$store.state.userSettings.language}},methods:{changeLanguage(){this.$store.commit(J.Z.SET_LANGUAGE,this.languageCode)},switchDisableFilters(){this.$store.commit(J.Z.SWITCH_DISABLE_FILTERS)}}},ee=(0,m.Z)(X,[["render",q],["__scopeId","data-v-89bdfa5c"]]),te=ee,ne={name:"Header",components:{Navigation:R,Settings:te},props:{isMinMode:{type:Boolean,requested:!0,default:null},openSidebar:{type:Function,requested:!0,default:null}}},ae=(0,m.Z)(ne,[["render",y],["__scopeId","data-v-a344e8a4"]]),oe=ae,se={key:0,class:"sidebar"};function ie(e,t){const n=(0,o.up)("navigation"),s=(0,o.up)("settings"),i=(0,o.up)("modal"),r=(0,o.Q2)("touch");return(0,o.wg)(),(0,o.j4)(i,{open:e.propModel,"onUpdate:open":t[0]||(t[0]=t=>e.propModel=t)},{default:(0,o.w5)((()=>[(0,o.Wm)(a.uT,null,{default:(0,o.w5)((()=>[e.open?(0,o.wy)(((0,o.wg)(),(0,o.iD)("div",se,[(0,o.Wm)(n),(0,o.Wm)(s)])),[[r,e.swipeHandler,"swipe"]]):(0,o.kq)("",!0)])),_:1})])),_:1},8,["open"])}const re=(0,o.aZ)({name:"Sidebar",components:{Navigation:R,Settings:te,Modal:V.Z},props:{open:Boolean,swipeHandler:{type:Function,default:void 0}},emits:["update:open"],computed:{propModel:{get(){return this.open},set(e){this.$emit("update:open",e)}}}}),le=(0,m.Z)(re,[["render",ie],["__scopeId","data-v-2886670c"]]),ce=le,de=60;function ue(e){const t=(0,c.iH)(!1),n=(0,c.iH)(window.innerWidth*de/100);return{setShow:o,swipeHandler:s,onResize:a,isOpen:t};function a(){n.value=window.innerWidth*de/100,e||o(!1)}function o(e){t.value=e}function s(t,a){window.TouchEvent&&"touchend"===a.type&&("right"===t&&e&&a.changedTouches[0].clientX<=n.value&&o(!0),"left"===t&&o(!1))}}const pe=1e3,me=(0,o.aZ)({name:"App",components:{Head:d.Fb,GoTop:g,TheHeader:oe,Sidebar:ce},setup(){const e=(0,c.iH)(window.innerWidth<pe),{setShow:t,swipeHandler:n,onResize:a,isOpen:o}=ue(e);return{isMinMode:e,setShowSidebar:t,sidebarIsOpen:o,swipeHandler:n,onResize:a}},mounted(){this.$Progress.finish(),window.addEventListener("resize",this.resize)},unmounted(){window.removeEventListener("resize",this.resize)},created(){this.progressBar(),this.$router.beforeEach((()=>{this.setShowSidebar(!1)}))},methods:{progressBar(){this.$Progress.start(),this.$router.beforeEach((async(e,t,n)=>{e.path!==t.path&&(this.$Progress.start(),this.$Progress.set(30)),n()})),this.$router.afterEach((async()=>{this.$Progress.finish()}))},resize(){this.isMinMode=window.innerWidth<pe,this.onResize()}}}),he=(0,m.Z)(me,[["render",l],["__scopeId","data-v-62eaabcc"]]),ge=he;var _e=n(2119);const fe=(0,_e.p7)({history:(0,_e.PO)("/HadesSpace/Nebula/"),routes:(0,N.s)(),scrollBehavior(e,t,n){return n||(e.hash?new Promise((t=>{setTimeout((()=>{t({el:e.hash,behavior:"smooth",top:100})}),500)})):{top:0})}}),be=fe;var ve=n(5925),Se=n(1578),we=n(4366),ye=n.n(we),Ce=n(7398),Ee=n(4032);const De={VueProgressBar:{color:"#345b66",failedColor:"#874b4b",thickness:"3px",transition:{speed:"0.2s",opacity:"0.2s",termination:300},autoRevert:!0,location:"top",inverse:!1},VueGtag:{config:{id:"G-Q3X19N7LEN"}}},Le={beforeMount(e,t){const n=n=>{e.contains(n.target)||e===n.target||t.value(n)};e.__vueClickEventHandler__=n,document.addEventListener("click",n)},unmounted(e){document.removeEventListener("click",e.__vueClickEventHandler__)}};var Te=n(5205);(0,Te.z)("/HadesSpace/Nebula/service-worker.js",{ready(){console.log("App is being served from cache by a service worker. \nFor more details, visit https://goo.gl/AFskqB")},registered(){console.log("Service worker has been registered.")},cached(){console.log("Content has been cached for offline use.")},updatefound(){console.log("New content is downloading.")},updated(){console.log("New content is available; please refresh."),window.location.reload()},offline(){console.log("No internet connection found. App is running in offline mode.")},error(e){console.error("Error during service worker registration:",e)}}),(0,a.ri)(ge).use((0,d.G6)()).use(ye(),De.VueProgressBar).use(Ce.ZP,De.VueGtag,be).use(Ee.Z).directive("click-outside",Le).use(ve.ZP).use(be).use(Se.Z).mount("#app")},1578:(e,t,n)=>{"use strict";n.d(t,{Z:()=>y});var a=n(8637),o=n(4919),s=n(1303),i=n(9979),r=n(5925);const l="settings",c=Object.values(i.Z).map((e=>e.Code)),d="en",u=f(l),p=window.navigator.language.slice(0,2),m=!1,h={[s.Z.SET_LANGUAGE](e,t){return e.language=t,_(l,e),(0,r.g)(t)},[s.Z.SWITCH_DISABLE_FILTERS](e){return e.disableFilters=!e.disableFilters,_(l,e),e.disableFilters}},g={namespaced:!1,strict:m,state:{language:u.language||(p in c?p:d),disableFilters:u.disableFilters||!1},mutations:h};function _(e,t){localStorage.setItem(e,JSON.stringify(t))}function f(e){let t={language:d,disableFilters:!1};if(localStorage.getItem(e))try{t=JSON.parse(localStorage.getItem(e)||"{}")}catch(n){console.error(n),localStorage.removeItem(e)}return t}const b=!1,v={modals:[]},S={[o.Z.MODAL_OPEN](e,t){e.modals.push(t)},[o.Z.MODAL_CLOSE](e,t){const n=e.modals.indexOf(t);-1!=n&&e.modals.splice(n,1)}},w={[o.Z.MODAL_OPEN]({state:e,commit:t}){const n=e.modals.length+1;return t(o.Z.MODAL_OPEN,n),n},[o.Z.MODAL_CLOSE]({commit:e},t){e(o.Z.MODAL_CLOSE,t)}},y=(0,a.MT)({strict:b,state:v,mutations:S,actions:w,modules:{userSettings:g}})},1303:(e,t,n)=>{"use strict";n.d(t,{Z:()=>a});const a=Object.freeze({SET_LANGUAGE:"SetLanguage",SWITCH_DISABLE_FILTERS:"SwitchDisableFilters"})},4919:(e,t,n)=>{"use strict";n.d(t,{Z:()=>a});const a=Object.freeze({MODAL_OPEN:"ModalOpen",MODAL_CLOSE:"ModalClose"})},139:(e,t,n)=>{"use strict";n.d(t,{z:()=>u,Z:()=>g});var a=n(6252),o=n(9963),s=n(3577);const i={key:0,class:"content-wrapper fixed"},r={class:"head"},l={class:"body"};function c(e,t,n,c,d,u){return(0,a.wg)(),(0,a.iD)("div",null,[((0,a.wg)(),(0,a.j4)(a.lR,{disabled:!u.modalActive,to:"#modals"},[(0,a.Wm)(o.uT,{name:"background"},{default:(0,a.w5)((()=>[u.modalActive?((0,a.wg)(),(0,a.iD)("div",{key:0,class:"background fixed",onClick:t[0]||(t[0]=(...e)=>u.onClose&&u.onClose(...e))})):(0,a.kq)("",!0)])),_:1})],8,["disabled"])),((0,a.wg)(),(0,a.j4)(a.lR,{disabled:!u.modalActive,to:"#modals"},[(0,a.WI)(e.$slots,"default",{},(()=>[(0,a.Wm)(o.uT,{name:"content-wrapper"},{default:(0,a.w5)((()=>[u.modalActive?((0,a.wg)(),(0,a.iD)("div",i,[(0,a._)("div",{class:(0,s.C_)(["content",`size-${n.size}`])},[(0,a._)("div",r,[(0,a._)("div",{class:"close-button",onClick:t[1]||(t[1]=(...e)=>u.onClose&&u.onClose(...e))}),(0,a.WI)(e.$slots,"head",{},(()=>[(0,a._)("h2",null,(0,s.zw)(n.title),1)]),!0)]),(0,a._)("div",l,[(0,a.WI)(e.$slots,"body",{},void 0,!0)])],2)])):(0,a.kq)("",!0)])),_:3})]),!0)],8,["disabled"]))])}var d=n(4919);const u={SMALL:"small",MEDIUM:"medium",LARGE:"large"},p={name:"Modal",props:{size:{type:String,default:u.MEDIUM},title:{type:String,default:void 0},open:Boolean},emits:["update:open"],data(){return{modalKey:0}},computed:{modalActive(){return this.open&&this.$store.state.modals.at(-1)==this.modalKey}},watch:{open(){this.open?this.$store.dispatch(d.Z.MODAL_OPEN).then((e=>{this.modalKey=e})):this.$store.dispatch(d.Z.MODAL_CLOSE,this.modalKey)}},unmounted(){this.$store.dispatch(d.Z.MODAL_CLOSE,this.modalKey)},created(){this.$router.beforeResolve((()=>{if(this.modalActive)return this.onClose(),!1}))},methods:{onClose(){this.$emit("update:open",!1)}}};var m=n(3744);const h=(0,m.Z)(p,[["render",c],["__scopeId","data-v-344c2480"]]),g=h},9979:(e,t,n)=>{"use strict";n.d(t,{Z:()=>a});const a={English:{Name:"English",Code:"en",UnityLocale:"english",SteamLocale:"english",SteamCode:"en"},Français:{Name:"Français",Code:"fr",UnityLocale:"french",SteamLocale:"french",SteamCode:"fr"},Deutsch:{Name:"Deutsch",Code:"de",UnityLocale:"german",SteamLocale:"german",SteamCode:"de"},Español:{Name:"Español",Code:"es",UnityLocale:"spanish",SteamLocale:"spanish",SteamCode:"es"},Italiano:{Name:"Italiano",Code:"it",UnityLocale:"italian",SteamLocale:"italian",SteamCode:"it"},Pусский:{Name:"Pусский",Code:"ru",UnityLocale:"russian",SteamLocale:"russian",SteamCode:"ru"},Português:{Name:"Português",Code:"pt",UnityLocale:"portuguese",SteamLocale:"portuguese",SteamCode:"pt"},한국어:{Name:"한국어",Code:"ko",UnityLocale:"korean",SteamLocale:"koreana",SteamCode:"ko"},日本語:{Name:"日本語",Code:"jp",UnityLocale:"japanese",SteamLocale:"japanese",SteamCode:"ja"},简体中文:{Name:"简体中文",Code:"zh-si",UnityLocale:"chinese",SteamLocale:"schinese",SteamCode:"zh-CN"}}}},t={};function n(a){var o=t[a];if(void 0!==o)return o.exports;var s=t[a]={exports:{}};return e[a](s,s.exports,n),s.exports}n.m=e,(()=>{var e=[];n.O=(t,a,o,s)=>{if(!a){var i=1/0;for(d=0;d<e.length;d++){for(var[a,o,s]=e[d],r=!0,l=0;l<a.length;l++)(!1&s||i>=s)&&Object.keys(n.O).every((e=>n.O[e](a[l])))?a.splice(l--,1):(r=!1,s<i&&(i=s));if(r){e.splice(d--,1);var c=o();void 0!==c&&(t=c)}}return t}s=s||0;for(var d=e.length;d>0&&e[d-1][2]>s;d--)e[d]=e[d-1];e[d]=[a,o,s]}})(),(()=>{n.n=e=>{var t=e&&e.__esModule?()=>e["default"]:()=>e;return n.d(t,{a:t}),t}})(),(()=>{var e,t=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__;n.t=function(a,o){if(1&o&&(a=this(a)),8&o)return a;if("object"===typeof a&&a){if(4&o&&a.__esModule)return a;if(16&o&&"function"===typeof a.then)return a}var s=Object.create(null);n.r(s);var i={};e=e||[null,t({}),t([]),t(t)];for(var r=2&o&&a;"object"==typeof r&&!~e.indexOf(r);r=t(r))Object.getOwnPropertyNames(r).forEach((e=>i[e]=()=>a[e]));return i["default"]=()=>a,n.d(s,i),s}})(),(()=>{n.d=(e,t)=>{for(var a in t)n.o(t,a)&&!n.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})}})(),(()=>{n.f={},n.e=e=>Promise.all(Object.keys(n.f).reduce(((t,a)=>(n.f[a](e,t),t)),[]))})(),(()=>{n.u=e=>"js/"+({65:"RedStar",74:"About",142:"SpaceBuildings",261:"BlueStar",362:"Cerberus",406:"Ships",530:"PlanetsCalc",607:"Achievements",626:"AllianceLevels",636:"PlayerGoals",662:"Shield",670:"WhiteStar",677:"Support",683:"Trade",726:"Index",749:"Weapon",752:"ModulesCalc",790:"YellowStar",837:"Mining",934:"DarkRedStar"}[e]||e)+"."+{65:"c970f89b",74:"cf27855a",142:"825dcead",256:"c101fe4b",261:"01fb0dcf",278:"eabd8a43",362:"51eac958",379:"fe170461",400:"1d30e703",406:"0d19ccf5",431:"caf7b574",450:"e68c284a",530:"7566a7df",560:"8c94559c",561:"09b38c5f",607:"39782f24",626:"e82b73ea",636:"6a7826eb",662:"83b6111c",668:"560e7696",670:"a925da36",677:"d93fbfd4",683:"6f25869f",726:"e90147bc",740:"d61253fd",749:"644874b2",752:"3ba3c775",762:"a0c1be3b",790:"c5b21442",806:"f29786df",837:"07583a05",921:"5f3236d1",934:"3cc497a7",948:"6645386c",964:"f050a4d3",988:"5fecd4c5"}[e]+".js"})(),(()=>{n.miniCssF=e=>"css/"+({65:"RedStar",74:"About",142:"SpaceBuildings",261:"BlueStar",362:"Cerberus",406:"Ships",530:"PlanetsCalc",607:"Achievements",626:"AllianceLevels",636:"PlayerGoals",662:"Shield",670:"WhiteStar",677:"Support",683:"Trade",726:"Index",749:"Weapon",752:"ModulesCalc",790:"YellowStar",837:"Mining",934:"DarkRedStar"}[e]||e)+"."+{65:"d6aeb406",74:"0ffbb70d",142:"87ef1000",261:"87ef1000",362:"1b098ac8",406:"a2eb33e9",530:"74771890",607:"87ef1000",626:"87ef1000",636:"87ef1000",662:"87ef1000",670:"14551571",677:"87ef1000",683:"87ef1000",726:"cad61b87",749:"87ef1000",752:"2b55b48e",790:"4e5c292d",837:"87ef1000",921:"1db64d05",934:"87ef1000"}[e]+".css"})(),(()=>{n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()})(),(()=>{n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t)})(),(()=>{var e={},t="hades-space:";n.l=(a,o,s,i)=>{if(e[a])e[a].push(o);else{var r,l;if(void 0!==s)for(var c=document.getElementsByTagName("script"),d=0;d<c.length;d++){var u=c[d];if(u.getAttribute("src")==a||u.getAttribute("data-webpack")==t+s){r=u;break}}r||(l=!0,r=document.createElement("script"),r.charset="utf-8",r.timeout=120,n.nc&&r.setAttribute("nonce",n.nc),r.setAttribute("data-webpack",t+s),r.src=a),e[a]=[o];var p=(t,n)=>{r.onerror=r.onload=null,clearTimeout(m);var o=e[a];if(delete e[a],r.parentNode&&r.parentNode.removeChild(r),o&&o.forEach((e=>e(n))),t)return t(n)},m=setTimeout(p.bind(null,void 0,{type:"timeout",target:r}),12e4);r.onerror=p.bind(null,r.onerror),r.onload=p.bind(null,r.onload),l&&document.head.appendChild(r)}}})(),(()=>{n.r=e=>{"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}})(),(()=>{n.p="/HadesSpace/Nebula/"})(),(()=>{var e=(e,t,n,a)=>{var o=document.createElement("link");o.rel="stylesheet",o.type="text/css";var s=s=>{if(o.onerror=o.onload=null,"load"===s.type)n();else{var i=s&&("load"===s.type?"missing":s.type),r=s&&s.target&&s.target.href||t,l=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");l.code="CSS_CHUNK_LOAD_FAILED",l.type=i,l.request=r,o.parentNode.removeChild(o),a(l)}};return o.onerror=o.onload=s,o.href=t,document.head.appendChild(o),o},t=(e,t)=>{for(var n=document.getElementsByTagName("link"),a=0;a<n.length;a++){var o=n[a],s=o.getAttribute("data-href")||o.getAttribute("href");if("stylesheet"===o.rel&&(s===e||s===t))return o}var i=document.getElementsByTagName("style");for(a=0;a<i.length;a++){o=i[a],s=o.getAttribute("data-href");if(s===e||s===t)return o}},a=a=>new Promise(((o,s)=>{var i=n.miniCssF(a),r=n.p+i;if(t(i,r))return o();e(a,r,o,s)})),o={143:0};n.f.miniCss=(e,t)=>{var n={65:1,74:1,142:1,261:1,362:1,406:1,530:1,607:1,626:1,636:1,662:1,670:1,677:1,683:1,726:1,749:1,752:1,790:1,837:1,921:1,934:1};o[e]?t.push(o[e]):0!==o[e]&&n[e]&&t.push(o[e]=a(e).then((()=>{o[e]=0}),(t=>{throw delete o[e],t})))}})(),(()=>{var e={143:0};n.f.j=(t,a)=>{var o=n.o(e,t)?e[t]:void 0;if(0!==o)if(o)a.push(o[2]);else{var s=new Promise(((n,a)=>o=e[t]=[n,a]));a.push(o[2]=s);var i=n.p+n.u(t),r=new Error,l=a=>{if(n.o(e,t)&&(o=e[t],0!==o&&(e[t]=void 0),o)){var s=a&&("load"===a.type?"missing":a.type),i=a&&a.target&&a.target.src;r.message="Loading chunk "+t+" failed.\n("+s+": "+i+")",r.name="ChunkLoadError",r.type=s,r.request=i,o[1](r)}};n.l(i,l,"chunk-"+t,t)}},n.O.j=t=>0===e[t];var t=(t,a)=>{var o,s,[i,r,l]=a,c=0;if(i.some((t=>0!==e[t]))){for(o in r)n.o(r,o)&&(n.m[o]=r[o]);if(l)var d=l(n)}for(t&&t(a);c<i.length;c++)s=i[c],n.o(e,s)&&e[s]&&e[s][0](),e[s]=0;return n.O(d)},a=self["webpackChunkhades_space"]=self["webpackChunkhades_space"]||[];a.forEach(t.bind(null,0)),a.push=t.bind(null,a.push.bind(a))})();var a=n.O(void 0,[998],(()=>n(6641)));a=n.O(a)})();