const isFalsy = (value) => {
  // 空字符串 、 null、 undefined返回true
  return value === 0 ? false : !value;
};

export const cleanObject = (obj) => {
  let newObj = { ...obj };
  let keys = Object.keys(newObj);
  keys.forEach((key) => {
    let value = newObj[key];
    if (isFalsy(value)) {
      delete newObj[key];
    }
  });
  return newObj;
};
