import { useAuth } from "context/auth-context";

export const RegisterScreen = () => {
  const { register } = useAuth();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = (event.currentTarget.elements[0] as HTMLInputElement)
      .value;
    const password = (event.currentTarget.elements[1] as HTMLInputElement)
      .value;
    register({ username, password });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">用户名：</label>
        <input type="text" placeholder="请输入用户名" />
      </div>
      <div>
        <label htmlFor="password">密码：</label>
        <input type="password" placeholder="请输入密码" />
      </div>
      <button type="submit">注册</button>
    </form>
  );
};
