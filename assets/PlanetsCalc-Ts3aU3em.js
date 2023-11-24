import{d as ae,g as le,l as G,m as se,S as oe,a as ne,A as H,B as N,r as re,o as m,b as A,f as o,e as w,w as z,u as C,h as Y,F as R,D,t as E,v as ie,M as ce,C as F,p as ue,i as de,_ as pe}from"./index-iVqpi9rG.js";import{l as J,Y as V}from"./planet_levels-OgGYPt_4.js";import{o as P,p as me,V as Ae}from"./Data-iX8EfGKu.js";import{s as fe}from"./spacebuildings-NmTc9Pj4.js";import{g as ve}from"./globals-zpsYnYkF.js";import{C as Ce}from"./Calculator-C2YZmmW8.js";import{g as ge}from"./getFilterByType-aSftiFBn.js";import"./sec2str-LN_tRSG-.js";import"./TheConfirm-Q2W0ZYBK.js";import"./byTypes-1BYQ2hUk.js";const he="data:image/png;base64,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";function Se(g){return g[0].map((B,y)=>g.map(I=>I[y]))}const U=g=>(ue("data-v-d9aa6448"),g=g(),de(),g),Te={class:"wrap"},ye={class:"container"},Le={class:"switch"},_e={class:"name"},Re=U(()=>o("p",null,null,-1)),De=["checked"],Ee=U(()=>o("label",{for:"compact-mode",class:"label"},null,-1)),Ie=U(()=>o("th",null,null,-1)),Me=["onChange"],Oe=["selected","disabled"],Pe=["onClick"],Ue=U(()=>o("img",{src:he,class:"open-info",alt:"info icon"},null,-1)),be=[Ue],je={class:"modal-module"},Ge={class:"chars"},He={class:"output"},Ne=ae({__name:"PlanetsCalc",setup(g){const{SP2ShipmentsBoostPct:B}=ve,y={CreditStorage:"CreditStorageModifier",FuelStorage:"FuelStorageModifier",CreditsPerHour:"CreditIncomeModifier",FuelPerHour:"FuelIncomeModifier",ShipmentsCRValuePerDay:"CreditShipmentModifier"},I={TotalShipmentCRPerDay:"ShipmentsCRValuePerDay",Cost:"Cost",ConstructionTime:"TimeToUpgrade"},K=["XPAward","Cost","TimeToUpgrade","TimeToUpgradeParallel","RSLevelReq"],k=["CrystalsWeight","Name"],x=Object.keys(J).filter(t=>![...K,...k].includes(t)),Z=Object.values(V.NumMoons).reduce((t,a,u)=>(a&&(Array.isArray(a)?a.forEach((e,l)=>t[V.PlanetTypes[u][l]]=e):t[V.PlanetTypes[u]]=a),t),{}),{t:X}=le(),W=G([]),S=G({actually:{},plan:{}}),b=G(!1),h=se({size:oe.SMALL,title:"name",data:{planet:{},get key(){return this.planet.Name}}}),T=ne(()=>Object.values(W.value));let c;H.subscribe(t=>{t.type==N.SWITCH_PLANETS_CALC_SP2&&c&&(q(c),c.forceReCalc()),t.type==N.SET_CALC_DAY_CREDIT_LIMIT&&c.forceReCalc()});function q(t){c=t,W.value=t.provideGetterElements(te)}function $(t){h.title=X(t.TID),h.data.planet=t,b.value=!0}function Q(t,a){return c.outputClasses(t,h.data.key,a)}function ee(t,a){let u=0;const e={};for(const l of x)a.total.intermediate[l]={actually:0,plan:0,sum:0};return function(l,r){var n,v;const d=H.state.userSettings.calcDayCreditLimit/24;let s=0;for(const i of x)a.total.intermediate[i].actually+=((n=a.actually[l])==null?void 0:n[i])||0,a.total.intermediate[i].plan+=((v=a.plan[l])==null?void 0:v[i])||0,a.total.intermediate[i].sum=a.total.intermediate[i].actually+a.total.intermediate[i].plan;if(t[l].RSLevelReq){const i=t[l].RSLevelReq[r.plan[l]]||0;u=a.total.result.RSLevelReq=u<i?i:u}if(t[l].TimeToUpgrade){const i=t[l],L=r.actually[l],M=r.plan[l],p=[];for(let f=0;f<M-L;f++){const _=L+f,j=i.TimeToUpgrade[_]/3600;for(let O=0;O<j;O++)p.push(i.Cost[_]/(i.TimeToUpgrade[_]/3600))}p.length?e[l]=p:delete e[l],Object.keys(e).length&&(Se(Object.values(e)).forEach(f=>{const _=f.reduce((j,O)=>j+O||0,0);s+=Math.ceil(_/d)}),a.total.result.TimeToUpgradeParallel=s*3600)}}}function te(...[t,a,u]){let e=0;const l=P(J,{filter:([,s])=>Array.isArray(s)}),r=P(me,{...ge("planets.yellowstar"),map:([s,n])=>(u[s]=P(l,{map:([v,i])=>{const L=n.MaxUpgradeLevel,M=H.state.userSettings.planetsCalcSp2&&v=="ShipmentsCRValuePerDay"?B/100:0;let p=i.map(f=>f*(v in y?n[y[v]]/100:1+M));return v=="ShipmentsCRValuePerDay"&&n.Name in Z&&(p=i.map(f=>f*(n[y.ShipmentsCRValuePerDay]/100+M)*(Z[n.Name]+1))),p.length<L&&p.push(...Array.from({length:L-p.length},()=>p[p.length-1])),[v,p]}}),t[s]=n.TID,[s,n])}),d=P(fe.TradingStation,{map:([s,n])=>(Array.isArray(n)&&n.length>e&&(e=n.length),[s in I?I[s]:s,n])});d.MaxUpgradeLevel=e;for(let s=0;d.MaxOnOwnSolarSystem>s;s++){const n={...d,Name:`${d.Name}_${s}`};r[n.Name]=n,u[n.Name]=a(n,e)}return r}return(t,a)=>{const u=re("t");return m(),A("div",Te,[o("div",ye,[w(Ce,{input:S.value,"onUpdate:input":a[0]||(a[0]=e=>S.value=e),"stack-chars":K,"calc-total":ee,"local-storage-key":"planetsCalc","title-key":"PLANETS_CALC",onSetup:q},null,8,["input"]),o("div",Le,[o("div",null,[z(o("p",_e,null,512),[[u,"TID_STARTER_PACK_2"]]),Re]),o("input",{id:"compact-mode",class:"checkbox",type:"checkbox",checked:t.$store.state.userSettings.planetsCalcSp2,onChange:a[1]||(a[1]=e=>t.$store.commit(C(N).SWITCH_PLANETS_CALC_SP2))},null,40,De),Ee]),w(Ae,{data:{TID:"INPUT_VALUES",Name:"Input",TID2:T.value.map(e=>e.TID)},"table-opts":{lvlColKey:"№",mergeCells:!1}},{"table-head":Y(()=>[z(o("th",null,null,512),[[u,"CURRENT_LVL"]]),z(o("th",null,null,512),[[u,"PLAN_LVL"]]),Ie]),"table-body":Y(({row:e})=>[(m(!0),A(R,null,D(S.value,(l,r)=>(m(),A("td",{key:r},[o("select",{class:"select",onChange:d=>C(c).onChangeLvl(r,T.value[e].Name,d.target.value)},[(m(!0),A(R,null,D(T.value[e].MaxUpgradeLevel+1,(d,s)=>(m(),A("option",{key:r+d,selected:C(c).isSelected(r,T.value[e].Name,s),disabled:C(c).isDisabled(r,T.value[e].Name,s)},E(s),9,Oe))),128))],40,Me)]))),128)),o("td",null,[o("div",{onClick:()=>$(T.value[e])},be,8,Pe)])]),_:1},8,["data"])]),w(ce,ie({open:b.value,"onUpdate:open":a[2]||(a[2]=e=>b.value=e)},h),{body:Y(()=>[o("div",je,[o("ul",Ge,[o("li",He,[o("b",null,E(t.$t("TID_PLANET_LEVEL_DESCR")),1),o("div",null,[(m(!0),A(R,null,D(S.value,(e,l)=>{var r;return m(),A("span",{key:l,class:F(Q(l,null))},E((r=S.value[l])==null?void 0:r[h.data.key]),3)}),128))])]),(m(!0),A(R,null,D(Object.keys(C(c).output.plan[h.data.key]||{}).filter(e=>!k.includes(e)),e=>(m(),A("li",{key:e,class:"calc.output"},[o("b",null,E(C(c).format.key(e)),1),o("div",null,[(m(!0),A(R,null,D(S.value,(l,r)=>{var d,s;return m(),A("span",{key:r,class:F(Q(r,e))},E(C(c).format.value(e,Math.trunc((s=(d=C(c).output[r])==null?void 0:d[h.data.key])==null?void 0:s[e])||void 0)),3)}),128))])]))),128))])])]),_:1},16,["open"])])}}}),qe=pe(Ne,[["__scopeId","data-v-d9aa6448"]]);export{qe as default};