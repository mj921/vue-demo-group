const INT_MAX_VALUE = 2147483647;

class URandom {
  seedArray = new Array(56);
  inext;
  inextp;

  constructor(seed) {
    let num = 161803398 - Math.abs(seed);
    this.seedArray[55] = num;
    let num2 = 1;
    for (let i = 1; i < 55; i++) {
      let num3 = (21 * i) % 55;
      this.seedArray[num3] = num2;
      num2 = num - num2;
      if (num2 < 0) {
        num2 += INT_MAX_VALUE;
      }
      num = this.seedArray[num3];
    }
    for (let j = 1; j < 5; j++) {
      for (let k = 1; k < 56; k++) {
        this.seedArray[k] -= this.seedArray[1 + ((k + 30) % 55)];
        if (this.seedArray[k] < 0) {
          this.seedArray[k] += INT_MAX_VALUE;
        }
      }
    }
    this.inext = 0;
    this.inextp = 31;
  }

  sample() {
    if (++this.inext >= 56) {
      this.inext = 1;
    }
    if (++this.inextp >= 56) {
      this.inextp = 1;
    }
    let num = this.seedArray[this.inext] - this.seedArray[this.inextp];
    if (num < 0) {
      num += INT_MAX_VALUE;
    }
    this.seedArray[this.inext] = num;
    return (
      +(num * 4.6566128752457969e-10 * Math.pow(10, 15).toFixed(0)) /
      Math.pow(10, 15)
    );
  }
  next() {
    return Math.round(this.sample() * INT_MAX_VALUE);
  }

  nextDouble() {
    return this.sample();
  }
}

export default URandom;
