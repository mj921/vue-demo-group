<template>
  <div>
    <el-table :data="[{}]" size="small" border ref="insureTable">
      <el-table-column
        prop="rowLabel"
        label="与投保人关系"
        width="180"
        fixed="left"
        align="center"
      >
        <template v-slot>
          <div>222</div>
        </template>
      </el-table-column>
      <el-table-column
        v-for="(item, index) in forms"
        :key="index"
        width="280"
        align="center"
      >
        <template slot="header">
          <span>{{ 111 }}</span>
        </template>
        <template v-slot>
          <el-form
            :model="item"
            :ref="'formRefArea' + index"
            class="table-form"
          >
            <el-form-item
              prop="name"
              :rules="[
                {
                  required: true,
                  message: '请选择所在地区',
                },
              ]"
              class="birthday-item"
            >
              <el-cascader
                v-model="item.name"
                clearable
                :props="props"
                @change="nameChange"
              >
              </el-cascader>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-form
      v-for="(form, index) in forms"
      :key="index"
      :model="form"
      ref="form"
      :rules="rules"
      label-width="80px"
      :inline="false"
      size="normal"
    >
      <el-form-item label="" prop="name">
        <el-cascader
          :options="options"
          v-model="form.name"
          clearable
          filterable
          :show-all-levels="false"
          :props="{
            checkStrictly: true,
          }"
          @change="nameChange"
        >
        </el-cascader>
      </el-form-item>
    </el-form> -->
  </div>
</template>
<script>
export default {
  name: "HelloWorld",
  props: {
    obj: Array,
  },
  data() {
    return {
      forms: [],
      rules: {
        name: [
          {
            required: true,
            message: "请输入名称",
            trigger: "change",
          },
        ],
      },
      options: [
        {
          value: 1,
          label: "Zhejiang",
          children: [
            {
              value: 2,
              label: "Hangzhou",
              children: [
                {
                  value: 3,
                  label: "West Lake",
                },
              ],
            },
          ],
        },
        {
          value: 4,
          label: "Jiangsu",
          children: [
            {
              value: 5,
              label: "Nanjing",
              children: [
                {
                  value: 6,
                  label: "Zhong Hua Men",
                },
              ],
            },
          ],
        },
      ],
      props: {
        checkStrictly: true,
        lazy: true,
        lazyLoad(node, resolve) {
          const { level } = node;
          let data = [];
          if (level === 0) {
            data = [
              {
                value: 1,
                label: 1,
                leaf: false,
              },
            ];
          }
          if (level === 1) {
            data = [
              {
                value: 2,
                label: 2,
                leaf: false,
              },
            ];
          }
          if (level === 2) {
            data = [
              {
                value: 3,
                label: 3,
                leaf: true,
              },
            ];
          }
          setTimeout(() => {
            resolve(data);
          }, 1000);
        },
      },
    };
  },
  watch: {
    obj: {
      handler(val) {
        this.forms = val;
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    nameChange(val) {
      console.log(val);
    },
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          console.log("submit!");
        } else {
          console.log("error submit!");
          return false;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped></style>
