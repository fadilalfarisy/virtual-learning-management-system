import {
  LinkOutlined,
  TeamOutlined,
  BookOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";

const dashboard: MenuProps["items"] = [
  {
    key: "/dashboard",
    icon: <AppstoreOutlined />,
    label: "Dashboard",
  },
  {
    key: "/dashboard/references",
    icon: <LinkOutlined />,
    label: "References",
  },
  {
    key: "/dashboard/courses",
    icon: <BookOutlined />,
    label: "Course",
  },
  // {
  //   key: "/dashboard/setting",
  //   icon: <SettingOutlined />,
  //   label: "Setting",
  // },
];

const dashboardAdmin: MenuProps["items"] = [
  {
    key: "/dashboard",
    icon: <AppstoreOutlined />,
    label: "Dashboard",
  },
  {
    key: "/dashboard/references",
    icon: <LinkOutlined />,
    label: "References",
  },
  {
    key: "/dashboard/courses",
    icon: <BookOutlined />,
    label: "Course",
  },
  {
    key: "/dashboard/users",
    icon: <TeamOutlined />,
    label: "User",
  },
  // {
  //   key: "/dashboard/setting",
  //   icon: <SettingOutlined />,
  //   label: "Setting",
  // },
];

const header = [
  {
    key: "/",
    label: "Home",
  },
  {
    key: "/references",
    label: "References",
  },
  {
    key: "/bookmarks",
    label: "Bookmarks",
  },
  {
    key: "/dashboard",
    label: "Contributor",
  },
];

export const items = {
  dashboard,
  dashboardAdmin,
  header,
};
