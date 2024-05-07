import { useEffect, useState } from "react";

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

export const useMount = (callback) => {
  useEffect(() => {
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export const useDebounce = (params, delay) => {
  const [debounceParams, setDebounceParams] = useState(params);
  useEffect(() => {
    let timer = setTimeout(() => {
      setDebounceParams(params);
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [params, delay]);
  return debounceParams;
};
