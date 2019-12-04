import React from 'react';
import { Button, message, Row, Col, Form, Input } from 'antd';
import goldeneyeImg from '../assets/goldeneye.png';
import hookImg from '../assets/hook.png';
import tommyImg from '../assets/tommy.jpg';
import { updateScore } from '../firebase/firebase';
import { parseScore } from '../helpers/scoreHelper';

class UpdateScoreForm extends React.Component {
  state = {
    spinning: false
  };

  updateScore = item => {
    this.setState({ spinning: true });
    item.score = this.props.form.getFieldValue('score');
    item.timestamp = new Date().getTime();

    updateScore(item)
      .then(res => {
        message.success('Score oppdatert!');
        this.props.onUpdated();
      })
      .catch(error => {
        message.error('Noe gikk galt under oppdatering av score!');
      })
      .finally(x => {
        this.setState({ spinning: false });
      });
  };

  formIsValid() {
    const valid = this.props.form.getFieldValue('score') !== undefined && this.props.form.getFieldValue('score').length > 0;
    return valid;
  }

  getMachineImage() {
    switch (this.props.item.machine) {
      case 'hook':
        return hookImg;
      case 'goldeneye':
        return goldeneyeImg;
      case 'tommy':
        return tommyImg;
      default:
        return undefined;
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Row>
          <Col span={8}>
            <img width={'100%'} height={'80px'} alt="maskin" src={this.getMachineImage()} />
          </Col>
          <Col span={12} offset={2}>
            <h2>{this.props.item.player}</h2>
            <h4>Gammel score: {parseScore(this.props.item.score)}</h4>
          </Col>
        </Row>
        <h4 style={{ marginTop: '10px' }}>Ny score: {parseScore(this.props.form.getFieldValue('score'))}</h4>

        <Form onSubmit={e => e.preventDefault()} className="update-score-form">
          <Form.Item>
            {getFieldDecorator('score', {
              rules: [{ required: true, message: 'Vennligst skriv inn score!' }]
            })(<Input type="number" placeholder="Score" pattern="\d*" />)}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="update-score-button"
              loading={this.state.spinning}
              onClick={this.updateScore.bind(this, this.props.item)}
              disabled={!this.formIsValid()}
            >
              Oppdater
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const WrappedUpdateForm = Form.create({ name: 'update_score' })(UpdateScoreForm);

export default WrappedUpdateForm;
