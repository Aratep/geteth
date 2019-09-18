import React from 'react';

import dice1 from '../../assets/icons/dice/dice1.png';
import dice2 from '../../assets/icons/dice/dice2.png';
import dice3 from '../../assets/icons/dice/dice3.png';
import dice4 from '../../assets/icons/dice/dice4.png';
import dice5 from '../../assets/icons/dice/dice5.png';
import dice6 from '../../assets/icons/dice/dice6.png';
import heads from '../../assets/icons/coin-flip/heads.png';
import tails from '../../assets/icons/coin-flip/tails.png';
import windice1 from '../../assets/icons/win/dice1.png';
import windice2 from '../../assets/icons/win/dice2.png';
import windice3 from '../../assets/icons/win/dice3.png';
import windice4 from '../../assets/icons/win/dice4.png';
import windice5 from '../../assets/icons/win/dice5.png';
import windice6 from '../../assets/icons/win/dice6.png';
import winheads from '../../assets/icons/win/heads.png';
import wintails from '../../assets/icons/win/tails.png';
import Loader from 'react-loader-spinner';

import text from '../../assets/text/betAndHistoryAndStat.json';

import {connect} from 'react-redux';

const diceIcons = [null, dice1, dice2, dice3, dice4, dice5, dice6];
const winDiceIcons = [
  null,
  windice1,
  windice2,
  windice3,
  windice4,
  windice5,
  windice6
];

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
    fetch(
      `https://nameless-mesa-18702.herokuapp.com/statistics/${
        this.props.gameName
      }`
    )
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
          fetch(
            `https://nameless-mesa-18702.herokuapp.com/statistics/${
              this.props.gameName
            }?account=${accounts[0]}`
          )
            .then(res => res.json())
            .then(gameInfos => {
              if (gameInfos.length)
                this.setState({
                  personal: {
                    ...this.state.personal,
                    isLoaded: true,
                    gameInfos
                  }
                });
              else
                this.setState({
                  ...this.state.personal,
                  error: 'you have not played yet'
                });
            });
        else
          this.setState({
            personal: {
              ...this.state.personal,
              error: 'you are not logged in'
            }
          });
      });
    } else
      this.setState({
        personal: {
          ...this.state.personal,
          error: 'install metamask and log in please'
        }
      });
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
    else
      content = mode.gameInfos.map(gameInfo => (
        <GameInfo gameName={gameName} {...gameInfo} />
      ));
    const {
      title,
      header: {player, bet, result},
      onlyMe
    } = text[this.props.lang].history;
    return (
      <div className="row">
        <div className="col-12 statistics-wrap">
          <div className="col-12 d-flex justify-content-between">
            <h1 style={{fontWeight: 200}}>{title}</h1>
            <button onClick={this.toggleMode} className="only-me">
              {onlyMe}
            </button>
          </div>
          <div className="col-12">
            <div className="row no-gutters header">
              <div className="col-4">{player}</div>
              <div className="col-4">{bet}</div>
              <div className="col-4">{result}</div>
            </div>
          </div>
          <div className="col-12 statistics">{content}</div>
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  lang: state.lang
}))(Statistics);

const Player = ({address, img}) => (
  <div className="player col-4">
    <div className="player-img-wrap">
      <img src={img || 'https://www.w3schools.com/w3css/img_lights.jpg'} />
    </div>
    <div className="player-address">
      <a>{address}</a>
    </div>
  </div>
);

const Bet = ({money, values, gameName}) => {
  const Money = <div className="bet-money">{money}</div>;
  let Values;
  switch (gameName) {
    case 'coin':
      Values = (
        <div className="bet-values coin">
          <div className="img-wrap">
            <img src={values[0] ? heads : tails} />
          </div>
        </div>
      );
      break;
    case 'dice':
      Values = (
        <div className="bet-values dice">
          <div className="wrap">
            {values.map(value => (
              <div className="img-wrap ">
                <img src={diceIcons[value]} />
              </div>
            ))}
          </div>
        </div>
      );
      break;

    case 'two-dice':
      Values = <div className="bet-values two-dice">{values.join(',')}</div>;
      break;
    case 'etheroll':
      Values = <div className="bet-values etheroll">{'≤' + values[0]}</div>;
      break;
  }
  return <div className="col-4 bet">{[Money, Values]}</div>;
};

const Result = ({gameName, money, values}) => {
  const Money = <div className="result-money">{money || '-'}</div>;
  let Values;
  switch (gameName) {
    case 'coin':
      Values = (
        <div className="result-values coin">
          <div className={money ? ' win img-wrap' : 'img-wrap'}>
            <img
              src={
                values[0]
                  ? money
                    ? winheads
                    : heads
                  : money
                  ? wintails
                  : tails
              }
            />
          </div>
        </div>
      );
      break;

    case 'dice':
      Values = (
        <div className="result-values dice">
          <div className={money ? ' win img-wrap' : 'img-wrap'}>
            <img src={money ? winDiceIcons[values[0]] : diceIcons[values[0]]} />
          </div>
        </div>
      );
      break;

    case 'etheroll':
      Values = (
        <div
          className={
            money ? 'result-values etheroll win' : 'result-values etheroll'
          }
        >
          {values[0]}
        </div>
      );
      break;
    case 'two-dice':
      Values = (
        <div className="result-values two-dice">
          <div className={money ? ' win img-wrap' : 'img-wrap'}>
            <img
              src={money ? winDiceIcons[values[0]] : diceIcons[values[0]]}
              alt=""
            />
          </div>
          <div className={money ? ' win img-wrap' : 'img-wrap'}>
            <img
              src={money ? winDiceIcons[values[1]] : diceIcons[values[1]]}
              alt=""
            />
          </div>
        </div>
      );
  }
  return <div className="col-4 result">{[Values, Money]}</div>;
};

const GameInfo = props => (
  <div className="game-info">
    <div className="row no-gutters">
      <Player {...props.player} />
      <Bet gameName={props.gameName} {...props.bet} />
      <Result gameName={props.gameName} {...props.result} />
    </div>
  </div>
);

const Jackpot = ({jackpot}) => (
  <div className="col-1 jackpot">{jackpot ? jackpot : '-'}</div>
);
