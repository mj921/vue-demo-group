<template>
  <div class="game-main">
    <div class="cave-info">
      <span>{{ cave }}</span>
      <span>{{ (time / 1000).toFixed(2) }}</span>
    </div>
    <div class="info">
      <dl>
        <label for="">攻击</label>
        <span>{{ status === "battle" ? enemy.currProps.atk : enemy.atk }}</span>
      </dl>
      <dl>
        <label for="">暴击</label>
        <span>{{ status === "battle" ? enemy.currProps.cir : enemy.cir }}</span>
      </dl>
      <dl>
        <label for="">闪避</label>
        <span>
          {{ status === "battle" ? enemy.currProps.dodge : enemy.dodge }}
        </span>
      </dl>
      <num-disappear ref="enemyNumDisappear" />
    </div>
    <hp-bar
      :curr="(enemy && enemy.currProps && enemy.currProps.hp) || 0"
      :max="(enemy && enemy.currProps && enemy.currProps.maxHp) || 0"
    />
    <skill-options
      :skills="skillOptions"
      v-model="skillOptionVisible"
      @select="selectSkill"
    />
    <el-button
      v-show="status === 'waitBattle'"
      type="primary"
      size="default"
      @click="createBattlefield"
    >
      战斗
    </el-button>
    <div class="info">
      <dl>
        <label for="">攻击</label>
        <span>
          {{ status === "battle" ? player.currProps.atk : player.atk }}
        </span>
      </dl>
      <dl>
        <label for="">暴击</label>
        <span>
          {{ status === "battle" ? player.currProps.cir : player.cir }}
        </span>
      </dl>
      <dl>
        <label for="">闪避</label>
        <span>
          {{ status === "battle" ? player.currProps.dodge : player.dodge }}
        </span>
      </dl>
      <num-disappear ref="playerNumDisappear" />
    </div>
    <hp-bar
      :curr="
        (player && player.currProps && player.currProps.hp) || player.hp || 0
      "
      :max="
        (player && player.currProps && player.currProps.maxHp) || player.hp || 0
      "
    />
    <el-button type="primary" size="default" @click="backMenu">
      菜单
    </el-button>
  </div>
</template>
<script>
import Charater from "../class/Character";
import HpBar from "./HpBar.vue";
import NumDisappear from "./NumDisappear.vue";
import SkillOptions from "./SkillOptions.vue";

export default {
  components: { HpBar, SkillOptions, NumDisappear },
  name: "GameMain",
  data() {
    return {
      cave: 1,
      time: 0,
      player: new Charater(),
      enemy: null,
      skillOptions: [],
      skillOptionVisible: false,
      status: "selectOption",
      loopTime: 50,
      sto: null,
    };
  },
  methods: {
    caveReset() {
      this.showSkillOptions();
      this.cave++;
      this.time = 0;
    },
    createEnemy() {
      this.enemy = Charater.create(1);
      this.enemy.on("record", (record) => {
        this.$refs.enemyNumDisappear.addNum({
          num: record.numStr,
          color:
            record.recordType === Charater.RecordType.DAMAGE ? "blue" : "green",
        });
      });
    },
    createBattlefield() {
      this.player.createBattleProps(this.enemy);
      this.enemy.createBattleProps(this.player);
      this.status = "battle";
      const effectResult = this.effectLoop();
      if (effectResult) return;
      this.sto = setTimeout(() => {
        this.loop();
      }, this.loopTime);
    },
    showSkillOptions() {
      this.status = "selectOption";
      this.skillOptions = this.player.getSkillOptions();
      this.skillOptionVisible = true;
    },
    selectSkill(skill) {
      this.skillOptions = [];
      this.player.obtainSkill(skill);
      this.status = "waitBattle";
    },
    effectLoop() {
      this.player.triggerEffect(this.enemy, this.time, this.loopTime);
      if (this.enemy.currProps.hp <= 0) {
        this.caveReset();
        return "win";
      }

      this.enemy.triggerEffect(this.player, this.time, this.loopTime);
      if (this.player.currProps.hp <= 0) {
        return "lose";
      }
    },
    loop() {
      const now = new Date();
      this.time += this.loopTime;
      let i;

      const effectResult = this.effectLoop();
      if (effectResult) return;

      const playerAtkNum = this.player.getAtkNum(this.loopTime);
      for (i = 0; i < playerAtkNum; i++) {
        this.player.attack(this.enemy);
      }
      if (this.enemy.currProps.hp <= 0) {
        this.caveReset();
        return;
      }

      const enemyAtkNum = this.enemy.getAtkNum(this.loopTime);
      for (i = 0; i < enemyAtkNum; i++) {
        this.enemy.attack(this.player);
      }
      if (this.player.currProps.hp <= 0) {
        return;
      }

      this.sto = setTimeout(() => {
        this.loop();
      }, Math.max(this.loopTime - (new Date() - now), 0));
    },
    backMenu() {
      this.$emit("backMenu");
    },
  },
  created() {
    this.createEnemy();
    this.showSkillOptions();
  },
  mounted() {
    this.player.on("record", (record) => {
      this.$refs.playerNumDisappear.addNum({
        num: record.numStr,
        color:
          record.recordType === Charater.RecordType.DAMAGE ? "blue" : "green",
      });
    });
  },
};
</script>
<style lang="scss" scoped>
.game-main {
  .cave-info {
    display: flex;
    padding: 10px 0;
    position: relative;
    & > span {
      text-align: center;
      width: 20%;
    }
    .hp-bar {
      width: 60%;
    }
  }
  .info {
    position: relative;
    .num-disappear {
      position: absolute;
      width: 50%;
      height: 100%;
      top: 0;
      left: 25%;
    }
  }
}
</style>
