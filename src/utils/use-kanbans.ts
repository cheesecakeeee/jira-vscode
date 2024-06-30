import { useQuery } from "react-query";
import { useHttp } from "./http";
import { cleanObject } from "utils";
import { IKanban } from "types/IKanban";

// 获取看板列表
export const useKanbans = (params?: Partial<IKanban>) => {
  const client = useHttp();

  return useQuery<IKanban[]>(["kanbans", params], () =>
    client("kanbans", { data: cleanObject(params || {}) }),
  );
};
