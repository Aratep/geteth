import React from 'react';
import Rheostat from 'rheostat';
import 'rheostat/initialize';
import text from '../../assets/text/betAndHistoryAndStat.json';

export default class Bet extends React.Component {
  state = {
    isFocused: false,
    value: 0.3
  };
  render() {
    const {description} = text[this.props.lang].bet;
    const {bet, onBetUpdated, minBet, maxBet} = this.props;
    return (
      <div className="bet-container">
        <div className="buttons-container">
          <button onClick={() => onBetUpdated(0.05)}>0.05</button>
          <button onClick={() => onBetUpdated(0.1)}>0.1</button>
          <button onClick={() => onBetUpdated(0.15)}>0.15</button>
          <button onClick={() => onBetUpdated(maxBet)}>max</button>
        </div>
        <div className="bet">{bet}</div>
        <div className="rheostat-container">
          <Rheostat
            min={minBet * 100}
            max={maxBet * 100}
            values={[bet * 100]}
            onValuesUpdated={value => onBetUpdated(value.values[0] / 100)}
          />
        </div>
        <p>{description}</p>
      </div>
    );
  }
}
