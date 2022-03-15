export const SkillType = {
  /** 获得时触发 */
  GET_TRIGGER: 1,
  /** 战斗中触发 */
  BATTLE_TRIGGER: 2,
  /** 战斗胜利触发 */
  BATTLE_WIN_TRIGGER: 3,
};
export const TriggerType = {
  /** 获得时 */
  OBTAIN: 1,
  /** 定时一次性属性 */
  TIME_ONCE: 2,
  /** 定时间隔属性 */
  TIME_INTERVAL: 3,
  /** 受到攻击 */
  UNDER_ATTACK: 4,
  /** 受到伤害 */
  UNDER_DAMAGE: 5,
};
export const EffectType = {
  /** 属性 */
  PROP: 1,
  /** 伤害 */
  DAMAGE: 2,
  /** 概率伤害 */
  PROBABILITY_DAMAGE: 3,
  /** 回血 */
  RESTORE_HP: 4,
  /** 概率回血 */
  PROBABILITY_RESTORE_HP: 5,
  /** 条件回血 */
  CONDITION_RESTORE_HP: 6,
  /** 减伤 */
  REDUCTION_DAMAGE: 7,
  /** 概率减伤 */
  PROBABILITY_REDUCTION_DAMAGE: 8,
};
export const ValueType = {
  /** 固定值 */
  FIXED_VALUE: 1,
  /** 百分比 */
  PERCENTAGE: 2,
  /** 公式 */
  FORMULA: 3,
};
export const TargetType = {
  /** 自身  */
  SELF: 1,
  /** 敌人 */
  ENEMY: 2,
};
/**
 * skillType: 技能类型
 * effects: 技能效果
 * effects.skillType: 技能效果类型
 * effects.propKey: 属性key
 * effects.propNum: 属性数值
 * effects.triggerTime: 技能效果触发时间
 * desc: 描述方法
 */
