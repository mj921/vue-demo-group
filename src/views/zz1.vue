<template>
  <div class="zz">
    <div class="cells">
      <dl
        class="row"
        v-for="(row, i) in cells"
        :key="`row-${i}`"
        :style="{ paddingLeft: ((13 - row.length) * size) / 2 + 'px' }"
      >
        <dd class="cell" v-for="(cell, j) in row" :key="`cell-${i}-${j}`">
          <input
            :class="{ small: cell.val && cell.val.length > 1 }"
            @blur="iptBlur(cell)"
            type="text"
            v-model="cell.val"
          />
        </dd>
      </dl>
    </div>
    <div class="zzs">
      <div class="heng">
        <dl
          v-for="(item, i) in zz.heng"
          :key="`heng-${i}`"
          :style="{ marginRight: -((13 - cells[i].length) * size) / 2 + 'px' }"
        >
          {{ item }}
        </dl>
      </div>
      <div class="zuoxie">
        <dl
          v-for="(item, i) in zz.zuoxie"
          :key="`zuoxie-${i}`"
          :style="getZuoStyle(i)"
        >
          <i
            v-if="i >= 4"
            :style="{
              height: 30 * (i - 3) - 10 + 'px',
              top: '10px',
              left: '-25px',
            }"
          ></i>
          {{ item }}
        </dl>
      </div>
      <div class="youxie">
        <dl
          v-for="(item, i) in zz.youxie"
          :key="`youxie-${i}`"
          :style="getYouStyle(i)"
        >
          <i
            v-if="i <= 4"
            :style="{
              height: 30 * (3 - i) + 20 + 'px',
              top: -30 * (3 - i) - 10 + 'px',
              left: '-25px',
            }"
          ></i>
          {{ item }}
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
import zz from "./zz1";
export default {
  data() {
    let cells = [];
    const cellsStorage = localStorage.getItem("cells1");
    if (cellsStorage) {
      try {
        cells = JSON.parse(cellsStorage);
      } catch (e) {
        cells = [];
        for (let i = 5; i < 14; i++) {
          const arr = [];
          for (let j = 0, len = i < 10 ? i - 1 : 17 - i; j < len; j++) {
            arr.push({ i, j, val: "" });
          }
          cells.push(arr);
        }
      }
    } else {
      for (let i = 5; i < 14; i++) {
        const arr = [];
        for (let j = 0, len = i < 10 ? i - 1 : 17 - i; j < len; j++) {
          arr.push({ i, j, val: "" });
        }
        cells.push(arr);
      }
    }
    return {
      cells,
      size: 3.4641 * 10,
      zz,
    };
  },
  methods: {
    iptBlur(cell) {
      this.$set(cell, "val", (cell.val || "").toUpperCase());
      localStorage.setItem("cells1", JSON.stringify(this.cells));
    },
    getZuoStyle(i) {
      if (i >= 4) {
        return {
          left: this.size * (9 - i) + 20 + "px",
          top: 30 * (8 - i) + "px",
        };
      }
      return {
        left: this.size * ((9 - i) / 2 + 5) - 60 + "px",
        marginTop: (4 - i) * 30 - 20 + "px",
      };
    },
    getYouStyle(i) {
      if (i < 4) {
        return {
          left: this.size * (i + 1) + 10 + "px",
          top: 30 * (4 - i) - 20 + "px",
        };
      }
      return {
        left: this.size * ((i + 1) / 2 + 5) - 90 + "px",
        marginTop: (9 - i) * 30 - 190 + "px",
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.zz {
  position: relative;
  $baseLeft: 160px;
  $baseTop: 160px;
  .cells {
    position: absolute;
    $size: 10px;
    top: $baseTop;
    left: $baseLeft;
    @mixin rect {
      width: 3.4641 * $size;
      height: 2 * $size;
      border: 1px solid #000;
      box-sizing: border-box;
      border-top-color: transparent;
      border-bottom: transparent;
      margin: 0;
      padding: 0;
    }
    .row {
      display: flex;
      margin: 0;
      margin-bottom: 10px;
      .cell {
        position: relative;
        @include rect;
        &::before {
          @include rect;
          content: "";
          position: absolute;
          left: -1px;
          top: -1px;
          transform: rotate(60deg);
        }
        &::after {
          @include rect;
          content: "";
          position: absolute;
          left: -1px;
          top: -1px;
          transform: rotate(-60deg);
        }
        input {
          position: absolute;
          width: 100%;
          height: 100%;
          border: none;
          padding: 0;
          text-align: center;
          box-sizing: border-box;
          z-index: 1;
          outline: none;
          font-size: 14px;
          line-height: 20px;
          font-weight: bold;
          &.small {
            font-size: 12px;
            font-weight: normal;
          }
        }
      }
    }
  }
  .zzs {
    dl {
      font-size: 16px;
      line-height: 20px;
      white-space: nowrap;
    }
    .heng {
      position: absolute;
      top: $baseTop;
      dl {
        text-align: right;
        margin-top: 0;
        margin-bottom: 10px;
      }
    }
    .zuoxie {
      position: absolute;
      left: $baseLeft + 120px;
      dl {
        position: absolute;
        margin: 0;
        top: $baseTop;
        &::before {
          content: "";
          position: absolute;
          left: -24px;
          top: 10px;
          width: 20px;
          height: 1px;
          background-color: #000;
        }
        i {
          position: absolute;
          top: 50%;
          width: 1px;
          height: 1px;
          background-color: #000;
        }
      }
    }
    .youxie {
      position: absolute;
      left: $baseLeft + 160px;
      top: $baseTop + 270px;
      dl {
        position: absolute;
        margin: 0;
        &::before {
          content: "";
          position: absolute;
          left: -24px;
          top: 10px;
          width: 20px;
          height: 1px;
          background-color: #000;
        }
        i {
          position: absolute;
          top: 50%;
          width: 1px;
          height: 1px;
          background-color: #000;
        }
      }
    }
  }
}
</style>
