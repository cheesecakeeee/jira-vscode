import { cleanObject, useMount, useDebounce } from "utils";
import { List } from "./list";
import { SearchPannel } from "./search-pannel";
import { useEffect, useState } from "react";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceParams]);

  const [users, setUsers] = useState([]);
  useMount(() => {
    client("users").then(setUsers);
  });

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPannel
        params={params}
        users={users}
        setParams={setParams}
      ></SearchPannel>
      <List list={list} users={users}></List>
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
