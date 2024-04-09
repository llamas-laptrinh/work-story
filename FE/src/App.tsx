import { Layout, Menu, MenuProps } from "antd";
import Router from "./router";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { useNavigate } from "react-router-dom";

export default function App() {
  const navigate = useNavigate();
  const items1: MenuProps["items"] = [
    { key: "Home", href: "/" },
    { key: "Leader board", href: "/leader-board" },
    { key: "Story", href: "/storys" },
  ].map(({ key, href }) => ({
    key: href,
    label: key,
  }));
  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          background: "white",
        }}
      >
        <Menu
          onClick={({ key }) => {
            navigate({ pathname: key });
          }}
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          items={items1}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>

      <Content style={{ height: "100vh" }}>
        <Router />
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
}
