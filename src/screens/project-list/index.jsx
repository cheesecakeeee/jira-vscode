import { cleanObject } from "utils";
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

  const [list, setList] = useState([]);
  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(params))}`).then(
      async (res) => {
        if (res.ok) {
          setList(await res.json());
        }
      },
    );
  }, [params]);

  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch(`${apiUrl}/users`).then(async (res) => {
      if (res.ok) {
        setUsers(await res.json());
      }
    });
  }, []);

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
