import{d as J,x as U,G as Y,g as q,i as u,a as P,A as L,J as z,y as o,K as V,L as Z,r as Q,o as i,b as r,f as e,u as p,t as c,F as H,D as W,N as f,w as C,O as x,P as X,e as j,h as $,Q as ee,R as te,C as ae,S as le,M as se,s as ne,v as oe,_ as ue}from"./index-D4Vb1e33.js";const w="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAYAAACohjseAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAEe0lEQVR4nN1av2tUQRAeIaDGIkpAwbsE1MJGCzHkQAwGrFN4tWJjo5CAiCaNSLBJDCJ4hRaCCNZn4T+QwiZBsbIW1BMMgr8wIgTifHe75N3e7Lu3v3IXP/iK2/fevPl2Z+ftzt7A08YmJUKJOc48wSwrDqpr68yPzE/Md8xVZiOFEwMJbELYNLOScw+EHlc8r9pWmDWKLDSmwCLC8lBRrCtGERpLIEIR4soRbFWVPYzmaqixGALPMu8WuA/zTY8KRjuvM3BtkXmb+SrEuVCB6Ok8cQg1zC3bSOB5hGXVch22ZylgJEMEYhQWLdeKJoxVRXSEbf7iHRfJc06GCJy2tD9kvnC0BefnmBeYM5Z3zZEHfAXCEam3fcRloZ81RVbUO51t+wqU5kydwsRpwEZZeEeVtkngOHVmQGTIGsVDTXhPWbU5JRwfgVJo1ik+YFMK1eQCzxm/NyhOaJqAzWvU7iPe7RQprgIPMIeNtuDVRg5g+0zm97Dy4VtRA64CjwltSXYBObbhw+uiBlwF7hXaPlM6SLYlH6xwFbhHaPtF6SDZlnywwlXgutB2kNJBsi35YIWrwK9C2yFKB8m25IMVrgI/MFHj2JVpO0npYNreVD4UhqvAP9TKbNkVxlFq7SxiZ9OSsp1FQ/lQGD4fenybzKUa1okxl2rapvRuJ/gIrJO8EI5WR6HW6NkW9E7wEQgR2NCaa9IF5iWKgwWhbYU8OtB3u4RwNAUibJeYNykMSyTXa7ymgK9A9KQUqmPU6n2f+qYuO44J17zDP6RkIe3ZAF3fdNnd20oVQNBeM7SqhjrJfZI/yDOKL5lvme+Z39W1/cwjzFPMqRz7X8izFqMRKhBhc4NaYWmrc05RvggbMHJzFJiZYxR+dUXsOcVDFHFAjMIvEo3veYQNiAZ0GD4NSDDbXviNeRaRB52wdKJJvpJBKr/OPO3wzF/aCjW9gT2csbe7gA19VvGG+YAcQtdFYF4qzwK9jZ7WK49uzpQUMVLSZycLdCxCt/AnqKhAhGO1yz2+53q6E3T46XVo3vvQ0eiIrt/HbgL3UesIy5ZEfjCfUdyyIcTWFBE1l5lDwn3oAHQGTqB+24x1E/iY7CET9STWAnQcRtY2ouh4+Ghd5OcJzPt4B53ZOUKPKOa0dFwHH+GruOKxCbSd1SEL3qK0o2YDOhTnhPdoKwtrwFf43DEnJYGIeykcIO4q8yf1Dg3lwyPqFAmfkcHb8oEpEJP2imBYL516KU4DPiCKpCkE39v+c2MKxDAPUieirAsjwrb+he9tp8FZgfoPASZmqb/EacAn+GYmHr1gaCbBrEBp3i3T9mVLH8C3Zeak0V4lQ6BeKpl4Qv0P+DhptEFLs1arBdpKdP0YmiZs9aFmrVYLHBceTHEsnQqSwKYmCJT+VuVVg+whpFotNJUgcEJ4YIV2HqRi9AQEjgg393PmtEHyecQmcCeFp4bkc1PgqHAhezawQf2NvB3RKC5Km8nYVbJeYSjFf7b7ChC4Rmn/SNBLrEHgPPMO/X8iMXDz/wAiqusPTmWIpwAAAABJRU5ErkJggg==",N=h=>(ne("data-v-e7a0742d"),h=h(),oe(),h),ie={class:"header"},re={class:"content"},ce={key:0,class:"select alt-switch"},ve=["value"],de={value:"default"},me=["value"],_e={key:0,class:"logged fetching"},pe={class:"avatar"},ge=["src"],Ae=["src"],Ce=N(()=>e("p",null,null,-1)),he={class:"avatar"},Ee=["src","alt"],Ie=["src","alt"],fe={key:2,class:"not-logged"},we={class:"footer"},Ne={class:"content"},Se=["href"],Re={class:"input"},De={class:"name"},be={class:"error-msg"},Te=["href"],Oe={class:"select switch-client"},ye=N(()=>e("option",{value:0},"Default client",-1)),Be=N(()=>e("option",{value:1},"Client from Mentalisit",-1)),Pe=[ye,Be],Ve=J({__name:"CompendiumPage",setup(h){const G=/[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}/,S=U(),g=Y(),{t:E}=q(),v=u(!1),d=u(""),I=u(""),s=u(!1),n=u(),m=u(),A=u(localStorage.getItem("compendium_client")?parseInt(localStorage.getItem("compendium_client"),10):0),R=P(()=>A.value===0?"https://hs-compendium.com/":"https://compendiumnew.mentalisit.myds.me/links"),M=P(()=>A.value===0?"HS Compendium":"invite");L(async()=>{s.value=!0,await z();const l=o.value.getUser();s.value=!1,l?(n.value=l,m.value=o.value.getGuild()):(v.value=!0,"client"in g.currentRoute.value.query&&(A.value=parseInt(g.currentRoute.value.query.client,10),b(parseInt(g.currentRoute.value.query.client,10))),"c"in g.currentRoute.value.query&&(d.value=g.currentRoute.value.query.c,await D()))});async function D(){let l;if(!d.value){I.value=E("CANNOT_BE_EMPTY");return}if(!G.test(d.value)){I.value=E("INCORRECT_CODE");return}s.value=!0;try{l=await o.value.checkConnectCode(d.value)}catch(_){I.value=_.toString(),console.error(_),s.value=!1;return}s.value=!1,v.value=!1,await S.dispatch(V.OPEN_CONFIRM,E("CONFIRM_LOGIN",[l.guild.name,l.user.username])).catch(()=>(v.value=!0,!0))||(s.value=!0,await o.value.connect(l),n.value=o.value.getUser(),m.value=o.value.getGuild(),s.value=!1)}function k(l){o.value.switchAlt(l)}function b(l){s.value=!0,Z(l).then(()=>{s.value=!1})}function F(){S.dispatch(V.OPEN_CONFIRM,E("TID_SETTINGS_DLG_SIGN_OUT")).then(()=>{o.value.logout(),n.value=void 0,m.value=void 0}).catch(()=>{})}return(l,t)=>{var T,O,y,B;const _=Q("t");return i(),r("div",null,[e("div",ie,[e("div",re,[e("div",null,[(O=(T=n.value)==null?void 0:T.alts)!=null&&O.length?(i(),r("div",ce,[e("select",{value:p(o).selectedAlt,onChange:t[0]||(t[0]=a=>k(a.target.value))},[e("option",de,c((y=n.value)==null?void 0:y.username),1),(i(!0),r(H,null,W((B=n.value)==null?void 0:B.alts,(a,K)=>(i(),r("option",{key:K,value:a},c(a),9,me))),128))],40,ve)])):f("",!0)]),s.value&&!n.value?(i(),r("div",_e,[e("div",pe,[e("img",{src:p(w),alt:"memberImage avatar"},null,8,ge),e("img",{src:p(w),alt:"memberImage avatar"},null,8,Ae)]),Ce])):f("",!0),n.value?(i(),r("div",{key:1,class:"logged",onClick:F},[e("div",he,[e("img",{src:m.value.url,alt:`${m.value.name} icon`,onError:t[1]||(t[1]=a=>a.target.src=p(w))},null,40,Ee),e("img",{src:n.value.avatarUrl,alt:`${n.value.username} avatar`,onError:t[2]||(t[2]=a=>a.target.src=p(w))},null,40,Ie)]),e("div",null,[e("p",null,c(m.value.name),1),e("p",null,c(n.value.username),1)])])):f("",!0),!s.value&&!n.value?(i(),r("div",fe,[C(e("span",null,null,512),[[_,"TID_SETTINGS_DLG_NOT_SIGNED_IN"]]),e("button",{class:"button accent",onClick:t[3]||(t[3]=a=>v.value=!0)},c(l.$t("TID_SETTINGS_DLG_SIGN_IN")),1)])):f("",!0)])]),x(l.$slots,"default",{},void 0,!0),e("div",we,[e("div",Ne,[e("p",null,[X("Powered by "),e("a",{href:R.value,target:"_blank"},"HS Compendium",8,Se)])])]),j(se,{open:v.value,"onUpdate:open":t[7]||(t[7]=a=>v.value=a),title:l.$t("TID_SETTINGS_DLG_SIGN_IN"),size:p(le).SMALL},{body:$(()=>[e("div",Re,[e("p",De,[C(e("span",null,null,512),[[_,"ENTER_CODE"]]),e("span",be,c(I.value),1)]),C(e("input",{"onUpdate:modelValue":t[4]||(t[4]=a=>d.value=a)},null,512),[[ee,d.value]])]),e("a",{href:R.value,target:"_blank"},c(M.value),9,Te),e("div",Oe,[C(e("select",{"onUpdate:modelValue":t[5]||(t[5]=a=>A.value=a),onChange:t[6]||(t[6]=a=>b(a.target.value))},Pe,544),[[te,A.value]])]),e("div",{class:ae(["code-req-btn-wrap",{disable:s.value}])},[C(e("button",{class:"button accent",onClick:D},null,512),[[_,"TID_LINK_DEVICE_DLG_SUBMIT_CODE_BTN"]])],2)]),_:1},8,["open","title","size"])])}}}),Me=ue(Ve,[["__scopeId","data-v-e7a0742d"]]);export{Me as C,w as m};
