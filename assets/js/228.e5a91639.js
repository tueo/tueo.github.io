"use strict";(self.webpackChunklearn_data=self.webpackChunklearn_data||[]).push([[228],{8228:(e,l,t)=>{t.r(l),t.d(l,{default:()=>m});var r=t(8981),s=t(5670),a=t(2930),u=t(6719),o=t(7847),i=t(3151),n=t(5826),c=t(9658);const h=["/","/blog.html","/posts/2024-03-01-blog_example.html","/posts/2024-03-02-blog_example2.html","/protocol/dump_0001.html","/protocol/git.html","/protocol/kconfig.html","/protocol/ZigBee/tcpip.html","/protocol/ZigBee/zigbee-routing.html","/protocol/ZigBee/zigbee-table.html","/protocol/LTE/lte_physical.html","/protocol/LTE/network.html","/protocol/LTE/oper_name.html","/protocol/LTE/sim.html","/404.html","/posts/","/protocol/","/protocol/ZigBee/","/protocol/LTE/","/category/","/category/%E4%BD%BF%E7%94%A8%E6%8C%87%E5%8D%97/","/category/%E5%B7%A5%E5%85%B7/","/tag/","/tag/%E9%A1%B5%E9%9D%A2%E9%85%8D%E7%BD%AE/","/tag/%E4%BD%BF%E7%94%A8%E6%8C%87%E5%8D%97/","/article/","/star/","/timeline/"];t(2082);const v=(0,s.Mjh)("SEARCH_PRO_QUERY_HISTORY",[]),p=e=>h[e.id]+("anchor"in e?`#${e.anchor}`:""),{resultHistoryCount:y}=c.s,d=(0,s.Mjh)("SEARCH_PRO_RESULT_HISTORY",[]);var m=(0,o.pM)({name:"SearchResult",props:{query:{type:String,required:!0},isFocusing:Boolean},emits:["close","updateQuery"],setup(e,{emit:l}){const t=(0,i.rd)(),h=(0,i.Zv)(),m=(0,r.s5)(c.a),{enabled:g,addQueryHistory:E,queryHistory:H,removeQueryHistory:f}=(()=>{const{queryHistoryCount:e}=c.s,l=e>0;return{enabled:l,queryHistory:v,addQueryHistory:t=>{l&&(v.value.length<e?v.value=Array.from(new Set([t,...v.value])):v.value=Array.from(new Set([t,...v.value.slice(0,e-1)])))},removeQueryHistory:e=>{v.value=[...v.value.slice(0,e),...v.value.slice(e+1)]}}})(),{enabled:k,resultHistory:Q,addResultHistory:R,removeResultHistory:b}=(()=>{const e=y>0;return{enabled:e,resultHistory:d,addResultHistory:l=>{if(e){const e={link:p(l),display:l.display};"header"in l&&(e.header=l.header),d.value.length<y?d.value=[e,...d.value]:d.value=[e,...d.value.slice(0,y-1)]}},removeResultHistory:e=>{d.value=[...d.value.slice(0,e),...d.value.slice(e+1)]}}})(),w=g||k,x=(0,u.lW)(e,"query"),{results:B,searching:C}=(e=>{const l=(0,c.u)(),t=(0,i.Zv)(),{search:r,terminate:s}=(0,c.c)(),n=(0,u.KR)(!1),h=(0,u.IJ)([]);return(0,o.sV)((()=>{const u=()=>{h.value=[],n.value=!1},i=(0,a.Q0)((e=>{n.value=!0,e?r({type:"search",query:e,locale:t.value,options:l.value}).then((e=>{h.value=e,n.value=!1})).catch((e=>{console.error(e),u()})):u()}),c.s.searchDelay);(0,o.wB)([e,t],(()=>i(e.value)),{immediate:!0}),(0,o.hi)((()=>{s()}))})),{searching:n,results:h}})(x),A=(0,u.Kh)({isQuery:!0,index:0}),D=(0,u.KR)(0),_=(0,u.KR)(0),T=(0,o.EW)((()=>w&&(H.value.length>0||Q.value.length>0))),q=(0,o.EW)((()=>B.value.length>0)),S=(0,o.EW)((()=>B.value[D.value]||null)),L=e=>e.map((e=>(0,r.Kg)(e)?e:(0,o.h)(e[0],e[1]))),M=e=>{if("customField"===e.type){const l=c.b[e.index]||"$content",[t,s=""]=(0,r.Qd)(l)?l[h.value].split("$content"):l.split("$content");return e.display.map((e=>(0,o.h)("div",L([t,...e,s]))))}return e.display.map((e=>(0,o.h)("div",L(e))))},W=()=>{D.value=0,_.value=0,l("updateQuery",""),l("close")};return(0,s.MLh)("keydown",(r=>{if(e.isFocusing)if(q.value){if("ArrowUp"===r.key)_.value>0?_.value-=1:(D.value=D.value>0?D.value-1:B.value.length-1,_.value=S.value.contents.length-1);else if("ArrowDown"===r.key)_.value<S.value.contents.length-1?_.value+=1:(D.value=D.value<B.value.length-1?D.value+1:0,_.value=0);else if("Enter"===r.key){const l=S.value.contents[_.value];E(e.query),R(l),t.push(p(l)),W()}}else if(k)if("ArrowUp"===r.key)(()=>{const{isQuery:e,index:l}=A;0===l?(A.isQuery=!e,A.index=e?Q.value.length-1:H.value.length-1):A.index=l-1})();else if("ArrowDown"===r.key)(()=>{const{isQuery:e,index:l}=A;l===(e?H.value.length-1:Q.value.length-1)?(A.isQuery=!e,A.index=0):A.index=l+1})();else if("Enter"===r.key){const{index:e}=A;A.isQuery?(l("updateQuery",H.value[e]),r.preventDefault()):(t.push(Q.value[e].link),W())}})),(0,o.wB)([D,_],(()=>{document.querySelector(".search-pro-result-list-item.active .search-pro-result-item.active")?.scrollIntoView(!1)}),{flush:"post"}),()=>(0,o.h)("div",{class:["search-pro-result-wrapper",{empty:x.value?!q.value:!T.value}],id:"search-pro-results"},""===x.value?w?T.value?[g?(0,o.h)("ul",{class:"search-pro-result-list"},(0,o.h)("li",{class:"search-pro-result-list-item"},[(0,o.h)("div",{class:"search-pro-result-title"},m.value.queryHistory),H.value.map(((e,t)=>(0,o.h)("div",{class:["search-pro-result-item",{active:A.isQuery&&A.index===t}],onClick:()=>{l("updateQuery",e)}},[(0,o.h)(n.H,{class:"search-pro-result-type"}),(0,o.h)("div",{class:"search-pro-result-content"},e),(0,o.h)("button",{class:"search-pro-remove-icon",innerHTML:n.C,onClick:e=>{e.preventDefault(),e.stopPropagation(),f(t)}})])))])):null,k?(0,o.h)("ul",{class:"search-pro-result-list"},(0,o.h)("li",{class:"search-pro-result-list-item"},[(0,o.h)("div",{class:"search-pro-result-title"},m.value.resultHistory),Q.value.map(((e,l)=>(0,o.h)(i.Wt,{to:e.link,class:["search-pro-result-item",{active:!A.isQuery&&A.index===l}],onClick:()=>{W()}},(()=>[(0,o.h)(n.H,{class:"search-pro-result-type"}),(0,o.h)("div",{class:"search-pro-result-content"},[e.header?(0,o.h)("div",{class:"content-header"},e.header):null,(0,o.h)("div",e.display.map((e=>L(e))).flat())]),(0,o.h)("button",{class:"search-pro-remove-icon",innerHTML:n.C,onClick:e=>{e.preventDefault(),e.stopPropagation(),b(l)}})]))))])):null]:m.value.emptyHistory:m.value.emptyResult:C.value?(0,o.h)(n.S,{hint:m.value.searching}):q.value?(0,o.h)("ul",{class:"search-pro-result-list"},B.value.map((({title:l,contents:t},r)=>{const s=D.value===r;return(0,o.h)("li",{class:["search-pro-result-list-item",{active:s}]},[(0,o.h)("div",{class:"search-pro-result-title"},l||m.value.defaultTitle),t.map(((l,t)=>{const r=s&&_.value===t;return(0,o.h)(i.Wt,{to:p(l),class:["search-pro-result-item",{active:r,"aria-selected":r}],onClick:()=>{E(e.query),R(l),W()}},(()=>["text"===l.type?null:(0,o.h)("title"===l.type?n.T:"heading"===l.type?n.a:n.b,{class:"search-pro-result-type"}),(0,o.h)("div",{class:"search-pro-result-content"},["text"===l.type&&l.header?(0,o.h)("div",{class:"content-header"},l.header):null,(0,o.h)("div",M(l))])]))}))])}))):m.value.emptyResult)}})}}]);