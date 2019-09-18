import React from 'react';
import currencies from './currensienslist';
import text from '../../../assets/text/betAndHistoryAndStat.json';

export default class Bet extends React.Component {
  state = {
    value: this.props.money,
    input: this.props.money,
    hovered: false
  };
  changeValue = (newValue = this.state.input) => {
    const prevValue = this.state.value;
    if (isNaN(+newValue)) this.setState({value: prevValue, input: prevValue});
    else {
      newValue = Math.max(this.props.minBet, newValue);
      newValue = Math.min(this.props.maxBet, newValue);
      newValue = +newValue.toFixed(3);
      this.setState({
        value: newValue,
        input: newValue
      });
      setTimeout(() => this.props.changeBet(this.state.value), 0);
    }
  };
  render() {
    return (
      <div className="bet-container circled">
        <div className="input-wrap col-xl-7 col-md-5">
          <img
            src={currencies[this.props.currency].img}
            alt={currencies[this.props.currency].text}
            className="currency-img"
            onMouseEnter={() => this.setState({hovered: true})}
            onMouseLeave={() => this.setState({hovered: false})}
          />
          <input
            type="text"
            value={
              this.props.ethDollarCourse && this.state.hovered
                ? (this.state.value * this.props.ethDollarCourse).toFixed(1)
                : this.state.input
            }
            onChange={e => this.setState({input: e.target.value})}
            onBlur={() => this.changeValue()}
          />
          <div className="currency-text">
            {this.props.ethDollarCourse && this.state.hovered
              ? 'USD'
              : currencies[this.props.currency].text}
          </div>
        </div>
        <div className="controls col-xl-5 col-md-7">
          <div
            className="control"
            onClick={() => this.changeValue(this.state.value / 2)}
          >
            1/2
          </div>
          <div
            className="control"
            onClick={() => this.changeValue(this.state.value * 2)}
          >
            2x
          </div>
          <div
            className="control"
            onClick={() => this.changeValue(this.props.minBet)}
          >
            min
          </div>
          <div
            className="control"
            onClick={() => this.changeValue(this.props.maxBet)}
          >
            max
          </div>
        </div>
        <div className="label">{text[this.props.lang].labels.bet}</div>
      </div>
    );
  }
}
