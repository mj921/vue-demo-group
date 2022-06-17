const Mathf = {
  clamp(value, min, max) {
    if (value < min) {
      value = min;
    } else if (value > max) {
      value = max;
    }
    return value;
  },
  clamp01(value) {
    let result;
    if (value < 0) {
      result = 0;
    } else if (value > 1) {
      result = 1;
    } else {
      result = value;
    }
    return result;
  },
  lerp(a, b, t) {
    return a + (b - a) * Mathf.clamp01(t);
  },
};

export default Mathf;
