import { useContext, useState } from "react";
import { Popover, Steps } from "antd";
import type { StepsProps } from "antd";
import NameAndPurpose from "./create-project/name-and-purpose";
import GovernanceStructure from "./create-project/governance-structure";
import ProjectTreasury from "./create-project/project_treasury";
import AddMembers from "./create-project/add-members";
import ConfirmInformation from "./create-project/confirm-information";
import { ArrowsAltOutlined, LeftOutlined } from "@ant-design/icons";
import useDao from "../../hooks/ETH/useDao";
import { AppContext } from "../../context/AppContext";

const customDot: StepsProps["progressDot"] = (dot, { status, index }) => (
  <Popover
    content={
      <span>
        step {index} status: {status}
      </span>
    }
  >
    {dot}
  </Popover>
);

export default function CreateDAO() {
  const { createDAO } = useDao();
  const { setLoading } = useContext(AppContext);
  const [DAOInfo, setDAOInfo] = useState({
    name: "",
    domain: "",
    proposal: {
      submit: "",
      confirm: "",
    },
    treasury: "",
    members: [],
  });
  const [activeStep, setActiveStep] = useState<number>(0);

  const onFinish = async () => {
    console.log("Creating", DAOInfo);
    setLoading(true);
    await createDAO(
      DAOInfo.treasury,
      DAOInfo.domain,
      DAOInfo.name,
      DAOInfo.proposal.submit,
      DAOInfo.proposal.submit
    );
    setLoading(false);
  };
  const onClick = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const steps = [
    {
      title: "Name and purpose",
      content: (
        <NameAndPurpose
          onNextStep={() => {
            onClick();
          }}
          onSetData={({ name, domain }) => {
            setDAOInfo({ ...DAOInfo, name, domain });
          }}
        />
      ),
    },
    {
      title: "Governance Structure",
      content: (
        <GovernanceStructure
          onNextStep={() => {
            onClick();
          }}
        />
      ),
    },
    {
      title: "Project Treasury",
      content: (
        <ProjectTreasury
          onNextStep={() => {
            onClick();
          }}
        />
      ),
    },
    {
      title: "Add members",
      content: (
        <AddMembers
          onNextStep={() => {
            onClick();
          }}
        />
      ),
    },
    {
      title: "Confirm Information",
      content: <ConfirmInformation onSumit={onFinish} />,
    },
  ];
  const description = "";

  return (
    <div className="flex items-center h-full flex-col desktop:flex-row">
      <div className="w-full justify-center desktop:w-[500px] desktop:h-full desktop:flex-col desktop:items-center flex-row desktop:flex hidden">
        <div className="absolute bottom-32 flex flex-col justify-center items-center gap-5">
          <label className="text-white text-4xl leading-[44px] font-bold">
            Welcom to WowDAO
          </label>
          <div
            className="p-6 w-[179px]"
            style={{
              background: "rgba(255, 255, 255, 0.20)",
              borderRadius: "9999px",
            }}
          >
            <ArrowsAltOutlined />
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-grow overflow-hidden w-full tablet:pt-[24px] tablet:px-[60px] px-4 pt-4 desktop:h-full">
        <Steps
          current={activeStep}
          progressDot={customDot}
          items={[
            {
              title: "Name and purpose",
              description,
            },
            {
              title: "Governance Structure",
              description,
            },
            {
              title: "Project Treasury",
              description,
            },
            {
              title: "Add members",
              description,
            },
            {
              title: "Confirm Information",
              description,
            },
          ]}
        />

        <div className="flex flex-col h-full w-full">
          <div className="pt-6 ">
            <button
              onClick={() => setActiveStep(activeStep - 1)}
              className={`flex items-center justify-center border border-gray-300 bg-transparent w-11 h-11 ${
                activeStep > 0 ? "" : "invisible"
              }`}
            >
              <LeftOutlined />
            </button>
          </div>
          <div className="w-full flex flex-col items-center overflow-y-auto">
            <div className="pt-8 pb-16 desktop:w-[550px] flex flex-col justify-center items-center gap-6">
              <label className="text-3xl p-5 font-bold leading-[38px] font-primary">
                {steps[activeStep].title}
              </label>
              <div className="w-full text-base leading-6 font-normal text-[#626576] flex flex-col gap-6">
                {steps[activeStep].content}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
