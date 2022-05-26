(()=>{var e={41758:(e,t,n)=>{var a={"./de.json":[19806,806],"./en.json":[40561,561],"./es.json":[69988,988],"./fr.json":[68560,560],"./it.json":[67948,948],"./jp.json":[44964,964],"./ko.json":[22256,256],"./pt.json":[41668,668],"./ru.json":[51278,278],"./zh-si.json":[69400,400]};function o(e){if(!n.o(a,e))return Promise.resolve().then((()=>{var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=a[e],o=t[0];return n.e(t[1]).then((()=>n.t(o,19)))}o.keys=()=>Object.keys(a),o.id=41758,e.exports=o},15925:(e,t,n)=>{"use strict";n.d(t,{J1:()=>d,ZP:()=>r,g:()=>l});var a=n(66252),o=n(79150),s=n(51578);const i=(0,o.o)({locale:s.Z.state.userSettings.language});c(),d(i.global.locale);const r=i;async function l(e){await d(e),c(),i.global.locale=e}async function d(e){const t=await n(41758)(`./${e}.json`).then((e=>e.default));return i.global.setLocaleMessage(e,t),(0,a.Y3)()}function c(){document.querySelector("html")?.setAttribute("lang",i.global.locale)}},59782:(e,t,n)=>{"use strict";n.d(t,{s:()=>f,U:()=>v});const a=[{name:"Index",path:"/",component:()=>Promise.all([n.e(952),n.e(726)]).then(n.bind(n,28363))},{text:{locKey:"TID_SHIP_UPGRADE_DLG_TITLE"},children:[{name:"Trade",text:{locKey:"TYPE_MOD_TRADE"},path:"/trade",component:()=>Promise.all([n.e(952),n.e(557),n.e(136),n.e(683)]).then(n.bind(n,30070)),icon:{name:"Mod_TransportAutopilot_Icon",dir:"game/Modules"}},{name:"Mining",text:{locKey:"TYPE_MOD_MINING"},path:"/mining",component:()=>Promise.all([n.e(952),n.e(557),n.e(136),n.e(837)]).then(n.bind(n,84744)),icon:{name:"Mod_MiningBoost_Icon",dir:"game/Modules"}},{name:"Weapon",text:{locKey:"TYPE_MOD_WEAPON"},path:"/weapon",component:()=>Promise.all([n.e(952),n.e(557),n.e(136),n.e(749)]).then(n.bind(n,42817)),icon:{name:"Mod_Barrage_Icon",dir:"game/Modules"}},{name:"Shield",text:{locKey:"TYPE_MOD_SHIELD"},path:"/shield",component:()=>Promise.all([n.e(952),n.e(557),n.e(136),n.e(662)]).then(n.bind(n,76566)),icon:{name:"Mod_PassiveShield_Icon",dir:"game/Modules"}},{name:"Support",text:{locKey:"TYPE_MOD_SUPPORT"},path:"/support",component:()=>Promise.all([n.e(952),n.e(557),n.e(136),n.e(677)]).then(n.bind(n,39857)),icon:{name:"Mod_Destiny_Icon",dir:"game/Modules"}}]},{text:{locKey:"SECTIONS"},children:[{name:"Planets",text:{locKey:"PLANETS"},path:"/yellowstar#Planets",icon:{name:"planet",dir:"icons"}},{name:"Ships",text:{locKey:"TID_PRODUCTION_DLG_SHIPS"},path:"/ships",component:()=>Promise.all([n.e(952),n.e(557),n.e(136),n.e(85),n.e(406)]).then(n.bind(n,10619)),icon:{name:"Miner_lv6",dir:"game/Ships"}},{name:"Cerberus",text:{locKey:"CERBERUS"},path:"/cerberus",component:()=>Promise.all([n.e(952),n.e(557),n.e(85),n.e(362)]).then(n.bind(n,84007)),icon:{name:"Fighter_Cerberus6_lv1",dir:"game/Ships"}},{name:"SpaceBuildings",text:{locKey:"TID_PRODUCTION_DLG_STATIONS"},path:"/spacebuildings",component:()=>Promise.all([n.e(952),n.e(557),n.e(142)]).then(n.bind(n,4433)),icon:{name:"shipyard",dir:"game/SpaceBuildings"}},{text:{locKey:"TID_OBJECT_ACTION_ARTIFACTS"},path:"/redstar#Artifacts",icon:{name:"art",dir:"icons",bg:""}},{name:"AllianceLevels",text:{locKey:"TID_CORP_LEVELS_LABEL"},path:"/alliancelevels",component:()=>Promise.all([n.e(952),n.e(557),n.e(626)]).then(n.bind(n,90483)),icon:{name:"relic",dir:"icons"}},{name:"PlayerGoals",text:{locKey:"TID_EMPIRE_OBJECTIVES"},path:"/playergoals",component:()=>Promise.all([n.e(952),n.e(557),n.e(636)]).then(n.bind(n,85586)),icon:{name:"influence",dir:"icons"}},{name:"Achievements",text:{locKey:"TID_PLAYER_INFO_DLG_TAB_ACHIEVEMENTS"},path:"/achievements",component:()=>Promise.all([n.e(952),n.e(557),n.e(607)]).then(n.bind(n,97389)),icon:{name:"Leaderboards",dir:"icons"}},{name:"Distinctions",text:{locKey:"TID_PLAYER_INFO_SECTION_BADGES"},path:"/distinctions",component:()=>Promise.all([n.e(952),n.e(557),n.e(607)]).then(n.bind(n,38200)),icon:{name:"Distinction_Emperor",dir:"game/Distinctions"}}]},{text:{locKey:"STARS"},children:[{name:"YellowStar",text:{locKey:"TID_YELLOW_STAR"},path:"/yellowstar",component:()=>Promise.all([n.e(952),n.e(557),n.e(495),n.e(790)]).then(n.bind(n,88041)),icon:{name:"star_yellow",dir:"game/Stars"}},{name:"RedStar",text:{locKey:"TID_RED_STAR"},path:"/redstar",component:()=>Promise.all([n.e(952),n.e(557),n.e(65)]).then(n.bind(n,6140)),icon:{name:"star_red",dir:"game/Stars"}},{name:"WhiteStar",text:{locKey:"TID_WHITE_STAR"},path:"/whitestar",component:()=>Promise.all([n.e(952),n.e(557),n.e(495),n.e(670)]).then(n.bind(n,22598)),icon:{name:"star_white",dir:"game/Stars"}},{name:"BlueStar",text:{locKey:"TID_BLUE_STAR"},path:"/bluestar",component:()=>Promise.all([n.e(952),n.e(557),n.e(261)]).then(n.bind(n,12228)),icon:{name:"star_blue",dir:"game/Stars"}}]},{text:{locKey:"OTHER"},children:[{name:"PlanetsCalc",text:{locKey:"PLANETS_CALC"},path:"/planetscalc",component:()=>Promise.all([n.e(952),n.e(557),n.e(495),n.e(785),n.e(530)]).then(n.bind(n,80309)),icon:{name:"planets-calc",dir:"icons"}},{name:"ModulesCalc",text:{locKey:"MODULES_CALC"},path:"/modulescalc",component:()=>Promise.all([n.e(952),n.e(557),n.e(136),n.e(785),n.e(752)]).then(n.bind(n,74362)),icon:{name:"modules-calc",dir:"icons"}},{text:{locKey:"SWITCH_ACCS",params:["by Raerten","up to Android 10"]},path:{externalLink:"https://github.com/Raerten/HSAccs"},icon:{name:"github_logo",dir:"icons"}},{name:"About",text:{locKey:"ABOUT"},path:"/about",component:()=>n.e(74).then(n.bind(n,48716)),icon:{name:"info",dir:"icons"}}]}];var o=n(66252);const s=e=>((0,o.dD)("data-v-77ab1840"),e=e(),(0,o.Cn)(),e),i={class:"container"},r=s((()=>(0,o._)("title",null,"Page not found",-1))),l=s((()=>(0,o._)("h1",{class:"glitch"}," 404 ",-1))),d=s((()=>(0,o._)("p",null," Page not found ",-1))),c=(0,o.Uk)(" Home ");function u(e,t,n,a,s,u){const p=(0,o.up)("Head"),m=(0,o.up)("router-link");return(0,o.wg)(),(0,o.iD)("div",i,[(0,o.Wm)(p,null,{default:(0,o.w5)((()=>[r])),_:1}),l,d,(0,o.Wm)(m,{to:"/"},{default:(0,o.w5)((()=>[c])),_:1})])}var p=n(21232);const m={components:{Head:p.Fb}};var h=n(83744);const g=(0,h.Z)(m,[["render",u],["__scopeId","data-v-77ab1840"]]),b=g,_={path:"/:pathMatch(.*)*",name:"NotFound",component:b};function f(){return[...a.reduce(e,[]),_];function e(t,{name:n,path:a,component:o,children:s}){return o&&t.push({name:n,path:a,component:o}),s&&t.push(...s.reduce(e,[])),t}}function v(){return a.filter((e=>e.children)).map((t=>e(t)));function e({text:t,path:n,icon:a,children:o}){return{text:t,icon:a,children:o?o.map(e):void 0,link:{path:n?.externalLink||n,type:n?.externalLink?"external":"router"}}}}},56641:(e,t,n)=>{"use strict";var a=n(49963),o=n(66252);const s=e=>((0,o.dD)("data-v-62eaabcc"),e=e(),(0,o.Cn)(),e),i=s((()=>(0,o._)("title",null,"Hades Space",-1))),r=s((()=>(0,o._)("div",{class:"target-wrap"},[(0,o._)("div",{id:"table-head-target"})],-1)));function l(e,t,n,a,s,l){const d=(0,o.up)("Head"),c=(0,o.up)("vue-progress-bar"),u=(0,o.up)("Sidebar"),p=(0,o.up)("the-header"),m=(0,o.up)("router-view"),h=(0,o.up)("go-top"),g=(0,o.Q2)("touch");return(0,o.wg)(),(0,o.iD)("div",null,[(0,o.Wm)(d,null,{default:(0,o.w5)((()=>[i])),_:1}),(0,o.Wm)(c),e.isMinMode?((0,o.wg)(),(0,o.j4)(u,{key:0,open:e.sidebarIsOpen,"onUpdate:open":t[0]||(t[0]=t=>e.sidebarIsOpen=t),"swipe-handler":e.swipeHandler},null,8,["open","swipe-handler"])):(0,o.kq)("",!0),(0,o.wy)(((0,o.wg)(),(0,o.iD)("div",null,[(0,o._)("div",null,[(0,o.Wm)(p,{"is-min-mode":e.isMinMode,"open-sidebar":()=>e.setShowSidebar(!0)},null,8,["is-min-mode","open-sidebar"]),r,(0,o.Wm)(m)])])),[[g,e.swipeHandler,"swipe"]]),(0,o.Wm)(h)])}var d=n(2262),c=n(21232);function u(e,t,n,s,i,r){return(0,o.wg)(),(0,o.j4)(a.uT,null,{default:(0,o.w5)((()=>[i.show?((0,o.wg)(),(0,o.iD)("div",{key:0,class:"btn",onClick:t[0]||(t[0]=(...e)=>r.scrollToTop&&r.scrollToTop(...e))})):(0,o.kq)("",!0)])),_:1})}const p={data(){return{show:!1}},created(){this.hide=this.debounce((()=>this.show=!1))},mounted(){document.addEventListener("scroll",this.scroll)},unmounted(){document.removeEventListener("scroll",this.scroll)},methods:{scrollToTop(){window.scrollTo({top:0,behavior:"smooth"})},scroll(){const e=window.scrollY>300;this.show!=e&&(this.show=e,this.hide())},debounce(e,t=4e3){let n;return(...a)=>{clearTimeout(n),n=setTimeout((()=>{e.apply(this,a)}),t)}}}};var m=n(83744);const h=(0,m.Z)(p,[["render",u],["__scopeId","data-v-13da1cb8"]]),g=h,b=e=>((0,o.dD)("data-v-a344e8a4"),e=e(),(0,o.Cn)(),e),_={class:"offset"},f={class:"header"},v={class:"buttons"},S={class:"logo"},w=b((()=>(0,o._)("div",{class:"image"},null,-1)));function y(e,t,n,a,s,i){const r=(0,o.up)("navigation"),l=(0,o.up)("settings"),d=(0,o.up)("router-link");return(0,o.wg)(),(0,o.iD)("div",_,[(0,o._)("header",f,[(0,o._)("div",v,[n.isMinMode?((0,o.wg)(),(0,o.iD)("div",{key:0,class:"sidebar",onClick:t[0]||(t[0]=(...e)=>n.openSidebar&&n.openSidebar(...e))})):((0,o.wg)(),(0,o.iD)(o.HY,{key:1},[(0,o.Wm)(r),(0,o.Wm)(l)],64))]),(0,o._)("div",S,[(0,o.Wm)(d,{to:"/"},{default:(0,o.w5)((()=>[w])),_:1})])])])}var C=n(3577);const E=e=>((0,o.dD)("data-v-cddef5d2"),e=e(),(0,o.Cn)(),e),L={class:"container"},T={class:"sections"},D=["onClick"],O=E((()=>(0,o._)("div",{class:"icon"},null,-1))),A={class:"name"},P={class:"name"},k=["href"],I={class:"name"};function M(e,t,n,s,i,r){const l=(0,o.up)("router-link"),d=(0,o.Q2)("click-outside");return(0,o.wg)(),(0,o.iD)("nav",L,[(0,o.wy)(((0,o.wg)(),(0,o.iD)("ul",T,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(i.sections,((t,n)=>((0,o.wg)(),(0,o.iD)("li",{key:n,class:"section",onClick:()=>r.select(n)},[(0,o._)("div",null,[(0,o._)("div",{class:(0,C.C_)({selected:i.selected==n})},[O,(0,o._)("h2",A,(0,C.zw)(e.$te(t.text.locKey)?e.$t(t.text.locKey):""),1)],2),(0,o.Wm)(a.W3,{name:"list",tag:"ul",class:"list",style:(0,C.j5)({"--total":t.children.length})},{default:(0,o.w5)((()=>[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(i.selected===n?t.children:[],((t,n)=>((0,o.wg)(),(0,o.iD)("li",{key:n,style:(0,C.j5)({"--i":n+1})},["router"==t.link.type?((0,o.wg)(),(0,o.j4)(l,{key:0,to:t.link.path},{default:(0,o.w5)((()=>[(0,o._)("h2",P,(0,C.zw)(e.$t(t.text.locKey,t.text.params)),1)])),_:2},1032,["to"])):(0,o.kq)("",!0),"external"==t.link.type?((0,o.wg)(),(0,o.iD)("a",{key:1,href:t.link.path,target:"_blank"},[(0,o._)("h2",I,(0,C.zw)(e.$t(t.text.locKey,t.text.params)),1)],8,k)):(0,o.kq)("",!0)],4)))),128))])),_:2},1032,["style"])])],8,D)))),128))])),[[d,()=>r.select(null)]])])}var N=n(59782);const x={name:"Navigation",data(){return{sections:(0,N.U)(),selected:null}},created(){this.$router.afterEach((()=>{this.select(null)}))},methods:{select(e){this.selected!==e?this.selected=e:this.selected=null}}},j=(0,m.Z)(x,[["render",M],["__scopeId","data-v-cddef5d2"]]),H=j,K=e=>((0,o.dD)("data-v-89bdfa5c"),e=e(),(0,o.Cn)(),e),W=K((()=>(0,o._)("div",{class:"icon"},null,-1))),Z=K((()=>(0,o._)("span",{class:"name"},"Settings",-1))),R=[W,Z],U={class:"select"},B={class:"name"},F=["value"],G={class:"switch"},$=K((()=>(0,o._)("div",null,[(0,o._)("p",{class:"name"}," Disable filters "),(0,o._)("p",{class:"description"},"Disable all characteristic filters used to hide unimportant information")],-1))),z=["checked"],Y=K((()=>(0,o._)("label",{for:"disable-filters",class:"label"},null,-1)));function q(e,t,n,s,i,r){const l=(0,o.up)("Modal");return(0,o.wg)(),(0,o.iD)("div",null,[(0,o._)("div",{class:"button",onClick:t[0]||(t[0]=e=>i.isOpenModal=!0)},R),(0,o.Wm)(l,{open:i.isOpenModal,"onUpdate:open":t[4]||(t[4]=e=>i.isOpenModal=e),title:e.$te("TID_SETTINGS_DLG_LANGUAGE")?e.$t("TID_SETTINGS_DLG_TITLE"):""},{body:(0,o.w5)((()=>[(0,o._)("div",U,[(0,o._)("p",B,(0,C.zw)(e.$t("TID_SETTINGS_DLG_LANGUAGE")),1),(0,o.wy)((0,o._)("select",{"onUpdate:modelValue":t[1]||(t[1]=e=>i.languageCode=e),onChange:t[2]||(t[2]=(...e)=>r.changeLanguage&&r.changeLanguage(...e))},[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(i.languages,(e=>((0,o.wg)(),(0,o.iD)("option",{key:e.Code,value:e.Code},(0,C.zw)(e.Name),9,F)))),128))],544),[[a.bM,i.languageCode]])]),(0,o._)("div",G,[$,(0,o._)("input",{id:"disable-filters",class:"checkbox",type:"checkbox",checked:e.$store.state.userSettings.disableFilters,onChange:t[3]||(t[3]=(...e)=>r.switchDisableFilters&&r.switchDisableFilters(...e))},null,40,z),Y])])),_:1},8,["open","title"])])}var V=n(50139),J=n(31303),Q=n(1986);const X={name:"Settings",components:{Modal:V.Z},data(){return{isOpenModal:!1,languages:Q.Z,languageCode:this.$store.state.userSettings.language}},methods:{changeLanguage(){this.$store.commit(J.Z.SET_LANGUAGE,this.languageCode)},switchDisableFilters(){this.$store.commit(J.Z.SWITCH_DISABLE_FILTERS)}}},ee=(0,m.Z)(X,[["render",q],["__scopeId","data-v-89bdfa5c"]]),te=ee,ne={name:"Header",components:{Navigation:H,Settings:te},props:{isMinMode:{type:Boolean,requested:!0,default:null},openSidebar:{type:Function,requested:!0,default:null}}},ae=(0,m.Z)(ne,[["render",y],["__scopeId","data-v-a344e8a4"]]),oe=ae,se={key:0,class:"sidebar"};function ie(e,t){const n=(0,o.up)("navigation"),s=(0,o.up)("settings"),i=(0,o.up)("modal"),r=(0,o.Q2)("touch");return(0,o.wg)(),(0,o.j4)(i,{open:e.propModel,"onUpdate:open":t[0]||(t[0]=t=>e.propModel=t)},{default:(0,o.w5)((()=>[(0,o.Wm)(a.uT,null,{default:(0,o.w5)((()=>[e.open?(0,o.wy)(((0,o.wg)(),(0,o.iD)("div",se,[(0,o.Wm)(n),(0,o.Wm)(s)])),[[r,e.swipeHandler,"swipe"]]):(0,o.kq)("",!0)])),_:1})])),_:1},8,["open"])}const re=(0,o.aZ)({name:"Sidebar",components:{Navigation:H,Settings:te,Modal:V.Z},props:{open:Boolean,swipeHandler:{type:Function,default:void 0}},emits:["update:open"],computed:{propModel:{get(){return this.open},set(e){this.$emit("update:open",e)}}}}),le=(0,m.Z)(re,[["render",ie],["__scopeId","data-v-2886670c"]]),de=le,ce=60;function ue(e){const t=(0,d.iH)(!1),n=(0,d.iH)(window.innerWidth*ce/100);return{setShow:o,swipeHandler:s,onResize:a,isOpen:t};function a(){n.value=window.innerWidth*ce/100,e||o(!1)}function o(e){t.value=e}function s(t,a){window.TouchEvent&&"touchend"===a.type&&("right"===t&&e&&a.changedTouches[0].clientX<=n.value&&o(!0),"left"===t&&o(!1))}}const pe=1e3,me=(0,o.aZ)({name:"App",components:{Head:c.Fb,GoTop:g,TheHeader:oe,Sidebar:de},setup(){const e=(0,d.iH)(window.innerWidth<pe),{setShow:t,swipeHandler:n,onResize:a,isOpen:o}=ue(e);return{isMinMode:e,setShowSidebar:t,sidebarIsOpen:o,swipeHandler:n,onResize:a}},mounted(){this.$Progress.finish(),window.addEventListener("resize",this.resize)},unmounted(){window.removeEventListener("resize",this.resize)},created(){this.progressBar(),this.$router.beforeEach((()=>{this.setShowSidebar(!1)}))},methods:{progressBar(){this.$Progress.start(),this.$router.beforeEach((async(e,t,n)=>{e.path!==t.path&&(this.$Progress.start(),this.$Progress.set(30)),n()})),this.$router.afterEach((async()=>{this.$Progress.finish()}))},resize(){this.isMinMode=window.innerWidth<pe,this.onResize()}}}),he=(0,m.Z)(me,[["render",l],["__scopeId","data-v-62eaabcc"]]),ge=he;var be=n(42119);const _e=(0,be.p7)({history:(0,be.PO)("/HadesSpace/"),routes:(0,N.s)(),scrollBehavior(e,t,n){return n||(e.hash?new Promise((t=>{setTimeout((()=>{t({el:e.hash,behavior:"smooth",top:100})}),500)})):{top:0})}}),fe=_e;var ve=n(15925),Se=n(51578),we=n(74366),ye=n.n(we),Ce=n(67398),Ee=n(84032);const Le={VueProgressBar:{color:"#345b66",failedColor:"#874b4b",thickness:"3px",transition:{speed:"0.2s",opacity:"0.2s",termination:300},autoRevert:!0,location:"top",inverse:!1},VueGtag:{config:{id:"G-Q3X19N7LEN"}}},Te={beforeMount(e,t){const n=n=>{e.contains(n.target)||e===n.target||t.value(n)};e.__vueClickEventHandler__=n,document.addEventListener("click",n)},unmounted(e){document.removeEventListener("click",e.__vueClickEventHandler__)}};var De=n(95205);(0,De.z)("/HadesSpace/service-worker.js",{ready(){console.log("App is being served from cache by a service worker. \nFor more details, visit https://goo.gl/AFskqB")},registered(){console.log("Service worker has been registered.")},cached(){console.log("Content has been cached for offline use.")},updatefound(){console.log("New content is downloading.")},updated(){console.log("New content is available; please refresh."),window.location.reload()},offline(){console.log("No internet connection found. App is running in offline mode.")},error(e){console.error("Error during service worker registration:",e)}}),(0,a.ri)(ge).use((0,c.G6)()).use(ye(),Le.VueProgressBar).use(Ce.ZP,Le.VueGtag,fe).use(Ee.Z).directive("click-outside",Te).use(ve.ZP).use(fe).use(Se.Z).mount("#app")},51578:(e,t,n)=>{"use strict";n.d(t,{Z:()=>y});var a=n(88637),o=n(34919),s=n(31303),i=n(1986),r=n(15925);const l="settings",d=Object.values(i.Z).map((e=>e.Code)),c="en",u=_(l),p=window.navigator.language.slice(0,2),m=!1,h={[s.Z.SET_LANGUAGE](e,t){return e.language=t,b(l,e),(0,r.g)(t)},[s.Z.SWITCH_DISABLE_FILTERS](e){return e.disableFilters=!e.disableFilters,b(l,e),e.disableFilters}},g={namespaced:!1,strict:m,state:{language:u.language||(p in d?p:c),disableFilters:u.disableFilters||!1},mutations:h};function b(e,t){localStorage.setItem(e,JSON.stringify(t))}function _(e){let t={language:c,disableFilters:!1};if(localStorage.getItem(e))try{t=JSON.parse(localStorage.getItem(e)||"{}")}catch(n){console.error(n),localStorage.removeItem(e)}return t}const f=!1,v={modals:[]},S={[o.Z.MODAL_OPEN](e,t){e.modals.push(t)},[o.Z.MODAL_CLOSE](e,t){const n=e.modals.indexOf(t);-1!=n&&e.modals.splice(n,1)}},w={[o.Z.MODAL_OPEN]({state:e,commit:t}){const n=e.modals.length+1;return t(o.Z.MODAL_OPEN,n),n},[o.Z.MODAL_CLOSE]({commit:e},t){e(o.Z.MODAL_CLOSE,t)}},y=((0,a.hu)({logActions:!1}),(0,a.MT)({strict:f,state:v,mutations:S,actions:w,modules:{userSettings:g}}))},31303:(e,t,n)=>{"use strict";n.d(t,{Z:()=>a});const a=Object.freeze({SET_LANGUAGE:"SetLanguage",SWITCH_DISABLE_FILTERS:"SwitchDisableFilters"})},34919:(e,t,n)=>{"use strict";n.d(t,{Z:()=>a});const a=Object.freeze({MODAL_OPEN:"ModalOpen",MODAL_CLOSE:"ModalClose"})},50139:(e,t,n)=>{"use strict";n.d(t,{z:()=>u,Z:()=>g});var a=n(66252),o=n(49963),s=n(3577);const i={key:0,class:"content-wrapper fixed"},r={class:"head"},l={class:"body"};function d(e,t,n,d,c,u){return(0,a.wg)(),(0,a.iD)("div",null,[((0,a.wg)(),(0,a.j4)(a.lR,{disabled:!u.modalActive,to:"#modals"},[(0,a.Wm)(o.uT,{name:"background"},{default:(0,a.w5)((()=>[u.modalActive?((0,a.wg)(),(0,a.iD)("div",{key:0,class:"background fixed",onClick:t[0]||(t[0]=(...e)=>u.onClose&&u.onClose(...e))})):(0,a.kq)("",!0)])),_:1})],8,["disabled"])),((0,a.wg)(),(0,a.j4)(a.lR,{disabled:!u.modalActive,to:"#modals"},[(0,a.WI)(e.$slots,"default",{},(()=>[(0,a.Wm)(o.uT,{name:"content-wrapper"},{default:(0,a.w5)((()=>[u.modalActive?((0,a.wg)(),(0,a.iD)("div",i,[(0,a._)("div",{class:(0,s.C_)(["content",`size-${n.size}`])},[(0,a._)("div",r,[(0,a._)("div",{class:"close-button",onClick:t[1]||(t[1]=(...e)=>u.onClose&&u.onClose(...e))}),(0,a.WI)(e.$slots,"head",{},(()=>[(0,a._)("h2",null,(0,s.zw)(n.title),1)]),!0)]),(0,a._)("div",l,[(0,a.WI)(e.$slots,"body",{},void 0,!0)])],2)])):(0,a.kq)("",!0)])),_:3})]),!0)],8,["disabled"]))])}var c=n(34919);const u={SMALL:"small",MEDIUM:"medium",LARGE:"large"},p={name:"Modal",props:{size:{type:String,default:u.MEDIUM},title:{type:String,default:void 0},open:Boolean},emits:["update:open"],data(){return{modalKey:0}},computed:{modalActive(){return this.open&&this.$store.state.modals.at(-1)==this.modalKey}},watch:{open(){this.open?this.$store.dispatch(c.Z.MODAL_OPEN).then((e=>{this.modalKey=e})):this.$store.dispatch(c.Z.MODAL_CLOSE,this.modalKey)}},unmounted(){this.$store.dispatch(c.Z.MODAL_CLOSE,this.modalKey)},created(){this.$router.beforeResolve((()=>{if(this.modalActive)return this.onClose(),!1}))},methods:{onClose(){this.$emit("update:open",!1)}}};var m=n(83744);const h=(0,m.Z)(p,[["render",d],["__scopeId","data-v-344c2480"]]),g=h},1986:(e,t,n)=>{"use strict";n.d(t,{Z:()=>a});const a={English:{Name:"English",Code:"en",UnityLocale:"english",SteamLocale:"english",SteamCode:"en"},Français:{Name:"Français",Code:"fr",UnityLocale:"french",SteamLocale:"french",SteamCode:"fr"},Deutsch:{Name:"Deutsch",Code:"de",UnityLocale:"german",SteamLocale:"german",SteamCode:"de"},Español:{Name:"Español",Code:"es",UnityLocale:"spanish",SteamLocale:"spanish",SteamCode:"es"},Italiano:{Name:"Italiano",Code:"it",UnityLocale:"italian",SteamLocale:"italian",SteamCode:"it"},Pусский:{Name:"Pусский",Code:"ru",UnityLocale:"russian",SteamLocale:"russian",SteamCode:"ru"},Português:{Name:"Português",Code:"pt",UnityLocale:"portuguese",SteamLocale:"portuguese",SteamCode:"pt"},한국어:{Name:"한국어",Code:"ko",UnityLocale:"korean",SteamLocale:"koreana",SteamCode:"ko"},日本語:{Name:"日本語",Code:"jp",UnityLocale:"japanese",SteamLocale:"japanese",SteamCode:"ja"},简体中文:{Name:"简体中文",Code:"zh-si",UnityLocale:"chinese",SteamLocale:"schinese",SteamCode:"zh-CN"}}}},t={};function n(a){var o=t[a];if(void 0!==o)return o.exports;var s=t[a]={exports:{}};return e[a](s,s.exports,n),s.exports}n.m=e,(()=>{var e=[];n.O=(t,a,o,s)=>{if(!a){var i=1/0;for(c=0;c<e.length;c++){for(var[a,o,s]=e[c],r=!0,l=0;l<a.length;l++)(!1&s||i>=s)&&Object.keys(n.O).every((e=>n.O[e](a[l])))?a.splice(l--,1):(r=!1,s<i&&(i=s));if(r){e.splice(c--,1);var d=o();void 0!==d&&(t=d)}}return t}s=s||0;for(var c=e.length;c>0&&e[c-1][2]>s;c--)e[c]=e[c-1];e[c]=[a,o,s]}})(),(()=>{n.n=e=>{var t=e&&e.__esModule?()=>e["default"]:()=>e;return n.d(t,{a:t}),t}})(),(()=>{var e,t=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__;n.t=function(a,o){if(1&o&&(a=this(a)),8&o)return a;if("object"===typeof a&&a){if(4&o&&a.__esModule)return a;if(16&o&&"function"===typeof a.then)return a}var s=Object.create(null);n.r(s);var i={};e=e||[null,t({}),t([]),t(t)];for(var r=2&o&&a;"object"==typeof r&&!~e.indexOf(r);r=t(r))Object.getOwnPropertyNames(r).forEach((e=>i[e]=()=>a[e]));return i["default"]=()=>a,n.d(s,i),s}})(),(()=>{n.d=(e,t)=>{for(var a in t)n.o(t,a)&&!n.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})}})(),(()=>{n.f={},n.e=e=>Promise.all(Object.keys(n.f).reduce(((t,a)=>(n.f[a](e,t),t)),[]))})(),(()=>{n.u=e=>"js/"+({65:"RedStar",74:"About",142:"SpaceBuildings",261:"BlueStar",362:"Cerberus",406:"Ships",530:"PlanetsCalc",607:"Achievements",626:"AllianceLevels",636:"PlayerGoals",662:"Shield",670:"WhiteStar",677:"Support",683:"Trade",726:"Index",749:"Weapon",752:"ModulesCalc",790:"YellowStar",837:"Mining"}[e]||e)+"."+{65:"019627bf",74:"d19f796c",85:"ec5e7d8a",136:"0e4adc1b",142:"c72d24bc",256:"e37bf155",261:"27a1957b",278:"a5fa9fb9",362:"828b73c0",400:"90f5d676",406:"560dd687",495:"e53b73f3",530:"c5229994",557:"2774502b",560:"bbdea0bd",561:"99010bbd",607:"3d0deb2f",626:"3ae006ee",636:"dcc81973",662:"2f18573f",668:"b42dc826",670:"9aa5210e",677:"e9ab721a",683:"3892d2a6",726:"d0e04371",749:"a24cf24b",752:"61721325",785:"f31887d3",790:"689f57b2",806:"5c68abaf",837:"33c28532",948:"a26dcd78",952:"a9cd6376",964:"7b493af4",988:"5241486b"}[e]+".js"})(),(()=>{n.miniCssF=e=>"css/"+({65:"RedStar",74:"About",142:"SpaceBuildings",261:"BlueStar",362:"Cerberus",406:"Ships",530:"PlanetsCalc",607:"Achievements",626:"AllianceLevels",636:"PlayerGoals",662:"Shield",670:"WhiteStar",677:"Support",683:"Trade",726:"Index",749:"Weapon",752:"ModulesCalc",790:"YellowStar",837:"Mining"}[e]||e)+"."+{65:"a57cdc96",74:"b04d93b0",142:"0831eda4",261:"0831eda4",362:"778d98c3",406:"86ea8754",530:"8f6c5794",607:"0831eda4",626:"0831eda4",636:"0831eda4",662:"0831eda4",670:"db64cad6",677:"0831eda4",683:"0831eda4",726:"61a1a573",749:"0831eda4",752:"5f16addd",790:"1d46f004",837:"0831eda4",952:"00e32d41"}[e]+".css"})(),(()=>{n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()})(),(()=>{n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t)})(),(()=>{var e={},t="hades-space:";n.l=(a,o,s,i)=>{if(e[a])e[a].push(o);else{var r,l;if(void 0!==s)for(var d=document.getElementsByTagName("script"),c=0;c<d.length;c++){var u=d[c];if(u.getAttribute("src")==a||u.getAttribute("data-webpack")==t+s){r=u;break}}r||(l=!0,r=document.createElement("script"),r.charset="utf-8",r.timeout=120,n.nc&&r.setAttribute("nonce",n.nc),r.setAttribute("data-webpack",t+s),r.src=a),e[a]=[o];var p=(t,n)=>{r.onerror=r.onload=null,clearTimeout(m);var o=e[a];if(delete e[a],r.parentNode&&r.parentNode.removeChild(r),o&&o.forEach((e=>e(n))),t)return t(n)},m=setTimeout(p.bind(null,void 0,{type:"timeout",target:r}),12e4);r.onerror=p.bind(null,r.onerror),r.onload=p.bind(null,r.onload),l&&document.head.appendChild(r)}}})(),(()=>{n.r=e=>{"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}})(),(()=>{n.p="/HadesSpace/"})(),(()=>{var e=(e,t,n,a)=>{var o=document.createElement("link");o.rel="stylesheet",o.type="text/css";var s=s=>{if(o.onerror=o.onload=null,"load"===s.type)n();else{var i=s&&("load"===s.type?"missing":s.type),r=s&&s.target&&s.target.href||t,l=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");l.code="CSS_CHUNK_LOAD_FAILED",l.type=i,l.request=r,o.parentNode.removeChild(o),a(l)}};return o.onerror=o.onload=s,o.href=t,document.head.appendChild(o),o},t=(e,t)=>{for(var n=document.getElementsByTagName("link"),a=0;a<n.length;a++){var o=n[a],s=o.getAttribute("data-href")||o.getAttribute("href");if("stylesheet"===o.rel&&(s===e||s===t))return o}var i=document.getElementsByTagName("style");for(a=0;a<i.length;a++){o=i[a],s=o.getAttribute("data-href");if(s===e||s===t)return o}},a=a=>new Promise(((o,s)=>{var i=n.miniCssF(a),r=n.p+i;if(t(i,r))return o();e(a,r,o,s)})),o={143:0};n.f.miniCss=(e,t)=>{var n={65:1,74:1,142:1,261:1,362:1,406:1,530:1,607:1,626:1,636:1,662:1,670:1,677:1,683:1,726:1,749:1,752:1,790:1,837:1,952:1};o[e]?t.push(o[e]):0!==o[e]&&n[e]&&t.push(o[e]=a(e).then((()=>{o[e]=0}),(t=>{throw delete o[e],t})))}})(),(()=>{var e={143:0};n.f.j=(t,a)=>{var o=n.o(e,t)?e[t]:void 0;if(0!==o)if(o)a.push(o[2]);else{var s=new Promise(((n,a)=>o=e[t]=[n,a]));a.push(o[2]=s);var i=n.p+n.u(t),r=new Error,l=a=>{if(n.o(e,t)&&(o=e[t],0!==o&&(e[t]=void 0),o)){var s=a&&("load"===a.type?"missing":a.type),i=a&&a.target&&a.target.src;r.message="Loading chunk "+t+" failed.\n("+s+": "+i+")",r.name="ChunkLoadError",r.type=s,r.request=i,o[1](r)}};n.l(i,l,"chunk-"+t,t)}},n.O.j=t=>0===e[t];var t=(t,a)=>{var o,s,[i,r,l]=a,d=0;if(i.some((t=>0!==e[t]))){for(o in r)n.o(r,o)&&(n.m[o]=r[o]);if(l)var c=l(n)}for(t&&t(a);d<i.length;d++)s=i[d],n.o(e,s)&&e[s]&&e[s][0](),e[s]=0;return n.O(c)},a=self["webpackChunkhades_space"]=self["webpackChunkhades_space"]||[];a.forEach(t.bind(null,0)),a.push=t.bind(null,a.push.bind(a))})();var a=n.O(void 0,[998],(()=>n(56641)));a=n.O(a)})();