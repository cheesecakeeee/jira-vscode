// import { ProjectListScreen } from "screens/project-list";
import { useAuth } from "context/auth-context";
import { UnauthenticatedApp } from "unauthenticated-app";
import { AuthenticatedApp } from "authenticated-app";
import { ConfigProvider } from "antd";
import "./App.css";

function App() {
  const { user } = useAuth();
  return (
    <ConfigProvider
      theme={{ token: { colorPrimary: "#0052cc", fontSize: 16 } }}
    >
      <div>{user ? <AuthenticatedApp /> : <UnauthenticatedApp />}</div>
    </ConfigProvider>
  );
}

export default App;
