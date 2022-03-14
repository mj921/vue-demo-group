import Vue from "vue";
import VueRouter from "vue-router";
import { setRem } from "../util/dom";
const Home = () => import("../views/Home.vue");
const yz = () => import("../views/yz.vue");
const jinhua = () => import("../views/jinhua.vue");
const jinhua1 = () => import("../views/jinhua1.vue");
const shengtaiquan = () => import("../views/shengtaiquan.vue");
const xq = () => import("../views/xq.vue");
const zz = () => import("../views/zz.vue");
const zz1 = () => import("../views/zz1.vue");
const zzCommon = () => import("../views/zzCommon.vue");
const zztransform = () => import("../views/zztransform.vue");
const shengwu = () => import("../views/shengwu.vue");
const shengwu1 = () => import("../views/shengwu1.vue");
const cc = () => import("../views/cc.vue");
const zm = () => import("../views/zm.vue");
const xiuxian = () => import("../views/xiuxian.vue");
const pubuliu = () => import("../views/pubuliu.vue");
const sku = () => import("../views/sku.vue");
const x6antv = () => import("../views/x6antv.vue");
const xiagu = () => import("../views/xiagu.vue");
const restaurantGame = () => import("../views/restaurantGame/index.vue");
const clearStore = () => import("../views/clearStore.vue");
const roguelike = () => import("../views/roguelike/index.vue");
const pyGuessIdioms = () => import("../views/pyGuessIdioms/index.vue");
const pyGuessIdiomsCy = () => import("../views/pyGuessIdioms/chengyu.vue");

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
    path: "/roguelike",
    name: "roguelike",
    component: roguelike,
    homeShow: true,
    meta: {
      title: "roguelike",
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
