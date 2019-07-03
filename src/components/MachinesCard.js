import React from "react";
import { Card } from "antd";
import Machine from "./Machine";
import NewestScores from "./newestScores";

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

const contentListNoTitle = {
  goldenEye: <Machine name={"goldeneye"} />,
  hook: <Machine name={"hook"} />,
  nyeste: <NewestScores />
};

class MachinesCard extends React.Component {
  state = {
    key: "goldenEye",
    noTitleKey: "goldenEye"
  };

  onTabChange = (key, type) => {
    this.setState({ [type]: key });
  };

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
          {contentListNoTitle[this.state.noTitleKey]}
        </Card>
      </div>
    );
  }
}

export default MachinesCard;
