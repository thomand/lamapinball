import React from "react";
import { Card, Spin, Icon } from "antd";
import Machine from "./Machine";
import NewestScores from "./newestScores";
import goldeneye from "../assets/goldeneye.png";
import hook from "../assets/hook.png";

const tabListNoTitle = [
  {
    key: "goldenEye",
    tab: "Golden Eye"
  },
  {
    key: "hook",
    tab: "Hook"
  },
  {
    key: "nyeste",
    tab: "Nyeste"
  }
];

class MachinesCard extends React.Component {
  state = {
    key: "goldenEye",
    noTitleKey: "goldenEye",
    spinning: true
  };

  contentListNoTitle = {
    goldenEye: (
      <Machine
        key={"goldeneye"}
        name={"goldeneye"}
        dataLoaded={this.dataLoaded.bind(this)}
        image={goldeneye}
      />
    ),
    hook: (
      <Machine
        key={"hook"}
        name={"hook"}
        dataLoaded={this.dataLoaded.bind(this)}
        image={hook}
      />
    ),
    nyeste: <NewestScores />
  };

  onTabChange = (key, type) => {
    this.setState({ [type]: key, spinning: true });
  };

  dataLoaded() {
    this.setState({ spinning: false });
  }

  render() {
    return (
      <div>
        <Card
          style={{ width: "100%" }}
          tabList={tabListNoTitle}
          activeTabKey={this.state.noTitleKey}
          onTabChange={key => {
            this.onTabChange(key, "noTitleKey");
          }}
        >
          {this.contentListNoTitle[this.state.noTitleKey]}
        </Card>

        <Spin
          spinning={this.state.spinning}
          indicator={<Icon type="loading" style={{ fontSize: 36 }} spin />}
        />
      </div>
    );
  }
}

export default MachinesCard;
