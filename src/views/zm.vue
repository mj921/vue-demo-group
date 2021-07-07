<template>
  <div>
    <el-switch
      v-model="danchuanFlag"
      :active-value="true"
      :inactive-value="false"
    >
      单
    </el-switch>
    <el-button type="primary" size="default" @click="update">一年</el-button>
    <el-button type="primary" size="default" @click="init">重置</el-button>
    {{ year }}
    <el-input v-model="y"></el-input>
    <el-button type="primary" size="default" @click="updateYear">多</el-button>
    <br />
    <template v-for="(item, i) in zm">
      <div :key="'maxLv' + i">
        maxLv: {{ item.maxLv }} currTotal: {{ item.total }} deathTotal:
        {{ item.death.reduce((a, b) => a + b, 0) }} daxianTotal:
        {{ item.daxian.reduce((a, b) => a + b, 0) }} allDeath:
        {{
          item.daxian.reduce((a, b) => a + b, 0) +
          item.death.reduce((a, b) => a + b, 0)
        }}
        total:
        {{
          item.daxian.reduce((a, b) => a + b, 0) +
          item.total +
          item.death.reduce((a, b) => a + b, 0)
        }}
      </div>
      <div :key="'jingjie' + i">
        jingjie:
        <span
          v-for="(jtem, j) in item.jingjieNum"
          :key="'jingjie' + i + '-' + j"
          :style="{
            marginLeft: '10px',
            color: jingjieColor[j % 7],
            fontWeight: jingjieColor[j] >= 7 ? 'bold' : 'normal',
            fontSize: jingjieColor[j] >= 7 ? '16px' : '14px',
          }"
          >{{ jtem }}</span
        >
      </div>
      <div :key="'death' + i">
        death:
        <span
          v-for="(jtem, j) in item.death"
          :key="'death' + i + '-' + j"
          :style="{
            marginLeft: '10px',
            color: jingjieColor[j % 7],
            fontWeight: jingjieColor[j] >= 7 ? 'bold' : 'normal',
            fontSize: jingjieColor[j] >= 7 ? '16px' : '14px',
          }"
          >{{ jtem }}</span
        >
      </div>
      <div :key="'daxian' + i">
        daxian:
        <span
          v-for="(jtem, j) in item.daxian"
          :key="'daxian' + i + '-' + j"
          :style="{
            marginLeft: '10px',
            color: jingjieColor[j % 7],
            fontWeight: jingjieColor[j] >= 7 ? 'bold' : 'normal',
            fontSize: jingjieColor[j] >= 7 ? '16px' : '14px',
          }"
          >{{ jtem }}</span
        >
      </div>
      <vd-tree
        :key="'zm' + i"
        :data="item.children"
        :render="renderTree"
        @on-select-change="showData"
      />
    </template>
  </div>
</template>

