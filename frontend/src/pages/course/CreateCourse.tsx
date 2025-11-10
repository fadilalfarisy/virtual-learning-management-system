import { TitlePage } from "../../components";
import { CourseForm } from "../../components/Form/CourseForm";
import { useCreateCourseMutation } from "../../state/api";

export const CreateCourse = () => {
  return (
    <>
      <TitlePage title="Create Course" description="Form create course" />
      <CourseForm
        createForm={true}
        formFunction={useCreateCourseMutation}
        initialValues={{}}
      />
    </>
  );
};
