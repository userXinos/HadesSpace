"use strict";(self["webpackChunkhades_space"]=self["webpackChunkhades_space"]||[]).push([[934],{94473:(e,t,a)=>{a.r(t),a.d(t,{default:()=>j,diffTools:()=>N});var s=a(66252),i=a(49963),n=a(3577);const c=e=>((0,s.dD)("data-v-2613429c"),e=e(),(0,s.Cn)(),e),o={class:"container"},d=c((()=>(0,s._)("title",null,"Nerflog",-1))),r=(0,s.uE)('<h1 class="title" data-v-2613429c> Nerflog </h1><div class="banner" data-v-2613429c><div class="wrap" data-v-2613429c><div class="message" data-v-2613429c><div class="icon-bg" data-v-2613429c><div class="icon" data-v-2613429c></div></div><div class="body" data-v-2613429c><p data-v-2613429c>Work in progress. Only Modules file partially supported</p></div></div></div></div>',2),l=["onClick"],f={class:"title"},h={class:"note"},u={key:0},m={class:"loader"},g={key:0,class:"icon"},p={key:1,class:"text"},b={key:0,class:"content"},v={class:"file"},w={class:"status"};function y(e,t,a,c,y,_){const D=(0,s.up)("Head"),C=(0,s.up)("v-data");return(0,s.wg)(),(0,s.iD)("div",o,[(0,s.Wm)(D,null,{default:(0,s.w5)((()=>[d])),_:1}),r,(0,s.Wm)(i.W3,{tag:"ol",class:"list"},{default:(0,s.w5)((()=>[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(e.patchCommits,(({title:t,note:a},i)=>((0,s.wg)(),(0,s.iD)("li",{key:t,class:"category"},[(0,s._)("div",{class:"head",onClick:t=>e.onclickCategory(i)},[(0,s._)("div",{class:(0,n.C_)(["icon",{rotate:e.indexOpened==i}])},null,2),(0,s._)("div",null,[(0,s._)("div",f,(0,n.zw)(t),1),(0,s._)("div",h,(0,n.zw)(a),1)])],8,l),e.indexOpened==i?((0,s.wg)(),(0,s.iD)("div",u,[(0,s._)("div",m,["loading"==e.patchCommits[i]?.status?((0,s.wg)(),(0,s.iD)("div",g)):(0,s.kq)("",!0),"ready"!=e.patchCommits[i]?.status?((0,s.wg)(),(0,s.iD)("p",p,(0,n.zw)(e.loadingMessage),1)):(0,s.kq)("",!0)]),"ready"==e.patchCommits[i]?.status?((0,s.wg)(),(0,s.iD)("div",b,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(e.patchCommits[i].files,((t,a)=>((0,s.wg)(),(0,s.iD)("div",{key:a},[(0,s._)("h2",v,"File: "+(0,n.zw)(a),1),(0,s._)("h3",w,"status: "+(0,n.zw)(t.status),1),((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(t.data,((i,n)=>((0,s.wg)(),(0,s.iD)("div",{key:n},["modified"==t.status?((0,s.wg)(),(0,s.j4)(C,{key:0,data:i,sort:!1,"icon-dir":e.iconDirByFile[a]},null,8,["data","icon-dir"])):(0,s.kq)("",!0)])))),128))])))),128))])):(0,s.kq)("",!0)])):(0,s.kq)("",!0)])))),128))])),_:1})])}var _=a(21232);const D=[{hashes:["c2c924f51e76acc9c8030f980cebb33fedaced0b"],title:"Patch №6",note:"Hydro system refactoring"},{hashes:["7fca096eb0714f383f8eb286c340748a93c70baa"],title:"Patch №5",note:"Team play (???) DRS"},{hashes:["a058afc5e5934a8fb9fcfbe0fc4e8c8dced33b20"],title:"Patch №4",note:"Something was nerfed"},{hashes:["ab3e4a6eed9c72d25b54b2e7d14232bef332e155"],title:"Patch №3",note:'"Have a good summer"'},{hashes:["6830102801cbcea667e6cbb8907574a817a613ce","6b471418f3b60c18647ab3e4d87d376fcacd9563","79d0e80e53676249ac4070d9113846008e644dd8"],title:"Patch №2",note:"Some nerf"},{hashes:["68f1280392e3b5bf1b81331b3581e2bee0fffd16","5bee8d926a1dacee6c428070047d26e2ae89f181"],title:"Patch №1",note:"EA Stage 2: White Stars"},{hashes:["d03ed51e4187a1b5ec1294189166e422d24c72d4","685fa42b81a079a8947f3746bb6fa8cafd314052"],title:"Patch №0",note:"EA Stage 1"}];var C=a(90146);const k="https://api.github.com/repos/userXinos/HadesSpace/",E=new Headers,S="github-api-v1";function O(){return{fetchUrl:a,fetchParentByName:e,fetchCommit:t,fetchFile:s};async function e(e,t){const i=new URL("commits",k);i.searchParams.set("path",e);const n=await a(i.href,{noCache:!0}),c=n.findIndex((e=>e.sha==t)),o=await a(n[c+1].url),d=o.files.find((t=>t.filename==e)).contents_url;return s(d)}function t(e){const t=new URL(`commits/${e}`,k);return a(t.href)}function a(e,t={noCache:!1}){return caches.open(S).then((async a=>{const s=()=>a.match(e).then((async e=>void 0==e?void 0:e.json())),i=await s();if(!i||t.noCache){const i=await fetch(e,{method:"GET",headers:E});if(!i.ok)throw new Error(i.statusText);await a.put(e,i);const n=await s();return t.noCache&&await a.delete(e),n}return i}))}async function s(e){const{content:t,encoding:s}=await a(e),i=await import(`data:text/javascript;${s},${t}`);return i.default}}({NODE_ENV:"production",BASE_URL:"/HadesSpace/"}).VUE_APP_GITHUB_ACCESS_TOKEN&&E.set("Authorization",`Basic ${btoa(`${{NODE_ENV:"production",BASE_URL:"/HadesSpace/"}.VUE_APP_GITHUB_USERNAME}:${{NODE_ENV:"production",BASE_URL:"/HadesSpace/"}.VUE_APP_GITHUB_ACCESS_TOKEN}`)}`);var A=a(44265),P=a(92022);function M(){return{mergeDeep:e,createDiff:t,isObject:i,createLocaleFromDiff:s,addMetadata:a};function e(t,...a){if(!a.length)return t;const s=a.shift();if(i(t)&&i(s))for(const n in s)i(s[n])?(t[n]?t[n]=Object.assign({},t[n]):Object.assign(t,{[n]:{}}),e(t[n],s[n])):Object.assign(t,{[n]:s[n]});return e(t,...a)}function t(e,t){return i(e)?a(e,t):null;function a(e,t){const s={};for(const c in e)if(c in e&&c in t){const o=e[c],d=t[c];if(i(o)){const e=a(o,d);e&&(s[c]=e);continue}(Array.isArray(o)?n(o,d):o===d)||(s[c]=o,Array.isArray(o)&&(s[`__>>${c}`]=Array.from({length:o.length},(()=>">>"))),s[`_${c}`]=d)}return Object.keys(s).length?s:null}}function a(e,t,s){for(const n of Object.keys(e)){const c=e,o=t;if(i(c[n])){const e=c[n];a(e,o[n]),e.Name||(e.Name=s),e.TID||(e.TID=s)}o&&A.Z.meta.filter((e=>e in o)).forEach((e=>c[e]=o[e]))}return e}function s(e,t,a){const s={...a};return{...s,...(0,P.Z)(e,{map:([e,t])=>[e,t.replaceAll("\\n\\n","\n")]})}}function i(e){return"object"==typeof e&&!Array.isArray(e)}function n(e,t){return e.every(((e,a)=>e===t[a]))}}const $={capital_ships:"game/Ships",modules:"game/Modules",stars:"game/Stars",spacebuildings:"game/SpaceBuildings",distinctions:"game/Distinctions"},N={formatValue:(e,t,a)=>`_${t}`in e?` >> ${a.value(t,e[`_${t}`])}`:null},U=(0,s.aZ)({name:"GameDiffLog",components:{Head:_.Fb,VData:C.Z},provide(){return{additionalStatsContent:N}},setup(){const{fetchUrl:e,fetchParentByName:t,fetchCommit:a,fetchFile:s}=O(),{createDiff:i,createLocaleFromDiff:n,addMetadata:c,mergeDeep:o}=M();return{fetchUrl:e,fetchFile:s,fetchParentByName:t,fetchCommit:a,mergeDeepObject:o,createDiff:i,createLocaleFromDiff:n,addMetadata:c}},data(){return{iconDirByFile:$,patchCommits:D,indexOpened:-1,loadingMessage:""}},beforeUnmount(){},methods:{onclickCategory(e){this.indexOpened!=e?(this.indexOpened=e,this.patchCommits[e].status||"loading"==this.patchCommits[e].status||(this.patchCommits[e].status="loading",this.loadDiff(e).then((()=>{this.patchCommits[e].status="ready"})).catch((t=>{this.patchCommits[e].status="error",this.loadingMessage=`Error: ${t.message}`,console.error(t)})))):this.indexOpened=-1},async loadDiff(e){this.loadingMessage="getting commits...";const t=this.patchCommits[e],a=await Promise.all(t.hashes.map(this.fetchCommit));this.loadingMessage="";for(const s of a)for(const{contents_url:e,filename:a,status:i}of s.files)if(a.startsWith("parser/dist/")&&(a.includes("modules")||a.includes("loc_strings_en"))){t.files||(t.files={});const n=a.substring(a.lastIndexOf("/")+1).replace(/\.\w+$/,""),c=t.files?.[n]||{data:null};this.loadingMessage=`download file: ${n} (${s.sha.slice(0,7)})...`;const o="modified"==i?await this.fetchFile(e):null;this.loadingMessage="",t.files[n]={...c,status:i,data:o?this.mergeDeepObject(o,c.data||{}):{}},o&&!("parent"in c)&&(this.loadingMessage=`download parent file: ${n} (${s.sha.slice(0,7)})...`,t.files[n].parent=await this.fetchParentByName(a,s.sha),this.loadingMessage="")}for(const s in t.files)if(s in t.files&&"parent"in t.files[s]){this.loadingMessage=`create diff: ${s}...`;const e=this.createDiff(t.files[s].parent,t.files[s].data);null!=e&&("en"==s?(t.files[s].status="yes",t.files[s].data=e):t.files[s]={...t.files[s],data:this.addMetadata(e,t.files[s].parent,s)}),this.loadingMessage=""}}}});var H=a(83744);const B=(0,H.Z)(U,[["render",y],["__scopeId","data-v-2613429c"]]),j=B}}]);