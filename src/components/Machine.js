import React from "react";
import { Row, List } from "antd";
import { getscores } from "../firebase/firebase";
// const data = [
//   {
//     player: "LAMA",
//     score: 123456789
//   },
//   {
//     player: "Thomas",
//     score: 113456789
//   },
//   {
//     player: "Ole",
//     score: 103456789
//   },
//   {
//     player: "OK",
//     score: 23456789
//   },
//   {
//     player: "Sivert",
//     score: 13456789
//   }
// ];

class Machine extends React.Component {
  state = {
    scores: []
  };
  componentWillMount() {
    getscores(this.props.name).then(x => {
      const scoresArray = Object.values(x.val());
      const sortedArray = this.sortArrayByScores(scoresArray);
      this.setState({ scores: sortedArray });
    });
  }
  componentDidUpdate() {
    getscores(this.props.name).then(x => {
      const scoresArray = Object.values(x.val());
      const sortedArray = this.sortArrayByScores(scoresArray);
      this.setState({ scores: sortedArray });
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
