import { Button } from "antd";
import { useAuth } from "context/auth-context";
import { ProjectListScreen } from "screens/project-list";
export const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <div>
      <Button onClick={logout}>退出登录</Button>
      <ProjectListScreen></ProjectListScreen>
    </div>
  );
};
