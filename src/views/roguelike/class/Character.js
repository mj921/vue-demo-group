import {
  skillData,
  SkillType,
  TriggerType,
  TargetType,
  EffectType,
} from "../data/skillData";
import GameEvent from "./GameEvent";

class Character {
  constructor({
    name = "",
    hp = 900,
    atk = 9,
    cir = 0,
    dodge = 0,
    cirRate = 200,
    atkSpeed = 100,
  } = {}) {
    this.name = name;
    this.hp = hp;
    this.atk = atk;
    this.cir = cir;
    this.dodge = dodge;
    this.cirRate = cirRate;
    this.atkSpeed = atkSpeed;
    this.skills = {};
    this.battleStartSkillIds = new Set();
    this.battleWinSkillIds = new Set();
    this.excludeSkillIds = [];
    this.currProps = {};
    this.gameEvent = new GameEvent();
  }
  /** 处理战斗技能 */
  dealBattleSkills(skill, currProps) {
    skill.effects.forEach((effect) => {
      switch (effect.triggerType) {
        case TriggerType.TIME_ONCE:
          currProps.onceEffects.push({
            ...effect,
            lv: skill.lv,
            skillId: skill.id,
          });
          break;
        case TriggerType.TIME_INTERVAL:
          currProps.intervalEffects.push({
            ...effect,
            lv: skill.lv,
            timeProcess: 0,
            skillId: skill.id,
          });
          break;
        case TriggerType.UNDER_ATTACK:
          currProps.underAttackEffects.push({
            ...effect,
            lv: skill.lv,
            skillId: skill.id,
          });
          break;
      }
    });
  }
  /** 生成战斗属性 */
  createBattleProps() {
    const currProps = {
      hp: this.hp,
      atk: this.atk,
      cir: this.cir,
      dodge: this.dodge,
      cirRate: this.cirRate,
      atkSpeed: this.atkSpeed,
      onceEffects: [],
      intervalEffects: [],
      underAttackEffects: [],
    };
    this.battleStartSkillIds.forEach((id) => {
      const skill = this.skills[id];
      this.dealBattleSkills(skill, currProps);
    });
    this.currProps = {
      hp: currProps.hp,
      maxHp: currProps.hp,
      atk: currProps.atk,
      cir: currProps.cir,
      dodge: currProps.dodge,
      cirRate: currProps.cirRate,
      atkSpeed: currProps.atkSpeed,
      onceEffects: currProps.onceEffects,
      intervalEffects: currProps.intervalEffects,
      underAttackEffects: currProps.underAttackEffects,
      atkProcess: 0,
      recordList: [],
    };
  }
  /** 获取攻击次数 */
  getAtkNum(loopTime) {
    const atkProcess = loopTime / (10000 / this.currProps.atkSpeed);
    this.currProps.atkProcess += atkProcess;
    const num = Math.floor(this.currProps.atkProcess);
    this.currProps.atkProcess -= num;
    return num;
  }
  /** 触发属性效果 */
  triggerPropEffect(enemy, effect) {
    switch (effect.targetType) {
      case TargetType.SELF:
        this.currProps[effect.propKey] += effect.propNum * effect.lv;
        break;
      case TargetType.ENEMY:
        enemy.currProps[effect.propKey] += effect.propNum * effect.lv;
        break;
    }
  }
  /** 触发效果 */
  triggerEffect(enemy, time, loopTime) {
    for (let i = 0; i < this.currProps.onceEffects.length; ) {
      const effect = this.currProps.onceEffects[i];
      if (effect.triggerTime <= time) {
        switch (effect.effectType) {
          case EffectType.PROP:
            this.triggerPropEffect(enemy, effect);
            break;
        }
        this.currProps.onceEffects.splice(i, 1);
      } else {
        i++;
      }
    }
    this.currProps.intervalEffects.forEach((effect) => {
      effect.timeProcess += loopTime;
      if (effect.intervalTime <= effect.timeProcess) {
        switch (effect.effectType) {
          case EffectType.PROP:
            this.triggerPropEffect(enemy, effect);
            break;
        }
        effect.timeProcess -= effect.intervalTime;
      }
    });
  }
  /**
   * 受到攻击处理
   * @returns damages 反弹伤害
   * @returns reductionDamageTotal 减免伤害
   */
  underAttackHandle() {
    const damages = [];
    let reductionDamageTotal = 0;
    this.currProps.underAttackEffects.forEach((effect) => {
      const {
        effectType,
        damage,
        lv,
        probability,
        reductionDamage,
        skillId,
      } = effect;
      switch (effectType) {
        case EffectType.DAMAGE:
          damages.push({ damage: damage * lv, skillId });
          break;
        case EffectType.PROBABILITY_DAMAGE:
          if (Math.random() * 100 < probability) {
            damages.push({ damage: damage * lv, skillId });
          }
          break;
        case EffectType.REDUCTION_DAMAGE:
          reductionDamageTotal += reductionDamage * lv;
          break;
        case EffectType.PROBABILITY_REDUCTION_DAMAGE:
          if (Math.random() * 100 < probability) {
            reductionDamageTotal += reductionDamage * lv;
          }
          break;
      }
    });
    return {
      damages,
      reductionDamageTotal,
    };
  }
  addBattleRecord(record) {
    this.currProps.recordList.push(record);
    this.gameEvent.emit("record", record);
  }
  /** 攻击 */
  attack(enemy) {
    const {
      damages: reboundDamages,
      reductionDamageTotal,
    } = enemy.underAttackHandle(this);
    let damage = this.currProps.atk;
    const cir = this.currProps.cir - enemy.currProps.cir;
    if (cir > Math.random() * 100) {
      let cirRate = this.currProps.cirRate + Math.max(cir - 100, 0);
      damage *= cirRate / 100;
    }
    damage = Math.max(0, damage - reductionDamageTotal);
    const dodge = enemy.currProps.dodge - this.currProps.dodge;
    if (Math.min(dodge, 80) < Math.random() * 100) {
      let reductionRate = Math.max(dodge - 80, 0);
      damage = Math.max(Math.floor((damage * (100 - reductionRate)) / 100), 0);
    }
    enemy.addBattleRecord({
      recordType: Character.RecordType.DAMAGE,
      damageType: Character.DamageType.ATTACK,
      damage,
    });
    enemy.enemy.currProps.hp -= damage;
    reboundDamages.forEach((el) => {
      enemy.causeDamage(this, el);
    });
  }
  /** 造成伤害 */
  causeDamage(enemy, damageObj) {
    let damage = damageObj.damage;
    let reductionRate = 0;
    damage = Math.max(Math.floor((damage * (100 - reductionRate)) / 100), 0);
    enemy.addBattleRecord({
      recordType: Character.RecordType.DAMAGE,
      damageType: Character.DamageType.SKILL,
      damage,
      skillId: damageObj.skillId,
    });
    enemy.currProps.hp -= damage;
  }
  /** 获得技能 */
  obtainSkill(skill) {
    if (this.skills[skill.id]) {
      this.skills[skill.id].lv++;
    } else {
      const skillClone = JSON.parse(JSON.stringify(skill));
      skillClone.lv = 1;
      skillClone.desc = skill.desc;
      this.skills[skill.id] = skillClone;
    }
    if (
      this.skills[skill.id].maxLv !== 0 &&
      this.skills[skill.id].lv >= this.skills[skill.id].maxLv
    ) {
      this.excludeSkillIds.push(skill.id);
    }
    if (skill.skillType === SkillType.GET_TRIGGER) {
      skill.effects.forEach((effect) => {
        switch (effect.triggerType) {
          case TriggerType.OBTAIN:
            this[effect.propKey] += effect.propNum;
            break;
        }
      });
    } else if (skill.skillType === SkillType.BATTLE_TRIGGER) {
      this.battleStartSkillIds.add(skill.id);
    }
  }
  /** 随机一个技能获得 */
  getSkill() {
    const skills = skillData.filter(
      (skill) => !this.excludeSkillIds.includes(skill.id)
    );
    if (!skills.length) return null;
    this.obtainSkill(skills[Math.floor(Math.random() * skills.length)]);
  }
  /** 随机3个技能选项 */
  getSkillOptions(optionNum = 3) {
    const skills = skillData.filter(
      (skill) => !this.excludeSkillIds.includes(skill.id)
    );
    const skillOptions = [];
    for (let i = 0; i < optionNum; i++) {
      const index = Math.floor(Math.random() * skills.length);
      skillOptions.push(skills[index]);
      skills.splice(index, 1);
    }
    return skillOptions;
  }
}
Character.create = function (skillNum) {
  const instance = new Character();
  for (let i = 0; i < skillNum; i++) {
    instance.getSkill();
  }
  return instance;
};
Character.RecordType = {
  DAMAGE: 1,
};
Character.DamageType = {
  ATTACK: 1,
  SKILL: 2,
};

export default Character;
