/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Mentions, Space } from "antd";
import useDao from "../../hooks/ETH/useDao";

// const { getMentions } = Mentions;

export default function SignUp() {
  const [form] = Form.useForm();

  const { createUser } = useDao();
  const onReset = () => {
    form.resetFields();
  };

  const onFinish = async () => {
    try {
      const values = await form.validateFields();
      console.log("Submit:", values);
      const res = await createUser(values.coders, values.bio, values.avatarUrl);
      console.log(res);
    } catch (errInfo) {
      console.log("Error:", errInfo);
    }
  };

  // const checkMention = async (_: any, value: string) => {
  //   const mentions = getMentions(value);

  //   if (mentions.length < 1) {
  //     throw new Error("More than one must be selected!");
  //   }
  // };

  return (
    <div className="p-12 h-screen">
      <Form form={form} layout="horizontal" onFinish={onFinish}>
        <Form.Item
          name="coders"
          label="User Name"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          // rules={[{ validator: checkMention, required: true }]}
        >
          <Mentions
            rows={1}
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
        <Form.Item
          name="avatarUrl"
          label="Avatar URL"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          // rules={[{ required: true }]}
        >
          <Mentions
            rows={1}
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
        <Form.Item
          name="bio"
          label="Bio"
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
    </div>
  );
}
