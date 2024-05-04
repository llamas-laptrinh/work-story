/* eslint-disable react-hooks/exhaustive-deps */
import { CaretLeftFilled } from "@ant-design/icons";
import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import useDao from "../../hooks/ETH/useDao";
import { AppContext } from "../../context/AppContext";

const containerClass = "bg-white rounded-lg p-6";
const h3Class = "text-lg font-semibold mb-2";

export default function DetailWork() {
  const { id } = useParams();
  const { getWork ,} = useDao();
  const { setLoading } = useContext(AppContext);
  const [work, setWork] = React.useState({
    name: "",
    createdAt: "",
    status: 0,
    createdBy: "",
    workUrl: "",
    description: "",
    daoId: "",
  });
  React.useEffect(() => {
    if (id) {
      setLoading(true);
      getWork(id).then((res) => {
        setWork(res);
        setLoading(false);
      });
    }
  }, [id]);
  return (
    <div className="flex flex-col gap-8 px-4 py-6 lg:p-12 w-full h-screen lg:h-full overflow-scroll hidden-scroll">
      <div className="flex gap-4 items-center">
        <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full">
          <CaretLeftFilled
            onClick={() => window.history.back()}
            className="h-6 w-6 cursor-pointer"
          />
        </div>
        <h1 className="text-2xl font-semibold">{work.name}</h1>
      </div>
      <section className={containerClass}>
        <h3 className={h3Class}>Overview</h3>
        <div className="flex flex-col gap-6">
          <p className="flex flex-col md:flex-row gap-4">
            <span className="text-gray-400 w-[87px]">Dao ID</span>
            <span>{Number(work.daoId)}</span>
          </p>
          <p className="flex flex-col md:flex-row gap-4">
            <span className="text-gray-400 w-[87px]">Status</span>
            <span>{Number(work.status)}</span>
          </p>
          <p className="flex flex-col md:flex-row gap-4">
            <span className="text-gray-400 w-[87px]">Description</span>
            <span>{work.description}</span>
          </p>
          <p className="flex flex-col md:flex-row gap-4">
            <span className="text-gray-400 w-[87px]">Proof of work</span>
            <Link className="text-blue-500" to={work.workUrl}>
              {work.workUrl}
            </Link>
          </p>
          <p className="flex flex-col md:flex-row gap-4">
            <span className="text-gray-400 w-[87px]">Created By</span>
            <span>{work.createdBy}</span>
          </p>
        </div>
      </section>
      <section className="flex gap-6 justify-between md:justify-center">
        <button onClick={() => {}} className="bg-primary font-primary">
          Up vote
        </button>

        <button className="bg-white border border-gray-500 font-primary">
          Down vote
        </button>
      </section>
    </div>
  );
}
