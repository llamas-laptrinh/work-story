/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "antd";
import { useForm } from "react-hook-form";
import CustomInput from "../../../../components/Input";

interface AddMembersState {
  name?: string;
  link?: string;
  role?: string;
}
interface Props {
  onNextStep: () => void;
}
export default function AddMembers({ onNextStep }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddMembersState>();

  const onSubmit = (data: any) => {
    console.log(data);
    onNextStep();
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <CustomInput
        id="name"
        label="Their Name"
        placeholder="Name"
        error={!!errors.name}
        register={register("name")}
      />
      <CustomInput
        id="link"
        label="Their WowDAO account or generate a join link for them"
        placeholder="Link"
        error={!!errors.link}
        register={register("link")}
      />
      <CustomInput
        id="role"
        label="Their Role"
        placeholder="Ex: Project Manager, Expert Panel..."
        error={!!errors.role}
        register={register("role")}
      />
      <div className="flex w-full justify-center gap-4">
        <Input value="Add" type="submit" />
      </div>
    </form>
  );
}
