import { Form, Select, message, Input } from "antd";
import { errorHandling } from "../../utils/errorHandling";
import { FormButton } from "../Button/FormButton";
import { option } from "../../constants/optionType";
import { useNavigate, useParams } from "react-router-dom";
import {
  useCreateCourseMutation,
  useUpdateCourseMutation,
} from "../../state/api";

type Props = {
  createForm: boolean;
  formFunction: typeof useUpdateCourseMutation | typeof useCreateCourseMutation;
  initialValues?: Object;
};

export const CourseForm = ({
  createForm,
  formFunction,
  initialValues,
}: Props) => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();

  const [createCourse, { isLoading }] = formFunction();

  const onFinish = async (values: any) => {
    try {
      if (createForm) {
        await createCourse(values).unwrap();
        message.success("Record was created");
        form.resetFields();
      }
      if (!createForm) {
        await createCourse({ id, body: values }).unwrap();
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
        name={createForm ? "Create Course" : "Update Course"}
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={createForm ? {} : initialValues}
        layout="vertical"
        autoComplete="off"
      >
        <Form.Item
          label="Course"
          name="course"
          hasFeedback
          rules={[{ required: true, min: 3, max: 255, whitespace: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Semester"
          name="semester"
          hasFeedback
          rules={[{ required: true }]}
        >
          <Select
            showSearch
            optionFilterProp="label"
            options={option.semester}
          />
        </Form.Item>
      </Form>

      <FormButton
        submitName={createForm ? "Save" : "Update"}
        form={form}
        isLoading={isLoading}
      />
    </>
  );
};
