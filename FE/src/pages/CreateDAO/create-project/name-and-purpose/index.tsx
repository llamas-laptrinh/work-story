/* eslint-disable @typescript-eslint/no-explicit-any */
import { Select, Input } from "antd";
import React from "react";

interface Props {
  onNextStep: () => void;
  onSetData: ({ name, domain }: { name: string; domain: string }) => void;
}

export default function NameAndPurpose({ onNextStep, onSetData }: Props) {
  const [formValues, setFormValues] = React.useState({ name: "", domain: "" });
  const onSubmit = (e: any) => {
    e.preventDefault();
    onSetData(formValues);
    onNextStep();
  };

  const options = [
    { value: "healthcare", label: "Healthcare" },
    { value: "transportation-logistics", label: "Transportation & Logistics" },
    { value: "ecommerce", label: "Ecommerce" },
    { value: "finance", label: "Finance" },
    { value: "retail", label: "Retail" },
    { value: "manufacturing", label: "Manufacturing" },
    { value: "energy", label: "Energy" },
  ];

  return (
    <form className="flex flex-col gap-6" onSubmit={onSubmit}>
      <Input
        id="dao_name"
        onChange={(e) => {
          const value = e.target.value;
          setFormValues({ ...formValues, name: value });
        }}
        placeholder="DAO name"
        required
      />
      <Select
        onChange={(value) => setFormValues({ ...formValues, domain: value })}
        id="domain"
        placeholder="Domain (options to choose more than one)"
        options={options}
      />
      <div className="flex w-full justify-center">
        <Input
          className="bg-primary font-primary"
          value="Next step"
          type="submit"
        />
      </div>
    </form>
  );
}
