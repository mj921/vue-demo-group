import Toast from "./index.vue";
import Vue from "vue";
const ToastConStr = Vue.extend(Toast);

const RgToast = (content, options = {}) => {
  if (typeof content === "object") {
    options = content;
    content = options.content || "";
  }
  const { type = "success", delay = 3000 } = options;
  const confirm = new ToastConStr();
  confirm.type = type;
  confirm.content = content;
  confirm.$mount();
  document.body.appendChild(confirm.$el);
  setTimeout(() => {
    document.body.removeChild(confirm.$el);
  }, delay);
};
RgToast.success = (content, options = {}) => {
  if (typeof content === "object") {
    options = content;
    content = options.content || "";
  }
  options.type = "success";
  RgToast(content, options);
};
RgToast.error = (content, options = {}) => {
  if (typeof content === "object") {
    options = content;
    content = options.content || "";
  }
  options.type = "error";
  RgToast(content, options);
};
export default RgToast;
