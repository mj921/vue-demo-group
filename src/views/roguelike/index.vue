<template>
  <div>
    <game-menu v-if="scene === 'menu'" @start="start" />
    <game-main v-if="scene === 'game'" @backMenu="backMenu" />
  </div>
</template>
<script>
import GameMain from "./components/GameMain.vue";
import GameMenu from "./components/GameMenu.vue";

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
  },
};
</script>
<style lang="scss" scoped></style>
