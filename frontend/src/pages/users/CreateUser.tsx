import { TitlePage } from "../../components";
import { useCreateUserMutation } from "../../state/api";
import { UserForm } from "../../components/Form/UserForm";

export const CreateUser = () => {
  return (
    <>
      <TitlePage title="Create User" description="Form create user" />
      <UserForm createForm={true} formFunction={useCreateUserMutation} />
    </>
  );
};
