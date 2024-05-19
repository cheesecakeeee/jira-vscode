import { Form, Input, Button } from "antd";
import { useAuth } from "context/auth-context";

export const LoginScreen = () => {
  const { login, user } = useAuth();

  const handleSubmit = (value: { username: string; password: string }) => {
    login(value);
  };

  return (
    <Form onFinish={handleSubmit}>
      {user ? <div>登录成功，欢迎{user?.name}</div> : null}
      <Form.Item
        label="用户名："
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input placeholder="请输入用户名" />
      </Form.Item>
      <Form.Item
        label="密码："
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password placeholder="请输入密码" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          登录
        </Button>
      </Form.Item>
    </Form>
  );
};
