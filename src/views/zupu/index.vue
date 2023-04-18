<template>
  <div></div>
</template>

<script>
export default {
  data() {
    return {
      str: '宇宙万物位面世界',
      r: [13400, 40500],
      users: {
        1: {
          id: 1,
          name: '姜祖',
          birthYear: 1,
          generation: 0,
          children: [],
          age: 18,
          maxAge: 100,
        },
      },
      year: 18,
      sto: null,
      id: 1,
    };
  },
  methods: {
    getStr() {
      return String.fromCharCode(~~(Math.random() * 27100) + 13400);
    },
    isDeath({ age, maxAge }) {
      if (age < 18) {
        return Math.random() < 0.001;
      }
      if (age < maxAge * 0.6) {
        return Math.random() < 0.0001;
      }
      return Math.random() < 0.01 * Math.pow(age / maxAge, 9);
    },
    isBorth({ age, maxAge, children }) {
      const len = children.length;
      return (
        Math.random() < (age / maxAge - 0.2 * (len + 1)) / Math.pow(5, len)
      );
    },
    getUser({ generation, id, name }) {
      return {
        id: ++this.id,
        name: `姜${this.str[generation % this.str.length]}${this.getStr()}`,
        generation: generation + 1,
        birthYear: this.year,
        children: [],
        age: 1,
        maxAge: 100,
        parentId: id,
        parentName: name,
      };
    },
    loop() {
      this.sto && clearTimeout(this.sto);
      this.year++;
      Object.values(this.users).forEach((el) => {
        if (!el.deathYear) {
          if (this.isDeath(el)) {
            el.deathYear = this.year;
            return;
          }
          if (this.isBorth(el)) {
            const u = this.getUser(el);
            this.users[u.id] = u;
            el.children.push(u.id);
          }
          el.age++;
        }
      });
      console.log(Object.values(this.users).length);
      if (this.year < 200) {
        setTimeout(this.loop, 10);
      } else {
        console.log(this.users);
      }
    },
  },
  created() {
    this.loop();
  },
};
</script>

<style></style>
