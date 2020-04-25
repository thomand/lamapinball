import React from 'react';
import { List } from 'antd';
import { getNewestHook, getNewestGoldenEye, getNewestTommy, getNewestScaredStiff } from '../firebase/firebase';
import goldeneyeImg from '../assets/goldeneye.png';
import hookImg from '../assets/hook.png';
import tommyImg from '../assets/tommy.jpg';
import scaredStiffImg from '../assets/scaredStiff.png'
import { Row, Col, Button } from 'antd';
import DeleteScoreDrawer from './DeleteScoreDrawer';
import parseScore from '../helpers/scoreHelper';
import UpdateScoreDrawer from './UpdateScoreDrawer';
import { timeDifference } from '../helpers/timeHelper';

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
      .then(() => {
        getNewestTommy().then(tommy => {
          tommy.forEach(tChild => {
            tChild.image = tommyImg;
            scoresArray.push(tChild.val());
          });
        });
      })
      .then(() => {
        getNewestScaredStiff().then(scaredStiff => {
          scaredStiff.forEach(tChild => {
            tChild.image = scaredStiffImg;
            scoresArray.push(tChild.val());
          });
        });
      })
      .finally(() => {
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
    return scores.sort((a, b) => (parseInt(b.timestamp) > parseInt(a.timestamp) ? 1 : -1));
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

  getMachineImage(machine) {
    switch (machine) {
      case 'hook':
        return hookImg;
      case 'goldeneye':
        return goldeneyeImg;
      case 'tommy':
        return tommyImg;
      case 'scaredStiff':
        return scaredStiffImg;
      default:
        return undefined;
    }
  }

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
                  <img width={'160%'} height={'140px'} alt="maskin" src={this.getMachineImage(item.machine)} />
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
                    description={timeDifference(item.timestamp)}
                  />
                  <div style={{ marginTop: '10px' }}>
                    <Button type="primary" icon="edit" style={{ marginRight: '30px' }} onClick={this.updateClicked.bind(this, item)} />
                    <Button type="danger" icon="delete" onClick={this.deleteClicked.bind(this, item)} />
                  </div>
                </Col>
              </Row>
            </List.Item>
          )}
        />
        <DeleteScoreDrawer visible={this.state.deleteVisible} item={this.state.selectedItem} onCloseDelete={this.onCloseDelete} />
        <UpdateScoreDrawer visible={this.state.updateVisible} item={this.state.selectedItem} onCloseUpdate={this.onCloseUpdate} />
      </div>
    );
  }
}

export default NewestScores;
