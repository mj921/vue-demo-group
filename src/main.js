import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUi from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "view-design/dist/styles/iview.css";

Vue.config.productionTip = false;
// Vue.config.errorHandler = (err, vm, info) => {
//   console.log("errorHandler", err, vm, info);
// };
Vue.use(ElementUi);
// Vue.use(ViewDesign);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
