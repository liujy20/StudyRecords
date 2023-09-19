import React from "react";
import style from "../assets/styles/Login.module.less";
// import img from '../../public/logo192.png'
import { Button, Checkbox, Form, Input, ConfigProvider, message } from "antd";
import { login } from "../apis/userApi";
import { useNavigate } from "react-router-dom";

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

export default function Login() {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    console.log("Success:", values);
    let res = await login(values);
    console.log(res.data);
    if (res.data.code) {
      const { token, userInfo } = res.data.data;
      localStorage.setItem("token", token);
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      message.success("登录成功");
      
      navigate("/home", { replace: true });
    }
  };
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#030852",
        },
      }}
    >
      <div className={style.bg}>
        <img src="/logo192.png" alt="" />
        <div className={style.login}>
          <h2>Login</h2>
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Account"
              name="account"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </ConfigProvider>
  );
}
