<!-- eslint-disable no-dupe-keys -->
<template>
  <div>
    <el-button type="primary" size="default" @click="add">添加</el-button>
    <el-button type="primary" size="default" @click="aa.a1.a3">添加</el-button>
  </div>
</template>
<!-- eslint-disable no-dupe-keys -->
<script>
// import listSetChildDemo from "../components/listSetChildDemo.vue";
const aa = (f) => ({
  a1: {
    a2: 1,
    a3: f,
  },
});

export default {
  // components: { listSetChildDemo },
  data() {
    return {
      list: [
        {
          key: Math.random(),
          name: "",
          date: "",
        },
      ],
      obj: {
        a: {
          key: Math.random(),
          name: "",
          date: "",
        },
      },
      n: 0,
      aa: aa(this.add),
    };
  },
  methods: {
    add() {
      this.n++;
    },
    blur(item) {
      this.$set(item, "name1", item.name);
    },
    c1() {
      console.log("c1");
    },
    c2() {
      console.log("c2");
    },
  },
  watch: {
    n() {
      console.log("n11");
    },
    n() {
      console.log("n22");
    },
  },
};
</script>

<style></style>
