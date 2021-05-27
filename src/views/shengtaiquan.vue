<template>
  <div>
    <ul>
      {{
        stat
      }}
      <li>t: {{ time }}</li>
      <li>rou: {{ rou.n }}</li>
      <li>su: {{ su.n }}</li>
      <li>cao: {{ cao.n }}</li>
      <li>shui: {{ shui }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rou: {
        n: 0,
        shiwu: 2,
        shui: 1,
      },
      su: {
        n: 0,
        shiwu: 2,
        shui: 1,
      },
      cao: {
        n: 2,
        shui: 0.5,
      },
      shui: 10,
      yu: {
        s: 0.5,
        m: 1,
        l: 2,
      },
      sto: null,
      time: 0,
      stat: {
        q: 0,
        s: 0,
        m: 0,
        l: 0,
      },
      lastT: null,
    };
  },
  methods: {
    update() {
      this.time++;
      let tianqi;
      switch (this.lastT) {
        case "m":
          tianqi = Math.random() < 0.7;
          break;
        case "l":
          tianqi = Math.random() < 0.9;
          break;
        case "q":
        case "s":
        default:
          tianqi = Math.random() < 0.5;
      }
      let n = 0;
      if (tianqi) {
        const rd = Math.random();
        let yuT;
        switch (this.lastT) {
          case "m":
            if (rd < 0.5) {
              yuT = "m";
            } else if (rd < 0.75) {
              yuT = "l";
            } else {
              yuT = "s";
            }
            break;
          case "l":
            if (rd < 0.5) {
              yuT = "l";
            } else if (rd < 0.8) {
              yuT = "m";
            } else {
              yuT = "s";
            }
            break;
          case "q":
            if (rd < 0.6) {
              yuT = "s";
            } else if (rd < 0.8) {
              yuT = "m";
            } else {
              yuT = "l";
            }
            break;
          case "s":
            if (rd < 0.4) {
              yuT = "s";
            } else if (rd < 0.7) {
              yuT = "m";
            } else {
              yuT = "l";
            }
            break;
          default:
            yuT = ["s", "m", "l"][Math.floor(rd * 3)];
        }
        this.stat[yuT]++;
        this.shui += this.yu[yuT] * this.cao.n;
        const map = {
          s: 0.1,
          m: 0.07,
          l: 0.05,
        };
        for (let i = 0, len = this.cao.n; i < len; i++) {
          if (Math.random() < map[yuT]) {
            this.cao.n++;
          }
        }
      } else {
        this.stat.q++;
        if (this.shui > this.cao.n * 0.1) {
          this.shui -= this.cao.n * 0.1;
          if (this.shui > this.cao.n * this.cao.shui) {
            this.shui -= this.cao.n * this.cao.shui;
            for (let i = 0, len = this.cao.n; i < len; i++) {
              if (Math.random() < 0.2) {
                this.cao.n++;
              }
            }
          } else {
            n = Math.floor(this.shui / this.cao.shui);
            console.log(n, this.shui);
            this.cao.n = n;
            this.shui -= this.cao.n * this.cao.shui;
          }
        } else {
          this.shui = 0;
          this.cao.n = 0;
        }
      }
    },
    loop() {
      this.update();
      if (this.cao.n > 0) {
        this.sto = setTimeout(this.loop, 1000);
      }
    },
  },
  mounted() {
    this.loop();
  },
};
</script>

<style></style>
