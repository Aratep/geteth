import React from 'react';
import text from '../../assets/text/lotery.json';

const Prize = ({index, prize, lang}) => (
  <div className="col-sm-6 d-flex align-items-center flex-column">
    <div className="prize-index">
      #{index} {text[lang].prizes.prize}
    </div>
    <div className="ticket-wrap">
      <div className="ticket">
        <div className="ticket-value">
          {prize.toFixed(4)} <span>ETH</span>
        </div>
      </div>
    </div>
  </div>
);

export default ({total, lang}) => {
  const coefficients = [0.5, 0.25, 0.12, 0.08, 0.05];
  const prizes = coefficients.map(coefficient => coefficient * total);
  return (
    <div className="prizes exchange-item">
      <div className="title">Prizes</div>
      <div className="row">
        <div className="offset-md-2 col-md-8 col-sm-6 offset-sm-3 d-flex justif-content-center align-items-ceter flex-column">
          <div className="prize-index">#1 {text[lang].prizes.prize}</div>
          <div className="ticket-wrap">
            <div className="first ticket">
              <div className="ticket-value">
                {prizes[0].toFixed(4)} <span>ETH</span>
              </div>
            </div>
          </div>
        </div>
        {prizes
          .filter((prize, i) => i !== 0)
          .map((prize, i) => (
            <Prize index={i + 2} lang={lang} prize={prize} />
          ))}
      </div>
    </div>
  );
};
