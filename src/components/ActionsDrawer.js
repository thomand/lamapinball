import React from "react";

import { Drawer, Icon } from "antd";
import ScoreForm from "./scoreForm";
import PlayerForm from "./playerForm";

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
        <Icon
          type="plus"
          style={{
            fontSize: "32px",
            color: "#ffffff",
            position: "absolute",
            left: "20px",
            top: 30
          }}
          onClick={this.showScoreDrawer}
        />

        <Icon
          type="user-add"
          style={{
            fontSize: "32px",
            color: "#ffffff",
            position: "absolute",
            right: "20px",
            top: 30
          }}
          onClick={this.showPlayerDrawer}
        />
        <Drawer
          title="REGISTRER NY SCORE"
          placement={"bottom"}
          closable={true}
          onClose={this.onCloseScore}
          visible={this.state.scoreVisible}
          height={"60vh"}
          destroyOnClose={true}
        >
          <ScoreForm onSubmit={this.onCloseScore} />
        </Drawer>
        <Drawer
          title="REGISTRER NY SPILLER"
          placement={"bottom"}
          closable={true}
          onClose={this.onClosePlayer}
          visible={this.state.playerVisable}
          destroyOnClose={true}
        >
          <PlayerForm onSubmit={this.onClosePlayer} />
        </Drawer>
      </div>
    );
  }
}

export default ActionsDrawer;
