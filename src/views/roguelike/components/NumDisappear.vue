<template>
  <div class="num-disappear">
    <transition-group name="disappear" @leave="leave">
      <dl
        class="num"
        v-for="item in numList"
        :data-startOffset="item.startOffset"
        :data-endOffset="item.endOffset"
        :key="item.id"
        :style="{
          transform: `translateX(calc(${item.startOffset}px - 50%))`,
          color: item.color,
        }"
      >
        {{ item.num }}
      </dl>
    </transition-group>
  </div>
</template>
<script>
export default {
  name: "NumDisappear",
  data() {
    return {
      numList: [],
      id: 1,
    };
  },
  methods: {
    addNum({ num, color }) {
      const obj = {
        num,
        color,
        id: this.id++,
        startOffset: 25 - Math.floor(Math.random() * 50),
        endOffset: 50 - Math.floor(Math.random() * 100),
      };
      obj.sto = setTimeout(() => {
        const index = this.numList.indexOf(obj);
        if (index > -1) {
          this.numList.splice(index, 1);
        }
      });
      this.numList.push(obj);
    },
    leave(el, done) {
      el.style.bottom = "calc(100% - 1em)";
      el.style.opacity = "0";
      el.style.transform = `translateX(calc(${
        el.dataset.startOffset + el.dataset.endOffset
      }px - 50%))`;
      setTimeout(() => {
        done();
      }, 3000);
    },
  },
};
</script>
<style lang="scss" scoped>
.num-disappear {
  position: absolute;
  .num {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;
    transition: 3s all;
    font-size: 18px;
  }
}
</style>
