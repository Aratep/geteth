import React from "react";
import { NavLink } from "react-router-dom";
import { push } from 'connected-react-router';
import { connect } from "react-redux";
import Scrollchor from "react-scrollchor";

import logo from "../../assets/icons/logos/logo.png";
import exchangeLogo from "../../assets/icons/logos/exchange-logo.png";
import "./style.sass";
import Language from "./Language";
import ExchangeGamesToggler from "./ExchangeGamesToggler";
import text from "../../assets/text/header.json";
import telegram from "../../assets/icons/socials/telegram.png";
import twitter from "../../assets/icons/socials/twitter.png";
import email from "../../assets/icons/socials/email.png";
import discord from "../../assets/icons/socials/discord.png";
import exchangeTelegram from "../../assets/icons/exchange-socials/telegram.png";
import exchangeTwitter from "../../assets/icons/exchange-socials/twitter.png";
import exchangeEmail from "../../assets/icons/exchange-socials/email.png";
import exchangeDiscord from "../../assets/icons/exchange-socials/discord.png";
import links from "../../assets/text/footer.json";
import ThemeSwitcher from "./ThemeSwitcher";


const IconLinks = ({ fixed, lang, isOnExchange }) => {
  const { tchan, tchat, dis } = links[lang];
  const icons = isOnExchange ? [exchangeTelegram, exchangeTwitter, exchangeEmail, exchangeDiscord] :
                               [telegram, twitter, email, discord];
  return (
    <div
      className={
        fixed
          ? "d-xl-flex align-items-center flex-column d-none socials-container fixed"
          : "d-flex d-xl-none flex-column socials-container"
      }
    >
      <div className="d-flex flex-xl-column">
        <a className="icon" target="_blank" href={tchat} rel='noopener noreferrer'>
          <div
            className="social-wrap short"
            style={{
              backgroundImage: `url(${icons[0]})`
            }}
          />
          <div className="text">chat</div>
        </a>
        <a className="icon" target="_blank" href={tchan} rel='noopener noreferrer'>
          <div
            className="social-wrap short"
            style={{
              backgroundImage: `url(${icons[0]})`
            }}
          />
          <div className="text">channel</div>
        </a>
        <a className="icon" target="_blank" href={dis} rel='noopener noreferrer'>
          <div
            className="social-wrap"
            style={{
              backgroundImage: `url(${icons[3]})`
            }}
          />
        </a>
        <a className="icon" href="mailto:admin@geteth.io">
          <div
            className="social-wrap short"
            style={{
              backgroundImage: `url(${icons[2]})`
            }}
          />
        </a>
      </div>
      {isOnExchange ? '' : <ThemeSwitcher />}
    </div>
  );
};

const Menu = ({ lang, isOnExchange, goToIndex }) => (
  <div className="menu">
    {isOnExchange && (
      <NavLink to="/guarantees">
        {text[lang].guarantees}
      </NavLink>
    )}
    {isOnExchange && (
      <NavLink to="/risks">
        {text[lang].risks}
      </NavLink>
    )}
    {isOnExchange && (
      <a href='/#exchange-faq'>
        {text[lang].faq}
      </a>
    )}
    {!isOnExchange && (
        <NavLink to="/casino-faq">{text[lang].faq}</NavLink>
    )}
    {!isOnExchange && <NavLink to="/lottery">{text[lang].lotery}</NavLink>}
  </div>
);

class Header extends React.Component {
  state = {
    isOpened: false
  };
  render() {
    const { tchan, tchat } = links[this.props.lang];
    return (
      <div className={`${this.state.isOpened ? "is-opened" : ''} header-container`}>
        <div className="container">
          <div className="row">
            <div className="col-xl-2 col-8 d-flex justify-content-start align-items-center">
              <NavLink
                to={this.props.isOnExchange ? "/" : "/casino"}
                style={{ zIndex: 100 }}
                activeStyle={{ textDecoration: "none" }}
              >
                <div className="logo">
                  <img
                    src={this.props.isOnExchange ? exchangeLogo : logo}
                    alt="geteth"
                  />
                </div>
              </NavLink>
            </div>
            <div className="col-xl-10 col-4 d-xl-flex d-none justify-content-end align-items-center">
              <Menu
                isOnExchange={this.props.isOnExchange}
                lang={this.props.lang}
                goToIndex={this.props.goToIndex}
              />
              <ExchangeGamesToggler
                lang={this.props.lang}
                isOnExchange={this.props.isOnExchange}
              />
              <Language />
            </div>
            <div className="col-4 d-xl-none d-flex justify-content-end align-items-center">
              <div className="d-flex align-items-center mobile-container">
                <a className="icon" target="_blank" href={tchat} rel='noopener noreferrer'>
                  <div
                    className="social-wrap short"
                    style={{
                      backgroundImage: `url(${telegram})`
                    }}
                  />
                  <div className="text">chat</div>
                </a>
                <a className="icon" target="_blank" href={tchan} rel='noopener noreferrer'>
                  <div
                    className="social-wrap short"
                    style={{
                      backgroundImage: `url(${telegram})`
                    }}
                  />
                  <div className="text">channel</div>
                </a>
                <div
                  className="icon"
                  onClick={() =>
                    this.setState({ isOpened: !this.state.isOpened })
                  }
                >
                  <i className="fa fa-bars" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mobile">
          <Menu
            isOnExchange={this.props.isOnExchange}
            lang={this.props.lang}
            isOnMain={this.props.isOnMain}
            closeMenu={() => this.setState({ isOpened: false })}
            goToIndex={this.props.goToIndex}
          />
          <ExchangeGamesToggler
            lang={this.props.lang}
            isOnExchange={this.props.isOnExchange}
          />

          <IconLinks
            lang={this.props.lang}
            closeMenu={() => this.setState({ isOpened: false })}
            isOnExchange={this.props.isOnExchange}
          />
          <Language />
        </div>
        <IconLinks lang={this.props.lang} fixed={true} isOnExchange={this.props.isOnExchange} />
      </div>
    );
  }
}

export default connect(
    state => ({
        lang: state.lang
    }),
    dispatch => ({
        goToIndex: () => dispatch(push('/'))
    })
)(Header);
