import styled from "@emotion/styled";
import { ButtonNoPadding, Row } from "components/lib";
import { Button, Dropdown, MenuProps } from "antd";
import { useAuth } from "context/auth-context";
import { ProjectListScreen } from "screens/project-list";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import { Route, Routes, Navigate } from "react-router";
import { ProjectScreen } from "screens/project";
import { BrowserRouter as Router } from "react-router-dom";
import { resetRoute } from "utils";
import { ProjectPopover } from "components/project-popover";
import { ProjectModal } from "screens/project-list/project-modal";
import { useDispatch } from "react-redux";
import { projectListActions } from "screens/project-list/project-list.slice";
export const AuthenticatedApp = () => {
  const dispatch = useDispatch();

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
      <ProjectModal />
    </Container>
  );
};
const PageHeader = () => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <ButtonNoPadding type="link" onClick={resetRoute}>
          <SoftwareLogo
            width={"18rem"}
            color={"rgb(38, 132,255"}
          ></SoftwareLogo>
        </ButtonNoPadding>
        <ProjectPopover></ProjectPopover>
        <span>用户</span>
      </HeaderLeft>
      <HeaderRight>
        <User></User>
      </HeaderRight>
    </Header>
  );
};

const User = () => {
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
    <Dropdown menu={{ items }}>
      <Button type="link" onClick={(e) => e.preventDefault()}>
        <span>Hi, {user?.name}</span>
      </Button>
    </Dropdown>
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
