(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["jiyinxuanz"],{"159b":function(t,e,i){var r=i("da84"),a=i("fdbc"),n=i("17c2"),h=i("9112");for(var s in a){var u=r[s],o=u&&u.prototype;if(o&&o.forEach!==n)try{h(o,"forEach",n)}catch(c){o.forEach=n}}},"17c2":function(t,e,i){"use strict";var r=i("b727").forEach,a=i("a640"),n=a("forEach");t.exports=n?[].forEach:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}},"1dde":function(t,e,i){var r=i("d039"),a=i("b622"),n=i("2d00"),h=a("species");t.exports=function(t){return n>=51||!r((function(){var e=[],i=e.constructor={};return i[h]=function(){return{foo:1}},1!==e[t](Boolean).foo}))}},"4c7b":function(t,e,i){"use strict";i("90ba")},"4de4":function(t,e,i){"use strict";var r=i("23e7"),a=i("b727").filter,n=i("1dde"),h=n("filter");r({target:"Array",proto:!0,forced:!h},{filter:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0)}})},"65f0":function(t,e,i){var r=i("861d"),a=i("e8b5"),n=i("b622"),h=n("species");t.exports=function(t,e){var i;return a(t)&&(i=t.constructor,"function"!=typeof i||i!==Array&&!a(i.prototype)?r(i)&&(i=i[h],null===i&&(i=void 0)):i=void 0),new(void 0===i?Array:i)(0===e?0:e)}},"90ba":function(t,e,i){},a640:function(t,e,i){"use strict";var r=i("d039");t.exports=function(t,e){var i=[][t];return!!i&&r((function(){i.call(null,e||function(){throw 1},1)}))}},b64b:function(t,e,i){var r=i("23e7"),a=i("7b0b"),n=i("df75"),h=i("d039"),s=h((function(){n(1)}));r({target:"Object",stat:!0,forced:s},{keys:function(t){return n(a(t))}})},b727:function(t,e,i){var r=i("0366"),a=i("44ad"),n=i("7b0b"),h=i("50c4"),s=i("65f0"),u=[].push,o=function(t){var e=1==t,i=2==t,o=3==t,c=4==t,d=6==t,f=7==t,m=5==t||d;return function(x,g,l,b){for(var v,p,A=n(x),M=a(A),y=r(g,l,3),_=h(M.length),z=0,k=b||s,w=e?k(x,_):i||f?k(x,0):void 0;_>z;z++)if((m||z in M)&&(v=M[z],p=y(v,z,A),t))if(e)w[z]=p;else if(p)switch(t){case 3:return!0;case 5:return v;case 6:return z;case 2:u.call(w,v)}else switch(t){case 4:return!1;case 7:u.call(w,v)}return d?-1:o||c?c:w}};t.exports={forEach:o(0),map:o(1),filter:o(2),some:o(3),every:o(4),find:o(5),findIndex:o(6),filterOut:o(7)}},c8b6:function(t,e,i){"use strict";i.r(e);var r=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("div",{staticClass:"row"},t._l(Object.keys(t.max),(function(e){return i("span",{key:e+"-max"},[t._v(" "+t._s(e)+"："+t._s(t.max[e][0].toFixed(5))+" "+t._s(t.max[e][1])+" ")])})),0),i("div",{staticClass:"row"},t._l(Object.keys(t.min),(function(e){return i("span",{key:e+"-min"},[t._v(" "+t._s(e)+"："+t._s(t.min[e][0].toFixed(5))+" "+t._s(t.min[e][1])+" ")])})),0),i("ul",t._l(t.treeList,(function(e,r){return i("li",{key:r},t._l(Object.keys(e),(function(a){return i("span",{key:a+"-"+r},[t._v(" "+t._s(a)+"："+t._s("number"===typeof e[a]?e[a].toFixed(5):e[a])+" ")])})),0)})),0)])},a=[],n=(i("159b"),i("4de4"),i("b64b"),{data:function(){return{id:1,treeList:[],max:{height:[1,1],xishui:[10,1],baseHeight:[1,1],baseXishui:[1,1],xishuiAdd:[1,1],heightAdd:[1,1],maxAge:[100,1],age:[1,1],size:[100,1]},min:{height:[1,1],xishui:[10,1],baseHeight:[1,1],baseXishui:[1,1],xishuiAdd:[1,1],heightAdd:[1,1],maxAge:[100,1],age:[1,1],size:[100,1]}}},methods:{update:function(){var t=this;this.treeList.forEach((function(e){e.death||(e.currSize=Math.min(e.currSize+e.xishui,e.size),e.currSize<e.height?(e.currSize=0,e.death=!0):(e.currSize-=e.height,e.height+=e.heightAdd,e.xishui+=e.xishuiAdd,e.age++),e.age>e.maxAge?e.death=!0:e.age===e.nextGetChildAge&&(t.createChild(e),e.nextGetChildAge+=18*(e.getChildNum+2)))})),this.treeList=this.treeList.filter((function(e){return e.death&&(Object.keys(t.max).forEach((function(i){t.max[i][0]<e[i]&&(t.max[i][0]=e[i],t.max[i][1]=e.id)})),Object.keys(t.min).forEach((function(i){t.min[i][0]>e[i]&&(t.min[i][0]=e[i],t.min[i][1]=e.id)}))),!e.death})),setTimeout(this.update,100)},createChild:function(t){for(var e=0;e<t.height;e+=50){var i=.1,r=t.height/t.age,a=t.baseHeight*Math.max(.1,Math.random()*i*2+r-i),n=t.baseXishui*Math.max(.1,Math.random()*i*2+r-i);if(this.treeList.push({id:this.id++,baseXishui:n,xishui:n,xishuiAdd:t.xishuiAdd*Math.max(.1,Math.random()*i*2+r-i),baseHeight:a,height:a,heightAdd:t.heightAdd*Math.max(.1,Math.random()*i*2+r-i),size:t.size*Math.max(.1,Math.random()*i*2+r-i),currSize:0,age:1,maxAge:t.maxAge*Math.max(.1,Math.random()*i*2+r-i),getChildNum:0,nextGetChildAge:18}),this.treeList.length>100)return}},init:function(){this.treeList=[];for(var t=0;t<5;t++){var e=.1,i=1,r=1*Math.max(.1,Math.random()*e*2+i-e),a=10*Math.max(.1,Math.random()*e*2+i-e);this.treeList.push({id:this.id++,baseXishui:a,xishui:a,xishuiAdd:.1*Math.max(.1,Math.random()*e*2+i-e),baseHeight:r,height:r,heightAdd:1*Math.max(.1,Math.random()*e*2+i-e),size:100*Math.max(.1,Math.random()*e*2+i-e),currSize:0,age:1,maxAge:100*Math.max(.1,Math.random()*e*2+i-e),getChildNum:0,nextGetChildAge:18})}}},created:function(){this.init(),this.update()}}),h=n,s=(i("4c7b"),i("2877")),u=Object(s["a"])(h,r,a,!1,null,"7fd41d48",null);e["default"]=u.exports},e8b5:function(t,e,i){var r=i("c6b6");t.exports=Array.isArray||function(t){return"Array"==r(t)}}}]);
//# sourceMappingURL=jiyinxuanz.100e2d9c.js.map