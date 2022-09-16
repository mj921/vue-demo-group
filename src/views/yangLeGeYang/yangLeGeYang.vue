<template>
  <div>
    <div
      :style="{
        position: 'relative',
        height: '100vh',
        fontSize: '16px',
      }"
    >
      <div
        v-for="{ x, y, z, type, id, hideUp } in blockList"
        :key="id"
        :style="{
          position: 'absolute',
          left: `${x}px`,
          top: `${y}px`,
          width: `${BLOCK_SIZE - 1}px`,
          height: `${BLOCK_SIZE - 1 + 5}px`,
          backgroundColor: '#eee',
          margin: '1px 1px 0 0',
          borderRadius: '4px',
          boxSizing: 'border-box',
          border: '1px solid #999',
          zIndex: z,
          overflow: 'hidden',
          paddingBottom: '5px',
        }"
        @click="selectBlock(id)"
      >
        <svg
          class="icon svg-icon"
          :style="{ width: '100%', height: '100%', backgroundColor: '#fff' }"
          aria-hidden="true"
        >
          <use :xlink:href="`#icon-${type}`"></use>
        </svg>
        <div
          :style="{
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundColor: hideUp.length
              ? 'rgba(0, 0, 0, 0.5)'
              : 'transparent',
          }"
        ></div>
      </div>
      <div
        :style="{
          position: 'absolute',
          bottom: '10px',
          width: 7 * BLOCK_SIZE + 2 + 'px',
          height: BLOCK_SIZE + 2 + 'px',
          border: '1px solid #999',
          display: 'flex',
        }"
      >
        <div
          v-for="{ id, type } in selectList"
          :key="'select' + id"
          :style="{
            width: `${BLOCK_SIZE - 1}px`,
            height: `${BLOCK_SIZE - 1}px`,
            backgroundColor: '#fff',
            margin: '1px 1px 0 0',
            borderRadius: '4px',
            boxSizing: 'border-box',
            border: '1px solid #999',
          }"
        >
          <svg
            class="icon svg-icon"
            :style="{ width: '100%', height: '100%' }"
            aria-hidden="true"
          >
            <use :xlink:href="`#icon-${type}`"></use>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "./iconfont.js";

