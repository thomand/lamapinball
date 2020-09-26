import React from 'react';
import { Form, Input, Button, Select, Spin, Icon, message } from 'antd';
import { getPlayers, addBeer } from '../firebase/firebase';
import { parseScore } from '../helpers/scoreHelper';
import { sortPlayersByName } from '../helpers/playerHelper';
import score from '../models/score';

class BeerForm extends React.Component {
  state = {
    players: [],
    player: null,
    beers: ['0.33L', '0.5L'],
    beer: null,
    amount: 1,
    spinning: false,
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
        let beerObject = {
          player: values.player,
          beer:  values.beer,
          amount: values.amount,
        };
        this.savePlayerToLocalStorage(beerObject.player);
        console.log('Saving',beerObject);
        addBeer(beerObject)
          .then(success => {
            message.success('Øl registrert!');
            this.props.onSubmit();
          })
          .error(error => {
            message.error('Noe gikk galt under lagring av øl!');
          })
          .finally(x => {
            this.setState({ spinning: false });
          });
        this.props.onSubmit();
      }
    });
  };

  formIsValid() {
    const beers = this.props.form.getFieldValue('beer') !== undefined;
    const player = this.props.form.getFieldValue('player') !== undefined;
    const amount = this.props.form.getFieldValue('amount') !== undefined;
    return beers && player && amount;
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Form onSubmit={this.handleSubmit} className="beer-form">
          <Form.Item>
            {getFieldDecorator('beer', {
              rules: [{ required: true, message: 'Vennligst velg type!' }]
            })(
              <Select placeholder="Type">
                {this.state.beers.map(beer => (
                  <Select.Option key={beer} value={beer}>
                    {beer}
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
            {getFieldDecorator('amount', {
              rules: [{ required: true, message: 'Vennligst skriv inn antall!' }],
              initialValue: this.state.amount
            })(<Input type="number" placeholder="Antall" pattern="\d*" />)}
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

const WrappedScoreForm = Form.create({ name: 'beer_registration' })(BeerForm);

export default WrappedScoreForm;
