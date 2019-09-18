import React from "react";
import { connect } from "react-redux";
import text from "../../assets/text/timer.json";
import { NavLink } from "react-router-dom";
import {helperServer} from "../../utils";
let interaval;

class DummyTimer extends React.Component {
  state = {
    seconds: 0,
    minutes: 0,
    hours: 0
  };
  constructor(props) {
    super(props);
    const { time } = props;
    const secondsLeft = (time - Date.now()) / 1000;
    const hours = parseInt(secondsLeft / 3600);
    const minutes = parseInt((secondsLeft - hours * 3600) / 60);
    const seconds = parseInt(secondsLeft - hours * 3600 - minutes * 60);
    setTimeout(() => this.setState({ seconds, minutes, hours }), 0);
    interaval = setInterval(() => {
      let { seconds, minutes, hours } = this.state;
      if (hours === 0 && seconds === 0 && minutes === 0) {
        clearInterval(interaval);
        return;
      }
      seconds--;
      if (seconds === -1) {
        seconds = 59;
        minutes--;
        if (minutes === -1) {
          minutes = 59;
          hours--;
        }
      }
      this.setState({ seconds, minutes, hours });
    }, 1000);
  }
  render() {
    const hours =
      this.state.hours >= 10
        ? this.state.hours.toString()
        : "0" + this.state.hours.toString();
    const minutes =
      this.state.minutes >= 10
        ? this.state.minutes.toString()
        : "0" + this.state.minutes.toString();
    const seconds =
      this.state.seconds >= 10
        ? this.state.seconds.toString()
        : "0" + this.state.seconds.toString();

    // return (
    //   <div className="launch-wrap d-none d-xl-flex">
    //     <div className="launch-text">{text[this.props.lang].launchText}</div>
    //     <div className="launch-timer">{text[this.props.lang].month}</div>
    //   </div>
    // );
    return (
      <div className="launch-wrap d-none d-xl-flex">
        <div className="launch-text">{text[this.props.lang].launchText}</div>
        <div className="launch-timer">{`${hours}:${minutes}:${seconds}`}</div>
      </div>
    );
  }
}

const EmptyTimer = ({ lang }) => (
  <div className="launch-wrap d-none d-xl-flex">
    <div className="launch-text">{text[lang].launchText}</div>
    <div className="launch-timer">{`00:00:00`}</div>
  </div>
);

class Form extends React.Component {
  state = {
    message: "",
    visible: false,
    email: {
      value: "",
      valid: false,
      touched: false
    },
    name: {
      value: "",
      valid: false,
      touched: false
    },
    telegram: {
      value: "",
      valid: true,
      touched: false
    }
  };
  onValueChange = (value, key) => {
    let valid = false;
    switch (key) {
      case "name":
        valid = value.length > 0;
        break;
      case "telegram":
        valid = value.length > 0;
        break;
      case "email":
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        valid = re.test(value.toLowerCase());
        break;
      default:
        valid = false;
        break;
    }
    this.setState({
      [key]: {
        ...this.state[key],
        value,
        valid
      }
    });
  };
  inputBluredHandler(key) {
    this.setState({
      [key]: {
        ...this.state[key],
        touched: true
      }
    });
  }
  submit = e => {
    e.preventDefault();
    const { serverError, notFilled, success, emailExists } = text[
      this.props.lang
    ].messages;
    if (
      !this.state.email.valid ||
      !this.state.name.valid ||
      !this.state.telegram.valid
    ) {
      this.setState({
        message: notFilled
      });
      return;
    }
    fetch(`${helperServer}/addUserToWhiteList`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: this.state.name.value,
        email: this.state.email.value,
        tel: this.state.telegram.value
      })
    }).then(res => {
      if (res.status === 200) {
        this.setState({
          message: success[0] + this.state.name.value + success[1],
          email: {
            valid: false,
            touched: false,
            value: ""
          },
          name: {
            valid: false,
            touched: false,
            value: ""
          },
          telegram: {
            valid: false,
            touched: false,
            value: ""
          }
        });
        setTimeout(() => {
          this.setState({
            visible: false,
            message: ""
          });
        }, 3000);
      } else if (res.status === 400) {
        this.setState({
          message: emailExists
        });
      } else this.setState({ message: serverError });
    });
  };
  render() {
    const { addButton, sendButton, whitelistTitle } = text[this.props.lang];
    return (
      <div>
        <NavLink to="/" className="button sp_notify_prompt">
          {this.props.str || addButton}
        </NavLink>
        <form
          className={this.state.visible ? "visible" : ""}
          onSubmit={this.submit}
        >
          <div
            className="close"
            onClick={() => this.setState({ visible: false })}
          >
            <i className="fa fa-times" />
          </div>
          <div className="title">{whitelistTitle}</div>
          {["email", "name", "telegram"].map(key => (
            <input
              type="text"
              value={this.state[key].value}
              placeholder={key}
              onBlur={() => this.inputBluredHandler(key)}
              onChange={e => this.onValueChange(e.target.value, key)}
              className={
                !this.state[key].valid && this.state[key].touched ? "red" : ""
              }
            />
          ))}

          <button
            className={
              !this.state.email.valid ||
              !this.state.name.valid ||
              !this.state.telegram.valid
                ? "disabled button"
                : "button"
            }
          >
            {sendButton}
          </button>
          <div className="message">{this.state.message}</div>
        </form>
      </div>
    );
  }
}

class Timer extends React.Component {
  render() {
    if (this.props.isLoaded) {
      if (this.props.lotteryTimer) {
        return (
          <div className="launch">
            {this.props.importantTime ? (
              <DummyTimer
                key={1}
                lang={this.props.lang}
                time={this.props.importantTime}
              />
            ) : (
              <EmptyTimer key={4} lang={this.props.lang} />
            )}
          </div>
        );
      }
      return (
        <div className="launch">
          <div className="launch-wrap d-none d-xl-flex">
            <div className="launch-text">
              {text[this.props.lang].launchText}
            </div>
            <div className="launch-timer">{text[this.props.lang].month}</div>
          </div>
          {!this.props.isOnExchange && (
            <Form str={this.props.str} lang={this.props.lang} />
          )}
        </div>
      );
    }
    return null;
  }
}
export default connect(state => ({
  lang: state.lang,
  isLoaded: state.parameters.isLoaded,
  time: state.parameters.time
}))(Timer);
