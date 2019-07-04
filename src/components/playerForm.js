import React from "react";

import { Form, Input, Button, message } from "antd";

import { addPlayer } from "../firebase/firebase";

class PlayerForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        //send data to api and await response.
        //show spinner while waiting
        //after callback call onSumbit function
        addPlayer(values.name)
          .then(res => {
            message.success("Spiller lagt til!");
            this.props.onSubmit();
          })
          .catch(error => {
            message.error("Noe gikk galt under lagring av spiller!");
          });
      }
    });
  };

  nameFieldIsEmpty() {
    return (
      this.props.form.getFieldValue("name") === undefined ||
      this.props.form.getFieldValue("name").length === 0
    );
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="player-form">
        <Form.Item>
          {getFieldDecorator("name", {
            rules: [{ required: true, message: "Vennligst skriv inn navn!" }]
          })(<Input type="text" placeholder="Navn" />)}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="player-reg-button"
            disabled={this.nameFieldIsEmpty()}
          >
            Registrer
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedPlayerForm = Form.create({ name: "player_registration" })(
  PlayerForm
);

export default WrappedPlayerForm;
