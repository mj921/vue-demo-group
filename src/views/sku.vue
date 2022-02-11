<template>
  <div>
    <dl>
      <el-button
        v-for="item in colors"
        :type="color === item.label ? 'primary' : 'default'"
        :key="item.label"
        @click="toggle(item.label, 'color')"
        :disabled="isDisabled(item.label, 'color')"
      >
        {{ item.title }}
      </el-button>
    </dl>
    <dl>
      <el-button
        v-for="item in types"
        :type="type === item.label ? 'primary' : 'default'"
        :key="item.label"
        @click="toggle(item.label, 'type')"
        :disabled="isDisabled(item.label, 'type')"
      >
        {{ item.title }}
      </el-button>
    </dl>
    <dl>
      <el-button
        v-for="item in sizes"
        :type="size === item.label ? 'primary' : 'default'"
        :key="item.label"
        @click="toggle(item.label, 'size')"
        :disabled="isDisabled(item.label, 'size')"
      >
        {{ item.title }}
      </el-button>
    </dl>
  </div>
</template>

<script>
export default {
  data() {
    const colors = [
      {
        title: "黑色",
        label: "1",
      },
      {
        title: "白色",
        label: "2",
      },
    ];
    const sizes = [
      {
        title: "S",
        label: "1",
      },
      {
        title: "M",
        label: "2",
      },
    ];
    const types = [
      {
        title: "衣服",
        label: "1",
      },
      {
        title: "裤子",
        label: "2",
      },
    ];
    const zuhe = ["112", "111", "121"];
    return {
      color: "",
      size: "",
      type: "",
      colors,
      sizes,
      types,
      zuhe,
    };
  },
  methods: {
    reg(val, type) {
      return new RegExp(
        `${type === "color" ? val : this.color || "."}${
          type === "size" ? val : this.size || "."
        }${type === "type" ? val : this.type || "."}`
      );
    },
    isDisabled(val, type) {
      return this.zuhe.every((item) => !this.reg(val, type).test(item));
    },
    toggle(val, type) {
      if (this[type] === val) {
        this[type] === "";
        this.$set(this, type, "");
      } else {
        this.$set(this, type, val);
      }
    },
  },
};
</script>

<style></style>
