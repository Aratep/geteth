import React from 'react';
import text from '../../../assets/text/betAndHistoryAndStat.json';

export default ({coefficient, chance, lang}) => (
  <div className="coefficients circled">
    <div className="coefficient-item">
      <div className="coefficient-item-key">{text[lang].labels.payout}</div>
      <div className="coefficient-item-value">{coefficient.toFixed(2)}x</div>
    </div>
    <div className="coefficient-item">
      <div className="coefficient-item-key">{text[lang].labels.winChance}</div>
      <div className="coefficient-item-value">{chance.toFixed(2)}%</div>
    </div>
  </div>
);
