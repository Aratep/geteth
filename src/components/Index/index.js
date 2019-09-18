import React, {Component} from "react";
import NoMetamask from "../NoMetamask";
import Header from "../Header";
import Content from "../Content";
import InvestTicker from "../Content/InvestTicker";
import Footer from "../Footer";
import {connect} from "react-redux";
import {fetchCourses} from "../../store/courses";
import "./style.sass";
import {fetchValues} from "../../store/values";
import {metamaskNetwork} from "../../utils";
import Meta from "../Meta";

class App extends Component {
    state = {
        status: "LOADING"
    };

    componentWillMount() {
        if (!window.web3) {
            this.setState({
                status: "NOT_INSTALLED"
            });
            return;
        }
        window.web3.eth.getAccounts((err, accs) => {
            if (accs[0]) {
                window.web3.version.getNetwork((err, network) => {
                    if (network === metamaskNetwork) {
                        this.setState({
                            status: "OK"
                        });
                        this.initData();
                    } else {
                        this.setState({
                            status: "WRONG_NETWORK"
                        });
                    }
                });
            } else {
                this.setState({
                    status: "NOT_LOGGED_IN"
                });
            }
        });
    }

    initData() {
        setInterval(this.props.fetchEverything, 20 * 1000);
        this.props.fetchEverything();
    }

    componentWillUnmount() {
        const el = document.getElementById('yt-widget');
        el && el.setAttribute('data-theme', 'dark');
    }

    render() {
        const el = document.getElementById('yt-widget');
        el && el.setAttribute('data-theme', 'light');
        return (
            <div className='index-page-container'>
                <NoMetamask status={this.state.status}/>
                <div className={`${this.state.status !== "OK" ? "blur" : ""} content`}>
                    <Header isOnExchange={true} isOnMain={true}/>
                    <Content/>
                    <Footer isOnExchange={true}/>
                    {this.state.status === 'OK' ? <InvestTicker/> : <div/>}
                </div>
                <Meta page='index'/>
            </div>
        );
    }
}

export default connect(
    state => ({
        lang: state.lang
    }),
    dispatch => ({
        fetchEverything: () => {
            dispatch(fetchCourses());
            dispatch(fetchValues());
        }
    })
)(App);
