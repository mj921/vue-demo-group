import Vue from "vue";

const bus = new Vue({
  data() {
    return {
      num: 0,
    };
  },
  methods: {
    add() {
      this.num++;
    },
  },
});

export default bus;
