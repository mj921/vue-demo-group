<template>
  <div>
    <el-button type="primary" size="default" @click="add">添加</el-button>
    <!-- <list-set-child-demo :list="list" /> -->
    <el-input v-model="obj.a.name" @blur="blur(obj.a)"></el-input
    >{{ obj.a.name1 }}
    <el-input v-model="list[0].name" @blur="blur(list[0])"></el-input
    >{{ list[0].name1 }}
    <button
      @click="
        c1;
        c2;
      "
    >
      aa
    </button>
  </div>
</template>

<script>
// import listSetChildDemo from "../components/listSetChildDemo.vue";
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
    };
  },
  methods: {
    add() {
      this.list.push({
        key: Math.random(),
        name: "",
        date: "",
      });
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
};
</script>

<style></style>
