import { Form, Input } from "antd";
import { useAuth } from "context/auth-context";
import { LongButton } from "unauthenticated-app";

export const LoginScreen = () => {
  const { login, user } = useAuth();

  const handleSubmit = (value: { username: string; password: string }) => {
    login(value);
  };

  return (
    <Form onFinish={handleSubmit}>
      {user ? <div>登录成功，欢迎{user?.name}</div> : null}
      <Form.Item
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input placeholder={"用户名"} />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password placeholder={"密码"} />
      </Form.Item>
      <Form.Item>
        <LongButton type="primary" htmlType="submit">
          登录
        </LongButton>
      </Form.Item>
    </Form>
  );
};
