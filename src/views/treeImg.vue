<template>
  <div>
    <tree :data="data" :bottom-line-height="30" :top-line-height="30">
      <template v-slot:top="{ node }">
        <div class="line-wrapper" v-if="node && node.type === 2">
          <div>{{ node.num }}%</div>
        </div>
      </template>
      <template v-slot="{ node }">
        <div class="node-wrapper">
          <div>{{ node.name }}</div>
          <i class="el-icon-circle-plus-outline" @click="add(node)"></i>
        </div>
      </template>
    </tree>
  </div>
</template>

<script>
import Tree from "@/components/tree.vue";
export default {
  components: {
    Tree,
  },
  data() {
    return {
      data: {
        name: "aaa",
        children: [],
        type: 1,
      },
    };
  },
  methods: {
    add(node) {
      if (!node.children) {
        this.$set(node, "children", []);
      }
      const type = ~~(Math.random() * 2) + 2;
      node.children.push({
        name: Number(Math.random()).toString(16).slice(3, 8),
        children: [],
        type,
        num: type === 2 ? ~~(Math.random() * 100) : undefined,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.node-wrapper {
  width: 100px;
  height: 50px;
  text-align: center;
  border: 1px solid #000;
  position: relative;
  .el-icon-circle-plus-outline {
    display: none;
    position: absolute;
    top: calc(100% + 1px);
    left: 50%;
    font-size: 16px;
    transform: translateX(-50%);
    background-color: #fff;
    color: blue;
    z-index: 1;
  }
  &:hover {
    .el-icon-circle-plus-outline {
      display: block;
    }
  }
}
.line-wrapper {
  background-color: #fff;
  line-height: 1em;
}
</style>
