import React from "react";
import { List } from "antd";
import { getNewestHook, getNewestGoldenEye } from "../firebase/firebase";
import goldeneyeImg from "../assets/goldeneye.png";
import hookImg from "../assets/hook.png";
import { Row, Col, Button } from "antd";
import DeleteScoreDrawer from "./DeleteScoreDrawer";
import parseScore from "./helpers/scoreHelper";
import UpdateScoreDrawer from "./UpdateScoreDrawer";

class NewestScores extends React.Component {
  state = {
    scores: [],
    deleteVisible: false,
    updateVisible: false,
    selectedItem: {}
  };
  componentWillMount() {
    this.updateScores();
  }

  updateScores() {
    let scoresArray = [];
    getNewestGoldenEye()
      .then(golden => {
        golden.forEach(gChild => {
          gChild.image = goldeneyeImg;
          scoresArray.push(gChild.val());
        });
      })
      .finally(y => {
        getNewestHook().then(hook => {
          hook.forEach(hChild => {
            hChild.image = hookImg;
            scoresArray.push(hChild.val());
          });
          let sortedArray = this.sortArrayByTimestamp(scoresArray);
          this.setState({ scores: sortedArray });
          this.props.dataLoaded();
        });
      });
  }

  sortArrayByTimestamp(scores) {
    return scores.sort((a, b) =>
      parseInt(b.timestamp) > parseInt(a.timestamp) ? 1 : -1
    );
  }

  timeDifference(previous) {
    const current = new Date().getTime();
    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30;
    const msPerYear = msPerDay * 365;

    const elapsed = current - previous;

    if (elapsed < msPerMinute) {
      return Math.round(elapsed / 1000) + " sekunder siden";
    } else if (elapsed < msPerHour) {
      return (
        Math.round(elapsed / msPerMinute) +
        (Math.round(elapsed / msPerMinute) === 1 ? " minutt" : " minutter") +
        " siden"
      );
    } else if (elapsed < msPerDay) {
      return (
        Math.round(elapsed / msPerHour) +
        (Math.round(elapsed / msPerHour) === 1 ? " time" : " timer") +
        " siden"
      );
    } else if (elapsed < msPerMonth) {
      return (
        "ca " +
        Math.round(elapsed / msPerDay) +
        (Math.round(elapsed / msPerDay) === 1 ? " dag" : " dager") +
        " siden"
      );
    } else if (elapsed < msPerYear) {
      return (
        "ca " +
        Math.round(elapsed / msPerMonth) +
        (Math.round(elapsed / msPerMonth) === 1 ? " måned" : " måneder") +
        " siden"
      );
    } else {
      return "ca " + Math.round(elapsed / msPerYear) + " år siden";
    }
  }

  deleteClicked(item) {
    this.setState({
      selectedItem: item,
      deleteVisible: true
    });
  }

  updateClicked(item) {
    this.setState({
      selectedItem: item,
      updateVisible: true
    });
  }

  onCloseDelete = () => {
    this.setState({ deleteVisible: false });
    this.updateScores();
  };

  onCloseUpdate = () => {
    this.setState({ updateVisible: false });
    this.updateScores();
  };

  render() {
    return (
      <div>
        <List
          itemLayout="horizontal"
          dataSource={this.state.scores}
          renderItem={item => (
            <List.Item>
              <Row>
                <Col span={6}>
                  <img
                    width={"160%"}
                    height={"140px"}
                    alt="maskin"
                    src={item.machine === "hook" ? hookImg : goldeneyeImg}
                  />
                </Col>
                <Col span={14} offset={4}>
                  <List.Item.Meta
                    key={item.key}
                    title={
                      <div>
                        <p>{item.player}</p>
                        <p>{parseScore(item.score)}</p>
                      </div>
                    }
                    description={this.timeDifference(item.timestamp)}
                  />
                  <div style={{ marginTop: "10px" }}>
                    <Button
                      type="primary"
                      icon="edit"
                      style={{ marginRight: "30px" }}
                      onClick={this.updateClicked.bind(this, item)}
                    />
                    <Button
                      type="danger"
                      icon="delete"
                      onClick={this.deleteClicked.bind(this, item)}
                    />
                  </div>
                </Col>
              </Row>
            </List.Item>
          )}
        />
        <DeleteScoreDrawer
          visible={this.state.deleteVisible}
          item={this.state.selectedItem}
          onCloseDelete={this.onCloseDelete}
        />
        <UpdateScoreDrawer
          visible={this.state.updateVisible}
          item={this.state.selectedItem}
          onCloseUpdate={this.onCloseUpdate}
        />
      </div>
    );
  }
}

export default NewestScores;
