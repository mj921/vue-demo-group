<template>
  <div class="about">
    <h1>This is an about page</h1>
    <el-button type="primary" size="default" @click="add">add</el-button>
    {{ num }}
    <router-link to="/">home</router-link>
  </div>
</template>
<script>
import bus from "@/util/bus";
export default {
  computed: {
    num() {
      return bus.num;
    },
  },
  methods: {
    add() {
      bus.add();
    },
  },
};
</script>
<style lang="scss" scoped>
.about {
  color: #999900;
}
</style>
