import React from "react";
import { Layout } from "antd";
import MachinesCard from "./MachinesCard";
import { init as firebaseInit } from "../firebase/firebase";

const { Header, Content } = Layout;

class Main extends React.Component {
  constructor(props) {
    super(props);
    firebaseInit();
  }
  render() {
    return (
      <Layout>
        <Header
          style={{
            position: "fixed",
            zIndex: 1,
            width: "100%",
            height: "100px"
          }}
        >
          <div className="logo" />
        </Header>
        <Content style={{ padding: "0 5px", marginTop: 64 }}>
          <div
            style={{
              background: "#fff",
              padding: 0,
              paddingTop: "10px",
              minHeight: "500px",
              marginTop: 30
            }}
          >
            <MachinesCard />
          </div>
        </Content>
      </Layout>
    );
  }
}

export default Main;
