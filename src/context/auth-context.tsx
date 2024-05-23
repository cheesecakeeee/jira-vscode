import { ReactNode, createContext, useContext } from "react";
import * as Auth from "auth-provider";
import { IUser } from "screens/project-list/search-pannel";
import * as auth from "../auth-provider";
import { http } from "utils/http";
import { useMount } from "utils";
import { useAsync } from "utils/use-async";
import { FullPageErrorFallback, FullPageLoading } from "components/lib";

interface AuthForm {
  username: string;
  password: string;
}

// 携带token请求用户信息接口，初始化用户信息
const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

export const AuthContext = createContext<
  | {
      user: IUser | null;
      login: (form: AuthForm) => Promise<void>;
      register: (form: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);
AuthContext.displayName = "authWithContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: user,
    setData: setUser,
    error,
    isError,
    isLoading,
    isIdle,
    run,
  } = useAsync<IUser | null>();

  const login = (form: AuthForm) => Auth.login(form).then(setUser);
  const register = (form: AuthForm) => Auth.register(form).then(setUser);
  const logout = () => Auth.logout().then(() => setUser(null));

  useMount(() => {
    // 页面加载初始化用户信息
    run(bootstrapUser());
  });

  if (isIdle || isLoading) {
    return <FullPageLoading />;
  }

  if (isError) {
    return <FullPageErrorFallback error={error}></FullPageErrorFallback>;
  }

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout }}
      children={children}
    />
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth 必须在AuthProvider中使用");
  return context;
};
