<template>
  <div class="shengwu">
    <s-w-tree :data="shengwu" />
    <add-s-w v-model="addVisible" @save="addSave" />
  </div>
</template>

<script>
import AddSW from "../components/addSW.vue";
import sWTree from "../components/sWTree.vue";
import shengwu from "./shengwu";
export default {
  components: { sWTree, AddSW },
  data() {
    const swStr = localStorage.getItem("shengwu");
    let sw = [];
    if (swStr) {
      try {
        sw = JSON.parse(swStr);
      } catch (e) {
        sw = [...shengwu];
      }
    } else {
      sw = [...shengwu];
    }
    return {
      shengwu: {
        name: "生物",
        children: [...sw],
      },
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
        localStorage.setItem("shengwu", JSON.stringify(this.shengwu.children));
      }
      this.addVisible = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.shengwu {
  width: 2000px;
}
</style>
