import React from 'react';
import _ from 'lodash';
import coin from '../../../assets/coin.png';
import dice from '../../../assets/dices.png';
import etheroll from '../../../assets/etheroll.png';
import text from '../../../assets/text/betAndHistoryAndStat.json';
import {helperServer} from "../../../utils";

const ControlItem = ({onClick, value, active}) => (
  <div onClick={onClick} className={`${active ? 'active' : ''} control-item`}>
    {value}
  </div>
);

const ChanceItem = ({
  maxBet,
  maxSequence,
  result,
  value,
  winningChance,
  gameName
}) => {
  switch (gameName) {
    case 'coin':
      value = value ? 'down' : 'up';
      break;
    case 'dice':
      value += 1;
      break;
    case 'two-dice':
      value += 2;
      break;
    case 'etheroll':
      if (value === 0) value = '1 - 25';
      else if (value === 1) value = '26 - 50';
      else if (value === 2) value = '51 - 75';
      else if (value === 3) value = '76 - 97';
      break;
    default:
      break;
  }
  return (
    <div className="col">
      <div className="line">{value}</div>
      <div className="line">{result}</div>
      <div className="line">{winningChance}%</div>
      <div className="line">{maxSequence}</div>
      <div className="line">{maxBet}</div>
    </div>
  );
};

class Chances extends React.Component {
  state = {
    active: 25,
    data: {}
  };
  changeActive = newActive => {
    this.setState({active: newActive});
  };
  componentDidMount() {
    fetch(`${helperServer}/historyChances/${this.props.gameName}`)
      .then(res => res.json())
      .then(({response}) => this.setState({data: response}));
  }
  render() {
    let content;
    const {keys: keysStrings} = text[this.props.lang].chances;
    const keys = (
      <div className="keys">
        <div className="line">value</div>
        <div className="line">{keysStrings.result}</div>
        <div className="line">{keysStrings.winChance}</div>
        <div className="line">{keysStrings.seqResult}</div>
        <div className="line">{keysStrings.biggestBet}</div>
      </div>
    );
    switch (this.props.gameName) {
      case 'etheroll':
        content = (
          <div
            className="row justify-content-lg-between
					justify-content-start align-items-end"
            style={{padding: 20}}
          >
            {keys}
            <div className="values row">
              {this.state.data[5] &&
                _.map(this.state.data[this.state.active], (data, idx) => (
                  <ChanceItem
                    {...data}
                    value={idx}
                    gameName={this.props.gameName}
                    key={`chance1-${idx}`}
                  />
                ))}
            </div>
            <div className="d-none d-md-flex align-items-center justify-content-center">
              <div className="img-wrap">
                <img src={etheroll} alt="coin" />
              </div>
            </div>
          </div>
        );
        break;
      case 'coin':
        content = (
          <div
            className="row coin justify-content-md-between
					justify-content-center align-items-end"
            style={{padding: 20}}
          >
            {keys}
            <div className="values row">
              {this.state.data[5] &&
                _.map(this.state.data[this.state.active], (data, idx) => (
                  <ChanceItem
                    {...data}
                    value={idx}
                    gameName={this.props.gameName}
                    key={`chance2-${idx}`}
                  />
                ))}
            </div>
            <div className="d-none d-md-flex align-items-center justify-content-center">
              <div className="img-wrap">
                <img src={coin} alt="coin" />
              </div>
            </div>
          </div>
        );
        break;
      case 'dice':
        content = (
          <div
            className="row justify-content-lg-between
					justify-content-start align-items-end"
            style={{padding: 20}}
          >
            {keys}

            <div className="values row">
              {this.state.data[5] &&
                _.map(this.state.data[this.state.active], (data, idx) => (
                  <ChanceItem
                    {...data}
                    value={idx}
                    gameName={this.props.gameName}
                    key={`chance3-${idx}`}
                  />
                ))}
            </div>
            <div className="d-none d-lg-flex align-items-center justify-content-center">
              <div className="img-wrap">
                <img src={dice} alt="dice" />
              </div>
            </div>
          </div>
        );
        break;
      case 'two-dice':
        content = (
          <div
            className="row justify-content-lg-between
					justify-content-start align-items-end"
            style={{padding: 20}}
          >
            {keys}

            <div style={{minWidth: 767}} className="values row two-dice">
              {this.state.data[5] &&
                _.map(this.state.data[this.state.active], (data, idx) => (
                  <ChanceItem
                    {...data}
                    value={idx}
                    gameName={this.props.gameName}
                    key={`chance4-${idx}`}
                  />
                ))}
            </div>
          </div>
        );
        break;
      default:
        content = <div />;
        break;
    }
    return (
      <div className="chances-container">
        <div className="header">{text[this.props.lang].chances.title}</div>
        <div className="control">
          {[5, 10, 25, 50, 100].map((value, idx) => (
            <ControlItem
              onClick={() => this.changeActive(value)}
              value={value}
              active={this.state.active === value}
              key={`control-${idx}`}
            />
          ))}
        </div>
        <div className="table">{content}</div>
      </div>
    );
  }
}

export default Chances;
