import { Select, Form, Button, Radio } from "antd";
import { option } from "../../constants/optionType";
import { errorHandling } from "../../utils/errorHandling";
import {
  useLazyGetAllCoursesQuery,
  useLazyGetAllReferencesQuery,
} from "../../state/api";
import { IFilterReference } from "../../pages/references/Reference";

type Props = {
  optionCourse: Record<string, any>[];
  onFilterCourse: ReturnType<typeof useLazyGetAllCoursesQuery>[0];
  onFilterReference: ReturnType<typeof useLazyGetAllReferencesQuery>[0];
  filter: IFilterReference;
  setFilter: React.Dispatch<React.SetStateAction<IFilterReference>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const FilterReference = ({
  optionCourse,
  onFilterCourse,
  onFilterReference,
  filter,
  setFilter,
  setOpen,
}: Props) => {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    try {
      setFilter({
        ...filter,
        ...values,
      });
      console.log(values);
      await onFilterReference(values);
    } catch (error) {
      errorHandling(error);
    }
  };
  const onFinishFailed = (error: any) => {
    console.log("Received values of form: ", error);
  };
  const onChangeSemester = async (values: Number) => {
    console.log("onchange semester " + values);
    await onFilterCourse({ semester: values });
  };

  const buttonClear = async () => {
    await onFilterReference({});
    form.resetFields();
    form.submit();
    setOpen(false);
  };
  const buttonApply = () => {
    form.submit();
    setOpen(false);
  };

  return (
    <>
      <Form
        name="filter"
        layout="vertical"
        autoComplete="off"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        form={form}
        initialValues={{ semester: undefined }}
      >
        <Form.Item label="Semester" name="semester">
          <Select options={option.semester} onChange={onChangeSemester} />
        </Form.Item>
        <Form.Item label="Course" name="courseId">
          <Select options={optionCourse} />
        </Form.Item>
        <Form.Item label="Sort by name" name="sort">
          <Radio.Group block options={option.sort} />
        </Form.Item>
      </Form>

      <div style={{ display: "flex", justifyContent: "end", gap: 16 }}>
        <Button onClick={buttonClear}>Clear</Button>
        <Button type="primary" onClick={buttonApply}>
          Apply
        </Button>
      </div>
    </>
  );
};
