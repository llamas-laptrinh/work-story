import { Spin } from "antd";

export default function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black opacity-50">
      <Spin className="z-10" size="large" />
    </div>
  );
}
