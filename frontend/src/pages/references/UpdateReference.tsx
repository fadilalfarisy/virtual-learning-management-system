import { useParams } from "react-router-dom";
import { Result } from "antd";
import { TitlePage } from "../../components";
import {
  useGetReferenceByIdQuery,
  useUpdateReferenceMutation,
} from "../../state/api";
import { ReferenceForm } from "../../components/Form/ReferenceForm";

export const UpdateReference = () => {
  const { id } = useParams();

  const {
    data: initialValueReference,
    isError,
    isSuccess,
  } = useGetReferenceByIdQuery(id);

  if (isError) {
    return (
      <Result
        status="error"
        title="Something Error"
        subTitle="Oops, Your can't access this page."
      />
    );
  }
  if (isSuccess) {
    return (
      <>
        <TitlePage title="Update Course" description="Form update course" />
        <ReferenceForm
          createForm={false}
          formFunction={useUpdateReferenceMutation}
          initialValues={initialValueReference}
        />
      </>
    );
  }
};
