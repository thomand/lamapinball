import React from 'react';
import { Form, Input, Button, Select, Spin, Icon, message } from 'antd';
import { getPlayers, addScore } from '../firebase/firebase';
import { parseScore } from '../helpers/scoreHelper';
import { sortPlayersByName } from '../helpers/playerHelper';

class ScoreForm extends React.Component {
  state = {
    players: [],
    player: null,
    spinning: false,
    machines: [
      { name: 'Golden Eye', key: 'goldeneye', id: 1 },
      { name: 'Hook', key: 'hook', id: 2 },
      { name: 'Scared Stiff', key: 'scaredStiff', id: 3 },
      { name: 'Theatre of Magic', key: 'theatreOfMagic', id: 4 },
      { name: 'Tommy', key: 'tommy', id: 5 },
      { name: 'Road show', key: 'roadshow', id: 6 },
      { name: 'Waterworld', key: 'waterworld', id: 7 },
    ]
  };

  componentWillMount() {
    getPlayers()
      .then(res => {
        let playersObj = res.val();
        let players = sortPlayersByName(Object.values(playersObj));
        this.setState({
          players,
          player: localStorage.getItem('player') || players[0].name || ''
        });
      })
      .catch(() => {
        message.error('Kunne ikke hente spillere');
      });
  }

  savePlayerToLocalStorage(player) {
    console.log('Attempting to save ', player);
    localStorage.setItem('player', player);
    console.log('saved ', localStorage.getItem('player'));
  }

  handleSubmit = e => {
    this.setState({ spinning: true });
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let scoreObject = {
          player: values.player,
          machine: this.state.machines.filter(x => x.name === values.machine)[0].key,
          score: parseInt(values.score)
        };
        this.savePlayerToLocalStorage(scoreObject.player);
        addScore(scoreObject)
          .then(success => {
            message.success('Score lagret!');
            this.props.onSubmit();
          })
          .error(error => {
            message.error('Noe gikk galt under lagring av score!');
          })
          .finally(x => {
            this.setState({ spinning: false });
          });
        this.props.onSubmit();
      }
    });
  };

  formIsValid() {
    const score = this.props.form.getFieldValue('score') !== undefined && this.props.form.getFieldValue('score').length > 0;
    const machine = this.props.form.getFieldValue('machine') !== undefined;
    const player = this.props.form.getFieldValue('player') !== undefined;
    return score & machine & player;
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Form onSubmit={this.handleSubmit} className="score-form">
          <h2>Score: {parseScore(this.props.form.getFieldValue('score'))}</h2>
          <Form.Item>
            {getFieldDecorator('machine', {
              rules: [{ required: true, message: 'Vennligst velg maskin!' }]
            })(
              <Select placeholder="Maskin">
                {this.state.machines.map(machine => (
                  <Select.Option key={machine.key} value={machine.name}>
                    {machine.name}
                  </Select.Option>
                ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('player', {
              rules: [{ required: true, message: 'Vennligst velg spiller!' }],
              initialValue: this.state.player
            })(
              <Select placeholder="Spiller">
                {this.state.players.map(player => (
                  <Select.Option key={player.id} value={player.name}>
                    {player.name}
                  </Select.Option>
                ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('score', {
              rules: [{ required: true, message: 'Vennligst skriv inn score!' }]
            })(<Input type="number" placeholder="Score" pattern="\d*" />)}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="score-reg-button" disabled={!this.formIsValid()}>
              Registrer
            </Button>
          </Form.Item>
        </Form>
        <Spin spinning={this.state.spinning} indicator={<Icon type="loading" style={{ fontSize: 36 }} spin />} />
      </div>
    );
  }
}

const WrappedScoreForm = Form.create({ name: 'score_registration' })(ScoreForm);

export default WrappedScoreForm;
