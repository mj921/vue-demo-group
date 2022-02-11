<template>
  <div><slot :row="{}"></slot></div>
</template>

<script>
export default {
  name: "DTableColumn",
  mounted() {
    console.log(this.$parent.$refs, this.$parent.$refs.hideColumns);
    const children = this.$parent.$refs.hideColumns.children;
    const columnConfig = {};
    this.$parent.insertColumn(children.indexOf(this.$el), columnConfig);
  },
};
</script>

<style></style>
