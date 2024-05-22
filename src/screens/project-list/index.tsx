import { useDebounce } from "utils";
import { List } from "./list";
import { SearchPannel } from "./search-pannel";
import { useState } from "react";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProjects } from "utils/use-projects";
import { useUsers } from "utils/use-users";

export const ProjectListScreen = () => {
  const [params, setParams] = useState({
    name: "",
    personId: "",
  });

  const debounceParams = useDebounce(params, 2000);
  const { error, data: list, isLoading } = useProjects(debounceParams);
  const { data: users } = useUsers();

  return (
    <Container>
      <h1>项目列表</h1>
      {error ? (
        <Typography.Text type="danger">{error.message}</Typography.Text>
      ) : null}
      <SearchPannel
        params={params}
        users={users || []}
        setParams={setParams}
      ></SearchPannel>
      <List
        dataSource={list || []}
        users={users || []}
        loading={isLoading}
      ></List>
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
