class People {
  constructor(year) {
    this.createPeople(year);
  }
  createPeople(year) {
    this.name = `p_${People.ID++}`;
    this.zizhi = this.getRandom(100, 0);
    this.maxAge = this.getRandom(
      Math.random() < 0.1 ? (Math.random() < 0.1 ? 10000000 : 100000) : 50,
      30
    );
    this.age = 0;
    this.xiulianSpeed = this.getRandom(this.zizhi * this.zizhi, 0);
    this.wuxing = this.getRandom(this.zizhi, 20);
    this.rengxing = this.getRandom(this.zizhi, 0);
    this.jingjie = 0;
    this.death = false;
    this.xp = 0;
    this.needXp = 100;
    this.by = year;
    this.dy = "";
  }
  getRandom(range, min) {
    return Math.floor(Math.random() * range) + min;
  }
  // getJingjieNeedXp(jingjie) {
  //   return jingjie === 0
  //     ? 100
  //     : Math.pow(10, Math.floor(jingjie / 10)) *
  //         (50 + 36 * ((jingjie % 10) - 1)) +
  //         168 * Math.pow(10, Math.floor(jingjie / 10));
  // }
  getJingjieNeedXp(jingjie) {
    return jingjie === 0 ? 100 : 100 * Math.floor(Math.pow(jingjie, 2.3));
  }
  // getJingjieAddAge(jingjie) {
  //   return jingjie === 0
  //     ? 10
  //     : Math.floor(
  //         Math.pow(10, Math.floor(jingjie / 25)) *
  //           (50 + 36 * ((jingjie % 25) - 1)) +
  //           168 * Math.pow(10, Math.floor(jingjie / 25))
  //       );
  // }
  getJingjieAddAge(jingjie) {
    return jingjie === 0 ? 10 : 10 * jingjie;
  }
  xiulian() {
    this.xp += this.xiulianSpeed;
    while (this.xp >= this.needXp) {
      const nextJingjie = this.jingjie + 1;
      if (
        Math.random() * 120 <
        this.wuxing - Math.pow(nextJingjie, 0.5) * 11.87
      ) {
        this.jingjie++;
        this.needXp += this.getJingjieNeedXp(nextJingjie);
        this.maxAge += this.getJingjieAddAge(nextJingjie);
      } else {
        this.xp -= this.getRandom(
          (this.getJingjieNeedXp(this.jingjie) * (100 - this.zizhi)) / 100,
          0
        );
        // const subAge = this.getRandom(
        //   Math.min(
        //     this.maxAge - this.age,
        //     (this.getJingjieAddAge(this.jingjie) * (100 - this.rengxing)) / 1000
        //   ),
        //   0
        // );
        const subAge = 0;
        if (this.maxAge - subAge < this.age) {
          this.maxAge = this.age;
        } else {
          this.maxAge -= subAge;
        }
      }
    }
  }
  update(year) {
    if (this.death) return;
    this.age++;
    this.xiulian();
    if (this.age >= this.maxAge) {
      this.dy = year;
      this.dx = true;
      this.death = true;
    }
  }
}
People.ID = 1;
export default People;
