<template>
  <div class="video-edit">
    <canvas ref="canvas" width="300" height="200"></canvas>
    <video
      :src="video"
      ref="video"
      controls
      @loadedmetadata="loadedmetadata"
      @play="onPlay"
      :muted="muted"
      @ended="videoEnded"
    ></video>
  </div>
</template>
<script>
export default {
  name: "VideoEdit",
  data() {
    return {
      video: require("./videos/movie.mp4"),
      muted: true,
      canvas: null,
      ctx: null,
      sto: null,
      time: 0,
      list: [
        {
          timeStart: 1,
          timeEnd: 3,
        },
        {
          timeStart: 7,
          timeEnd: 11,
        },
      ],
      tempList: [],
    };
  },
  mounted() {
    this.canvas = this.$refs.canvas;
    this.ctx = this.canvas.getContext("2d");
  },
  methods: {
    draw() {
      const now = new Date();
      this.ctx.drawImage(this.$refs.video, 0, 0);
      if (this.tempList.length) {
        if (this.tempList[0].timeStart * 1000 <= this.time) {
          if (this.tempList[0].timeEnd * 1000 >= this.time) {
            this.ctx.fillStyle = "#ff0000";
            this.ctx.fillRect(50, 50, 100, 100);
          } else {
            this.tempList.shift();
          }
        }
      }
      this.time += 1000 / 60;
      this.sto = setTimeout(() => {
        this.draw();
      }, Math.max(0, 1000 / 60 - (new Date() - now)));
    },
    loadedmetadata(e) {
      console.log(e);
      console.dir(this.$refs.video);
      console.log(this.$refs.video.clientWidth);
      this.canvas.width = this.$refs.video.clientWidth;
      this.canvas.height = this.$refs.video.clientHeight;
      this.$refs.video.play();
    },
    onPlay() {
      this.time = 0;
      this.tempList = [...this.list];
      this.draw();
    },
    videoEnded() {
      clearTimeout(this.sto);
    },
  },
  beforeDestroy() {
    clearTimeout(this.sto);
  },
};
</script>
<style lang="scss" scoped>
.video-edit {
}
</style>
