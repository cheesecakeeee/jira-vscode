import { useDebounce, useDocumentTitle } from "utils";
import { List } from "./list";
import { SearchPannel } from "./search-pannel";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProjects } from "utils/use-projects";
import { useUsers } from "utils/use-users";
import { useProjectSearchParams } from "./util";

export const ProjectListScreen = () => {
  useDocumentTitle("项目列表", false);

  const [params, setParams] = useProjectSearchParams();

  const {
    error,
    data: list,
    isLoading,
  } = useProjects(useDebounce(params, 2000));

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

ProjectListScreen.whyDidYouRender = false;

const Container = styled.div`
  padding: 3.2rem;
`;
