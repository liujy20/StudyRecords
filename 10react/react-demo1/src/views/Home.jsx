import React, { useState } from "react";
import MyMenu from "../components/MyMenu";
import { Breadcrumb, Layout, theme, Dropdown, Space, Col, Row } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import MyTabs from "../components/MyTabs";
const { Header, Content, Footer, Sider } = Layout;

const Home = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    navigate("/login");
  };
  const DropDownitems = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          用户信息
        </a>
      ),
    },
    {
      key: "2",
      label: <span onClick={logOut}>退出登录</span>,
    },
  ];

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" style={{ padding: "20px" }}>
          {collapsed ? null : (
            <img
              width="160px"
              src="https://gitee.com/static/errors/images/logo.svg?t=158106664"
              alt=""
            />
          )}
        </div>
        <MyMenu></MyMenu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Row>
            <Col offset={22} span={2}>
              <Dropdown
                menu={{
                  items: DropDownitems,
                }}
              >
                <Space>欢迎[小明]登录!</Space>
              </Dropdown>
            </Col>
          </Row>
        </Header>
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <MyTabs></MyTabs>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default Home;
