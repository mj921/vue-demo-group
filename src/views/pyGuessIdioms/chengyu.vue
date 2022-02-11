<template>
  <div class="cy-pinyin">
    <div class="cy-header">
      <el-button type="primary" size="mini" @click="reset">重新开始</el-button>
      <span v-if="finish">{{ cy }}</span>
      <el-button size="mini" @click="statisticsVisible = true">统计</el-button>
      <el-button size="mini" @click="tipVisible = true">提示</el-button>
    </div>
    <div class="cy-input">
      <dl
        class="cy-row"
        v-for="(record, rowIndex) in inputRecords"
        :key="`row-${rowIndex}`"
      >
        <div class="cy-row-num">{{ rowIndex + 1 }}</div>
        <dd
          class="cy-cell"
          :class="{
            'cy-cell-pass': inputCell && inputCell.validResult,
          }"
          v-for="(inputCell, cellIndex) in record"
          :key="`cell-${rowIndex}-${cellIndex}`"
        >
          <template v-if="inputCell">
            <div class="cy-py">
              <span
                v-for="(zm, zmIndex) in inputCell.zms"
                class="cy-zm"
                :key="`${zm.zm}-${cellIndex}-${zmIndex}`"
                :class="`cy-zm-${zm.sd || ''}  cy-zm-${
                  zm.smFlag ? inputCell.smResult : inputCell.ymResult
                } cy-sd-${inputCell.sdResult}`"
              >
                {{ zm.zm }}
              </span>
            </div>
            <div class="cy-text">
              {{ inputCell.text }}
            </div></template
          >
        </dd>
      </dl>
      <dl class="cy-row" v-show="!finish" @click="inputClick">
        <div class="cy-row-num">{{ inputRecords.length + 1 }}</div>
        <dd
          class="cy-cell cy-cell-input"
          v-for="cellIndex in 4"
          :key="`curr-cell-${cellIndex}`"
        >
          <template v-if="currCyPy[cellIndex - 1]">
            <div class="cy-py">
              <span
                v-for="(zm, zmIndex) in currCyPy[cellIndex - 1].zms"
                class="cy-zm"
                :key="`${zm.zm}-${cellIndex}-${zmIndex}`"
                :class="`cy-zm-${zm.sd || ''}`"
              >
                {{ zm.zm }}
              </span>
            </div>
            <div class="cy-text">
              {{ currCyPy[cellIndex - 1].text }}
            </div></template
          >
        </dd>
      </dl>
      <dl class="cy-row">
        <input
          class="answer-input"
          ref="input"
          type="text"
          placeholder="输入四字词语"
          v-model="currIpt"
          :disabled="finish"
          @keyup.enter="submit"
        />
      </dl>
      <dl class="cy-row">
        <button
          class="confirm"
          :class="{ disabled: currIptCy.length < 4 }"
          @click="submit"
        >
          确定
        </button>
      </dl>
    </div>
    <div class="cy-bottom"></div>
    <el-dialog
      title="统计"
      :visible.sync="statisticsVisible"
      width="600px"
      class="statistics-dialog"
    >
      <div class="statistics">
        <dl>
          <label for="">游戏次数</label>
          <span>{{ history.gameNum }}</span>
        </dl>
        <dl>
          <label for="">获胜次数</label>
          <span>{{ history.gameWinNum }}</span>
        </dl>
        <dl>
          <label for="">获胜几率</label>
          <span
            >{{
              history.gameNum > 0
                ? ((history.gameWinNum / history.gameNum) * 100).toFixed(2)
                : 0
            }}%</span
          >
        </dl>
        <dl>
          <label for="">平均尝试次数</label>
          <span>{{
            history.gameNum > 0
              ? (history.totalGuessNum / history.gameNum).toFixed(2)
              : 0
          }}</span>
        </dl>
        <dl>
          <label for="">最多尝试次数</label>
          <span>{{ history.maxGuessNum }}</span>
        </dl>
        <dl>
          <label for="">最少尝试次数</label>
          <span>{{ history.minGuessNum }}</span>
        </dl>
      </div>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="tipVisible"
      width="500px"
      top="6vh"
      class="tip-dialog"
    >
      <div class="tip-content">
        <dl class="tip-shengmu">
          <dt>声母</dt>
          <ul class="tip-shengmu-list">
            <li
              v-for="key in Object.keys(shengmuMap)"
              :key="`shengmutip-${key}`"
              :class="`tip-shengmu-${shengmuMap[key]}`"
            >
              {{ key }}
            </li>
          </ul>
        </dl>
        <dl class="tip-yunmu">
          <dt>韵母</dt>
          <ul class="tip-yunmu-list">
            <li
              v-for="key in Object.keys(yunmuMap)"
              :key="`yunmutip-${key}`"
              :class="`tip-yunmu-${yunmuMap[key]}`"
            >
              {{ key }}
            </li>
          </ul>
        </dl>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import pinyin from "pinyin";
import chengyuData from "./data/cyData.json";
import shengmuData from "./data/shengmu.json";
import yunmuData from "./data/yunmu.json";
const chengyudata = chengyuData.reduce((arr, el) => {
  if (el.type === 1) {
    return arr.concat([el.data]);
  }
  return arr;
}, []);

// ıˉˊˇ`

