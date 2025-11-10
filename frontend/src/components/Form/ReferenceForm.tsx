import { Form, Select, message, Input, Button } from "antd";
import { errorHandling } from "../../utils/errorHandling";
import { FormButton } from "../Button/FormButton";
import { useNavigate, useParams } from "react-router-dom";
import {
  useCreateReferenceMutation,
  useUpdateReferenceMutation,
  useGetAllCoursesQuery,
  useGenerateSummaryMutation,
} from "../../state/api";

const youtubeRegex =
  /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:[&?=\w-]*)?$/;

interface IReferences {
  _id: string;
  title: string;
  channel: string;
  link: string;
  courseId: {
    _id: string;
    course: string;
    semester: number;
  };
  summary: string;
}

type Props = {
  createForm: boolean;
  formFunction:
    | typeof useCreateReferenceMutation
    | typeof useUpdateReferenceMutation;
  initialValues?: IReferences;
};

export const ReferenceForm = ({
  createForm,
  formFunction,
  initialValues,
}: Props) => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();

  const [generateSummary, { isLoading: onGenerate }] =
    useGenerateSummaryMutation();
  const [createReference, { isLoading }] = formFunction();

  const { data: listCourse } = useGetAllCoursesQuery({});
  const optionCourse = listCourse?.response.map((item: any) => {
    return { label: item.course, value: item._id };
  }) ?? [{}];

  const onFinish = async (values: any) => {
    try {
      if (createForm) {
        await createReference(values).unwrap();
        message.success("Record was created");
        form.resetFields();
      }
      if (!createForm) {
        await createReference({ id, body: values }).unwrap();
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

  const onGenerateSummary = async () => {
    try {
      const link = form.getFieldValue("link");
      const response = await generateSummary({ link }).unwrap();
      console.log(response);
      form.setFieldValue("summary", response.summary);
    } catch (error) {
      message.error("Failed to summarize youtube video");
    }
  };

  const initialValueReference = {
    ...initialValues,
    courseId:
      typeof initialValues?.courseId === "object"
        ? initialValues.courseId._id
        : initialValues?.courseId,
  };

  return (
    <>
      <Form
        name={createForm ? "Create Reference" : "Update Reference"}
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={createForm ? {} : initialValueReference}
        layout="vertical"
        autoComplete="off"
      >
        <Form.Item
          label="Title"
          name="title"
          hasFeedback
          rules={[{ required: true, max: 255, whitespace: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Channel"
          name="channel"
          hasFeedback
          rules={[{ required: true, max: 255, whitespace: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Link"
          name="link"
          hasFeedback
          rules={[
            {
              required: true,
              pattern: youtubeRegex,
              message: "Please enter a valid YouTube video URL",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Course"
          name="courseId"
          hasFeedback
          rules={[{ required: true }]}
        >
          <Select showSearch optionFilterProp="label" options={optionCourse} />
        </Form.Item>
        <Form.Item label="Summary" name="summary">
          <Input.TextArea rows={12} />
        </Form.Item>
        <Button
          loading={onGenerate}
          color="primary"
          variant="filled"
          onClick={onGenerateSummary}
        >
          Generate Summary
        </Button>
      </Form>

      <FormButton
        submitName={createForm ? "Save" : "Update"}
        form={form}
        isLoading={isLoading || onGenerate}
      />
    </>
  );
};
