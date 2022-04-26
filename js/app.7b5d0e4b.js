(()=>{var e={1758:(e,t,n)=>{var a={"./de.json":[9806,806],"./en.json":[561,561],"./es.json":[9988,988],"./fr.json":[8560,560],"./it.json":[7948,948],"./jp.json":[6885,964],"./ko.json":[2256,256],"./pt.json":[1668,668],"./ru.json":[1278,278],"./zh-si.json":[9400,400]};function o(e){if(!n.o(a,e))return Promise.resolve().then((()=>{var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=a[e],o=t[0];return n.e(t[1]).then((()=>n.t(o,19)))}o.keys=()=>Object.keys(a),o.id=1758,e.exports=o},946:(e,t,n)=>{"use strict";n.d(t,{Z:()=>r,g:()=>l});var a=n(6252),o=n(6902),s=n(5583);const i=(0,o.o)({locale:s.Z.state.userSettings.language});c(i.global.locale);const r=i;async function l(e){await c(e),i.global.locale=e}async function c(e){document.querySelector("html").setAttribute("lang",e);const t=await n(1758)(`./${e}.json`).then((e=>e.default));return i.global.setLocaleMessage(e,t),(0,a.Y3)()}},9160:(e,t,n)=>{"use strict";n.d(t,{s:()=>b,U:()=>v});const a=[{name:"Index",path:"/",component:()=>Promise.all([n.e(937),n.e(726)]).then(n.bind(n,8529))},{text:{locKey:"TID_SHIP_UPGRADE_DLG_TITLE"},children:[{name:"Trade",text:{locKey:"TYPE_MOD_TRADE"},path:"/trade",component:()=>Promise.all([n.e(937),n.e(171),n.e(599),n.e(683)]).then(n.bind(n,1435)),icon:{name:"Mod_TransportAutopilot_Icon",dir:"game/Modules"}},{name:"Mining",text:{locKey:"TYPE_MOD_MINING"},path:"/mining",component:()=>Promise.all([n.e(937),n.e(171),n.e(599),n.e(837)]).then(n.bind(n,4814)),icon:{name:"Mod_MiningBoost_Icon",dir:"game/Modules"}},{name:"Weapon",text:{locKey:"TYPE_MOD_WEAPON"},path:"/weapon",component:()=>Promise.all([n.e(937),n.e(171),n.e(599),n.e(749)]).then(n.bind(n,7978)),icon:{name:"Mod_Barrage_Icon",dir:"game/Modules"}},{name:"Shield",text:{locKey:"TYPE_MOD_SHIELD"},path:"/shield",component:()=>Promise.all([n.e(937),n.e(171),n.e(599),n.e(662)]).then(n.bind(n,1661)),icon:{name:"Mod_PassiveShield_Icon",dir:"game/Modules"}},{name:"Support",text:{locKey:"TYPE_MOD_SUPPORT"},path:"/support",component:()=>Promise.all([n.e(937),n.e(171),n.e(599),n.e(677)]).then(n.bind(n,3747)),icon:{name:"Mod_Destiny_Icon",dir:"game/Modules"}}]},{text:{locKey:"SECTIONS"},children:[{name:"Planets",text:{locKey:"PLANETS"},path:"/yellowstar#Planets",icon:{name:"planet",dir:"icons"}},{name:"Ships",text:{locKey:"TID_PRODUCTION_DLG_SHIPS"},path:"/ships",component:()=>Promise.all([n.e(937),n.e(171),n.e(599),n.e(856),n.e(406)]).then(n.bind(n,188)),icon:{name:"Miner_lv6",dir:"game/Ships"}},{name:"Cerberus",text:{locKey:"CERBERUS"},path:"/cerberus",component:()=>Promise.all([n.e(937),n.e(171),n.e(856),n.e(362)]).then(n.bind(n,5499)),icon:{name:"Fighter_Cerberus6_lv1",dir:"game/Ships"}},{name:"SpaceBuildings",text:{locKey:"TID_PRODUCTION_DLG_STATIONS"},path:"/spacebuildings",component:()=>Promise.all([n.e(937),n.e(171),n.e(142)]).then(n.bind(n,8700)),icon:{name:"shipyard",dir:"game/SpaceBuildings"}},{text:{locKey:"TID_OBJECT_ACTION_ARTIFACTS"},path:"/redstar#Artifacts",icon:{name:"art",dir:"icons",bg:""}},{name:"AllianceLevels",text:{locKey:"TID_CORP_LEVELS_LABEL"},path:"/alliancelevels",component:()=>Promise.all([n.e(937),n.e(171),n.e(626)]).then(n.bind(n,1654)),icon:{name:"relic",dir:"icons"}},{name:"PlayerGoals",text:{locKey:"TID_EMPIRE_OBJECTIVES"},path:"/playergoals",component:()=>Promise.all([n.e(937),n.e(171),n.e(636)]).then(n.bind(n,4913)),icon:{name:"influence",dir:"icons"}},{name:"Achievements",text:{locKey:"TID_PLAYER_INFO_DLG_TAB_ACHIEVEMENTS"},path:"/achievements",component:()=>Promise.all([n.e(937),n.e(171),n.e(607)]).then(n.bind(n,8368)),icon:{name:"Leaderboards",dir:"icons"}},{name:"Distinctions",text:{locKey:"TID_PLAYER_INFO_SECTION_BADGES"},path:"/distinctions",component:()=>Promise.all([n.e(937),n.e(171),n.e(607)]).then(n.bind(n,1677)),icon:{name:"Distinction_Emperor",dir:"game/Distinctions"}}]},{text:{locKey:"STARS"},children:[{name:"YellowStar",text:{locKey:"TID_YELLOW_STAR"},path:"/yellowstar",component:()=>Promise.all([n.e(937),n.e(171),n.e(533),n.e(790)]).then(n.bind(n,961)),icon:{name:"star_yellow",dir:"game/Stars"}},{name:"RedStar",text:{locKey:"TID_RED_STAR"},path:"/redstar",component:()=>Promise.all([n.e(937),n.e(171),n.e(65)]).then(n.bind(n,9644)),icon:{name:"star_red",dir:"game/Stars"}},{name:"WhiteStar",text:{locKey:"TID_WHITE_STAR"},path:"/whitestar",component:()=>Promise.all([n.e(937),n.e(171),n.e(533),n.e(670)]).then(n.bind(n,4965)),icon:{name:"star_white",dir:"game/Stars"}},{name:"BlueStar",text:{locKey:"TID_BLUE_STAR"},path:"/bluestar",component:()=>Promise.all([n.e(937),n.e(171),n.e(261)]).then(n.bind(n,9964)),icon:{name:"star_blue",dir:"game/Stars"}}]},{text:{locKey:"OTHER"},children:[{name:"PlanetsCalc",text:{locKey:"PLANETS_CALC"},path:"/planetscalc",component:()=>Promise.all([n.e(937),n.e(171),n.e(533),n.e(530)]).then(n.bind(n,2607)),icon:{name:"calc",dir:"icons"}},{text:{locKey:"SWITCH_ACCS",params:["by Raerten","up to Android 10"]},path:{externalLink:"https://github.com/Raerten/HSAccs"},icon:{name:"github_logo",dir:"icons"}},{name:"About",text:{locKey:"ABOUT"},path:"/about",component:()=>n.e(74).then(n.bind(n,4340)),icon:{name:"info",dir:"icons"}}]}];var o=n(6252);const s=e=>((0,o.dD)("data-v-2078e23a"),e=e(),(0,o.Cn)(),e),i={class:"container"},r=s((()=>(0,o._)("title",null,"Page not found",-1))),l=s((()=>(0,o._)("h1",{class:"glitch"}," 404 ",-1))),c=s((()=>(0,o._)("p",null," Page not found ",-1))),d=(0,o.Uk)(" Home ");function u(e,t,n,a,s,u){const p=(0,o.up)("Head"),h=(0,o.up)("router-link");return(0,o.wg)(),(0,o.iD)("div",i,[(0,o.Wm)(p,null,{default:(0,o.w5)((()=>[r])),_:1}),l,c,(0,o.Wm)(h,{to:"/"},{default:(0,o.w5)((()=>[d])),_:1})])}var p=n(1232);const h={components:{Head:p.Fb}};var m=n(3744);const g=(0,m.Z)(h,[["render",u],["__scopeId","data-v-2078e23a"]]),f=g,_={path:"/:pathMatch(.*)*",name:"NotFound",component:f};function b(){return[...a.reduce(e,[]),_];function e(t,{name:n,path:a,component:o,children:s}){return o&&t.push({name:n,path:a,component:o}),s&&t.push(...s.reduce(e,[])),t}}function v(){return a.filter((e=>e.children)).map(e);function e({text:t,path:n,icon:a,children:o}){return{text:t,icon:a,children:o?o.map(e):void 0,link:{path:n?.externalLink||n,type:n?.externalLink?"external":"router"}}}}},5347:(e,t,n)=>{"use strict";var a=n(9963),o=n(6252),s=n(3577);const i=e=>((0,o.dD)("data-v-2d5f6209"),e=e(),(0,o.Cn)(),e),r={id:"app"},l=i((()=>(0,o._)("title",null,"HadesSpace",-1)));function c(e,t,n,i,c,d){const u=(0,o.up)("Head"),p=(0,o.up)("vue-progress-bar"),h=(0,o.up)("Sidebar"),m=(0,o.up)("the-header"),g=(0,o.up)("router-view"),f=(0,o.up)("go-top"),_=(0,o.Q2)("touch");return(0,o.wg)(),(0,o.iD)("div",r,[(0,o.Wm)(u,null,{default:(0,o.w5)((()=>[l])),_:1}),(0,o.Wm)(p),c.isMinMode?(0,o.wy)(((0,o.wg)(),(0,o.j4)(h,{key:0,"is-open":c.sideBarIsOpen},null,8,["is-open"])),[[_,d.swipeHandler,"swipe"]]):(0,o.kq)("",!0),(0,o.wy)(((0,o.wg)(),(0,o.iD)("div",{class:(0,s.C_)({mute:c.sideBarIsOpen}),onClick:t[0]||(t[0]=(0,a.iM)((e=>d.setShowSidebar(!1)),["self"]))},[(0,o._)("div",null,[(0,o.Wm)(m,{"is-min-mode":c.isMinMode,"open-sidebar":()=>d.setShowSidebar(!0)},null,8,["is-min-mode","open-sidebar"]),(0,o.Wm)(g)])],2)),[[_,d.swipeHandler,"swipe"]]),(0,o.Wm)(f)])}var d=n(1232);function u(e,t,n,a,i,r){return(0,o.wg)(),(0,o.iD)("div",{class:(0,s.C_)([{show:i.show},"btn"]),onClick:t[0]||(t[0]=(...e)=>r.scrollToTop&&r.scrollToTop(...e))},null,2)}const p={data(){return{show:!1}},created(){document.addEventListener("scroll",this.scroll)},unmounted(){document.removeEventListener("scroll",this.scroll)},methods:{scrollToTop(){window.scrollTo({top:0,behavior:"smooth"})},scroll(){this.show=window.scrollY>300}}};var h=n(3744);const m=(0,h.Z)(p,[["render",u],["__scopeId","data-v-244d444c"]]),g=m,f=n.p+"img/logo.d4b2677b.png",_=e=>((0,o.dD)("data-v-441e8c90"),e=e(),(0,o.Cn)(),e),b={class:"offset"},v={class:"header"},S={class:"buttons"},y={class:"logo"},w=_((()=>(0,o._)("img",{src:f,alt:"logo"},null,-1)));function C(e,t,n,a,s,i){const r=(0,o.up)("navigation"),l=(0,o.up)("settings"),c=(0,o.up)("router-link");return(0,o.wg)(),(0,o.iD)("div",b,[(0,o._)("header",v,[(0,o._)("div",S,[n.isMinMode?((0,o.wg)(),(0,o.iD)("div",{key:0,class:"sidebar",onClick:t[0]||(t[0]=(...e)=>n.openSidebar&&n.openSidebar(...e))})):((0,o.wg)(),(0,o.iD)(o.HY,{key:1},[(0,o.Wm)(r),(0,o.Wm)(l)],64))]),(0,o._)("div",y,[(0,o.Wm)(c,{to:"/"},{default:(0,o.w5)((()=>[w])),_:1})])])])}const T=e=>((0,o.dD)("data-v-4e21a0e6"),e=e(),(0,o.Cn)(),e),E={class:"container"},D={class:"sections"},k=["onClick"],L=T((()=>(0,o._)("div",{class:"icon"},null,-1))),O={class:"name"},P={class:"name"},I=["href"],M={class:"name"};function A(e,t,n,i,r,l){const c=(0,o.up)("router-link"),d=(0,o.Q2)("click-outside");return(0,o.wg)(),(0,o.iD)("nav",E,[(0,o.wy)(((0,o.wg)(),(0,o.iD)("ul",D,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(r.sections,((t,n)=>((0,o.wg)(),(0,o.iD)("li",{key:n,class:"section",onClick:()=>l.select(n)},[(0,o._)("div",null,[(0,o._)("div",{class:(0,s.C_)({selected:r.selected===n})},[L,(0,o._)("h2",O,(0,s.zw)(e.$t(t.text.locKey)),1)],2),(0,o.Wm)(a.W3,{name:"list",tag:"ul",class:"list",style:(0,s.j5)({"--total":t.children.length})},{default:(0,o.w5)((()=>[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(r.selected===n?t.children:[],((t,n)=>((0,o.wg)(),(0,o.iD)("li",{key:n,style:(0,s.j5)({"--i":n+1})},["router"==t.link.type?((0,o.wg)(),(0,o.j4)(c,{key:0,to:t.link.path},{default:(0,o.w5)((()=>[(0,o._)("h2",P,(0,s.zw)(e.$t(t.text.locKey,t.text.params)),1)])),_:2},1032,["to"])):(0,o.kq)("",!0),"external"==t.link.type?((0,o.wg)(),(0,o.iD)("a",{key:1,href:t.link.path,target:"_blank"},[(0,o._)("h2",M,(0,s.zw)(e.$t(t.text.locKey,t.text.params)),1)],8,I)):(0,o.kq)("",!0)],4)))),128))])),_:2},1032,["style"])])],8,k)))),128))])),[[d,()=>l.select(null)]])])}var x=n(9160);const N={name:"Navigation",data(){return{sections:(0,x.U)(),selected:null}},created(){this.$router.afterEach((()=>{this.select(null)}))},methods:{select(e){this.selected!==e?this.selected=e:this.selected=null}}},j=(0,h.Z)(N,[["render",A],["__scopeId","data-v-4e21a0e6"]]),B=j,K=e=>((0,o.dD)("data-v-24ed04c7"),e=e(),(0,o.Cn)(),e),W=K((()=>(0,o._)("div",{class:"icon"},null,-1))),F=K((()=>(0,o._)("span",{class:"name"},"Settings",-1))),H=[W,F],R={class:"select"},U={class:"name"},$=["value"],G={class:"switch"},Z=K((()=>(0,o._)("div",null,[(0,o._)("p",{class:"name"}," Disable filters "),(0,o._)("p",{class:"description"},"Disable all characteristic filters used to hide unimportant information")],-1))),z=["checked"],Y=K((()=>(0,o._)("label",{for:"disable-filters",class:"label"},null,-1)));function q(e,t,n,i,r,l){const c=(0,o.up)("Modal");return(0,o.wg)(),(0,o.iD)("div",null,[(0,o._)("div",{class:"button",onClick:t[0]||(t[0]=(...e)=>l.open&&l.open(...e))},H),(0,o.Wm)(c,{"is-open":r.isOpenModal,"on-close":l.close},{head:(0,o.w5)((()=>[(0,o.Uk)((0,s.zw)(e.$t("TID_SETTINGS_DLG_TITLE")),1)])),body:(0,o.w5)((()=>[(0,o._)("div",R,[(0,o._)("p",U,(0,s.zw)(e.$t("TID_SETTINGS_DLG_LANGUAGE")),1),(0,o.wy)((0,o._)("select",{"onUpdate:modelValue":t[1]||(t[1]=e=>r.languageCode=e),class:"select",onChange:t[2]||(t[2]=(...e)=>l.changeLanguage&&l.changeLanguage(...e))},[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(r.languages,(e=>((0,o.wg)(),(0,o.iD)("option",{key:e.Code,value:e.Code},(0,s.zw)(e.Name),9,$)))),128))],544),[[a.bM,r.languageCode]])]),(0,o._)("div",G,[Z,(0,o._)("input",{id:"disable-filters",class:"checkbox",type:"checkbox",checked:e.$store.state.userSettings.disableFilters,onChange:t[3]||(t[3]=(...e)=>l.switchDisableFilters&&l.switchDisableFilters(...e))},null,40,z),Y])])),_:1},8,["is-open","on-close"])])}const V={class:"layer"},J={class:"head"},Q={class:"body"};function X(e,t,n,i,r,l){return(0,o.wg)(),(0,o.j4)(o.lR,{disabled:!n.isOpen,to:"#modals"},[(0,o.wy)((0,o._)("div",V,[(0,o.Wm)(a.uT,{key:"layer-background",name:"background"},{default:(0,o.w5)((()=>[n.isOpen?((0,o.wg)(),(0,o.iD)("div",{key:0,class:"background",onClick:t[0]||(t[0]=(0,a.iM)(((...e)=>n.onClose&&n.onClose(...e)),["self"]))})):(0,o.kq)("",!0)])),_:1}),(0,o.Wm)(a.uT,{key:"layer-content",name:"content"},{default:(0,o.w5)((()=>[n.isOpen?((0,o.wg)(),(0,o.iD)("div",{key:"modal-children",class:(0,s.C_)(["content",`size-${n.size}`])},[(0,o._)("div",J,[(0,o._)("h2",null,[(0,o.WI)(e.$slots,"head",{},void 0,!0)])]),(0,o._)("div",Q,[(0,o.WI)(e.$slots,"body",{},void 0,!0)])],2)):(0,o.kq)("",!0)])),_:3})],512),[[a.F8,n.isOpen]])],8,["disabled"])}const ee={small:"SMALL",medium:"MEDIUM",large:"LARGE"},te={name:"Modal",props:{isOpen:{type:Boolean,requested:!0,default:!1},onClose:{type:Function,requested:!0,default:()=>null},size:{type:String,requested:!0,default:ee.medium}},updated(){document.documentElement.style.overflow=this.isOpen?"hidden":"auto"}},ne=(0,h.Z)(te,[["render",X],["__scopeId","data-v-7dd0fa7a"]]),ae=ne;var oe=n(1108),se=n(1986);const ie={name:"Settings",components:{Modal:ae},data(){return{isOpenModal:!1,languages:se.Z,languageCode:this.$store.state.userSettings.language}},created(){this.$router.afterEach(((e,t)=>{"#modal"===t.hash&&(this.isOpenModal=!1)}))},methods:{close(){this.isOpenModal=!1,this.$router.back()},open(){this.isOpenModal=!0,"#modal"!==this.$route.hash?this.$router.push("#modal"):this.isOpenModal=!0},changeLanguage(){this.$store.commit(oe.Z.setLanguage,this.languageCode)},switchDisableFilters(){this.$store.commit(oe.Z.switchDisableFilters)}}},re=(0,h.Z)(ie,[["render",q],["__scopeId","data-v-24ed04c7"]]),le=re,ce={name:"Header",components:{Navigation:B,Settings:le},props:{isMinMode:{type:Boolean,requested:!0,default:null},openSidebar:{type:Function,requested:!0,default:null}}},de=(0,h.Z)(ce,[["render",C],["__scopeId","data-v-441e8c90"]]),ue=de;function pe(e,t,n,a,i,r){const l=(0,o.up)("navigation"),c=(0,o.up)("settings");return(0,o.wg)(),(0,o.iD)("div",null,[(0,o._)("div",{class:(0,s.C_)(["sidebar",{"show-sidebar":n.isOpen}])},[(0,o.Wm)(l),(0,o.Wm)(c)],2)])}const he={name:"Sidebar",components:{Navigation:B,Settings:le},props:{isOpen:{type:Boolean,requested:!0,default:!1}}},me=(0,h.Z)(he,[["render",pe],["__scopeId","data-v-251ae4e4"]]),ge=me,fe=1e3,_e={name:"App",components:{Head:d.Fb,GoTop:g,TheHeader:ue,Sidebar:ge},data(){return{isMinMode:window.innerWidth<fe,sideBarIsOpen:!1}},mounted(){this.$Progress.finish(),window.addEventListener("resize",this.resize)},unmounted(){window.removeEventListener("resize",this.resize)},created(){this.progressBar(),this.$router.beforeEach((()=>{this.setShowSidebar(!1)}))},methods:{progressBar(){this.$Progress.start(),this.$router.beforeEach((async(e,t,n)=>{e.path!==t.path&&(this.$Progress.start(),this.$Progress.set(30)),n()})),this.$router.afterEach((async()=>{this.$Progress.finish()}))},resize(){this.isMinMode=window.innerWidth<fe,this.isMinMode||this.setShowSidebar(!1)},swipeHandler(e){"right"===e&&this.isMinMode&&this.setShowSidebar(!0),"left"===e&&this.setShowSidebar(!1)},setShowSidebar(e){this.sideBarIsOpen!==e&&(this.sideBarIsOpen=e,document.documentElement.style.overflow=e?"hidden":"auto")}}},be=(0,h.Z)(_e,[["render",c],["__scopeId","data-v-2d5f6209"]]),ve=be;var Se=n(2119);const ye=(0,Se.p7)({history:(0,Se.PO)("/HadesSpace/"),routes:(0,x.s)(),scrollBehavior(e,t,n){return n||("#modal"!==e.hash?e.hash?new Promise((t=>{setTimeout((()=>{t({el:e.hash,behavior:"smooth",top:100})}),500)})):{top:0}:void 0)}}),we=ye;var Ce=n(946),Te=n(5583),Ee=n(4366),De=n.n(Ee),ke=n(7398),Le=n(4032);const Oe={VueProgressBar:{color:"#345b66",failedColor:"#874b4b",thickness:"3px",transition:{speed:"0.2s",opacity:"0.2s",termination:300},autoRevert:!0,location:"top",inverse:!1},VueGtag:{config:{id:"G-Q3X19N7LEN"}}},Pe={beforeMount:function(e,t){const n=n=>{e.contains(n.target)||e===n.target||t.value(n)};e.__vueClickEventHandler__=n,document.addEventListener("click",n)},unmounted:function(e){document.removeEventListener("click",e.__vueClickEventHandler__)}};(0,a.ri)(ve).use((0,d.G6)()).use(De(),Oe.VueProgressBar).use(ke.ZP,Oe.VueGtag,we).use(Le.Z).directive("click-outside",Pe).use(Ce.Z).use(we).use(Te.Z).mount("#app")},5583:(e,t,n)=>{"use strict";n.d(t,{Z:()=>_});var a=n(894),o=n(1108),s=n(1986),i=n(946);const r="settings",l=Object.values(s.Z).map((e=>e.Code)),c="en",d=g(r),u=window.navigator.language.slice(0,2),p=!1,h={namespaced:!1,strict:p,state:{language:d.language||(u in l?u:c),disableFilters:d.disableFilters||!1},mutations:{[o.Z.setLanguage](e,t){return e.language=t,m(r,e),(0,i.g)(t)},[o.Z.switchDisableFilters](e){return e.disableFilters=!e.disableFilters,m(r,e),e.disableFilters}}};function m(e,t){localStorage.setItem(e,JSON.stringify(t))}function g(e){let t={};if(localStorage.getItem(e))try{t=JSON.parse(localStorage.getItem(e))}catch(n){console.error(n),localStorage.removeItem(e)}return t}const f=!1,_=(0,a.MT)({strict:f,modules:{userSettings:h},plugins:f?[(0,a.hu)()]:[]})},1108:(e,t,n)=>{"use strict";n.d(t,{Z:()=>a});const a=Object.freeze({setLanguage:"SET_LANGUAGE",switchDisableFilters:"SWITCH_DISABLE_FILTERS"})},1986:(e,t,n)=>{"use strict";n.d(t,{Z:()=>a});const a={English:{Name:"English",Code:"en",UnityLocale:"english",SteamLocale:"english",SteamCode:"en"},Français:{Name:"Français",Code:"fr",UnityLocale:"french",SteamLocale:"french",SteamCode:"fr"},Deutsch:{Name:"Deutsch",Code:"de",UnityLocale:"german",SteamLocale:"german",SteamCode:"de"},Español:{Name:"Español",Code:"es",UnityLocale:"spanish",SteamLocale:"spanish",SteamCode:"es"},Italiano:{Name:"Italiano",Code:"it",UnityLocale:"italian",SteamLocale:"italian",SteamCode:"it"},Pусский:{Name:"Pусский",Code:"ru",UnityLocale:"russian",SteamLocale:"russian",SteamCode:"ru"},Português:{Name:"Português",Code:"pt",UnityLocale:"portuguese",SteamLocale:"portuguese",SteamCode:"pt"},한국어:{Name:"한국어",Code:"ko",UnityLocale:"korean",SteamLocale:"koreana",SteamCode:"ko"},日本語:{Name:"日本語",Code:"jp",UnityLocale:"japanese",SteamLocale:"japanese",SteamCode:"ja"},简体中文:{Name:"简体中文",Code:"zh-si",UnityLocale:"chinese",SteamLocale:"schinese",SteamCode:"zh-CN"}}}},t={};function n(a){var o=t[a];if(void 0!==o)return o.exports;var s=t[a]={exports:{}};return e[a](s,s.exports,n),s.exports}n.m=e,(()=>{var e=[];n.O=(t,a,o,s)=>{if(!a){var i=1/0;for(d=0;d<e.length;d++){for(var[a,o,s]=e[d],r=!0,l=0;l<a.length;l++)(!1&s||i>=s)&&Object.keys(n.O).every((e=>n.O[e](a[l])))?a.splice(l--,1):(r=!1,s<i&&(i=s));if(r){e.splice(d--,1);var c=o();void 0!==c&&(t=c)}}return t}s=s||0;for(var d=e.length;d>0&&e[d-1][2]>s;d--)e[d]=e[d-1];e[d]=[a,o,s]}})(),(()=>{n.n=e=>{var t=e&&e.__esModule?()=>e["default"]:()=>e;return n.d(t,{a:t}),t}})(),(()=>{var e,t=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__;n.t=function(a,o){if(1&o&&(a=this(a)),8&o)return a;if("object"===typeof a&&a){if(4&o&&a.__esModule)return a;if(16&o&&"function"===typeof a.then)return a}var s=Object.create(null);n.r(s);var i={};e=e||[null,t({}),t([]),t(t)];for(var r=2&o&&a;"object"==typeof r&&!~e.indexOf(r);r=t(r))Object.getOwnPropertyNames(r).forEach((e=>i[e]=()=>a[e]));return i["default"]=()=>a,n.d(s,i),s}})(),(()=>{n.d=(e,t)=>{for(var a in t)n.o(t,a)&&!n.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})}})(),(()=>{n.f={},n.e=e=>Promise.all(Object.keys(n.f).reduce(((t,a)=>(n.f[a](e,t),t)),[]))})(),(()=>{n.u=e=>"js/"+({65:"RedStar",74:"About",142:"SpaceBuildings",261:"BlueStar",362:"Cerberus",406:"Ships",530:"PlanetsCalc",607:"Achievements",626:"AllianceLevels",636:"PlayerGoals",662:"Shield",670:"WhiteStar",677:"Support",683:"Trade",726:"Index",749:"Weapon",790:"YellowStar",837:"Mining"}[e]||e)+"."+{65:"9e8aa026",74:"e2d7b452",142:"eba2109e",171:"bf40c41c",256:"e2cd551f",261:"d3202b22",278:"392a4b37",362:"715f18c8",400:"e59a9556",406:"1541e738",530:"1e84e494",533:"be9ecf02",560:"d9affa08",561:"8841f499",599:"40a90c66",607:"d6ecac3c",626:"c57ab258",636:"fcf88ff6",662:"4a556672",668:"31a54429",670:"830466b7",677:"37a8e4fd",683:"255e63f5",726:"10244096",749:"b6c51e98",790:"4bd4ff66",806:"084ccb2a",837:"651693e6",856:"76d58142",937:"05577881",948:"ac2b3695",964:"3242a962",988:"0697c7cd"}[e]+".js"})(),(()=>{n.miniCssF=e=>"css/"+({65:"RedStar",74:"About",142:"SpaceBuildings",261:"BlueStar",362:"Cerberus",406:"Ships",530:"PlanetsCalc",607:"Achievements",626:"AllianceLevels",636:"PlayerGoals",662:"Shield",670:"WhiteStar",677:"Support",683:"Trade",726:"Index",749:"Weapon",790:"YellowStar",837:"Mining"}[e]||e)+"."+{65:"4bc8fe5f",74:"74f90693",142:"48948351",261:"48948351",362:"5e2b21a6",406:"e64ad600",530:"a82c2c62",607:"48948351",626:"48948351",636:"48948351",662:"48948351",670:"fcdf413f",677:"48948351",683:"48948351",726:"05de8a02",749:"48948351",790:"bad0f41d",837:"48948351",937:"6d19006f"}[e]+".css"})(),(()=>{n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()})(),(()=>{n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t)})(),(()=>{var e={},t="hades-space:";n.l=(a,o,s,i)=>{if(e[a])e[a].push(o);else{var r,l;if(void 0!==s)for(var c=document.getElementsByTagName("script"),d=0;d<c.length;d++){var u=c[d];if(u.getAttribute("src")==a||u.getAttribute("data-webpack")==t+s){r=u;break}}r||(l=!0,r=document.createElement("script"),r.charset="utf-8",r.timeout=120,n.nc&&r.setAttribute("nonce",n.nc),r.setAttribute("data-webpack",t+s),r.src=a),e[a]=[o];var p=(t,n)=>{r.onerror=r.onload=null,clearTimeout(h);var o=e[a];if(delete e[a],r.parentNode&&r.parentNode.removeChild(r),o&&o.forEach((e=>e(n))),t)return t(n)},h=setTimeout(p.bind(null,void 0,{type:"timeout",target:r}),12e4);r.onerror=p.bind(null,r.onerror),r.onload=p.bind(null,r.onload),l&&document.head.appendChild(r)}}})(),(()=>{n.r=e=>{"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}})(),(()=>{n.p="/HadesSpace/"})(),(()=>{var e=(e,t,n,a)=>{var o=document.createElement("link");o.rel="stylesheet",o.type="text/css";var s=s=>{if(o.onerror=o.onload=null,"load"===s.type)n();else{var i=s&&("load"===s.type?"missing":s.type),r=s&&s.target&&s.target.href||t,l=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");l.code="CSS_CHUNK_LOAD_FAILED",l.type=i,l.request=r,o.parentNode.removeChild(o),a(l)}};return o.onerror=o.onload=s,o.href=t,document.head.appendChild(o),o},t=(e,t)=>{for(var n=document.getElementsByTagName("link"),a=0;a<n.length;a++){var o=n[a],s=o.getAttribute("data-href")||o.getAttribute("href");if("stylesheet"===o.rel&&(s===e||s===t))return o}var i=document.getElementsByTagName("style");for(a=0;a<i.length;a++){o=i[a],s=o.getAttribute("data-href");if(s===e||s===t)return o}},a=a=>new Promise(((o,s)=>{var i=n.miniCssF(a),r=n.p+i;if(t(i,r))return o();e(a,r,o,s)})),o={143:0};n.f.miniCss=(e,t)=>{var n={65:1,74:1,142:1,261:1,362:1,406:1,530:1,607:1,626:1,636:1,662:1,670:1,677:1,683:1,726:1,749:1,790:1,837:1,937:1};o[e]?t.push(o[e]):0!==o[e]&&n[e]&&t.push(o[e]=a(e).then((()=>{o[e]=0}),(t=>{throw delete o[e],t})))}})(),(()=>{var e={143:0};n.f.j=(t,a)=>{var o=n.o(e,t)?e[t]:void 0;if(0!==o)if(o)a.push(o[2]);else{var s=new Promise(((n,a)=>o=e[t]=[n,a]));a.push(o[2]=s);var i=n.p+n.u(t),r=new Error,l=a=>{if(n.o(e,t)&&(o=e[t],0!==o&&(e[t]=void 0),o)){var s=a&&("load"===a.type?"missing":a.type),i=a&&a.target&&a.target.src;r.message="Loading chunk "+t+" failed.\n("+s+": "+i+")",r.name="ChunkLoadError",r.type=s,r.request=i,o[1](r)}};n.l(i,l,"chunk-"+t,t)}},n.O.j=t=>0===e[t];var t=(t,a)=>{var o,s,[i,r,l]=a,c=0;if(i.some((t=>0!==e[t]))){for(o in r)n.o(r,o)&&(n.m[o]=r[o]);if(l)var d=l(n)}for(t&&t(a);c<i.length;c++)s=i[c],n.o(e,s)&&e[s]&&e[s][0](),e[s]=0;return n.O(d)},a=self["webpackChunkhades_space"]=self["webpackChunkhades_space"]||[];a.forEach(t.bind(null,0)),a.push=t.bind(null,a.push.bind(a))})();var a=n.O(void 0,[998],(()=>n(5347)));a=n.O(a)})();