export default {
  data() {
    const historyLS = localStorage.getItem("cyHistory1");
    let history = {
      score1: { top: [], bottom: [] },
      score2: { top: [], bottom: [] },
      gameNum: 0,
      gameWinNum: 0,
      totalGuessNum: 0,
      maxGuessNum: -Infinity,
      minGuessNum: Infinity,
      guessNumMap: {},
    };
    if (historyLS) {
      try {
        history = JSON.parse(historyLS);
      } catch (e) {
        history = {
          score1: { top: [], bottom: [] },
          score2: { top: [], bottom: [] },
          gameNum: 0,
          gameWinNum: 0,
          totalGuessNum: 0,
          maxGuessNum: -Infinity,
          minGuessNum: Infinity,
          guessNumMap: {},
        };
      }
    }
    return {
      cy: "",
      cyPinYin: [],
      cySmList: [],
      cyYmList: [],
      cySdList: [],
      inputRecords: [],
      currCyPy: [],
      currIpt: "",
      currRowIndex: 0,
      currBlockIndex: 0,
      currCellIndex: 0,
      keyMap: {},
      history,
      statisticsVisible: false,
      finish: false,
      yunmuMap: {},
      shengmuMap: {},
      tipVisible: false,
      winGuessNum: 10,
    };
  },
  computed: {
    currIptCy() {
      return this.currIpt.replace(/[^\u4e00-\u9fa5]/g, "").slice(0, 4);
    },
  },
  watch: {
    currIptCy() {
      this.currCyPy = this.textToPy(this.currIptCy);
    },
  },
  methods: {
    getChengyu() {
      return chengyudata[Math.floor(chengyudata.length * Math.random())];
    },
    reset() {
      this.cySmList = [];
      this.cyYmList = [];
      this.cySDList = [];
      this.cy = this.getChengyu();
      this.cyPinYin = this.textToPy(this.cy);
      this.cyPinYin.forEach((el) => {
        this.cySmList.push(el.sm);
        this.cyYmList.push(el.ym);
        this.cySDList.push(el.sd);
      });
      this.inputRecords = [];

      this.currRowIndex = 0;
      this.currBlockIndex = 0;
      this.currCellIndex = 0;
      this.currIpt = "";
      this.keyMap = {};
      this.finish = false;
      this.score = {
        score1: 100,
        score2: 100,
      };
      this.yunmuMap = yunmuData.reduce((obj, el) => {
        obj[el] = "";
        return obj;
      }, {});
      this.shengmuMap = shengmuData.reduce((obj, el) => {
        obj[el] = "";
        return obj;
      }, {});
    },
    inputClick() {
      this.$refs.input && this.$refs.input.focus();
    },
    textToPy(text) {
      return pinyin(text, {
        style: pinyin.STYLE_TO3NE,
      }).map((el, tIndex) => {
        const zms = el[0].split("");
        const obj = { text: text[tIndex] };

        let str = "";
        obj.zms = zms.reduce((arr, item, index) => {
          if (/[0-4]/.test(item)) {
            obj.sd = item;
            return arr;
          }
          if (index < zms.length - 1 && /[0-4]/.test(zms[index + 1])) {
            arr.push({
              zm: item === "i" ? "ı" : item,
              sd: zms[index + 1],
            });
          } else {
            arr.push({
              zm: item,
            });
          }
          str += item;
          return arr;
        }, []);

        const match = this.matchSm(str);
        obj.py = str;
        obj.sm = (match && match[0]) || "";
        obj.ym = str.replace(obj.sm, "");
        obj.zms.forEach((zm, zIndex) => {
          zm.smFlag = obj.sm.length > zIndex;
        });
        return obj;
      });
    },
    matchSm(str) {
      return str.toLowerCase().match(new RegExp(`^(${shengmuData.join("|")})`));
    },
    submit() {
      if (this.currIptCy.length === 4) {
        let passNum = 0;
        this.currCyPy.forEach((el, index) => {
          const trueEl = this.cyPinYin[index];
          if (el.text === trueEl.text) {
            el.validResult = true;
            this.$set(el, "validResult", true);
            this.shengmuMap[el.sm] = "pass";
            this.yunmuMap[el.ym] = "pass";
            passNum++;
          } else {
            this.$set(el, "validResult", false);
            this.$set(
              el,
              "smResult",
              el.sm === trueEl.sm
                ? "pass"
                : this.cySmList.includes(el.sm)
                ? "has"
                : "error"
            );
            if (this.shengmuMap[el.sm] !== "pass") {
              this.shengmuMap[el.sm] = el.smResult;
            }
            this.$set(
              el,
              "ymResult",
              el.ym === trueEl.ym
                ? "pass"
                : this.cyYmList.includes(el.ym)
                ? "has"
                : "error"
            );
            if (this.yunmuMap[el.ym] !== "pass") {
              this.yunmuMap[el.ym] = el.ymResult;
            }
            this.$set(
              el,
              "sdResult",
              el.sd === trueEl.sd
                ? "pass"
                : this.cySdList.includes(el.sd)
                ? "has"
                : "error"
            );
          }
        });
        this.inputRecords.push(this.currCyPy);
        this.currIpt = "";
        if (passNum === 4) {
          this.finish = true;
          this.saveScore();
        }
      }
    },
    saveScore() {
      const num = this.inputRecords.length;
      this.history.gameNum++;
      if (this.inputRecords.length <= this.winGuessNum) {
        this.history.gameWinNum++;
      }
      this.history.totalGuessNum += num;
      if (this.history.maxGuessNum < num) this.history.maxGuessNum = num;
      if (this.history.minGuessNum > num) this.history.minGuessNum = num;
      if (this.history.guessNumMap[num]) {
        this.history.guessNumMap[num]++;
      } else {
        this.history.guessNumMap[num] = 0;
      }
      localStorage.setItem("cyHistory1", JSON.stringify(this.history));
    },
  },
  created() {
    this.reset();
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.cy-pinyin {
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  .cy-header {
    width: 100vw;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    background-color: #fff;
    top: 0;
    z-index: 9;
  }
  .cy-input {
    padding-top: 50px;
    .cy-row {
      display: flex;
      justify-content: center;
      margin-bottom: 8px;
      position: relative;
      .cy-row-num {
        position: absolute;
        left: -50px;
        width: 50px;
        height: 80px;
        line-height: 80px;
        text-align: center;
        font-size: 20px;
        font-weight: bold;
      }
      .cy-cell {
        width: 80px;
        height: 80px;
        text-align: center;
        &:not(:last-child) {
          margin-right: 8px;
        }
        background-color: rgba(156, 163, 175, 0.08);
        user-select: none;
        color: #718096;
        border: 2px solid transparent;
        &.cy-cell-input {
          background-color: #fff;
          border: 2px solid rgba($color: #333, $alpha: 0.1);
        }
        .cy-py {
          padding-top: 8px;
          line-height: 16px;
          display: flex;
          justify-content: center;
          .cy-zm {
            position: relative;
            &:not(:last-child) {
              margin-right: 2px;
            }
            &::before {
              position: absolute;
              top: -2px;
              left: 50%;
              transform: translateX(-50%);
              font-size: 18px;
              line-height: 18px;
              color: #000;
            }
            &.cy-zm-1 {
              &::before {
                content: "ˉ";
              }
            }
            &.cy-zm-2 {
              &::before {
                content: "ˊ";
                font-size: 24px;
              }
            }
            &.cy-zm-3 {
              &::before {
                content: "ˇ";
                font-size: 24px;
              }
            }
            &.cy-zm-4 {
              &::before {
                content: "`";
                font-size: 24px;
              }
            }
            &.cy-zm-pass {
              color: #409eff;
            }
            &.cy-zm-has {
              color: orange;
            }
            &.cy-sd-pass::before {
              color: #409eff;
            }
            &.cy-sd-has::before {
              color: orange;
            }
          }
        }
        .cy-text {
          font-size: 30px;
          line-height: 42px;
        }
        &.cy-cell-pass {
          background-color: #38a169;
          color: #fff;
          .cy-zm::before {
            color: #fff !important;
          }
        }
      }
      &.error {
        .cy-cell {
          border: 5px solid red;
          box-sizing: border-box;
          line-height: 40px;
        }
      }
    }
    .answer-input {
      display: block;
      width: 344px;
      height: 52px;
      text-align: center;
      border: 2px solid rgba($color: #333, $alpha: 0.1);
      font-size: 18px;
      outline: royalblue;
    }
    .confirm {
      padding: 5px 16px;
      font-size: 14px;
      color: #fff;
      border-radius: 5px;
      background-color: #38a169;
      border: none;
      &.disabled {
        background-color: rgba($color: #999, $alpha: 0.7);
        cursor: not-allowed;
      }
    }
  }
}
.statistics-dialog {
  /deep/ {
    .el-dialog {
      max-width: 95%;
    }
    .el-dialog__body {
      padding-top: 0;
    }
  }
  .statistics {
    dl {
      margin-bottom: 10px;
      display: flex;
      label {
        width: 6em;
        text-align: right;
        margin-right: 1em;
      }
    }
  }
}
.tip-dialog {
  /deep/ {
    .el-dialog {
      max-width: 95%;
    }
    .el-dialog__body {
      padding-top: 0;
    }
  }
  .tip-content {
    display: flex;
    text-align: center;
    .tip-shengmu {
      width: 40%;
      .tip-shengmu-list {
        display: flex;
        flex-wrap: wrap;
        li {
          width: 50%;
          list-style: none;
          margin-bottom: 10px;
          &.tip-shengmu-pass {
            color: #409eff;
            font-weight: bold;
          }
          &.tip-shengmu-has {
            color: orange;
          }
          &.tip-shengmu-error {
            color: #ccc;
          }
        }
      }
    }
    .tip-yunmu {
      width: 60%;
      .tip-yunmu-list {
        display: flex;
        flex-wrap: wrap;
        li {
          width: 33%;
          list-style: none;
          margin-bottom: 10px;
          &.tip-yunmu-pass {
            color: #0a1cf0;
          }
          &.tip-yunmu-has {
            color: orange;
          }
          &.tip-yunmu-error {
            color: #ccc;
          }
        }
      }
    }
  }
}
</style>