<script>
import { Tree } from "view-design";
export default {
  components: {
    VdTree: Tree,
  },
  data() {
    return {
      danchuanFlag: false,
      year: 1,
      childNum: 1,
      zm: [],
      jingjieColor: [
        "#000",
        "#5dd72b",
        "#3176df",
        "#dc31df",
        "#eddb07",
        "#ed0707",
        "#ed7c07",
      ],
      y: "",
      jingjie: [
        [
          {
            xp: 100,
            addAge: 10,
          },
          {
            xp: 200,
            addAge: 20,
          },
          {
            xp: 300,
            addAge: 30,
          },
        ],
        [
          {
            xp: 1000,
            addAge: 100,
          },
          {
            xp: 2000,
            addAge: 200,
          },
          {
            xp: 3000,
            addAge: 300,
          },
        ],
        [
          {
            xp: 10000,
            addAge: 1000,
          },
          {
            xp: 20000,
            addAge: 2000,
          },
          {
            xp: 30000,
            addAge: 3000,
          },
        ],
        [
          {
            xp: 100000,
            addAge: 10000,
          },
          {
            xp: 200000,
            addAge: 20000,
          },
          {
            xp: 300000,
            addAge: 30000,
          },
        ],
        [
          {
            xp: 1000000,
            addAge: 100000,
          },
          {
            xp: 2000000,
            addAge: 200000,
          },
          {
            xp: 3000000,
            addAge: 300000,
          },
        ],
        [
          {
            xp: 10000000,
            addAge: 1000000,
          },
          {
            xp: 20000000,
            addAge: 2000000,
          },
          {
            xp: 30000000,
            addAge: 3000000,
          },
        ],
        [
          {
            xp: 100000000,
            addAge: 10000000,
          },
          {
            xp: 200000000,
            addAge: 20000000,
          },
          {
            xp: 300000000,
            addAge: 30000000,
          },
        ],
        [
          {
            xp: 1000000000,
            addAge: 100000000,
          },
          {
            xp: 2000000000,
            addAge: 200000000,
          },
          {
            xp: 3000000000,
            addAge: 300000000,
          },
        ],
      ],
    };
  },
  methods: {
    showData(arr, data) {
      console.log(data);
    },
    getColor(obj) {
      if (obj.death) {
        return obj.dx ? "#aaa" : "#eee";
      } else {
        return this.jingjieColor[obj.jingjie[0] % 7];
      }
    },
    renderTree(h, { data }) {
      return h(
        "span",
        {
          style: {
            color: this.getColor(data),
            fontWeight: data.jingjie[0] > 7 ? "bold" : "normal",
            fontSize: data.jingjie[0] > 7 ? "16px" : "14px",
          },
        },
        `${data.name} ${data.jingjie.join("-")} 代：${data.lv} by: ${
          data.by
        } dy:${data.dy}`
      );
    },
    getRandom(range, min) {
      return Math.floor(Math.random() * range) + min;
    },
    updateYear() {
      if (+this.y > 0) {
        this.y = +this.y - 1;
        this.update();
        setTimeout(this.updateYear, 0);
      }
    },
    update() {
      console.log(`第${this.year}年`);
      this.zm.forEach((item) => {
        this.updateObj(item.children[0]);
      });
      this.year++;
    },
    updateObj(obj) {
      if (!obj.death) {
        obj.xp += obj.zizhi;
        obj.jingjieTime[obj.jingjieTime.length - 1]++;
        if (obj.xp >= obj.needXp) {
          if (
            Math.random() * 100 <
            obj.wuxing - (obj.jingjie[0] * 10 + obj.jingjie[1])
          ) {
            if (obj.jingjie[1] < 2) {
              obj.jingjie[1]++;
            } else {
              obj.jingjieTime.push(0);
              this.zm[obj.zm].jingjieNum[obj.jingjie[0]]--;
              obj.jingjie[0]++;
              obj.jingjie[1] = 0;
              if (this.zm[obj.zm].jingjieNum[obj.jingjie[0]]) {
                this.zm[obj.zm].jingjieNum[obj.jingjie[0]]++;
              } else {
                this.zm[obj.zm].jingjieNum[obj.jingjie[0]] = 1;
              }
            }
            console.log(
              `%c${obj.name}渡劫成功`,
              `color: ${
                obj.jingjie[1] ? "#000000" : this.jingjieColor[obj.jingjie[0]]
              };`
            );
            this.$set(obj, "jingjie", obj.jingjie);
            obj.needXp += this.jingjie[obj.jingjie[0]][obj.jingjie[1]].xp;
            obj.maxAge += Math.floor(
              (this.jingjie[obj.jingjie[0]][obj.jingjie[1]].addAge *
                (Math.random() * (100 - obj.wuxing) + obj.wuxing)) /
                100 /
                2 +
                Math.random() / 2
            );
          } else {
            if (
              Math.random() * (60 + obj.jingjie[0] * 10 + obj.jingjie[1]) <
              obj.rengxing
            ) {
              console.log(`${obj.name}渡劫失败`);
              obj.xp -=
                (this.jingjie[obj.jingjie[0]][obj.jingjie[1]].xp *
                  obj.rengxing) /
                100;
              let sbjj = [...obj.jingjie];
              if (sbjj[1] > 0) {
                sbjj[1]--;
              } else if (sbjj[0] > 0) {
                sbjj[0]--;
                sbjj[1] = 2;
              } else {
                sbjj = [0, 0];
              }
              obj.maxAge -= Math.floor(
                (((this.jingjie[sbjj[0]][sbjj[1]].addAge / 20) *
                  (100 + obj.jingjie[0] * 10 + obj.jingjie[1] - obj.rengxing)) /
                  100) *
                  Math.random()
              );
            } else {
              console.log(`${obj.name}%c渡劫死亡`, "color:#ff0000;");
              obj.dy = this.year;
              this.zm[obj.zm].total--;
              if (this.zm[obj.zm].death[obj.jingjie[0]]) {
                this.zm[obj.zm].death[obj.jingjie[0]]++;
              } else {
                this.zm[obj.zm].death[obj.jingjie[0]] = 1;
              }
              this.zm[obj.zm].jingjieNum[obj.jingjie[0]]--;
              obj.death = true;
            }
          }
        }
        this.$set(obj, "age", obj.age + 1);
        if (obj.age >= obj.maxAge) {
          console.log(`${obj.name}%c大限死亡`, "color:#ff0000;");
          obj.dy = this.year;
          obj.dx = true;
          this.zm[obj.zm].total--;
          if (this.zm[obj.zm].daxian[obj.jingjie[0]]) {
            this.zm[obj.zm].daxian[obj.jingjie[0]]++;
          } else {
            this.zm[obj.zm].daxian[obj.jingjie[0]] = 1;
          }
          this.zm[obj.zm].jingjieNum[obj.jingjie[0]]--;
          obj.death = true;
        }
      }
      if (
        (!this.danchuanFlag &&
          obj.jingjieTime[obj.jingjieTime.length - 1] %
            Math.floor(obj.needXp / 100) ===
            0 &&
          this.zm[obj.zm].total < 100 &&
          !obj.death &&
          obj.jingjie[0] > 0 &&
          obj.children.length < obj.jingjie[0] &&
          (obj.children.length === 0 || obj.children.every((o) => o.death))) ||
        (this.danchuanFlag &&
          this.zm[obj.zm].total === 1 &&
          obj.jingjie[0] > 0 &&
          !obj.death)
      ) {
        obj.children.push(this.createP(obj.zm, obj.lv + 1, obj.jingjie[0]));
      }
      obj.children.forEach((item) => {
        this.updateObj(item);
      });
    },
    createP(zm, lv = 1, parentJingjie = 0) {
      this.zm[zm].jingjieNum[0]++;
      this.zm[zm].total++;
      if (this.zm[zm].maxLv < lv) {
        this.zm[zm].maxLv = lv;
      }
      const obj = {
        name: `r${this.childNum++}`,
        maxAge: this.getRandom(50, 30),
        age: this.getRandom(5, 5),
        wuxing: this.getRandom(50, 50),
        zizhi: this.getRandom(Math.pow(10, parentJingjie + 1), 0),
        rengxing: this.getRandom(50, 50),
        jingjie: [0, 0],
        jingjieTime: [0],
        death: false,
        children: [],
        xp: 0,
        needXp: 100,
        zm,
        lv,
        by: this.year,
        dy: "",
        dx: false,
      };
      const r = Math.random();
      let wuxing, zizhi, rengxing;
      if (r > 0.9 || lv === 1) {
        wuxing = this.getRandom(25, 75);
        zizhi = this.getRandom(1000000, 0);
        rengxing = this.getRandom(25, 75);
        if (wuxing > obj.wuxing) {
          obj.wuxing = wuxing;
        }
        if (zizhi > obj.zizhi) {
          obj.zizhi = zizhi;
        }
        if (rengxing > obj.rengxing) {
          obj.rengxing = rengxing;
        }
      } else if (r < 0.1) {
        wuxing = this.getRandom(75, 25);
        zizhi = this.getRandom(60, 0);
        rengxing = this.getRandom(75, 25);
        if (wuxing < obj.wuxing) {
          obj.wuxing = wuxing;
        }
        if (zizhi < obj.zizhi) {
          obj.zizhi = zizhi;
        }
        if (rengxing < obj.rengxing) {
          obj.rengxing = rengxing;
        }
      }
      return obj;
    },
    init() {
      this.year = 1;
      this.childNum = 1;
      for (let i = 0; i < 3; i++) {
        this.zm.push({
          death: [],
          daxian: [],
          jingjieNum: [0],
          children: [],
          maxLv: 1,
          total: 0,
        });
        this.zm[i].children.push(this.createP(i));
      }
    },
  },
  created() {
    this.init();
  },
};
</script>

<style></style>
