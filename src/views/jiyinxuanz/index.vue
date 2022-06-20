<template>
  <div>
    <div class="row">
      <span v-for="key in Object.keys(max)" :key="`${key}-max`">
        {{ key }}：{{ max[key][0].toFixed(5) }} {{ max[key][1] }}
      </span>
    </div>
    <div class="row">
      <span v-for="key in Object.keys(min)" :key="`${key}-min`">
        {{ key }}：{{ min[key][0].toFixed(5) }} {{ min[key][1] }}
      </span>
    </div>
    <ul>
      <li v-for="(item, i) in treeList" :key="i">
        <span v-for="key in Object.keys(item)" :key="`${key}-${i}`">
          {{ key }}：{{
            typeof item[key] === "number" ? item[key].toFixed(5) : item[key]
          }}
        </span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: 1,
      treeList: [],
      max: {
        height: [1, 1],
        xishui: [10, 1],
        baseHeight: [1, 1],
        baseXishui: [1, 1],
        xishuiAdd: [1, 1],
        heightAdd: [1, 1],
        maxAge: [100, 1],
        age: [1, 1],
        size: [100, 1],
      },
      min: {
        height: [1, 1],
        xishui: [10, 1],
        baseHeight: [1, 1],
        baseXishui: [1, 1],
        xishuiAdd: [1, 1],
        heightAdd: [1, 1],
        maxAge: [100, 1],
        age: [1, 1],
        size: [100, 1],
      },
    };
  },
  methods: {
    update() {
      this.treeList.forEach((item) => {
        if (item.death) return;
        item.currSize = Math.min(item.currSize + item.xishui, item.size);
        if (item.currSize < item.height) {
          item.currSize = 0;
          item.death = true;
        } else {
          item.currSize -= item.height;
          item.height += item.heightAdd;
          item.xishui += item.xishuiAdd;
          item.age++;
        }
        if (item.age > item.maxAge) {
          item.death = true;
        } else if (item.age === item.nextGetChildAge) {
          this.createChild(item);
          item.nextGetChildAge += (item.getChildNum + 2) * 18;
        }
      });
      this.treeList = this.treeList.filter((item) => {
        if (item.death) {
          Object.keys(this.max).forEach((key) => {
            if (this.max[key][0] < item[key]) {
              this.max[key][0] = item[key];
              this.max[key][1] = item.id;
            }
          });
          Object.keys(this.min).forEach((key) => {
            if (this.min[key][0] > item[key]) {
              this.min[key][0] = item[key];
              this.min[key][1] = item.id;
            }
          });
        }
        return !item.death;
      });
      setTimeout(this.update, 100);
    },
    createChild(tree) {
      for (let i = 0; i < tree.height; i += 50) {
        const size = 0.1;
        const rate = tree.height / tree.age;
        const baseHeight =
          tree.baseHeight *
          Math.max(0.1, Math.random() * size * 2 + rate - size);
        const baseXishui =
          tree.baseXishui *
          Math.max(0.1, Math.random() * size * 2 + rate - size);
        this.treeList.push({
          id: this.id++,
          baseXishui,
          xishui: baseXishui,
          xishuiAdd:
            tree.xishuiAdd *
            Math.max(0.1, Math.random() * size * 2 + rate - size),
          baseHeight,
          height: baseHeight,
          heightAdd:
            tree.heightAdd *
            Math.max(0.1, Math.random() * size * 2 + rate - size),
          size:
            tree.size * Math.max(0.1, Math.random() * size * 2 + rate - size),
          currSize: 0,
          age: 1,
          maxAge:
            tree.maxAge * Math.max(0.1, Math.random() * size * 2 + rate - size),
          getChildNum: 0,
          nextGetChildAge: 18,
        });
        if (this.treeList.length > 100) return;
      }
    },
    init() {
      this.treeList = [];
      for (let i = 0; i < 5; i++) {
        const size = 0.1;
        const rate = 1;
        const baseHeight =
          1 * Math.max(0.1, Math.random() * size * 2 + rate - size);
        const baseXishui =
          10 * Math.max(0.1, Math.random() * size * 2 + rate - size);
        this.treeList.push({
          id: this.id++,
          baseXishui,
          xishui: baseXishui,
          xishuiAdd:
            0.1 * Math.max(0.1, Math.random() * size * 2 + rate - size),
          baseHeight,
          height: baseHeight,
          heightAdd: 1 * Math.max(0.1, Math.random() * size * 2 + rate - size),
          size: 100 * Math.max(0.1, Math.random() * size * 2 + rate - size),
          currSize: 0,
          age: 1,
          maxAge: 100 * Math.max(0.1, Math.random() * size * 2 + rate - size),
          getChildNum: 0,
          nextGetChildAge: 18,
        });
      }
    },
  },
  created() {
    this.init();
    this.update();
  },
};
</script>
<style lang="scss" scoped>
.row {
  display: flex;
  justify-content: space-between;
  span {
    margin: 10px;
  }
}
</style>
