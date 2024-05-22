import { IUser } from "screens/project-list/search-pannel";
import { useAsync } from "./use-async";
import { useMount } from "utils";
import { useHttp } from "./http";

export const useUsers = () => {
  const { run, ...result } = useAsync<IUser[]>();
  const client = useHttp();
  useMount(() => {
    run(client("users"));
  });
  return result;
};
