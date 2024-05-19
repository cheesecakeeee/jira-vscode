import { Button, Form, Input } from "antd";
import { useAuth } from "context/auth-context";

export const RegisterScreen = () => {
  const { register } = useAuth();

  const handleSubmit = (values: { username: string; password: string }) => {
    register(values);
  };
  return (
    <Form onFinish={handleSubmit}>
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
      <Button htmlType="submit" type="primary">
        注册
      </Button>
    </Form>
  );
};
