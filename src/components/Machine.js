import React from "react";
import { Row, List, Avatar, Skeleton } from "antd";
import { getscores } from "../firebase/firebase";
import { parseScore, sortArrayByScores } from "../helpers/scoreHelper";

class Machine extends React.Component {
  state = {
    scores: [],
    machineLoading: true
  };

  componentWillMount() {
    this.updateScores();
  }

  updateScores() {
    this.setState({ machineLoading: true });
    let scoresArray = [];
    getscores(this.props.name).on("value", snapshot => {
      let scores = snapshot.val();
      if (scores !== null && scores !== undefined) {
        scoresArray = Object.values(scores);
        const sortedArray = sortArrayByScores(scoresArray);
        this.setState({ scores: sortedArray });
      }
      this.props.dataLoaded();
      this.setState({ machineLoading: false });
    });
  }

  render() {
    return (
      <div>
        <Row
          style={{
            marginLeft: "-25px",
            marginRight: "-25px",
            marginTop: "-22px"
          }}
        >
          <img
            src={this.props.image}
            alt="bilde av maskin :)"
            width={"100%"}
            height={"150px"}
          />
        </Row>
        <List
          itemLayout="horizontal"
          dataSource={this.state.scores}
          renderItem={item => (
            <List.Item>
              <Skeleton avatar loading={this.state.machineLoading} active>
                <List.Item.Meta
                  key={item.key}
                  avatar={
                    <Avatar
                      shape={"square"}
                      style={{
                        backgroundColor: "#00152a",
                        color: "#ffffff",
                        verticalAlign: "middle",
                        marginTop: "10px"
                      }}
                      size="large"
                    >
                      {this.state.scores.indexOf(item) + 1}
                    </Avatar>
                  }
                  title={<p>{item.player}</p>}
                  description={parseScore(item.score)}
                />
              </Skeleton>
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default Machine;
