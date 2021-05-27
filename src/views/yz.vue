<template>
  <div class="yz">
    <div class="btn">
      <span @click="large">放大</span>
      <span @click="small">缩小</span>
    </div>
    <div class="xingxi" :style="{ transform: `scale(${scale})` }">
      <div
        class="hx"
        :style="{
          left: `calc(50vw - ${hx.r}px)`,
          top: `calc(50vh - ${hx.r}px)`,
          width: `${hx.r * 2}px`,
          height: `${hx.r * 2}px`,
        }"
      ></div>
      <div
        class="xx"
        v-for="(item, i) in xxList"
        :key="i"
        :style="{
          left: `calc(50vw - ${
            Math.cos((item.angle / 180) * Math.PI) * item.gdR + item.r
          }px)`,
          top: `calc(50vh - ${
            Math.sin((item.angle / 180) * Math.PI) * item.gdR + item.r
          }px)`,
          width: `${item.r * 2}px`,
          height: `${item.r * 2}px`,
        }"
      ></div>
      <div
        class="gd"
        v-for="(item, i) in xxList"
        :key="'gd' + i"
        :style="{
          left: `calc(50vw - ${item.gdR}px)`,
          top: `calc(50vh - ${item.gdR}px)`,
          width: `${item.gdR * 2}px`,
          height: `${item.gdR * 2}px`,
        }"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    const hx = {
      // r: Math.floor(Math.random() * 84) + 16,
      r: 100,
    };
    const xxList = [
      {
        angle: Math.floor(360 * Math.random()),
        gdR: 155,
        r: 2.4,
        speed: 360 / 88,
      },
      {
        angle: Math.floor(360 * Math.random()),
        gdR: 289,
        r: 6,
        speed: 360 / 243,
      },
      {
        angle: Math.floor(360 * Math.random()),
        gdR: 400,
        r: 6.3,
        speed: 360 / 365,
      },
      {
        angle: Math.floor(360 * Math.random()),
        gdR: 600,
        r: 3.3,
        speed: 360 / 687,
      },
      {
        angle: Math.floor(360 * Math.random()),
        gdR: 2080,
        r: 69.9,
        speed: 360 / 4329,
      },
      {
        angle: Math.floor(360 * Math.random()),
        gdR: 3833,
        r: 58.2,
        speed: 360 / 10752,
      },
      {
        angle: Math.floor(360 * Math.random()),
        gdR: 7687,
        r: 25.3,
        speed: 360 / 30667,
      },
      {
        angle: Math.floor(360 * Math.random()),
        gdR: 12028,
        r: 24.6,
        speed: 360 / 60152,
      },
    ];
    // for (let i = 0; i < 8; i++) {
    //   const gdR =
    //     i === 0
    //       ? Math.floor(300 * Math.random()) + 100 + hx.r
    //       : Math.floor(300 * Math.random()) + 100 + xxList[i - 1].gdR;
    //   xxList.push({
    //     angle: Math.floor(360 * Math.random()),
    //     gdR,
    //     r: Math.floor(Math.random() * 18) + 4,
    //     speed: (200 / gdR) * (0.5 + Math.random()),
    //   });
    // }
    return {
      hx,
      xxList,
      sto: null,
      scale: 1,
    };
  },
  methods: {
    loop() {
      this.xxList.forEach((item) => {
        this.$set(item, "angle", (item.angle + item.speed) % 360);
      });
      this.sto = setTimeout(this.loop, 1000 / 60);
    },
    large() {
      if (this.scale < 0.08) {
        this.scale *= 2;
      } else {
        this.scale += 0.1;
      }
    },
    small() {
      if (this.scale < 0.15) {
        this.scale *= 0.5;
      } else {
        this.scale -= 0.1;
      }
    },
  },
  mounted() {
    this.loop();
  },
};
</script>

<style lang="scss" scoped>
.yz {
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: #000;
}
.gd {
  position: absolute;
  border: 1px solid rgba($color: #fff, $alpha: 0.5);
  border-radius: 50%;
  box-sizing: border-box;
}
.xingxi {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
.hx {
  position: absolute;
  left: calc(50vw - 16px);
  top: calc(50vh - 16px);
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: red;
  &.hx-big {
    left: calc(50vw - 400px);
    top: calc(50vh - 400px);
    width: 800px;
    height: 800px;
  }
}
.xx {
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: #fff;
}
.xx-big {
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #fff;
}
.btn {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 99999999;
}
</style>
<style>
/* body {
  background-color: #000;
} */
</style>
