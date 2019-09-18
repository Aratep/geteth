import React from "react";
import Navigation from "./Navigation";
import TicketsInfo from "./TicketsInfo";
import BuyTickets from "./BuyTickets";
import LotteryPot from "./LotteryPot";
import History from "./History";
import Prizes from "./Prizes";
import FlyingForm from "./FlyingForm";
import "./style.sass";
import Loader from "react-loader-spinner";
import {
  fetchLoteryInfo,
  changeLoteryFilter,
  buyTickets,
  updateLoteryBank
} from "../../store/action";
import { connect } from "react-redux";

class Exchange extends React.Component {
  state = {
    flyingFormMessage: ""
  };
  closeFlyingForm = () => {
    this.setState({
      flyingFormMessage: ""
    });
  };
  componentDidMount() {
    if (!this.props.fetched) this.props.fetchLoteryInfo();
    setInterval(() => this.props.updateLoteryBank(), 10000);
  }
  openFlyingForm = text => {
    this.setState({
      flyingFormMessage: text
    });
  };
  render() {
    console.log(this.props.lotteryTime);
    return this.props.fetched ? (
      <div className="exchange-container">
        {this.state.flyingFormMessage && (
          <FlyingForm
            close={this.closeFlyingForm}
            text={this.state.flyingFormMessage}
          />
        )}
        <div className="container">
          <div className="row">
            <div className="col-md-3 d-flex flex-column justify-content-between">
              <Navigation
                lang={this.props.lang}
                filter={this.props.filter}
                onNavItemClick={this.props.changeLoteryFilter}
              />
              <TicketsInfo
                lang={this.props.lang}
                yourTickets={this.props.yourTickets}
                totalTickets={this.props.totalTickets}
              />
            </div>
            <div className="col-lg-8 col-md-9">
              {this.props.filter === "pot" && (
                <LotteryPot
                  lotteryTime={this.props.lotteryTime + 24 * 3600 * 7000}
                  lang={this.props.lang}
                  potNumber={this.props.lastRoundNumber}
                  total={this.props.loteryBank}
                  openFlyingForm={this.openFlyingForm}
                />
              )}
              {this.props.filter === "buy" && (
                <BuyTickets
                  lang={this.props.lang}
                  buyTickets={this.props.buyTickets}
                  userTokens={this.props.yourTokens}
                />
              )}
              {this.props.filter === "prizes" && (
                <Prizes lang={this.props.lang} total={this.props.loteryBank} />
              )}
              {this.props.filter === "history" && <History />}
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ width: "100%", height: "100vh" }}
      >
        <Loader type="TailSpin" color="#ff0000" height={100} width={100} />
      </div>
    );
  }
}

export default connect(
  state => ({
    ...state.lotery,
    lang: state.lang,
    lotteryTime: state.parameters.lotteryTime
  }),
  dispatch => ({
    updateLoteryBank: () => dispatch(updateLoteryBank()),
    changeLoteryFilter: filter => dispatch(changeLoteryFilter(filter)),
    fetchLoteryInfo: () => dispatch(fetchLoteryInfo()),
    buyTickets: tickets => dispatch(buyTickets(tickets))
  })
)(Exchange);
