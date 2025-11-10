import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Typography, Card, message } from "antd";
import { useRegisterMutation } from "../../state/api";
import { errorHandling } from "../../utils/errorHandling";

const { Title, Paragraph } = Typography;

export const Register = () => {
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const onFinish = async (values: any) => {
    try {
      console.log(values);
      const result = await register(values).unwrap();
      console.log(result);
      message.success("Register success");
      navigate("/auth");
    } catch (error) {
      errorHandling(error);
    }
  };

  return (
    <span
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card style={{ flex: 1, maxWidth: 500 }}>
        <div style={{ textAlign: "center", marginBottom: "18px" }}>
          <Title>Register</Title>
          <Paragraph>Dashboard Digsboard</Paragraph>
        </div>

        <Form name="register" onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[{ required: true, min: 3, max: 100 }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, min: 7, max: 50 }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button block type="primary" htmlType="submit" loading={isLoading}>
              Sign In
            </Button>
          </Form.Item>
        </Form>

        <Paragraph>
          Already have an account?{" "}
          <a onClick={() => navigate("/auth")}>Login</a>
        </Paragraph>
      </Card>
    </span>
  );
};
