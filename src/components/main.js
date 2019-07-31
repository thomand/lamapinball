import React from "react";
import { Layout } from "antd";
import MachinesCardContainer from "./MachinesCardContainer";
import ActionsDrawer from "./ActionsDrawer";

const { Header, Content } = Layout;

class Main extends React.Component {
  render() {
    return (
      <Layout>
        <Header
          style={{
            position: "fixed",
            zIndex: 100,
            width: "100%",
            height: "100px"
          }}
        >
          <ActionsDrawer />
          <div className="logo" />
        </Header>
        <Content
          style={{
            padding: "0 5px",
            marginTop: 64,
            overflow: "hidden"
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: 0,
              paddingTop: "10px",
              minHeight: "500px",
              marginTop: 30
            }}
          >
            <MachinesCardContainer />
          </div>
        </Content>
      </Layout>
    );
  }
}

export default Main;
