(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-053471bc"],{"0cb2":function(s,m,y){var n=y("7b0b"),i=Math.floor,t="".replace,a=/\$([$&'`]|\d{1,2}|<[^>]*>)/g,e=/\$([$&'`]|\d{1,2})/g;s.exports=function(s,m,y,u,p,r){var o=y+s.length,c=u.length,l=e;return void 0!==p&&(p=n(p),l=a),t.call(r,l,(function(n,t){var a;switch(t.charAt(0)){case"$":return"$";case"&":return s;case"`":return m.slice(0,y);case"'":return m.slice(o);case"<":a=p[t.slice(1,-1)];break;default:var e=+t;if(0===e)return n;if(e>c){var r=i(e/10);return 0===r?n:r<=c?void 0===u[r-1]?t.charAt(1):u[r-1]+t.charAt(1):n}a=u[e-1]}return void 0===a?"":a}))}},1276:function(s,m,y){"use strict";var n=y("d784"),i=y("44e7"),t=y("825a"),a=y("1d80"),e=y("4840"),u=y("8aa5"),p=y("50c4"),r=y("14c3"),o=y("9263"),c=y("d039"),l=[].push,h=Math.min,g=4294967295,d=!c((function(){return!RegExp(g,"y")}));n("split",2,(function(s,m,y){var n;return n="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(s,y){var n=String(a(this)),t=void 0===y?g:y>>>0;if(0===t)return[];if(void 0===s)return[n];if(!i(s))return m.call(n,s,t);var e,u,p,r=[],c=(s.ignoreCase?"i":"")+(s.multiline?"m":"")+(s.unicode?"u":"")+(s.sticky?"y":""),h=0,d=new RegExp(s.source,c+"g");while(e=o.call(d,n)){if(u=d.lastIndex,u>h&&(r.push(n.slice(h,e.index)),e.length>1&&e.index<n.length&&l.apply(r,e.slice(1)),p=e[0].length,h=u,r.length>=t))break;d.lastIndex===e.index&&d.lastIndex++}return h===n.length?!p&&d.test("")||r.push(""):r.push(n.slice(h)),r.length>t?r.slice(0,t):r}:"0".split(void 0,0).length?function(s,y){return void 0===s&&0===y?[]:m.call(this,s,y)}:m,[function(m,y){var i=a(this),t=void 0==m?void 0:m[s];return void 0!==t?t.call(m,i,y):n.call(String(i),m,y)},function(s,i){var a=y(n,s,this,i,n!==m);if(a.done)return a.value;var o=t(s),c=String(this),l=e(o,RegExp),f=o.unicode,v=(o.ignoreCase?"i":"")+(o.multiline?"m":"")+(o.unicode?"u":"")+(d?"y":"g"),b=new l(d?o:"^(?:"+o.source+")",v),x=void 0===i?g:i>>>0;if(0===x)return[];if(0===c.length)return null===r(b,c)?[c]:[];var z=0,_=0,k=[];while(_<c.length){b.lastIndex=d?_:0;var C,w=r(b,d?c:c.slice(_));if(null===w||(C=h(p(b.lastIndex+(d?0:_)),c.length))===z)_=u(c,_,f);else{if(k.push(c.slice(z,_)),k.length===x)return k;for(var N=1;N<=w.length-1;N++)if(k.push(w[N]),k.length===x)return k;_=z=C}}return k.push(c.slice(z)),k}]}),!d)},"14c3":function(s,m,y){var n=y("c6b6"),i=y("9263");s.exports=function(s,m){var y=s.exec;if("function"===typeof y){var t=y.call(s,m);if("object"!==typeof t)throw TypeError("RegExp exec method returned something other than an Object or null");return t}if("RegExp"!==n(s))throw TypeError("RegExp#exec called on incompatible receiver");return i.call(s,m)}},4416:function(s,m,y){},"466d":function(s,m,y){"use strict";var n=y("d784"),i=y("825a"),t=y("50c4"),a=y("1d80"),e=y("8aa5"),u=y("14c3");n("match",1,(function(s,m,y){return[function(m){var y=a(this),n=void 0==m?void 0:m[s];return void 0!==n?n.call(m,y):new RegExp(m)[s](String(y))},function(s){var n=y(m,s,this);if(n.done)return n.value;var a=i(s),p=String(this);if(!a.global)return u(a,p);var r=a.unicode;a.lastIndex=0;var o,c=[],l=0;while(null!==(o=u(a,p))){var h=String(o[0]);c[l]=h,""===h&&(a.lastIndex=e(p,t(a.lastIndex),r)),l++}return 0===l?null:c}]}))},5319:function(s,m,y){"use strict";var n=y("d784"),i=y("825a"),t=y("50c4"),a=y("a691"),e=y("1d80"),u=y("8aa5"),p=y("0cb2"),r=y("14c3"),o=Math.max,c=Math.min,l=function(s){return void 0===s?s:String(s)};n("replace",2,(function(s,m,y,n){var h=n.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE,g=n.REPLACE_KEEPS_$0,d=h?"$":"$0";return[function(y,n){var i=e(this),t=void 0==y?void 0:y[s];return void 0!==t?t.call(y,i,n):m.call(String(i),y,n)},function(s,n){if(!h&&g||"string"===typeof n&&-1===n.indexOf(d)){var e=y(m,s,this,n);if(e.done)return e.value}var f=i(s),v=String(this),b="function"===typeof n;b||(n=String(n));var x=f.global;if(x){var z=f.unicode;f.lastIndex=0}var _=[];while(1){var k=r(f,v);if(null===k)break;if(_.push(k),!x)break;var C=String(k[0]);""===C&&(f.lastIndex=u(v,t(f.lastIndex),z))}for(var w="",N=0,M=0;M<_.length;M++){k=_[M];for(var E=String(k[0]),S=o(c(a(k.index),v.length),0),R=[],j=1;j<k.length;j++)R.push(l(k[j]));var I=k.groups;if(b){var q=[E].concat(R,S,v);void 0!==I&&q.push(I);var T=String(n.apply(void 0,q))}else T=p(E,v,S,R,I,n);S>=N&&(w+=v.slice(N,S)+T,N=S+E.length)}return w+v.slice(N)}]}))},6681:function(s,m,y){"use strict";y.r(m);var n=function(){var s=this,m=s.$createElement,y=s._self._c||m;return y("div",{staticClass:"cy-pinyin"},[y("div",{staticClass:"cy-header"},[y("el-button",{attrs:{type:"primary",size:"mini"},on:{click:s.reset}},[s._v("重新开始")]),s.finish?y("span",[s._v(s._s(s.cy))]):s._e(),y("el-button",{attrs:{size:"mini"},on:{click:function(m){s.statisticsVisible=!0}}},[s._v("统计")]),y("el-button",{attrs:{size:"mini"},on:{click:function(m){s.tipVisible=!0}}},[s._v("提示")])],1),y("div",{staticClass:"cy-input"},[s._l(s.inputRecords,(function(m,n){return y("dl",{key:"row-"+n,staticClass:"cy-row"},[y("div",{staticClass:"cy-row-num"},[s._v(s._s(n+1))]),s._l(m,(function(m,i){return y("dd",{key:"cell-"+n+"-"+i,staticClass:"cy-cell-group"},[y("div",{staticClass:"cy-cell cy-cell-input cy-cell-absolute cy-cell-cellrotate1",style:{animationDelay:(0===i?0:.4*i)+"s"}},[m?[y("div",{staticClass:"cy-py"},s._l(m.zms,(function(m,n){return y("span",{key:m.zm+"-"+i+"-"+n,staticClass:"cy-zm",class:"cy-zm-"+(m.sd||"")},[s._v(" "+s._s(m.zm)+" ")])})),0),y("div",{staticClass:"cy-text"},[s._v(" "+s._s(m.text)+" ")])]:s._e()],2),y("div",{staticClass:"cy-cell cy-cell-absolute cy-cell-cellrotate",class:"cy-cell-"+(m&&m.validResult),style:{animationDelay:(0===i?0:.4*i)+"s"}},[m?[y("div",{staticClass:"cy-py"},s._l(m.zms,(function(n,t){return y("span",{key:n.zm+"-"+i+"-"+t,staticClass:"cy-zm",class:"cy-zm-"+(n.sd||"")+"  cy-zm-"+(n.smFlag?m.smResult:m.ymResult)+" cy-sd-"+m.sdResult},[s._v(" "+s._s(n.zm)+" ")])})),0),y("div",{staticClass:"cy-text"},[s._v(" "+s._s(m.text)+" ")])]:s._e()],2)])}))],2)})),y("dl",{directives:[{name:"show",rawName:"v-show",value:!s.finish,expression:"!finish"}],staticClass:"cy-row",on:{click:s.inputClick}},[y("div",{staticClass:"cy-row-num"},[s._v(s._s(s.inputRecords.length+1))]),s._l(4,(function(m){return y("dd",{key:"curr-cell-"+m,staticClass:"cy-cell cy-cell-input"},[s.currCyPy[m-1]?[y("div",{staticClass:"cy-py"},s._l(s.currCyPy[m-1].zms,(function(n,i){return y("span",{key:n.zm+"-"+m+"-"+i,staticClass:"cy-zm",class:"cy-zm-"+(n.sd||"")},[s._v(" "+s._s(n.zm)+" ")])})),0),y("div",{staticClass:"cy-text"},[s._v(" "+s._s(s.currCyPy[m-1].text)+" ")])]:s._e()],2)}))],2),y("dl",{staticClass:"cy-row"},[y("input",{directives:[{name:"model",rawName:"v-model",value:s.currIpt,expression:"currIpt"}],ref:"input",staticClass:"answer-input",attrs:{type:"text",placeholder:"输入四字词语",disabled:s.finish},domProps:{value:s.currIpt},on:{keyup:function(m){return!m.type.indexOf("key")&&s._k(m.keyCode,"enter",13,m.key,"Enter")?null:s.submit(m)},input:function(m){m.target.composing||(s.currIpt=m.target.value)}}})]),y("dl",{staticClass:"cy-row"},[y("button",{staticClass:"confirm",class:{disabled:s.currIptCy.length<4},on:{click:s.submit}},[s._v(" 确定 ")])])],2),y("div",{staticClass:"cy-bottom"}),y("el-drawer",{staticClass:"statistics-drawer",attrs:{title:"统计",visible:s.statisticsVisible,size:"100%",direction:"ttb"},on:{"update:visible":function(m){s.statisticsVisible=m}}},[y("div",{staticClass:"statistics"},[y("dl",[y("label",{attrs:{for:""}},[s._v("游戏次数")]),y("span",[s._v(s._s(s.history.gameNum))])]),y("dl",[y("label",{attrs:{for:""}},[s._v("获胜次数")]),y("span",[s._v(s._s(s.history.gameWinNum)+" （尝试次数小于等于10次）")])]),y("dl",[y("label",{attrs:{for:""}},[s._v("获胜几率")]),y("span",[s._v(s._s(s.history.gameNum>0?(s.history.gameWinNum/s.history.gameNum*100).toFixed(2):0)+"%")])]),y("dl",[y("label",{attrs:{for:""}},[s._v("平均尝试次数")]),y("span",[s._v(s._s(s.history.gameNum>0?(s.history.totalGuessNum/s.history.gameNum).toFixed(2):0))])]),y("dl",[y("label",{attrs:{for:""}},[s._v("最多尝试次数")]),y("span",[s._v(s._s(s.history.maxGuessNum))])]),y("dl",[y("label",{attrs:{for:""}},[s._v("最少尝试次数")]),y("span",[s._v(s._s(s.history.minGuessNum))])]),y("el-button",{attrs:{type:"text",size:"default"},on:{click:function(m){s.guessNumMoreVisible=!s.guessNumMoreVisible}}},[s._v(s._s(s.guessNumMoreVisible?"收起":"展开"))]),s._l(Object.keys(s.history.guessNumMap),(function(m){return y("dl",{directives:[{name:"show",rawName:"v-show",value:s.guessNumMoreVisible||+m<11,expression:"guessNumMoreVisible || +guessNumKey < 11"}],key:"guessNumKey-"+m,staticClass:"stat-bar"},[y("span",{staticClass:"bar-text",staticStyle:{"text-align":"right"}},[s._v(" "+s._s(m)+" ")]),y("div",{staticClass:"bar-bg"},[y("div",{staticClass:"bar-curr",style:{width:s.history.guessNumMap[m]/s.maxGuessNumVolumn*100+"%"}},[s._v(" "+s._s(s.history.guessNumMap[m])+" ")])])])}))],2)]),y("el-drawer",{staticClass:"tip-drawer",attrs:{title:"提示",visible:s.tipVisible,size:"450px",modal:!1,"wrapper-closable":!1},on:{"update:visible":function(m){s.tipVisible=m}}},[y("div",{staticClass:"tip-content"},[y("div",{staticClass:"tip-list"},[y("dl",{staticClass:"tip-shengmu"},[y("dt",[s._v("声母")]),y("ul",{staticClass:"tip-shengmu-list"},s._l(Object.keys(s.shengmuMap),(function(m){return y("li",{key:"shengmutip-"+m,class:"tip-shengmu-"+s.shengmuMap[m]},[s._v(" "+s._s(m)+" ")])})),0)]),y("dl",{staticClass:"tip-yunmu"},[y("dt",[s._v("韵母")]),y("ul",{staticClass:"tip-yunmu-list"},s._l(Object.keys(s.yunmuMap),(function(m){return y("li",{key:"yunmutip-"+m,class:"tip-yunmu-"+s.yunmuMap[m]},[s._v(" "+s._s(m)+" ")])})),0)])]),s._v(" 已经正确的 "),y("div",{staticClass:"tip-pass"},s._l(s.passTips,(function(m,n){return y("dl",{key:"passTip"+n},[s._v(" "+s._s(m.text?m.text:""+m.sm+m.ym+" "+m.sd)+" ")])})),0),y("el-button",{attrs:{type:"text"},on:{click:function(m){s.moreTipVisible=!0}}},[s._v("更多")])],1)]),y("el-drawer",{staticClass:"tip-drawer",attrs:{title:"更多提示",visible:s.moreTipVisible,size:"450px",modal:!1,"wrapper-closable":!1},on:{"update:visible":function(m){s.moreTipVisible=m}}},[y("div",{staticClass:"tip-content"},[y("ul",{staticClass:"tip-pinyin-list"},s._l(s.pinyinData,(function(m){return y("li",{key:"pinyintip-"+m.py,class:"tip-pinyin-"+("error"===s.shengmuMap[m.sm]||"error"===s.yunmuMap[m.ym]?"error":"")},[y("span",{class:"tip-pinyin-"+("error"===s.shengmuMap[m.sm]?"error":s.shengmuMap[m.sm]?"has":"")},[s._v(s._s(m.sm))]),y("span",{class:"tip-pinyin-"+("error"===s.yunmuMap[m.ym]?"error":s.yunmuMap[m.ym]?"has":"")},[s._v(s._s(m.ym))])])})),0)])])],1)},i=[],t=(y("13d5"),y("99af"),y("fb6a"),y("5319"),y("ac1f"),y("d81d"),y("b64b"),y("159b"),y("1276"),y("466d"),y("4d63"),y("25f0"),y("a15b"),y("caad"),y("2532"),y("d958")),a=y.n(t),e=y("0819"),u=y("ccaf"),p=y("c928"),r=y("f6d7"),o=e.reduce((function(s,m){return 1===m.type?s.concat([m.data]):s}),[]),c={data:function(){var s=localStorage.getItem("cyHistory1"),m={score1:{top:[],bottom:[]},score2:{top:[],bottom:[]},gameNum:0,gameWinNum:0,totalGuessNum:0,maxGuessNum:-1/0,minGuessNum:1/0,guessNumMap:{}};if(s)try{m=JSON.parse(s)}catch(y){m={score1:{top:[],bottom:[]},score2:{top:[],bottom:[]},gameNum:0,gameWinNum:0,totalGuessNum:0,maxGuessNum:-1/0,minGuessNum:1/0,guessNumMap:{}}}return{cy:"",cyPinYin:[],cySmList:[],cyYmList:[],cySdList:[],inputRecords:[],currCyPy:[],currIpt:"",currRowIndex:0,currBlockIndex:0,currCellIndex:0,keyMap:{},history:m,statisticsVisible:!1,finish:!1,yunmuMap:{},shengmuMap:{},tipVisible:!1,moreTipVisible:!1,winGuessNum:10,passTips:[{sm:"",ym:"",sd:""},{sm:"",ym:"",sd:""},{sm:"",ym:"",sd:""},{sm:"",ym:"",sd:""}],pinyinData:r,guessNumMoreVisible:!1}},computed:{currIptCy:function(){return this.currIpt.replace(/[^\u4e00-\u9fa5]/g,"").slice(0,4)},maxGuessNumVolumn:function(){var s=this;return Math.max.apply(null,Object.keys(this.history.guessNumMap).map((function(m){return s.history.guessNumMap[m]})))}},watch:{currIptCy:function(){this.currCyPy=this.textToPy(this.currIptCy)}},methods:{getChengyu:function(){return o[Math.floor(o.length*Math.random())]},reset:function(){var s=this;this.cySmList=[],this.cyYmList=[],this.cySDList=[],this.cy=this.getChengyu(),this.cyPinYin=this.textToPy(this.cy),this.cyPinYin.forEach((function(m){s.cySmList.push(m.sm),s.cyYmList.push(m.ym),s.cySDList.push(m.sd)})),this.inputRecords=[],this.currRowIndex=0,this.currBlockIndex=0,this.currCellIndex=0,this.currIpt="",this.keyMap={},this.finish=!1,this.score={score1:100,score2:100},this.yunmuMap=p.reduce((function(s,m){return s[m]="",s}),{}),this.shengmuMap=u.reduce((function(s,m){return s[m]="",s}),{}),this.passTips=[{sm:"",ym:"",sd:""},{sm:"",ym:"",sd:""},{sm:"",ym:"",sd:""},{sm:"",ym:"",sd:""}]},inputClick:function(){this.$refs.input&&this.$refs.input.focus()},textToPy:function(s){var m=this;return a()(s,{style:a.a.STYLE_TO3NE}).map((function(y,n){var i=y[0].split(""),t={text:s[n]},a="";t.zms=i.reduce((function(s,m,y){return/[0-4]/.test(m)?(t.sd=m,s):(y<i.length-1&&/[0-4]/.test(i[y+1])?s.push({zm:"i"===m?"ı":m,sd:i[y+1]}):s.push({zm:m}),a+=m,s)}),[]);var e=m.matchSm(a);return t.py=a,t.sm=e&&e[0]||"",t.ym=a.replace(t.sm,""),t.zms.forEach((function(s,m){s.smFlag=t.sm.length>m})),t}))},matchSm:function(s){return s.toLowerCase().match(new RegExp("^(".concat(u.join("|"),")")))},submit:function(){var s=this;if(4===this.currIptCy.length){var m=0;this.currCyPy.forEach((function(y,n){var i=s.cyPinYin[n];y.text===i.text?(y.validResult=!0,s.$set(y,"validResult","pass"),s.shengmuMap[y.sm]="pass",s.yunmuMap[y.ym]="pass",s.passTips[n]={sm:i.sm,ym:i.ym,sd:i.sd,text:i.text},m++):(s.$set(y,"validResult",s.cy.includes(y.text)?"has":"error"),s.$set(y,"smResult",y.sm===i.sm?"pass":s.cySmList.includes(y.sm)?"has":"error"),"pass"!==s.shengmuMap[y.sm]&&(s.shengmuMap[y.sm]=y.smResult),"pass"===y.smResult&&(s.passTips[n].sm=i.sm),s.$set(y,"ymResult",y.ym===i.ym?"pass":s.cyYmList.includes(y.ym)?"has":"error"),"pass"!==s.yunmuMap[y.ym]&&(s.yunmuMap[y.ym]=y.ymResult),"pass"===y.ymResult&&(s.passTips[n].ym=i.ym),s.$set(y,"sdResult",y.sd===i.sd?"pass":s.cySdList.includes(y.sd)?"has":"error"),"pass"===y.sdResult&&(s.passTips[n].sd=i.sd))})),this.inputRecords.push(this.currCyPy),this.currIpt="",4===m&&(this.finish=!0,this.saveScore())}},saveScore:function(){var s=this.inputRecords.length;this.history.gameNum++,this.inputRecords.length<=this.winGuessNum&&this.history.gameWinNum++,this.history.totalGuessNum+=s,this.history.maxGuessNum<s&&(this.history.maxGuessNum=s),this.history.minGuessNum>s&&(this.history.minGuessNum=s),this.history.guessNumMap[s]?this.$set(this.history.guessNumMap,s,this.history.guessNumMap[s]+1):this.$set(this.history.guessNumMap,s,1),localStorage.setItem("cyHistory1",JSON.stringify(this.history))}},created:function(){this.reset()},mounted:function(){}},l=c,h=(y("c5a8"),y("2877")),g=Object(h["a"])(l,n,i,!1,null,"7aace292",null);m["default"]=g.exports},"8aa5":function(s,m,y){"use strict";var n=y("6547").charAt;s.exports=function(s,m,y){return m+(y?n(s,m).length:1)}},c5a8:function(s,m,y){"use strict";y("4416")},c928:function(s){s.exports=JSON.parse('["a","e","i","o","u","v","ai","an","ao","ei","en","er","ia","ie","in","io","iu","ou","ua","ui","un","uo","ve","vn","ang","eng","ian","iao","ing","ong","uai","uan","van","iang","iong","uang","ueng"]')},ccaf:function(s){s.exports=JSON.parse('["b","p","m","f","d","t","n","l","g","k","h","j","q","r","x","w","y","zh","ch","sh","z","c","s"]')},d784:function(s,m,y){"use strict";y("ac1f");var n=y("6eeb"),i=y("d039"),t=y("b622"),a=y("9263"),e=y("9112"),u=t("species"),p=!i((function(){var s=/./;return s.exec=function(){var s=[];return s.groups={a:"7"},s},"7"!=="".replace(s,"$<a>")})),r=function(){return"$0"==="a".replace(/./,"$0")}(),o=t("replace"),c=function(){return!!/./[o]&&""===/./[o]("a","$0")}(),l=!i((function(){var s=/(?:)/,m=s.exec;s.exec=function(){return m.apply(this,arguments)};var y="ab".split(s);return 2!==y.length||"a"!==y[0]||"b"!==y[1]}));s.exports=function(s,m,y,o){var h=t(s),g=!i((function(){var m={};return m[h]=function(){return 7},7!=""[s](m)})),d=g&&!i((function(){var m=!1,y=/a/;return"split"===s&&(y={},y.constructor={},y.constructor[u]=function(){return y},y.flags="",y[h]=/./[h]),y.exec=function(){return m=!0,null},y[h](""),!m}));if(!g||!d||"replace"===s&&(!p||!r||c)||"split"===s&&!l){var f=/./[h],v=y(h,""[s],(function(s,m,y,n,i){return m.exec===a?g&&!i?{done:!0,value:f.call(m,y,n)}:{done:!0,value:s.call(y,m,n)}:{done:!1}}),{REPLACE_KEEPS_$0:r,REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE:c}),b=v[0],x=v[1];n(String.prototype,s,b),n(RegExp.prototype,h,2==m?function(s,m){return x.call(s,this,m)}:function(s){return x.call(s,this)})}o&&e(RegExp.prototype[h],"sham",!0)}},f6d7:function(s){s.exports=JSON.parse('[{"py":"yi","sm":"y","ym":"i"},{"py":"bu","sm":"b","ym":"u"},{"py":"zhi","sm":"zh","ym":"i"},{"py":"shi","sm":"sh","ym":"i"},{"py":"wu","sm":"w","ym":"u"},{"py":"yu","sm":"y","ym":"u"},{"py":"ji","sm":"j","ym":"i"},{"py":"xin","sm":"x","ym":"in"},{"py":"qi","sm":"q","ym":"i"},{"py":"li","sm":"l","ym":"i"},{"py":"wei","sm":"w","ym":"ei"},{"py":"you","sm":"y","ym":"ou"},{"py":"yan","sm":"y","ym":"an"},{"py":"feng","sm":"f","ym":"eng"},{"py":"ren","sm":"r","ym":"en"},{"py":"ru","sm":"r","ym":"u"},{"py":"sheng","sm":"sh","ym":"eng"},{"py":"er","sm":"","ym":"er"},{"py":"jin","sm":"j","ym":"in"},{"py":"fu","sm":"f","ym":"u"},{"py":"da","sm":"d","ym":"a"},{"py":"zi","sm":"z","ym":"i"},{"py":"jian","sm":"j","ym":"ian"},{"py":"si","sm":"s","ym":"i"},{"py":"tian","sm":"t","ym":"ian"},{"py":"jing","sm":"j","ym":"ing"},{"py":"zhong","sm":"zh","ym":"ong"},{"py":"xiang","sm":"x","ym":"iang"},{"py":"ming","sm":"m","ym":"ing"},{"py":"bi","sm":"b","ym":"i"},{"py":"qing","sm":"q","ym":"ing"},{"py":"xi","sm":"x","ym":"i"},{"py":"shen","sm":"sh","ym":"en"},{"py":"shou","sm":"sh","ym":"ou"},{"py":"gu","sm":"g","ym":"u"},{"py":"shu","sm":"sh","ym":"u"},{"py":"cheng","sm":"ch","ym":"eng"},{"py":"jie","sm":"j","ym":"ie"},{"py":"di","sm":"d","ym":"i"},{"py":"zhu","sm":"zh","ym":"u"},{"py":"shan","sm":"sh","ym":"an"},{"py":"ying","sm":"y","ym":"ing"},{"py":"fei","sm":"f","ym":"ei"},{"py":"chu","sm":"ch","ym":"u"},{"py":"qian","sm":"q","ym":"ian"},{"py":"hua","sm":"h","ym":"ua"},{"py":"bai","sm":"b","ym":"ai"},{"py":"he","sm":"h","ym":"e"},{"py":"hu","sm":"h","ym":"u"},{"py":"yuan","sm":"y","ym":"uan"},{"py":"jiu","sm":"j","ym":"iu"},{"py":"ke","sm":"k","ym":"e"},{"py":"dao","sm":"d","ym":"ao"},{"py":"wang","sm":"w","ym":"ang"},{"py":"yin","sm":"y","ym":"in"},{"py":"mu","sm":"m","ym":"u"},{"py":"ju","sm":"j","ym":"u"},{"py":"wen","sm":"w","ym":"en"},{"py":"jia","sm":"j","ym":"ia"},{"py":"jiao","sm":"j","ym":"iao"},{"py":"xing","sm":"x","ym":"ing"},{"py":"chang","sm":"ch","ym":"ang"},{"py":"xiao","sm":"x","ym":"iao"},{"py":"san","sm":"s","ym":"an"},{"py":"yun","sm":"y","ym":"un"},{"py":"liu","sm":"l","ym":"iu"},{"py":"tong","sm":"t","ym":"ong"},{"py":"gong","sm":"g","ym":"ong"},{"py":"chi","sm":"ch","ym":"i"},{"py":"tou","sm":"t","ym":"ou"},{"py":"xian","sm":"x","ym":"ian"},{"py":"wan","sm":"w","ym":"an"},{"py":"hui","sm":"h","ym":"ui"},{"py":"xia","sm":"x","ym":"ia"},{"py":"fan","sm":"f","ym":"an"},{"py":"ran","sm":"r","ym":"an"},{"py":"guan","sm":"g","ym":"uan"},{"py":"yue","sm":"y","ym":"ue"},{"py":"yang","sm":"y","ym":"ang"},{"py":"de","sm":"d","ym":"e"},{"py":"ba","sm":"b","ym":"a"},{"py":"hao","sm":"h","ym":"ao"},{"py":"bing","sm":"b","ym":"ing"},{"py":"fen","sm":"f","ym":"en"},{"py":"zheng","sm":"zh","ym":"eng"},{"py":"nan","sm":"n","ym":"an"},{"py":"dong","sm":"d","ym":"ong"},{"py":"bao","sm":"b","ym":"ao"},{"py":"fa","sm":"f","ym":"a"},{"py":"an","sm":"","ym":"an"},{"py":"zuo","sm":"z","ym":"uo"},{"py":"gui","sm":"g","ym":"ui"},{"py":"huo","sm":"h","ym":"uo"},{"py":"shang","sm":"sh","ym":"ang"},{"py":"mei","sm":"m","ym":"ei"},{"py":"qu","sm":"q","ym":"u"},{"py":"cai","sm":"c","ym":"ai"},{"py":"shui","sm":"sh","ym":"ui"},{"py":"zai","sm":"z","ym":"ai"},{"py":"guo","sm":"g","ym":"uo"},{"py":"hang","sm":"h","ym":"ang"},{"py":"ma","sm":"m","ym":"a"},{"py":"mo","sm":"m","ym":"o"},{"py":"tu","sm":"t","ym":"u"},{"py":"ye","sm":"y","ym":"e"},{"py":"zhen","sm":"zh","ym":"en"},{"py":"xie","sm":"x","ym":"ie"},{"py":"kou","sm":"k","ym":"ou"},{"py":"chen","sm":"ch","ym":"en"},{"py":"ri","sm":"r","ym":"i"},{"py":"bei","sm":"b","ym":"ei"},{"py":"liang","sm":"l","ym":"iang"},{"py":"zhang","sm":"zh","ym":"ang"},{"py":"lao","sm":"l","ym":"ao"},{"py":"qiu","sm":"q","ym":"iu"},{"py":"dan","sm":"d","ym":"an"},{"py":"du","sm":"d","ym":"u"},{"py":"lin","sm":"l","ym":"in"},{"py":"yao","sm":"y","ym":"ao"},{"py":"gao","sm":"g","ym":"ao"},{"py":"suo","sm":"s","ym":"uo"},{"py":"jue","sm":"j","ym":"ue"},{"py":"huang","sm":"h","ym":"uang"},{"py":"ling","sm":"l","ym":"ing"},{"py":"mian","sm":"m","ym":"ian"},{"py":"long","sm":"l","ym":"ong"},{"py":"hai","sm":"h","ym":"ai"},{"py":"hou","sm":"h","ym":"ou"},{"py":"lv","sm":"l","ym":"v"},{"py":"dai","sm":"d","ym":"ai"},{"py":"nian","sm":"n","ym":"ian"},{"py":"fang","sm":"f","ym":"ang"},{"py":"han","sm":"h","ym":"an"},{"py":"yong","sm":"y","ym":"ong"},{"py":"she","sm":"sh","ym":"e"},{"py":"ci","sm":"c","ym":"i"},{"py":"zhao","sm":"zh","ym":"ao"},{"py":"huan","sm":"h","ym":"uan"},{"py":"duo","sm":"d","ym":"uo"},{"py":"xue","sm":"x","ym":"ue"},{"py":"mao","sm":"m","ym":"ao"},{"py":"hong","sm":"h","ym":"ong"},{"py":"ge","sm":"g","ym":"e"},{"py":"la","sm":"l","ym":"a"},{"py":"zu","sm":"z","ym":"u"},{"py":"xu","sm":"x","ym":"u"},{"py":"lian","sm":"l","ym":"ian"},{"py":"lai","sm":"l","ym":"ai"},{"py":"ruo","sm":"r","ym":"uo"},{"py":"bo","sm":"b","ym":"o"},{"py":"sui","sm":"s","ym":"ui"},{"py":"le","sm":"l","ym":"e"},{"py":"qin","sm":"q","ym":"in"},{"py":"quan","sm":"q","ym":"uan"},{"py":"man","sm":"m","ym":"an"},{"py":"e","sm":"","ym":"e"},{"py":"ku","sm":"k","ym":"u"},{"py":"ban","sm":"b","ym":"an"},{"py":"bian","sm":"b","ym":"ian"},{"py":"su","sm":"s","ym":"u"},{"py":"lu","sm":"l","ym":"u"},{"py":"men","sm":"m","ym":"en"},{"py":"duan","sm":"d","ym":"uan"},{"py":"can","sm":"c","ym":"an"},{"py":"pi","sm":"p","ym":"i"},{"py":"gan","sm":"g","ym":"an"},{"py":"qiang","sm":"q","ym":"iang"},{"py":"chou","sm":"ch","ym":"ou"},{"py":"xiu","sm":"x","ym":"iu"},{"py":"guang","sm":"g","ym":"uang"},{"py":"dang","sm":"d","ym":"ang"},{"py":"mi","sm":"m","ym":"i"},{"py":"jiang","sm":"j","ym":"iang"},{"py":"ai","sm":"","ym":"ai"},{"py":"se","sm":"s","ym":"e"},{"py":"po","sm":"p","ym":"o"},{"py":"xuan","sm":"x","ym":"uan"},{"py":"tan","sm":"t","ym":"an"},{"py":"lei","sm":"l","ym":"ei"},{"py":"gou","sm":"g","ym":"ou"},{"py":"zhan","sm":"zh","ym":"an"},{"py":"qiong","sm":"q","ym":"iong"},{"py":"luan","sm":"l","ym":"uan"},{"py":"rong","sm":"r","ym":"ong"},{"py":"zhe","sm":"zh","ym":"e"},{"py":"ding","sm":"d","ym":"ing"},{"py":"lan","sm":"l","ym":"an"},{"py":"kai","sm":"k","ym":"ai"},{"py":"chun","sm":"ch","ym":"un"},{"py":"lun","sm":"l","ym":"un"},{"py":"lou","sm":"l","ym":"ou"},{"py":"ti","sm":"t","ym":"i"},{"py":"wo","sm":"w","ym":"o"},{"py":"chuan","sm":"ch","ym":"uan"},{"py":"zhou","sm":"zh","ym":"ou"},{"py":"dian","sm":"d","ym":"ian"},{"py":"zao","sm":"z","ym":"ao"},{"py":"hun","sm":"h","ym":"un"},{"py":"ping","sm":"p","ym":"ing"},{"py":"cang","sm":"c","ym":"ang"},{"py":"zhuang","sm":"zh","ym":"uang"},{"py":"tai","sm":"t","ym":"ai"},{"py":"tao","sm":"t","ym":"ao"},{"py":"xiong","sm":"x","ym":"iong"},{"py":"ben","sm":"b","ym":"en"},{"py":"lang","sm":"l","ym":"ang"},{"py":"zhuo","sm":"zh","ym":"uo"},{"py":"ting","sm":"t","ym":"ing"},{"py":"zui","sm":"z","ym":"ui"},{"py":"ze","sm":"z","ym":"e"},{"py":"tiao","sm":"t","ym":"iao"},{"py":"sha","sm":"sh","ym":"a"},{"py":"deng","sm":"d","ym":"eng"},{"py":"cong","sm":"c","ym":"ong"},{"py":"che","sm":"ch","ym":"e"},{"py":"xun","sm":"x","ym":"un"},{"py":"gua","sm":"g","ym":"ua"},{"py":"meng","sm":"m","ym":"eng"},{"py":"ya","sm":"y","ym":"a"},{"py":"jun","sm":"j","ym":"un"},{"py":"kong","sm":"k","ym":"ong"},{"py":"dou","sm":"d","ym":"ou"},{"py":"cao","sm":"c","ym":"ao"},{"py":"shuo","sm":"sh","ym":"uo"},{"py":"bie","sm":"b","ym":"ie"},{"py":"chui","sm":"ch","ym":"ui"},{"py":"mai","sm":"m","ym":"ai"},{"py":"tang","sm":"t","ym":"ang"},{"py":"heng","sm":"h","ym":"eng"},{"py":"zhuan","sm":"zh","ym":"uan"},{"py":"shao","sm":"sh","ym":"ao"},{"py":"zong","sm":"z","ym":"ong"},{"py":"wai","sm":"w","ym":"ai"},{"py":"min","sm":"m","ym":"in"},{"py":"miao","sm":"m","ym":"iao"},{"py":"tui","sm":"t","ym":"ui"},{"py":"zou","sm":"z","ym":"ou"},{"py":"rou","sm":"r","ym":"ou"},{"py":"nao","sm":"n","ym":"ao"},{"py":"cun","sm":"c","ym":"un"},{"py":"kui","sm":"k","ym":"ui"},{"py":"ni","sm":"n","ym":"i"},{"py":"lie","sm":"l","ym":"ie"},{"py":"mou","sm":"m","ym":"ou"},{"py":"gai","sm":"g","ym":"ai"},{"py":"chong","sm":"ch","ym":"ong"},{"py":"neng","sm":"n","ym":"eng"},{"py":"geng","sm":"g","ym":"eng"},{"py":"qiao","sm":"q","ym":"iao"},{"py":"peng","sm":"p","ym":"eng"},{"py":"niu","sm":"n","ym":"iu"},{"py":"chao","sm":"ch","ym":"ao"},{"py":"sang","sm":"s","ym":"ang"},{"py":"kan","sm":"k","ym":"an"},{"py":"shuang","sm":"sh","ym":"uang"},{"py":"que","sm":"q","ym":"ue"},{"py":"qun","sm":"q","ym":"un"},{"py":"nu","sm":"n","ym":"u"},{"py":"cha","sm":"ch","ym":"a"},{"py":"nong","sm":"n","ym":"ong"},{"py":"huai","sm":"h","ym":"uai"},{"py":"zhui","sm":"zh","ym":"ui"},{"py":"kuang","sm":"k","ym":"uang"},{"py":"pan","sm":"p","ym":"an"},{"py":"tuo","sm":"t","ym":"uo"},{"py":"song","sm":"s","ym":"ong"},{"py":"die","sm":"d","ym":"ie"},{"py":"pian","sm":"p","ym":"ian"},{"py":"pu","sm":"p","ym":"u"},{"py":"ce","sm":"c","ym":"e"},{"py":"cui","sm":"c","ym":"ui"},{"py":"kang","sm":"k","ym":"ang"},{"py":"chan","sm":"ch","ym":"an"},{"py":"re","sm":"r","ym":"e"},{"py":"kuai","sm":"k","ym":"uai"},{"py":"biao","sm":"b","ym":"iao"},{"py":"cuo","sm":"c","ym":"uo"},{"py":"liao","sm":"l","ym":"iao"},{"py":"niao","sm":"n","ym":"iao"},{"py":"guai","sm":"g","ym":"uai"},{"py":"chuang","sm":"ch","ym":"uang"},{"py":"qie","sm":"q","ym":"ie"},{"py":"mang","sm":"m","ym":"ang"},{"py":"gen","sm":"g","ym":"en"},{"py":"pin","sm":"p","ym":"in"},{"py":"nv","sm":"n","ym":"v"},{"py":"leng","sm":"l","ym":"eng"},{"py":"diao","sm":"d","ym":"iao"},{"py":"shun","sm":"sh","ym":"un"},{"py":"kun","sm":"k","ym":"un"},{"py":"bin","sm":"b","ym":"in"},{"py":"dun","sm":"d","ym":"un"},{"py":"en","sm":"","ym":"en"},{"py":"tie","sm":"t","ym":"ie"},{"py":"luo","sm":"l","ym":"uo"},{"py":"ao","sm":"","ym":"ao"},{"py":"za","sm":"z","ym":"a"},{"py":"na","sm":"n","ym":"a"},{"py":"wa","sm":"w","ym":"a"},{"py":"rang","sm":"r","ym":"ang"},{"py":"tun","sm":"t","ym":"un"},{"py":"dui","sm":"d","ym":"ui"},{"py":"juan","sm":"j","ym":"uan"},{"py":"gang","sm":"g","ym":"ang"},{"py":"pang","sm":"p","ym":"ang"},{"py":"shuai","sm":"sh","ym":"uai"},{"py":"cu","sm":"c","ym":"u"},{"py":"pao","sm":"p","ym":"ao"},{"py":"zun","sm":"z","ym":"un"},{"py":"ning","sm":"n","ym":"ing"},{"py":"bang","sm":"b","ym":"ang"},{"py":"nang","sm":"n","ym":"ang"},{"py":"hen","sm":"h","ym":"en"},{"py":"hei","sm":"h","ym":"ei"},{"py":"mie","sm":"m","ym":"ie"},{"py":"ang","sm":"","ym":"ang"},{"py":"sao","sm":"s","ym":"ao"},{"py":"suan","sm":"s","ym":"uan"},{"py":"piao","sm":"p","ym":"iao"},{"py":"sa","sm":"s","ym":"a"},{"py":"ta","sm":"t","ym":"a"},{"py":"nie","sm":"n","ym":"ie"},{"py":"a","sm":"","ym":"a"},{"py":"zei","sm":"z","ym":"ei"},{"py":"sai","sm":"s","ym":"ai"},{"py":"beng","sm":"b","ym":"eng"},{"py":"zeng","sm":"z","ym":"eng"},{"py":"sun","sm":"s","ym":"un"},{"py":"zhai","sm":"zh","ym":"ai"},{"py":"zha","sm":"zh","ym":"a"},{"py":"rui","sm":"r","ym":"ui"},{"py":"pa","sm":"p","ym":"a"},{"py":"nai","sm":"n","ym":"ai"},{"py":"pai","sm":"p","ym":"ai"},{"py":"rao","sm":"r","ym":"ao"},{"py":"ou","sm":"","ym":"ou"},{"py":"nei","sm":"n","ym":"ei"},{"py":"lve","sm":"l","ym":"ve"},{"py":"zan","sm":"z","ym":"an"},{"py":"pei","sm":"p","ym":"ei"},{"py":"kua","sm":"k","ym":"ua"},{"py":"tuan","sm":"t","ym":"uan"},{"py":"kuo","sm":"k","ym":"uo"},{"py":"weng","sm":"w","ym":"eng"},{"py":"ken","sm":"k","ym":"en"},{"py":"chai","sm":"ch","ym":"ai"},{"py":"nuan","sm":"n","ym":"uan"},{"py":"gei","sm":"g","ym":"ei"},{"py":"ruan","sm":"r","ym":"uan"},{"py":"teng","sm":"t","ym":"eng"},{"py":"chuo","sm":"ch","ym":"uo"},{"py":"kuan","sm":"k","ym":"uan"},{"py":"kao","sm":"k","ym":"ao"},{"py":"cuan","sm":"c","ym":"uan"},{"py":"jiong","sm":"j","ym":"iong"},{"py":"ceng","sm":"c","ym":"eng"},{"py":"zuan","sm":"z","ym":"uan"},{"py":"nve","sm":"n","ym":"ve"},{"py":"run","sm":"r","ym":"un"},{"py":"fou","sm":"f","ym":"ou"},{"py":"pen","sm":"p","ym":"en"},{"py":"gun","sm":"g","ym":"un"},{"py":"sou","sm":"s","ym":"ou"},{"py":"shai","sm":"sh","ym":"ai"},{"py":"pou","sm":"p","ym":"ou"},{"py":"zhun","sm":"zh","ym":"un"},{"py":"zang","sm":"z","ym":"ang"},{"py":"keng","sm":"k","ym":"eng"},{"py":"te","sm":"t","ym":"e"},{"py":"diu","sm":"d","ym":"iu"},{"py":"sen","sm":"s","ym":"en"},{"py":"shua","sm":"sh","ym":"ua"},{"py":"miu","sm":"m","ym":"iu"},{"py":"fo","sm":"f","ym":"o"},{"py":"nuo","sm":"n","ym":"uo"},{"py":"qia","sm":"q","ym":"ia"},{"py":"ca","sm":"c","ym":"a"},{"py":"cou","sm":"c","ym":"ou"},{"py":"ha","sm":"h","ym":"a"},{"py":"seng","sm":"s","ym":"eng"},{"py":"zhua","sm":"zh","ym":"ua"},{"py":"nou","sm":"n","ym":"ou"},{"py":"reng","sm":"r","ym":"eng"},{"py":"niang","sm":"n","ym":"iang"},{"py":"zhuai","sm":"zh","ym":"uai"},{"py":"zen","sm":"z","ym":"en"}]')}}]);
//# sourceMappingURL=chunk-053471bc.92d447b3.js.map