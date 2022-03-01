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
import pubuliu from "../views/pubuliu.vue";
import sku from "../views/sku.vue";
import x6antv from "../views/x6antv.vue";
import xiagu from "../views/xiagu.vue";
import restaurantGame from "../views/restaurantGame/index.vue";
import pyGuessIdioms from "../views/pyGuessIdioms/index.vue";
import pyGuessIdiomsCy from "../views/pyGuessIdioms/chengyu.vue";
import clearStore from "../views/clearStore.vue";
import { setRem } from "../util/dom";

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
    homeShow: true,
    meta: {
      title: "正则游戏",
    },
  },
  {
    path: "/zz1",
    name: "zz1",
    component: zz1,
    homeShow: true,
    meta: {
      title: "正则游戏2",
    },
  },
  {
    path: "/zzCommon",
    name: "zzCommon",
    component: zzCommon,
    homeShow: true,
    meta: {
      title: "正则游戏3",
    },
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
    path: "/xiagu",
    name: "xiagu",
    component: xiagu,
  },
  {
    path: "/pubuliu",
    name: "pubuliu",
    component: pubuliu,
  },
  {
    path: "/sku",
    name: "sku",
    component: sku,
  },
  {
    path: "/x6antv",
    name: "x6antv",
    component: x6antv,
  },
  {
    path: "/restaurantGame",
    name: "restaurantGame",
    component: restaurantGame,
    homeShow: true,
    meta: {
      h5: true,
      title: "餐厅游戏",
    },
  },
  {
    path: "/caichengyu",
    name: "caichengyu",
    component: pyGuessIdioms,
    homeShow: true,
    meta: {
      title: "拼音猜成语",
    },
  },
  {
    path: "/caichengyu1",
    name: "caichengyu1",
    component: pyGuessIdiomsCy,
    homeShow: true,
    meta: {
      title: "拼音猜成语2",
    },
  },
  {
    path: "/clearStore",
    name: "clearStore",
    component: clearStore,
    homeShow: true,
    meta: {
      title: "清缓存",
    },
  },
  {
    path: "/treeImg",
    name: "treeImg",
    component: () =>
      import(/* webpackChunkName: "treeImg" */ "../views/treeImg.vue"),
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
    path: "/demo",
    name: "Demo",
    component: () => import("../views/demo.vue"),
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

router.beforeEach((to, from, next) => {
  if ((!from.meta || !from.meta.h5) && to.meta && to.meta.h5) {
    setRem();
    window.addEventListener("resize", setRem);
  }
  if ((!to.meta || !to.meta.h5) && from.meta && from.meta.h5) {
    window.removeEventListener("resize", setRem);
  }
  next();
});
router.myRoutes = routes;
export default router;
