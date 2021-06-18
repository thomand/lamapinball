import React from 'react';
import { Card, Spin, Icon } from 'antd';
import Machine from './Machine';
import NewestScores from './newestScores';
import goldeneye from '../assets/goldeneye.png';
import hook from '../assets/hook.png';
import tommy from '../assets/tommy.jpg';
import scared from '../assets/scaredStiff.png';
import theatre from '../assets/tom_bg.jpg';
import roadshow from '../assets/roadshow.jpeg';
import waterworld from '../assets/waterworld.jpeg';

const tabListNoTitle = [
  {
    key: 'theatreOfMagic',
    tab: 'Theatre of Magic'
  },
  {
    key: 'scaredStiff',
    tab: 'Scared Stiff'
  },
  {
    key: 'roadshow',
    tab: 'Road show'
  },
  {
    key: 'waterworld',
    tab: 'Waterworld'
  },
  {
    key: 'goldenEye',
    tab: 'Golden Eye'
  },
  {
    key: 'tommy',
    tab: 'Tommy'
  },
  {
    key: 'hook',
    tab: 'Hook'
  },
  {
    key: 'nyeste',
    tab: 'Nyeste'
  }
];

class MachinesCardContainer extends React.Component {
  state = {
    key: 'theatreOfMagic',
    noTitleKey: 'theatreOfMagic',
    spinning: true
  };

  contentListNoTitle = {
    theatreOfMagic: <Machine key={'theatreOfMagic'} name={'theatreOfMagic'} dataLoaded={this.dataLoaded.bind(this)} image={theatre} />,
    scaredStiff: <Machine key={'scaredStiff'} name={'scaredStiff'} dataLoaded={this.dataLoaded.bind(this)} image={scared} />,
    roadshow: <Machine key={'roadshow'} name={'roadshow'} dataLoaded={this.dataLoaded.bind(this)} image={roadshow} />,
    waterworld: <Machine key={'waterworld'} name={'waterworld'} dataLoaded={this.dataLoaded.bind(this)} image={waterworld} />,
    goldenEye: <Machine key={'goldeneye'} name={'goldeneye'} dataLoaded={this.dataLoaded.bind(this)} image={goldeneye} />,
    hook: <Machine key={'hook'} name={'hook'} dataLoaded={this.dataLoaded.bind(this)} image={hook} />,
    tommy: <Machine key={'tommy'} name={'tommy'} dataLoaded={this.dataLoaded.bind(this)} image={tommy} />,
    nyeste: <NewestScores dataLoaded={this.dataLoaded.bind(this)} />
  };

  onTabChange = (key, type) => {
    this.setState({ [type]: key, spinning: true });
  };

  dataLoaded() {
    this.setState({ spinning: false, refreshScores: false });
  }

  render() {
    return (
      <div>
        <Card
          style={{ width: '100%' }}
          tabList={tabListNoTitle}
          activeTabKey={this.state.noTitleKey}
          onTabChange={key => {
            this.onTabChange(key, 'noTitleKey');
          }}
        >
          {this.contentListNoTitle[this.state.noTitleKey]}
        </Card>

        <Spin spinning={this.state.spinning} indicator={<Icon type="loading" style={{ fontSize: 36 }} spin />} />
      </div>
    );
  }
}

export default MachinesCardContainer;
