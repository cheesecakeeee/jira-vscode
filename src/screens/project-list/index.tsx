import { cleanObject, useMount, useDebounce } from "utils";
import { List } from "./list";
import { SearchPannel } from "./search-pannel";
import { useEffect, useState } from "react";
import { useHttp } from "utils/http";

export const ProjectListScreen = () => {
  const [params, setParams] = useState({
    name: "",
    personId: "",
  });
  const client = useHttp();
  const debounceParams = useDebounce(params, 2000);

  const [list, setList] = useState([]);
  useEffect(() => {
    client("projects", {
      data: cleanObject(debounceParams),
    }).then(setList);
  }, [debounceParams]);

  const [users, setUsers] = useState([]);
  useMount(() => {
    client("users").then(setUsers);
  });

  return (
    <div>
      <SearchPannel
        params={params}
        users={users}
        setParams={setParams}
      ></SearchPannel>
      <List list={list} users={users}></List>
    </div>
  );
};
