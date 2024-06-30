import { useQuery } from "react-query";
import { useHttp } from "./http";
import { ITaskType } from "types/ITaskType";

export const useTaskTypes = () => {
  const client = useHttp();

  return useQuery<ITaskType[]>(["taskTypes"], () => client("taskTypes"));
};
