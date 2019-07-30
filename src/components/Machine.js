import React from "react";
import { Row, List } from "antd";
import { getscores } from "../firebase/firebase";
import { parseScore, sortArrayByScores } from "./helpers/scoreHelper";

class Machine extends React.Component {
  state = {
    scores: []
  };

  componentWillMount() {
    this.updateScores();
  }

  updateScores() {
    let scoresArray = [];
    getscores(this.props.name).on("value", snapshot => {
      let scores = snapshot.val();
      scoresArray = Object.values(scores);
      const sortedArray = sortArrayByScores(scoresArray);
      this.setState({ scores: sortedArray });
      this.props.dataLoaded();
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
              <List.Item.Meta
                key={item.key}
                title={<p>{item.player}</p>}
                description={parseScore(item.score)}
              />
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default Machine;
