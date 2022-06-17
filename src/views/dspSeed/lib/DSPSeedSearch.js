/* eslint-disable no-unused-vars */
import { ESpectrType, EStarType } from "./enums";
import Mathf from "./mathf";
import URandom from "./URandom";

class DSPSeedSearch {
  seed;

  constructor(galaxySeed, starCount) {
    this.generate(galaxySeed, starCount);
  }
  generate(galaxySeed, starCount) {
    this.seed = galaxySeed;
    let stars = new Array(starCount);
    let random = new URandom(galaxySeed);
    let seed = random.next();

    let num6 = Math.ceil(0.01 * starCount + random.nextDouble() * 0.3);
    let num7 = Math.ceil(0.01 * starCount + random.nextDouble() * 0.3);
    let num8 = Math.ceil(0.016 * starCount + random.nextDouble() * 0.4);
    let num9 = Math.ceil(0.013 * starCount + random.nextDouble() * 1.4);
    let num10 = starCount - num6;
    let num11 = num10 - num7;
    let num12 = num11 - num8;
    let num13 = Math.floor((num12 - 1) / num9);
    let num14 = Math.floor(num13 / 2);
    for (let i = 0; i < starCount; i++) {
      let seed2 = random.next();
      if (i === 0) {
        stars[i] = this.createBirthStar(seed2);
      } else {
        let needSpectr = ESpectrType.X;
        if (i === 3) {
          needSpectr = ESpectrType.M;
        } else if (i === num12 - 1) {
          needSpectr = ESpectrType.O;
        }
        let starType = EStarType.MainSeqStar;
        if (i % num13 === num14) {
          starType = EStarType.GiantStar;
        }
        if (i >= num10) {
          starType = EStarType.BlackHole;
        } else if (i >= num11) {
          starType = EStarType.NeutronStar;
        } else if (i >= num12) {
          starType = EStarType.WhiteDwarf;
        }
        stars[i] = this.createStar(
          starCount,
          i + 1,
          seed2,
          starType,
          needSpectr
        );
      }
    }
    console.log(stars[0]);
  }

