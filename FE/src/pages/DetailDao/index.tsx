/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { CaretLeftFilled, PercentageOutlined } from "@ant-design/icons";
import useDao from "../../hooks/ETH/useDao";
import { useParams } from "react-router-dom";
import React from "react";

const containerClass = "bg-white rounded-lg p-6";
const h3Class = "text-lg font-semibold mb-2";

export default function DetailDao() {
  const { id } = useParams();
  const { getDao, joinDao } = useDao();
  const [curentDao, setCurrentDao] = React.useState<any>({
    limitCreate: "",
    limitConfirm: "",
    treasury: "",
    domain: "",
    name: "",
    totalMembers: 0,
    totalProposal: 0,
    createdAt: new Date(),
  });
  React.useEffect(() => {
    if (id) {
      getDao(id).then((dao) => {
        setCurrentDao(dao);
      });
    }
  }, [id]);
  return (
    <div className="flex flex-col gap-4 p-8 w-full h-full overflow-scroll hidden-scroll">
      <div className="flex gap-4 items-center">
        <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full">
          <CaretLeftFilled
            onClick={() => window.history.back()}
            className="h-6 w-6 cursor-pointer"
          />
        </div>
        <h1 className="text-2xl font-semibold">{curentDao.name}</h1>
      </div>
      <section className={containerClass}>
        <h3 className={h3Class}>Overview</h3>
        <p>
          <span className="text-gray-400">Domain</span>
          <span className="ml-2">{curentDao.domain}</span>
        </p>
        <p>
          <span className="text-gray-400">Create At</span>
          <span className="ml-2">
            {" "}
            {new Date(Number(curentDao.createdAt)).toDateString()}
          </span>
        </p>
      </section>
      {/* <section className={containerClass}>
        <h3 className={h3Class}>Expert Panel</h3>
      </section> */}
      <section className={containerClass}>
        <h3 className={h3Class}>Governance Structure</h3>
        <p className="flex gap-4 items-center text-gray-500">
          Initial Quorum Percentage for Proposals
          <span className="flex items-center font-semibold">
            {curentDao.limitCreate}
            <PercentageOutlined />
          </span>
        </p>
        <p className="flex gap-4 items-center text-gray-500">
          Majority Percentage Required to Pass Proposals
          <span className="flex items-center font-semibold">
            {curentDao.limitConfirm}
            <PercentageOutlined />
          </span>
        </p>
      </section>
      <section className={containerClass}>
        <h3 className={h3Class}>Project Treasury</h3>
        <p className="flex gap-4 items-center text-gray-500">
          Initial Quorum Percentage for Proposals
          <span className="flex items-center font-semibold">
            {Number(curentDao.treasury)}
            <PercentageOutlined />
          </span>
        </p>
        <p className="flex gap-4 items-center text-gray-500">
          Majority Percentage Required to Pass Proposals
          <span className="flex items-center font-semibold">
            {curentDao.limitConfirm}
            <PercentageOutlined />
          </span>
        </p>
      </section>
      <section className={containerClass}>
        <h3 className={h3Class}>Members</h3>
        <p className="flex gap-4 items-center text-gray-500">
          Total members:
          <span className="flex items-center font-semibold">
            {parseInt(curentDao.totalMembers)}
          </span>
        </p>
        <p className="flex gap-4 items-center text-gray-500">
          Total proposals:
          <span className="flex items-center font-semibold">
            {parseInt(curentDao.totalProposal)}
          </span>
        </p>
      </section>
      <section className={containerClass}>
        <h3 className={h3Class}>Join DAO</h3>
        <button
          onClick={() => joinDao(id || "")}
          className="bg-primary font-primary"
        >
          Join
        </button>
      </section>
    </div>
  );
}
