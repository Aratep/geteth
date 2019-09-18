import React from 'react';
import {connect} from 'react-redux';
import {changeCurrentRoundNumber} from '../../store/action';
import text from '../../assets/text/lotery.json';

class History extends React.Component {
  render() {
    const {history, currentRoundNumber, changeCurrentRoundNumber} = this.props;
    const {
      header: {user, winPrize, ticketNumber, ownedRatio},
      winner,
      round,
      prize
    } = text[this.props.lang].history;
    return currentRoundNumber !== 0 ? (
      <div className="exchange-item history">
        <div className="title">history</div>

        <div className="history-top">
          <div className="round">
            {round[0]} {currentRoundNumber} {round[1]}
          </div>
          <div className="winner">{winner}</div>
          <div className="control">
            <div
              onClick={() => changeCurrentRoundNumber(currentRoundNumber - 1)}
              className="chevron"
            >
              <i class="fas fa-chevron-left" />
            </div>
            <div className="ticket-wrap">
              <div className="ticket">
                <div className="ticket-value">
                  {history.ready ? (
                    <a href={'https://etherscan.io/address/' + history.winners[0].user} target="_blank" rel='noopener noreferrer'>
                      {history.winners[0].user}
                    </a>
                  ) : (
                    ' '
                  )}
                </div>
              </div>
            </div>
            <div onClick={() => changeCurrentRoundNumber(currentRoundNumber + 1)} className="chevron">
              <i className="fas fa-chevron-right" />
            </div>
          </div>
          <div className="prize">
            {history.ready ? `${prize}: ${history.winners[0].prize} ETH` : ' '}
          </div>
        </div>
        <div className="history-bottom">
          <div className="table-wrap">
            <div className="winner">
              <div className="row">
                <div className="col-1">
                  <div className="row">
                    <div className="col-12">#</div>
                  </div>
                </div>
                <div className="col-11">
                  <div className="row">
                    <div className="col-3">{user}</div>
                    <div className="col-3">{winPrize}</div>
                    <div className="col-3">{ticketNumber}</div>
                    <div className="col-3">{ownedRatio}</div>
                  </div>
                </div>
              </div>
            </div>
            {history.ready
              ? history.winners.map((winner, i) => (
                  <Winner number={i + 1} {...winner} />
                ))
              : [1, 2, 3, 4, 5].map(() => <Winner empty={true} />)}
          </div>
        </div>
      </div>
    ) : (
      <div
        className="d-flex align-items-center justify-content-center"
        style={{height: '100%', width: '100%'}}
      >
        <h1 style={{textAlign: 'center'}}>No history yet</h1>
      </div>
    );
  }
}

const Winner = ({number, user, prize, ticketsNumber, ownedRatio, empty}) =>
  !empty ? (
    <div className="winner">
      <div className="row">
        <div className="col-1">
          <div className="row">
            <div className="col-12">{number}</div>
          </div>
        </div>
        <div className="col-11">
          <div className="row">
            <div className="col-3">
              <a href={'https://etherscan.io/address/' + user} target="_blank" rel='noopener noreferrer'>
                {user}
              </a>
            </div>
            <div className="col-3">{prize} ETH</div>
            <div className="col-3">{ticketsNumber}</div>
            <div className="col-3">{ownedRatio}%</div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="winner">
      <div className="row">
        <div className="col-1">
          <div className="row">
            <div className="col-12"> </div>
          </div>
        </div>
        <div className="col-11">
          <div className="row">
            <div className="col-3"> </div>
            <div className="col-3"> </div>
            <div className="col-3"> </div>
            <div className="col-3"> </div>
          </div>
        </div>
      </div>
    </div>
  );

export default connect(
  state => ({
    history: state.lotery.history[state.lotery.history.currentRoundNumber],
    currentRoundNumber: state.lotery.history.currentRoundNumber,
    lang: state.lang
  }),
  dispatch => ({
    changeCurrentRoundNumber: roundNumber =>
      dispatch(changeCurrentRoundNumber(roundNumber))
  })
)(History);
