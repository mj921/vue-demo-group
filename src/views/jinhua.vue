<template>
  <div>
    <button @click="reset">重置</button>
    <button @click="toggleStop">{{ stop ? "开始" : "暂停" }}</button> sum：{{
      sum
    }}
    max：{{ maxKey }} 连续：{{ maxContinuity }} 最大非1：{{
      maxNotOne
    }}
    最小1：{{ minOne }}
    <ul>
      <li v-for="item in list" :key="item.key">
        <dd>{{ item.key }}：</dd>
        <dd>{{ item.value }}</dd>
        <dd>{{ Math.floor((item.value / sum) * 10000000) / 100000 }}%</dd>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    const dataStr = localStorage.getItem("jinhua");
    let jinhuaData = {};
    try {
      jinhuaData = dataStr ? JSON.parse(dataStr) : {};
    } catch (e) {
      console.log(e);
    }
    return {
      jinhuaData,
      stop: true,
      sto: null,
    };
  },
  computed: {
    list() {
      return Object.keys(this.jinhuaData).map((key) => ({
        key,
        value: this.jinhuaData[key],
      }));
    },
    maxKey() {
      return Math.max(...Object.keys(this.jinhuaData));
    },
    maxContinuity() {
      const keys = Object.keys(this.jinhuaData);
      let i = 1;
      for (; i < keys.length; i++) {
        if (+keys[i] - 1 !== +keys[i - 1]) {
          return keys[i - 1];
        }
      }
      return keys[i - 1];
    },
    maxNotOne() {
      const keys = Object.keys(this.jinhuaData);
      let i = keys.length - 1;
      for (; i >= 0; i--) {
        if (this.jinhuaData[keys[i]] !== 1) {
          return keys[i];
        }
      }
      return null;
    },
    minOne() {
      const keys = Object.keys(this.jinhuaData);
      let i = 0;
      for (; i < keys.length; i++) {
        if (this.jinhuaData[keys[i]] === 1) {
          return keys[i];
        }
      }
      return null;
    },
    sum() {
      return Object.keys(this.jinhuaData).reduce(
        (sum, key) => this.jinhuaData[key] + sum,
        0
      );
    },
  },
  methods: {
    toggleStop() {
      if (this.stop) {
        this.loop(1000 / 60);
      } else {
        clearTimeout(this.sto);
        this.sto = null;
      }
      this.stop = !this.stop;
    },
    reset() {
      this.jinhuaData = {};
      localStorage.removeItem("jinhua");
    },
    update() {
      const m = Math.floor(Math.pow(1 / Math.random(), 0.5));
      if (this.jinhuaData[m]) {
        this.jinhuaData[m]++;
        this.$set(this.jinhuaData, m, this.jinhuaData[m] + 1);
      } else {
        this.$set(this.jinhuaData, m, 1);
      }
      localStorage.setItem("jinhua", JSON.stringify(this.jinhuaData));
    },
    loop(time = 60) {
      this.update();
      this.sto = setTimeout(() => {
        this.loop(time);
      }, time);
    },
  },
};
</script>

<style lang="scss" scoped>
li {
  display: flex;
  dd {
    width: 80px;
    margin-left: 0;
  }
}
</style>
