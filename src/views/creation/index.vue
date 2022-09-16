<template>
  <div class="creation">
    <div>
      <el-button type="primary" size="small" @click="categoryVisible = true">
        新增分类
      </el-button>
      <el-button type="primary" size="small" @click="goodsVisible = true">
        新增物品
      </el-button>
      <el-button type="primary" size="small" @click="combinationVisible = true">
        新增组合
      </el-button>
      <el-button type="primary" size="small" @click="goodsSearchVisible = true">
        物品查询
      </el-button>
      <el-button
        type="primary"
        size="small"
        @click="goodsCategoryVisible = true"
      >
        物品分类
      </el-button>
    </div>
    <el-dialog title="新增分类" :visible.sync="categoryVisible" width="300px">
      <div>
        <el-input v-model="newCategory" placeholder="分类" clearable />
      </div>
      <span slot="footer">
        <el-button size="small" @click="categoryVisible = false">
          取消
        </el-button>
        <el-button size="small" type="primary" @click="addCategory">
          确定
        </el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="新增物品"
      :visible.sync="goodsVisible"
      width="400px"
      @opened="goodsOpened"
      @closed="goodsClosed"
    >
      <el-form
        :model="goodsForm"
        ref="goodsForm"
        :rules="goodsRules"
        label-width="60px"
        :inline="false"
        size="small"
      >
        <el-form-item label="名称" prop="name">
          <el-input v-model="goodsForm.name"></el-input>
        </el-form-item>
        <el-form-item label="分类" prop="category">
          <el-select v-model="goodsForm.category" multiple filterable>
            <el-option
              v-for="item in categoryList"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="属性" prop="prop">
          <el-select v-model="goodsForm.prop">
            <el-option
              v-for="item in propList"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button size="small" @click="goodsVisible = false"> 取消 </el-button>
        <el-button size="small" type="primary" @click="addGoods">
          确定
        </el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="新增组合"
      :visible.sync="combinationVisible"
      width="500px"
      @opened="combinationOpened"
      @closed="combinationClosed"
    >
      <el-form
        :model="combinationForm"
        ref="combinationForm"
        :rules="combinationRules"
        label-width="80px"
        :inline="false"
        size="small"
      >
        <el-form-item label="">
          <el-checkbox v-model="onlyShowNullRecord">只展示无记录</el-checkbox>
          <el-checkbox v-model="finallyShow">展示最终</el-checkbox>
        </el-form-item>
        <el-form-item label="原材料1" prop="origin1">
          <el-select
            v-model="combinationForm.origin1"
            filterable
            @change="origin1Change"
          >
            <el-option
              v-for="item in finallyShow
                ? goodsList
                : goodsList.filter((el) => el.prop !== '最终')"
              :key="item.name"
              :label="item.name"
              :value="item.name"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="原材料2" prop="origin2">
          <el-select
            v-model="combinationForm.origin2"
            :disabled="!combinationForm.origin1"
            filterable
            multiple
          >
            <el-option
              v-for="item in originList2"
              :key="item.goods"
              :label="item.goods"
              :value="item.goods"
            >
              <div style="display: flex; justify-content: space-between">
                <span>{{ item.goods }}</span>
                <span
                  :style="{
                    color:
                      item.status === '无产物'
                        ? '#b1b6b1'
                        : item.status === '没记录'
                        ? '#000'
                        : 'red',
                  }"
                  >{{ item.status }}</span
                >
              </div>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产物" prop="result">
          <el-select v-model="combinationForm.result" filterable>
            <el-option
              v-for="item in [...goodsList].reverse()"
              :key="item.name"
              :label="item.name"
              :value="item.name"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button size="small" @click="combinationVisible = false">
          取消
        </el-button>
        <el-button size="small" type="primary" @click="addCombination">
          确定
        </el-button>
      </span>
    </el-dialog>
    <el-drawer
      custom-class="goods-search"
      title="物品查询"
      :visible.sync="goodsSearchVisible"
      size="600px"
    >
      <div>
        <el-select
          v-model="goodsSearch"
          filterable
          @change="goodsCombinationSearch"
        >
          <el-option
            v-for="item in goodsList"
            :key="item.name"
            :label="item.name"
            :value="item.name"
          >
          </el-option>
        </el-select>
        <el-tabs v-model="goodsSearchTab" type="card" tab-position="top">
          <el-tab-pane label="原料" name="原料">
            <div>共{{ originCombinationList.length }}种</div>
            <ul>
              <li
                v-for="item in originCombinationList"
                :key="`${item.origin.join('+')}=${item.result}`"
              >
                {{ item.origin.join(" + ") }} = {{ item.result }}
              </li>
            </ul>
          </el-tab-pane>
          <el-tab-pane label="产物" name="产物">
            <div>共{{ resultCombinationList.length }}种</div>
            <ul>
              <li
                v-for="item in resultCombinationList"
                :key="`${item.origin.join('+')}=${item.result}`"
              >
                {{ item.origin.join(" + ") }} = {{ item.result }}
              </li>
            </ul>
          </el-tab-pane>
          <el-tab-pane label="详情" name="详情">
            <div>共发现{{ goodsCombinationDetail.total }}种</div>
            <div>可组合{{ goodsCombinationDetail.hasCombination }}种</div>
            <div>
              组合率
              {{
                goodsCombinationDetail.total
                  ? (
                      (goodsCombinationDetail.hasCombination /
                        goodsCombinationDetail.total) *
                      100
                    ).toFixed(5)
                  : 0
              }}%
            </div>
            <div>不能组合{{ goodsCombinationDetail.notCombination }}种</div>
            <div>
              不能组合率
              {{
                goodsCombinationDetail.total
                  ? (
                      (goodsCombinationDetail.notCombination /
                        goodsCombinationDetail.total) *
                      100
                    ).toFixed(5)
                  : 0
              }}%
            </div>
            <div>
              未尝试{{
                goodsCombinationDetail.total -
                goodsCombinationDetail.hasCombination -
                goodsCombinationDetail.notCombination
              }}种
            </div>
            <div>
              未尝试率
              {{
                goodsCombinationDetail.total
                  ? (
                      ((goodsCombinationDetail.total -
                        goodsCombinationDetail.hasCombination -
                        goodsCombinationDetail.notCombination) /
                        goodsCombinationDetail.total) *
                      100
                    ).toFixed(5)
                  : 0
              }}%
            </div>
            <div>
              尝试率
              {{
                goodsCombinationDetail.total
                  ? (
                      ((goodsCombinationDetail.hasCombination +
                        goodsCombinationDetail.notCombination) /
                        goodsCombinationDetail.total) *
                      100
                    ).toFixed(5)
                  : 0
              }}%
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-drawer>
    <el-drawer
      custom-class="goods-category"
      title="物品分类"
      :visible.sync="goodsCategoryVisible"
      size="1200px"
      @open="getGoodsCategory"
    >
      <el-tabs v-model="goodsCategoryTab" tab-position="top">
        <el-tab-pane
          v-for="item in goodsCategory"
          :key="item.name"
          :label="`${item.name}(${item.children.length})`"
          :name="item.name"
        >
          <div>共{{ item.children.length }}种</div>
          <ul>
            <li v-for="el in item.children" :key="`${item.name}-${el}`">
              {{ el }}
            </li>
          </ul>
        </el-tab-pane>
      </el-tabs>
    </el-drawer>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "Index",
  data() {
    return {
      categoryVisible: false,
      goodsVisible: false,
      combinationVisible: false,
      goodsSearchVisible: false,
      goodsCategoryVisible: false,
      newCategory: "",
      propList: ["基础", "普通", "最终"],
      categoryList: [],
      goodsList: [],
      goodCombinationList: [],
      goodsForm: {
        name: "",
        category: "",
        prop: "",
      },
      goodsRules: {
        name: [
          {
            required: true,
            message: "请输入物品名称",
            trigger: "blur",
          },
        ],
        category: [],
        prop: [
          {
            required: true,
            message: "请选择物品属性",
            trigger: "change",
          },
        ],
      },
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
      finallyShow: false,
      goodsSearchTab: "原料",
      goodsSearch: "",
      originCombinationList: [],
      resultCombinationList: [],
      goodsCombinationDetail: {
        total: 0,
        hasCombination: 0,
        notCombination: 0,
      },
      goodsCategory: {},
      goodsCategoryTab: "",
    };
  },
  computed: {
    originList2() {
      const list = this.onlyShowNullRecord
        ? this.goodCombinationList.filter((el) => el.status === "没记录")
        : this.goodCombinationList;
      const list1 = this.finallyShow
        ? list
        : list.filter((el) => el.prop !== "最终");
      list1.sort((a, b) => (a.py > b.py ? 1 : -1));
      return list1;
    },
  },
  methods: {
    getCategoryList() {
      axios.get("/api/creation/category").then((res) => {
        this.categoryList = res.data.data || [];
      });
    },
    getGoodsList() {
      axios.get("/api/creation/goods").then((res) => {
        this.goodsList = res.data.data || [];
      });
    },
    addCategory() {
      if (this.newCategory) {
        axios
          .post("/api/creation/category", {
            category: this.newCategory,
          })
          .then((res) => {
            if (res.data.success) {
              this.$message.success("新增成功");
              this.getCategoryList();
              this.newCategory = "";
              this.categoryVisible = false;
            } else {
              this.$message.error(res.data.message);
            }
          });
      } else {
        this.$message.error("请输入分类");
      }
    },
    goodsOpened() {
      this.$refs.goodsForm.clearValidate();
    },
    goodsClosed() {
      this.goodsForm = {
        name: "",
        category: "",
        prop: "普通",
      };
    },
    combinationOpened() {
      this.$refs.combinationForm.clearValidate();
      if (this.combinationForm.origin1) {
        this.getGoodsCombinationStatus(this.combinationForm.origin1);
      }
    },
    combinationClosed() {
      this.combinationForm = {
        origin1: this.combinationForm.origin1,
        origin2: "",
        result: "",
      };
    },
    addGoods() {
      this.$refs.goodsForm.validate((valid) => {
        if (valid) {
          axios
            .post("/api/creation/goods", {
              name: this.goodsForm.name,
              category: this.goodsForm.category,
              prop: this.goodsForm.prop,
            })
            .then((res) => {
              if (res.data.success) {
                this.$message.success("新增成功");
                this.getGoodsList();
                this.goodsVisible = false;
              } else {
                this.$message.error(res.data.message);
              }
            });
        } else {
          this.$message.error("请检查表单");
        }
      });
    },
    getGoodsCombinationStatus(goods) {
      if (!goods) return;
      axios({
        method: "get",
        url: "/api/creation/goods/combinationStatus",
        params: {
          goods,
        },
      }).then((res) => {
        const data = res.data.data || {};
        const arr = [];
        for (let key in data) {
          arr.push({
            goods: key,
            status: data[key].status,
            py: data[key].py,
          });
        }
        this.goodCombinationList = arr;
      });
    },
    origin1Change(goods) {
      this.getGoodsCombinationStatus(goods);
    },
    addCombination() {
      this.$refs.combinationForm.validate((valid) => {
        if (valid) {
          axios
            .post("/api/creation/combination", {
              origin1: this.combinationForm.origin1,
              origin2: this.combinationForm.origin2,
              result: this.combinationForm.result,
            })
            .then((res) => {
              if (res.data.success) {
                this.$message.success("新增成功");
                this.combinationVisible = false;
              } else {
                this.$message.error(res.data.message);
              }
            });
        } else {
          this.$message.error("请检查表单");
        }
      });
    },
    goodsCombinationSearch() {
      axios
        .get("/api/creation/goods/combination", {
          params: {
            goods: this.goodsSearch,
          },
        })
        .then((res) => {
          const data = res.data.data || {};
          this.originCombinationList = data.originCombinationList || [];
          this.resultCombinationList = data.resultCombinationList || [];
        });
      axios
        .get("/api/creation/goods/combinationStatus", {
          params: {
            goods: this.goodsSearch,
          },
        })
        .then((res) => {
          const data = res.data.data || {};
          const detail = {
            total: 0,
            hasCombination: 0,
            notCombination: 0,
          };
          for (let key in data) {
            detail.total++;
            if (data[key].status === "无产物") {
              detail.notCombination++;
            } else if (data[key].status !== "没记录") {
              detail.hasCombination++;
            }
          }
          this.goodsCombinationDetail = detail;
        });
    },
    getGoodsCategory() {
      axios.get("/api/creation/category/goods").then((res) => {
        const goodsCategory = res.data.data || {};
        this.goodsCategory = Object.keys(goodsCategory).map((key) => ({
          key,
          ...goodsCategory[key],
        }));
        this.goodsCategory.sort(
          (a, b) => b.children.length - a.children.length
        );
        this.goodsCategoryTab = this.goodsCategory[0].name;
      });
    },
  },
  created() {
    this.getCategoryList();
    this.getGoodsList();
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
  .el-drawer__wrapper {
    /deep/ {
      .el-drawer__header {
        margin-bottom: 20px;
      }
      .el-drawer__body {
        padding: 0 20px;
        .el-select {
          margin-bottom: 10px;
        }
      }
    }
  }
}
</style>
