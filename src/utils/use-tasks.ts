import { ITask } from "types/ITask";
import { useHttp } from "./http";
import { useQuery } from "react-query";
import { cleanObject } from "utils";

// 获取看板列表
export const useTasks = (params?: Partial<ITask>) => {
  const client = useHttp();

  return useQuery<ITask[]>(["tasks", params], () =>
    client("tasks", { data: cleanObject(params || {}) }),
  );
};
