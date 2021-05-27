<template>
  <div>
    {{ m }} {{ type }}
    <button @click="pz">碰撞</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      m: 1,
      types: {
        1: "尘埃",
        100: "岩石",
        10000: "陨石",
        1000000: "小行星",
        100000000: "卫星",
        10000000000: "行星",
        1000000000000: "恒星",
      },
    };
  },
  computed: {
    type() {
      let t = "尘埃";
      for (let key in this.types) {
        if (this.m <= key) {
          return t;
        } else {
          t = this.types[key];
        }
      }
      return t;
    },
  },
  methods: {
    getItem() {
      const arr = [];
      let m1 = Math.floor(Math.random() * this.m * 0.5);
      m1 = m1 > 1 ? m1 : 1;
      arr.push(m1);
      m1 = Math.floor(Math.random() * this.m);
      m1 = m1 > 1 ? m1 : 1;
      arr.push(m1);
      m1 = Math.floor(Math.random() * this.m * 2);
      m1 = m1 > 1 ? m1 : 1;
      arr.push(m1);
      return arr[Math.floor(Math.random() * arr.length)];
    },
    pz() {
      const m1 = this.getItem();
      if (this.m < m1) {
        this.m += this.m - m1;
        if (this.m < 1) {
          this.m = 1;
        }
      } else {
        this.m += m1;
      }
    },
  },
};
</script>

<style></style>
