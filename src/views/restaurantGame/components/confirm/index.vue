<template>
  <div class="rg-confirm" v-show="visible">
    <div class="confirm-wrapper" :class="{ 'no-title': !title }">
      <dt class="confirm-title" v-if="title">{{ title }}</dt>
      <p class="confirm-content" v-html="content"></p>
      <div class="confirm-btns" :class="{ onlyone: !cancelBtnShow }">
        <button @click="confirmFun">{{ confirmBtnText }}</button>
        <button @click="cancelFun" v-if="cancelBtnShow">
          {{ cancelBtnText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RgConfirm",
  props: {
    title: {
      type: String,
      default: "",
    },
    content: {
      type: String,
      default: "",
    },
    confirmBtnText: {
      type: String,
      default: "确定",
    },
    cancelBtnText: {
      type: String,
      default: "取消",
    },
    cancelBtnShow: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    show() {
      this.visible = true;
    },
    close() {
      this.visible = false;
    },
    confirmFun() {
      this.close();
      this.$emit("confirm");
    },
    cancelFun() {
      this.close();
      this.$emit("cancel");
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
.rg-confirm {
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
  .confirm-wrapper {
    width: 72.5rem;
    background-color: #ffd24d;
    border-radius: 2.5rem;
    border: 1.5rem solid #fff;
    padding: 0 5rem;
    &.no-title {
      padding-top: 3rem;
    }
    .confirm-title {
      padding: 2rem 0;
      text-align: center;
      line-height: 5.4rem;
      font-size: 3.4rem;
      font-weight: bold;
      color: #555;
    }
    .confirm-content {
      font-size: 2.7rem;
      line-height: 4.4rem;
      color: #8c6900;
    }
    .confirm-btns {
      padding: 4rem 0;
      display: flex;
      justify-content: space-between;
      &.onlyone {
        justify-content: space-around;
      }
      button {
        padding: 0 4rem;
        height: 10.6rem;
        line-height: 9rem;
        border: 0.8rem solid;
        border-radius: 5.3rem;
        font-size: 3rem;
        font-weight: bold #8c6900;
        color: #916b03;
        min-width: 23rem;
        @include linear-gradientTwo(#ffe699, #ffd24d, bottom);
      }
    }
  }
}
</style>
