import React from 'react';
import text from '../../assets/text/betAndHistoryAndStat.json';

export default ({
  chance,
  coefficient,
  bet,
  oraclizeFee,
  jackpot,
  luckyNumber,
  lang
}) => {
  const moneyAfterPercent = bet * coefficient;
  const moneyAfterFee = moneyAfterPercent - oraclizeFee;
  let winningMoney = moneyAfterFee / chance;
  winningMoney = Math.floor(winningMoney * 1000) / 1000;
  const multiplicator = winningMoney / bet;
  const {
    chance: chanceString,
    multiplicator: multiplicatorString,
    description: descriptionString
  } = text[lang].statistics;
  return (
    <div className="chance-container">
      <div className="row">
        <div className="col-md-4 col-sm-6">
          <div className="chance-item">
            <div className="title">{chanceString}</div>
            <div className="value">{(chance * 100).toFixed(2)}%</div>
          </div>
        </div>
        <div className="col-md-4 col-sm-6">
          <div className="chance-item">
            <div className="title">{multiplicatorString}</div>
            <div className="value">{multiplicator.toFixed(2)}x</div>
            <div className="description">
              {descriptionString[0]} {winningMoney.toFixed(3)}ETH
              <br />
              <span style={{fontSize: 12}}>
                {(bet - moneyAfterFee).toFixed(3)}ETH {descriptionString[1]}
              </span>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-sm-6">
          <div className="chance-item">
            <div className="title">Jackpot contains</div>
            <div className="value">{jackpot}ETH</div>
            <div className="description">Lucky number is {luckyNumber}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
