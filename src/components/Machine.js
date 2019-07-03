import React from "react";
import { Row, List } from "antd";
import goldeneye from "../assets/goldeneye.png";
import hook from "../assets/hook.png";

const data = [
  {
    player: "LAMA",
    score: 123456789
  },
  {
    player: "Thomas",
    score: 113456789
  },
  {
    player: "Ole",
    score: 103456789
  },
  {
    player: "OK",
    score: 23456789
  },
  {
    player: "Sivert",
    score: 13456789
  }
];

function parseScore(score) {
  return score.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function Machine(props) {
  let image = props.name === "hook" ? hook : goldeneye;
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
          src={image}
          alt="bilde av maskin :)"
          width={"100%"}
          height={"150px"}
        />
      </Row>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              title={<p>{item.player}</p>}
              description={parseScore(item.score)}
            />
          </List.Item>
        )}
      />
    </div>
  );
}

export default Machine;
