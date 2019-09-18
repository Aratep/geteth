import React from "react";
import { NavLink } from "react-router-dom";
import smallLogo from "../../assets/icons/logos/mini-logo.png";
import exchangeSmallLogo from "../../assets/icons/logos/exchange-mini-logo.png";
import { connect } from "react-redux";

import headers from "../../assets/text/footer.json";
import games from "../../assets/text/games.json";
import links from "../../assets/text/links.json";

class Footer extends React.Component {
  state = {
    network: "not connected",
    balance: 0
  };

  render() {
    const {
      arr,
      games: gamesString,
      reach,
      featured,
      block4,
      terms,
      tchat,
      tchan,
      dis
    } = headers[this.props.lang];
    const {
      coin: { name: coin },
      dice: { name: dice },
      "two-dice": { name: twoDice },
      etheroll: { name: etheroll }
    } = games[this.props.lang];
    return (
      <footer>
        <div className="container">
          <div className="row">
            <div className="offset-lg-1 col-lg-8">
              <div className="row d-flex justify-content-center">
                <div className="col-md-3  col-6 d-flex flex-column">
                  <div className="title">{gamesString}</div>
                  <NavLink to="/getcoin">{coin}</NavLink>
                  <NavLink to="/getdice">{dice}</NavLink>
                  <NavLink to="/get2dice">{twoDice}</NavLink>
                  <NavLink to="/getroll">{etheroll}</NavLink>
                </div>

                <div className="col-md-3 right col-6 d-flex flex-column">
                  <div className="title">{reach}</div>
                  <a target="_blank" href={tchat} rel='noopener noreferrer'>
                    Telegram CHAT
                  </a>
                  <a target="_blank" href={tchan} rel='noopener noreferrer'>
                    Telegram CHANNEL
                  </a>
                  <a target="_blank" href={dis} rel='noopener noreferrer'>
                    Discord
                  </a>
                  <a target="_blank" href="https://github.com/GetETH" rel='noopener noreferrer'>
                    Github
                  </a>
                </div>
                <div className="col-md-3   col-6 d-flex flex-column">
                  <div className="title">{featured}</div>
                  <a
                    target="_blank"
                    href="https://etherscan.io/address/0x75eee2b5ffea02f1e14e6a1c40bd30ca94cff975"
                    rel='noopener noreferrer'
                  >
                    Casino Contract
                  </a>
                  <a
                    target="_blank"
                    href="https://etherscan.io/address/0x1b08e098c33e0b2f51997cf95a32bc52dd5059cc"
                    rel='noopener noreferrer'
                  >
                    Exchange Contract
                  </a>
                  <a target="_blank" href={ links.incryptoPDF } rel='noopener noreferrer'>
                    Security Audit
                  </a>
                  <a target="_blank" href="https://dappradar.com/app/1442/geteth-bet" rel='noopener noreferrer'>
                    DappRadar
                  </a>
                </div>
                <div className="col-md-3  right col-6 d-flex  flex-column">
                  <div className="title">{block4}</div>
                  <NavLink to="/casino">Casino</NavLink>
                  <NavLink to="/">Exchange</NavLink>
                  <NavLink to="/disclaimer" target="_blank">
                    Disclaimer
                  </NavLink>
                  <NavLink to="/lottery">Lottery</NavLink>
                </div>
              </div>
            </div>
            <div className="col-3 d-lg-flex d-none align-items-center justify-content-center flex-column">
              <div className="logo">
                <img
                  src={this.props.isOnExchange ? exchangeSmallLogo : smallLogo}
                  alt=""
                />
              </div>
              <p>
                ©2019 GETETH <br /> {arr}.
                <br />{" "}
                <NavLink
                  target="_blank"
                  to="/disclaimer"
                  style={{ fontSize: 10, color: "#aaa" }}
                >
                  {terms}
                </NavLink>
              </p>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default connect(state => ({
  lang: state.lang
}))(Footer);
