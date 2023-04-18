const map = require('./test');
const fs = require('fs');

map[1].symbolSize = 64;
const parse = (ids, parentSize) => {
  ids.forEach((id, i) => {
    const item = map[id];
    item.symbolSize = Math.max(8, parentSize / (i === 0 ? 1 : 2));
    parse(item.children, item.symbolSize);
  });
};
parse(map[1].children, map[1].symbolSize);
fs.writeFileSync(`./test11.js`, 'module.exports = ' + JSON.stringify(map));
