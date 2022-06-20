const fs = require("fs");

const goods = [];
for (let i = 0; i < 100; i++) {
  goods.push({
    name: `物品${i}`,
  });
}

const combination = [];

const creteCombination = (origin = [], result = "") => {
  const origin1 =
    origin[0] || goods[Math.floor(Math.random() * goods.length)].name;
  const origin2 =
    origin[1] || goods[Math.floor(Math.random() * goods.length)].name;
  if (
    origin1 === origin2
      ? combination.find(
          (el) => el.origin[0] === el.origin[1] && el.origin[0] === origin1
        )
      : combination.find(
          (el) => el.origin.includes(origin1) && el.origin.includes(origin2)
        )
  ) {
    return true;
  }
  result = result || goods[Math.floor(Math.random() * goods.length)].name;
  if (origin1 === origin2) {
    while (origin1 === result) {
      result = goods[Math.floor(Math.random() * goods.length)].name;
    }
  }
  combination.push({
    origin: [origin1, origin2],
    result,
  });
};

for (let i = 0; i < 1000; i++) {
  creteCombination();
}

goods.forEach((item) => {
  if (!combination.find((el) => el.result === item.name)) {
    while (creteCombination([], item.name));
  }
});

fs.writeFileSync("./src/views/randomCreate/goods.json", JSON.stringify(goods));
fs.writeFileSync(
  "./src/views/randomCreate/combination.json",
  JSON.stringify(combination)
);
