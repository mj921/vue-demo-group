<template>
  <div>
    <el-button type="primary" size="default" @click="clearAll">
      清除所有缓存
    </el-button>
    <el-input
      v-model="name"
      placeholder="缓存key"
      size="normal"
      clearable
    ></el-input>

    <el-button type="primary" size="default" @click="clearStore">
      清除缓存
    </el-button>
  </div>
</template>
<script>
export default {
  name: "ClearStore",
  data() {
    return {
      name: "",
    };
  },
  methods: {
    clearAll() {
      localStorage.clear();
    },
    clearStore() {
      if (this.name) {
        localStorage.removeItem(this.name);
      }
    },
  },
};
</script>
<style lang="scss" scoped></style>
