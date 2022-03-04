<template>
  <div>
    <button @click="start">开始</button>
  </div>
</template>
<script>
export default {
  name: "GameMenu",
  methods: {
    start() {
      this.$emit("start");
    },
  },
};
</script>
<style lang="scss" scoped></style>
