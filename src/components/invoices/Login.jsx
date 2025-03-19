import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Checkbox, Form, Input, message } from "antd";
import { MailOutlined, LockOutlined, GithubOutlined, GoogleOutlined, UserOutlined } from "@ant-design/icons";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === "admin@icchaporon.com" && password === "password") {
      localStorage.setItem("user", JSON.stringify({ username }));
      message.success("Login successful!");
      navigate("/create-invoice");
    } else {
      message.error("Invalid credentials!");
    }
  };

  const onFinish = (values) => {
    setUsername(values.email);
    setPassword(values.password);
    handleLogin();
    console.log(values)
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-blue-100 p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 p-3 shadow-lg">
            <UserOutlined className="text-white text-2xl" />
          </div>
        </div>

        <Card className="shadow-xl border-none">
          <div className="text-center pb-6">
            <h2 className="text-2xl font-bold">Welcome Back</h2>
            <p className="text-gray-500">Enter your credentials to access your account</p>
          </div>

          <Form name="login" layout="vertical" initialValues={{ remember: true }} onFinish={onFinish} className="space-y-4">
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please enter your email!" }]}
            >
              <Input
                prefix={<MailOutlined className="text-gray-400" />}
                placeholder="name@example.com"
                className="bg-gray-50"
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please enter your password!" }]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="Enter password"
                className="bg-gray-50"
              />
            </Form.Item>

            <div className="flex justify-between items-center">
              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Remember me for 30 days</Checkbox>
              </Form.Item>
              <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
                Forgot password?
              </Link>
            </div>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Sign in
              </Button>
            </Form.Item>
          </Form>

          <div className="relative flex items-center justify-center my-4">
            <div className="border-t w-full border-gray-200"></div>
            <div className="absolute bg-white px-3 text-sm text-gray-500">Or continue with</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button className="w-full flex items-center justify-center" icon={<GoogleOutlined />}>
              Google
            </Button>
            <Button className="w-full flex items-center justify-center" icon={<GithubOutlined />}>
              GitHub
            </Button>
          </div>

          <div className="text-center text-sm mt-4">
            Don't have an account?{" "}
            <Link to="/signup" className="font-medium text-blue-600 hover:underline">
              Create an account
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