  createBirthStar(seed) {
    console.log(seed);
    let star = new Star();
    // #if USE_STAR_INDEX
    // star.index = 0;
    // #endif
    star.level = 0;
    star.seed = seed;
    let random = new URandom(seed);
    let seed2 = random.next();
    let seed3 = random.next();

    let random2 = new URandom(seed3);
    let r = random2.nextDouble();
    let r2 = random2.nextDouble();
    let num = random2.nextDouble();
    let rn = random2.nextDouble();
    let rt = random2.nextDouble();
    let num2 = random2.nextDouble() * 0.2 + 0.9;
    let y = random2.nextDouble() * 0.4 - 0.2;
    let num3 = Math.pow(2.0, y);
    let num4 = this.randNormal(0, 0.08, r, r2);
    console.log("num4", r, r2);
    num4 = Mathf.clamp(num4, -0.2, 0.2);
    star.mass = Math.pow(2, num4);
    let d = 2.0 + 0.4 * (1.0 - star.mass);
    star.lifetime =
      10000.0 *
      Math.pow(0.1, Math.log10(star.mass * 0.5) / Math.log10(d) + 1.0) *
      num2;
    star.age = num * 0.4 + 0.3;
    let num5 = (1 - Math.pow(Mathf.clamp01(star.age), 20) * 0.5) * star.mass;
    star.temperature =
      Math.pow(num5, 0.56 + 0.14 / (Math.log10(num5 + 4) / Math.log10(5.0))) *
        4450.0 +
      1300.0;
    let num6 =
      Math.log10((star.temperature - 1300.0) / 4500.0) / Math.log10(2.6) - 0.5;
    if (num6 < 0.0) {
      num6 *= 4.0;
    }
    if (num6 > 2.0) {
      num6 = 2.0;
    } else if (num6 < -4.0) {
      num6 = -4.0;
    }
    star.spectr = Math.round(num6 + 4);
    // #if USE_STAR_COLOR
    star.color = Mathf.clamp01((num6 + 3.5) * 0.2);
    // #endif
    // #if USE_STAR_CLASS_FACTOR
    // star.classFactor = num6;
    // #endif
    star.luminosity = Math.pow(num5, 0.7);
    star.radius = Math.pow(star.mass, 0.4) * num3;
    let p = num6 + 2;
    star.orbitScaler = Math.pow(1.35, p);
    if (star.orbitScaler < 1) {
      star.orbitScaler = Mathf.lerp(star.orbitScaler, 1, 0.6);
    }
    this.setStarAge(star, star.age, rn, rt);
    star.dysonRadius = star.orbitScaler * 0.28;
    if (star.dysonRadius * 40000.0 < star.physicsRadius * 1.5) {
      star.dysonRadius = (star.physicsRadius * 1.5) / 40000.0;
    }
    return star;
  }
  setStarAge(star, age, rn, rt) {
    let num = rn * 0.1 + 0.95;
    let num2 = rt * 0.4 + 0.8;
    let num3 = rt * 9.0 + 1.0;
    star.age = age;
    if (age >= 1) {
      if (star.mass >= 18) {
        star.type = EStarType.BlackHole;
        star.spectr = ESpectrType.X;
        star.mass *= 2.5 * num2;
        star.radius *= 1;
        star.temperature = 0;
        star.luminosity *= 0.001 * num;
      } else if (star.mass >= 7) {
        star.type = EStarType.NeutronStar;
        star.spectr = ESpectrType.X;
        star.mass *= 0.2 * num;
        star.radius *= 0.15;
        star.temperature = num3 * 1e7;
        star.luminosity *= 0.1 * num;
        star.orbitScaler *= 1.5 * num;
      } else {
        star.type = EStarType.WhiteDwarf;
        star.spectr = ESpectrType.X;
        star.mass *= 0.2 * num;
        star.radius *= 0.2;
        star.temperature = num2 * 150000;
        star.luminosity *= 0.04 * num2;
      }
    } else if (age >= 0.96) {
      let num4 = Math.pow(5.0, Math.abs(Math.log10(star.mass) - 0.7)) * 5.0;
      if (num4 > 10) {
        num4 = (Math.log(num4 * 0.1) + 1) * 10;
      }
      let num5 = 1 - Math.pow(star.age, 30) * 0.5;
      star.type = EStarType.GiantStar;
      star.mass = num5 * star.mass;
      star.radius = num4 * num2;
      star.temperature = num5 * star.temperature;
      star.luminosity = 1.6 * star.luminosity;
      star.orbitScaler = 3.3 * star.orbitScaler;
    }
  }
  createStar(starCount, id, seed, starType, starSpectr) {
    let starData = new Star();
    // #if USE_STAR_INDEX
    // starData.index = (id - 1);
    // #endif
    starData.level = (id - 1) / (starCount - 1);

    starData.seed = seed;
    let random = new URandom(seed);
    let seed2 = random.next();
    let seed3 = random.next();
    let random2 = new URandom(seed3);
    let num3 = random2.nextDouble();
    let num4 = random2.nextDouble();
    let num5 = random2.nextDouble();
    let rn = random2.nextDouble();
    let rt = random2.nextDouble();
    let num6 = (random2.nextDouble() - 0.5) * 0.2;
    let num7 = random2.nextDouble() * 0.2 + 0.9;
    let num8 = random2.nextDouble() * 0.4 - 0.2;
    let num9 = Math.pow(2.0, num8);
    let num10 = Mathf.lerp(-0.98, 0.88, starData.level);
    if (num10 < 0) {
      num10 -= 0.65;
    } else {
      num10 += 0.65;
    }
    let standardDeviation = 0.33;
    if (starType == EStarType.GiantStar) {
      num10 = num8 <= -0.08 ? 1.6 : -1.5;
      standardDeviation = 0.3;
    }
    let num11 = this.randNormal(num10, standardDeviation, num3, num4);
    if (starSpectr == ESpectrType.M) {
      num11 = -3;
    } else if (starSpectr == ESpectrType.O) {
      num11 = 3;
    }
    if (num11 > 0) {
      num11 *= 2;
    } else {
      num11 *= 1;
    }
    num11 = Mathf.clamp(num11, -2.4, 4.65) + num6 + 1;
    if (starType == EStarType.BlackHole) {
      starData.mass = 18 + num3 * num4 * 30;
    } else if (starType == EStarType.NeutronStar) {
      starData.mass = 7 + num3 * 11;
    } else if (starType == EStarType.WhiteDwarf) {
      starData.mass = 1 + num4 * 5;
    } else {
      starData.mass = Math.pow(2, num11);
    }
    let d = 5.0;
    if (starData.mass < 2) {
      d = 2.0 + 0.4 * (1.0 - starData.mass);
    }
    starData.lifetime =
      10000.0 *
      Math.pow(0.1, Math.log10(starData.mass * 0.5) / Math.log10(d) + 1.0) *
      num7;
    if (starType == EStarType.GiantStar) {
      starData.lifetime =
        10000.0 *
        Math.pow(0.1, Math.log10(starData.mass * 0.58) / Math.log10(d) + 1.0) *
        num7;
      starData.age = num5 * 0.04 + 0.96;
    } else if (
      starType == EStarType.BlackHole ||
      starType == EStarType.NeutronStar ||
      starType == EStarType.WhiteDwarf
    ) {
      starData.age = num5 * 0.4 + 1;
      if (starType == EStarType.WhiteDwarf) {
        starData.lifetime += 10000;
      } else if (starType == EStarType.NeutronStar) {
        starData.lifetime += 1000;
      }
    } else if (starData.mass < 0.5) {
      starData.age = num5 * 0.12 + 0.02;
    } else if (starData.mass < 0.8) {
      starData.age = num5 * 0.4 + 0.1;
    } else {
      starData.age = num5 * 0.7 + 0.2;
    }
    let num12 = starData.lifetime * starData.age;
    if (num12 > 5000) {
      num12 = (Math.log(num12 / 5000) + 1) * 5000;
    }
    if (num12 > 8000) {
      let num13 = num12 / 8000;
      num13 = Math.log(num13) + 1;
      num13 = Math.log(num13) + 1;
      num13 = Math.log(num13) + 1;
      num12 = num13 * 8000;
    }
    starData.lifetime = num12 / starData.age;
    let num14 =
      (1 - Math.pow(Mathf.clamp01(starData.age), 20) * 0.5) * starData.mass;
    starData.temperature =
      Math.pow(num14, 0.56 + 0.14 / (Math.log10(num14 + 4) / Math.log10(5.0))) *
        4450.0 +
      1300.0;
    let num15 =
      Math.log10((starData.temperature - 1300.0) / 4500.0) / Math.log10(2.6) -
      0.5;
    if (num15 < 0.0) {
      num15 *= 4.0;
    }
    if (num15 > 2.0) {
      num15 = 2.0;
    } else if (num15 < -4.0) {
      num15 = -4.0;
    }
    starData.spectr = Math.round(num15 + 4);
    // #if USE_STAR_COLOR
    starData.color = Mathf.clamp01((num15 + 3.5) * 0.2);
    // #endif
    // #if USE_STAR_CLASS_FACTOR
    // starData.classFactor = num15;
    // #endif
    starData.luminosity = Math.pow(num14, 0.7);
    starData.radius = Math.pow(starData.mass, 0.4) * num9;
    let p = num15 + 2;
    starData.orbitScaler = Math.pow(1.35, p);
    if (starData.orbitScaler < 1) {
      starData.orbitScaler = Mathf.lerp(starData.orbitScaler, 1, 0.6);
    }
    this.setStarAge(starData, starData.age, rn, rt);
    starData.dysonRadius = starData.orbitScaler * 0.28;
    if (starData.dysonRadius * 40000.0 < starData.physicsRadius * 1.5) {
      starData.dysonRadius = (starData.physicsRadius * 1.5) / 40000.0;
    }

    return starData;
  }
  randNormal(average, standardDeviation, r1, r2) {
    console.log(
      average,
      standardDeviation,
      Math.log(1.0 - r1),
      Math.sqrt(-2.0 * Math.log(1 - r1)),
      Math.sin(2 * Math.PI * r2),
      average +
        standardDeviation *
          Math.sqrt(-2.0 * Math.log(1 - r1)) *
          Math.sin(2 * Math.PI * r2)
    );
    return (
      average +
      standardDeviation *
        Math.sqrt(-2.0 * Math.log(1 - r1)) *
        Math.sin(2 * Math.PI * r2) // 6.2831853071795862 = 2 * Math.PI
    );
  }
}

