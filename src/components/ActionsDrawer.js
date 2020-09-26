import React from "react";

import { Drawer, Icon, Button } from "antd";
import ScoreForm from "./scoreForm";
import PlayerForm from "./playerForm";
import BeerForm from './beerForm';

class ActionsDrawer extends React.Component {
  state = { scoreVisible: false, playerVisable: false, beerVisible: false };

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
  showBeerDrawer = () => {
    this.setState({
      beerVisable: true
    });
  };

  onCloseBeer = () => {
    this.setState({
      beerVisable: false
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
      <div style={{height: '40px', position: 'absolute', margin: '0 auto', left: '25%',
              top: '90px', }}>
          <Button style={{
              fontSize: "20px",
              backgroundColor: '#001529',
              color: '#fff',
            }} onClick={this.showBeerDrawer}>
          Registrer pils 🍺 
          </Button>
        </div>
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
        <Drawer
          title="REGISTRER NY PILS"
          placement={"bottom"}
          closable={true}
          onClose={this.onCloseBeer}
          visible={this.state.beerVisable}
          destroyOnClose={true}
        >
          <BeerForm onSubmit={this.onCloseBeer} />
        </Drawer>
      </div>
    );
  }
}

export default ActionsDrawer;
