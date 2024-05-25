import { useMemo } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { cleanObject } from "utils";

/* 获取url中指定的键的 键值对 */
export const useUrlQueryParams = <K extends string>(keys: K[]) => {
  // react-router中自带hook函数useSearchParams，获取和操作 当前url属性
  let [searchParams, setSearchParams] = useSearchParams();

  return [
    // 每次都创建了一个新对象，需要用useMemo包裹函数，使其只有在依赖项发生变化才重新计算生成新对象
    useMemo(
      () =>
        // 对传入的每一个key依次提取url中的 键值对
        keys.reduce(
          (prevKey, nextKey) => {
            return { ...prevKey, [nextKey]: searchParams.get(nextKey) || "" };
          },
          {} as { [nextKey in K]: K },
        ),
      // searchParams 只有显式调用setSearchParams才会变化因此可以作为依赖项
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [searchParams],
    ),
    // 改写setSearchParams设置url参数的方法： 为了使设置url参数的类型符合传入useUrlQueryParams参数的类型
    (params: Partial<{ [key in K]: unknown }>) => {
      // searchParams有迭代器iterator，通过Object.fromEntries可以返回一个普通对象
      // cleanObject清除对象中值无效的属性
      // 对传入值进行 类型注解  as URLSearchParamsInit 使其符合 setSearchParams的类型要求
      const obj = cleanObject({
        ...Object.fromEntries(searchParams),
        ...params,
      }) as URLSearchParamsInit;
      return setSearchParams(obj);
    },
  ] as const;
};
