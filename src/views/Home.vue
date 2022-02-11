<template>
  <div class="home">
    <router-link
      class="url"
      v-for="(route, index) in routes"
      :key="index"
      :to="route.path"
      >{{ (route.meta && route.meta.title) || route.name }}</router-link
    >
  </div>
</template>

<script>
// @ is an alias to /src
import router from "../router";
export default {
  name: "Home",
  data() {
    return {
      routes: router.myRoutes.reduce((arr, el) => {
        if (el.homeShow) {
          arr.push({
            path: el.path,
            name: (el.meta && el.meta.title) || el.name,
          });
        }
        return arr;
      }, []),
    };
  },
};
</script>
<style lang="scss" scoped>
a {
  margin: 10px;
}
</style>
