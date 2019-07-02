import React from "react";

import { Form, Input, Button, Select } from "antd";

const { Option } = Select;

class ScoreForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  parseScore(score) {
    if (score !== undefined) {
      return score.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return;
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <h2>
          Score: {this.parseScore(this.props.form.getFieldValue("score"))}
        </h2>
        <Form.Item>
          {getFieldDecorator("machine", {
            rules: [{ required: true, message: "Vennligst velg maskin!" }]
          })(
            <Select
              //   value={state.player}
              onChange={this.handleCurrencyChange}
              placeholder="Maskin"
            >
              <Option value="goldeneye">Golden Eye</Option>
              <Option value="hook">Hook</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("player", {
            rules: [{ required: true, message: "Vennligst velg spiller!" }]
          })(
            <Select
              //   value={state.player}
              onChange={this.handleCurrencyChange}
              placeholder="Spiller"
            >
              <Option value="lama">LAMA</Option>
              <Option value="thomas">Thomas</Option>
              <Option value="ok">OK</Option>
              <Option value="ole">Ole</Option>
              <Option value="sivert">Sivert</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("score", {
            rules: [{ required: true, message: "Vennligst skriv inn score!" }]
          })(<Input type="number" placeholder="Score" pattern="\d*" />)}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Registrer
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedForm = Form.create({ name: "normal_login" })(ScoreForm);

export default WrappedForm;
