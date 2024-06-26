import { useEffect, useRef, useState } from "react";

const isFalsy = (value: unknown) => {
  // 空字符串 、 null、 undefined返回true  ; 0和false 要保留不删除
  return value === null || value === undefined || value === "";
};

export const cleanObject = (obj: { [key: string]: unknown }) => {
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

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export const useDebounce = <V>(params: V, delay?: number) => {
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

export const useDocumentTitle = (
  title: string,
  keeponUnmount: boolean = true,
) => {
  const oldTitle = useRef(document.title).current;

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (!keeponUnmount) {
        document.title = oldTitle;
      }
    };
  }, [oldTitle, keeponUnmount]);
};

export const resetRoute = () => (window.location.href = window.location.origin);

// 标记组件的挂载状态, 未挂载和卸载返回false，反之返回true
// 用来处理组件卸载时操作卸载组件的状态报错
export const useMountedRef = () => {
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  });

  return mountedRef;
};
