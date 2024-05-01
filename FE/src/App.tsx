/* eslint-disable @typescript-eslint/no-explicit-any */
import { Layout, Menu, MenuProps } from "antd";
import Router from "./router";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { Link, useNavigate } from "react-router-dom";
import useDao from "./hooks/ETH/useDao";
import React from "react";
import { shorterAddrress } from "./utils/formatter";

export default function App() {
  const navigate = useNavigate();
  const { getUser } = useDao();
  const [user, setUser] = React.useState<any>();
  const items1: MenuProps["items"] = [
    { key: "Home", href: "/" },
    { key: "Leader board", href: "/leader-board" },
    { key: "Story", href: "/storys" },
  ].map(({ key, href }) => ({
    key: href,
    label: key,
  }));
  React.useEffect(() => {
    getUser().then((user) => {
      if (user.userName !== "") setUser(user);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Layout>
      <Header className="flex items-center bg-white">
        <h1 className="font-primary flex-1">Work story</h1>
        <Menu
          onClick={({ key }) => {
            navigate({ pathname: key });
          }}
          className="font-primary"
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          items={items1}
          style={{ flex: 1, minWidth: 0 }}
        />
        <div>
          {!user ? (
            <Link
              className="bg-primary font-primary rounded-lg py-4 px-6"
              to="/sign-up"
            >
              Sign up
            </Link>
          ) : (
            <div>
              <p>{shorterAddrress(user.userWalletAddress)} </p>
            </div>
          )}
        </div>
      </Header>

      <Content>
        <Router />
      </Content>
      <Footer className="text-center border-t bg-white">
        Workstory ©{new Date().getFullYear()} Created by DTD Dev
      </Footer>
    </Layout>
  );
}
