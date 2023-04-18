const map = require('./test11');
const fs = require('fs');

const link = [];
const data = [];
const generatesColor = [
  '#ff0000',
  '#ffff00',
  '#ff00ff',
  '#0000ff',
  '#00ffff',
  '#00ff00',
  '#ffff00',
  '#990099',
  '#009999',
  '#999900',
];

Object.values(map).forEach((el) => {
  if (!generatesColor[el.generation]) {
    generatesColor[el.generation] = `#${(
      '00000' + (~~(parseInt('ffffff', 16) * Math.random())).toString(16)
    ).slice(-6)}`;
    console.log(generatesColor[el.generation]);
  }
  const itemStyle = {
    color: generatesColor[el.generation],
  };
  if (el.symbolSize === (map['1']?.symbolSize || 64)) {
    itemStyle.borderColor = '#000000';
    itemStyle.borderWidth = Math.max(
      1,
      Math.floor((map['1']?.symbolSize || 64) / 20)
    );
  }
  data.push({
    name: el.name,
    symbolSize: el.symbolSize,
    itemStyle,
  });
  if (el.parentName) {
    link.push({
      source: el.parentName,
      target: el.name,
      type: '孩子',
    });
  }
});
fs.writeFileSync(`./data.js`, 'const data = ' + JSON.stringify(data));
fs.writeFileSync(`./link.js`, 'const links = ' + JSON.stringify(link));
