import { useParams } from "react-router-dom";
import { Result } from "antd";
import { TitlePage } from "../../components";
import {
  useGetCourseByIdQuery,
  useUpdateCourseMutation,
} from "../../state/api";
import { CourseForm } from "../../components/Form/CourseForm";

export const UpdateCourse = () => {
  const { id } = useParams();

  const {
    data: initialValueCourse,
    isError: isErrorGetCourse,
    isSuccess: isSuccessGetCourse,
  } = useGetCourseByIdQuery(id);

  if (isErrorGetCourse) {
    return (
      <Result
        status="error"
        title="Something Error"
        subTitle="Oops, Your can't access this page."
      />
    );
  }
  if (isSuccessGetCourse) {
    return (
      <>
        <TitlePage title="Update Course" description="Form update course" />
        <CourseForm
          createForm={false}
          formFunction={useUpdateCourseMutation}
          initialValues={initialValueCourse}
        />
      </>
    );
  }
};
