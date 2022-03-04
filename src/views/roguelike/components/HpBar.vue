<template>
  <div class="hp-bar">
    <div class="hp-bar-curr" :style="{ width: `${rate}%` }"></div>
    <div class="hp-bar-text">
      <span class="hp-bar-text-curr">{{ curr }}</span>
      <span class="hp-bar-text-split">/</span>
      <span class="hp-bar-text-max">{{ max }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "HpBar",
  props: {
    curr: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    rate() {
      return Math.min(this.max ? (this.curr / this.max) * 100 : 0, 100);
    },
  },
};
</script>
<style lang="scss" scoped>
.hp-bar {
  height: 20px;
  min-width: 100px;
  width: 100%;
  position: relative;
  border: 1px solid;
  box-sizing: content-box;
  .hp-bar-curr {
    height: 100%;
    background-color: red;
  }
  .hp-bar-text {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    .hp-bar-text-curr,
    .hp-bar-text-max {
      width: calc(50% - 10px);
    }
    .hp-bar-text-curr {
      text-align: right;
    }
    .hp-bar-text-split {
      width: 20px;
      text-align: center;
    }
  }
}
</style>
