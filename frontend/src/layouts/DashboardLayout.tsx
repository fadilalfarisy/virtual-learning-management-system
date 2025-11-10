import { useState, useEffect } from "react";
import { Layout, Menu, theme } from "antd";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { items } from "../constants/itemsNavigation";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";

const { Sider, Content } = Layout;

const DashboardLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKeysSider, setSelectedKeysSider] = useState("/");
  const auth = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeysSider(pathName);
  }, [location.pathname]);

  return (
    <Layout
      style={{
        padding: "24px 0",
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
      }}
    >
      <Sider style={{ background: colorBgContainer }} breakpoint="lg">
        <Menu
          mode="inline"
          defaultSelectedKeys={[selectedKeysSider]}
          items={auth.role == "ADMIN" ? items.dashboardAdmin : items.dashboard}
          onClick={(item) => {
            navigate(item.key);
          }}
        />
      </Sider>
      <Content style={{ padding: "0 24px", minHeight: "calc(100vh - 222px)" }}>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default DashboardLayout;
