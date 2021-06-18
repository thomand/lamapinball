import React from 'react';
import { Button, message, Row, Col } from 'antd';
import goldeneyeImg from '../assets/goldeneye.png';
import hookImg from '../assets/hook.png';
import tommyImg from '../assets/tommy.jpg';
import scaredImg from '../assets/scaredStiff.png';
import theatreImg from '../assets/tom_bg.jpg';
import roadshowImg from '../assets/roadshow.jpeg';
import waterworldImg from '../assets/waterworld.jpeg';
import { deleteScore } from '../firebase/firebase';
import { parseScore } from '../helpers/scoreHelper';
import { timeDifference } from '../helpers/timeHelper';

class DeleteScoreForm extends React.Component {
  state = {
    spinning: false
  };

  deleteScore = item => {
    this.setState({ spinning: true });

    deleteScore(item)
      .then(res => {
        message.success('Score slettet!');
        this.props.onDeleted();
      })
      .catch(error => {
        message.error('Noe gikk galt under sletting av score!');
      })
      .finally(x => {
        this.setState({ spinning: false });
      });
  };

  getMachineImage() {
    switch (this.props.item.machine) {
      case 'hook':
        return hookImg;
      case 'goldeneye':
        return goldeneyeImg;
      case 'tommy':
        return tommyImg;
      case 'scaredStiff':
        return scaredImg;
      case 'theatreOfMagic':
        return theatreImg;
      case 'roadshow':
        return roadshowImg;
      case 'waterworld':
        return waterworldImg;
      default:
        return undefined;
    }
  }

  render() {
    return (
      <div>
        <Row style={{ marginBottom: '10px' }}>
          <Col span={8}>
            <img width={'100%'} height={'80px'} alt="maskin" src={this.getMachineImage()} />
          </Col>
          <Col span={12} offset={2}>
            <h3>{this.props.item.player}</h3>
            <h4>{parseScore(this.props.item.score)}</h4>
            <h4 style={{ fontWeight: 'lighter', color: '#444' }}>{timeDifference(this.props.item.timestamp)}</h4>
          </Col>
        </Row>
        <Button type="danger" htmlType="submit" className="delete-score-button" loading={this.state.spinning} onClick={this.deleteScore.bind(this, this.props.item)}>
          Slett
        </Button>
      </div>
    );
  }
}

export default DeleteScoreForm;
