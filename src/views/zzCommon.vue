<template>
  <div class="zz">
    <div class="cells" :style="{ top: colLength * 30 + 10 + 'px' }">
      <dl
        class="row"
        v-for="(row, i) in cells"
        :key="`row-${i}`"
        :style="{
          paddingLeft:
            ((rowLength + colLength - 1 - row.length) * size) / 2 + 'px',
        }"
      >
        <dd
          class="cell"
          v-for="(cell, j) in row"
          :key="`cell-${i}-${j}`"
          :class="{
            space: cell.val === ' ',
          }"
        >
          <input
            :class="{
              small: cell.val && cell.val.length > 1,
            }"
            @focus="iptFocus(cell)"
            @blur="iptBlur(cell)"
            type="text"
            v-model="cell.val"
          />
        </dd>
      </dl>
    </div>
    <div class="zzs">
      <div class="heng" :style="{ top: colLength * 30 + 10 + 'px' }">
        <dl
          v-for="(item, i) in zz.heng"
          :key="`heng-${i}`"
          :style="{
            marginRight:
              -((rowLength + colLength - 1 - cells[i].length) * size) / 2 +
              'px',
          }"
          :class="{
            active: iptCell && iptCell.i === i + rowLength,
            pass: checkHengPass(i),
          }"
        >
          {{ item }}
        </dl>
      </div>
      <div class="zuoxie">
        <dl
          v-for="(item, i) in zz.zuoxie"
          :key="`zuoxie-${i}`"
          :style="getZuoStyle(i)"
          :class="{
            active:
              iptCell &&
              ((iptCell.i >= rowLength * 2 - 1 &&
                iptCell.j + Math.abs(iptCell.i - rowLength * 2 + 1) ===
                  zz.zuoxie.length - i - 1) ||
                (iptCell.i < rowLength * 2 - 1 &&
                  iptCell.j === zz.zuoxie.length - i - 1)),
            pass: checkZuoPass(i),
          }"
        >
          <i
            v-if="i >= rowLength - 1"
            :style="{
              height: 30 * (i - rowLength + 2) - 10 + 'px',
              top: '10px',
              left: '-25px',
            }"
          ></i>
          {{ item }}
        </dl>
      </div>
      <div
        class="youxie"
        :style="{ top: (rowLength * 2 + colLength - 1) * 30 + 10 + 'px' }"
      >
        <dl
          v-for="(item, i) in zz.youxie"
          :key="`youxie-${i}`"
          :style="getYouStyle(i)"
          :class="{
            active:
              iptCell &&
              ((iptCell.i >= rowLength * 2 - 1 && iptCell.j === i) ||
                (iptCell.i < rowLength * 2 - 1 &&
                  iptCell.j === i - rowLength * 2 + 1 + iptCell.i)),
            pass: checkYouPass(i),
          }"
        >
          <i
            v-if="i <= colLength - 1"
            :style="{
              height: (colLength - i - 0.5) * 30 + 10 + 'px',
              top: (colLength - i - 0.5) * -30 + 1 + 'px',
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
import zzCommon from "./zzall";
let cellMap = {};
export default {
  data() {
    let cells = [];
    const cellsStorage = localStorage.getItem("cellMap");
    if (cellsStorage) {
      try {
        cellMap = JSON.parse(cellsStorage);
      } catch (e) {
        cellMap = {};
      }
    }
    let no = this.$route.query.no;
    if (no) {
      if (/^\d+$/.test(no)) {
        no = +no;
      }
    } else {
      no = (Math.random() * zzCommon.length) | 0;
    }
    let zz = zzCommon[no] || zzCommon.find((item) => item.code === no);
    if (!zz) {
      no = (Math.random() * zzCommon.length) | 0;
      zz = zzCommon[no];
    }
    if (`${this.$route.query.no}` !== `${no}`) {
      this.$router.replace({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          no,
        },
      });
    }
    const code = zz.code || no;
    const rowLength = (zz.heng.length + 1) / 2;
    const colLength = zz.zuoxie.length + 1 - rowLength;
    if (cellMap[code]) {
      cells = cellMap[code];
    } else {
      for (let i = rowLength; i < 3 * rowLength - 1; i++) {
        const arr = [];
        for (
          let j = 0,
            len =
              i < rowLength * 2
                ? i + colLength - rowLength
                : colLength + rowLength - 2 - (i - rowLength * 2);
          j < len;
          j++
        ) {
          arr.push({ i, j, val: "" });
        }
        cells.push(arr);
      }
    }
    return {
      cells,
      size: 3.4641 * 10,
      zz,
      rowLength,
      colLength,
      code,
      iptCell: null,
    };
  },
  methods: {
    iptFocus(cell) {
      this.iptCell = cell;
    },
    iptBlur(cell) {
      this.$set(cell, "val", (cell.val || "").toUpperCase());
      cellMap[this.code] = this.cells;
      localStorage.setItem("cellMap", JSON.stringify(cellMap));
    },
    getZuoStyle(i) {
      if (i >= this.rowLength - 1) {
        return {
          left:
            this.size * (this.rowLength * 1.5 + this.colLength - 1 - i) +
            1 +
            "px",
          top: 30 * (this.colLength - 2 + this.rowLength - i) + "px",
        };
      }
      return {
        left: this.size * (this.rowLength + this.colLength - i / 2) - 10 + "px",
        top: 30 * (this.colLength + (this.rowLength - i - 1)) - 10 + "px",
      };
    },
    getYouStyle(i) {
      if (i <= this.colLength - 1) {
        return {
          left: (this.rowLength / 2 + i) * this.size + 35 + "px",
          top: 30 * (this.colLength - i - 0.5) + "px",
        };
      }
      return {
        left:
          (this.rowLength / 2 + this.colLength + (i - this.colLength) / 2) *
            this.size +
          20 +
          "px",
        top: -30 * (i - this.colLength + 1) - 10 + "px",
      };
    },
    checkHengPass(index) {
      const arr = [];
      for (let i = 0; i < this.cells[index].length; i++) {
        const item = this.cells[index][i];
        if (
          typeof item.val !== "string" ||
          item.val === "" ||
          item.val.length > 1
        ) {
          return false;
        }
        arr.push(item.val);
      }
      const str = arr.join("");
      return new RegExp("^" + this.zz.heng[index] + "$").test(str);
    },
    checkZuoPass(index) {
      const ii = index;
      index = this.zz.zuoxie.length - index - 1;
      const arr = [];
      for (
        let i = index < this.colLength ? 0 : index - this.colLength + 1,
          len =
            index < this.rowLength
              ? this.rowLength + index
              : this.rowLength * 2 - 1;
        i < len;
        i++
      ) {
        const item = this.cells[i][
          i < this.rowLength ? index : index - (i + 1 - this.rowLength)
        ];
        if (
          typeof item.val !== "string" ||
          item.val === "" ||
          item.val.length > 1
        ) {
          return false;
        }
        arr.push(item.val);
      }
      const str = arr.join("");
      return new RegExp("^" + this.zz.zuoxie[ii] + "$").test(str);
    },
    checkYouPass(index) {
      const arr = [];
      for (
        let i = index < this.rowLength ? this.rowLength - index - 1 : 0,
          len =
            index < this.colLength
              ? this.rowLength * 2 - 1
              : this.rowLength * 2 - 1 - (index - this.colLength + 1);
        i < len;
        i++
      ) {
        const item = this.cells[i][
          i < this.rowLength - 1 ? index - (this.rowLength - i - 1) : index
        ];
        if (
          typeof item.val !== "string" ||
          item.val === "" ||
          item.val.length > 1
        ) {
          return false;
        }
        arr.unshift(item.val);
      }
      const str = arr.join("");
      return new RegExp("^" + this.zz.youxie[index] + "$").test(str);
    },
  },
};
</script>

<style lang="scss" scoped>
.zz {
  position: relative;
  $baseLeft: 410px;
  $baseTop: 220px;
  .cells {
    position: absolute;
    $size: 10px;
    top: $baseTop;
    left: $baseLeft;
    @mixin rect {
      width: 3.4641 * $size;
      height: 2 * $size;
      border: 1px solid #666;
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
          color: red;
          &.small {
            font-size: 12px;
            font-weight: normal;
            color: #000;
          }
        }
        &.space {
          background-color: #000;
          &::before {
            background-color: #000;
          }
          &::after {
            background-color: #000;
          }
          input {
            background-color: #000;
            color: #fff;
          }
        }
      }
    }
  }
  .zzs {
    position: absolute;
    dl {
      font-size: 16px;
      line-height: 20px;
      white-space: nowrap;
      &.active {
        background-color: #e1e287;
      }
      &.pass {
        color: #ff0000;
      }
    }
    .heng {
      position: absolute;
      top: $baseTop;
      width: $baseLeft - 20px;
      dl {
        text-align: right;
        margin-top: 0;
        margin-bottom: 10px;
      }
    }
    .zuoxie {
      position: absolute;
      left: $baseLeft;
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
      left: $baseLeft;
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