export default {
  data() {
    return {
      BLOCK_SIZE: 50,
      TYPE_LIST: [
        "xihongshi",
        "boluo",
        "ningmengpian",
        "xigua",
        "ningmeng",
        "chengzi",
        "putao",
        "yingtao",
        "lajiao",
        "huanggua",
        "pingguo",
        "tizi",
        "shanzhu",
        "mangguo",
        "caomei",
        "tudou",
        "hamigua",
        "huolongguo",
        "niuyouguo",
      ],
      gameStatus: "play",
      blockList: [],
      selectList: [],
    };
  },
  methods: {
    createBlockList() {
      this.selectList = [];
      let id = 1;
      const list = [];
      const levelList = [];
      const map = {};
      /** 层数 */
      const LEFT_COUNT = 6;
      for (let i = 0; i < LEFT_COUNT; i++) {
        levelList.push([]);
        for (let x = 0; x < i + 2; x++) {
          for (let y = 0; y < i + 2; y++) {
            const item = {
              id: id++,
              x: (this.BLOCK_SIZE / 2) * (LEFT_COUNT - i) + x * this.BLOCK_SIZE,
              y: (this.BLOCK_SIZE / 2) * (LEFT_COUNT - i) + y * this.BLOCK_SIZE,
              z: i + 1,
              hideDown: [],
              hideUp: [],
              type: "",
            };
            list.push(item);
            levelList[i].push(item);
            map[`id${item.id}`] = item;
          }
        }
      }
      levelList.push([]);
      for (let x = 0; x < LEFT_COUNT + 2; x++) {
        for (let y = 0; y < LEFT_COUNT + 2; y++) {
          const item = {
            id: id++,
            x: x * this.BLOCK_SIZE,
            y: y * this.BLOCK_SIZE,
            z: LEFT_COUNT + 1,
            hideDown: [],
            hideUp: [],
            type: "",
          };
          list.push(item);
          levelList[LEFT_COUNT].push(item);
          map[`id${item.id}`] = item;
        }
      }
      for (let i = LEFT_COUNT - 1; i >= 0; i--) {
        levelList.push([]);
        for (let x = 0; x < i + 2; x++) {
          for (let y = 0; y < i + 2; y++) {
            const item = {
              id: id++,
              x: (this.BLOCK_SIZE / 2) * (LEFT_COUNT - i) + x * this.BLOCK_SIZE,
              y: (this.BLOCK_SIZE / 2) * (LEFT_COUNT - i) + y * this.BLOCK_SIZE,
              z: LEFT_COUNT * 2 - i + 1,
              hideDown: [],
              hideUp: [],
              type: "",
            };
            list.push(item);
            levelList[LEFT_COUNT * 2 - i].push(item);
            map[`id${item.id}`] = item;
          }
        }
      }

      levelList.slice(1).forEach((item, zIndex) => {
        item.forEach(({ x, y, hideDown, id }) => {
          for (let i = 0; i < levelList[zIndex].length; i++) {
            const { x: dx, y: dy, id: did, hideUp } = levelList[zIndex][i];
            const points = [
              [x, y],
              [x + this.BLOCK_SIZE, y],
              [x + this.BLOCK_SIZE, y + this.BLOCK_SIZE],
              [x, y + this.BLOCK_SIZE],
            ];
            if (
              points.some(
                ([sx, sy]) =>
                  sx > dx &&
                  sx < dx + this.BLOCK_SIZE &&
                  sy > dy &&
                  sy < dy + this.BLOCK_SIZE
              )
            ) {
              hideDown.push(did);
              hideUp.push(id);
            }
          }
        });
      });
      for (let i = 0; i < list.length / 3; i++) {
        const type = this.TYPE_LIST[
          Math.floor(Math.random() * this.TYPE_LIST.length)
        ];
        let j = 3;
        while (j-- > 0) {
          const putList = list.filter(
            (el) => !el.type && el.hideDown.length === 0
          );
          const item = putList[Math.floor(Math.random() * putList.length)];
          item.type = type;
          list.forEach((el) => {
            let iii = -1;
            if (
              el.hideDown.length &&
              (iii = el.hideDown.indexOf(item.id)) > -1
            ) {
              el.hideDown.splice(iii, 1);
            }
          });
        }
      }
      this.blockList = list;
    },
    selectBlock(id) {
      if (this.gameStatus === "gameover") return;
      const index = this.blockList.findIndex((el) => el.id === id);
      if (index > -1) {
        const item = this.blockList[index];
        if (item.hideUp.length > 0) return;
        const sIndex = this.selectList.findIndex((el) => el.type === item.type);
        if (sIndex > -1) {
          let countObj = { count: 0, list: [] };
          if (
            (countObj = this.selectList.reduce((obj, el, si) => {
              if (el.type === item.type) {
                obj.count++;
                obj.list.push(si);
              }
              return obj;
            }, countObj)).count >= 2
          ) {
            countObj.list.forEach((el, ci) => {
              this.selectList.splice(el - ci, 1);
            });
          } else {
            this.selectList.splice(sIndex, 0, item);
          }
        } else {
          this.selectList.push(item);
        }
        this.blockList.splice(index, 1);
        this.blockList.forEach((el) => {
          let iii = -1;
          if ((iii = el.hideUp.indexOf(item.id)) > -1) {
            el.hideUp.splice(iii, 1);
          }
        });
        if (this.selectList.length === 7) {
          this.gameStatus = "gameover";
          this.$nextTick(() => {
            setTimeout(() => {
              alert("游戏结束");
              this.createBlockList();
            });
          });
        }
      }
    },
  },
  mounted() {
    console.log(999);
    this.createBlockList();
  },
};
</script>
