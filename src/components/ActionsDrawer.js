import React from "react";

import { Drawer, Icon, Affix } from "antd";
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
    this.props.refresh();
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
    this.props.refresh();
  };

  render() {
    return (
      <div>
        <Affix offsetBottom={30} style={{ position: "absolute", left: "20px" }}>
          <Icon
            type="plus"
            style={{ fontSize: "30px", color: "#008DFF" }}
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
          <ScoreForm onSubmit={this.onCloseScore} />
        </Drawer>
        <Drawer
          title="Ny spiller"
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
