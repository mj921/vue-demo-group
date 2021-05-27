<template>
  <div class="tree" v-if="data.name">
    <div class="tree-wrapper">
      <div
        class="tree-block"
        :class="{
          'has-children': data.children && data.children.length > 1,
        }"
      >
        <el-dropdown trigger="click" @command="command($event, data)">
          <span class="el-dropdown-link">
            {{ data.name }}
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item style="width: 40px" command="新增"
              >新增</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="tree-yl" v-if="data.children && data.children.length > 0">
      <div
        class="tree-children"
        :class="{ 'not-line': data.children.length <= 1 }"
        v-for="(item, i) in data.children"
        :key="i"
      >
        <s-w-tree :data="item" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SWTree",
  props: {
    data: Object,
  },
  data() {
    return {};
  },
  inject: ["add"],
  methods: {
    command(command, data) {
      switch (command) {
        case "新增":
          this.add(data);
          break;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.tree {
  display: flex;
  font-size: 12px;
  width: 100%;
  align-items: center;
  .tree-wrapper {
    padding: 5px;
    align-items: center;
    display: flex;
    .tree-block {
      border-radius: 5px;
      padding: 8px;
      line-height: 20px;
      border: 1px solid #000;
      img {
        width: 20px;
        height: 20px;
        vertical-align: top;
      }
      &.has-children {
        margin-right: 10px;
        position: relative;
        &::after {
          position: absolute;
          height: 1px;
          top: 50%;
          right: -13px;
          width: 10px;
          content: "";
          background-color: #000;
        }
      }
    }
  }
  .tree-yl {
    padding: 0 5px;
    display: flex;
    flex-direction: column;
    .tree-children {
      position: relative;
      padding-left: 8px;
      flex-shrink: 0;
      &::before {
        position: absolute;
        height: 1px;
        top: 50%;
        left: -4px;
        width: 10px;
        content: "";
        background-color: #000;
      }
      &::after {
        position: absolute;
        height: 100%;
        top: 0;
        left: -5px;
        width: 1px;
        content: "";
        background-color: #000;
      }
      &:first-child::after {
        top: 50%;
        height: 50%;
      }
      &:last-child::after {
        height: 50%;
      }
      &.not-line::after {
        display: none;
      }
    }
  }
}
</style>
