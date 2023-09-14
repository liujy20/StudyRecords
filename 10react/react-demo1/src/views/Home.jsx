import React, { useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Layout,
  Menu,
  theme,
  Dropdown,
  Space,
  Col,
  Row,
} from "antd";
import { Link, Outlet } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;
const item = [
  {
    label: <Link to="/home/main">系统主页</Link>,
    key: "/home/main",
    icon: <PieChartOutlined />,
  },
  {
    label: <Link to="/home/user">用户管理</Link>,
    key: "/home/user",
    icon: <DesktopOutlined />,
  },
  {
    label: <Link to="/home/role">角色管理</Link>,
    key: "/home/role",
    icon: <TeamOutlined />,
  },
  {
    label: <Link to="/home/shop">店铺管理</Link>,
    key: "/home/shop",
    icon: <FileOutlined />,
  },
  {
    label: "商品管理",
    key: "/home/finance",
    icon: <DesktopOutlined />,
    children: [
      {
        label: <Link to="/home/good/goodlist">商品列表</Link>,
        key: "/home/good/goodlist",
      },
      {
        label: <Link to="/home/good/goodcategory">商品分类</Link>,
        key: "/home/good/goodcategory",
      },
    ],
  },
  {
    label: "财务管理",
    key: "/home/Finance",
    icon: <DesktopOutlined />,
    children: [
      {
        label: <Link to="/home/Finance/salary">工资数据</Link>,
        key: "/home/Finance/salary",
      },
      {
        label: <Link to="/home/Finance/sale">销售数据</Link>,
        key: "/home/Finance/sale",
      },
    ],
  },
];
const DropDownitems = [
  {
    key: "1",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        1st menu item
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.aliyun.com"
      >
        2nd menu item
      </a>
    ),
  },
  {
    key: "3",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.luohanacademy.com"
      >
        3rd menu item
      </a>
    ),
  },
];
const Home = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
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
        <Menu
          theme="dark"
          defaultSelectedKeys={["/home/main"]}
          mode="inline"
          items={item}
        />
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
                  items:DropDownitems,
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
