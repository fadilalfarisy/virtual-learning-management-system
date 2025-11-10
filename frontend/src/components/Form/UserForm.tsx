import { Form, Input, Select, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { errorHandling } from "../../utils/errorHandling";
import { FormButton } from "../Button/FormButton";
import { option } from "../../constants/optionType";
import { useCreateUserMutation, useUpdateUserMutation } from "../../state/api";

type Props = {
  createForm: boolean;
  formFunction: typeof useCreateUserMutation | typeof useUpdateUserMutation;
  initialValues?: Object;
};

export const UserForm = ({
  createForm,
  formFunction,
  initialValues,
}: Props) => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();

  const [createUser, { isLoading }] = formFunction();

  const onFinish = async (values: any) => {
    try {
      if (createForm) {
        await createUser(values).unwrap();
        message.success("Record was created");
        form.resetFields();
      }
      if (!createForm) {
        await createUser({ id, body: values }).unwrap();
        message.success("Record was updated");
        navigate(-1);
      }
    } catch (err: any) {
      errorHandling(err);
    }
  };

  const onFinishFailed = (error: any) => {
    console.log("Received values of form: ", error);
  };

  return (
    <>
      <Form
        name={createForm ? "Create User" : "Update User"}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        form={form}
        initialValues={createForm ? {} : { ...initialValues, password: "" }}
        layout="vertical"
        autoComplete="off"
      >
        <Form.Item
          label="Full Name"
          name="fullName"
          hasFeedback
          rules={[{ required: true, min: 3, max: 50, whitespace: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          hasFeedback
          rules={[{ required: true, type: "email" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Role"
          name="role"
          hasFeedback
          rules={[{ required: true }]}
        >
          <Select showSearch optionFilterProp="label" options={option.role} />
        </Form.Item>

        {createForm ? (
          <Form.Item
            label="Password"
            name="password"
            hasFeedback
            rules={[{ required: true, min: 7, max: 255, whitespace: true }]}
          >
            <Input.Password />
          </Form.Item>
        ) : (
          <>
            <Form.Item
              label="Status"
              name="status"
              hasFeedback
              rules={[{ required: true }]}
            >
              <Select
                showSearch
                optionFilterProp="label"
                options={option.status}
              />
            </Form.Item>
            <Form.Item
              label="New Password"
              name="password"
              rules={[{ min: 7, max: 255, whitespace: true }]}
              tooltip="Fill the field to replace password"
            >
              <Input.Password placeholder="Reset password" />
            </Form.Item>
          </>
        )}
      </Form>
      <FormButton
        submitName={createForm ? "Save" : "Update"}
        form={form}
        isLoading={isLoading}
      />
    </>
  );
};
