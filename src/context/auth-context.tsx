import { ReactNode, useCallback } from "react";
import { IUser } from "screens/project-list/search-pannel";
import * as auth from "../auth-provider";
import { http } from "utils/http";
import { useMount } from "utils";
import { useAsync } from "utils/use-async";
import { FullPageErrorFallback, FullPageLoading } from "components/lib";
import * as authStore from "store/auth.slice";
import { useDispatch, useSelector } from "react-redux";
import { bootstrapUserInfo } from "store/auth.slice";

export interface AuthForm {
  username: string;
  password: string;
}

// 携带token请求用户信息接口，初始化用户信息
export const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

// 此时AuthProvider只是一个普通组件和context无关
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { error, isError, isLoading, isIdle, run } = useAsync<IUser | null>();

  const dispatch: (...args: unknown[]) => Promise<IUser> = useDispatch<any>();

  useMount(() => {
    // 页面加载初始化用户信息
    run(dispatch(bootstrapUserInfo()));
  });

  if (isIdle || isLoading) {
    return <FullPageLoading />;
  }

  if (isError) {
    return <FullPageErrorFallback error={error}></FullPageErrorFallback>;
  }

  return <div>{children}</div>;
};

export const useAuth = () => {
  const dispatch: (...arg: unknown[]) => Promise<IUser> = useDispatch<any>();

  const user = useSelector(authStore.selectUser);

  const login = useCallback(
    (form: AuthForm) => dispatch(authStore.login(form)),
    [dispatch],
  );
  const register = useCallback(
    (form: AuthForm) => dispatch(authStore.register(form)),
    [dispatch],
  );
  const logout = useCallback(() => dispatch(authStore.logout()), [dispatch]);
  return {
    user,
    login,
    register,
    logout,
  };
};
