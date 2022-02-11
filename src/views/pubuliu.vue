<template>
  <div class="pubuliu">
    <button @click="add">增加</button>
    <div class="list" v-infinite-scroll="add">
      <dl v-for="(col, c) in list" :key="c">
        <dd
          class="cell"
          v-for="(cell, j) in col.list"
          :key="`${c}-${j}`"
          :style="{ width: cell.width + 'px', height: cell.height + 'px' }"
        ></dd>
      </dl>
    </div>
    <div class="templist">
      <dd
        class="cell"
        ref="tempCell"
        v-for="cell in tempList"
        :key="cell.num"
        :style="{ width: cell.width + 'px', height: cell.height + 'px' }"
      ></dd>
    </div>
  </div>
</template>

<script>
let num = 1;
export default {
  data() {
    const n = 5;
    const list = [];
    for (let i = 0; i < n; i++) {
      list.push({
        list: [],
        height: 0,
      });
    }
    return {
      tempList: [],
      list,
    };
  },
  methods: {
    add() {
      const arr = this.getList();
      this.tempList = [...arr];
      this.$nextTick(() => {
        this.$refs.tempCell.forEach((item, i) => {
          console.log(item.offsetHeight, i);
          let minIndex = 0,
            minHeight = this.list[0].height;
          for (let n = 1; n < this.list.length; n++) {
            if (this.list[n].height < minHeight) {
              minHeight = this.list[n].height;
              minIndex = n;
            }
          }
          this.list[minIndex].height += item.offsetHeight;
          this.list[minIndex].list.push(this.tempList[i]);
        });
        this.tempList = [];
      });
    },
    getList() {
      const arr = [];
      for (let i = 0; i < 20; i++) {
        arr.push({
          width: 100,
          height: Math.floor(Math.random() * 150 + 50),
          num: num++,
        });
      }
      return arr;
    },
  },
};
</script>

<style lang="scss" scoped>
.pubuliu {
  .list {
    width: 600px;
    display: flex;
    height: 100vh;
    overflow: auto;
  }
  .cell {
    width: 100px;
    background-color: blue;
    border: 1px solid black;
    box-sizing: border-box;
  }
}
</style>
