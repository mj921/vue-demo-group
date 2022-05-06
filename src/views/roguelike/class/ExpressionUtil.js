import Character from "./Character";

export const parseCondition = (condition) => {
  const conditions = [];
  const stackList = [];
  let i = 0;
  let cursor = 0;
  for (; i < condition.length; i++) {
    let str = condition[i];
    let stack, s;
    switch (str) {
      case "(":
        cursor = i + 1;
        stack = [];
        if (stackList.length === 0) {
          conditions.push(stack);
        } else {
          stackList[stackList.length - 1].push(stack);
        }
        stackList.push(stack);
        break;
      case "|":
      case "&":
      case "+":
      case "-":
      case "*":
      case "/":
      case "=":
      case "<":
      case ">":
        s = condition.substring(cursor, i);
        if (condition[i + 1] === "=") {
          cursor = i + 2;
          str += "=";
        } else {
          cursor = i + 1;
        }
        if (stackList.length > 0) {
          s.length > 0 && stackList[stackList.length - 1].push(s);
          stackList[stackList.length - 1].push(str);
        } else {
          s.length > 0 && conditions.push(s);
          conditions.push(str);
        }
        break;
      case ")":
        s = condition.substring(cursor, i);
        stackList[stackList.length - 1].push(s);
        cursor = i + 1;
        stackList.pop();
        stack = stackList[stackList.length - 1];
        break;
    }
  }
  cursor < i && conditions.push(condition.substring(cursor, i));
  return conditions;
};
export const executeCondition = (props, condition) => {
  if (
    condition.length === 3 &&
    condition.every((el) => typeof el === "string")
  ) {
    return executeExpression(props, condition.join(""));
  }
  let res = false;
  if (condition[0] instanceof Array) {
    res = executeCondition(props, condition[0]);
  } else {
    res = executeExpression(props, condition[0]);
  }
  for (let i = 2; i < condition.length; i += 2) {
    const item = condition[i];
    let res1 = false;
    if (item instanceof Array) {
      res1 = executeCondition(props, item);
    } else {
      res1 = executeExpression(props, item);
    }
    res = executeExpression(props, `${res}${condition[i - 1]}${res1}`);
  }
  return res;
};
export const executeExpression = (props, expression) => {
  const reg = /(?:[?!=+*/-]|[><]=?)/;
  const propReg = new RegExp(`^(${Character.PropKeyList.join("|")})$`);
  if (!reg.test(expression))
    return /^-?\d+(\.\d+)?$/.test(expression)
      ? +expression
      : propReg.test(expression)
      ? props[expression]
      : false;
  const expre = expression.split(reg);
  const operator = expression.match(reg)[0];
  const leftValue = propReg.test(expre[0]) ? props[expre[0]] : +expre[0];
  const rightValue = propReg.test(expre[1]) ? props[expre[1]] : +expre[1];
  // let arr;
  switch (operator) {
    case ">":
      return leftValue > rightValue;
    case "<":
      return leftValue < rightValue;
    case ">=":
      return leftValue >= rightValue;
    case "<=":
      return leftValue <= rightValue;
    case "=":
      return leftValue === rightValue;
    case "+":
      return leftValue + rightValue;
    case "-":
      return leftValue - rightValue;
    case "*":
      return leftValue * rightValue;
    case "/":
      return rightValue === 0 ? 0 : leftValue / rightValue;
    case "&":
      return leftValue && rightValue;
    case "|":
      return leftValue || rightValue;
    // case "?":
    //   arr = JSON.parse(expre[1]);
    //   if ([Property.TYPES.EVT, Property.TYPES.TLT].includes(expre[0])) {
    //     return props[expre[0]].some((item) => arr.includes(item));
    //   } else {
    //     return arr.includes(props[expre[0]]);
    //   }
    // case "!":
    //   arr = JSON.parse(expre[1]);
    //   if ([Property.TYPES.EVT, Property.TYPES.TLT].includes(expre[0])) {
    //     return props[expre[0]].every((item) => !arr.includes(item));
    //   } else {
    //     return !arr.includes(props[expre[0]]);
    //   }
  }
  return false;
};