export const skillData = [
  {
    id: 1,
    name: "",
    skillType: SkillType.GET_TRIGGER,
    effects: [
      {
        triggerType: TriggerType.OBTAIN,
        effectType: EffectType.PROP,
        targetType: TargetType.SELF,
        valueType: ValueType.FIXED_VALUE,
        propKey: "atk",
        propNum: 3,
        propType: TargetType.SELF,
      },
    ],
    maxLv: 0,
    desc: function () {
      const { lv = 1 } = this;
      return `增加${lv * this.effects[0].propNum}攻击力`;
    },
  },
  {
    id: 2,
    name: "",
    skillType: SkillType.BATTLE_TRIGGER,
    effects: [
      {
        triggerType: TriggerType.TIME_ONCE,
        effectType: EffectType.PROP,
        targetType: TargetType.SELF,
        valueType: ValueType.FIXED_VALUE,
        propKey: "atk",
        propNum: 6,
        triggerTime: 0,
      },
      {
        triggerType: TriggerType.TIME_ONCE,
        effectType: EffectType.PROP,
        targetType: TargetType.SELF,
        valueType: ValueType.FIXED_VALUE,
        propKey: "atk",
        propNum: -6,
        triggerTime: 2000,
      },
    ],
    maxLv: 0,
    desc: function () {
      const { lv = 1 } = this;
      return `战斗开始2秒内增加${lv * this.effects[0].propNum}攻击力`;
    },
  },
  {
    id: 3,
    name: "",
    skillType: SkillType.BATTLE_TRIGGER,
    effects: [
      {
        triggerType: TriggerType.TIME_INTERVAL,
        effectType: EffectType.PROP,
        targetType: TargetType.SELF,
        valueType: ValueType.FIXED_VALUE,
        propKey: "atk",
        propNum: 1,
        intervalTime: 1000,
      },
    ],
    maxLv: 0,
    desc: function () {
      const { lv = 1 } = this;
      return `每秒增加${lv * this.effects[0].propNum}攻击力`;
    },
  },
  {
    id: 4,
    name: "",
    skillType: SkillType.BATTLE_TRIGGER,
    effects: [
      {
        triggerType: TriggerType.UNDER_ATTACK,
        effectType: EffectType.PROBABILITY_DAMAGE,
        targetType: TargetType.ENEMY,
        valueType: ValueType.FIXED_VALUE,
        damage: 7,
        probability: 30,
      },
    ],
    maxLv: 0,
    desc: function () {
      const { lv = 1 } = this;
      const { probability, damage } = this.effects[0];
      return `受到攻击时${probability}%概率造成${lv * damage}点伤害`;
    },
  },
  {
    id: 5,
    name: "",
    skillType: SkillType.BATTLE_TRIGGER,
    effects: [
      {
        triggerType: TriggerType.UNDER_ATTACK,
        effectType: EffectType.PROBABILITY_REDUCTION_DAMAGE,
        targetType: TargetType.SELF,
        valueType: ValueType.FIXED_VALUE,
        reductionDamage: 3,
        probability: 30,
      },
    ],
    maxLv: 0,
    desc: function () {
      const { lv = 1 } = this;
      const { probability, reductionDamage } = this.effects[0];
      return `受到攻击时${probability}%概率减免${lv * reductionDamage}点伤害`;
    },
  },
  {
    id: 6,
    name: "",
    skillType: SkillType.BATTLE_TRIGGER,
    effects: [
      {
        triggerType: TriggerType.TIME_INTERVAL,
        effectType: EffectType.RESTORE_HP,
        targetType: TargetType.SELF,
        valueType: ValueType.FIXED_VALUE,
        restoreHp: 30,
        intervalTime: 1000,
      },
    ],
    maxLv: 0,
    desc: function () {
      const { lv = 1 } = this;
      const { restoreHp } = this.effects[0];
      return `每秒回复${lv * restoreHp}点生命值`;
    },
  },
  {
    id: 7,
    name: "",
    skillType: SkillType.BATTLE_TRIGGER,
    effects: [
      {
        triggerType: TriggerType.TIME_INTERVAL,
        effectType: EffectType.CONDITION_RESTORE_HP,
        targetType: TargetType.SELF,
        valueType: ValueType.FIXED_VALUE,
        restoreHp: 42,
        intervalTime: 1000,
        condition: "(hp/maxHp)>0.5", // 条件
      },
    ],
    maxLv: 0,
    desc: function () {
      const { lv = 1 } = this;
      const { restoreHp } = this.effects[0];
      return `当生命值大于50%时，每秒回复${lv * restoreHp}点生命值`;
    },
  },
  {
    id: 8,
    name: "",
    skillType: SkillType.BATTLE_TRIGGER,
    effects: [
      {
        triggerType: TriggerType.TIME_INTERVAL,
        effectType: EffectType.RESTORE_HP,
        targetType: TargetType.SELF,
        valueType: ValueType.PERCENTAGE,
        percentageProp: "maxHp",
        restoreHp: 1, // 回复生命值
        intervalTime: 1000, // 间隔毫秒数
      },
    ],
    maxLv: 0,
    desc: function () {
      const { lv = 1 } = this;
      const { restoreHp } = this.effects[0];
      return `每秒回复${restoreHp * lv}%最大生命值`;
    },
  },
  {
    id: 9,
    name: "",
    skillType: SkillType.BATTLE_TRIGGER,
    effects: [
      {
        triggerType: TriggerType.OBTAIN,
        effectType: EffectType.PROP,
        targetType: TargetType.SELF,
        valueType: ValueType.PERCENTAGE,
        propKey: "hp",
        percentageProp: "hp_T", // 百分比属性
        propNum: 10,
      },
    ],
    maxLv: 0,
    desc: function () {
      const { lv = 1 } = this;
      const { propNum } = this.effects[0];
      return `战斗开始增加${propNum * lv}%最大生命值`;
    },
  },
  {
    id: 10,
    name: "",
    skillType: SkillType.BATTLE_TRIGGER,
    effects: [
      {
        triggerType: TriggerType.UNDER_ATTACK,
        effectType: EffectType.REDUCTION_DAMAGE,
        targetType: TargetType.SELF,
        valueType: ValueType.FORMULA,
        reductionDamage: 1, // 减免伤害
        formula: "hp/300", // 公式
      },
    ],
    maxLv: 0,
    desc: function () {
      const { lv = 1 } = this;
      const { reductionDamage } = this.effects[0];
      return `每有300点生命值减免${lv * reductionDamage}点伤害`;
    },
  },
];
