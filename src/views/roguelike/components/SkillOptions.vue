<template>
  <div class="skill-options" v-show="visible">
    <dl
      class="skill-option"
      v-for="skill in skills"
      :key="`skillOption-${skill.id}`"
      @click="selectSkill(skill)"
    >
      {{ skill.desc() }}
    </dl>
  </div>
</template>
<script>
export default {
  name: "SkillOptions",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    skills: {
      type: Array,
      default: () => [],
    },
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
    selectSkill(skill) {
      this.$emit("select", skill);
      this.visible = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.skill-options {
  display: flex;
  padding: 20px;
  background-color: #fefee3;
  .skill-option {
    width: 30%;
    border: 1px solid;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 12px;
    padding: 5px;
    line-height: 16px;
    background-color: #f2febb;
    &:not(:last-child) {
      margin-right: 5%;
    }
  }
}
</style>
