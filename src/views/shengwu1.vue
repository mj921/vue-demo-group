<template>
  <div class="shengwu">
    <s-w-tree :data="shengwu" />
    <add-s-w v-model="addVisible" @save="addSave" />
  </div>
</template>

<script>
import AddSW from "../components/addSW.vue";
import sWTree from "../components/sWTree.vue";
import shengwu from "./shengwu1";
export default {
  components: { sWTree, AddSW },
  data() {
    const swStr = localStorage.getItem("shengwu1");
    let sw = [];
    if (swStr) {
      try {
        sw = JSON.parse(swStr);
      } catch (e) {
        sw = shengwu[0];
      }
    } else {
      sw = shengwu[0];
    }
    return {
      shengwu: { ...sw },
      addVisible: false,
      addData: null,
    };
  },
  provide() {
    return {
      add: this.add,
    };
  },
  methods: {
    add(data) {
      console.log(data);
      this.addData = data;
      this.addVisible = true;
    },
    addSave(form) {
      console.log(form);
      if (this.addData) {
        if (this.addData.children) {
          this.addData.children.push({ ...form });
        } else {
          this.$set(this.addData, "children", [{ ...form }]);
        }
        localStorage.setItem("shengwu1", JSON.stringify(this.shengwu));
      }
      this.addVisible = false;
    },
    parse() {
      let arr = this.ddd
        .split("\n")
        .filter((item) => item !== "")
        .map((item) => {
          let level, name;
          if (/^#{1,3}\s/.test(item)) {
            level = item.match(/^(#{1,3})/)[0].length;
            name = item.replace(/^#{1,3}\s/, "");
          } else if (/^\t*-\s/.test(item)) {
            level = item.match(/^(\t*-)/)[0].length + 3;
            name = item.replace(/^\t*-\s/, "");
          }
          return {
            level,
            name,
          };
        });
      const list = [];
      const obj = {};
      arr.forEach((item) => {
        obj[item.level] = {
          name: item.name,
          children: [],
        };
        if (item.level > 1) {
          obj[item.level - 1].children.push(obj[item.level]);
        } else {
          list.push(obj[item.level]);
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.shengwu {
  width: 2000px;
}
</style>
