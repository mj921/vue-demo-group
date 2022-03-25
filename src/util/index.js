export const getListItemByKey = (data, keys, defaultVal = null) => {
  if (typeof data !== "object") return data;
  for (let i = 0; i < keys.length; i++) {
    let item;
    if (data instanceof Array) {
      item = data.find((el) => el[keys[i].key] === keys[i].value);
    } else {
      item = data[keys[i].key];
    }
    if (!item) return defaultVal;
    if (typeof item !== "object") return item;
    data = item;
  }
  return data;
};
