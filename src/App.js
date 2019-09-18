import React, {Component} from "react";
import { Route, Switch, NavLink } from "react-router-dom";
import {connect} from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Coin from "./navigation/Coin";
import Etheroll from "./navigation/Etheroll";
import { exchangeLightThemeRoutes } from './utils';
import Main from "./navigation/Main";
import Dice from "./navigation/Dice";
import TwoDice from "./navigation/TwoDice";
import Disclaimer from "./navigation/Disclaimer";
import FAQCasino from "./components/FAQcasino";
import {fetchParameters} from "./store/action";
import "./app.sass";
import "./bootstrap-grid.min.css";
import Lottery from "./navigation/Lottery";
import IndexPage from './components/Index';
import Component404 from "./components/404";
import cookiesText from "./assets/text/cookies.json";
import Background from "./Background";
import Guarantees from "./navigation/Guarantees";
import Fraud from "./navigation/Fraud";


const CookiesToast = ({lang}) => (
    <div className="d-flex flex-column justify-content-center align-items-center">
        <div style={{textAling: "center"}}>
            {cookiesText[lang].text[0]}{" "}
            <NavLink to="/disclaimer">{cookiesText[lang].text[1]}</NavLink>
        </div>
        <button>OK</button>
    </div>
);

class App extends Component {
    componentDidMount() {
        if (window.localStorage.getItem("isCookiesPolicyAgreed") == null) {
            toast(<CookiesToast lang={this.props.lang}/>, {
                onClose: () =>
                    window.localStorage.setItem("isCookiesPolicyAgreed", "agreed"),
                autoClose: false,
                closeButton: false,
                position: toast.POSITION.BOTTOM_LEFT,
                closeOnClick: true
            });
        }
        this.props.fetchParameters();
    }

    render() {
        const indexPage = exchangeLightThemeRoutes.includes(window.location.pathname);
        return (
            <div className={`app-container ${this.props.theme} ${indexPage ? 'index' : ''}`}>
                <div>
                    <Route component={Background}/>
                    <Switch>
                        <Route path="/" exact component={IndexPage}/>
                        <Route path="/casino" component={Main}/>
                        <Route path="/getcoin" component={Coin}/>
                        <Route path="/getroll" component={Etheroll}/>
                        <Route path="/getdice" component={Dice}/>
                        <Route path="/get2dice" component={TwoDice}/>
                        <Route path="/lottery" component={Lottery}/>
                        <Route path="/casino-faq" component={FAQCasino}/>
                        <Route path="/disclaimer" component={Disclaimer}/>
                        <Route path="/guarantees" component={Guarantees}/>
                        <Route path="/risks" component={Fraud}/>
                        <Route path="*" exact={true} render={() => {
                            if (this.props.context) this.props.context.error_404 = true;
                            return <Component404 />;
                        }}/>
                    </Switch>
                </div>
                <ToastContainer/>
            </div>
        );
    }
}

export default connect(
    state => ({
        lang: state.lang,
        theme: state.theme
    }),
    dispatch => ({
        fetchParameters: () => dispatch(fetchParameters())
    })
)(App);
