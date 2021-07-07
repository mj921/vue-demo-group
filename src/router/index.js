import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import yz from "../views/yz.vue";
import jinhua from "../views/jinhua.vue";
import jinhua1 from "../views/jinhua1.vue";
import shengtaiquan from "../views/shengtaiquan.vue";
import xq from "../views/xq.vue";
import zz from "../views/zz.vue";
import zz1 from "../views/zz1.vue";
import zzCommon from "../views/zzCommon.vue";
import zztransform from "../views/zztransform.vue";
import shengwu from "../views/shengwu.vue";
import shengwu1 from "../views/shengwu1.vue";
import cc from "../views/cc.vue";
import zm from "../views/zm.vue";
import xiuxian from "../views/xiuxian.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/yz",
    name: "yz",
    component: yz,
  },
  {
    path: "/jinhua",
    name: "jinhua",
    component: jinhua,
  },
  {
    path: "/jinhua1",
    name: "jinhua1",
    component: jinhua1,
  },
  {
    path: "/shengtaiquan",
    name: "shengtaiquan",
    component: shengtaiquan,
  },
  {
    path: "/xq",
    name: "xq",
    component: xq,
  },
  {
    path: "/zz",
    name: "zz",
    component: zz,
  },
  {
    path: "/zz1",
    name: "zz1",
    component: zz1,
  },
  {
    path: "/zzCommon",
    name: "zzCommon",
    component: zzCommon,
  },
  {
    path: "/zztransform",
    name: "zztransform",
    component: zztransform,
  },
  {
    path: "/shengwu",
    name: "shengwu",
    component: shengwu,
  },
  {
    path: "/shengwu1",
    name: "shengwu1",
    component: shengwu1,
  },
  {
    path: "/cc",
    name: "cc",
    component: cc,
  },
  {
    path: "/zm",
    name: "zm",
    component: zm,
  },
  {
    path: "/xiuxian",
    name: "xiuxian",
    component: xiuxian,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/",
    name: "Home",
    component: Home,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
