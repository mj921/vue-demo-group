<template>
  <div>
    <div style="display: none" ref="hideColumns"><slot></slot></div>
  </div>
</template>

<script>
export default {
  name: "DTable",
  data() {
    return {
      columnConfigs: [],
    };
  },
  methods: {
    insertColumn(index, columnConfig) {
      this.columnConfigs.splice(index, 0, columnConfig);
    },
  },
};
</script>

<style></style>
