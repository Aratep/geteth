import React from 'react';
import Loader from 'react-loader-spinner';

import text from '../../../assets/text/betAndHistoryAndStat.json';

import {connect} from 'react-redux';
import {helperServer} from "../../../utils";

class Statistics extends React.Component {
  state = {
    all: {
      isLoaded: false,
      gameInfos: [],
      error: ''
    },
    personal: {
      isLoaded: false,
      gameInfos: [],
      error: ''
    },
    mode: 'all'
  };
  componentDidMount() {
    fetch(`${helperServer}/betHistory/${this.props.gameName}`)
      .then(res => res.json())
      .then(gameInfos => {
        this.setState({
          all: {
            ...this.state.statistics,
            isLoaded: true,
            gameInfos
          }
        });
      })
      .catch(err => {
        this.setState({
          all: {
            ...this.state.all,
            error: 'server error'
          }
        });
      });
    if (window.web3) {
      window.web3.eth.getAccounts((err, accounts) => {
        if (accounts && accounts.length)
          fetch(`${helperServer}/betHistory/${this.props.gameName}?account=${accounts[0]}`)
            .then(res => res.json())
            .then(gameInfos => {
              console.log(gameInfos, 'asdf');
              if (gameInfos.length)
                setTimeout(
                  () =>
                    this.setState({
                      personal: {
                        ...this.state.personal,
                        isLoaded: true,
                        gameInfos
                      }
                    }),
                  0
                );
              else
                setTimeout(
                  () =>
                    this.setState({
                      personal: {
                        ...this.state.personal,
                        error: 'you have not played yet',
                        isLoaded: true
                      }
                    }),
                  0
                );
            });
        else
          setTimeout(
            () =>
              this.setState({
                personal: {
                  ...this.state.personal,
                  error: 'you are not logged in'
                }
              }),
            0
          );
      });
    } else
      setTimeout(
        () =>
          this.setState({
            personal: {
              ...this.state.personal,
              error: 'install metamask and log in please'
            }
          }),
        0
      );
  }
  toggleMode = () => {
    this.setState({
      mode: this.state.mode === 'all' ? 'personal' : 'all'
    });
  };
  render() {
    const {gameName} = this.props;
    let content;
    const mode = this.state[this.state.mode];
    if (mode.error)
      content = (
        <div
          style={{
            display: 'flex',
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <h1>{mode.error}</h1>
        </div>
      );
    else if (!mode.isLoaded)
      content = (
        <div
          style={{
            display: 'flex',
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Loader type="TailSpin" color="#ff0000" height={100} width={100} />
        </div>
      );
    else {
      content = mode.gameInfos.map((gameInfo, idx) => (
        <GameInfo gameName={gameName} {...gameInfo} index={idx + 1} key={`gameinfo-${idx}`} />
      ));
    }

    const header = {
      index: '#',
      ...text[this.props.lang].history.header
    };
    return (
      <div className="statistics">
        <div className="controls">
          <div
            onClick={() => this.setState({mode: 'all'})}
            className={`control ${this.state.mode === 'all' ? 'active' : ''}`}
          >
            {text[this.props.lang].history.all}
          </div>
          <div
            className={`control ${
              this.state.mode === 'personal' ? 'active' : ''
            }`}
            onClick={() => this.setState({mode: 'personal'})}
          >
            {text[this.props.lang].history.my}
          </div>
        </div>
        <div className="table-wrap">
          <div className="table">
            <div>
              <GameInfo {...header} header={true} />
            </div>
            <div className="content-wrap">{content}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  lang: state.lang
}))(Statistics);

const parseTime = timestamp => {
  const date = new Date(timestamp * 1000);
  let minutes = date.getMinutes();
  minutes = minutes >= 10 ? minutes : '0' + minutes;
  let hours = date.getHours();
  hours = hours >= 10 ? hours : '0' + hours;
  return `${hours}:${minutes}`;
};

const GameInfo = ({index, player, time, bet, rollUnder, payout, header}) => (
  <div className={header ? 'game-info header' : 'game-info'}>
    <div className="index">{index}</div>
    <div className="player">
      <a href={'https://etherscan.io/address/' + player}>{player}</a>
    </div>
    <div className="time">{!isNaN(+time) ? parseTime(time) : time}</div>
    <div className="bet">{bet}</div>
    <div className="roll-under">{rollUnder}</div>
    <div className="payout">{payout}</div>
  </div>
);
