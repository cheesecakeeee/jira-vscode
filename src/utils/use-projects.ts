import { useHttp } from "./http";
import { IProject } from "screens/project-list/list";
import { cleanObject } from "utils";
import { useMutation, useQuery, QueryKey } from "react-query";
import {
  useAddOptimistic,
  useDeleteOptimistic,
  useEditOptimistic,
} from "./use-optimistic-update";

// 获取列表
export const useProjects = (params?: Partial<IProject>) => {
  const client = useHttp();

  return useQuery<IProject[]>(["projects", params], () =>
    client("projects", { data: cleanObject(params || {}) }),
  );
};

// 编辑列表
export const useEditProjects = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<IProject>) =>
      client(`projects/${params.id}`, {
        data: cleanObject(params),
        method: "PATCH",
      }),
    useEditOptimistic(queryKey),
  );
};

// 新增列表
export const useAddProjects = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<IProject>) =>
      client(`projects`, {
        data: cleanObject(params),
        method: "POST",
      }),
    useAddOptimistic(queryKey),
  );
};
// 删除列表项
export const useDeleteProjects = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    ({ id }: { id: number }) =>
      client(`projects/${id}`, {
        method: "DELETE",
      }),
    useDeleteOptimistic(queryKey),
  );
};

// 根据id获取列表某条数据详情
export const useProjectDetails = (id?: number) => {
  const client = useHttp();

  return useQuery<IProject>(
    ["project", { id }],
    () => {
      return client(`projects/${id}`);
    },
    {
      enabled: !!id, // 只有id有值才发起请求
    },
  );
};