class Star {
  dysonRadiu;
  level;
  seed;
  index;
  mass;
  lifetime;
  age;
  luminosity;
  radius;
  type;
  temperature;
  spectr;
  orbitScaler;
  // #if USE_STAR_CLASS_FACTOR
  classFactor;
  // #if USE_STAR_COLOR
  color;

  get dysonLumino() {
    return (
      Math.round(Math.pow(this.luminosity, 0.33000001311302185) * 1000) / 1000
    );
  }
  get physicsRadius() {
    return this.radius * 1200;
  }
  get viewRadius() {
    return this.radius * 800;
  }
  get typeString() {
    if (this.type === EStarType.GiantStar) {
      if (this.spectr <= ESpectrType.K) {
        return "红巨星";
      } else if (this.spectr <= ESpectrType.F) {
        return "黄巨星";
      } else if (this.spectr === ESpectrType.A) {
        return "白巨星";
      } else {
        return "蓝巨星";
      }
    } else if (this.type === EStarType.WhiteDwarf) {
      return "白矮星";
    } else if (this.type === EStarType.NeutronStar) {
      return "中子星";
    } else if (this.type === EStarType.BlackHole) {
      return "黑洞";
    } else if (this.type === EStarType.MainSeqStar) {
      return this.spectr.ToString() + "型恒星";
    }
    return "";
  }
}

export default DSPSeedSearch;
