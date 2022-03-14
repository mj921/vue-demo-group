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
          class="cy-cell-group"
          v-for="(inputCell, cellIndex) in record"
          :key="`cell-${rowIndex}-${cellIndex}`"
        >
          <div
            class="cy-cell cy-cell-input cy-cell-absolute cy-cell-cellrotate1"
            :style="{
              animationDelay: `${cellIndex === 0 ? 0 : 0.4 * cellIndex}s`,
            }"
          >
            <template v-if="inputCell">
              <div class="cy-py">
                <span
                  v-for="(zm, zmIndex) in inputCell.zms"
                  class="cy-zm"
                  :key="`${zm.zm}-${cellIndex}-${zmIndex}`"
                  :class="`cy-zm-${zm.sd || ''}`"
                >
                  {{ zm.zm }}
                </span>
              </div>
              <div class="cy-text">
                {{ inputCell.text }}
              </div></template
            >
          </div>
          <div
            class="cy-cell cy-cell-absolute cy-cell-cellrotate"
            :class="`cy-cell-${inputCell && inputCell.validResult}`"
            :style="{
              animationDelay: `${cellIndex === 0 ? 0 : 0.4 * cellIndex}s`,
            }"
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
          </div>
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
    <el-drawer
      title="统计"
      :visible.sync="statisticsVisible"
      class="statistics-drawer"
      size="100%"
      direction="ttb"
    >
      <div class="statistics">
        <dl>
          <label for="">游戏次数</label>
          <span>{{ history.gameNum }}</span>
        </dl>
        <dl>
          <label for="">获胜次数</label>
          <span>{{ history.gameWinNum }} （尝试次数小于等于10次）</span>
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
        <el-button
          type="text"
          size="default"
          @click="guessNumMoreVisible = !guessNumMoreVisible"
          >{{ guessNumMoreVisible ? "收起" : "展开" }}</el-button
        >
        <dl
          v-for="guessNumKey in Object.keys(history.guessNumMap)"
          :key="`guessNumKey-${guessNumKey}`"
          v-show="guessNumMoreVisible || +guessNumKey < 11"
        >
          <span class="bar-text" style="text-align: right">
            {{ guessNumKey }}
          </span>
          <div class="bar-bg">
            <div
              class="bar-curr"
              :style="{
                width: `${
                  (history.guessNumMap[guessNumKey] / maxGuessNumVolumn) * 100
                }%`,
              }"
            ></div>
          </div>
          <span class="bar-text">{{ history.guessNumMap[guessNumKey] }}</span>
        </dl>
      </div>
    </el-drawer>
    <el-drawer
      title="提示"
      :visible.sync="tipVisible"
      size="450px"
      class="tip-drawer"
      :modal="false"
      :wrapper-closable="false"
    >
      <div class="tip-content">
        <div class="tip-list">
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
        已经正确的
        <div class="tip-pass">
          <dl v-for="(passTip, pIndex) in passTips" :key="`passTip${pIndex}`">
            {{
              passTip.text
                ? passTip.text
                : `${passTip.sm}${passTip.ym} ${passTip.sd}`
            }}
          </dl>
        </div>
        <el-button type="text" @click="moreTipVisible = true">更多</el-button>
      </div>
    </el-drawer>
    <el-drawer
      title="更多提示"
      :visible.sync="moreTipVisible"
      size="450px"
      class="tip-drawer"
      :modal="false"
      :wrapper-closable="false"
    >
      <div class="tip-content">
        <ul class="tip-pinyin-list">
          <li
            v-for="pyData in pinyinData"
            :key="`pinyintip-${pyData.py}`"
            :class="`tip-pinyin-${
              shengmuMap[pyData.sm] === 'error' ||
              yunmuMap[pyData.ym] === 'error'
                ? 'error'
                : ''
            }`"
          >
            <span
              :class="`tip-pinyin-${
                shengmuMap[pyData.sm] === 'error'
                  ? 'error'
                  : shengmuMap[pyData.sm]
                  ? 'has'
                  : ''
              }`"
              >{{ pyData.sm }}</span
            >
            <span
              :class="`tip-pinyin-${
                yunmuMap[pyData.ym] === 'error'
                  ? 'error'
                  : yunmuMap[pyData.ym]
                  ? 'has'
                  : ''
              }`"
              >{{ pyData.ym }}</span
            >
          </li>
        </ul>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import pinyin from "pinyin";
import chengyuData from "./data/cyData.json";
import shengmuData from "./data/shengmu.json";
import yunmuData from "./data/yunmu.json";
import pinyinData from "./data/pinyin.json";
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
      moreTipVisible: false,
      winGuessNum: 10,
      passTips: [
        { sm: "", ym: "", sd: "" },
        { sm: "", ym: "", sd: "" },
        { sm: "", ym: "", sd: "" },
        { sm: "", ym: "", sd: "" },
      ],
      pinyinData,
      guessNumMoreVisible: false,
    };
  },
  computed: {
    currIptCy() {
      return this.currIpt.replace(/[^\u4e00-\u9fa5]/g, "").slice(0, 4);
    },
    maxGuessNumVolumn() {
      return Math.max.apply(
        null,
        Object.keys(this.history.guessNumMap).map(
          (key) => this.history.guessNumMap[key]
        )
      );
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
      this.passTips = [
        { sm: "", ym: "", sd: "" },
        { sm: "", ym: "", sd: "" },
        { sm: "", ym: "", sd: "" },
        { sm: "", ym: "", sd: "" },
      ];
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
            this.$set(el, "validResult", "pass");
            this.shengmuMap[el.sm] = "pass";
            this.yunmuMap[el.ym] = "pass";
            this.passTips[index] = {
              sm: trueEl.sm,
              ym: trueEl.ym,
              sd: trueEl.sd,
              text: trueEl.text,
            };
            passNum++;
          } else {
            this.$set(
              el,
              "validResult",
              this.cy.includes(el.text) ? "has" : "error"
            );
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
            if (el.smResult === "pass") {
              this.passTips[index].sm = trueEl.sm;
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
            if (el.ymResult === "pass") {
              this.passTips[index].ym = trueEl.ym;
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
            if (el.sdResult === "pass") {
              this.passTips[index].sd = trueEl.sd;
            }
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
        this.$set(
          this.history.guessNumMap,
          num,
          this.history.guessNumMap[num] + 1
        );
      } else {
        this.$set(this.history.guessNumMap, num, 1);
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
@keyframes cellrotate {
  0% {
    transform: rotateY(180deg);
    z-index: 0;
    opacity: 0;
  }
  49% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: rotateY(0);
    z-index: 1;
    opacity: 1;
  }
}
@keyframes cellrotate1 {
  0% {
    transform: rotateY(0);
    z-index: 1;
    opacity: 1;
    border-color: rgba(107, 114, 128, 0.1);
  }
  49% {
    opacity: 1;
    border-color: rgba(107, 114, 128, 0.1);
  }
  50% {
    opacity: 0;
    border-color: transparent;
  }
  100% {
    transform: rotateY(180deg);
    z-index: 0;
    opacity: 0;
    border-color: transparent;
  }
}
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
        transition: transform 0.6s;
        &.cy-cell-input {
          background-color: #fff;
          border: 2px solid rgba(107, 114, 128, 0.1);
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
        &.cy-cell-has {
          .cy-text {
            color: orange;
          }
        }
      }
      .cy-cell-group {
        position: relative;
        width: 80px;
        height: 80px;
        &:not(:last-child) {
          margin-right: 8px;
        }
        .cy-cell-absolute {
          position: absolute;
          left: 0;
          top: 0;
          margin-right: 0;
          &.cy-cell-cellrotate {
            animation: cellrotate 0.6s;
            animation-fill-mode: both;
          }
          &.cy-cell-cellrotate1 {
            animation: cellrotate1 0.6s;
            animation-fill-mode: both;
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
      border: 2px solid rgba(107, 114, 128, 0.1);
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
.statistics-drawer {
  /deep/ {
    .el-drawer__header {
      margin-bottom: 0;
      padding: 10px 20px;
      font-size: 20px;
      font-weight: bold;
    }
    .el-drawer__body {
      padding: 0 10px;
      font-size: 18px;
    }
  }
  .statistics {
    .bar-text {
      width: 8%;
    }
    .bar-bg {
      height: 10px;
      width: 75%;
      margin: 0 16px;
      .bar-curr {
        height: 100%;
        background-color: #38a169;
      }
    }
    dl {
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      label {
        width: 6em;
        text-align: right;
        margin-right: 1em;
      }
    }
  }
}
.tip-drawer {
  /deep/ {
    .el-drawer {
      max-width: 100%;
    }
    .el-drawer__header {
      margin-bottom: 0;
    }
    .el-drawer__body {
      padding: 0 10px;
    }
  }
  .tip-content {
    .tip-list {
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
            margin-bottom: 5px;
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
            margin-bottom: 5px;
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
    .tip-pinyin-list {
      display: flex;
      flex-wrap: wrap;
      li {
        width: 16%;
        list-style: none;
        margin-bottom: 5px;
        text-align: center;
        &.tip-pinyin-error span {
          color: #ccc !important;
        }
        .tip-pinyin-pass {
          color: #0a1cf0;
        }
        .tip-pinyin-has {
          color: orange;
        }
        .tip-pinyin-error {
          color: #ccc;
        }
      }
    }
    .tip-pass {
      display: flex;
      height: 20px;
      dl {
        width: 25%;
        text-align: center;
      }
    }
  }
}
</style>
