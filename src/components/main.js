import React from "react";
import { Layout } from "antd";
import MachinesCard from "./MachinesCard";
import { init as firebaseInit } from "../firebase/firebase";
import ActionsDrawer from "./ActionsDrawer";

const { Header, Content, Footer } = Layout;

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
            <MachinesCard />
          </div>
        </Content>
        {/* <Footer
          style={{
            textAlign: "center",
            bottom: 0,
            height: "64px",
            position: "sticky",
            backgroundColor: "#00152a",
            width: "100%",
            color: "#ffffff"
          }}
        >
          <ActionsDrawer />
        </Footer> */}
      </Layout>
    );
  }
}

export default Main;
