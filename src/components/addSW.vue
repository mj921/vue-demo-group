<template>
  <el-dialog title="新增" :visible.sync="visible" width="400px" @close="close">
    <el-form
      :model="form"
      ref="form"
      label-width="80px"
      :inline="false"
      size="normal"
    >
      <el-form-item label="名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="form.type">
          <el-option
            v-for="item in types"
            :key="item"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <span slot="footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="save">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      form: {
        name: "",
        type: "",
      },
      types: [
        "界",
        "门",
        "亚门",
        "纲",
        "亚纲",
        "目",
        "亚目",
        "科",
        "亚科",
        "族",
        "属",
        "种",
        "亚种",
      ],
    };
  },
  computed: {
    visible: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
  methods: {
    save() {
      this.$emit("save", this.form);
    },
    close() {
      this.form = {
        name: "",
        type: "",
      };
    },
  },
};
</script>

<style></style>
