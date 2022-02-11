<template>
  <div class="tree" v-if="data" :class="{ vertical }">
    <div
      v-if="!onlyOne"
      class="top-h-line"
      :class="{ 'is-first': isFirst, 'is-last': isLast }"
    ></div>
    <div
      v-if="!isRoot"
      class="top-v-line"
      :style="{
        height: topLineHeight + 'px',
      }"
    >
      <div class="top-v-line-wrapper">
        <slot name="top" :node="data"></slot>
      </div>
    </div>
    <div
      class="tree-wrapper"
      :style="{
        paddingTop: topLineHeight + 'px',
        paddingBottom: bottomLineHeight + 'px',
      }"
    >
      <slot :node="data"></slot>
      <div
        class="bottom-v-line"
        v-if="data.children && data.children.length > 0"
        :style="{
          height: bottomLineHeight + 'px',
        }"
      ></div>
    </div>
    <div class="tree-children" v-if="data.children && data.children.length > 0">
      <div
        class="tree-child"
        :class="{ 'not-line': data.children.length <= 1 }"
        v-for="(item, i) in data.children"
        :key="i"
      >
        <tree
          :data="item"
          :vertical="vertical"
          :is-first="i === 0"
          :is-last="i === data.children.length - 1"
          :is-root="false"
          :top-line-height="topLineHeight"
          :bottom-line-height="bottomLineHeight"
          :only-one="data.children.length <= 1"
        >
          <template v-slot="{ node }">
            <slot :node="node"></slot>
          </template>
          <template v-slot:top="{ node }">
            <slot name="top" :node="node"></slot>
          </template>
        </tree>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tree",
  props: {
    data: Object,
    vertical: {
      type: Boolean,
      default: true,
    },
    isFirst: {
      type: Boolean,
      default: true,
    },
    isLast: {
      type: Boolean,
      default: true,
    },
    onlyOne: {
      type: Boolean,
      default: true,
    },
    isRoot: {
      type: Boolean,
      default: true,
    },
    topLineHeight: {
      type: Number,
      default: 20,
    },
    bottomLineHeight: {
      type: Number,
      default: 20,
    },
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.tree {
  font-size: 12px;
  align-items: center;
  display: inline-flex;
  flex-direction: column;
  width: auto;
  .top-h-line {
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
    height: 1px;
    content: "";
    background-color: #000;
    &.is-first {
      left: 50%;
      width: 50%;
    }
    &.is-last {
      height: 1px;
      width: 50%;
    }
  }
  .top-v-line {
    position: absolute;
    width: 1px;
    left: 50%;
    top: 0;
    height: 20px;
    content: "";
    background-color: #000;
    .top-v-line-wrapper {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .tree-wrapper {
    padding: 20px 5px;
    align-items: center;
    display: flex;
    justify-content: center;
    flex-grow: 1;
    position: relative;
    .bottom-v-line {
      position: absolute;
      content: "";
      width: 1px;
      right: auto;
      left: 50%;
      top: auto;
      bottom: 0;
      height: 20px;
      background-color: #000;
    }
  }
  .tree-children {
    flex-direction: row;
    display: inline-flex;
    .tree-child {
      position: relative;
      flex-shrink: 0;
    }
  }
}
</style>
