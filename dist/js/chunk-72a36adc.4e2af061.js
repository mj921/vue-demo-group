(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-72a36adc"],{1148:function(e,t,n){"use strict";var a=n("a691"),r=n("1d80");e.exports=function(e){var t=String(r(this)),n="",i=a(e);if(i<0||i==1/0)throw RangeError("Wrong number of repetitions");for(;i>0;(i>>>=1)&&(t+=t))1&i&&(n+=t);return n}},2532:function(e,t,n){"use strict";var a=n("23e7"),r=n("5a34"),i=n("1d80"),u=n("ab13");a({target:"String",proto:!0,forced:!u("includes")},{includes:function(e){return!!~String(i(this)).indexOf(r(e),arguments.length>1?arguments[1]:void 0)}})},"408a":function(e,t,n){var a=n("c6b6");e.exports=function(e){if("number"!=typeof e&&"Number"!=a(e))throw TypeError("Incorrect invocation");return+e}},"44e7":function(e,t,n){var a=n("861d"),r=n("c6b6"),i=n("b622"),u=i("match");e.exports=function(e){var t;return a(e)&&(void 0!==(t=e[u])?!!t:"RegExp"==r(e))}},5530:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));n("b64b"),n("a4d3"),n("4de4"),n("e439"),n("159b"),n("dbb4");var a=n("ade3");function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){Object(a["a"])(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}},"5a34":function(e,t,n){var a=n("44e7");e.exports=function(e){if(a(e))throw TypeError("The method doesn't accept regular expressions");return e}},9527:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"xiagu"},[n("button",{attrs:{disabled:e.autoFlag},on:{click:e.play}},[e._v("点击")]),n("button",{on:{click:e.playAuto}},[e._v(e._s(e.autoFlag?"关":"开")+"自动")]),n("button",{attrs:{disabled:e.autoFlag},on:{click:function(t){return e.playTimes(e.ipt)}}},[e._v("点击自定义")]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.ipt,expression:"ipt"}],attrs:{type:"text"},domProps:{value:e.ipt},on:{input:function(t){t.target.composing||(e.ipt=t.target.value)}}}),n("button",{on:{click:e.search}},[e._v("搜索")]),n("button",{on:{click:e.searchRank}},[e._v("搜索排名")]),n("el-switch",{attrs:{disabled:e.autoFlag},model:{value:e.scoreFlag,callback:function(t){e.scoreFlag=t},expression:"scoreFlag"}},[e._v(" 匹配和分数是否有关 ")]),e._v(" "+e._s(e.totalPlayNum/10)+" "),n("br"),n("el-tabs",{staticClass:"ranks",model:{value:e.currTab,callback:function(t){e.currTab=t},expression:"currTab"}},[n("el-tab-pane",{attrs:{label:"top10",name:"top10"}},[n("el-table",{attrs:{data:e.top10,border:"",stripe:"",size:"mini"},on:{"row-click":function(t){return e.detail(t.id)}}},[n("el-table-column",{attrs:{prop:"id",label:"id"}}),n("el-table-column",{attrs:{prop:"score",label:"score"}}),n("el-table-column",{attrs:{prop:"playNum",label:"total"}}),n("el-table-column",{attrs:{label:"win"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[e._v(" "+e._s(0===n.playNum?0:(n.winNum/n.playNum*100).toFixed(2))+"% ")]}}])})],1)],1),n("el-tab-pane",{attrs:{label:"top10 rw",name:"top10 rw"}},[n("el-select",{attrs:{size:"mini"},model:{value:e.currRw,callback:function(t){e.currRw=t},expression:"currRw"}},e._l(e.renwu,(function(e){return n("el-option",{key:e.name,attrs:{label:e.name,value:e.name}})})),1),n("el-table",{attrs:{data:e.rwRank,border:"",stripe:"",size:"mini"},on:{"row-click":function(t){return e.detail(t.id)}}},[n("el-table-column",{attrs:{prop:"id",label:"id"}}),n("el-table-column",{attrs:{prop:"sld",label:"sld"}}),n("el-table-column",{attrs:{prop:"playNum",label:"total"}}),n("el-table-column",{attrs:{label:"win"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[e._v(" "+e._s((100*n.winRate).toFixed(2))+"% ")]}}])})],1)],1),n("el-tab-pane",{attrs:{label:"top10 allRw player",name:"top10 allRw player"}},[n("el-table",{attrs:{data:e.allRwplayerRank,border:"",stripe:"",size:"mini"},on:{"row-click":function(t){return e.detail(t.id)}}},[n("el-table-column",{attrs:{prop:"id",label:"id"}}),n("el-table-column",{attrs:{prop:"name",label:"name"}}),n("el-table-column",{attrs:{prop:"sld",label:"sld"}}),n("el-table-column",{attrs:{prop:"playNum",label:"total"}}),n("el-table-column",{attrs:{label:"win"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[e._v(" "+e._s((100*n.winRate).toFixed(2))+"% ")]}}])})],1)],1),n("el-tab-pane",{attrs:{label:"top10 allRw player win",name:"top10 allRw player win"}},[n("el-table",{attrs:{data:e.winRatePlayerRank,border:"",stripe:"",size:"mini"},on:{"row-click":function(t){return e.detail(t.id)}}},[n("el-table-column",{attrs:{prop:"id",label:"id"}}),n("el-table-column",{attrs:{prop:"name",label:"name"}}),n("el-table-column",{attrs:{prop:"sld",label:"sld"}}),n("el-table-column",{attrs:{prop:"playNum",label:"total"}}),n("el-table-column",{attrs:{label:"win"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[e._v(" "+e._s((100*n.winRate).toFixed(2))+"% ")]}}])})],1)],1),e._l(e.rwRankList,(function(t){return n("el-tab-pane",{key:t.name,attrs:{label:t.name,name:t.name}},[n("el-table",{attrs:{data:t.data,border:"",stripe:"",size:"mini"}},[n("el-table-column",{attrs:{prop:"name",label:"name"}}),n("el-table-column",{attrs:{prop:"playNum",label:"total"}}),n("el-table-column",{attrs:{label:"win"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[e._v(" "+e._s((100*n.winRate).toFixed(2))+"% ")]}}],null,!0)}),n("el-table-column",{attrs:{label:"showRate"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[e._v(" "+e._s(e.totalPlayNum>0?(n.playNum/(e.totalPlayNum/10)*100).toFixed(2):0)+"% ")]}}],null,!0)})],1)],1)}))],2)],1)},r=[],i=n("3835"),u=n("5530"),l=(n("13d5"),n("b0c0"),n("a434"),n("fb6a"),n("d81d"),n("4de4"),n("99af"),n("159b"),n("c740"),n("b64b"),n("b680"),n("caad"),n("2532"),[{type:["dr"],name:"dema",atk:75,alv:7,f:75,flv:7,g:0},{type:["dr"],name:"eyu",atk:75,alv:8,f:75,flv:6,g:0},{type:["dr"],name:"nuoke",atk:75,alv:8,f:70,flv:7,g:0},{type:["dr"],name:"jj",atk:90,alv:9,f:40,flv:4,g:0},{type:["dr"],name:"mengduo",atk:50,alv:5,f:90,flv:9,g:0},{type:["dy"],name:"js",atk:85,alv:9,f:40,flv:4,g:0},{type:["dy"],name:"wei",atk:75,alv:8,f:70,flv:7,g:0},{type:["dy"],name:"tanglang",atk:85,alv:8,f:50,flv:5,g:0},{type:["dy"],name:"nunu",atk:60,alv:6,f:60,flv:6,g:0},{type:["dy"],name:"amumu",atk:50,alv:5,f:70,flv:8,g:0},{type:["zl"],name:"huonan",atk:90,alv:7,f:45,flv:5,g:0},{type:["zl"],name:"yuren",atk:80,alv:8,f:50,flv:5,g:0},{type:["zl"],name:"fenghaung",atk:80,alv:8,f:60,flv:5,g:0},{type:["zl"],name:"buxiang",atk:60,alv:8,f:60,flv:6,g:0},{type:["zl"],name:"fatiao",atk:70,alv:8,f:60,flv:6,g:0},{type:["ss"],name:"vn",atk:75,alv:10,f:40,flv:3,g:0},{type:["ss"],name:"ez",atk:80,alv:9,f:45,flv:4,g:0},{type:["ss"],name:"xiaopao",atk:70,alv:10,f:43,flv:4,g:0},{type:["ss"],name:"jinkesi",atk:80,alv:8,f:40,flv:5,g:0},{type:["ss"],name:"delaiwen",atk:90,alv:9,f:40,flv:4,g:0},{type:["fz"],name:"rinv",atk:40,alv:4,f:80,flv:9,g:2},{type:["fz"],name:"qinnv",atk:60,alv:5,f:50,flv:5,g:3},{type:["fz"],name:"naima",atk:40,alv:4,f:70,flv:7,g:3},{type:["fz"],name:"fengnv",atk:60,alv:5,f:50,flv:6,g:3},{type:["fz"],name:"lulu",atk:65,alv:6,f:50,flv:6,g:2}]),o={data:function(){var e=[],t=l,n=t.reduce((function(e,t){return e[t.name]=t,e}),{}),a=localStorage.getItem("xiaguPlayers"),r=function(){for(var t=0;t<120;t++){var n=[1,2,3,4,5],a=Math.floor(t/24),r=n[a];n.splice(a,1);var i=Math.floor(t%24/6),u=n[i];n.splice(i,1);var l=Math.floor(t%24%6/2),o=n[l];n.splice(l,1);var s=Math.floor(t%24%6%2),c=n[s];n.splice(s,1),e.push({id:t+1,score:0,playNum:0,winNum:0,loseNum:0,renwu:{},k:0,d:0,a:0,kda:0,weizhi:[r,u,o,c,n[0]]})}};try{a?e=JSON.parse(a):r()}catch(i){r()}return{renwu:t,renwuMap:n,players:e,weizhiMap:{1:"dr",2:"dy",3:"zl",4:"ss",5:"fz"},ipt:"",currRw:"",autoFlag:!1,sto:null,currTab:"top10",scoreFlag:!1}},computed:{rank:function(){var e=JSON.parse(JSON.stringify(this.players));return e.sort((function(e,t){return e.score!==t.score?t.score-e.score:e.winNum/e.playNum!==t.winNum/t.playNum?t.winNum/t.playNum-e.winNum/e.playNum:e.playNum!==t.playNum?e.playNum-t.playNum:e.id-t.id})),e},top10:function(){return this.rank.slice(0,10)},bottom10:function(){return this.rank.slice(-10)},rwRank:function(){var e=this;if(!this.currRw)return[];var t=this.players.filter((function(t){return t.renwu&&t.renwu[e.currRw]})).map((function(t){return Object(u["a"])(Object(u["a"])({id:t.id},t.renwu[e.currRw]),{},{winRate:t.renwu[e.currRw].winNum/t.renwu[e.currRw].playNum})}));return t.sort((function(e,t){return e.sld!==t.sld?t.sld-e.sld:e.winRate!==t.winRate?t.winRate-e.winRate:e.playNum!==t.playNum?e.playNum-t.playNum:e.id-t.id})),t.slice(0,10)},allRwplayerRank:function(){var e=this,t=this.renwu.reduce((function(t,n){return t.concat(e.players.filter((function(e){return e.renwu&&e.renwu[n.name]})).map((function(e){return Object(u["a"])(Object(u["a"])({id:e.id},e.renwu[n.name]),{},{name:n.name,winRate:e.renwu[n.name].winNum/e.renwu[n.name].playNum})})))}),[]);return t.sort((function(e,t){return e.sld!==t.sld?t.sld-e.sld:e.winRate!==t.winRate?t.winRate-e.winRate:e.playNum!==t.playNum?e.playNum-t.playNum:e.id-t.id})),t.slice(0,10)},winRatePlayerRank:function(){var e=this,t=this.renwu.reduce((function(t,n){return t.concat(e.players.filter((function(t){return t.renwu&&t.renwu[n.name]&&t.renwu[n.name].playNum>e.totalPlayNum/e.renwu.length/50})).map((function(e){return Object(u["a"])(Object(u["a"])({id:e.id},e.renwu[n.name]),{},{name:n.name,winRate:e.renwu[n.name].winNum/e.renwu[n.name].playNum})})))}),[]);return t.sort((function(e,t){return e.winRate!==t.winRate?t.winRate-e.winRate:e.sld!==t.sld?t.sld-e.sld:e.playNum!==t.playNum?e.playNum-t.playNum:e.id-t.id})),t.slice(0,10)},allRwData:function(){var e=this,t=this.renwu.map((function(t){var n={name:t.name,winNum:0,playNum:0};return e.players.forEach((function(e){e.renwu[t.name]&&(n.winNum+=e.renwu[t.name].winNum,n.playNum+=e.renwu[t.name].playNum)})),n.winRate=n.playNum>0?n.winNum/n.playNum:0,n}));return t},totalPlayNum:function(){return this.allRwData.reduce((function(e,t){return e+t.playNum}),0)},winRwRateRank:function(){var e=JSON.parse(JSON.stringify(this.allRwData));return e.sort((function(e,t){return e.winRate!==t.winRate?t.winRate-e.winRate:e.playNum!==t.playNum?t.playNum-e.playNum:-1})),e.slice(0,10)},winRwRateRankBottom:function(){var e=JSON.parse(JSON.stringify(this.allRwData));return e.sort((function(e,t){return e.winRate!==t.winRate?e.winRate-t.winRate:e.playNum!==t.playNum?e.playNum-t.playNum:1})),e.slice(0,10)},playRwRateRank:function(){var e=JSON.parse(JSON.stringify(this.allRwData));return e.sort((function(e,t){return e.playNum!==t.playNum?t.playNum-e.playNum:e.winRate!==t.winRate?t.winRate-e.winRate:-1})),e.slice(0,10)},playRwRateRankBottom:function(){var e=JSON.parse(JSON.stringify(this.allRwData));return e.sort((function(e,t){return e.playNum!==t.playNum?e.playNum-t.playNum:e.winRate!==t.winRate?e.winRate-t.winRate:1})),e.slice(0,10)},rwRankList:function(){return[{data:this.winRwRateRank,name:"top10_rw_win"},{data:this.playRwRateRank,name:"top10_rw_play"},{data:this.winRwRateRankBottom,name:"bottom10_rw_win"},{data:this.playRwRateRankBottom,name:"bottom10_rw_play"}]}},methods:{detail:function(e){var t=this.rank.findIndex((function(t){return t.id===e}));t>-1&&this.showPlayer(t)},searchRank:function(){if(/^\d+$/.test(this.ipt)){var e=+this.ipt-1;e>-1&&e<120&&this.showPlayer(e)}},search:function(){var e=this,t=this.rank.findIndex((function(t){return"".concat(t.id)===e.ipt}));t>-1&&this.showPlayer(t)},showPlayer:function(e){var t=this.rank[e];console.log(t),console.log(Object.keys(t.renwu).reduce((function(e,n){return e[n]=Object(u["a"])(Object(u["a"])({},t.renwu[n]),{},{winRate:0===t.renwu[n].playNum?0:(t.renwu[n].winNum/t.renwu[n].playNum*100).toFixed(2)+"%"}),e}),{})),console.log("".concat(t.id," score ").concat(t.score," total ").concat(t.playNum," win ").concat(0===t.playNum?0:(t.winNum/t.playNum*100).toFixed(2),"% ").concat(e+1)),console.log("k-d-a ".concat(t.k>0?+(t.k/t.playNum).toFixed(2):0,"-").concat(t.d>0?+(t.d/t.playNum).toFixed(2):0,"-").concat(t.a>0?+(t.a/t.playNum).toFixed(2):0," kda ").concat(t.kda))},getTeam:function(){for(var e=[],t=[],n=this.players.map((function(e,t){return t})),a=0,r=0,i=0;i<10;i++){var u=Math.floor(n.length*Math.random()),l=0;if(i%2===0){while(this.scoreFlag&&0!==a&&a/e.length<Math.random()*this.players[n[u]].score&&l<5)u=Math.floor(n.length*Math.random()),l++;e.push({player:this.players[n[u]]})}else{while(this.scoreFlag&&0!==r&&r/t.length<Math.random()*this.players[n[u]].score&&l<5)u=Math.floor(n.length*Math.random()),l++;t.push({player:this.players[n[u]]})}n.splice(u,1)}return[this.getWeizhi(e),this.getWeizhi(t)]},getWeizhi:function(e){var t=this,n=[{}],a={},r=[],i=0,u=0;while(Object.keys(a).length<5&&i<5){for(var l in e.forEach((function(e){var t=e.player,u=t.weizhi,l=t.id;r.includes(l)||a[u[i]]||(n[i][u[i]]?n[i][u[i]].push(e):n[i][u[i]]=[e])})),n[i])1===n[i][l].length&&(a[l]=n[i][l][0],a[l].weizhi=+l,r.push(n[i][l][0].player.id));i++,5===i&&u<2?(i=0,u++,n=[{}]):n.push({})}if(Object.keys(a).length<5){var o=e.filter((function(e){return!r.includes(e.player.id)}));[1,2,3,4,5].filter((function(e){if(!a[e]){var t=Math.floor(Math.random()*o.length);a[e]=o[t],o[t].weizhi=e,o.splice(t,1)}}))}return e.teamMap=e.reduce((function(e,n){return e[t.weizhiMap[n.weizhi]]=n,e}),{}),e},getRenwu:function(e){for(var t=this,n=JSON.parse(JSON.stringify(this.renwu)),a=function(a){e.forEach((function(e){for(var r=e[a],i=r.player,l=r.weizhi,o=0,s=n.map((function(e){var n=(100+(i.renwu[e.name]&&i.renwu[e.name].sld||0))*(e.type.includes(t.weizhiMap[l])?5:1);return o+=n,Object(u["a"])(Object(u["a"])({},e),{},{weight:n})})),c=Math.random()*o,f=0;f<s.length;f++){var d=s[f];if(c-=d.weight,c<=0){var p=d.atk,w=d.alv,m=d.f,h=d.flv,y=d.g,v=d.name,b=d.type,g=(100+(i.renwu[d.name]&&i.renwu[d.name].sld||0))*(d.type.includes(t.weizhiMap[l])?1.2:1)/100;e[a].renwu={id:i.id,name:v,type:b,atk:p*g,alv:w*g,f:m*g,flv:h*g,g:y*g,sld:i.renwu[d.name]&&i.renwu[d.name].sld>1?i.renwu[d.name].sld:1,killNum:0,deathNum:0,assistNum:0},n.splice(f,1);break}}}))},r=0;r<5;r++)a(r)},getIsAct:function(e,t){var n=e.reduce((function(e,t){return e+t.atk+t.f}),0),a=t.reduce((function(e,t){return e+t.atk+t.f}),0);return Math.random()<n/(n+a)},renwuUp:function(e,t){e.atk+=e.alv*t,e.f+=e.flv*t},getResult:function(e,t){return Math.random()<e/(e+t)},fight:function(e,t){var n,a,r=this,i=arguments.length>2&&void 0!==arguments[2]&&arguments[2],l=arguments.length>3&&void 0!==arguments[3]&&arguments[3],o=e.reduce((function(e,t){return e+t.g}),10)/10,s=t.reduce((function(e,t){return e+t.g}),10)/10,c=JSON.parse(JSON.stringify(e)).map((function(e,t){return Object(u["a"])(Object(u["a"])({},e),{},{index:t,currF:10*e.f*o,currA:e.atk*o})})),f=JSON.parse(JSON.stringify(t)).map((function(e,t){return Object(u["a"])(Object(u["a"])({},e),{},{index:t,currF:10*e.f*(s+i?.1:0),currA:e.atk*(s+i?.1:0)})}));n=Math.floor(Math.random()*c.length),a=Math.floor(Math.random()*f.length);var d=c[n],p=f[a],w=0,m=0,h=0;while(c.length>0&&f.length>0&&(h<11||l&&h<1e3)){for(w=0,m=0;w<c.length||m<f.length;w++,m++){if(w<c.length&&p&&this.getResult(c[w].sld,p.sld)&&(p.currF-=c[w].currA,p.currF<=0)){var y=f.findIndex((function(e){return e.index===p.index}));t[p.index].deathNum++,e[c[w].index].killNum++,m>y&&m--,this.renwuUp(e[c[w].index],1),c.forEach((function(t){t.index!==c[w].index&&(e[t.index].assistNum++,c.length>1&&r.renwuUp(e[t.index],1/(c.length-1)))})),f.splice(a,1),a=Math.floor(Math.random()*f.length),p=f[a]}if(m<f.length&&d&&this.getResult(f[m].sld,d.sld)&&(d.currF-=f[m].currA,d.currF<=0)){var v=c.findIndex((function(e){return e.index===d.index}));e[d.index].deathNum++,t[f[m].index].killNum++,w>v&&w--,this.renwuUp(t[f[m].index],1),f.forEach((function(e){e.index!==f[m].index&&(t[e.index].assistNum++,f.length>1&&r.renwuUp(t[e.index],1/(f.length-1)))})),c.splice(n,1),n=Math.floor(Math.random()*c.length),d=c[n]}}h++}if(l)return c.length>0?1:0},round:function(e,t){var n=this,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1,r=e.teamMap,u=t.teamMap,l=[];if(l=a<4?[[[r.dr.renwu],[u.dr.renwu]],[[r.dy.renwu],[u.dy.renwu]],[[r.zl.renwu],[u.zl.renwu]],[[r.ss.renwu,r.fz.renwu],[u.ss.renwu,u.fz.renwu]]]:4===a?[[[r.dr.renwu,r.dy.renwu,r.zl.renwu],[u.dr.renwu,u.dy.renwu,u.zl.renwu]],[[r.ss.renwu,r.fz.renwu],[u.ss.renwu,u.fz.renwu]]]:5===a?[[[r.dr.renwu,r.dy.renwu,r.zl.renwu,r.ss.renwu,r.fz.renwu],[u.dr.renwu,u.dy.renwu,u.zl.renwu,u.ss.renwu,u.fz.renwu]]]:a<10?[[[r.dr.renwu],[u.dr.renwu]],[[r.dy.renwu],[u.dy.renwu]],[[r.zl.renwu],[u.zl.renwu]],[[r.ss.renwu,r.fz.renwu],[u.ss.renwu,u.fz.renwu]]]:a<20?[[[r.dr.renwu,r.dy.renwu,r.zl.renwu,r.ss.renwu,r.fz.renwu],[u.dr.renwu,u.dy.renwu,u.zl.renwu,u.ss.renwu,u.fz.renwu]]]:[[r.dr.renwu,r.dy.renwu,r.zl.renwu,r.ss.renwu,r.fz.renwu],[u.dr.renwu,u.dy.renwu,u.zl.renwu,u.ss.renwu,u.fz.renwu]],a<20)l.forEach((function(e){var t=Object(i["a"])(e,2),a=t[0],r=t[1],u=n.getIsAct(a,r),l=n.getIsAct(r,a);if(u||l)if(u&&l){a.forEach((function(e){return n.renwuUp(e,1)})),r.forEach((function(e){return n.renwuUp(e,1)}));var o=n.getResult(a.reduce((function(e,t){return e+t.sld}),0),r.reduce((function(e,t){return e+t.sld}),0))?[a,r]:[r,a];n.fight(o[0],o[1])}else u?n.fight(a,r,!0):n.fight(r,a,!0);else a.forEach((function(e){return n.renwuUp(e,.5)})),r.forEach((function(e){return n.renwuUp(e,.5)}))}));else{var o=l,s=Object(i["a"])(o,2),c=s[0],f=s[1],d=this.getResult(c.reduce((function(e,t){return e+t.sld}),0),f.reduce((function(e,t){return e+t.sld}),0)),p=d?[c,f]:[f,c],w=this.fight(p[0],p[1],!0,!0);"number"===typeof w&&(d&&(w=1-w),(0===w?e:t).win=!0)}a<20&&this.round(e,t,a+1)},getKDA:function(e,t,n){return+((e+n*(0===t?1:.7))/(t||1)).toFixed(2)},teamAchievement:function(e,t){var n,a,r=e.teamMap,i=t.teamMap;for(var u in e.k=e.d=e.a=t.k=t.d=t.a=0,this.weizhiMap){var l=this.weizhiMap[u];e.k+=r[l].k=r[l].renwu.killNum,e.d+=r[l].d=r[l].renwu.deathNum,e.a+=r[l].a=r[l].renwu.assistNum,r[l].player.k+=r[l].k,r[l].player.d+=r[l].d,r[l].player.a+=r[l].a,r[l].player.kda=this.getKDA(r[l].player.k,r[l].player.d,r[l].player.a),r[l].kda=this.getKDA(r[l].k,r[l].d,r[l].a),t.k+=i[l].k=i[l].renwu.killNum,t.d+=i[l].d=i[l].renwu.deathNum,t.a+=i[l].a=i[l].renwu.assistNum,i[l].player.k+=i[l].k,i[l].player.d+=i[l].d,i[l].player.a+=i[l].a,i[l].player.kda=this.getKDA(i[l].player.k,i[l].player.d,i[l].player.a),i[l].kda=this.getKDA(i[l].k,i[l].d,i[l].a)}if(e.kda=this.getKDA(e.k,e.d,e.a),t.kda=this.getKDA(t.k,t.d,t.a),e.win?(n=e,a=t):t.win?(n=t,a=e):e.kda>t.kda?(n=e,a=t):t.kda>e.kda&&(n=t,a=e),n)for(var o in this.weizhiMap){var s=this.weizhiMap[o],c=n.teamMap[s],f=c.player,d=c.renwu,p=c.kda;f.renwu[d.name]||(f.renwu[d.name]={sld:0,playNum:0,winNum:0,loseNum:0}),f.renwu[d.name].sld=+(f.renwu[d.name].sld+p).toFixed(2),f.renwu[d.name].playNum++,f.renwu[d.name].winNum++,f.score++,f.playNum++,f.winNum++}if(a)for(var w in this.weizhiMap){var m=this.weizhiMap[w],h=a.teamMap[m],y=h.player,v=h.renwu,b=h.kda;y.renwu[v.name]||(y.renwu[v.name]={sld:0,playNum:0,winNum:0,loseNum:0}),y.renwu[v.name].sld=+(y.renwu[v.name].sld-(2*a.kda-b>0?2*a.kda-b:0)).toFixed(2),y.renwu[v.name].playNum++,y.renwu[v.name].loseNum++,y.score--,y.playNum++,y.loseNum++,y.renwu[v.name].sld<0&&(y.renwu[v.name].sld=0),y.score<0&&(y.score=0)}},play:function(){var e=this.getTeam();this.getRenwu(e),this.round(e[0],e[1]),this.teamAchievement(e[0],e[1]),localStorage.setItem("xiaguPlayers",JSON.stringify(this.players))},playTimes:function(e){if(e){e=+e,console.time();for(var t=0;t<e;t++)this.play();console.timeEnd()}},playAuto:function(){var e=this;if(this.autoFlag)clearTimeout(this.sto),this.sto=null;else{var t=function t(){e.play(),e.sto=setTimeout(t,62.5)};t()}this.autoFlag=!this.autoFlag}}},s=o,c=(n("ef40"),n("2877")),f=Object(c["a"])(s,a,r,!1,null,"8ce85924",null);t["default"]=f.exports},"99af":function(e,t,n){"use strict";var a=n("23e7"),r=n("d039"),i=n("e8b5"),u=n("861d"),l=n("7b0b"),o=n("50c4"),s=n("8418"),c=n("65f0"),f=n("1dde"),d=n("b622"),p=n("2d00"),w=d("isConcatSpreadable"),m=9007199254740991,h="Maximum allowed index exceeded",y=p>=51||!r((function(){var e=[];return e[w]=!1,e.concat()[0]!==e})),v=f("concat"),b=function(e){if(!u(e))return!1;var t=e[w];return void 0!==t?!!t:i(e)},g=!y||!v;a({target:"Array",proto:!0,forced:g},{concat:function(e){var t,n,a,r,i,u=l(this),f=c(u,0),d=0;for(t=-1,a=arguments.length;t<a;t++)if(i=-1===t?u:arguments[t],b(i)){if(r=o(i.length),d+r>m)throw TypeError(h);for(n=0;n<r;n++,d++)n in i&&s(f,d,i[n])}else{if(d>=m)throw TypeError(h);s(f,d++,i)}return f.length=d,f}})},ab13:function(e,t,n){var a=n("b622"),r=a("match");e.exports=function(e){var t=/./;try{"/./"[e](t)}catch(n){try{return t[r]=!1,"/./"[e](t)}catch(a){}}return!1}},ade3:function(e,t,n){"use strict";function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.d(t,"a",(function(){return a}))},b64b:function(e,t,n){var a=n("23e7"),r=n("7b0b"),i=n("df75"),u=n("d039"),l=u((function(){i(1)}));a({target:"Object",stat:!0,forced:l},{keys:function(e){return i(r(e))}})},b680:function(e,t,n){"use strict";var a=n("23e7"),r=n("a691"),i=n("408a"),u=n("1148"),l=n("d039"),o=1..toFixed,s=Math.floor,c=function(e,t,n){return 0===t?n:t%2===1?c(e,t-1,n*e):c(e*e,t/2,n)},f=function(e){var t=0,n=e;while(n>=4096)t+=12,n/=4096;while(n>=2)t+=1,n/=2;return t},d=function(e,t,n){var a=-1,r=n;while(++a<6)r+=t*e[a],e[a]=r%1e7,r=s(r/1e7)},p=function(e,t){var n=6,a=0;while(--n>=0)a+=e[n],e[n]=s(a/t),a=a%t*1e7},w=function(e){var t=6,n="";while(--t>=0)if(""!==n||0===t||0!==e[t]){var a=String(e[t]);n=""===n?a:n+u.call("0",7-a.length)+a}return n},m=o&&("0.000"!==8e-5.toFixed(3)||"1"!==.9.toFixed(0)||"1.25"!==1.255.toFixed(2)||"1000000000000000128"!==(0xde0b6b3a7640080).toFixed(0))||!l((function(){o.call({})}));a({target:"Number",proto:!0,forced:m},{toFixed:function(e){var t,n,a,l,o=i(this),s=r(e),m=[0,0,0,0,0,0],h="",y="0";if(s<0||s>20)throw RangeError("Incorrect fraction digits");if(o!=o)return"NaN";if(o<=-1e21||o>=1e21)return String(o);if(o<0&&(h="-",o=-o),o>1e-21)if(t=f(o*c(2,69,1))-69,n=t<0?o*c(2,-t,1):o/c(2,t,1),n*=4503599627370496,t=52-t,t>0){d(m,0,n),a=s;while(a>=7)d(m,1e7,0),a-=7;d(m,c(10,a,1),0),a=t-1;while(a>=23)p(m,1<<23),a-=23;p(m,1<<a),d(m,1,1),p(m,2),y=w(m)}else d(m,0,n),d(m,1<<-t,0),y=w(m)+u.call("0",s);return s>0?(l=y.length,y=h+(l<=s?"0."+u.call("0",s-l)+y:y.slice(0,l-s)+"."+y.slice(l-s))):y=h+y,y}})},c740:function(e,t,n){"use strict";var a=n("23e7"),r=n("b727").findIndex,i=n("44d2"),u="findIndex",l=!0;u in[]&&Array(1)[u]((function(){l=!1})),a({target:"Array",proto:!0,forced:l},{findIndex:function(e){return r(this,e,arguments.length>1?arguments[1]:void 0)}}),i(u)},caad:function(e,t,n){"use strict";var a=n("23e7"),r=n("4d64").includes,i=n("44d2");a({target:"Array",proto:!0},{includes:function(e){return r(this,e,arguments.length>1?arguments[1]:void 0)}}),i("includes")},d81d:function(e,t,n){"use strict";var a=n("23e7"),r=n("b727").map,i=n("1dde"),u=i("map");a({target:"Array",proto:!0,forced:!u},{map:function(e){return r(this,e,arguments.length>1?arguments[1]:void 0)}})},dbb4:function(e,t,n){var a=n("23e7"),r=n("83ab"),i=n("56ef"),u=n("fc6a"),l=n("06cf"),o=n("8418");a({target:"Object",stat:!0,sham:!r},{getOwnPropertyDescriptors:function(e){var t,n,a=u(e),r=l.f,s=i(a),c={},f=0;while(s.length>f)n=r(a,t=s[f++]),void 0!==n&&o(c,t,n);return c}})},e439:function(e,t,n){var a=n("23e7"),r=n("d039"),i=n("fc6a"),u=n("06cf").f,l=n("83ab"),o=r((function(){u(1)})),s=!l||o;a({target:"Object",stat:!0,forced:s,sham:!l},{getOwnPropertyDescriptor:function(e,t){return u(i(e),t)}})},e607:function(e,t,n){},ef40:function(e,t,n){"use strict";n("e607")}}]);
//# sourceMappingURL=chunk-72a36adc.4e2af061.js.map