(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7394d811"],{"057f":function(t,e,n){var r=n("fc6a"),i=n("241c").f,o={}.toString,a="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],c=function(t){try{return i(t)}catch(e){return a.slice()}};t.exports.f=function(t){return a&&"[object Window]"==o.call(t)?c(t):i(r(t))}},"06c5":function(t,e,n){"use strict";n.d(e,"a",(function(){return i}));n("fb6a"),n("d3b7"),n("b0c0"),n("a630"),n("3ca3");var r=n("6b75");function i(t,e){if(t){if("string"===typeof t)return Object(r["a"])(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Object(r["a"])(t,e):void 0}}},"0cb2":function(t,e,n){var r=n("7b0b"),i=Math.floor,o="".replace,a=/\$([$&'`]|\d{1,2}|<[^>]*>)/g,c=/\$([$&'`]|\d{1,2})/g;t.exports=function(t,e,n,u,s,l){var f=n+t.length,d=u.length,h=c;return void 0!==s&&(s=r(s),h=a),o.call(l,h,(function(r,o){var a;switch(o.charAt(0)){case"$":return"$";case"&":return t;case"`":return e.slice(0,n);case"'":return e.slice(f);case"<":a=s[o.slice(1,-1)];break;default:var c=+o;if(0===c)return r;if(c>d){var l=i(c/10);return 0===l?r:l<=d?void 0===u[l-1]?o.charAt(1):u[l-1]+o.charAt(1):r}a=u[c-1]}return void 0===a?"":a}))}},"14c3":function(t,e,n){var r=n("c6b6"),i=n("9263");t.exports=function(t,e){var n=t.exec;if("function"===typeof n){var o=n.call(t,e);if("object"!==typeof o)throw TypeError("RegExp exec method returned something other than an Object or null");return o}if("RegExp"!==r(t))throw TypeError("RegExp#exec called on incompatible receiver");return i.call(t,e)}},"1dde":function(t,e,n){var r=n("d039"),i=n("b622"),o=n("2d00"),a=i("species");t.exports=function(t){return o>=51||!r((function(){var e=[],n=e.constructor={};return n[a]=function(){return{foo:1}},1!==e[t](Boolean).foo}))}},2909:function(t,e,n){"use strict";n.d(e,"a",(function(){return u}));var r=n("6b75");function i(t){if(Array.isArray(t))return Object(r["a"])(t)}n("a4d3"),n("e01a"),n("d3b7"),n("d28b"),n("3ca3"),n("ddb0"),n("a630");function o(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}var a=n("06c5");function c(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function u(t){return i(t)||o(t)||Object(a["a"])(t)||c()}},"4df4":function(t,e,n){"use strict";var r=n("0366"),i=n("7b0b"),o=n("9bdd"),a=n("e95a"),c=n("50c4"),u=n("8418"),s=n("35a1");t.exports=function(t){var e,n,l,f,d,h,p=i(t),g="function"==typeof this?this:Array,v=arguments.length,y=v>1?arguments[1]:void 0,b=void 0!==y,m=s(p),x=0;if(b&&(y=r(y,v>2?arguments[2]:void 0,2)),void 0==m||g==Array&&a(m))for(e=c(p.length),n=new g(e);e>x;x++)h=b?y(p[x],x):p[x],u(n,x,h);else for(f=m.call(p),d=f.next,n=new g;!(l=d.call(f)).done;x++)h=b?o(f,y,[l.value,x],!0):l.value,u(n,x,h);return n.length=x,n}},5319:function(t,e,n){"use strict";var r=n("d784"),i=n("825a"),o=n("50c4"),a=n("a691"),c=n("1d80"),u=n("8aa5"),s=n("0cb2"),l=n("14c3"),f=Math.max,d=Math.min,h=function(t){return void 0===t?t:String(t)};r("replace",2,(function(t,e,n,r){var p=r.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE,g=r.REPLACE_KEEPS_$0,v=p?"$":"$0";return[function(n,r){var i=c(this),o=void 0==n?void 0:n[t];return void 0!==o?o.call(n,i,r):e.call(String(i),n,r)},function(t,r){if(!p&&g||"string"===typeof r&&-1===r.indexOf(v)){var c=n(e,t,this,r);if(c.done)return c.value}var y=i(t),b=String(this),m="function"===typeof r;m||(r=String(r));var x=y.global;if(x){var S=y.unicode;y.lastIndex=0}var w=[];while(1){var j=l(y,b);if(null===j)break;if(w.push(j),!x)break;var A=String(j[0]);""===A&&(y.lastIndex=u(b,o(y.lastIndex),S))}for(var E="",k=0,O=0;O<w.length;O++){j=w[O];for(var _=String(j[0]),P=f(d(a(j.index),b.length),0),R=[],z=1;z<j.length;z++)R.push(h(j[z]));var M=j.groups;if(m){var I=[_].concat(R,P,b);void 0!==M&&I.push(M);var T=String(r.apply(void 0,I))}else T=s(_,b,P,R,M,r);P>=k&&(E+=b.slice(k,P)+T,k=P+_.length)}return E+b.slice(k)}]}))},"65f0":function(t,e,n){var r=n("861d"),i=n("e8b5"),o=n("b622"),a=o("species");t.exports=function(t,e){var n;return i(t)&&(n=t.constructor,"function"!=typeof n||n!==Array&&!i(n.prototype)?r(n)&&(n=n[a],null===n&&(n=void 0)):n=void 0),new(void 0===n?Array:n)(0===e?0:e)}},"6b75":function(t,e,n){"use strict";function r(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}n.d(e,"a",(function(){return r}))},"746f":function(t,e,n){var r=n("428f"),i=n("5135"),o=n("e538"),a=n("9bf2").f;t.exports=function(t){var e=r.Symbol||(r.Symbol={});i(e,t)||a(e,t,{value:o.f(t)})}},8418:function(t,e,n){"use strict";var r=n("c04e"),i=n("9bf2"),o=n("5c6c");t.exports=function(t,e,n){var a=r(e);a in t?i.f(t,a,o(0,n)):t[a]=n}},"8aa5":function(t,e,n){"use strict";var r=n("6547").charAt;t.exports=function(t,e,n){return e+(n?r(t,e).length:1)}},9263:function(t,e,n){"use strict";var r=n("ad6d"),i=n("9f7f"),o=n("5692"),a=RegExp.prototype.exec,c=o("native-string-replace",String.prototype.replace),u=a,s=function(){var t=/a/,e=/b*/g;return a.call(t,"a"),a.call(e,"a"),0!==t.lastIndex||0!==e.lastIndex}(),l=i.UNSUPPORTED_Y||i.BROKEN_CARET,f=void 0!==/()??/.exec("")[1],d=s||f||l;d&&(u=function(t){var e,n,i,o,u=this,d=l&&u.sticky,h=r.call(u),p=u.source,g=0,v=t;return d&&(h=h.replace("y",""),-1===h.indexOf("g")&&(h+="g"),v=String(t).slice(u.lastIndex),u.lastIndex>0&&(!u.multiline||u.multiline&&"\n"!==t[u.lastIndex-1])&&(p="(?: "+p+")",v=" "+v,g++),n=new RegExp("^(?:"+p+")",h)),f&&(n=new RegExp("^"+p+"$(?!\\s)",h)),s&&(e=u.lastIndex),i=a.call(d?n:u,v),d?i?(i.input=i.input.slice(g),i[0]=i[0].slice(g),i.index=u.lastIndex,u.lastIndex+=i[0].length):u.lastIndex=0:s&&i&&(u.lastIndex=u.global?i.index+i[0].length:e),f&&i&&i.length>1&&c.call(i[0],n,(function(){for(o=1;o<arguments.length-2;o++)void 0===arguments[o]&&(i[o]=void 0)})),i}),t.exports=u},"9bdd":function(t,e,n){var r=n("825a"),i=n("2a62");t.exports=function(t,e,n,o){try{return o?e(r(n)[0],n[1]):e(n)}catch(a){throw i(t),a}}},"9f7f":function(t,e,n){"use strict";var r=n("d039");function i(t,e){return RegExp(t,e)}e.UNSUPPORTED_Y=r((function(){var t=i("a","y");return t.lastIndex=2,null!=t.exec("abcd")})),e.BROKEN_CARET=r((function(){var t=i("^r","gy");return t.lastIndex=2,null!=t.exec("str")}))},a434:function(t,e,n){"use strict";var r=n("23e7"),i=n("23cb"),o=n("a691"),a=n("50c4"),c=n("7b0b"),u=n("65f0"),s=n("8418"),l=n("1dde"),f=l("splice"),d=Math.max,h=Math.min,p=9007199254740991,g="Maximum allowed length exceeded";r({target:"Array",proto:!0,forced:!f},{splice:function(t,e){var n,r,l,f,v,y,b=c(this),m=a(b.length),x=i(t,m),S=arguments.length;if(0===S?n=r=0:1===S?(n=0,r=m-x):(n=S-2,r=h(d(o(e),0),m-x)),m+n-r>p)throw TypeError(g);for(l=u(b,r),f=0;f<r;f++)v=x+f,v in b&&s(l,f,b[v]);if(l.length=r,n<r){for(f=x;f<m-r;f++)v=f+r,y=f+n,v in b?b[y]=b[v]:delete b[y];for(f=m;f>m-r+n;f--)delete b[f-1]}else if(n>r)for(f=m-r;f>x;f--)v=f+r-1,y=f+n-1,v in b?b[y]=b[v]:delete b[y];for(f=0;f<n;f++)b[f+x]=arguments[f+2];return b.length=m-r+n,l}})},a4d3:function(t,e,n){"use strict";var r=n("23e7"),i=n("da84"),o=n("d066"),a=n("c430"),c=n("83ab"),u=n("4930"),s=n("fdbf"),l=n("d039"),f=n("5135"),d=n("e8b5"),h=n("861d"),p=n("825a"),g=n("7b0b"),v=n("fc6a"),y=n("c04e"),b=n("5c6c"),m=n("7c73"),x=n("df75"),S=n("241c"),w=n("057f"),j=n("7418"),A=n("06cf"),E=n("9bf2"),k=n("d1e7"),O=n("9112"),_=n("6eeb"),P=n("5692"),R=n("f772"),z=n("d012"),M=n("90e3"),I=n("b622"),T=n("e538"),$=n("746f"),N=n("d44e"),U=n("69f3"),C=n("b727").forEach,D=R("hidden"),J="Symbol",X="prototype",B=I("toPrimitive"),F=U.set,K=U.getterFor(J),L=Object[X],W=i.Symbol,G=o("JSON","stringify"),Y=A.f,Q=E.f,q=w.f,H=k.f,V=P("symbols"),Z=P("op-symbols"),tt=P("string-to-symbol-registry"),et=P("symbol-to-string-registry"),nt=P("wks"),rt=i.QObject,it=!rt||!rt[X]||!rt[X].findChild,ot=c&&l((function(){return 7!=m(Q({},"a",{get:function(){return Q(this,"a",{value:7}).a}})).a}))?function(t,e,n){var r=Y(L,e);r&&delete L[e],Q(t,e,n),r&&t!==L&&Q(L,e,r)}:Q,at=function(t,e){var n=V[t]=m(W[X]);return F(n,{type:J,tag:t,description:e}),c||(n.description=e),n},ct=s?function(t){return"symbol"==typeof t}:function(t){return Object(t)instanceof W},ut=function(t,e,n){t===L&&ut(Z,e,n),p(t);var r=y(e,!0);return p(n),f(V,r)?(n.enumerable?(f(t,D)&&t[D][r]&&(t[D][r]=!1),n=m(n,{enumerable:b(0,!1)})):(f(t,D)||Q(t,D,b(1,{})),t[D][r]=!0),ot(t,r,n)):Q(t,r,n)},st=function(t,e){p(t);var n=v(e),r=x(n).concat(pt(n));return C(r,(function(e){c&&!ft.call(n,e)||ut(t,e,n[e])})),t},lt=function(t,e){return void 0===e?m(t):st(m(t),e)},ft=function(t){var e=y(t,!0),n=H.call(this,e);return!(this===L&&f(V,e)&&!f(Z,e))&&(!(n||!f(this,e)||!f(V,e)||f(this,D)&&this[D][e])||n)},dt=function(t,e){var n=v(t),r=y(e,!0);if(n!==L||!f(V,r)||f(Z,r)){var i=Y(n,r);return!i||!f(V,r)||f(n,D)&&n[D][r]||(i.enumerable=!0),i}},ht=function(t){var e=q(v(t)),n=[];return C(e,(function(t){f(V,t)||f(z,t)||n.push(t)})),n},pt=function(t){var e=t===L,n=q(e?Z:v(t)),r=[];return C(n,(function(t){!f(V,t)||e&&!f(L,t)||r.push(V[t])})),r};if(u||(W=function(){if(this instanceof W)throw TypeError("Symbol is not a constructor");var t=arguments.length&&void 0!==arguments[0]?String(arguments[0]):void 0,e=M(t),n=function(t){this===L&&n.call(Z,t),f(this,D)&&f(this[D],e)&&(this[D][e]=!1),ot(this,e,b(1,t))};return c&&it&&ot(L,e,{configurable:!0,set:n}),at(e,t)},_(W[X],"toString",(function(){return K(this).tag})),_(W,"withoutSetter",(function(t){return at(M(t),t)})),k.f=ft,E.f=ut,A.f=dt,S.f=w.f=ht,j.f=pt,T.f=function(t){return at(I(t),t)},c&&(Q(W[X],"description",{configurable:!0,get:function(){return K(this).description}}),a||_(L,"propertyIsEnumerable",ft,{unsafe:!0}))),r({global:!0,wrap:!0,forced:!u,sham:!u},{Symbol:W}),C(x(nt),(function(t){$(t)})),r({target:J,stat:!0,forced:!u},{for:function(t){var e=String(t);if(f(tt,e))return tt[e];var n=W(e);return tt[e]=n,et[n]=e,n},keyFor:function(t){if(!ct(t))throw TypeError(t+" is not a symbol");if(f(et,t))return et[t]},useSetter:function(){it=!0},useSimple:function(){it=!1}}),r({target:"Object",stat:!0,forced:!u,sham:!c},{create:lt,defineProperty:ut,defineProperties:st,getOwnPropertyDescriptor:dt}),r({target:"Object",stat:!0,forced:!u},{getOwnPropertyNames:ht,getOwnPropertySymbols:pt}),r({target:"Object",stat:!0,forced:l((function(){j.f(1)}))},{getOwnPropertySymbols:function(t){return j.f(g(t))}}),G){var gt=!u||l((function(){var t=W();return"[null]"!=G([t])||"{}"!=G({a:t})||"{}"!=G(Object(t))}));r({target:"JSON",stat:!0,forced:gt},{stringify:function(t,e,n){var r,i=[t],o=1;while(arguments.length>o)i.push(arguments[o++]);if(r=e,(h(e)||void 0!==t)&&!ct(t))return d(e)||(e=function(t,e){if("function"==typeof r&&(e=r.call(this,t,e)),!ct(e))return e}),i[1]=e,G.apply(null,i)}})}W[X][B]||O(W[X],B,W[X].valueOf),N(W,J),z[D]=!0},a630:function(t,e,n){var r=n("23e7"),i=n("4df4"),o=n("1c7e"),a=!o((function(t){Array.from(t)}));r({target:"Array",stat:!0,forced:a},{from:i})},ac1f:function(t,e,n){"use strict";var r=n("23e7"),i=n("9263");r({target:"RegExp",proto:!0,forced:/./.exec!==i},{exec:i})},ad6d:function(t,e,n){"use strict";var r=n("825a");t.exports=function(){var t=r(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.dotAll&&(e+="s"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}},b0c0:function(t,e,n){var r=n("83ab"),i=n("9bf2").f,o=Function.prototype,a=o.toString,c=/^\s*function ([^ (]*)/,u="name";r&&!(u in o)&&i(o,u,{configurable:!0,get:function(){try{return a.call(this).match(c)[1]}catch(t){return""}}})},b727:function(t,e,n){var r=n("0366"),i=n("44ad"),o=n("7b0b"),a=n("50c4"),c=n("65f0"),u=[].push,s=function(t){var e=1==t,n=2==t,s=3==t,l=4==t,f=6==t,d=7==t,h=5==t||f;return function(p,g,v,y){for(var b,m,x=o(p),S=i(x),w=r(g,v,3),j=a(S.length),A=0,E=y||c,k=e?E(p,j):n||d?E(p,0):void 0;j>A;A++)if((h||A in S)&&(b=S[A],m=w(b,A,x),t))if(e)k[A]=m;else if(m)switch(t){case 3:return!0;case 5:return b;case 6:return A;case 2:u.call(k,b)}else switch(t){case 4:return!1;case 7:u.call(k,b)}return f?-1:s||l?l:k}};t.exports={forEach:s(0),map:s(1),filter:s(2),some:s(3),every:s(4),find:s(5),findIndex:s(6),filterOut:s(7)}},bee2:function(t,e,n){"use strict";function r(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function i(t,e,n){return e&&r(t.prototype,e),n&&r(t,n),t}n.d(e,"a",(function(){return i}))},d28b:function(t,e,n){var r=n("746f");r("iterator")},d4ec:function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}n.d(e,"a",(function(){return r}))},d784:function(t,e,n){"use strict";n("ac1f");var r=n("6eeb"),i=n("d039"),o=n("b622"),a=n("9263"),c=n("9112"),u=o("species"),s=!i((function(){var t=/./;return t.exec=function(){var t=[];return t.groups={a:"7"},t},"7"!=="".replace(t,"$<a>")})),l=function(){return"$0"==="a".replace(/./,"$0")}(),f=o("replace"),d=function(){return!!/./[f]&&""===/./[f]("a","$0")}(),h=!i((function(){var t=/(?:)/,e=t.exec;t.exec=function(){return e.apply(this,arguments)};var n="ab".split(t);return 2!==n.length||"a"!==n[0]||"b"!==n[1]}));t.exports=function(t,e,n,f){var p=o(t),g=!i((function(){var e={};return e[p]=function(){return 7},7!=""[t](e)})),v=g&&!i((function(){var e=!1,n=/a/;return"split"===t&&(n={},n.constructor={},n.constructor[u]=function(){return n},n.flags="",n[p]=/./[p]),n.exec=function(){return e=!0,null},n[p](""),!e}));if(!g||!v||"replace"===t&&(!s||!l||d)||"split"===t&&!h){var y=/./[p],b=n(p,""[t],(function(t,e,n,r,i){return e.exec===a?g&&!i?{done:!0,value:y.call(e,n,r)}:{done:!0,value:t.call(n,e,r)}:{done:!1}}),{REPLACE_KEEPS_$0:l,REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE:d}),m=b[0],x=b[1];r(String.prototype,t,m),r(RegExp.prototype,p,2==e?function(t,e){return x.call(t,this,e)}:function(t){return x.call(t,this)})}f&&c(RegExp.prototype[p],"sham",!0)}},e01a:function(t,e,n){"use strict";var r=n("23e7"),i=n("83ab"),o=n("da84"),a=n("5135"),c=n("861d"),u=n("9bf2").f,s=n("e893"),l=o.Symbol;if(i&&"function"==typeof l&&(!("description"in l.prototype)||void 0!==l().description)){var f={},d=function(){var t=arguments.length<1||void 0===arguments[0]?void 0:String(arguments[0]),e=this instanceof d?new l(t):void 0===t?l():l(t);return""===t&&(f[e]=!0),e};s(d,l);var h=d.prototype=l.prototype;h.constructor=d;var p=h.toString,g="Symbol(test)"==String(l("test")),v=/^Symbol\((.*)\)[^)]+$/;u(h,"description",{configurable:!0,get:function(){var t=c(this)?this.valueOf():this,e=p.call(t);if(a(f,t))return"";var n=g?e.slice(7,-1):e.replace(v,"$1");return""===n?void 0:n}}),r({global:!0,forced:!0},{Symbol:d})}},e3c3:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("el-button",{attrs:{type:"primary",size:"default"},on:{click:t.update}},[t._v("update")]),t._v(" "+t._s(t.year)+" "),n("el-input",{model:{value:t.uy,callback:function(e){t.uy=e},expression:"uy"}}),n("el-button",{attrs:{type:"primary",size:"default"},on:{click:t.updateM}},[t._v("updateM")]),n("el-button",{attrs:{type:"primary",size:"default"},on:{click:t.add}},[t._v("add")]),n("el-button",{attrs:{type:"primary",size:"default"},on:{click:function(e){return t.updateAuto()}}},[t._v("updateAuto")]),n("el-table",{attrs:{data:t.peoples,border:"",stripe:"","row-style":t.rowStyle}},t._l(t.columns,(function(e){return n("el-table-column",{key:e.key,attrs:{prop:e.key,label:e.key,sortable:!!e.sortable,"sort-method":e.sortMethod},scopedSlots:t._u(["numSplit"===e.type?{key:"default",fn:function(r){var i=r.row;return[n("span",[t._v(t._s(t._f("numSplit")(i[e.key])))])]}}:null],null,!0)})})),1),n("el-table",{attrs:{data:t.deathPeoplesTop10,border:"",stripe:"","row-style":t.rowStyle}},t._l(t.columns,(function(e){return n("el-table-column",{key:e.key,attrs:{prop:e.key,label:e.key,sortable:!!e.sortable,"sort-method":e.sortMethod},scopedSlots:t._u(["numSplit"===e.type?{key:"default",fn:function(r){var i=r.row;return[n("span",[t._v(t._s(t._f("numSplit")(i[e.key])))])]}}:null],null,!0)})})),1)],1)},i=[],o=n("2909"),a=(n("5319"),n("ac1f"),n("fb6a"),n("a434"),n("d4ec")),c=n("bee2"),u=(n("b0c0"),function(){function t(e){Object(a["a"])(this,t),this.createPeople(e)}return Object(c["a"])(t,[{key:"createPeople",value:function(e){this.name="p_".concat(t.ID++),this.zizhi=this.getRandom(100,0),this.maxAge=this.getRandom(Math.random()<.1?Math.random()<.1?1e7:1e5:50,30),this.age=0,this.xiulianSpeed=this.getRandom(this.zizhi*this.zizhi,0),this.wuxing=this.getRandom(this.zizhi,20),this.rengxing=this.getRandom(this.zizhi,0),this.jingjie=0,this.death=!1,this.xp=0,this.needXp=100,this.by=e,this.dy=""}},{key:"getRandom",value:function(t,e){return Math.floor(Math.random()*t)+e}},{key:"getJingjieNeedXp",value:function(t){return 0===t?100:100*Math.floor(Math.pow(t,2.3))}},{key:"getJingjieAddAge",value:function(t){return 0===t?10:10*t}},{key:"xiulian",value:function(){this.xp+=this.xiulianSpeed;while(this.xp>=this.needXp){var t=this.jingjie+1;if(120*Math.random()<this.wuxing-11.87*Math.pow(t,.5))this.jingjie++,this.needXp+=this.getJingjieNeedXp(t),this.maxAge+=this.getJingjieAddAge(t);else{this.xp-=this.getRandom(this.getJingjieNeedXp(this.jingjie)*(100-this.zizhi)/100,0);var e=0;this.maxAge-e<this.age?this.maxAge=this.age:this.maxAge-=e}}}},{key:"update",value:function(t){this.death||(this.age++,this.xiulian(),this.age>=this.maxAge&&(this.dy=t,this.dx=!0,this.death=!0))}}]),t}());u.ID=1;var s=u,l=30,f=15,d=.01,h=5,p={data:function(){return{peoples:[],deathPeoples:[],uy:"",year:1,columns:[{key:"name"},{key:"jingjie",sortable:!0,sortMethod:function(t,e){for(var n=["jingjie","age","zizhi","maxAge"],r=[1,-1,1,1],i=0;i<n.length;i++)if(t[n[i]]!==e[n[i]]||i===n.length-1)return(t[n[i]]-e[n[i]])*r[i]}},{key:"age",type:"numSplit",sortable:!0,sortMethod:function(t,e){for(var n=["age","jingjie","zizhi","maxAge"],r=[1,1,1,1],i=0;i<n.length;i++)if(t[n[i]]!==e[n[i]]||i===n.length-1)return(t[n[i]]-e[n[i]])*r[i]}},{key:"maxAge",type:"numSplit",sortable:!0,sortMethod:function(t,e){for(var n=["maxAge","age","jingjie","zizhi"],r=[1,-1,1,1],i=0;i<n.length;i++)if(t[n[i]]!==e[n[i]]||i===n.length-1)return(t[n[i]]-e[n[i]])*r[i]}},{key:"zizhi",sortable:!0,sortMethod:function(t,e){for(var n=["zizhi","jingjie","age","maxAge"],r=[1,1,-1,1],i=0;i<n.length;i++)if(t[n[i]]!==e[n[i]]||i===n.length-1)return(t[n[i]]-e[n[i]])*r[i]}},{key:"by"},{key:"dy"}]}},filters:{numSplit:function(t){return"".concat(t).replace(/(\d{1,3})(?=(\d{3})+$)/g,"$1,")}},computed:{deathPeoplesTop10:function(){var t=Object(o["a"])(this.deathPeoples);return t.sort((function(t,e){for(var n=["jingjie","age","zizhi","maxAge"],r=[-1,1,-1,-1],i=0;i<n.length;i++)if(t[n[i]]!==e[n[i]]||i===n.length-1)return(t[n[i]]-e[n[i]])*r[i]})).slice(0,10)}},methods:{rowStyle:function(t){var e=t.row,n=["#f44336","#f3de22","#cc30e7","#03a9f4","#4caf50"];if(e.jingjie>=100)return{color:"#f00",fontWeight:"bold",fontSize:"26px"};if(e.jingjie>=90)return{color:"#f44336",fontWeight:"bold",fontSize:"".concat(15+e.jingjie-90,"px")};for(var r=0;r<n.length;r++)if(e.jingjie>=80-10*r)return{color:n[r]};return{color:"#000"}},update:function(){this.year++;for(var t=0;t<this.peoples.length;)this.peoples[t].update(this.year),this.peoples[t].death?(this.deathPeoples.push(this.peoples[t]),this.peoples.splice(t,1)):t++;this.peoples.length<h&&this.add(),this.peoples.length<f&&Math.random()<d&&this.peoples.push(new s(this.year))},updateAuto:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:60;this.uy=5e3,this.updateM(),e>0&&setTimeout((function(){t.updateAuto(e-1)}),16)},updateM:function(){if(this.uy-- >0){this.update();try{this.updateM()}catch(t){setTimeout(this.updateM)}}},add:function(){for(var t=0,e=l-this.peoples.length;t<e;t++)this.peoples.push(new s(this.year))}},created:function(){for(var t=0;t<l;t++)this.peoples.push(new s(this.year))}},g=p,v=n("2877"),y=Object(v["a"])(g,r,i,!1,null,null,null);e["default"]=y.exports},e538:function(t,e,n){var r=n("b622");e.f=r},e8b5:function(t,e,n){var r=n("c6b6");t.exports=Array.isArray||function(t){return"Array"==r(t)}},fb6a:function(t,e,n){"use strict";var r=n("23e7"),i=n("861d"),o=n("e8b5"),a=n("23cb"),c=n("50c4"),u=n("fc6a"),s=n("8418"),l=n("b622"),f=n("1dde"),d=f("slice"),h=l("species"),p=[].slice,g=Math.max;r({target:"Array",proto:!0,forced:!d},{slice:function(t,e){var n,r,l,f=u(this),d=c(f.length),v=a(t,d),y=a(void 0===e?d:e,d);if(o(f)&&(n=f.constructor,"function"!=typeof n||n!==Array&&!o(n.prototype)?i(n)&&(n=n[h],null===n&&(n=void 0)):n=void 0,n===Array||void 0===n))return p.call(f,v,y);for(r=new(void 0===n?Array:n)(g(y-v,0)),l=0;v<y;v++,l++)v in f&&s(r,l,f[v]);return r.length=l,r}})}}]);
//# sourceMappingURL=chunk-7394d811.18c8a0b2.js.map