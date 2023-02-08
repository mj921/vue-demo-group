<template>
  <div class="cy-pinyin">
    <div>
      <button @click="reset">重新开始</button>
      <span v-if="finish">{{ cy }}</span>
      <span v-for="item in scoreKeys" :key="`show-${item.key}`"
        >{{ item.title }}：{{
          item.getScore ? item.getScore(score[item.key]) : score[item.key]
        }}</span
      >
      <button @click="rankVisible = true">排行</button>
    </div>
    <div class="cy-input">
      <dl
        class="cy-row"
        v-for="(inputRow, rowIndex) in inputList"
        :key="`row-${rowIndex}`"
      >
        <div
          class="cy-block"
          :class="{ error: !inputBlock.valid }"
          v-for="(inputBlock, blockIndex) in inputRow"
          :key="`block-${rowIndex}-${blockIndex}`"
        >
          <dd
            class="cy-cell"
            v-for="(inputCell, cellIndex) in inputBlock.content"
            :key="`cell-${rowIndex}-${blockIndex}-${cellIndex}`"
            :class="`cy-cell-${inputCell.validResult}`"
          >
            {{ inputCell.text }}
          </dd>
        </div>
      </dl>
    </div>
    <div class="keyboard">
      <dl
        class="key-row"
        v-for="(keyRow, keyRowIndex) in keyList"
        :key="`key-row-${keyRowIndex}`"
      >
        <dd
          class="key-cell"
          v-for="keyCell in keyRow"
          :key="`key-cell-${keyCell}`"
          :class="`key-cell-${keyMap[keyCell] || ''}`"
          @click="keyInput(keyCell)"
        >
          {{ keyCell }}
        </dd>
      </dl>
    </div>
    <el-dialog
      title="排行"
      :visible.sync="rankVisible"
      width="600px"
      class="rank-dialog"
    >
      <el-tabs>
        <el-tab-pane
          v-for="item in scoreKeys"
          :key="item.key"
          :label="item.title"
        >
          <el-row :gutter="20">
            <el-col :span="12" :offset="0">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>top</span>
                </div>
                <ul>
                  <li
                    v-for="score in history[item.key].top"
                    :key="`${item.key}-top-${score.score}`"
                  >
                    {{ score.score }} {{ score.cy.join("，") }}
                  </li>
                </ul>
              </el-card>
            </el-col>
            <el-col :span="12" :offset="0">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>bottom</span>
                </div>
                <ul>
                  <li
                    v-for="score in history[item.key].bottom"
                    :key="`${item.key}-bottom-${score.score}`"
                  >
                    {{ score.score }} {{ score.cy.join("，") }}
                  </li>
                </ul>
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
import pinyin from "pinyin";
import chengyuData from "./data/cyData.json";
const chengyudata = chengyuData.reduce((arr, el) => {
  if (el.type === 1) {
    return arr.concat([el.data]);
  }
  return arr;
}, []);
export default {
  data() {
    const historyLS = localStorage.getItem("cyHistory");
    let history = {
      score1: { top: [], bottom: [] },
      score2: { top: [], bottom: [] },
      num: 0,
    };
    if (historyLS) {
      try {
        history = JSON.parse(historyLS);
      } catch (e) {
        history = {
          score1: { top: [], bottom: [] },
          score2: { top: [], bottom: [] },
          num: 0,
        };
      }
    }
    return {
      cy: "",
      cyPinYin: [],
      inputList: [],
      keyList: [
        ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
        ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
        ["Enter", "Z", "X", "C", "V", "B", "N", "M", "⌫"],
      ],
      currRow: "",
      cyPinYinStr: "",
      currRowIndex: 0,
      currBlockIndex: 0,
      currCellIndex: 0,
      keyMap: {},
      history,
      scoreKeys: [
        {
          key: "score1",
          title: "按行分数",
          getScore: (score) => {
            if (this.finish) return score;
            Object.keys(this.keyMap).forEach((key) => {
              if (this.keyMap[key] === "error") {
                score -= this.errorScore;
              }
            });
            return score;
          },
        },
        {
          key: "score2",
          title: "按字母分数",
        },
      ],
      score: {
        score1: 100,
        score2: 100,
      },
      rowScore: 10,
      rowErrorScore: 2,
      errorScore: 2,
      warnScore: 1,
      rankNum: 50,
      rankVisible: false,
      finish: false,
    };
  },
  methods: {
    getChengyu() {
      return chengyudata[Math.floor(chengyudata.length * Math.random())];
    },
    reset() {
      this.cy = this.getChengyu();
      this.cyPinYin = pinyin(this.cy, {
        style: pinyin.STYLE_NORMAL,
      });
      this.cyPinYinStr = this.cyPinYin
        .reduce((str, el) => str + el[0], "")
        .toUpperCase();
      this.inputList = Array(6)
        .fill(1)
        .map(() =>
          this.cyPinYin.map((el) => ({
            valid: true,
            content: Array(el[0].length)
              .fill(1)
              .map(() => ({
                text: "",
                validResult: "",
              })),
          }))
        );

      this.currRowIndex = 0;
      this.currBlockIndex = 0;
      this.currCellIndex = 0;
      this.currRow = "";
      this.keyMap = {};
      this.finish = false;
      this.score = {
        score1: 100,
        score2: 100,
      };
    },
    keyInput(key) {
      if (this.currRowIndex >= 6 || this.finish) return;
      if (key === "Enter") {
        if (this.currRow.length === this.cyPinYinStr.length) {
          this.validate();
        }
      } else if (key === "⌫") {
        if (this.currRow) {
          this.currRow = this.currRow.slice(0, -1);
          if (this.currCellIndex === 0) {
            this.currBlockIndex--;
            this.currCellIndex =
              this.inputList[this.currRowIndex][this.currBlockIndex].content
                .length - 1;
          } else {
            this.currCellIndex--;
          }
          this.inputList[this.currRowIndex][this.currBlockIndex].content[
            this.currCellIndex
          ].text = "";
        }
      } else if (this.currRow.length < this.cyPinYinStr.length) {
        this.currRow += key;
        this.inputList[this.currRowIndex][this.currBlockIndex].content[
          this.currCellIndex
        ].text = key;
        if (
          this.inputList[this.currRowIndex][this.currBlockIndex].content
            .length -
            1 >
          this.currCellIndex
        ) {
          this.currCellIndex++;
        } else if (
          this.inputList[this.currRowIndex].length - 1 >
          this.currBlockIndex
        ) {
          this.currCellIndex = 0;
          this.currBlockIndex++;
        } else {
          this.currCellIndex++;
        }
      }
    },
    checkPy(str) {
      const list1 = [
        "b",
        "c",
        "ch",
        "d",
        "f",
        "g",
        "h",
        "j",
        "k",
        "l",
        "m",
        "n",
        "p",
        "q",
        "r",
        "s",
        "sh",
        "t",
        "w",
        "x",
        "y",
        "z",
        "zh",
      ];
      const list2 = [
        "ong",
        "ing",
        "eng",
        "ang",
        "vn",
        "un",
        "in",
        "en",
        "an",
        "er",
        "ve",
        "ia",
        "ie",
        "iu",
        "ou",
        "ao",
        "ui",
        "ei",
        "ai",
        "u",
        "i",
        "e",
        "o",
        "a",
        "ang",
        "uang",
        "uan",
        "an",
        "ao",
        "ai",
        "en",
        "er",
        "ou",
        "a",
        "o",
        "e",
        "uo",
        "ua",
        "ue",
        "iao",
        "ian",
        "iang",
        "iong",
        "v",
      ];
      return new RegExp(`^(${list1.join("|")})?(${list2.join("|")})?$`).test(
        str.toLowerCase()
      );
    },
    validate() {
      this.inputList[this.currRowIndex].forEach((el) => {
        el.valid = this.checkPy(el.content.map((item) => item.text).join(""));
      });
      if (!this.inputList[this.currRowIndex].every((el) => el.valid)) {
        return;
      }
      let passNum = 0;
      for (let i = 0, blockI = 0, cellI = 0; i < this.currRow.length; i++) {
        const key = this.currRow[i];
        if (key === this.cyPinYinStr[i]) {
          this.inputList[this.currRowIndex][blockI].content[cellI].validResult =
            "pass";
          this.keyMap[key] = "pass";
          passNum++;
        } else if (this.cyPinYinStr.includes(key)) {
          this.inputList[this.currRowIndex][blockI].content[cellI].validResult =
            "has";
          this.score.score2 -= this.warnScore;
          if (this.keyMap[key] !== "pass") {
            this.keyMap[key] = "has";
          }
        } else {
          this.inputList[this.currRowIndex][blockI].content[cellI].validResult =
            "error";
          this.score.score2 -= this.errorScore;
          if (!this.keyMap[key]) {
            this.keyMap[key] = "error";
          }
        }
        if (
          this.inputList[this.currRowIndex][blockI].content.length - 1 >
          cellI
        ) {
          cellI++;
        } else if (this.inputList[this.currRowIndex].length - 1 > blockI) {
          cellI = 0;
          blockI++;
        }
      }
      if (passNum === this.cyPinYinStr.length) {
        this.finish = true;
        this.$nextTick(() => {
          alert(`答对了，${this.cy}`);
        });
      }
      if (!this.finish) {
        this.score.score1 -= this.rowScore;
      } else {
        for (let key in this.keyMap) {
          if (this.keyMap[key] === "error") {
            this.score.score1 -= this.rowErrorScore;
          }
        }
        this.saveScore();
      }
      this.currRowIndex++;
      this.currBlockIndex = 0;
      this.currCellIndex = 0;
      this.currRow = "";
      if (this.currRowIndex >= 6 && !this.finish) {
        this.finish = true;
        this.score.score1 = this.score.score2 = 0;
        this.$nextTick(() => {
          alert(`答错了，${this.cy}`);
        });
      }
    },
    saveScore() {
      this.scoreKeys.forEach(({ key }) => {
        const rank = this.history[key];
        let findItem;
        if ((findItem = rank.top.find((el) => el.score === this.score[key]))) {
          if (!findItem.cy.includes(this.cy)) findItem.cy.push(this.cy);
        } else if (
          rank.top.length < this.rankNum ||
          rank.top[rank.top.length - 1].score < this.score[key]
        ) {
          rank.top.push({ score: this.score[key], cy: [this.cy] });
          rank.top.sort((a, b) => b.score - a.score);
          rank.top.slice(0, this.rankNum);
        } else if (
          rank.top[rank.top.length - 1].score === this.score[key] &&
          !rank.top[rank.top.length - 1].cy.includes(this.cy)
        ) {
          rank.top[rank.top.length - 1].cy.push(this.cy);
        }
        if (
          (findItem = rank.bottom.find((el) => el.score === this.score[key]))
        ) {
          if (!findItem.cy.includes(this.cy)) findItem.cy.push(this.cy);
        } else if (
          rank.bottom.length < this.rankNum ||
          rank.bottom[rank.bottom.length - 1].score > this.score[key]
        ) {
          rank.bottom.push({ score: this.score[key], cy: [this.cy] });
          rank.bottom.sort((a, b) => a.score - b.score);
          rank.bottom.slice(0, this.rankNum);
        } else if (
          rank.bottom[rank.top.length - 1].score === this.score[key] &&
          !rank.bottom[rank.top.length - 1].cy.includes(this.cy)
        ) {
          rank.bottom[rank.top.length - 1].cy.push(this.cy);
        }
      });
      this.history.num++;
      localStorage.setItem("cyHistory", JSON.stringify(this.history));
    },
  },
  created() {
    this.reset();
  },
  mounted() {
    document.addEventListener("keyup", (e) => {
      if (/^[a-z]$/.test(e.key)) {
        this.keyInput(e.key.toUpperCase());
      } else if (e.key === "Backspace") {
        this.keyInput("⌫");
      } else if (e.key === "Enter") {
        this.keyInput("Enter");
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.cy-pinyin {
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .cy-input {
    margin-top: 10px;
    .cy-row {
      display: flex;
      margin-bottom: 10px;
      .cy-block {
        display: flex;
        &:not(:last-child) {
          margin-right: 10px;
        }
        .cy-cell {
          width: 50px;
          height: 50px;
          text-align: center;
          line-height: 50px;
          &:not(:last-child) {
            margin-right: 2px;
          }
          background-color: #edf2f7;
          user-select: none;
          color: #718096;
          &.cy-cell-pass {
            background-color: #38a169;
            color: #fff;
          }
          &.cy-cell-has {
            background-color: #d69e2e;
            color: #fff;
          }
          &.cy-cell-error {
            background-color: #718096;
            color: #fff;
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
    }
  }
  .keyboard {
    .key-row {
      display: flex;
      justify-content: center;
      margin-bottom: 5px;
      width: 665px;
      .key-cell {
        padding: 0 26px;
        height: 40px;
        border-radius: 3px;
        background-color: #e2e8f0;
        text-align: center;
        line-height: 40px;
        user-select: none;
        &:not(:last-child) {
          margin-right: 5px;
        }
        color: #718096;
        &.key-cell-pass {
          background-color: #38a169;
          color: #fff;
        }
        &.key-cell-has {
          background-color: #d69e2e;
          color: #fff;
        }
        &.key-cell-error {
          background-color: #718096;
          color: #fff;
        }
      }
    }
  }
}
.rank-dialog {
  ::v-deep {
    .el-dialog__body {
      padding-top: 0;
    }
  }
}
</style>
