import { TitlePage } from "../../components";
import { ReferenceForm } from "../../components/Form/ReferenceForm";
import { useCreateReferenceMutation } from "../../state/api";

export const CreateReference = () => {
  return (
    <>
      <TitlePage title="Create Reference" description="Form create reference" />
      <ReferenceForm
        createForm={true}
        formFunction={useCreateReferenceMutation}
      />
    </>
  );
};
