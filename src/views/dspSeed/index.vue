<template>
  <div>111</div>
</template>
<script>
import DSPSeedSearch from "./lib/DSPSeedSearch";
export default {
  name: "DspSeed",
  created() {
    new DSPSeedSearch(12345678, 1);
  },
};
</script>
<style lang="scss" scoped></style>
