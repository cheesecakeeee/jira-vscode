import { useDebounce, useDocumentTitle } from "utils";
import { List } from "./list";
import { SearchPannel } from "./search-pannel";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProjects } from "utils/use-projects";
import { useUsers } from "utils/use-users";
import { useProjectSearchParams } from "./util";
import { Row } from "components/lib";

export const ProjectListScreen = (props: {
  createProjectButton: JSX.Element;
}) => {
  useDocumentTitle("项目列表", false);

  const [params, setParams] = useProjectSearchParams();

  const {
    error,
    data: list,
    isLoading,
    retry,
  } = useProjects(useDebounce(params, 2000));

  const { data: users } = useUsers();

  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        {props.createProjectButton}
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
