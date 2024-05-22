import { useEffect } from "react";
import { useHttp } from "./http";
import { useAsync } from "./use-async";
import { IProject } from "screens/project-list/list";
import { cleanObject } from "utils";

export const useProjects = (params: Partial<IProject>) => {
  const { run, ...result } = useAsync<IProject[]>();
  const client = useHttp();
  useEffect(() => {
    run(client("projects", { data: cleanObject(params) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return result;
};
