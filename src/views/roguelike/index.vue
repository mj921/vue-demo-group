<template>
  <div>
    <game-menu v-if="scene === 'menu'" @start="start" />
    <game-main v-if="scene === 'game'" @backMenu="backMenu" />
    <button @click="add">add</button>
  </div>
</template>
<script>
import GameMain from "./components/GameMain.vue";
import GameMenu from "./components/GameMenu.vue";
import { parseCondition, executeCondition } from "./class/ExpressionUtil";

export default {
  components: { GameMain, GameMenu },
  name: "Roguelike",
  data() {
    return {
      scene: "menu",
    };
  },
  methods: {
    start() {
      this.scene = "game";
    },
    backMenu() {
      this.scene = "menu";
    },
    add() {
      const exp = "(hp/maxHp)<0.5";
      console.log(parseCondition(exp));
      console.log(executeCondition({ hp: 20, maxHp: 50 }, parseCondition(exp)));
    },
  },
};
</script>
<style lang="scss" scoped></style>
