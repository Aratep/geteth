import React from 'react';
import text from '../../assets/text/description.json';

const Winner = ({address, win}) => (
  <div className="winner">
    <div className="row">
      <div className="col d-flex justify-content-center align-items-center">
        <a
          target="_blank"
          href={'https://etherscan.io/address/' + address}
          className="link"
          rel='noopener noreferrer'
        >
          {address}
        </a>
        <div className="win">
          {win}
          <span>ETH</span>
        </div>
      </div>
    </div>
  </div>
);

export default class Statistics extends React.Component {
  render() {
    const statPhrases = text[this.props.lang].statistics;
    return (
      <div>
        <div className="statistics-container">
          <div className="container">
            <div className="row">
              <div style={{marginTop: 30}} className="col-lg-4 col-sm-6">
                <div className="statistic-item-wrap">
                  <div className="text">{statPhrases.wagers}</div>
                  <div className="number">
                    {this.props.totalBets.toFixed(2)} <span>ETH</span>
                  </div>
                  <div className="text">
                    {this.props.numberOfBets} {statPhrases.bets}
                  </div>
                </div>
              </div>

              <div style={{marginTop: 30}} className="col-lg-4 col-sm-6">
                <div className="statistic-item-wrap">
                  <div className="text">all time</div>
                  <div className="number">
                    {this.props.totalEth} <span>ETH</span>
                  </div>
                  <div className="number">
                    {this.props.totalDollars} <span>USD</span>
                  </div>
                </div>
              </div>

              <div style={{marginTop: 30}} className="col-lg-4">
                <div className="statistic-item-wrap">
                  <div className="text">{statPhrases.topWinners}</div>
                  <Winner
                    address={this.props.max[0].winner}
                    win={+this.props.max[0].win.toFixed(2)}
                  />
                  <Winner
                    address={this.props.max[1].winner}
                    win={+this.props.max[1].win.toFixed(2)}
                  />
                  <Winner
                    address={this.props.max[2].winner}
                    win={+this.props.max[2].win.toFixed(2)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="statistics-container disabled">
          <div className="lock">
            <i className="fas fa-lock" />
          </div>
          <div className="container">
            <div className="row">
              <div style={{marginTop: 30}} className="col-lg-4 col-sm-6">
                <div className="statistic-item-wrap">
                  <div className="text">24h wagers</div>
                  <div className="number">
                    322 <span>BET</span>
                  </div>
                  <div className="text">2921 bets</div>
                </div>
              </div>

              <div style={{marginTop: 30}} className="col-lg-4 col-sm-6">
                <div className="statistic-item-wrap">
                  <div className="text">Recent jackpot</div>
                  <div className="number">
                    42<span>BET</span>
                  </div>
                  <div className="text">Won by 0x0wd012</div>
                </div>
              </div>

              <div style={{marginTop: 30}} className="col-lg-4">
                <div className="statistic-item-wrap">
                  <div className="text">24h top winners</div>
                  <Winner address="0xas2423" win="144.21" />
                  <Winner address="0xldkf23" win="3.27" />
                  <Winner address="0x20do3k" win="2.23" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/*
<div style={{marginTop: 30}} className="col-lg-4 col-sm-6">
{this.props.lastLotery != null ? (
	<div className="statistic-item-wrap">
		<div className="text">{statPhrases.recentJackpot}</div>
		<div className="number">
			{this.props.lastLotery.win} <span>ETH</span>
		</div>
		<div
			className="text"
			style={{overflow: 'hidden', textOverflow: 'ellipsis'}}
		>
			{statPhrases.wonBy} {this.props.lastLotery.winner}
		</div>
	</div>
) : (
	<div className="statistic-item-wrap">
		<div
			className="d-flex align-items-center justify-content-center"
			style={{
				width: '100%',
				height: '100%',
				textAlign: 'center'
			}}
		>
			There was no lottery yet
		</div>
	</div>
)}
</div>
 */
