import { Descriptions, Dropdown, Modal, Avatar, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { MenuProps } from "antd";
import { useLazyLogoutQuery } from "../../state/api";

import { RootState } from "../../state/store";
import { deleteAuth } from "../../state/auth";
import { apiSlice } from "../../state/api";
import { errorHandling } from "../../utils/errorHandling";

export const UserProfile = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const [logout] = useLazyLogoutQuery();

  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const items: MenuProps["items"] = [
    {
      key: "user-profile-link",
      label: "Profile",
      icon: <UserOutlined />,
      onClick: showModal,
    },
    {
      type: "divider",
    },
    {
      key: "user-logout-link",
      label: "Logout",
      icon: <LogoutOutlined />,
      danger: true,
      onClick: async () => {
        dispatch(deleteAuth());
        localStorage.removeItem("auth");
        dispatch(apiSlice.util.resetApiState());
        navigate("/");

        try {
          await logout({}).unwrap();
          message.success("Logout was success");
        } catch (error) {
          errorHandling(error);
        }
      },
    },
  ];

  if (!auth.logged) {
    return (
      <Avatar
        icon={<UserOutlined />}
        style={{ backgroundColor: "rgb(200, 200, 200)", marginRight: 16 }}
      />
    );
  }

  if (auth.logged) {
    return (
      <>
        <Dropdown menu={{ items }} trigger={["click"]}>
          <Avatar
            icon={<UserOutlined />}
            style={{ backgroundColor: "rgb(200, 200, 200)", marginRight: 16 }}
          />
        </Dropdown>

        <Modal
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          <Descriptions layout="vertical" size={"small"} title="User Info">
            <Descriptions.Item label="Full Name">
              {auth.fullName}
            </Descriptions.Item>
            <Descriptions.Item label="Email">{auth.email}</Descriptions.Item>
            <Descriptions.Item label="Role">
              {auth.role.toLowerCase()}
            </Descriptions.Item>
          </Descriptions>
        </Modal>
      </>
    );
  }
};
