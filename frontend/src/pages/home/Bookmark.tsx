import { HeartFilled } from "@ant-design/icons";
import type { TableColumnsType } from "antd";
import { Button, Table, Result, theme } from "antd";
import { TitlePage } from "../../components";
import {
  useRemoveBookmarkMutation,
  useGetBookmarkQuery,
} from "../../state/api";
import { errorHandling } from "../../utils/errorHandling";
import { useNavigate } from "react-router-dom";

interface DataType {
  _id: string;
  title: string;
  channel: string;
  link: string;
  courseId: {
    _id: string;
    course: string;
    semester: number;
  };
  createdBy: {
    _id: string;
    fullName: string;
  };
  bookmark: boolean;
}

export const Bookmark = () => {
  const {
    token: { colorError },
  } = theme.useToken();

  const navigate = useNavigate();

  const {
    data: initialBookmarks,
    isSuccess,
    isError,
  } = useGetBookmarkQuery({});
  const [removeBookmark] = useRemoveBookmarkMutation();

  const onDeleteBookmark = async (referenceId: string) => {
    try {
      await removeBookmark({ referenceId }).unwrap();
    } catch (error) {
      errorHandling;
    }
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: "Id",
      width: 1,
      render: (_, __, index) => index + 1,
    },
    {
      title: "Title",
      dataIndex: "title",
      width: 10,
    },
    {
      title: "Channel",
      dataIndex: "channel",
      width: 3,
    },
    {
      title: "Link",
      dataIndex: "link",
      render: (record) => (
        <Button type="primary" size="small">
          <a href={record} target="_blank" rel="noopener noreferrer">
            Watch
          </a>
        </Button>
      ),
      width: 1,
    },
    {
      title: "Course",
      dataIndex: ["courseId", "course"],
      width: 3,
    },
    {
      title: "Bookmark",
      dataIndex: "_id",
      align: "center",
      width: 1,
      render: (value) => (
        <HeartFilled
          style={{ fontSize: 20, color: colorError, padding: 6 }}
          onClick={() => onDeleteBookmark(value)}
        />
      ),
    },
    {
      title: "Created By",
      dataIndex: ["createdBy", "fullName"],
      width: 1,
    },
  ];

  if (isError) {
    return (
      <Result
        status="info"
        title="Empty Data"
        subTitle={
          <Button
            style={{ marginTop: 12 }}
            type="primary"
            onClick={() => navigate("/auth")}
          >
            Login
          </Button>
        }
      />
    );
  }

  if (isSuccess) {
    return (
      <>
        <TitlePage title="Bookmark" description="List bookmark reference" />
        <Table<DataType>
          columns={columns}
          dataSource={initialBookmarks?.bookmarks}
          scroll={{ x: "max-content" }}
          rowKey="_id"
        />
      </>
    );
  }
};
