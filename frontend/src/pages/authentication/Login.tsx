import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Typography, Card } from "antd";
import { useLoginMutation } from "../../state/api";
import { errorHandling } from "../../utils/errorHandling";
import { useDispatch, useSelector } from "react-redux";
import { AuthState, setAuth } from "../../state/auth";
import { useEffect } from "react";
import { RootState } from "../../state/store";

const { Title, Paragraph } = Typography;

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = useSelector((state: RootState) => state.auth);
  const [login, { isLoading }] = useLoginMutation();

  const onFinish = async (values: any) => {
    try {
      const result = await login(values).unwrap();

      const authValue: AuthState = {
        logged: true,
        fullName: result.fullName,
        email: result.email,
        role: result.role,
        accessToken: result.accessToken,
      };

      dispatch(setAuth(authValue));
    } catch (error) {
      errorHandling(error);
    }
  };

  useEffect(() => {
    if (auth.logged) navigate("/dashboard");
  }, [auth.logged]);

  return (
    <span
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card style={{ flex: 1, maxWidth: 500 }}>
        <div style={{ textAlign: "center", marginBottom: "18px" }}>
          <Title>Login</Title>
          <Paragraph>Dashboard Digsboard</Paragraph>
        </div>

        <Form name="login" onFinish={onFinish} layout="vertical">
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
          Haven't account yet?{" "}
          <a onClick={() => navigate("/auth/register")}> Register</a>
        </Paragraph>
      </Card>
    </span>
  );
};
