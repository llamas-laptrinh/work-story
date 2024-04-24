/* eslint-disable @typescript-eslint/no-explicit-any */
// import FormValidationMessages from '@/components/Form/ValidationMessages'
import { useForm } from "react-hook-form";
import { Input } from "antd";

interface GovernanceStructureState {
  quorumPercentage?: string;
  majorityPercentage?: string;
}

interface Props {
  onNextStep: () => void;
}

export default function GovernanceStructure({ onNextStep }: Props) {
  const { handleSubmit } = useForm<GovernanceStructureState>();

  const onSubmit = (data: any) => {
    console.log(data);
    onNextStep();
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="quorum_percentage">
        What is the initial quorum percentage for proposals?
      </label>
      <Input
        id="quorum_percentage"
        // label="What is the initial quorum percentage for proposals?"
        placeholder="5%"
        // error={!!errors.quorumPercentage}
        // register={register("quorumPercentage", formRules.quorumPercentage)}
      />
      <label htmlFor="majority_percentage">
        What majority percentage is needed to pass proposals?
      </label>
      <Input
        id="majority_percentage"
        // label="What majority percentage is needed to pass proposals?"
        placeholder="51%"
        // error={!!errors.majorityPercentage}
        // register={register("majorityPercentage", formRules.majorityPercentage)}
      />
      {/* <FormValidationMessages errors={errors} /> */}
      <div className="flex w-full justify-center">
        <Input className="bg-primary font-primary" value="Invite them to join" type="submit" />
      </div>
    </form>
  );
}
