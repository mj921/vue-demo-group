<template>
  <div class="menu" v-show="visible">
    <div class="menu-wrapper">
      <div class="menu-title">
        <div class="menu-customer">
          <img :src="menuData.headImg || ''" />
        </div>
        {{ menuData.name }} 正在点菜，已点 {{ totalPrice || 0 }} 元的菜
      </div>
      <div class="menu-content">
        <div
          class="menu-block"
          v-for="dishType in menuConfig"
          :key="dishType.name"
        >
          <div class="menu-typename">
            {{ dishType.name }}（{{ numToChinese(dishType.dishes.length) }}选{{
              numToChinese(dishType.valueNum)
            }}，{{ dishType.required ? "必点" : "可不点" }}）
          </div>
          <div
            class="menu-list"
            v-for="dish in dishType.dishes"
            :key="dish.name"
          >
            <div class="menu-dish">
              <input
                class="menu-checkbox"
                v-model="menuData.values[dishType.name]"
                type="checkbox"
                :name="dishType.name"
                :value="dish"
                :disabled="
                  menuData.values[dishType.name].length === dishType.valueNum &&
                  !menuData.values[dishType.name].includes(dish)
                "
              />
              <span class="menu-dish-name">{{ dish.name }}</span>
              <span class="menu-dish-price">￥ {{ dish.price }} </span>
            </div>
          </div>
        </div>
      </div>
      <div class="menu-btns">
        <button
          @click="menuFinish"
          :class="{
            disabled:
              menuConfig.some(
                (el) =>
                  el.required && menuData.values[el.name].length < el.valueNum
              ) ||
              menuConfig.reduce(
                (total, el) => total + menuData.values[el.name].length,
                0
              ) === 0,
          }"
        >
          点好了，快点上菜
        </button>
        <button @click.stop="notEat">不吃了</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MenuSelect",
  props: {
    value: {
      type: Boolean,

      default: false,
    },
    customer: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      menuData: {},
      menuConfig: [
        {
          name: "凉菜",
          dishes: [
            {
              name: "凉拌黄瓜",
              price: 6,
              maxCookTime: 6000,
              maxWaitTime: 20000,
              maxEatTime: 10000,
              cost: 3,
            },
            {
              name: "冷切豆腐",
              price: 4,
              maxCookTime: 4000,
              maxWaitTime: 20000,
              maxEatTime: 10000,
              cost: 2,
            },
          ],
          required: false,
          valueNum: 1,
        },
        {
          name: "主菜",
          dishes: [
            {
              name: "猪肉炖粉条",
              price: 12,
              maxCookTime: 12000,
              maxWaitTime: 30000,
              maxEatTime: 15000,
              cost: 6,
            },
            {
              name: "红烧蹄髈",
              price: 16,
              maxCookTime: 16000,
              maxWaitTime: 30000,
              maxEatTime: 15000,
              cost: 8,
            },
            {
              name: "酥炸小黄鱼",
              price: 15,
              maxCookTime: 15000,
              maxWaitTime: 30000,
              maxEatTime: 15000,
              cost: 7,
            },
            {
              name: "炙烤牛排",
              price: 18,
              maxCookTime: 18000,
              maxWaitTime: 30000,
              maxEatTime: 15000,
              cost: 9,
            },
            {
              name: "清蒸鲈鱼",
              price: 12,
              maxCookTime: 12000,
              maxWaitTime: 30000,
              maxEatTime: 15000,
              cost: 6,
            },
          ],
          required: true,
          valueNum: 1,
        },
        {
          name: "饮品",
          dishes: [
            {
              name: "鲜榨果汁",
              price: 6,
              maxCookTime: 6000,
              maxWaitTime: 20000,
              maxEatTime: 10000,
              cost: 3,
            },
            {
              name: "碳酸饮料",
              price: 5,
              maxCookTime: 5000,
              maxWaitTime: 20000,
              maxEatTime: 10000,
              cost: 2,
            },
          ],
          required: false,
          valueNum: 1,
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
    totalPrice() {
      return Object.keys(this.menuData.values || {}).reduce(
        (total, key) =>
          total +
          (this.menuData.values[key] || []).reduce((t, el) => t + el.price, 0),
        0
      );
    },
  },
  watch: {
    visible(val) {
      if (val) {
        this.setMenuData();
      }
    },
  },
  methods: {
    numToChinese(num) {
      const numList = [
        "零",
        "一",
        "二",
        "三",
        "四",
        "五",
        "六",
        "七",
        "八",
        "九",
      ];
      if (num < 10) {
        return numList[num];
      } else if (num < 20) {
        return `十${num % 10 > 0 ? numList[num % 10] : ""}`;
      } else if (num < 100) {
        return `${numList[Math.floor(num / 10)]}十${
          num % 10 > 0 ? numList[num % 10] : ""
        }`;
      } else if (num < 1000) {
        return `${numList[Math.floor(num / 100)]}百${
          num % 100 > 10
            ? this.numToChinese(num % 100)
            : num % 100 === 10
            ? "一十"
            : ("零" + numList[num % 100]).replace(/零{2,}/, "")
        }`;
      } else if (num < 10000) {
        return `${numList[Math.floor(num / 1000)]}千${
          num % 1000 > 100
            ? this.numToChinese(num % 1000)
            : ("零" + this.numToChinese(num % 1000)).replace(/零{2,}/, "")
        }`;
      } else if (num < 100000000) {
        return `${this.numToChinese(Math.floor(num / 10000))}万${
          num % 10000 > 1000
            ? this.numToChinese(num % 10000)
            : ("零" + this.numToChinese(num % 10000)).replace(/零{2,}/, "")
        }`;
      } else {
        return `${this.numToChinese(Math.floor(num / 100000000))}亿${
          num % 100000000 > 10000000
            ? this.numToChinese(num % 100000000)
            : ("零" + this.numToChinese(num % 100000000)).replace(/零{2,}/, "")
        }`;
      }
    },
    setMenuData() {
      const selectData = {
        headImg: this.customer.img,
        name: this.customer.name,
        id: this.customer.id,
      };
      selectData.values = this.menuConfig.reduce((v, el) => {
        v[el.name] = [];
        return v;
      }, {});
      this.menuData = selectData;
    },
    menuFinish() {
      this.$emit("finish", this.menuData);
    },
    notEat() {
      this.$emit("cancel");
      this.visible = false;
    },
  },
  created() {
    this.setMenuData();
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
.menu {
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
  z-index: 999;
  .menu-wrapper {
    width: 72rem;
    background-color: #ffd24d;
    border-radius: 2.5rem;
    border: 1.5rem solid #fff;
    padding: 0 4rem;
    .menu-title {
      position: relative;
      height: 10rem;
      padding-left: 18rem;
      display: flex;
      line-height: 3.2rem;
      font-size: 2.8rem;
      align-items: center;
      .menu-customer {
        position: absolute;
        left: 0;
        top: -6.5rem;
        width: 13.4rem;
        height: 13.4rem;
        border-radius: 6.5rem;
        border: 1.3rem solid #fff;
        img {
          width: 100%;
          height: 100%;
        }
        @include linear-gradientTwo(#2693ff, #006dd9, right);
      }
    }
    .menu-content {
      border: 0.8rem solid #ca9800;
      padding: 2.8rem 0 2.8rem 4.5rem;
      background-color: #fff;
      min-height: 67rem;
      max-height: calc(100vh - 40rem);
      .menu-block {
        font-size: 2.4rem;
        color: #ca9800;
        .menu-typename {
          margin-bottom: 1em;
        }
        .menu-list {
          padding-left: 1em;
          .menu-dish {
            line-height: 1em;
            margin-bottom: 1em;
            display: flex;
            align-items: center;
            .menu-checkbox {
              margin-right: 1em;
            }
            .menu-dish-name {
              width: 18rem;
            }
            .menu-dish-price {
              padding-left: 20rem;
              position: relative;
              &::before {
                position: absolute;
                left: 0;
                top: 0.5em;
                width: 18rem;
                content: "";
                border-top: 1px dashed #ca9800;
              }
            }
          }
        }
      }
    }
    .menu-btns {
      padding: 4rem 0;
      display: flex;
      justify-content: space-between;
      button {
        padding: 0 4rem;
        height: 10.6rem;
        line-height: 9rem;
        border: 0.8rem solid;
        border-radius: 5.3rem;
        font-size: 3rem;
        font-weight: bold #8c6900;
        color: #916b03;
        @include linear-gradientTwo(#ffe699, #ffd24d, bottom);
        &.disabled {
          border-color: #948968;
          color: #948968;
          @include linear-gradientTwo(#ded3ba, #d3c6a5, bottom);
        }
      }
    }
  }
}
</style>
