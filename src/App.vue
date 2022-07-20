<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  created() {
    window.onerror = (...args) => {
      console.log("onerror");
      console.log(args);
    };
    window.addEventListener("error", (...args) => {
      console.log("error");
      console.log(args);
    });
  },
};
</script>

<style lang="scss"></style>
