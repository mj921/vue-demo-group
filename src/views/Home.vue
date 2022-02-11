<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <el-button type="primary" size="default" @click="add">add</el-button>
    {{ num }}
    <router-link to="/about">about</router-link>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import bus from "@/util/bus.js";
export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  computed: {
    num() {
      return bus.num;
    },
  },
  inject: ["a"],
  methods: {
    add() {
      console.log(this);
      bus.add();
    },
  },
};
</script>
