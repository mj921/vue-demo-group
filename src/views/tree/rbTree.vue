<template>
  <div class="rb-tree" v-if="node">
    <div class="rbtree-value" :style="{ backgroundColor: node.color }">
      {{ node.value }}
    </div>
    <div class="rbtree-children">
      <div class="rbtree-left">
        <rb-tree :node="node.left" :key="node.value" :x="x - 75" :y="y + 75" />
      </div>
      <div class="rbtree-right">
        <rb-tree :node="node.right" :key="node.value" :x="x + 75" :y="y + 75" />
      </div>
    </div>
  </div>
</template>
<script>
import { RBNode } from "./RbTree";
export default {
  name: "RbTree",
  props: {
    node: {
      type: RBNode,
      default: null,
    },
    x: {
      type: Number,
      default: 0,
    },
    y: {
      type: Number,
      default: 0,
    },
  },
};
</script>
<style lang="scss" scoped>
.rb-tree {
  display: flex;
  flex-direction: column;
  align-items: center;
  .rbtree-value {
    width: 50px;
    height: 50px;
    border-radius: 25px;
    text-align: center;
    line-height: 50px;
    font-size: 18px;
    border: 1px solid #eee;
    color: #fff;
  }
  .rbtree-children {
    display: flex;
    width: 100%;
    .rbtree-left,
    .rbtree-right {
      flex-grow: 1;
    }
  }
}
</style>
