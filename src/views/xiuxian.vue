<template>
  <div>
    <el-button type="primary" size="default" @click="update">update</el-button>
    {{ year }}
    <el-input v-model="uy"></el-input>
    <el-button type="primary" size="default" @click="updateM"
      >updateM</el-button
    >
    <el-button type="primary" size="default" @click="add">add</el-button>
    <el-button type="primary" size="default" @click="updateAuto()"
      >updateAuto</el-button
    >
    <el-table :data="peoples" border stripe :row-style="rowStyle">
      <el-table-column
        v-for="col in columns"
        :prop="col.key"
        :label="col.key"
        :key="col.key"
        :sortable="!!col.sortable"
        :sort-method="col.sortMethod"
      >
        <template v-if="col.type === 'numSplit'" v-slot="{ row }">
          <span>{{ row[col.key] | numSplit }}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-table :data="deathPeoplesTop10" border stripe :row-style="rowStyle">
      <el-table-column
        v-for="col in columns"
        :prop="col.key"
        :label="col.key"
        :key="col.key"
        :sortable="!!col.sortable"
        :sort-method="col.sortMethod"
      >
        <template v-if="col.type === 'numSplit'" v-slot="{ row }">
          <span>{{ row[col.key] | numSplit }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import People from "../models/xiuxian/people";
const pNum = 30;
const minRandomNum = 15;
const randomAddRate = 0.01;
const minNum = 5;
export default {
  data() {
    return {
      peoples: [],
      deathPeoples: [],
      uy: "",
      year: 1,
      columns: [
        {
          key: "name",
        },
        {
          key: "jingjie",
          sortable: true,
          sortMethod(a, b) {
            const keys = ["jingjie", "age", "zizhi", "maxAge"];
            const orders = [1, -1, 1, 1];
            for (let i = 0; i < keys.length; i++) {
              if (a[keys[i]] !== b[keys[i]] || i === keys.length - 1) {
                return (a[keys[i]] - b[keys[i]]) * orders[i];
              }
            }
          },
        },
        {
          key: "age",
          type: "numSplit",
          sortable: true,
          sortMethod(a, b) {
            const keys = ["age", "jingjie", "zizhi", "maxAge"];
            const orders = [1, 1, 1, 1];
            for (let i = 0; i < keys.length; i++) {
              if (a[keys[i]] !== b[keys[i]] || i === keys.length - 1) {
                return (a[keys[i]] - b[keys[i]]) * orders[i];
              }
            }
          },
        },
        {
          key: "maxAge",
          type: "numSplit",
          sortable: true,
          sortMethod(a, b) {
            const keys = ["maxAge", "age", "jingjie", "zizhi"];
            const orders = [1, -1, 1, 1];
            for (let i = 0; i < keys.length; i++) {
              if (a[keys[i]] !== b[keys[i]] || i === keys.length - 1) {
                return (a[keys[i]] - b[keys[i]]) * orders[i];
              }
            }
          },
        },
        {
          key: "zizhi",
          sortable: true,
          sortMethod(a, b) {
            const keys = ["zizhi", "jingjie", "age", "maxAge"];
            const orders = [1, 1, -1, 1];
            for (let i = 0; i < keys.length; i++) {
              if (a[keys[i]] !== b[keys[i]] || i === keys.length - 1) {
                return (a[keys[i]] - b[keys[i]]) * orders[i];
              }
            }
          },
        },
        {
          key: "by",
        },
        {
          key: "dy",
        },
      ],
    };
  },
  filters: {
    numSplit(num) {
      return `${num}`.replace(/(\d{1,3})(?=(\d{3})+$)/g, "$1,");
    },
  },
  computed: {
    deathPeoplesTop10() {
      const deathPeoples = [...this.deathPeoples];
      return deathPeoples
        .sort((a, b) => {
          const keys = ["jingjie", "age", "zizhi", "maxAge"];
          const orders = [-1, 1, -1, -1];
          for (let i = 0; i < keys.length; i++) {
            if (a[keys[i]] !== b[keys[i]] || i === keys.length - 1) {
              return (a[keys[i]] - b[keys[i]]) * orders[i];
            }
          }
        })
        .slice(0, 10);
    },
  },
  methods: {
    rowStyle({ row }) {
      const colors = ["#f44336", "#f3de22", "#cc30e7", "#03a9f4", "#4caf50"];
      if (row.jingjie >= 100) {
        return { color: "#f00", fontWeight: "bold", fontSize: "26px" };
      }
      if (row.jingjie >= 90) {
        return {
          color: "#f44336",
          fontWeight: "bold",
          fontSize: `${15 + row.jingjie - 90}px`,
        };
      }
      for (let i = 0; i < colors.length; i++) {
        if (row.jingjie >= 80 - i * 10) {
          return { color: colors[i] };
        }
      }
      return { color: "#000" };
    },
    update() {
      this.year++;
      for (let i = 0; i < this.peoples.length; ) {
        this.peoples[i].update(this.year);
        if (this.peoples[i].death) {
          this.deathPeoples.push(this.peoples[i]);
          this.peoples.splice(i, 1);
        } else {
          i++;
        }
      }
      if (this.peoples.length < minNum) {
        this.add();
      }
      if (this.peoples.length < minRandomNum && Math.random() < randomAddRate) {
        this.peoples.push(new People(this.year));
      }
    },
    updateAuto(n = 60) {
      this.uy = 5000;
      this.updateM();
      if (n > 0) {
        setTimeout(() => {
          this.updateAuto(n - 1);
        }, 16);
      }
    },
    updateM() {
      if (this.uy-- > 0) {
        this.update();
        try {
          this.updateM();
        } catch (e) {
          setTimeout(this.updateM);
        }
      }
    },
    add() {
      for (let i = 0, len = pNum - this.peoples.length; i < len; i++) {
        this.peoples.push(new People(this.year));
      }
    },
  },
  created() {
    for (let i = 0; i < pNum; i++) {
      this.peoples.push(new People(this.year));
    }
  },
};
</script>

<style></style>
