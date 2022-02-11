import Confirm from "./index.vue";
import Vue from "vue";
const ConfirmConStr = Vue.extend(Confirm);

const RgConfirm = ({
  title = "",
  content = "",
  confirmBtnText = "确定",
  cancelBtnShow = true,
  cancelBtnText = "取消",
}) => {
  const confirm = new ConfirmConStr();
  confirm.title = title;
  confirm.content = content;
  confirm.confirmBtnText = confirmBtnText;
  confirm.cancelBtnShow = cancelBtnShow;
  confirm.cancelBtnText = cancelBtnText;
  confirm.show();
  confirm.$mount();
  document.body.appendChild(confirm.$el);
  return new Promise((resolve, reject) => {
    confirm.$once("confirm", () => {
      document.body.removeChild(confirm.$el);
      resolve();
    });
    confirm.$once("cancel", () => {
      document.body.removeChild(confirm.$el);
      reject();
    });
  });
};
export default RgConfirm;
