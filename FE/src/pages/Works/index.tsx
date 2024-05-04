/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactTinyLink } from "react-tiny-link";
import useDao from "../../hooks/ETH/useDao";
import React from "react";
import { Image } from "antd";
import { Link } from "react-router-dom";

const Status = ({ status }: any) => {
  const data: any = {
    0: { class: "text-yellow-500", text: "Pending to Approve" },
    1: { class: "text-green-500", text: "Success" },
    2: { class: "text-red-500", text: "Fail" },
  };
  return <span className={data[status].class}>{data[status].text}</span>;
};

export default function Works() {
  const { getWorks } = useDao();
  const [works, setWorks] = React.useState<any[]>([]);
  React.useEffect(() => {
    getWorks("2").then((res) => {
      setWorks(res);
    });
  }, []);
  return (
    <div className="h-full w-full p-4">
      <div className="flex flex-wrap gap-4">
        {works.map((work, index) => {
          return (
            <Link to={`/work/${index}`}>
              <div
                className="flex w-[400px] flex-col gap-4 p-4 shadow-md rounded-md bg-white"
                key={index}
              >
                <Image
                  fallback="https://image.lexica.art/full_webp/ddbc4494-8f93-4a8c-b378-d6d58024a75b"
                  className="w-full object-cover"
                  // width={500}
                  height={200}
                  src={work.imageUrl}
                />
                <h2 className="text-xl font-semibold">{work.name}</h2>
                <p>
                  Status: <Status status={Number(work.status)} />
                </p>
                <h2 className="text-lg">Proof of work</h2>
                <ReactTinyLink
                  cardSize="small"
                  showGraphic={true}
                  maxLine={2}
                  minLine={2}
                  url={work.workUrl}
                />
                <p className="text-gray-400">
                  Created By <span>{work.createdBy}</span>
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
