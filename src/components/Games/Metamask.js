import React from 'react';
import metamask from '../../assets/icons/metamask.png';
import trust from '../../assets/icons/trust.png';
import text from '../../assets/text/betAndHistoryAndStat.json';
import Loader from 'react-loader-spinner';
import { metamaskNetwork } from "../../utils";

export default class Metamask extends React.Component {
  state = {
    installed: false,
    loggedIn: false,
    isLoaded: false,
    mainNet: false
  };
  logIn = () => {
    this.setState({loggedIn: true});
  };
  componentWillMount() {
    if (window.web3) {
      this.setState({installed: true});
      window.web3.version.getNetwork((err, type) => {
        if (type === metamaskNetwork) {
          this.setState({mainNet: true});
          window.web3.eth.getAccounts((err, accounts) => {
            console.log(accounts, 'accs');
            if (err != null) alert('An error occurred: ' + err);
            else if (accounts.length != 0)
              this.setState({isLoaded: true, loggedIn: true});
            else {
              this.setState({isLoaded: true, loggedIn: false});
              let interval = setInterval(() => {
                window.web3.eth.getAccounts((err, accounts) => {
                  if (accounts.length != 0) {
                    this.setState({isLoaded: true, loggedIn: true});
                    clearInterval(interval);
                  }
                });
              }, 1000);
            }
          });
        } else this.setState({mainNet: false, isLoaded: true});
      });
    }
  }
  render() {
    const {
      button,
      messages: {installMetamask, useTrust, switchTo, logIn}
    } = text[this.props.lang].bet;
    let content;
    if (!this.state.installed)
      content = (
        <div className="border">
          <a
            href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en"
            className="d-none d-sm-flex flex-column align-items-center justify-content-center"
          >
            <div className="img-wrap">
              <img src={metamask} alt="metamask" />
            </div>
            <div className="message">{installMetamask}</div>
          </a>
          <a
            href={this.props.trustLink}
            className="d-flex d-sm-none flex-column align-items-center justify-content-center"
          >
            <div className="img-wrap">
              <img src={trust} alt="metamask" />
            </div>
            <div className="message">{useTrust}</div>
          </a>
        </div>
      );
    else if (!this.state.isLoaded)
      content = (
        <Loader type="TailSpin" color="#ff0000" height={50} width={50} />
      );
    else if (!this.state.mainNet)
      content = (
        <div className="border">
          <div className="d-none d-sm-flex flex-column align-items-center justify-content-center">
            <div className="img-wrap">
              <img src={metamask} alt="metamask" />
            </div>

            <div className="message">{switchTo}</div>
          </div>
          <div className="d-flex d-sm-none flex-column align-items-center justify-content-center">
            <div className="img-wrap">
              <img src={trust} alt="metamask" />
            </div>

            <div className="message">{switchTo}</div>
          </div>
        </div>
      );
    else if (this.state.installed && !this.state.loggedIn)
      content = (
        <div className="border">
          <div className="img-wrap">
            <img src={metamask} alt="metamask" />
          </div>
          <div className="message">{logIn}</div>
        </div>
      );
    else
      content = (
        <div>
          <button className="button" onClick={this.props.onButtonClick}>
            {button}
          </button>
        </div>
      );
    return <div className="metamask-container">{content}</div>;
  }
}
