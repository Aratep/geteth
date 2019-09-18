import React from 'react';
import text from '../../assets/text/lotery.json';

export default ({yourTickets, totalTickets, lang}) => {
  const winChance = +totalTickets
    ? parseInt((yourTickets / totalTickets) * 100)
    : 0;
  return (
    <div className="order-1 order-md-2 tickets-info-container d-flex d-md-block justify-content-center">
      <div className="square tickets-info-item">
        <div className="tickets-info-item-value">{yourTickets}</div>
        <div className="tickets-info-item-description">
          {text[lang].ticketsInfo.yourTickets}
        </div>
      </div>
      <div className="square tickets-info-item">
        <div className="tickets-info-item-value">{winChance}%</div>
        <div className="tickets-info-item-description">
          {text[lang].ticketsInfo.winChance}
        </div>
      </div>
      <div className="square tickets-info-item">
        <div className="tickets-info-item-value">{Math.round(totalTickets)}</div>
        <div className="tickets-info-item-description">
          {text[lang].ticketsInfo.totalTickets}
        </div>
      </div>
    </div>
  );
};
