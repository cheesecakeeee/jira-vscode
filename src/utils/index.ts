import { useEffect, useState } from "react";

const isFalsy = (value: any) => {
  // 空字符串 、 null、 undefined返回true
  return value === 0 ? false : !value;
};

export const cleanObject = (obj: Object) => {
  let newObj = { ...obj };
  let keys = Object.keys(newObj);
  keys.forEach((key) => {
    //@ts-ignore
    let value = newObj[key];
    if (isFalsy(value)) {
      //@ts-ignore
      delete newObj[key];
    }
  });
  return newObj;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export const useDebounce = (params: any, delay?: number) => {
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
