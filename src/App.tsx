// import { ProjectListScreen } from "screens/project-list";
import { useAuth } from "context/auth-context";
import { UnauthenticatedApp } from "unauthenticated-app";
import { AuthenticatedApp } from "authenticated-app";
import { ConfigProvider } from "antd";
import "./App.css";
import { ErrorBoundary } from "components/error-boundary";
import { FullPageErrorFallback } from "components/lib";

function App() {
  const { user } = useAuth();
  return (
    <ConfigProvider
      theme={{ token: { colorPrimary: "#0052cc", fontSize: 16 } }}
    >
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </ErrorBoundary>
    </ConfigProvider>
  );
}

export default App;
