<template>
  <div>
    <!-- <el-table :data="tableData" border stripe>
      <el-table-column prop="rowLabel"></el-table-column> -->
    <!-- <el-table-column label="ddd">
        <template v-slot="{ row }">
          <template v-if="row.rowKey === 'name'">
            <el-form :model="tableSource[0]" v-if="row.rowKey === 'name'">
              <el-form-item
                prop="name"
                :rules="[{ required: false, message: '请选择性别' }]"
              >
                <el-input
                  v-model="tableSource[0].name"
                  @blur="blur(tableSource[0])"
                >
                </el-input>
                <el-input v-model="tableSource[0].name1"> </el-input>
                {{ tableSource[0].name1 }}
              </el-form-item>
            </el-form>
          </template>
          <el-form :model="tableSource[0]" v-else-if="row.rowKey === 'age'">
            <el-form-item
              prop="date"
              :rules="[{ required: false, message: '请选择性别' }]"
            >
              <el-date-picker
                v-model="tableSource[0].date"
                type="year"
                size="normal"
                placeholder="选择日期时间"
                @change="change(tableSource[0])"
              >
              </el-date-picker>
              <input type="text" v-model="tableSource[0].age" />
              {{ tableSource[0].age }}
            </el-form-item>
          </el-form>
        </template>
      </el-table-column> -->
    <!-- <el-table-column v-for="itemColumn in tableSource" :key="itemColumn.key">
        <template v-slot:header>{{ itemColumn.key }}</template>
        <template v-slot="{ row }">
          <template v-if="row.rowKey === 'name'">
            <el-form :model="itemColumn" v-if="row.rowKey === 'name'">
              <el-form-item
                prop="name"
                :rules="[{ required: false, message: '请选择性别' }]"
              >
                <el-input v-model="itemColumn.name" @blur="blur(itemColumn)">
                </el-input>
                <el-input v-model="itemColumn.name1"> </el-input>
                {{ itemColumn.name1 }}
              </el-form-item>
            </el-form>
          </template>
          <el-form :model="itemColumn" v-else-if="row.rowKey === 'age'">
            <el-form-item
              prop="date"
              :rules="[{ required: false, message: '请选择性别' }]"
            >
              <el-date-picker
                v-model="itemColumn.date"
                type="year"
                size="normal"
                placeholder="选择日期时间"
                @change="change(itemColumn)"
              >
              </el-date-picker>
              <input type="text" v-model="itemColumn.age" />
              {{ itemColumn.age }}
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
    </el-table> -->
    <!-- <el-table :data="tableSource" border stripe>
      <el-table-column prop="name" label="name">
        <template v-slot="{ row }">
          <el-form :model="row">
            <el-form-item
              prop="name"
              :rules="[{ required: false, message: '请选择性别' }]"
            >
              <el-input v-model="row.name" @blur="blur(row)"> </el-input>
              <el-input v-model="row.name1"> </el-input>
              {{ row.name1 }}
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
    </el-table> -->

    <!-- <div>
      <dl v-for="(row, i) in tableData" :key="`row-${i}`" style="display: flex">
        <dd>{{ row.rowLabel }}</dd>
        <dd v-for="item in tableSource" :key="item.key">
          <template v-if="row.rowKey === 'name'">
            <input v-model="item.name" @blur="blur(item)" />
            {{ item.name1 }}
          </template>
          <el-form :model="item" v-else-if="row.rowKey === 'age'">
            <el-form-item
              prop="date"
              :rules="[{ required: false, message: '请选择性别' }]"
            >
              <el-date-picker
                v-model="item.date"
                type="year"
                size="normal"
                placeholder="选择日期时间"
                @change="change(item)"
              >
              </el-date-picker>
              <input type="text" v-model="item.age" />
              {{ item.age }}
            </el-form-item>
          </el-form>
        </dd>
      </dl>
    </div> -->
    <d-table :data="tableData">
      <d-table-column prop="rowLabel"></d-table-column>
      <d-table-column v-for="itemColumn in tableSource" :key="itemColumn.key">
        <template v-slot:header>{{ itemColumn.key }}</template>
        <template v-slot="{ row }">
          <template v-if="row.rowKey === 'name'">
            <el-form :model="itemColumn" v-if="row.rowKey === 'name'">
              <el-form-item
                prop="name"
                :rules="[{ required: false, message: '请选择性别' }]"
              >
                <el-input v-model="itemColumn.name" @blur="blur(itemColumn)">
                </el-input>
                <el-input v-model="itemColumn.name1"> </el-input>
                {{ itemColumn.name1 }}
              </el-form-item>
            </el-form>
          </template>
          <el-form :model="itemColumn" v-else-if="row.rowKey === 'age'">
            <el-form-item
              prop="date"
              :rules="[{ required: false, message: '请选择性别' }]"
            >
              <el-date-picker
                v-model="itemColumn.date"
                type="year"
                size="normal"
                placeholder="选择日期时间"
                @change="change(itemColumn)"
              >
              </el-date-picker>
              <input type="text" v-model="itemColumn.age" />
              {{ itemColumn.age }}
            </el-form-item>
          </el-form>
        </template>
      </d-table-column>
    </d-table>
  </div>
</template>

<script>
import DTable from "./DTable/index.vue";
import DTableColumn from "./DTable/DTableColumn.vue";
export default {
  components: { DTable, DTableColumn },
  name: "listSetChildDemo",
  props: {
    list: Array,
  },
  data() {
    return {
      tableData: [
        {
          rowKey: "name",
          rowLabel: "name",
        },
        {
          rowKey: "age",
          rowLabel: "age",
        },
      ],
      tableSource: [],
    };
  },
  watch: {
    list: {
      handler(obj) {
        this.tableSource = JSON.parse(JSON.stringify(obj));
        console.log("list");
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    change(row) {
      console.log(222);
      console.log(this.$set(row, "age", row.date));
      console.log(333);
    },
    blur(row) {
      console.log(
        "-----------------------------------------------------------"
      );
      console.log(row);
      console.log(this.$set(row, "name1", row.name));
    },
  },
  updated(...args) {
    console.log(args, "update");
  },
  beforeUpdate(...args) {
    console.log(args, "beforeUpdate");
  },
};
</script>

<style></style>
