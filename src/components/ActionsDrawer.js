import React from "react";

import { Drawer, Icon, Affix } from "antd";
import ScoreForm from "./scoreForm";

class ActionsDrawer extends React.Component {
  state = { scoreVisible: false, playerVisable: false };

  showScoreDrawer = () => {
    this.setState({
      scoreVisible: true
    });
  };

  onCloseScore = () => {
    this.setState({
      scoreVisible: false
    });
  };

  showPlayerDrawer = () => {
    this.setState({
      playerVisable: true
    });
  };

  onClosePlayer = () => {
    this.setState({
      playerVisable: false
    });
  };

  render() {
    return (
      <div>
        <Affix offsetBottom={30} style={{ position: "absolute", left: "20px" }}>
          <Icon
            type="thunderbolt"
            theme="twoTone"
            style={{ fontSize: "30px" }}
            onClick={this.showScoreDrawer}
          />
        </Affix>
        <Affix
          offsetBottom={30}
          style={{ position: "absolute", right: "20px" }}
        >
          <Icon
            type="user-add"
            style={{ fontSize: "30px", color: "#008DFF" }}
            onClick={this.showPlayerDrawer}
          />
        </Affix>
        <Drawer
          title="Ny score"
          placement={"bottom"}
          closable={true}
          onClose={this.onCloseScore}
          visible={this.state.scoreVisible}
          height={"60vh"}
          destroyOnClose={true}
        >
          <ScoreForm />
        </Drawer>
        <Drawer
          title="Ny spiller"
          placement={"bottom"}
          closable={true}
          onClose={this.onClosePlayer}
          visible={this.state.playerVisable}
          destroyOnClose={true}
        >
          <p>Some playercontent...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer>
      </div>
    );
  }
}

export default ActionsDrawer;
