import { Select, Form, Button, Radio } from "antd";
import { option } from "../../constants/optionType";
import { errorHandling } from "../../utils/errorHandling";
import { useLazyGetAllReferencesQuery } from "../../state/api";
import { IFilterCourse } from "../../pages/course/Course";

type Props = {
  onFilterCourse: ReturnType<typeof useLazyGetAllReferencesQuery>[0];
  filter: IFilterCourse;
  setFilter: React.Dispatch<React.SetStateAction<IFilterCourse>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const FilterCourse = ({
  onFilterCourse,
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
      await onFilterCourse(values);
    } catch (error) {
      errorHandling(error);
    }
  };
  const onFinishFailed = (error: any) => {
    console.log("Received values of form: ", error);
  };

  const buttonClear = async () => {
    await onFilterCourse({});
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
          <Select style={{ width: "100%" }} options={option.semester} />
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
