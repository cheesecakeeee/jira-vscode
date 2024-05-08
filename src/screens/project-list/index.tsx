import { cleanObject, useMount, useDebounce } from "utils";
import { List } from "./list";
import { SearchPannel } from "./search-pannel";
import { useEffect, useState } from "react";
import qs from "qs";

const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
  const [params, setParams] = useState({
    name: "",
    personId: "",
  });

  const debounceParams = useDebounce(params, 2000);

  const [list, setList] = useState([]);
  useEffect(() => {
    fetch(
      `${apiUrl}/projects?${qs.stringify(cleanObject(debounceParams))}`,
    ).then(async (res) => {
      if (res.ok) {
        setList(await res.json());
      }
    });
  }, [debounceParams]);

  const [users, setUsers] = useState([]);

  useMount(() => {
    fetch(`${apiUrl}/users`).then(async (res) => {
      if (res.ok) {
        setUsers(await res.json());
      }
    });
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
