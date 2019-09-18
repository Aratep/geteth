import React from "react";
import betIcon from '../../../assets/icons/dice/dice.png';
import metamask from "../../../assets/icons/metamask.png";
import trust from "../../../assets/icons/trust.png";
import text from "../../../assets/text/betAndHistoryAndStat.json";
import metamaskText from '../../../assets/text/metamask.json'
import Loader from "react-loader-spinner";

import currencies from "./currensienslist";
import { metamaskNetwork } from "../../../utils";

export default class Metamask extends React.Component {
  state = {
    installed: false,
    loggedIn: false,
    isLoaded: false,
    mainNet: false
  };
  logIn = () => {
    this.setState({ loggedIn: true });
  };
  componentWillMount() {
    if (window.web3) {
      this.setState({ installed: true });
      window.web3.version.getNetwork((err, type) => {
        if (type === metamaskNetwork) {
          this.setState({ mainNet: true });
          window.web3.eth.getAccounts((err, accounts) => {
            if (err !== null) alert("An error occurred: " + err);
            else if (accounts.length !== 0)
              this.setState({ isLoaded: true, loggedIn: true });
            else {
              this.setState({ isLoaded: true, loggedIn: false });
              let interval = setInterval(() => {
                window.web3.eth.getAccounts((err, accounts) => {
                  if (accounts.length !== 0) {
                    this.setState({ isLoaded: true, loggedIn: true });
                    clearInterval(interval);
                  }
                });
              }, 1000);
            }
          });
        } else this.setState({ mainNet: false, isLoaded: true });
      });
    }
  }
  render() {
    const { button } = text[this.props.lang].bet;
    const { installMetamask, useTrust, switchNet, unlock, metamaskFor } = metamaskText[this.props.lang];
    let content;
    if (!this.state.installed)
      content = (
        <div className="border">
          <div className="d-none d-sm-flex flex-column align-items-center justify-content-center">
            <div className="img-wrap">
              <img src={metamask} alt="metamask" />
            </div>
            <div className="message">{installMetamask}</div>

            <div className="extensions">
              <span className="text">{metamaskFor}&nbsp;</span>
              <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn" className="extension">
                <i className="fab fa-chrome" />&nbsp;
              </a>
              <a href="https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/" className="extension">
                <i className="fab fa-firefox" />&nbsp;
              </a>
              <a href="https://addons.opera.com/be/extensions/details/metamask/" className="extension">
                <i className="fab fa-opera" />&nbsp;
              </a>
            </div>
          </div>
          <a
            onClick={() => {
              window.dataLayer.push({ event: "send_trustwallet" });
            }}
            href={this.props.trustLink}
            className="d-flex d-sm-none flex-column align-items-center justify-content-center"
          >
            <div className="img-wrap">
              <img src={trust} alt="trust" />
            </div>
            <div className="message">{useTrust}</div>
          </a>
        </div>
      );
    else if (!this.state.isLoaded)
      content = (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ width: "100%", height: "100%" }}
        >
          <Loader type="TailSpin" color="#ff0000" height={50} width={50} />
        </div>
      );
    else if (!this.state.mainNet)
      content = (
          <div className="border">
            <div className="d-none d-sm-flex flex-column align-items-center justify-content-center">
              <div className="img-wrap">
                <img src={metamask} alt="metamask" />
              </div>

              <div className="message">{switchNet}</div>
            </div>
            <div className="d-flex d-sm-none flex-column align-items-center justify-content-center">
              <div className="img-wrap">
                <img src={trust} alt="trust" />
              </div>

              <div className="message">{switchNet}</div>
            </div>
          </div>
      );
    else if (!this.state.loggedIn)
      content = (
          <div className="border">
            <div className="img-wrap">
              <img src={metamask} alt="metamask" />
            </div>
            <div className="message">{unlock}</div>
          </div>
      );
    else {
      content = (
        <div className="button-and-balance">
          <div className="balance">
            <div className="currency-img-wrap">
              <img src={currencies.eth.img} className="currency-img" alt={currencies.eth.text} />
            </div>
            <div className="balance-value">
              {this.props.ethBalance.toFixed(3)}
            </div>
            <div className="currency-text">{currencies.eth.text}</div>
          </div>
          <button className="button" onClick={this.props.onButtonClick}>
            {button}
          </button>
          <div className="balance">
            <div
              className="question"
              onClick={() =>
                this.props.openFlyingForm(
                  this.props.lang === "rus"
                    ? "<p>100 бонусных токенов Bet начисляется за каждые 1 ETH оборота ваших ставок в игре</p>"
                    : "<p>100 Bet bonus tokens are credited for every 1 ETH turn of your bets in the game.</p>"
                )
              }
            >
              ?
            </div>
            <div className="currency-img-wrap">
              <img src={betIcon} className="currency-img" alt='bet' />
            </div>
            <div className="balance-value">{this.props.betBalance}</div>
            <div className="currency-text">bet</div>
          </div>
        </div>
      );
    }
    return <div className="metamask-container">{content}</div>;
  }
}
