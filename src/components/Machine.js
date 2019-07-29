import React from "react";
import { Row, List } from "antd";
import { getscores } from "../firebase/firebase";

class Machine extends React.Component {
  state = {
    scores: []
  };
  componentWillMount() {
    this.updateScores();
  }

  updateScores() {
    getscores(this.props.name).then(x => {
      let scoresArray = [];
      x.forEach(child => {
        scoresArray.push(child.val());
      });
      const sortedArray = this.sortArrayByScores(scoresArray);
      this.setState({ scores: sortedArray });
      this.props.dataLoaded();
    });
  }

  sortArrayByScores(scores) {
    return scores.sort((a, b) =>
      parseInt(b.score) > parseInt(a.score) ? 1 : -1
    );
  }

  parseScore(score) {
    return score.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
                description={this.parseScore(item.score)}
              />
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default Machine;
