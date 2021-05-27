<template>
  <div>
    <button @click="reset">重置</button>
    <button @click="update" :disabled="!stop || running">一次</button>
    <button @click="add" :disabled="!stop || running">补充</button>
    <button @click="add(10000)" :disabled="!stop || running">补充10000</button>
    <button @click="resetSort" :disabled="!stop || running">乱序</button>
    <button @click="toggleStop" :disabled="running">
      {{ stop ? "开始" : "暂停" }}
    </button>
    {{ arr.length }}&nbsp;&nbsp;&nbsp;
    {{ Object.keys(obj).length }}&nbsp;&nbsp;&nbsp;
    {{ (sum / arr.length).toFixed(2) }}&nbsp;&nbsp;&nbsp;
    {{ Math.floor((moreAvgNum / arr.length) * 10000000) / 100000 }}%
    <table>
      <tr>
        <td></td>
        <td>maxNum</td>
        <td>maxM</td>
        <td>max</td>
      </tr>
      <tr>
        <td>key</td>
        <td>{{ maxNum }}</td>
        <td>{{ maxM }}</td>
        <td>{{ max }}</td>
      </tr>
      <tr>
        <td>num</td>
        <td>{{ obj[maxNum] }}</td>
        <td>{{ obj[maxM] }}</td>
        <td>{{ obj[max] }}</td>
      </tr>
      <tr>
        <td>m</td>
        <td>{{ obj[maxNum] * +maxNum }}</td>
        <td>{{ obj[maxM] * +maxM }}</td>
        <td>{{ obj[max] * +max }}</td>
      </tr>
      <tr>
        <td>num%</td>
        <td>
          {{ Math.floor((obj[maxNum] / arr.length) * 10000000) / 100000 }}%
        </td>
        <td>{{ Math.floor((obj[maxM] / arr.length) * 10000000) / 100000 }}%</td>
        <td>{{ Math.floor((obj[max] / arr.length) * 10000000) / 100000 }}%</td>
      </tr>
      <tr>
        <td>m%</td>
        <td>
          {{
            Math.floor(((obj[maxNum] * +maxNum) / sum1) * 10000000) / 100000
          }}%
        </td>
        <td>
          {{ Math.floor(((obj[maxM] * +maxM) / sum1) * 10000000) / 100000 }}%
        </td>
        <td>
          {{ Math.floor(((obj[max] * +max) / sum1) * 10000000) / 100000 }}%
        </td>
      </tr>
    </table>
    <ul>
      <li v-for="item in list" :key="item.key">
        <dd>{{ item.key }}：</dd>
        <dd>{{ item.value }}</dd>
        <dd>
          {{ Math.floor((item.value / arr.length) * 10000000) / 100000 }}%
        </dd>
        <dd>{{ item.value * +item.key }}</dd>
        <dd>
          {{
            Math.floor(((item.value * +item.key) / sum1) * 10000000) / 100000
          }}%
        </dd>
      </li>
    </ul>
    <ul v-if="arr.length <= 200">
      <li v-for="(item, iii) in arr" :key="iii">{{ item }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    const arrStr = localStorage.getItem("ysjh");
    let arr = [];
    let obj = {};
    if (arrStr) {
      try {
        arr = arrStr ? JSON.parse(arrStr) : {};
        arr.forEach((item) => {
          if (obj[item]) {
            obj[item]++;
          } else {
            obj[item] = 1;
          }
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      for (let i = 0; i < 10000; i++) {
        arr.push(1);
      }
      obj = { 1: 10000 };
    }
    return {
      arr,
      obj,
      stop: true,
      sto: null,
      running: false,
    };
  },
  computed: {
    list() {
      return Object.keys(this.obj).map((key) => ({
        key,
        value: this.obj[key],
      }));
    },
    maxKey() {
      return Math.max(...Object.keys(this.jinhuaData));
    },
    // maxContinuity() {
    //   const keys = Object.keys(this.jinhuaData);
    //   let i = 1;
    //   for (; i < keys.length; i++) {
    //     if (+keys[i] - 1 !== +keys[i - 1]) {
    //       return keys[i - 1];
    //     }
    //   }
    //   return keys[i - 1];
    // },
    // maxNotOne() {
    //   const keys = Object.keys(this.jinhuaData);
    //   let i = keys.length - 1;
    //   for (; i >= 0; i--) {
    //     if (this.jinhuaData[keys[i]] !== 1) {
    //       return keys[i];
    //     }
    //   }
    //   return null;
    // },
    // minOne() {
    //   const keys = Object.keys(this.jinhuaData);
    //   let i = 0;
    //   for (; i < keys.length; i++) {
    //     if (this.jinhuaData[keys[i]] === 1) {
    //       return keys[i];
    //     }
    //   }
    //   return null;
    // },
    sum() {
      return Object.keys(this.obj).reduce(
        (sum, key) => this.obj[key] * +key + sum,
        0
      );
    },
    sum1() {
      return this.arr.reduce((sum, item) => item + sum, 0);
    },
    maxNum() {
      let maxValue = 0;
      let max = null;
      Object.keys(this.obj).forEach((key) => {
        if (
          this.obj[key] > maxValue ||
          (this.obj[key] === maxValue && this.obj[key] * +key > maxValue * max)
        ) {
          max = key;
          maxValue = this.obj[key];
        }
      });
      return max;
    },
    maxM() {
      let maxValue = 0;
      let max = null;
      Object.keys(this.obj).forEach((key) => {
        const m = this.obj[key] * +key;
        if (m > maxValue || (m === maxValue && +key > +max)) {
          max = key;
          maxValue = m;
        }
      });
      return max;
    },
    max() {
      return Math.max(...Object.keys(this.obj));
    },
    avg() {
      return this.sum / this.arr.length;
    },
    moreAvgNum() {
      return this.arr.filter((item) => item > this.avg).length;
    },
  },
  methods: {
    resetSort() {
      this.running = true;
      this.arr.sort(() => Math.random() - 0.5);
      this.running = false;
    },
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
      localStorage.removeItem("ysjh");
    },
    add(num) {
      this.running = true;
      if (this.stop) {
        let len = num || 10000 - this.arr.length;
        for (let i = 0; i < len; i++) {
          this.arr.unshift(1);
        }
        if (this.obj[1]) {
          this.obj[1] += len;
        } else {
          this.obj[1] = len;
        }
        this.arr = [...this.arr];
        this.obj = { ...this.obj };
      }
      this.running = false;
    },
    update() {
      for (let i = 0; i < this.arr.length; ) {
        if (
          this.arr[i + 1] &&
          Math.random() <
            1 / (this.arr[i] * this.arr[i] + this.arr[i + 1] * this.arr[i + 1])
        ) {
          const n = this.arr[i] + this.arr[i + 1];
          this.obj[this.arr[i]]--;
          this.obj[this.arr[i + 1]]--;
          if (this.obj[n]) {
            this.obj[n]++;
          } else {
            this.obj[n] = 1;
          }
          if (this.obj[this.arr[i]] === 0) {
            delete this.obj[this.arr[i]];
          }
          if (this.obj[this.arr[i + 1]] === 0) {
            delete this.obj[this.arr[i + 1]];
          }
          this.arr[i] = n;
          this.arr.splice(i + 1, 1);
          i++;
        } else {
          i += 2;
        }
      }
      this.arr = [...this.arr];
      this.obj = { ...this.obj };
      localStorage.setItem("ysjh", JSON.stringify(this.arr));
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
table {
  border-collapse: collapse;
  tr {
    td {
      border: 1px solid #000;
      padding: 5px;
      width: 100px;
    }
  }
}
li {
  display: flex;
  dd {
    width: 100px;
    margin-left: 0;
  }
}
</style>
