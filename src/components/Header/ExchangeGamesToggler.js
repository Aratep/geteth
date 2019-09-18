import React from "react";
import { NavLink } from "react-router-dom";
import text from "../../assets/text/header.json";

const ExchangeGamesToggler = ({ isOnExchange, lang }) => {
  return (
    <NavLink
      to={isOnExchange ? "/casino" : "/"}
      className="exchange-games-toggler"
    >
      <div className={isOnExchange ? "nav active" : "nav"}>
        {text[lang].exchange}
      </div>
      <div className="circle-container">
        <div className={`circle ${!isOnExchange && "exchange"}`} />
      </div>
      <div className={!isOnExchange ? "nav active" : "nav"}>
        {text[lang].casino}
      </div>
    </NavLink>
  );
};

export default ExchangeGamesToggler;
