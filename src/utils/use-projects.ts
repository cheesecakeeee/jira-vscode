import { useHttp } from "./http";
import { IProject } from "screens/project-list/list";
import { cleanObject } from "utils";
import { useMutation, useQuery, useQueryClient } from "react-query";

// 获取列表
export const useProjects = (params?: Partial<IProject>) => {
  const client = useHttp();

  return useQuery<IProject[]>(["projects", params], () =>
    client("projects", { data: cleanObject(params || {}) }),
  );
};

// 编辑列表
export const useEditProjects = () => {
  const client = useHttp();

  const queryClient = useQueryClient();

  return useMutation(
    (params: Partial<IProject>) => {
      return client(`projects/${params.id}`, {
        data: cleanObject(params),
        method: "PATCH",
      });
    },
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    },
  );
};

// 新增列表
export const useAddProjects = () => {
  const client = useHttp();

  const queryClient = useQueryClient();
  return useMutation(
    (params: Partial<IProject>) =>
      client(`projects`, {
        data: cleanObject(params),
        method: "POST",
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    },
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
