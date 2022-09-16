<template>
  <div class="creation">
    <el-button type="primary" size="default" @click="restart">重置</el-button>
    物品数：{{ goodsList.length }} 配方数：{{ combinationNum }}
    <el-form
      :model="combinationForm"
      ref="combinationForm"
      :rules="combinationRules"
      label-width="80px"
      :inline="false"
      size="small"
    >
      <el-form-item label="">
        <el-checkbox v-model="onlyShowHas">只展示可配方</el-checkbox>
        <el-checkbox v-model="onlyShowNullRecord">只展示无记录</el-checkbox>
      </el-form-item>
      <el-form-item label="原材料1" prop="origin1">
        <el-select
          v-model="combinationForm.origin1"
          filterable
          @change="origin1Change"
        >
          <el-option
            v-for="item in onlyShowHas
              ? goodsListHasStatus.filter((el) => el.num > 0)
              : goodsListHasStatus"
            :key="item.name"
            :label="item.name"
            :value="item.name"
          >
            <div style="display: flex; justify-content: space-between">
              <span>{{ item.name }}</span>
              <span
                :style="{
                  color: item.hasNum === 0 ? '#000' : 'red',
                }"
                >{{ item.hasNum }}</span
              >
              <span
                :style="{
                  color: item.num === 0 ? '#b1b6b1' : '#000',
                }"
                >{{ item.num }}</span
              >
            </div>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="原材料2" prop="origin2">
        <el-select
          v-model="combinationForm.origin2"
          :disabled="!combinationForm.origin1"
          value-key="goods"
        >
          <el-option
            v-for="item in onlyShowNullRecord
              ? goodCombinationList.filter((el) => el.status === '没记录')
              : goodCombinationList"
            :key="item.goods"
            :label="item.goods"
            :value="item"
            :disabled="item.status === '无产物'"
          >
            <div style="display: flex; justify-content: space-between">
              <span>{{ item.goods }}</span>
              <span
                :style="{
                  color:
                    item.status === '有产物'
                      ? 'red'
                      : item.status === '无产物'
                      ? '#b1b6b1'
                      : '#000',
                }"
                >{{ item.status }}</span
              >
            </div>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="check">检查</el-button>
        <el-button size="small" @click="reset">清空</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import goodsData from "./goods.json";
import combinationData from "./combination.json";

export default {
  name: "Index",
  data() {
    const combinationListStr = localStorage.getItem("combinationList");
    let combinationList = [];
    if (combinationListStr) {
      combinationList = JSON.parse(combinationListStr);
    }
    const goodsListStr = localStorage.getItem("goodsList");
    let goodsList = JSON.parse(JSON.stringify(goodsData.slice(0, 4)));
    if (goodsListStr) {
      goodsList = JSON.parse(goodsListStr);
    }
    return {
      goodsList,
      combinationList,
      goodCombinationList: [],
      combinationForm: {
        origin1: "",
        origin2: "",
        result: "",
      },
      combinationRules: {
        origin1: [
          {
            required: true,
            message: "请选择原材料1",
            trigger: "change",
          },
        ],
        origin2: [
          {
            required: true,
            message: "请选择原材料2",
            trigger: "change",
          },
        ],
      },
      onlyShowNullRecord: false,
      onlyShowHas: false,
    };
  },
  computed: {
    goodsListHasStatus() {
      const goodsMap = this.goodsList.reduce((map, el) => {
        map[el.name] = {
          ...el,
          num: this.goodsList.length,
          hasNum: 0,
        };
        return map;
      }, {});
      this.combinationList.forEach((el) => {
        if (el.origin[0] === el.origin[1]) {
          goodsMap[el.origin[0]].num--;
          el.result && goodsMap[el.origin[0]].hasNum++;
        } else {
          goodsMap[el.origin[0]].num--;
          goodsMap[el.origin[1]].num--;
          if (el.result) {
            goodsMap[el.origin[0]].hasNum++;
            goodsMap[el.origin[1]].hasNum++;
          }
        }
      });
      return Object.values(goodsMap);
    },
    combinationNum() {
      return this.combinationList.filter((el) => el.result).length;
    },
  },
  methods: {
    getGoodsCombinationStatus(goods) {
      if (!goods) return;
      const combinationStatus = this.goodsList.reduce((map, el) => {
        map[el.name] = "没记录";
        return map;
      }, {});
      this.combinationList.forEach((el) => {
        if (el.origin.includes(goods)) {
          let goodsName = el.origin
            .join(",")
            .replace(new RegExp(`(${goods},|,${goods})`), "");
          combinationStatus[goodsName] = el.result ? "有产物" : "无产物";
        }
      });
      const arr = [];
      for (let key in combinationStatus) {
        arr.push({
          goods: key,
          status: combinationStatus[key],
        });
      }
      this.goodCombinationList = arr;
    },
    origin1Change(goods) {
      this.getGoodsCombinationStatus(goods);
    },
    reset() {
      this.$refs.combinationForm.resetFields();
    },
    restart() {
      localStorage.removeItem("combinationList");
      localStorage.removeItem("goodsList");
      location.reload();
    },
    check() {
      this.$refs.combinationForm.validate((valid) => {
        if (valid) {
          const { origin1, origin2: originData2 } = this.combinationForm;
          const { goods: origin2 } = originData2;
          const combination =
            origin1 === origin2
              ? combinationData.find(
                  (el) =>
                    el.origin[0] === el.origin[1] && el.origin[0] === origin1
                )
              : combinationData.find(
                  (el) =>
                    el.origin.includes(origin1) && el.origin.includes(origin2)
                );
          if (combination) {
            this.combinationList.push(JSON.parse(JSON.stringify(combination)));
            if (!this.goodsList.find((el) => el.name === combination.result)) {
              this.goodsList.push(
                goodsData.find((el) => el.name === combination.result)
              );
              localStorage.setItem("goodsList", JSON.stringify(this.goodsList));
            }
            this.$message.success(combination.result);
          } else {
            this.combinationList.push({
              origin: [origin1, origin2],
              result: "",
            });
            this.$message.warning("没有此配方");
          }
          this.reset();
          localStorage.setItem(
            "combinationList",
            JSON.stringify(this.combinationList)
          );
        } else {
          this.$message.error("请检查表单");
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.creation {
  .el-select {
    width: 100%;
  }
  .origin2-option {
    display: flex;
    justify-content: space-between;
  }
}
</style>
