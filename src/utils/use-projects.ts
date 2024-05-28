import { useCallback, useEffect } from "react";
import { useHttp } from "./http";
import { useAsync } from "./use-async";
import { IProject } from "screens/project-list/list";
import { cleanObject } from "utils";

// 获取列表
export const useProjects = (params?: Partial<IProject>) => {
  const { run, ...result } = useAsync<IProject[]>();
  const client = useHttp();
  // 获取列表的http请求返回的是promise
  const fetchProjectPromise = useCallback(
    () => client("projects", { data: cleanObject(params || {}) }),
    [client, params],
  );

  // run接收 获取列表的http请求的promise，并且把这个promise传给run
  useEffect(() => {
    run(fetchProjectPromise(), { retry: fetchProjectPromise });
  }, [params, run, fetchProjectPromise]);

  return result;
};

// 编辑列表
export const useEditProjects = () => {
  const { run, ...result } = useAsync();
  const client = useHttp();

  const mutate = (params: Partial<IProject>) => {
    return run(
      client(`projects/${params.id}`, {
        data: cleanObject(params),
        method: "PATCH",
      }),
    );
  };

  return {
    mutate,
    ...result,
  };
};

// 新增列表
export const useAddProjects = () => {
  const { run, ...result } = useAsync();
  const client = useHttp();

  const mutate = (params: Partial<IProject>) => {
    return run(
      client(`projects/${params.id}`, {
        data: cleanObject(params),
        method: "POST",
      }),
    );
  };

  return {
    mutate,
    ...result,
  };
};
