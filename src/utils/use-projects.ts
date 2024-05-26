import { useEffect } from "react";
import { useHttp } from "./http";
import { useAsync } from "./use-async";
import { IProject } from "screens/project-list/list";
import { cleanObject } from "utils";

// 获取列表
export const useProjects = (params: Partial<IProject>) => {
  const { run, ...result } = useAsync<IProject[]>();
  const client = useHttp();
  useEffect(() => {
    run(client("projects", { data: cleanObject(params) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return result;
};

// 编辑列表
export const useEidtProjects = () => {
  const { run, ...result } = useAsync();
  const client = useHttp();

  const mutate = (params: Partial<IProject>) => {
    run(
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
    run(
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
