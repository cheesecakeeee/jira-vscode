import { useMemo } from "react";
import { useUrlQueryParams } from "utils/url";

// 项目列表搜索参数，每次都会创建一个新对象所以用useMemo解决依赖循环问题
export const useProjectSearchParams = () => {
  // 传入查询条件key ，返回 url的中的属性值 和 操作url的方法
  const [params, setParams] = useUrlQueryParams(["name", "personId"]);

  return [
    useMemo(() => {
      return {
        ...params,
        // personId不为0所以用undefined
        personId: Number(params.personId) || undefined,
      };
    }, [params]),
    setParams,
  ] as const;
};
