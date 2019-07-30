import React from "react";
import { Button, message, Row, Col } from "antd";
import goldeneyeImg from "../assets/goldeneye.png";
import hookImg from "../assets/hook.png";
import { deleteScore } from "../firebase/firebase";
import { parseScore } from "./helpers/scoreHelper";

class DeleteScoreForm extends React.Component {
  state = {
    spinning: false
  };

  deleteScore = item => {
    this.setState({ spinning: true });
    console.log("Den er i sletting handleSubmit", item);

    deleteScore(item)
      .then(res => {
        message.success("Score slettet!");
        this.props.onDeleted();
      })
      .catch(error => {
        message.error("Noe gikk galt under sletting av score!");
      })
      .finally(x => {
        this.setState({ spinning: false });
      });
  };

  render() {
    return (
      <div>
        <Row style={{ marginBottom: "10px" }}>
          <Col span={8}>
            <img
              width={"100%"}
              height={"80px"}
              alt="maskin"
              src={this.props.item.machine === "hook" ? hookImg : goldeneyeImg}
            />
          </Col>
          <Col span={12} offset={2}>
            <h3>{this.props.item.player}</h3>
            <h4>{parseScore(this.props.item.score)}</h4>
          </Col>
        </Row>
        <Button
          type="primary"
          htmlType="submit"
          className="delete-score-button"
          loading={this.state.spinning}
          onClick={this.deleteScore.bind(this, this.props.item)}
        >
          Slett
        </Button>
      </div>
    );
  }
}

export default DeleteScoreForm;
