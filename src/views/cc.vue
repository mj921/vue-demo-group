<template>
  <div>
    <el-button type="primary" size="default" @click="update">一年</el-button>
    <el-button type="primary" size="default" @click="init">重置</el-button>
    <el-button type="primary" size="default" @click="loop">开始</el-button>
    maxAge: {{ maxAge }} maxLv: {{ maxLv }} childNum:
    {{ children.length }}
    <el-table :data="children" border stripe>
      <el-table-column
        v-for="col in columns"
        :prop="col.key"
        :label="col.key"
        :key="col.key"
      >
        <template v-if="col.key === 'jy'" v-slot="{ row }">{{
          row.jy.join(', ')
        }}</template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
let childNum = 1;
let year = 1;
const defaultProp = {
  maxAge: 60,
  age: 0,
  startSy: 20,
  hdNum: 1,
  tubian: 0.1,
  jiange: 5,
  hdSuccess: 0.55,
  currHdNum: 0,
  heatherRate: 2,
  qiyun: 100,
};
export default {
  data() {
    return {
      maxAge: 0,
      maxLv: 1,
      jy: [
        'changshou',
        'zaoshu',
        'duozi',
        'duanming',
        'shunchan',
        'nanchan',
        'wanshu',
        'jiankang',
        'duobing',
        'yiyun',
        'buyun',
        'nanyun',
        'qiyun',
        'meiyun',
        'daqiyun',
        'tiandizhizi',
        'tiandao',
      ],
      untubian: [],
      jyMap: {
        changshou: [
          {
            key: 'maxAge',
            value: 20,
          },
        ],
        zaoshu: [
          {
            key: 'startSy',
            value: -5,
          },
        ],
        duozi: [
          {
            key: 'hdNum',
            value: 1,
          },
        ],
        buyun: [
          {
            key: 'hdNum',
            value: -1,
          },
        ],
        duanming: [
          {
            key: 'maxAge',
            value: -20,
          },
        ],
        shunchan: [
          {
            key: 'hdSuccess',
            value: 0.25,
          },
        ],
        nanchan: [
          {
            key: 'hdSuccess',
            value: -0.25,
          },
        ],
        wanshu: [
          {
            key: 'startSy',
            value: 5,
          },
        ],
        jiankang: [
          {
            key: 'heatherRate',
            value: 0.5,
          },
        ],
        duobing: [
          {
            key: 'heatherRate',
            value: -0.5,
          },
        ],
        yiyun: [
          {
            key: 'jiange',
            value: -1,
          },
        ],
        nanyun: [
          {
            key: 'jiange',
            value: 1,
          },
        ],
        qiyun: [
          {
            key: 'qiyun',
            value: 25,
          },
        ],
        meiyun: [
          {
            key: 'qiyun',
            value: -25,
          },
        ],
        daqiyun: [
          {
            key: 'qiyun',
            value: 50,
          },
          {
            key: 'heatherRate',
            value: 0.25,
          },
        ],
        tiandizhizi: [
          {
            key: 'qiyun',
            value: 100,
          },
          {
            key: 'heatherRate',
            value: 0.5,
          },
          {
            key: 'maxAge',
            value: 20,
          },
        ],
        tiandao: [
          {
            key: 'qiyun',
            value: 200,
          },
          {
            key: 'heatherRate',
            value: 1,
          },
          {
            key: 'maxAge',
            value: 40,
          },
          {
            key: 'hdSuccess',
            value: 0.35,
          },
          {
            key: 'tubian',
            value: -0.09,
          },
        ],
      },
      children: [],
      columns: [
        {
          key: 'name',
        },
        {
          key: 'parent',
        },
        {
          key: 'root',
        },
        {
          key: 'lv',
        },
        {
          key: 'jy',
        },
        {
          key: 'age',
        },
        {
          key: 'maxAge',
        },
        {
          key: 'hdNum',
        },
        {
          key: 'currHdNum',
        },
      ],
    };
  },
  methods: {
    loop() {
      this.update();
      if (this.children.length > 0 && year % 100 !== 0) {
        setTimeout(this.loop, 100);
      }
    },
    update() {
      console.log(`第${year++}年`);
      for (let i = 0; i < this.children.length; ) {
        this.updateObj(this.children[i]);
        let r = Math.random();
        let cr =
          Math.pow(this.children[i].age, this.children[i].heatherRate) /
          Math.pow(this.children[i].maxAge, this.children[i].heatherRate);
        if (r < cr) {
          console.log(`${this.children[i].name}死亡`, r, cr);
          this.children.splice(i, 1);
        } else {
          if (this.children[i].age > this.maxAge) {
            this.maxAge = this.children[i].age;
          }
          i++;
        }
      }
      if (this.children.length > 100) {
        for (let i = 0; i < this.children.length; ) {
          const r = Math.random() * this.children[i].qiyun;
          if (this.children[i].age > 0 && r < 50) {
            console.log(`${this.children[i].name}气运死亡`, r);
            this.children.splice(i, 1);
          } else {
            i++;
          }
        }
      }
    },
    updateObj(obj) {
      if (obj.beforeSy > 0) {
        obj.beforeSy--;
      } else {
        obj.beforeSy = obj.jiange;
        for (let i = 0; i < obj.hdNum; i++) {
          if (Math.random() < obj.hdSuccess) {
            obj.currHdNum++;
            let jy = this.jy.filter((item) => obj.jy.indexOf(item) === -1);
            const child = {
              name: `child_${childNum++}`,
              parent: obj.name,
              root: obj.root || obj.name,
              ...defaultProp,
              lv: obj.lv + 1,
            };
            if (child.lv > this.maxLv) {
              this.maxLv = child.lv;
            }
            const jys = [];
            for (let j = 0; j < obj.jy.length; j++) {
              if (
                this.untubian.indexOf(obj.jy[j]) === -1 &&
                Math.random() < obj.tubian
              ) {
                const n = Math.floor(Math.random() * jy.length);
                jys.push(jy[n]);
              } else {
                jys.push(obj.jy[j]);
              }
              const jyArr = this.jyMap[jys[j]];
              jyArr.forEach((jyItem) => {
                child[jyItem.key] += jyItem.value;
              });
            }
            child.jy = [...jys];
            child.beforeSy = child.startSy;
            console.log(`${obj.name}生出${child.name}`);
            this.children.push(child);
          }
        }
      }
      obj.age++;
    },
    init() {
      childNum = 1;
      year = 1;
      const children = [];
      for (let i = 0; i < 10; i++) {
        let jy = [...this.jy];
        const obj = {
          name: `child_${childNum++}`,
          ...defaultProp,
          lv: 1,
        };
        const jys = [];
        for (let j = 0; j < 3; j++) {
          const n = Math.floor(Math.random() * jy.length);
          jys.push(jy[n]);
          const jyArr = this.jyMap[jy[n]];
          jyArr.forEach((jyItem) => {
            obj[jyItem.key] += jyItem.value;
          });
          jy.splice(n, 1);
        }
        obj.jy = [...jys];
        obj.beforeSy = obj.startSy;
        children.push(obj);
        this.children = children;
      }
    },
  },
  created() {
    this.init();
  },
};
</script>

<style></style>
