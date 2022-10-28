(()=>{var e={41758:(e,t,n)=>{var o={"./de.json":[19806,806],"./en.json":[40561,561],"./es.json":[69988,988],"./fr.json":[68560,560],"./it.json":[67948,948],"./jp.json":[44964,964],"./ko.json":[22256,256],"./pt.json":[41668,668],"./ru.json":[51278,278],"./zh-si.json":[69400,400]};function a(e){if(!n.o(o,e))return Promise.resolve().then((()=>{var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=o[e],a=t[0];return n.e(t[1]).then((()=>n.t(a,19)))}a.keys=()=>Object.keys(o),a.id=41758,e.exports=a},15925:(e,t,n)=>{"use strict";n.d(t,{J1:()=>d,ZP:()=>r,g:()=>l});var o=n(66252),a=n(79150),s=n(51578);const i=(0,a.o)({locale:s.Z.state.userSettings.language});c(),d(i.global.locale);const r=i;async function l(e){await d(e),c(),i.global.locale=e}async function d(e){const t=await n(41758)(`./${e}.json`).then((e=>e.default));return i.global.setLocaleMessage(e,t),(0,o.Y3)()}function c(){document.querySelector("html")?.setAttribute("lang",i.global.locale)}},59782:(e,t,n)=>{"use strict";n.d(t,{s:()=>b,U:()=>S});const o=!!{NODE_ENV:"production",BASE_URL:"/HadesSpace/"}.VUE_APP_NEBULA_BUILD,a=[{name:"Index",path:"/",component:()=>Promise.all([n.e(449),n.e(726)]).then(n.bind(n,68123))},{text:{locKey:"TID_SHIP_UPGRADE_DLG_TITLE"},children:[{name:"Trade",text:{locKey:o?"TID_MODULE_BLUEPRINTS_LIST_CATEGORY_TRADE":"TYPE_MOD_TRADE"},path:"/trade",component:()=>Promise.all([n.e(449),n.e(22),n.e(286),n.e(683)]).then(n.bind(n,82512)),icon:{name:o?"Mod_Category_Trade":"Mod_TransportAutopilot_Icon",dir:"game/Modules"}},{name:"Mining",text:{locKey:o?"TID_MODULE_BLUEPRINTS_LIST_CATEGORY_MINING":"TYPE_MOD_MINING"},path:"/mining",component:()=>Promise.all([n.e(449),n.e(22),n.e(286),n.e(837)]).then(n.bind(n,84744)),icon:{name:o?"Mod_Category_Mining":"Mod_MiningBoost_Icon",dir:"game/Modules"}},{name:"Weapon",text:{locKey:o?"TID_MODULE_BLUEPRINTS_LIST_CATEGORY_WEAPONS":"TYPE_MOD_WEAPON"},path:"/weapon",component:()=>Promise.all([n.e(449),n.e(22),n.e(286),n.e(749)]).then(n.bind(n,42817)),icon:{name:o?"Mod_Category_Weapon":"Mod_Barrage_Icon",dir:"game/Modules"}},{name:"Shield",text:{locKey:o?"TID_MODULE_BLUEPRINTS_LIST_CATEGORY_SHIELDS":"TYPE_MOD_SHIELD"},path:"/shield",component:()=>Promise.all([n.e(449),n.e(22),n.e(286),n.e(662)]).then(n.bind(n,76566)),icon:{name:o?"Mod_Category_Shield":"Mod_Shields_Icon",dir:"game/Modules"}},{name:"Support",text:{locKey:o?"TID_MODULE_BLUEPRINTS_LIST_CATEGORY_SUPPORT":"TYPE_MOD_SUPPORT"},path:"/support",component:()=>Promise.all([n.e(449),n.e(22),n.e(286),n.e(677)]).then(n.bind(n,73498)),icon:{name:o?"Mod_Category_Support":"Mod_Destiny_Icon",dir:"game/Modules"}},o?{name:"Drone",text:{locKey:"TID_MODULE_BLUEPRINTS_LIST_CATEGORY_DRONE"},path:"/drone",component:()=>Promise.all([n.e(449),n.e(22),n.e(286),n.e(177)]).then(n.bind(n,15460)),icon:{name:"Mod_Category_Drone",dir:"game/Modules"}}:void 0,o?{text:{locKey:"TID_CORP_FLAGSHIP"},path:"/ships#FlagshipModules",icon:{name:"Mod_Category_Support",dir:"game/Modules"}}:void 0]},{text:{locKey:"SECTIONS"},children:[{name:"Planets",text:{locKey:"PLANETS"},path:"/yellowstar#Planets",icon:{name:"planet",dir:"icons"}},{name:"Ships",text:{locKey:"TID_PRODUCTION_DLG_SHIPS"},path:"/ships",component:()=>Promise.all([n.e(449),n.e(22),n.e(286),n.e(85),n.e(406)]).then(n.bind(n,22030)),icon:{name:o?"Transport_DrkNeb_lv5":"Miner_lv6",dir:"game/Ships"}},{name:"Cerberus",text:{locKey:"CERBERUS"},path:"/cerberus",component:()=>Promise.all([n.e(449),n.e(22),n.e(85),n.e(362)]).then(n.bind(n,29087)),icon:{name:o?"Fighter_DrkNeb_Cerberus5_lv1":"Fighter_Cerberus6_lv1",dir:"game/Ships"}},{name:"SpaceBuildings",text:{locKey:"TID_PRODUCTION_DLG_STATIONS"},path:"/spacebuildings",component:()=>Promise.all([n.e(449),n.e(22),n.e(142)]).then(n.bind(n,85491)),icon:{name:o?"station_trade":"trade_station",dir:"game/SpaceBuildings"}},{text:{locKey:"TID_OBJECT_ACTION_ARTIFACTS"},path:"/redstar#Artifacts",icon:{name:"art",dir:"icons",bg:""}},{name:"AllianceLevels",text:{locKey:"TID_CORP_LEVELS_LABEL"},path:"/alliancelevels",component:()=>Promise.all([n.e(449),n.e(22),n.e(626)]).then(n.bind(n,90483)),icon:{name:o?"corpXp":"relic",dir:"icons"}},{name:"PlayerGoals",text:{locKey:"TID_EMPIRE_OBJECTIVES"},path:"/playergoals",component:()=>Promise.all([n.e(449),n.e(22),n.e(636)]).then(n.bind(n,89859)),icon:{name:"influence",dir:"icons"}},{name:"Achievements",text:{locKey:"TID_PLAYER_INFO_DLG_TAB_ACHIEVEMENTS"},path:"/achievements",component:()=>Promise.all([n.e(449),n.e(22),n.e(607)]).then(n.bind(n,97389)),icon:{name:"Leaderboards",dir:"icons"}},{name:"Distinctions",text:{locKey:"TID_PLAYER_INFO_SECTION_BADGES"},path:"/distinctions",component:()=>Promise.all([n.e(449),n.e(22),n.e(607)]).then(n.bind(n,38200)),icon:{name:"Distinction_Emperor",dir:"game/Distinctions"}}]},{text:{locKey:"STARS"},children:[{name:"YellowStar",text:{locKey:"TID_YELLOW_STAR"},path:"/yellowstar",component:()=>Promise.all([n.e(449),n.e(22),n.e(790)]).then(n.bind(n,83961)),icon:{name:"star_yellow",dir:"game/Stars"}},{name:"RedStar",text:{locKey:"TID_RED_STAR"},path:"/redstar",component:()=>Promise.all([n.e(449),n.e(22),n.e(65)]).then(n.bind(n,99330)),icon:{name:"star_red",dir:"game/Stars"}},{name:"WhiteStar",text:{locKey:"TID_WHITE_STAR"},path:"/whitestar",component:()=>Promise.all([n.e(449),n.e(22),n.e(670)]).then(n.bind(n,22598)),icon:{name:"star_white",dir:"game/Stars"}},{name:"BlueStar",text:{locKey:"TID_BLUE_STAR"},path:"/bluestar",component:()=>Promise.all([n.e(449),n.e(22),n.e(261)]).then(n.bind(n,4750)),icon:{name:"star_blue",dir:"game/Stars"}}]},{text:{locKey:"OTHER"},children:[{name:"PlanetsCalc",text:{locKey:"PLANETS_CALC"},path:"/planetscalc",component:()=>Promise.all([n.e(449),n.e(22),n.e(410),n.e(530)]).then(n.bind(n,21664)),icon:{name:"planets-calc",dir:"icons"}},{name:"ModulesCalc",text:{locKey:"MODULES_CALC"},path:"/modulescalc",component:()=>Promise.all([n.e(449),n.e(22),n.e(286),n.e(410),n.e(752)]).then(n.bind(n,93344)),icon:{name:"modules-calc",dir:"icons"}},o?{name:"GameDiffLog",text:{locKey:"Nerf log"},path:"/GameDiffLog",component:()=>Promise.all([n.e(449),n.e(22),n.e(286),n.e(934)]).then(n.bind(n,37686)),icon:{name:"clock",dir:"icons"}}:void 0,{text:{locKey:"SWITCH_ACCS",params:["by Raerten","up to Android 10"]},path:{externalLink:"https://github.com/Raerten/HSAccs"},icon:{name:"github_logo",dir:"icons"}},{name:"About",text:{locKey:"ABOUT"},path:"/about",component:()=>n.e(74).then(n.bind(n,26334)),icon:{name:"info",dir:"icons"}}]}];var s=n(66252);const i=e=>((0,s.dD)("data-v-77ab1840"),e=e(),(0,s.Cn)(),e),r={class:"container"},l=i((()=>(0,s._)("title",null,"Page not found",-1))),d=i((()=>(0,s._)("h1",{class:"glitch"}," 404 ",-1))),c=i((()=>(0,s._)("p",null," Page not found ",-1)));function u(e,t,n,o,a,i){const u=(0,s.up)("Head"),p=(0,s.up)("router-link");return(0,s.wg)(),(0,s.iD)("div",r,[(0,s.Wm)(u,null,{default:(0,s.w5)((()=>[l])),_:1}),d,c,(0,s.Wm)(p,{to:"/"},{default:(0,s.w5)((()=>[(0,s.Uk)(" Home ")])),_:1})])}var p=n(21232);const h={components:{Head:p.Fb}};var m=n(83744);const _=(0,m.Z)(h,[["render",u],["__scopeId","data-v-77ab1840"]]),g=_,f={path:"/:pathMatch(.*)*",name:"NotFound",component:g};function b(){return[...a.reduce(e,[]),f];function e(t,{name:n,path:o,component:a,children:s}){return a&&t.push({name:n,path:o,component:a}),s&&t.push(...s.filter(Boolean).reduce(e,[])),t}}function S(){return a.filter((e=>e.children)).map((t=>e(t)));function e({text:t,path:n,icon:o,children:a}){return{text:t,icon:o,children:a?a.filter(Boolean).map(e):void 0,link:{path:n?.externalLink||n,type:n?.externalLink?"external":"router"}}}}},10818:(e,t,n)=>{"use strict";var o=n(49963),a=n(66252);const s=e=>((0,a.dD)("data-v-52b5c508"),e=e(),(0,a.Cn)(),e),i=s((()=>(0,a._)("title",null,"Hades Space",-1))),r=s((()=>(0,a._)("div",{class:"target-wrap"},[(0,a._)("div",{id:"table-head-target"})],-1)));function l(e,t,n,o,s,l){const d=(0,a.up)("Head"),c=(0,a.up)("vue-progress-bar"),u=(0,a.up)("router-view"),p=(0,a.up)("the-header"),h=(0,a.up)("Sidebar"),m=(0,a.up)("go-top"),_=(0,a.Q2)("touch");return(0,a.wg)(),(0,a.iD)("div",null,[(0,a.Wm)(d,null,{default:(0,a.w5)((()=>[i])),_:1}),(0,a.Wm)(c),(0,a.wy)(((0,a.wg)(),(0,a.iD)("div",null,[(0,a._)("div",null,[(0,a.Wm)(p,{"is-min-mode":e.isMinMode,"open-sidebar":()=>e.setShowSidebar(!0)},{default:(0,a.w5)((()=>[r,(0,a.Wm)(u)])),_:1},8,["is-min-mode","open-sidebar"]),e.isMinMode?((0,a.wg)(),(0,a.j4)(h,{key:0,open:e.sidebarIsOpen,"onUpdate:open":t[0]||(t[0]=t=>e.sidebarIsOpen=t),"swipe-handler":e.swipeHandler},null,8,["open","swipe-handler"])):(0,a.kq)("",!0)])])),[[_,e.swipeHandler,"swipe"]]),(0,a.Wm)(m)])}var d=n(2262),c=n(21232);const u=e=>((0,a.dD)("data-v-64d51f0a"),e=e(),(0,a.Cn)(),e),p=u((()=>(0,a._)("div",{class:"icon"},null,-1))),h=[p];function m(e,t,n,s,i,r){return(0,a.wg)(),(0,a.j4)(o.uT,null,{default:(0,a.w5)((()=>[i.show?((0,a.wg)(),(0,a.iD)("div",{key:0,class:"btn",onClick:t[0]||(t[0]=(...e)=>r.scrollToTop&&r.scrollToTop(...e))},h)):(0,a.kq)("",!0)])),_:1})}var _=n(91296),g=n.n(_);const f={data(){return{show:!1}},created(){this.hide=g()((()=>this.show=!1),4e3)},mounted(){document.addEventListener("scroll",this.scroll)},unmounted(){document.removeEventListener("scroll",this.scroll)},methods:{scrollToTop(){window.scrollTo({top:0,behavior:"smooth"})},scroll(){const e=window.scrollY>300;this.show!=e&&(this.show=e,this.hide())}}};var b=n(83744);const S=(0,b.Z)(f,[["render",m],["__scopeId","data-v-64d51f0a"]]),v=S,y=e=>((0,a.dD)("data-v-15822e8a"),e=e(),(0,a.Cn)(),e),w=y((()=>(0,a._)("div",{class:"offset"},null,-1))),E={class:"header"},D={class:"buttons"},T={class:"logo"},C=y((()=>(0,a._)("div",{class:"image"},null,-1)));function L(e,t,n,o,s,i){const r=(0,a.up)("navigation"),l=(0,a.up)("settings"),d=(0,a.up)("router-link");return(0,a.wg)(),(0,a.iD)("div",null,[w,(0,a.WI)(e.$slots,"default",{},void 0,!0),(0,a._)("header",E,[(0,a._)("div",D,[n.isMinMode?((0,a.wg)(),(0,a.iD)("div",{key:0,class:"sidebar",onClick:t[0]||(t[0]=(...e)=>n.openSidebar&&n.openSidebar(...e))})):((0,a.wg)(),(0,a.iD)(a.HY,{key:1},[(0,a.Wm)(r),(0,a.Wm)(l)],64))]),(0,a._)("div",T,[(0,a.Wm)(d,{to:"/"},{default:(0,a.w5)((()=>[C])),_:1})])])])}var O=n(3577);const I=e=>((0,a.dD)("data-v-1ad2e428"),e=e(),(0,a.Cn)(),e),M={class:"container"},A={class:"sections"},P=["onClick"],k=I((()=>(0,a._)("div",{class:"icon"},null,-1))),N={class:"name"},x={class:"name"},K=["href"],R={class:"name"};function U(e,t,n,s,i,r){const l=(0,a.up)("router-link"),d=(0,a.Q2)("click-outside");return(0,a.wg)(),(0,a.iD)("nav",M,[(0,a.wy)(((0,a.wg)(),(0,a.iD)("ul",A,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(i.sections,((t,n)=>((0,a.wg)(),(0,a.iD)("li",{key:n,class:"section",onClick:()=>r.select(n)},[(0,a._)("div",null,[(0,a._)("div",{class:(0,O.C_)({selected:i.selected==n})},[k,(0,a._)("h2",N,(0,O.zw)(e.$te(t.text.locKey)?e.$t(t.text.locKey):""),1)],2),(0,a.Wm)(o.W3,{name:"list",tag:"ul",class:"list",style:(0,O.j5)({"--total":t.children.length})},{default:(0,a.w5)((()=>[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(i.selected===n?t.children:[],((t,n)=>((0,a.wg)(),(0,a.iD)("li",{key:n,style:(0,O.j5)({"--i":n+1})},["router"==t.link.type?((0,a.wg)(),(0,a.j4)(l,{key:0,to:t.link.path},{default:(0,a.w5)((()=>[(0,a._)("h2",x,(0,O.zw)(e.$t(t.text.locKey,t.text.params)),1)])),_:2},1032,["to"])):(0,a.kq)("",!0),"external"==t.link.type?((0,a.wg)(),(0,a.iD)("a",{key:1,href:t.link.path,target:"_blank"},[(0,a._)("h2",R,(0,O.zw)(e.$t(t.text.locKey,t.text.params)),1)],8,K)):(0,a.kq)("",!0)],4)))),128))])),_:2},1032,["style"])])],8,P)))),128))])),[[d,()=>r.select(null)]])])}var H=n(59782);const j={name:"Navigation",data(){return{sections:(0,H.U)(),selected:null}},created(){this.$router.afterEach((()=>{this.select(null)}))},methods:{select(e){this.selected!==e?this.selected=e:this.selected=null}}},W=(0,b.Z)(j,[["render",U],["__scopeId","data-v-1ad2e428"]]),B=W,G=e=>((0,a.dD)("data-v-80706932"),e=e(),(0,a.Cn)(),e),Z=G((()=>(0,a._)("div",{class:"icon"},null,-1))),F=G((()=>(0,a._)("span",{class:"name"},"Settings",-1))),$=[Z,F],Y={class:"select"},z={class:"name"},q=["value"],V={class:"switch"},J=G((()=>(0,a._)("div",null,[(0,a._)("p",{class:"name"}," Disable filters "),(0,a._)("p",{class:"description"},"Disable all characteristic filters used to hide unimportant information")],-1))),Q=["checked"],X=G((()=>(0,a._)("label",{for:"disable-filters",class:"label"},null,-1))),ee={key:0,class:"switch"},te=G((()=>(0,a._)("div",null,[(0,a._)("p",{class:"name"}," [Debug] Show keys "),(0,a._)("p",{class:"description"})],-1))),ne=["checked"],oe=G((()=>(0,a._)("label",{for:"show-keys",class:"label"},null,-1)));function ae(e,t,n,s,i,r){const l=(0,a.up)("Modal");return(0,a.wg)(),(0,a.iD)("div",null,[(0,a._)("div",{class:"button",onClick:t[0]||(t[0]=e=>i.isOpenModal=!0)},$),(0,a.Wm)(l,{open:i.isOpenModal,"onUpdate:open":t[5]||(t[5]=e=>i.isOpenModal=e),title:e.$te("TID_SETTINGS_DLG_LANGUAGE")?e.$t("TID_SETTINGS_DLG_TITLE"):""},{body:(0,a.w5)((()=>[(0,a._)("div",Y,[(0,a._)("p",z,(0,O.zw)(e.$t("TID_SETTINGS_DLG_LANGUAGE")),1),(0,a.wy)((0,a._)("select",{"onUpdate:modelValue":t[1]||(t[1]=e=>i.languageCode=e),onChange:t[2]||(t[2]=(...e)=>r.changeLanguage&&r.changeLanguage(...e))},[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(i.languages,(e=>((0,a.wg)(),(0,a.iD)("option",{key:e.Code,value:e.Code},(0,O.zw)(e.Name),9,q)))),128))],544),[[o.bM,i.languageCode]])]),(0,a._)("div",V,[J,(0,a._)("input",{id:"disable-filters",class:"checkbox",type:"checkbox",checked:e.$store.state.userSettings.disableFilters,onChange:t[3]||(t[3]=(...e)=>r.switchDisableFilters&&r.switchDisableFilters(...e))},null,40,Q),X]),i.isDebug?((0,a.wg)(),(0,a.iD)("div",ee,[te,(0,a._)("input",{id:"show-keys",class:"checkbox",type:"checkbox",checked:e.$store.state.userSettings.showKeys,onChange:t[4]||(t[4]=(...e)=>r.switchShowKeys&&r.switchShowKeys(...e))},null,40,ne),oe])):(0,a.kq)("",!0)])),_:1},8,["open","title"])])}var se=n(34272),ie=n(31303),re=n(1986);const le={name:"Settings",components:{Modal:se.Z},data(){return{isOpenModal:!1,languages:re.Z,languageCode:this.$store.state.userSettings.language,isDebug:!1}},methods:{changeLanguage(){this.$store.commit(ie.Z.SET_LANGUAGE,this.languageCode)},switchDisableFilters(){this.$store.commit(ie.Z.SWITCH_DISABLE_FILTERS)},switchShowKeys(){this.$store.commit(ie.Z.DEBUG_SWITCH_SHOW_KEYS)}}},de=(0,b.Z)(le,[["render",ae],["__scopeId","data-v-80706932"]]),ce=de,ue={name:"Header",components:{Navigation:B,Settings:ce},props:{isMinMode:{type:Boolean,requested:!0,default:null},openSidebar:{type:Function,requested:!0,default:null}}},pe=(0,b.Z)(ue,[["render",L],["__scopeId","data-v-15822e8a"]]),he=pe,me={key:0,class:"sidebar"};function _e(e,t){const n=(0,a.up)("navigation"),s=(0,a.up)("settings"),i=(0,a.up)("modal"),r=(0,a.Q2)("touch");return(0,a.wg)(),(0,a.j4)(i,{open:e.propModel,"onUpdate:open":t[0]||(t[0]=t=>e.propModel=t)},{default:(0,a.w5)((()=>[(0,a.Wm)(o.uT,null,{default:(0,a.w5)((()=>[e.open?(0,a.wy)(((0,a.wg)(),(0,a.iD)("div",me,[(0,a.Wm)(n),(0,a.Wm)(s)])),[[r,e.swipeHandler,"swipe"]]):(0,a.kq)("",!0)])),_:1})])),_:1},8,["open"])}const ge=(0,a.aZ)({name:"Sidebar",components:{Navigation:B,Settings:ce,Modal:se.Z},props:{open:Boolean,swipeHandler:{type:Function,default:void 0}},emits:["update:open"],computed:{propModel:{get(){return this.open},set(e){this.$emit("update:open",e)}}}}),fe=(0,b.Z)(ge,[["render",_e],["__scopeId","data-v-2486165b"]]),be=fe,Se=60;function ve(e){const t=(0,d.iH)(!1),n=(0,d.iH)(window.innerWidth*Se/100);return{setShow:a,swipeHandler:s,onResize:o,isOpen:t};function o(){n.value=window.innerWidth*Se/100,e||a(!1)}function a(e){t.value=e}function s(t,o){window.TouchEvent&&"touchend"===o.type&&("right"===t&&e&&o.changedTouches[0].clientX<=n.value&&a(!0),"left"===t&&a(!1))}}const ye=1e3,we=(0,a.aZ)({name:"App",components:{Head:c.Fb,GoTop:v,TheHeader:he,Sidebar:be},setup(){const e=(0,d.iH)(window.innerWidth<ye),{setShow:t,swipeHandler:n,onResize:o,isOpen:a}=ve(e);return{isMinMode:e,setShowSidebar:t,sidebarIsOpen:a,swipeHandler:n,onResize:o}},mounted(){this.$Progress.finish(),window.addEventListener("resize",this.resize)},unmounted(){window.removeEventListener("resize",this.resize)},created(){this.progressBar(),this.$router.beforeEach((()=>{this.setShowSidebar(!1)}))},methods:{progressBar(){this.$Progress.start(),this.$router.beforeEach((async(e,t,n)=>{e.path!==t.path&&(this.$Progress.start(),this.$Progress.set(30)),n()})),this.$router.afterEach((async()=>{this.$Progress.finish()}))},resize(){this.isMinMode=window.innerWidth<ye,this.onResize()}}}),Ee=(0,b.Z)(we,[["render",l],["__scopeId","data-v-52b5c508"]]),De=Ee;var Te=n(42119);const Ce=(0,Te.p7)({history:(0,Te.PO)("/HadesSpace/"),routes:(0,H.s)(),scrollBehavior(e,t,n){return n||(e.hash?new Promise((t=>{setTimeout((()=>{t({el:e.hash,behavior:"smooth",top:100})}),500)})):{top:0})}}),Le=Ce;var Oe=n(15925),Ie=n(51578),Me=n(74366),Ae=n.n(Me),Pe=n(67398),ke=n(84032);const Ne={VueProgressBar:{color:"#aee3fc",failedColor:"#ff4646",thickness:"3px",transition:{speed:"0.2s",opacity:"0.2s",termination:300},autoRevert:!0,location:"top",inverse:!1},VueGtag:{config:{id:"G-Q3X19N7LEN"}}},xe={beforeMount(e,t){const n=n=>{e.contains(n.target)||e===n.target||t.value(n)};e.__vueClickEventHandler__=n,document.addEventListener("click",n)},unmounted(e){document.removeEventListener("click",e.__vueClickEventHandler__)}};var Ke=n(95205);(0,Ke.z)("/HadesSpace/service-worker.js",{ready(){console.log("App is being served from cache by a service worker. \nFor more details, visit https://goo.gl/AFskqB")},registered(){console.log("Service worker has been registered.")},cached(){console.log("Content has been cached for offline use.")},updatefound(){console.log("New content is downloading.")},updated(){console.log("New content is available; please refresh."),window.location.reload()},offline(){console.log("No internet connection found. App is running in offline mode.")},error(e){console.error("Error during service worker registration:",e)}}),(0,o.ri)(De).use((0,c.G6)()).use(Ae(),Ne.VueProgressBar).use(Pe.ZP,Ne.VueGtag,Le).use(ke.Z).directive("click-outside",xe).use(Oe.ZP).use(Le).use(Ie.Z).mount("#app")},51578:(e,t,n)=>{"use strict";n.d(t,{Z:()=>w});var o=n(88637),a=n(34919),s=n(31303),i=n(1986),r=n(15925);const l="settings",d=Object.values(i.Z).map((e=>e.Code)),c="en",u=f(l),p=window.navigator.language.slice(0,2),h=!1,m={[s.Z.SET_LANGUAGE](e,t){return e.language=t,g(l,e),(0,r.g)(t)},[s.Z.SWITCH_DISABLE_FILTERS](e){return e.disableFilters=!e.disableFilters,g(l,e),e.disableFilters},[s.Z.DEBUG_SWITCH_SHOW_KEYS](e){return e.showKeys=!e.showKeys,g(l,e),e.showKeys}},_={namespaced:!1,strict:h,state:{language:u.language||(p in d?p:c),disableFilters:u.disableFilters||!1,showKeys:u.showKeys||!1},mutations:m};function g(e,t){localStorage.setItem(e,JSON.stringify(t))}function f(e){let t={language:c,disableFilters:!1,showKeys:!1};if(localStorage.getItem(e))try{t=JSON.parse(localStorage.getItem(e)||"{}")}catch(n){console.error(n),localStorage.removeItem(e)}return t}const b=!1,S={modals:[]},v={[a.Z.MODAL_OPEN](e,t){e.modals.push(t)},[a.Z.MODAL_CLOSE](e,t){const n=e.modals.indexOf(t);-1!=n&&e.modals.splice(n,1)}},y={[a.Z.MODAL_OPEN]({state:e,commit:t}){const n=e.modals.length+1;return t(a.Z.MODAL_OPEN,n),n},[a.Z.MODAL_CLOSE]({commit:e},t){e(a.Z.MODAL_CLOSE,t)}},w=(0,o.MT)({strict:b,state:S,mutations:v,actions:y,modules:{userSettings:_}})},31303:(e,t,n)=>{"use strict";n.d(t,{Z:()=>o});const o=Object.freeze({SET_LANGUAGE:"SetLanguage",SWITCH_DISABLE_FILTERS:"SwitchDisableFilters",DEBUG_SWITCH_SHOW_KEYS:"DebugSwitchShowKeys"})},34919:(e,t,n)=>{"use strict";n.d(t,{Z:()=>o});const o=Object.freeze({MODAL_OPEN:"ModalOpen",MODAL_CLOSE:"ModalClose"})},34272:(e,t,n)=>{"use strict";n.d(t,{z:()=>u,Z:()=>_});var o=n(66252),a=n(49963),s=n(3577);const i={key:0,class:"content-wrapper fixed"},r={class:"head"},l={class:"body"};function d(e,t,n,d,c,u){return(0,o.wg)(),(0,o.iD)("div",null,[((0,o.wg)(),(0,o.j4)(o.lR,{disabled:!u.modalActive,to:"#modals"},[(0,o.Wm)(a.uT,{name:"background"},{default:(0,o.w5)((()=>[u.modalActive?((0,o.wg)(),(0,o.iD)("div",{key:0,class:"background fixed",onClick:t[0]||(t[0]=(...e)=>u.onClose&&u.onClose(...e))})):(0,o.kq)("",!0)])),_:1})],8,["disabled"])),((0,o.wg)(),(0,o.j4)(o.lR,{disabled:!u.modalActive,to:"#modals"},[(0,o.WI)(e.$slots,"default",{},(()=>[(0,o.Wm)(a.uT,{name:"content-wrapper"},{default:(0,o.w5)((()=>[u.modalActive?((0,o.wg)(),(0,o.iD)("div",i,[(0,o._)("div",{class:(0,s.C_)(["content",`size-${n.size}`])},[(0,o._)("div",r,[(0,o._)("div",{class:"close-button",onClick:t[1]||(t[1]=(...e)=>u.onClose&&u.onClose(...e))}),(0,o.WI)(e.$slots,"head",{},(()=>[(0,o._)("h2",null,(0,s.zw)(n.title),1)]),!0)]),(0,o._)("div",l,[(0,o.WI)(e.$slots,"body",{},void 0,!0)])],2)])):(0,o.kq)("",!0)])),_:3})]),!0)],8,["disabled"]))])}var c=n(34919);const u={SMALL:"small",MEDIUM:"medium",LARGE:"large"},p={name:"Modal",props:{size:{type:String,default:u.MEDIUM},title:{type:String,default:void 0},open:Boolean},emits:["update:open"],data(){return{modalKey:0}},computed:{modalActive(){return this.open&&this.$store.state.modals.at(-1)==this.modalKey}},watch:{open(){this.open?this.$store.dispatch(c.Z.MODAL_OPEN).then((e=>{this.modalKey=e})):this.$store.dispatch(c.Z.MODAL_CLOSE,this.modalKey)}},unmounted(){this.$store.dispatch(c.Z.MODAL_CLOSE,this.modalKey)},created(){this.$router.beforeResolve((()=>{if(this.modalActive)return this.onClose(),!1}))},methods:{onClose(){this.$emit("update:open",!1)}}};var h=n(83744);const m=(0,h.Z)(p,[["render",d],["__scopeId","data-v-d60082be"]]),_=m},1986:(e,t,n)=>{"use strict";n.d(t,{Z:()=>o});const o={English:{Name:"English",Code:"en",UnityLocale:"english",SteamLocale:"english",SteamCode:"en"},Français:{Name:"Français",Code:"fr",UnityLocale:"french",SteamLocale:"french",SteamCode:"fr"},Deutsch:{Name:"Deutsch",Code:"de",UnityLocale:"german",SteamLocale:"german",SteamCode:"de"},Español:{Name:"Español",Code:"es",UnityLocale:"spanish",SteamLocale:"spanish",SteamCode:"es"},Italiano:{Name:"Italiano",Code:"it",UnityLocale:"italian",SteamLocale:"italian",SteamCode:"it"},Pусский:{Name:"Pусский",Code:"ru",UnityLocale:"russian",SteamLocale:"russian",SteamCode:"ru"},Português:{Name:"Português",Code:"pt",UnityLocale:"portuguese",SteamLocale:"portuguese",SteamCode:"pt"},한국어:{Name:"한국어",Code:"ko",UnityLocale:"korean",SteamLocale:"koreana",SteamCode:"ko"},日本語:{Name:"日本語",Code:"jp",UnityLocale:"japanese",SteamLocale:"japanese",SteamCode:"ja"},简体中文:{Name:"简体中文",Code:"zh-si",UnityLocale:"chinese",SteamLocale:"schinese",SteamCode:"zh-CN"}}}},t={};function n(o){var a=t[o];if(void 0!==a)return a.exports;var s=t[o]={exports:{}};return e[o](s,s.exports,n),s.exports}n.m=e,(()=>{var e=[];n.O=(t,o,a,s)=>{if(!o){var i=1/0;for(c=0;c<e.length;c++){for(var[o,a,s]=e[c],r=!0,l=0;l<o.length;l++)(!1&s||i>=s)&&Object.keys(n.O).every((e=>n.O[e](o[l])))?o.splice(l--,1):(r=!1,s<i&&(i=s));if(r){e.splice(c--,1);var d=a();void 0!==d&&(t=d)}}return t}s=s||0;for(var c=e.length;c>0&&e[c-1][2]>s;c--)e[c]=e[c-1];e[c]=[o,a,s]}})(),(()=>{n.n=e=>{var t=e&&e.__esModule?()=>e["default"]:()=>e;return n.d(t,{a:t}),t}})(),(()=>{var e,t=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__;n.t=function(o,a){if(1&a&&(o=this(o)),8&a)return o;if("object"===typeof o&&o){if(4&a&&o.__esModule)return o;if(16&a&&"function"===typeof o.then)return o}var s=Object.create(null);n.r(s);var i={};e=e||[null,t({}),t([]),t(t)];for(var r=2&a&&o;"object"==typeof r&&!~e.indexOf(r);r=t(r))Object.getOwnPropertyNames(r).forEach((e=>i[e]=()=>o[e]));return i["default"]=()=>o,n.d(s,i),s}})(),(()=>{n.d=(e,t)=>{for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})}})(),(()=>{n.f={},n.e=e=>Promise.all(Object.keys(n.f).reduce(((t,o)=>(n.f[o](e,t),t)),[]))})(),(()=>{n.u=e=>"js/"+({65:"RedStar",74:"About",142:"SpaceBuildings",177:"Drone",261:"BlueStar",362:"Cerberus",406:"Ships",530:"PlanetsCalc",607:"Achievements",626:"AllianceLevels",636:"PlayerGoals",662:"Shield",670:"WhiteStar",677:"Support",683:"Trade",726:"Index",749:"Weapon",752:"ModulesCalc",790:"YellowStar",837:"Mining",934:"DarkRedStar"}[e]||e)+"."+{22:"bbe7cebe",60:"4a4b52a1",65:"571e0712",74:"16410b47",85:"633a87c8",142:"b4d858a9",177:"b81a4a05",256:"2eaedf36",261:"33a0d4f7",278:"7211f6bd",286:"ef1ecc75",362:"9d83d1b0",400:"9547c90f",406:"c11c6ff1",410:"665282b5",449:"fe566e51",530:"e2c289ed",560:"596b1249",561:"f8009639",607:"6048cf8c",626:"7848029d",636:"b39affd2",662:"d564338a",668:"09c644e1",670:"3ad332b4",677:"cb874363",683:"15dcc3a8",726:"f8379cfa",749:"3d5007b6",752:"2b371459",790:"4f9b158f",806:"b272b1cc",837:"2aa8c260",934:"09bd366d",948:"b956ed5b",964:"25946ad3",988:"a5824386"}[e]+".js"})(),(()=>{n.miniCssF=e=>"css/"+({65:"RedStar",74:"About",142:"SpaceBuildings",177:"Drone",261:"BlueStar",362:"Cerberus",406:"Ships",530:"PlanetsCalc",607:"Achievements",626:"AllianceLevels",636:"PlayerGoals",662:"Shield",670:"WhiteStar",677:"Support",683:"Trade",726:"Index",749:"Weapon",752:"ModulesCalc",790:"YellowStar",837:"Mining",934:"DarkRedStar"}[e]||e)+"."+{22:"5319f625",60:"baf1ed76",65:"f113a4a7",74:"0ffbb70d",142:"fa01bd27",177:"fa01bd27",261:"fa01bd27",362:"7a8b891e",406:"6ccbe969",449:"2b422f08",530:"c0c2c0aa",607:"fa01bd27",626:"fa01bd27",636:"fa01bd27",662:"fa01bd27",670:"31d0d777",677:"fa01bd27",683:"fa01bd27",726:"a34217a2",749:"fa01bd27",752:"708d0964",790:"31fedb75",837:"fa01bd27",934:"c55ba2ce"}[e]+".css"})(),(()=>{n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()})(),(()=>{n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t)})(),(()=>{var e={},t="hades-space:";n.l=(o,a,s,i)=>{if(e[o])e[o].push(a);else{var r,l;if(void 0!==s)for(var d=document.getElementsByTagName("script"),c=0;c<d.length;c++){var u=d[c];if(u.getAttribute("src")==o||u.getAttribute("data-webpack")==t+s){r=u;break}}r||(l=!0,r=document.createElement("script"),r.charset="utf-8",r.timeout=120,n.nc&&r.setAttribute("nonce",n.nc),r.setAttribute("data-webpack",t+s),r.src=o),e[o]=[a];var p=(t,n)=>{r.onerror=r.onload=null,clearTimeout(h);var a=e[o];if(delete e[o],r.parentNode&&r.parentNode.removeChild(r),a&&a.forEach((e=>e(n))),t)return t(n)},h=setTimeout(p.bind(null,void 0,{type:"timeout",target:r}),12e4);r.onerror=p.bind(null,r.onerror),r.onload=p.bind(null,r.onload),l&&document.head.appendChild(r)}}})(),(()=>{n.r=e=>{"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}})(),(()=>{n.p="/HadesSpace/"})(),(()=>{var e=(e,t,n,o)=>{var a=document.createElement("link");a.rel="stylesheet",a.type="text/css";var s=s=>{if(a.onerror=a.onload=null,"load"===s.type)n();else{var i=s&&("load"===s.type?"missing":s.type),r=s&&s.target&&s.target.href||t,l=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");l.code="CSS_CHUNK_LOAD_FAILED",l.type=i,l.request=r,a.parentNode.removeChild(a),o(l)}};return a.onerror=a.onload=s,a.href=t,document.head.appendChild(a),a},t=(e,t)=>{for(var n=document.getElementsByTagName("link"),o=0;o<n.length;o++){var a=n[o],s=a.getAttribute("data-href")||a.getAttribute("href");if("stylesheet"===a.rel&&(s===e||s===t))return a}var i=document.getElementsByTagName("style");for(o=0;o<i.length;o++){a=i[o],s=a.getAttribute("data-href");if(s===e||s===t)return a}},o=o=>new Promise(((a,s)=>{var i=n.miniCssF(o),r=n.p+i;if(t(i,r))return a();e(o,r,a,s)})),a={143:0};n.f.miniCss=(e,t)=>{var n={22:1,60:1,65:1,74:1,142:1,177:1,261:1,362:1,406:1,449:1,530:1,607:1,626:1,636:1,662:1,670:1,677:1,683:1,726:1,749:1,752:1,790:1,837:1,934:1};a[e]?t.push(a[e]):0!==a[e]&&n[e]&&t.push(a[e]=o(e).then((()=>{a[e]=0}),(t=>{throw delete a[e],t})))}})(),(()=>{var e={143:0};n.f.j=(t,o)=>{var a=n.o(e,t)?e[t]:void 0;if(0!==a)if(a)o.push(a[2]);else{var s=new Promise(((n,o)=>a=e[t]=[n,o]));o.push(a[2]=s);var i=n.p+n.u(t),r=new Error,l=o=>{if(n.o(e,t)&&(a=e[t],0!==a&&(e[t]=void 0),a)){var s=o&&("load"===o.type?"missing":o.type),i=o&&o.target&&o.target.src;r.message="Loading chunk "+t+" failed.\n("+s+": "+i+")",r.name="ChunkLoadError",r.type=s,r.request=i,a[1](r)}};n.l(i,l,"chunk-"+t,t)}},n.O.j=t=>0===e[t];var t=(t,o)=>{var a,s,[i,r,l]=o,d=0;if(i.some((t=>0!==e[t]))){for(a in r)n.o(r,a)&&(n.m[a]=r[a]);if(l)var c=l(n)}for(t&&t(o);d<i.length;d++)s=i[d],n.o(e,s)&&e[s]&&e[s][0](),e[s]=0;return n.O(c)},o=self["webpackChunkhades_space"]=self["webpackChunkhades_space"]||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))})();var o=n.O(void 0,[998],(()=>n(10818)));o=n.O(o)})();