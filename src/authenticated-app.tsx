import styled from "@emotion/styled";
import { Row } from "components/lib";
import { Button, Dropdown, MenuProps } from "antd";
import { useAuth } from "context/auth-context";
import { ProjectListScreen } from "screens/project-list";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import { Route, Routes, Navigate } from "react-router";
import { ProjectScreen } from "screens/project";
import { BrowserRouter as Router } from "react-router-dom";
import { resetRoute } from "utils";
export const AuthenticatedApp = () => {
  return (
    <Container>
      <PageHeader></PageHeader>
      <Main>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/projects" replace />} />
            <Route path="/projects" element={<ProjectListScreen />}></Route>
            <Route
              path="/projects/:projectId/*"
              element={<ProjectScreen />}
            ></Route>
          </Routes>
        </Router>
      </Main>
    </Container>
  );
};
const PageHeader = () => {
  const { logout, user } = useAuth();

  const items: MenuProps["items"] = [
    {
      key: "logout",
      label: (
        <Button type="link" onClick={logout}>
          退出登录
        </Button>
      ),
    },
  ];

  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <Button type="link" onClick={resetRoute}>
          <SoftwareLogo
            width={"18rem"}
            color={"rgb(38, 132,255"}
          ></SoftwareLogo>
        </Button>
        <h2>项目</h2>
        <h2>用户</h2>
      </HeaderLeft>
      <HeaderRight>
        <Dropdown menu={{ items }}>
          <Button type="link" onClick={(e) => e.preventDefault()}>
            <span>Hi, {user?.name}</span>
          </Button>
        </Dropdown>
      </HeaderRight>
    </Header>
  );
};
const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;
const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  z-index: 1;
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;

const Main = styled.main``;
