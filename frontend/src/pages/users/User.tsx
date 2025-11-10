import { PlusOutlined } from "@ant-design/icons";
import type { TableColumnsType } from "antd";
import { Button, Table, Result } from "antd";
import { useNavigate } from "react-router-dom";
import { TitlePage, ActionTable } from "../../components";
import { useDeleteUserMutation, useGetAllUsersQuery } from "../../state/api";

interface DataType {
  _id: string;
  fullName: string;
  email: string;
  role: string;
  status: boolean;
}

export const User = () => {
  const navigate = useNavigate();

  const {
    data: initialValueUser,
    isSuccess,
    isError,
  } = useGetAllUsersQuery({});
  const [deleteUser] = useDeleteUserMutation();

  const columns: TableColumnsType<DataType> = [
    {
      title: "Id",
      width: "1%",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (record) => {
        if (record) return "Active";
        return "Inactive";
      },
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "_id",
      width: "1%",
      fixed: "right",
      render: (record) => (
        <ActionTable
          id={record}
          onDelete={deleteUser}
          linkEditButton={`/dashboard/users/update/${record}`}
        />
      ),
    },
  ];

  if (isError) {
    return (
      <Result
        status="error"
        title="403 Forbidden"
        subTitle="Oops, Your can't access this page."
      />
    );
  }

  if (isSuccess) {
    return (
      <>
        <TitlePage title="List User" description="Account user system">
          <Button
            type="primary"
            onClick={() => navigate("/dashboard/users/create")}
            icon={<PlusOutlined />}
          >
            Add User
          </Button>
        </TitlePage>

        <Table<DataType>
          columns={columns}
          dataSource={initialValueUser}
          scroll={{ x: "max-content" }}
          rowKey="_id"
        />
      </>
    );
  }
};
