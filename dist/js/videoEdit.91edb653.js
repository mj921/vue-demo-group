(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["videoEdit"],{"057f":function(t,e,n){var r=n("fc6a"),i=n("241c").f,o={}.toString,c="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],a=function(t){try{return i(t)}catch(e){return c.slice()}};t.exports.f=function(t){return c&&"[object Window]"==o.call(t)?a(t):i(r(t))}},"06c5":function(t,e,n){"use strict";n.d(e,"a",(function(){return i}));n("fb6a"),n("d3b7"),n("b0c0"),n("a630"),n("3ca3");var r=n("6b75");function i(t,e){if(t){if("string"===typeof t)return Object(r["a"])(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Object(r["a"])(t,e):void 0}}},"1dde":function(t,e,n){var r=n("d039"),i=n("b622"),o=n("2d00"),c=i("species");t.exports=function(t){return o>=51||!r((function(){var e=[],n=e.constructor={};return n[c]=function(){return{foo:1}},1!==e[t](Boolean).foo}))}},2909:function(t,e,n){"use strict";n.d(e,"a",(function(){return f}));var r=n("6b75");function i(t){if(Array.isArray(t))return Object(r["a"])(t)}n("a4d3"),n("e01a"),n("d3b7"),n("d28b"),n("3ca3"),n("ddb0"),n("a630");function o(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}var c=n("06c5");function a(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function f(t){return i(t)||o(t)||Object(c["a"])(t)||a()}},"30c6":function(t,e,n){},"4df4":function(t,e,n){"use strict";var r=n("0366"),i=n("7b0b"),o=n("9bdd"),c=n("e95a"),a=n("50c4"),f=n("8418"),s=n("35a1");t.exports=function(t){var e,n,u,d,l,v,h=i(t),b="function"==typeof this?this:Array,p=arguments.length,y=p>1?arguments[1]:void 0,m=void 0!==y,g=s(h),w=0;if(m&&(y=r(y,p>2?arguments[2]:void 0,2)),void 0==g||b==Array&&c(g))for(e=a(h.length),n=new b(e);e>w;w++)v=m?y(h[w],w):h[w],f(n,w,v);else for(d=g.call(h),l=d.next,n=new b;!(u=l.call(d)).done;w++)v=m?o(d,y,[u.value,w],!0):u.value,f(n,w,v);return n.length=w,n}},"65f0":function(t,e,n){var r=n("861d"),i=n("e8b5"),o=n("b622"),c=o("species");t.exports=function(t,e){var n;return i(t)&&(n=t.constructor,"function"!=typeof n||n!==Array&&!i(n.prototype)?r(n)&&(n=n[c],null===n&&(n=void 0)):n=void 0),new(void 0===n?Array:n)(0===e?0:e)}},"68fa":function(t,e,n){"use strict";n("30c6")},"6b75":function(t,e,n){"use strict";function r(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}n.d(e,"a",(function(){return r}))},"746f":function(t,e,n){var r=n("428f"),i=n("5135"),o=n("e538"),c=n("9bf2").f;t.exports=function(t){var e=r.Symbol||(r.Symbol={});i(e,t)||c(e,t,{value:o.f(t)})}},8418:function(t,e,n){"use strict";var r=n("c04e"),i=n("9bf2"),o=n("5c6c");t.exports=function(t,e,n){var c=r(e);c in t?i.f(t,c,o(0,n)):t[c]=n}},"9bdd":function(t,e,n){var r=n("825a"),i=n("2a62");t.exports=function(t,e,n,o){try{return o?e(r(n)[0],n[1]):e(n)}catch(c){throw i(t),c}}},a4d3:function(t,e,n){"use strict";var r=n("23e7"),i=n("da84"),o=n("d066"),c=n("c430"),a=n("83ab"),f=n("4930"),s=n("fdbf"),u=n("d039"),d=n("5135"),l=n("e8b5"),v=n("861d"),h=n("825a"),b=n("7b0b"),p=n("fc6a"),y=n("c04e"),m=n("5c6c"),g=n("7c73"),w=n("df75"),S=n("241c"),O=n("057f"),j=n("7418"),x=n("06cf"),A=n("9bf2"),E=n("d1e7"),P=n("9112"),$=n("6eeb"),I=n("5692"),L=n("f772"),T=n("d012"),N=n("90e3"),k=n("b622"),C=n("e538"),D=n("746f"),J=n("d44e"),F=n("69f3"),M=n("b727").forEach,W=L("hidden"),_="Symbol",B="prototype",H=k("toPrimitive"),Q=F.set,R=F.getterFor(_),U=Object[B],V=i.Symbol,q=o("JSON","stringify"),z=x.f,G=A.f,K=O.f,X=E.f,Y=I("symbols"),Z=I("op-symbols"),tt=I("string-to-symbol-registry"),et=I("symbol-to-string-registry"),nt=I("wks"),rt=i.QObject,it=!rt||!rt[B]||!rt[B].findChild,ot=a&&u((function(){return 7!=g(G({},"a",{get:function(){return G(this,"a",{value:7}).a}})).a}))?function(t,e,n){var r=z(U,e);r&&delete U[e],G(t,e,n),r&&t!==U&&G(U,e,r)}:G,ct=function(t,e){var n=Y[t]=g(V[B]);return Q(n,{type:_,tag:t,description:e}),a||(n.description=e),n},at=s?function(t){return"symbol"==typeof t}:function(t){return Object(t)instanceof V},ft=function(t,e,n){t===U&&ft(Z,e,n),h(t);var r=y(e,!0);return h(n),d(Y,r)?(n.enumerable?(d(t,W)&&t[W][r]&&(t[W][r]=!1),n=g(n,{enumerable:m(0,!1)})):(d(t,W)||G(t,W,m(1,{})),t[W][r]=!0),ot(t,r,n)):G(t,r,n)},st=function(t,e){h(t);var n=p(e),r=w(n).concat(ht(n));return M(r,(function(e){a&&!dt.call(n,e)||ft(t,e,n[e])})),t},ut=function(t,e){return void 0===e?g(t):st(g(t),e)},dt=function(t){var e=y(t,!0),n=X.call(this,e);return!(this===U&&d(Y,e)&&!d(Z,e))&&(!(n||!d(this,e)||!d(Y,e)||d(this,W)&&this[W][e])||n)},lt=function(t,e){var n=p(t),r=y(e,!0);if(n!==U||!d(Y,r)||d(Z,r)){var i=z(n,r);return!i||!d(Y,r)||d(n,W)&&n[W][r]||(i.enumerable=!0),i}},vt=function(t){var e=K(p(t)),n=[];return M(e,(function(t){d(Y,t)||d(T,t)||n.push(t)})),n},ht=function(t){var e=t===U,n=K(e?Z:p(t)),r=[];return M(n,(function(t){!d(Y,t)||e&&!d(U,t)||r.push(Y[t])})),r};if(f||(V=function(){if(this instanceof V)throw TypeError("Symbol is not a constructor");var t=arguments.length&&void 0!==arguments[0]?String(arguments[0]):void 0,e=N(t),n=function(t){this===U&&n.call(Z,t),d(this,W)&&d(this[W],e)&&(this[W][e]=!1),ot(this,e,m(1,t))};return a&&it&&ot(U,e,{configurable:!0,set:n}),ct(e,t)},$(V[B],"toString",(function(){return R(this).tag})),$(V,"withoutSetter",(function(t){return ct(N(t),t)})),E.f=dt,A.f=ft,x.f=lt,S.f=O.f=vt,j.f=ht,C.f=function(t){return ct(k(t),t)},a&&(G(V[B],"description",{configurable:!0,get:function(){return R(this).description}}),c||$(U,"propertyIsEnumerable",dt,{unsafe:!0}))),r({global:!0,wrap:!0,forced:!f,sham:!f},{Symbol:V}),M(w(nt),(function(t){D(t)})),r({target:_,stat:!0,forced:!f},{for:function(t){var e=String(t);if(d(tt,e))return tt[e];var n=V(e);return tt[e]=n,et[n]=e,n},keyFor:function(t){if(!at(t))throw TypeError(t+" is not a symbol");if(d(et,t))return et[t]},useSetter:function(){it=!0},useSimple:function(){it=!1}}),r({target:"Object",stat:!0,forced:!f,sham:!a},{create:ut,defineProperty:ft,defineProperties:st,getOwnPropertyDescriptor:lt}),r({target:"Object",stat:!0,forced:!f},{getOwnPropertyNames:vt,getOwnPropertySymbols:ht}),r({target:"Object",stat:!0,forced:u((function(){j.f(1)}))},{getOwnPropertySymbols:function(t){return j.f(b(t))}}),q){var bt=!f||u((function(){var t=V();return"[null]"!=q([t])||"{}"!=q({a:t})||"{}"!=q(Object(t))}));r({target:"JSON",stat:!0,forced:bt},{stringify:function(t,e,n){var r,i=[t],o=1;while(arguments.length>o)i.push(arguments[o++]);if(r=e,(v(e)||void 0!==t)&&!at(t))return l(e)||(e=function(t,e){if("function"==typeof r&&(e=r.call(this,t,e)),!at(e))return e}),i[1]=e,q.apply(null,i)}})}V[B][H]||P(V[B],H,V[B].valueOf),J(V,_),T[W]=!0},a630:function(t,e,n){var r=n("23e7"),i=n("4df4"),o=n("1c7e"),c=!o((function(t){Array.from(t)}));r({target:"Array",stat:!0,forced:c},{from:i})},b0c0:function(t,e,n){var r=n("83ab"),i=n("9bf2").f,o=Function.prototype,c=o.toString,a=/^\s*function ([^ (]*)/,f="name";r&&!(f in o)&&i(o,f,{configurable:!0,get:function(){try{return c.call(this).match(a)[1]}catch(t){return""}}})},b727:function(t,e,n){var r=n("0366"),i=n("44ad"),o=n("7b0b"),c=n("50c4"),a=n("65f0"),f=[].push,s=function(t){var e=1==t,n=2==t,s=3==t,u=4==t,d=6==t,l=7==t,v=5==t||d;return function(h,b,p,y){for(var m,g,w=o(h),S=i(w),O=r(b,p,3),j=c(S.length),x=0,A=y||a,E=e?A(h,j):n||l?A(h,0):void 0;j>x;x++)if((v||x in S)&&(m=S[x],g=O(m,x,w),t))if(e)E[x]=g;else if(g)switch(t){case 3:return!0;case 5:return m;case 6:return x;case 2:f.call(E,m)}else switch(t){case 4:return!1;case 7:f.call(E,m)}return d?-1:s||u?u:E}};t.exports={forEach:s(0),map:s(1),filter:s(2),some:s(3),every:s(4),find:s(5),findIndex:s(6),filterOut:s(7)}},d28b:function(t,e,n){var r=n("746f");r("iterator")},e01a:function(t,e,n){"use strict";var r=n("23e7"),i=n("83ab"),o=n("da84"),c=n("5135"),a=n("861d"),f=n("9bf2").f,s=n("e893"),u=o.Symbol;if(i&&"function"==typeof u&&(!("description"in u.prototype)||void 0!==u().description)){var d={},l=function(){var t=arguments.length<1||void 0===arguments[0]?void 0:String(arguments[0]),e=this instanceof l?new u(t):void 0===t?u():u(t);return""===t&&(d[e]=!0),e};s(l,u);var v=l.prototype=u.prototype;v.constructor=l;var h=v.toString,b="Symbol(test)"==String(u("test")),p=/^Symbol\((.*)\)[^)]+$/;f(v,"description",{configurable:!0,get:function(){var t=a(this)?this.valueOf():this,e=h.call(t);if(c(d,t))return"";var n=b?e.slice(7,-1):e.replace(p,"$1");return""===n?void 0:n}}),r({global:!0,forced:!0},{Symbol:l})}},e538:function(t,e,n){var r=n("b622");e.f=r},e8b5:function(t,e,n){var r=n("c6b6");t.exports=Array.isArray||function(t){return"Array"==r(t)}},f69d:function(t,e,n){t.exports=n.p+"media/movie.3cf571d4.mp4"},fa9d:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"video-edit"},[n("canvas",{ref:"canvas",attrs:{width:"300",height:"200"}}),n("video",{ref:"video",attrs:{src:t.video,controls:""},domProps:{muted:t.muted},on:{loadedmetadata:t.loadedmetadata,play:t.onPlay,ended:t.videoEnded}})])},i=[],o=n("2909"),c={name:"VideoEdit",data:function(){return{video:n("f69d"),muted:!0,canvas:null,ctx:null,sto:null,time:0,list:[{timeStart:1,timeEnd:3},{timeStart:7,timeEnd:11}],tempList:[]}},mounted:function(){this.canvas=this.$refs.canvas,this.ctx=this.canvas.getContext("2d")},methods:{draw:function(){var t=this,e=new Date;this.ctx.drawImage(this.$refs.video,0,0),this.tempList.length&&1e3*this.tempList[0].timeStart<=this.time&&(1e3*this.tempList[0].timeEnd>=this.time?(this.ctx.fillStyle="#ff0000",this.ctx.fillRect(50,50,100,100)):this.tempList.shift()),this.time+=1e3/60,this.sto=setTimeout((function(){t.draw()}),Math.max(0,1e3/60-(new Date-e)))},loadedmetadata:function(t){console.log(t),console.dir(this.$refs.video),console.log(this.$refs.video.clientWidth),this.canvas.width=this.$refs.video.clientWidth,this.canvas.height=this.$refs.video.clientHeight,this.$refs.video.play()},onPlay:function(){this.time=0,this.tempList=Object(o["a"])(this.list),this.draw()},videoEnded:function(){clearTimeout(this.sto)}},beforeDestroy:function(){clearTimeout(this.sto)}},a=c,f=(n("68fa"),n("2877")),s=Object(f["a"])(a,r,i,!1,null,"54a8c262",null);e["default"]=s.exports},fb6a:function(t,e,n){"use strict";var r=n("23e7"),i=n("861d"),o=n("e8b5"),c=n("23cb"),a=n("50c4"),f=n("fc6a"),s=n("8418"),u=n("b622"),d=n("1dde"),l=d("slice"),v=u("species"),h=[].slice,b=Math.max;r({target:"Array",proto:!0,forced:!l},{slice:function(t,e){var n,r,u,d=f(this),l=a(d.length),p=c(t,l),y=c(void 0===e?l:e,l);if(o(d)&&(n=d.constructor,"function"!=typeof n||n!==Array&&!o(n.prototype)?i(n)&&(n=n[v],null===n&&(n=void 0)):n=void 0,n===Array||void 0===n))return h.call(d,p,y);for(r=new(void 0===n?Array:n)(b(y-p,0)),u=0;p<y;p++,u++)p in d&&s(r,u,d[p]);return r.length=u,r}})}}]);
//# sourceMappingURL=videoEdit.91edb653.js.map