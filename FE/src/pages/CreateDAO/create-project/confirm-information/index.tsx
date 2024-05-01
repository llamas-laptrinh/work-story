/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "antd";

// interface ConfirmInformationState {
//   projectName?: string;
//   domain?: string;
//   individualName?: string;
//   link?: string;
//   role?: string;
//   quorumPercentage?: string;
//   majorityPercentage?: string;
//   percent?: string;
//   quorumPercentage1?: string;
//   name?: string;
//   link1?: string;
//   role1?: string;
//   quorumPercentage2?: string;
// }

export default function ConfirmInformation({ onSumit }: any) {
  return (
    <form className="flex flex-col gap-6">
      <div className="flex w-full justify-center">
        
        <Input onClick={onSumit} value="Confirm" type="button" />
      </div>
    </form>
  );
}
