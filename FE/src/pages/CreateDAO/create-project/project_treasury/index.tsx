/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "antd";
import { useForm } from "react-hook-form";
import CustomInput from "../../../../components/Input";

interface ProjectTreasuryState {
  quorumPercentage?: string;
  majorityPercentage?: string;
}

interface Props {
  onNextStep: () => void;
}

export default function ProjectTreasury({ onNextStep }: Props) {
  const formRules = {
    quorumPercentage: {
      required: "Please input Quorum Percentage",
    },
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectTreasuryState>();

  const onSubmit = (data: any) => {
    console.log(data);
    onNextStep();
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <CustomInput
        id="quorum_percentage"
        label="Add multi signature wallet which will hold your project’s funds and revenues"
        placeholder="5%"
        error={!!errors.quorumPercentage}
        register={register("quorumPercentage", formRules.quorumPercentage)}
      />
      <div className="flex w-full justify-center">
        <Input value="Next step" type="submit" />
      </div>
    </form>
  );
}
