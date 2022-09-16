<template>
  <div class="rb-tree-page">
    71, 88, 80, 90, 89, 91, 66, 101, 150, 130, 166
    <el-input v-model="value" clearable @keyup.native.enter="save" />
    <rb-tree
      style="position: relative"
      v-if="rbTree.root"
      :node="rbTree.root"
      :x="530"
      :y="20"
    />
  </div>
</template>
<script>
import { RBTree } from "./RbTree";
import rbTree from "./rbTree.vue";
export default {
  components: { rbTree },
  name: "RbTreePage",
  data() {
    return {
      rbTree: new RBTree(),
      value: "",
    };
  },
  methods: {
    save() {
      null.a();
      if (this.value) {
        this.value.split(/[^\d]+/).forEach((el) => {
          if (el) {
            this.rbTree.addNode(+el);
          }
        });
        this.value = "";
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.rb-tree-page {
}
</style>
