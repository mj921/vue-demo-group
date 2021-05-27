<template>
  <div>
    <textarea v-model="content" name="" id="" cols="30" rows="10"></textarea>
    <div>{{ allzz }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: "",
    };
  },
  computed: {
    zz() {
      if (!this.content) return {};
      let obj = {};
      try {
        obj = JSON.parse(this.content);
      } catch (e) {
        console.log(e);
      }
      return {
        code: obj.id,
        heng: obj.patternsY.map((item) => item[0]),
        zuoxie: obj.patternsX.reverse().map((item) => item[0]),
        youxie: obj.patternsZ.map((item) => item[0]),
      };
    },
    allzz() {
      if (!this.content) return [];
      let arr = [];
      try {
        arr = JSON.parse(this.content);
      } catch (e) {
        console.log(e);
      }
      if (arr instanceof Array) {
        let list = [];
        arr.forEach((obj) => {
          if (obj.patternsZ) {
            list.push({
              name: obj.name,
              code: obj.id,
              heng: obj.patternsY.map((item) => item[0]),
              zuoxie: obj.patternsX.reverse().map((item) => item[0]),
              youxie: obj.patternsZ.map((item) => item[0]),
            });
          }
        });
        return list;
      } else {
        return [];
      }
    },
  },
};
</script>

<style></style>
