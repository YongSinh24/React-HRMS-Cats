import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Breadcrumb, Layout, Menu, Button, theme } from "antd";
import "./Layout.css";
import MenuItems from "./MenuItems";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  SettingOutlined,
  InfoCircleOutlined,
  FieldTimeOutlined,
  PayCircleOutlined,
  BankOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const logo = require("../../asset/image/catslogo.png");
const Whitelogo = require("../../asset/image/CatsWhiteLogo.png");

const items = [
  getItem("Dashboard", "Dashboard", <PieChartOutlined />),
  getItem("Info & Management", "Info", <InfoCircleOutlined />),
  getItem("Attendance", "Attendance", <FieldTimeOutlined />),
  getItem("Leave Management", "/", <TeamOutlined />, [
    getItem("All Employee", "leave", <TeamOutlined />),
    getItem("Leave Request", "leave-request", <UserOutlined />),
  ]),
  getItem("Payroll", "Payroll", <PayCircleOutlined />),
  getItem("Department", "Department", <BankOutlined />),
  getItem("Staff", "Staff", <UserOutlined />),
  getItem("Report", "report", <FileOutlined />),
  getItem("Setting", "Setting", <SettingOutlined />, [
    getItem("General", "2"),
    getItem("Leave ", "3"),
    getItem("Attendance ", "4"),
    getItem("Payroll ", "4"),
  ]),
];

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();

  const onChange = (value) => {
    navigate(value.key);
    console.log(value.key);
  };

  const handleLogoClick = () => {
    navigate("/"); // Change the route as per your requirement
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header className="header">
        <div className="title-logo">
          <Button
            type="text"
            onClick={handleLogoClick}
            style={{ padding: 0, border: "none" }}
          >
            <img
              className="logo"
              alt=""
              src={theme === "light" ? logo : Whitelogo}
              style={{ cursor: "pointer" }}
            />
          </Button>
          <div className="header-title">Human Resource Management System</div>
        </div>
        <MenuItems />
      </Header>
      <Layout>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
          }}
        >
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
            onClick={onChange}
          />
        </Sider>
        <Layout style={{ marginLeft: collapsed ? 80 : 200, marginTop: 64 }}>
          <Content className="content">
            <Breadcrumb className="breadcrumb">
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div
              className="site-layout-background"
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <Outlet />
            </div>
          </Content>
          <Footer
            style={{
              textAlign: "center",
              background: "#fff",
              borderTop: "1px solid #e8e8e8",
            }}
          >
            © Copyright CATS. All Rights Reserved
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
