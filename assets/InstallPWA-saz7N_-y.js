import{d as D,g as I,r as A,o as a,b as o,e as E,h as N,f as s,t as _,u as t,H as T,w as f,L as h,E as c,p as S,q as m,_ as v}from"./index-tPSJ1VYw.js";const r=l=>(S("data-v-ab56afc9"),l=l(),m(),l),P={class:"container"},w=r(()=>s("span",null,null,-1)),k=r(()=>s("span",null,null,-1)),O=r(()=>s("span",null,null,-1)),R=r(()=>s("span",null,null,-1)),b={key:1},y={key:0},B={key:1},G=D({__name:"InstallPWA",setup(l){const{t:i}=I(),p=i("TID_SHIP_UPGRADE_DLG_MODULE_INSTALL_BTN");let n=null,d;window.addEventListener("beforeinstallprompt",e=>{e.preventDefault(),n=e}),window.addEventListener("appinstalled",()=>{n=null,d="INSTALLED"});function u(){n.prompt()}return(e,U)=>{const L=A("t");return a(),o("div",P,[E(t(T),null,{default:N(()=>[s("title",null,_(t(p)),1)]),_:1}),f(s("p",null,null,512),[[L,"INSTALL_PWA_NOTE"]]),t(n)!=null?(a(),o("p",{key:0,class:"animated-button",onClick:u},[w,k,O,R,h(" "+_(e.$t("TID_SHIP_UPGRADE_DLG_MODULE_INSTALL_BTN")),1)])):c("",!0),t(n)==null?(a(),o("p",b,[t(d)=="INSTALLED"?(a(),o("span",y,_(e.$t("TID_ADD_MODULE_DLG_ALREADY_INSTALLED")),1)):c("",!0),t(d)==null?(a(),o("span",B,_(e.$t("INSTALL_PWA_ERR_NOT_PROVIDE")),1)):c("",!0)])):c("",!0)])}}}),C=v(G,[["__scopeId","data-v-ab56afc9"]]);export{C as default};
