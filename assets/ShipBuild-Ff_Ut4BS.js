import{d as oe,s as le,aI as ne,g as ie,i as _,j as ae,y as de,D as ue,z as re,x as pe,r as ce,o as r,b as p,e as u,h,f as o,t as c,u as n,H as ve,w as v,F as m,B as g,S as I,M,A as U,I as E,aN as x,E as $,p as me,q as fe,_ as _e}from"./index-CIJUL8vS.js";import{M as A,a as he}from"./MultiConfigGUI-r0rvqMyu.js";import{c as Ce}from"./compendiumTechList-dCAKDmWJ.js";import{b as Se}from"./byTypes-1BYQ2hUk.js";import{g as ge}from"./globals-zpsYnYkF.js";import{s as B}from"./capital_ships-ioQeNDqF.js";import{m as H}from"./ModulePage.vue_vue_type_script_setup_true_lang-lQWX68gX.js";import{T as q}from"./TechList-KIRd9y-P.js";import{N as Ie}from"./NumberPicker-XeM1jo9B.js";import{o as Me}from"./Data-QQl-0c-z.js";import"./Page-xrQ_gVbF.js";import"./spacebuildings-NmTc9Pj4.js";import"./sec2str-0tjTxmG4.js";const ye=y=>(me("data-v-337d239b"),y=y(),fe(),y),Le={class:"container"},Te={class:"topic"},De={class:"buttons"},Ee={class:"ship-list"},be=["onClick"],ke={class:"icon"},Oe={class:"body"},Ne={class:"modules"},Ue={key:0,class:"level"},$e={class:"create-ship-list"},Ae=["onClick"],Be=["onUpdate:modelValue"],He=["value"],Pe={class:"edit-ship"},we={class:"modal-module"},ze={class:"title"},Re={class:"level-picker"},Ge={class:"module-levels"},Ve={class:"select"},Ye={class:"name"},je={value:{provider:"Edit"}},xe={disabled:""},qe=["value"],Fe={disabled:""},Ke=ye(()=>o("option",{value:{provider:"HSCompendium",index:0}}," 0 ",-1)),We="shipBuild",Ze="modulesCalc",Je=oe({__name:"ShipBuild",setup(y){const b={levels:{Transport:1,Miner:1,Battleship:1},ships:[]},C={Battleship:B.Battleship,Transport:B.Transport,Miner:B.Miner},{MaxModuleLevel:P}=ge,F=Me(H,{map:([t,e])=>[t,se(e)]}),w=le(),z=ne(),{t:K}=ie(),{data:W,levelMap:R}=Ce(),G=K("SHIP_BUILD"),V=Object.keys(C),L=_(!1),k=_(!1),T=_(!1),O=_(!1),N=_(!1),S=_(w.state.userSettings.shipBuildSync),i=ae({data:{hideModulesTypes:[],removeShip:()=>{},ship:{slots:[]},module:{Name:"",Icon:"",TID:""},updateModule:()=>{}}}),l=new A(We,b),Y=new A(Ze,{});if(j(),z.currentRoute.value.query.d){const e={...A.parseUrl(z.currentRoute.value.query.d)};l.add(e,{temporary:!0})}de(async()=>{await ue()}),re(R,t=>{S.value.provider=="HSCompendium"&&(l.selectedConfig.levels={...t})});function Z(t){l.selectedConfig.ships.push({meta:{type:t},slots:[]}),l.selectedConfig.ships.sort((e,a)=>V.indexOf(e.meta.type)-V.indexOf(a.meta.type)),l.save(),L.value=!1}function J(t){const e=l.selectedConfig.ships[t],{levels:a}=l.selectedConfig,s=[],{NewModuleSlots:d}=C[e.meta.type];typeof d=="string"?s.push(...Array(a[e.meta.type]).fill(d)):Array.isArray(d)&&s.push(...d.slice(0,a[e.meta.type]).flat()),e.slots.length||(e.slots=s),i.data.ship=e,i.data.hideModulesTypes=Se.artifact.filter(D=>!s.includes(D)),i.data.removeShip=()=>{l.selectedConfig.ships.splice(t,1),l.save(),T.value=!1},l.save(),T.value=!0}function Q(t){return i.data.ship.slots.includes(t)}function X({SlotType:t,Name:e}){const a=i.data.ship.slots.indexOf(e);if(a!=-1)i.data.ship.slots[a]=t;else{const s=i.data.ship.slots.indexOf(t);s!=-1&&(i.data.ship.slots[s]=e)}l.save()}function ee(t){i.data.module=t,i.data.updateModule=e=>{l.selectedConfig.levels[t.Name]=e,l.save()},O.value=!0}function j(){const{provider:t,index:e}=S.value;t=="ModulesCalc"&&(l.selectedConfig.levels={...l.selectedConfig.levels,...Y.store.configs[e].value.actually}),t=="HSCompendium"&&(l.selectedConfig.levels={...R}),t==null&&(l.selectedConfig.levels={...b.levels}),w.commit(pe.SET_SHIP_BUILD_SYNC,S.value),l.save()}function se(t){let e=1;for(const[,a]of Object.entries(t))Array.isArray(a)&&a.length>e&&(e=a.length);return P-e+1}return(t,e)=>{const a=ce("t");return r(),p("div",Le,[u(n(ve),null,{default:h(()=>[o("title",null,c(n(G)),1)]),_:1}),o("h1",Te,c(n(G)),1),o("div",De,[o("button",{class:"settings-btn",onClick:e[0]||(e[0]=s=>N.value=!0)}),v(o("button",{class:"button accent",onClick:e[1]||(e[1]=s=>L.value=!0)},null,512),[[a,"TID_PC_NEW_SHIP"]]),v(o("button",{class:"button accent",onClick:e[2]||(e[2]=s=>k.value=!0)},null,512),[[a,"TID_MODULE_LEVEL_HINT_TITLE"]])]),o("ul",Ee,[(r(!0),p(m,null,g(n(l).selectedConfig.ships,({meta:{type:s},slots:d},D)=>(r(),p("li",{key:`${s}${D}`,class:"ship",onClick:f=>J(D)},[o("div",ke,[u(E,{dir:"game/Ships",name:C[s].Model[n(l).selectedConfig.levels[s]-1]},null,8,["name"])]),o("div",Oe,[v(o("p",null,null,512),[[a,C[s].TID]]),o("ul",Ne,[(r(!0),p(m,null,g(d,(f,te)=>(r(),p("li",{key:`${f}${te}`},[f in n(H)?(r(),p(m,{key:0},[u(E,{dir:"game/Modules",name:n(H)[f].Icon},null,8,["name"]),n(l).selectedConfig.levels[f]?(r(),p("span",Ue,c(n(l).selectedConfig.levels[f]),1)):$("",!0)],64)):$("",!0)]))),128))])])],8,be))),128))]),u(M,{open:L.value,"onUpdate:open":e[3]||(e[3]=s=>L.value=s),title:t.$t("TID_PC_NEW_SHIP"),size:n(I).SMALL},{body:h(()=>[o("ul",$e,[(r(),p(m,null,g(C,s=>o("li",{key:s.Name,class:"ship"},[o("div",{class:"icon",onClick:d=>Z(s.Name)},[u(E,{dir:"game/Ships",name:s.Model[n(l).selectedConfig.levels[s.Name]-1]},null,8,["name"])],8,Ae),o("div",{class:U(["select",{disable:t.$store.state.userSettings.shipBuildSync.provider=="HSCompendium"}])},[v(o("select",{"onUpdate:modelValue":d=>n(l).selectedConfig.levels[s.Name]=d},[(r(!0),p(m,null,g(s.BuildCost.length,d=>(r(),p("option",{key:d,value:d},c(d),9,He))),128))],8,Be),[[x,n(l).selectedConfig.levels[s.Name]]])],2)])),64))])]),_:1},8,["open","title","size"]),u(M,{open:T.value,"onUpdate:open":e[5]||(e[5]=s=>T.value=s),title:t.$t("TID_CORP_DIALOG_EDIT"),size:n(I).LARGE},{body:h(()=>[o("div",Pe,[o("div",{class:U(["tech-list",i.data.hideModulesTypes])},[u(q,{"is-muted":Q,"on-click":X})],2),v(o("button",{class:"button red",onClick:e[4]||(e[4]=(...s)=>i.data.removeShip&&i.data.removeShip(...s))},null,512),[[a,"TID_DISBAND_SHIP_BUTTON"]])])]),_:1},8,["open","title","size"]),u(M,{open:O.value,"onUpdate:open":e[6]||(e[6]=s=>O.value=s),title:t.$t("TID_CORP_DIALOG_EDIT"),size:n(I).SMALL},{body:h(()=>[o("div",we,[o("div",ze,[o("div",null,[o("h2",null,c(t.$t(i.data.module.TID)),1)]),u(E,{name:i.data.module.Icon,dir:"game/Modules"},null,8,["name"])]),o("div",Re,[u(Ie,{value:n(l).selectedConfig.levels[i.data.module.Name]||0,min:n(F)[i.data.module.Name],max:n(P),"onUpdate:value":i.data.updateModule},null,8,["value","min","max","onUpdate:value"])])])]),_:1},8,["open","title","size"]),u(M,{open:k.value,"onUpdate:open":e[8]||(e[8]=s=>k.value=s),title:t.$t("TID_MODULE_LEVEL_HINT_TITLE"),size:n(I).LARGE},{body:h(()=>[o("div",Ge,[o("div",Ve,[v(o("p",Ye,null,512),[[a,"SYNC"]]),v(o("select",{"onUpdate:modelValue":e[7]||(e[7]=s=>S.value=s),onChange:j},[o("option",{value:{provider:void 0}},c(t.$t("TID_PLAYER_INFO_CORP_NONE")),1),o("option",je,c(t.$t("TID_CORP_DIALOG_EDIT")),1),o("option",xe,"--- "+c(t.$t("MODULES_CALC"))+" ---",1),(r(!0),p(m,null,g(n(Y).store.configs,(s,d)=>(r(),p("option",{key:d,value:{provider:"ModulesCalc",index:d}},c(s.name),9,qe))),128)),n(W)?(r(),p(m,{key:0},[o("option",Fe,"--- "+c(t.$t("HS_COMPENDIUM"))+" ---",1),Ke],64)):$("",!0)],544),[[x,S.value]])]),o("div",{class:U(["tech-list",{disable:t.$store.state.userSettings.shipBuildSync.provider!="Edit"}])},[u(q,{"level-map":n(l).selectedConfig.levels,"on-click":ee},null,8,["level-map"])],2)])]),_:1},8,["open","title","size"]),u(M,{open:N.value,"onUpdate:open":[e[9]||(e[9]=s=>N.value=s),e[10]||(e[10]=()=>n(l).save())],title:t.$t("TID_SETTINGS_DLG_TITLE"),size:n(I).MEDIUM},{body:h(()=>[u(he,{"on-create-new":()=>n(l).add(b),instance:n(l)},null,8,["on-create-new","instance"])]),_:1},8,["open","title","size"])])}}}),ps=_e(Je,[["__scopeId","data-v-337d239b"]]);export{ps as default};
