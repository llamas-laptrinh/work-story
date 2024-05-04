/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { CaretLeftFilled, PercentageOutlined } from "@ant-design/icons";
import useDao from "../../hooks/ETH/useDao";
import { Link, useParams } from "react-router-dom";
import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Button, Form, Mentions, Modal, Space } from "antd";

const containerClass = "bg-white rounded-lg p-6";
const h3Class = "text-lg font-semibold mb-2";

export default function DetailDao() {
  const { id } = useParams();
  const { getDao, joinDao } = useDao();
  const { setLoading } = useContext(AppContext);
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const onFinish = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      console.log("Submit:", values);
      // const res = await createUser(values.coders, values.bio, values.avatarUrl);
      // console.log(res);
      setLoading(false);
    } catch (errInfo) {
      console.log("Error:", errInfo);
      setLoading(false);
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
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
  const [isJoined, setJoin] = React.useState(false);
  React.useEffect(() => {
    if (id) {
      setLoading(true);
      getDao(id).then(({ data, isJoin }) => {
        setCurrentDao(data);
        setJoin(isJoin);
        setLoading(false);
      });
    }
  }, [id]);
  return (
    <>
      <Modal
        title="Create your work"
        open={isModalOpen}
        footer={null}
        okButtonProps={{ className: "bg-primary font-primary" }}
        onCancel={handleCancel}
      >
        <Form form={form} layout="horizontal" onFinish={onFinish}>
          <Form.Item
            name="name"
            label="Title"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
          >
            <Mentions rows={1} options={[]} />
          </Form.Item>
          <Form.Item
            name="bannerUrl"
            label="Banner"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
          >
            <Mentions
              rows={1}
              placeholder="You can use @ to ref default banner here"
              options={[
                {
                  value:
                    "https://image.lexica.art/full_webp/28f85e1c-11cf-411e-b3ed-c82bb1aa224d",
                  label: "Content writer",
                },
                {
                  value:
                    "https://image.lexica.art/full_webp/ddbc4494-8f93-4a8c-b378-d6d58024a75b",
                  label: "Design",
                },
                {
                  value:
                    "https://image.lexica.art/full_webp/ddbc4494-8f93-4a8c-b378-d6d58024a75b",
                  label: "Project",
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="workUrl"
            label="Link to your work"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
          >
            <Mentions
              rows={1}
              placeholder="Enter proof of work link"
              options={[]}
            />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
          >
            <Mentions
              rows={3}
              placeholder="You can use @ to ref user here"
              options={[
                {
                  value: "afc163",
                  label: "afc163",
                },
                {
                  value: "zombieJ",
                  label: "zombieJ",
                },
                {
                  value: "yesmeck",
                  label: "yesmeck",
                },
              ]}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 14, offset: 6 }}>
            <Space wrap>
              <Button
                className="bg-primary font-primary"
                htmlType="submit"
                type="primary"
              >
                Submit
              </Button>
              <Button
                className="font-primary"
                htmlType="button"
                onClick={onReset}
              >
                Reset
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
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
        {!isJoined ? (
          <section className={containerClass}>
            <h3 className={h3Class}>Join DAO</h3>
            <button
              onClick={async () => {
                setLoading(true);
                await joinDao(id || "");
                setLoading(false);
              }}
              className="bg-primary font-primary"
            >
              Join
            </button>
          </section>
        ) : (
          <section className={containerClass}>
            <h3 className={h3Class}>Works</h3>

            <button onClick={showModal} className="bg-primary font-primary">
              Create a Work
            </button>

            <Link to={`/works`} className="ml-4">
              <button className="bg-white border border-gray-500 font-primary">
                Your Work
              </button>
            </Link>
          </section>
        )}
      </div>
    </>
  );
}
