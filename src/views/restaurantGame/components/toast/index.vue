<template>
  <div class="rg-toast" :class="`toast-${type}`" v-html="content"></div>
</template>

<script>
export default {
  name: "RgToast",
  props: {
    content: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "success",
      validator(val) {
        return ["success", "error"].includes(val);
      },
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
.rg-toast {
  position: fixed;
  left: 50%;
  top: 40%;
  transform: translate(-50%);
  z-index: 99999;
  min-width: 48rem;
  border-radius: 2.5rem;
  border: 1.5rem solid #fff;
  padding: 1rem 5rem;
  font-size: 2.7rem;
  line-height: 4.4rem;
  color: #8c6900;
  &.toast-success {
    background-color: #d9e67d;
  }
  &.toast-error {
    background-color: #ffb399;
  }
}
</style>
