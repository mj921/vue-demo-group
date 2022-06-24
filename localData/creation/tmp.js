const goods = require("./goods.json");
const fs = require("fs");
const pinyin = require("pinyin");

goods.forEach((el) => {
  el.py = pinyin(el.name, {
    style: pinyin.STYLE_NORMAL,
  }).join(" ");
});

fs.writeFileSync("./localData/creation/goods1.json", JSON.stringify(goods));
