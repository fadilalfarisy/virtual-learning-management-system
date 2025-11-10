import { useNavigate } from "react-router-dom";
import { Space, Tooltip, Popconfirm, Button, message } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { errorHandling } from "../../utils/errorHandling";
import { useDeleteCourseMutation } from "../../state/api";

type Props = {
  linkEditButton: string;
  id: number;
  onDelete: ReturnType<typeof useDeleteCourseMutation>[0];
};

export const ActionTable = ({ linkEditButton, id, onDelete }: Props) => {
  const navigate = useNavigate();

  const confirm = async () => {
    try {
      await onDelete(id);
      message.success("Record was deleted");
    } catch (error: any) {
      errorHandling(error);
    }
  };

  return (
    <Space>
      <Tooltip title="Edit">
        <Button
          size={"small"}
          icon={<EditOutlined />}
          onClick={() => {
            navigate(linkEditButton);
          }}
        />
      </Tooltip>
      <Tooltip title="Delete">
        <Popconfirm
          title="Delete Record"
          description="Are you sure to delete this record?"
          onConfirm={confirm}
          okText="Yes"
          cancelText="No"
        >
          <Button
            color="danger"
            variant="solid"
            size="small"
            icon={<DeleteOutlined />}
          />
        </Popconfirm>
      </Tooltip>
    </Space>
  );
};
