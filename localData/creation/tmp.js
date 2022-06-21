const data = require("./combinationNotResult.json");
const pinyin = require("pinyin");
const fs = require("fs");
const a = [];
const arr = data.filter((item) => {
  const n = `${item.origin.join("+")}=${item.result}`;
  if (!a.includes(n)) {
    a.push(n);
    return true;
  }
  return false;
});

fs.writeFileSync(
  "./localData/creation/combinationNotResult.json",
  JSON.stringify(arr)
);
