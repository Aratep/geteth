import React from 'react';
import betIcon from '../../assets/icons/dice/dice.png';
import text from '../../assets/text/lotery.json';
import currencies from '../Games/Game2/currensienslist';

export default class BuyTickets extends React.Component {
  state = {
    tickets: this.props.userTokens,
    minTickets: 100,
    inputValue: this.props.userTokens
  };
  changeTicketsCount = tickets => {
    this.setState({tickets});
  };
  render() {
    return (
      <div className="exchange-item buy-tickets">
        <div className="title">Buy tickets</div>
        <TicketsField
          tickets={this.state.tickets}
          minTickets={this.state.minTickets}
          maxTickets={this.props.userTokens}
          changeTicketsCount={this.changeTicketsCount}
        />
        <div className="bottom">
          <div className="row">
            <div className="col-sm-12">
              <div className="info-item ">
                <div className="info-item-value">
                  {this.props.userTokens} BET
                </div>
                <div className="info-item-description">
                  {text.rus.buy.yourTokens}
                </div>
              </div>
            </div>
            <div className="col-sm-12">
              <div
                className="button"
                onClick={() => {
                  this.props.buyTickets(this.state.tickets);
                  setTimeout(
                    () => this.changeTicketsCount(this.state.tickets),
                    0
                  );
                }}
              >
                {text[this.props.lang].buy.buyTickets}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class TicketsField extends React.Component {
  state = {
    value: this.props.tickets,
    input: this.props.tickets
  };
  changeValue = (newValue = this.state.input) => {
    const prevValue = this.state.value;
    if (isNaN(+newValue)) this.setState({value: prevValue, input: prevValue});
    else {
      console.log(newValue, 1);
      console.log(this.props.minTickets, this.props.maxTickets, 'min max');
      newValue = Math.max(this.props.minTickets, newValue);
      newValue = Math.min(this.props.maxTickets, newValue);
      console.log(newValue, 2);
      this.setState({
        value: newValue,
        input: newValue
      });
      console.log(newValue, 3);
      setTimeout(() => this.props.changeTicketsCount(newValue), 0);
    }
  };
  render() {
    return (
      <div className="bet-container circled">
        <div className="col-xl-7 col-md-5">
          <div className="input-wrap">
            <img
              src={betIcon}
              alt='bet'
              className="currency-img"
            />
            <input
              type="text"
              value={this.state.input}
              onChange={e => this.setState({input: e.target.value})}
              onBlur={() => this.changeValue()}
            />
            <div className="currency-text">bet</div>
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
            onClick={() => this.changeValue(this.props.maxBet)}
          >
            max
          </div>
        </div>
      </div>
    );
  }
}
