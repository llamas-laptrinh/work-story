/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BellOutlined,
  SearchOutlined,
  SmileOutlined,
  PayCircleOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import useDao from "../../hooks/ETH/useDao";
import React from "react";
import { Empty } from "antd";

const DAO = ({ item }: any) => {
  return (
    <Link to={`/dao/${item.id}`}>
      <div className="flex flex-col gap-6 p-6 border border-gray-300 justify-center rounded-xl">
        <div className="flex justify-between">
          <label className="text-lg font-medium">{item.name} </label>
          <img
            className="w-12 h-12"
            src={item.logo || "/logo.png"}
            alt="DAO logo"
          />
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-5">
            <div className="flex gap-[6px] items-center">
              <PayCircleOutlined width={20} height={20} />
              <span className="text-[#626576] text-lg font-medium">
                {Number(item.treasury)}
              </span>
            </div>
            <div className="flex gap-[6px] items-center">
              <SmileOutlined width={20} height={20} />
              <span className="text-[#626576] text-lg font-medium">
                {Number(item.totalMembers)}
              </span>
            </div>
          </div>
          <div>
            <BellOutlined />
          </div>
        </div>
      </div>
    </Link>
  );
};

const itemYourProject = [
  {
    name: "Haile1991",
    logo: "/logo.png",
    coinNumber: "20",
    peopleNumber: "20",
  },
];

export default function Home() {
  const [yourDaos, setYourDaos] = React.useState<typeof itemYourProject>([]);
  const [popularDaos, setPopularDaos] = React.useState<typeof itemYourProject>(
    []
  );
  const { getDaos, getPopularDao } = useDao();

  React.useEffect(() => {
    getDaos().then((daos) => {
      setYourDaos(daos);
    });
    getPopularDao().then((popularDaos) => {
      setPopularDaos(popularDaos);
    });
  }, []);

  return (
    <div className="flex flex-col gap-[60px] pt-10 md:px-[60px] px-4 pb-20">
      {/* Search and Create project */}
      <div className="flex gap-6 md:flex-row flex-col">
        <div className="flex-1">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <SearchOutlined width={24} height={24} />
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#F187FB] focus:border-[#F187FB] "
              placeholder="Search DAO"
              required
            />
          </div>
        </div>
        <Link
          to="/create-dao"
          className="font-bold bg-transparent text-base p-4 border border-[#E1E2E5] rounded-lg"
        >
          Create a DAO
        </Link>
      </div>
      {/* Your Project */}
      <div className="flex flex-col gap-8">
        <label className="font-semibold text-2xl">Your Project</label>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-5">
          {yourDaos.length > 0 ? (
            yourDaos.map((item, index) => <DAO item={item} key={index} />)
          ) : (
            <Empty />
          )}
        </div>
      </div>
      {/* Most popular projects */}
      <div className="flex flex-col gap-8">
        <label className="font-semibold text-2xl">Most popular projects</label>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-5">
          {popularDaos.length > 0 ? (
            popularDaos.map((item, index) => <DAO item={item} key={index} />)
          ) : (
            <Empty />
          )}
        </div>
      </div>
    </div>
  );
}
