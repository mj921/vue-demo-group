<template>
  <div class="setting" v-show="visible">
    <div class="setting-wrapper">
      <dt class="setting-title">设置</dt>
      <div class="setting-content">
        <div class="setting-form">
          <dl
            class="setting-form-item"
            v-for="formItem in settingForm"
            :key="formItem.key"
          >
            <label class="setting-form-label">{{ formItem.label }}</label>
            <div v-if="formItem.type === 'radio'" class="setting-radio">
              <template v-for="radioItem in formItem.radioList">
                <input
                  :key="`radio-${formItem.key}-${radioItem.value}`"
                  v-model="settingData[formItem.key]"
                  type="radio"
                  :value="radioItem.value"
                />
                <span
                  class="setting-radio-label"
                  :key="`radio-${formItem.key}-${radioItem.value}-label`"
                >
                  {{ radioItem.label }}
                </span>
              </template>
            </div>
          </dl>
        </div>
        <button class="rule-btn" @click="showRule">查看规则</button>
      </div>
      <div class="setting-btns">
        <button @click="confirmFun">保存</button>
        <button @click="cancelFun">取消</button>
      </div>
    </div>
  </div>
</template>

<script>
import RgConfirm from "../confirm";
export default {
  name: "Setting",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default: () => ({}),
    },
    gameRuleData: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      settingData: {
        speed: 1,
      },
      settingForm: [
        {
          label: "速度",
          key: "speed",
          type: "radio",
          radioList: [
            {
              label: "1",
              value: 1,
            },
            {
              label: "2",
              value: 2,
            },
            {
              label: "4",
              value: 4,
            },
            {
              label: "10",
              value: 10,
            },
            {
              label: "20",
              value: 20,
            },
          ],
        },
      ],
    };
  },
  computed: {
    visible: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
    rules() {
      const { dayTime, cookSalary, maxWaitCustomerNum = 6 } = this.gameRuleData;
      return [
        `W+数字，表示第几周，每过7天，W后面的数字增加1`,
        `D+数字，表示星期几，每周有7天`,
        `H+数字，表示几点，每天有24小时，每小时有${dayTime / 24000}秒`,
        `每个厨师的周薪为 ￥${cookSalary}`,
        `解雇厨师时，支付厨师的当周工资及额外的解雇费用，解雇费用为一周工资。`,
        "金钱元素：显示在右上角，初始值为500",
        `等候区最多容纳 ${maxWaitCustomerNum} 位顾客。当等候区人满的时候，不会有新顾客来到餐厅。`,
        "当顾客所有菜都未按时上来时，顾客进入生气状态，需要你去安抚顾客，顾客才会离开，否则顾客会一直待到当天结束时才会离开餐厅；",
        "当顾客完成用餐，会出现一个支付按钮，点击后，顾客进行支付，支付完成后，顾客离开餐厅；如果一直未点击支付按钮，顾客会待到当天结束时自行支付后离开",
        "做菜：凉菜和饮品的速度较快，主菜较慢；做菜需要成本。",
        "做好菜需要你上菜，如果做好菜顾客已经超时，等待一段5秒，如果没有顾客需要这个菜作废掉",
        "厨师最多6名，最少1名",
        "当厨师做菜时，点击厨师头像能加速做菜进度",
      ];
    },
  },
  watch: {
    value(val) {
      if (val) {
        this.settingData = {
          speed: this.data.speed || 1,
        };
      }
    },
  },
  methods: {
    close() {
      this.visible = false;
    },
    confirmFun() {
      this.close();
      this.$emit("save", this.settingData);
    },
    cancelFun() {
      this.close();
      this.$emit("cancel");
    },
    showRule() {
      RgConfirm({
        title: "规则",
        content: `<ul style="max-height: calc(100vh - 20rem);overflow-y: auto;padding-left: 1em;">
          ${this.rules.map((el) => "<li>" + el + "</li>").join("")}
        </ul>`,
        cancelBtnShow: false,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@mixin linear-gradientTwo($color1, $color2, $direction: top) {
  background: linear-gradient(
    to $direction,
    $color1 0%,
    $color1 50%,
    $color2 50%,
    $color2 100%
  );
}
.setting {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  max-width: 75rem;
  background-color: rgba($color: #000000, $alpha: 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  .setting-wrapper {
    width: 72.5rem;
    background-color: #ffd24d;
    border-radius: 2.5rem;
    border: 1.5rem solid #fff;
    padding: 0 5rem;
    .setting-title {
      padding: 2rem 0;
      text-align: center;
      line-height: 5.4rem;
      font-size: 3.4rem;
      font-weight: bold;
      color: #555;
    }
    .setting-content {
      font-size: 2.7rem;
      color: #8c6900;
      .setting-form {
        .setting-form-item {
          display: flex;
          .setting-form-label {
            width: 10rem;
          }
          .setting-radio {
            display: flex;
            align-items: center;
            .setting-radio-label {
              margin: 0 1rem;
            }
          }
        }
      }
    }
    .rule-btn {
      margin-top: 3rem;
      padding: 0 2rem;
      height: 6rem;
      line-height: 5.2rem;
      border: 0.4rem solid #fff;
      border-radius: 3rem;
      font-size: 2.8rem;
      font-weight: bold;
      color: #ffd24d;
      @include linear-gradientTwo(#2693ff, #006dd9, bottom);
    }
    .setting-btns {
      padding: 4rem 0;
      display: flex;
      justify-content: space-between;
      button {
        padding: 0 4rem;
        height: 10.6rem;
        line-height: 9rem;
        border: 0.8rem solid #8c6900;
        border-radius: 5.3rem;
        font-size: 3rem;
        font-weight: bold;
        color: #916b03;
        min-width: 23rem;
        @include linear-gradientTwo(#ffe699, #ffd24d, bottom);
      }
    }
  }
}
</style>
