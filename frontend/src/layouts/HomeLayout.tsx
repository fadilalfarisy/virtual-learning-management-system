import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Layout, Menu, Dropdown, theme, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { UserProfile } from "../components/Modal/UserProfile";
import { items } from "../constants/itemsNavigation";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";

const { Header, Content, Footer } = Layout;

const HomeLayout = () => {
  const {
    token: { colorBgBase },
  } = theme.useToken();

  const navigate = useNavigate();
  const location = useLocation();
  const auth = useSelector((state: RootState) => state.auth);
  const [selectedKey, setSelectedKey] = useState("/");
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKey(pathName);
  }, [location.pathname]);

  useEffect(() => {}, [auth.logged]);

  const itemsDropdown = items.header.map((item) => ({
    key: item.key,
    label: (
      <Button color="primary" variant="link" style={{ width: "200px" }}>
        {item.label}
      </Button>
    ),
    onClick: () => navigate(item.key),
  }));

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* <div className="demo-logo" /> */}
        {isMobile ? (
          <Dropdown menu={{ items: itemsDropdown }}>
            <MenuOutlined
              style={{
                color: colorBgBase,
                padding: "12px",
                fontSize: "18px",
              }}
            />
          </Dropdown>
        ) : (
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[selectedKey]}
            items={items.header}
            onClick={(items) => navigate(items.key)}
            style={{ flex: 1, justifyContent: "start" }}
          />
        )}
        {auth.logged && <UserProfile />}
      </Header>
      <Content style={{ padding: "24px 48px" }}>
        <Outlet />
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Digsboard ©{new Date().getFullYear()} Created by Fadil
      </Footer>
    </Layout>
  );
};

export default HomeLayout;
