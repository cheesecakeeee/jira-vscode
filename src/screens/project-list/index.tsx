import { useDebounce, useDocumentTitle } from "utils";
import { List } from "./list";
import { SearchPannel } from "./search-pannel";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProjects } from "utils/use-projects";
import { useUsers } from "utils/use-users";
import { useUrlQueryParams } from "utils/url";

export const ProjectListScreen = () => {
  // 传入查询条件key ，返回 url的中的属性值 和 操作url的方法
  const [params, setParams] = useUrlQueryParams(["name", "personId"]);

  useDocumentTitle("项目列表", false);
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

ProjectListScreen.whyDidYouRender = false;

const Container = styled.div`
  padding: 3.2rem;
`;
