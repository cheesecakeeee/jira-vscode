export const LoginScreen = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const login = (params: { username: string; password: string }) => {
    fetch(`${apiUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    }).then(async (res) => {
      if (res.ok) {
      }
    });
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = (event.currentTarget.elements[0] as HTMLInputElement)
      .value;
    const password = (event.currentTarget.elements[1] as HTMLInputElement)
      .value;
    login({ username, password });
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
      <button type="submit">登录</button>
    </form>
  );
};
