import { useDebounce, useDocumentTitle } from "utils";
import { List } from "./list";
import { SearchPannel } from "./search-pannel";
import styled from "@emotion/styled";
import { Button, Typography } from "antd";
import { useProjects } from "utils/use-projects";
import { useUsers } from "utils/use-users";
import { useProjectSearchParams } from "./util";
import { Row } from "components/lib";
import { useDispatch } from "react-redux";
import { projectListActions } from "./project-list.slice";

export const ProjectListScreen = () => {
  useDocumentTitle("项目列表", false);

  const [params, setParams] = useProjectSearchParams();

  const {
    error,
    data: list,
    isLoading,
    retry,
  } = useProjects(useDebounce(params, 2000));

  const { data: users } = useUsers();

  const dispatch = useDispatch();

  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <Button onClick={() => dispatch(projectListActions.openProjectModal())}>
          创建项目
        </Button>
      </Row>
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
        refresh={retry}
      ></List>
    </Container>
  );
};

ProjectListScreen.whyDidYouRender = false;

const Container = styled.div`
  padding: 3.2rem;
`;
