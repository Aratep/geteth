import React from 'react';
import currencies from './currensienslist';
import text from '../../../assets/text/betAndHistoryAndStat.json';

export default ({currency, payout, lang, comission, jackpotFee}) => (
  <div className="payout circled">
    <img src={currencies[currency].img} className="currency-img" alt={currencies[currency].text} />
    <div className="payout-money">{payout}</div>
    <div className="currency-text">{currencies[currency].text}</div>
    <div className="label">{text[lang].labels.payoutOnWin}</div>
    <div className="details">
      <div className="detail">
          {text[lang].payouts.commission} <span>{comission} ETH</span>
      </div>
      <div className="detail">
          {text[lang].payouts.jackpot} <span>{jackpotFee} ETH</span>
      </div>
    </div>
  </div>
);
