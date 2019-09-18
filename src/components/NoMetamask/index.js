import React, {Component} from 'react';
import text from "../../assets/text/metamask.json";
import {connect} from "react-redux";

import {textPage} from "../Content/texts";
import {metamaskNetwork} from "../../utils";
import {fetchCourses} from "../../store/courses";
import {fetchValues} from "../../store/values";
import metamask from '../../assets/meta-popup.png';
import trust from '../../assets/trust1.png';
import './style.sass';

class NoMetamask extends Component {
    constructor() {
        super();

        this.state = {
            status: ""
        }
    }

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

    render() {
        const {status, lang} = this.props;
        let content;
        // console.log(status)

        switch (status) {
            case 'LOADING':
            case 'OK':
                return null;
            case 'NOT_INSTALLED':
                content = (
                    <div className="d-flex justify-content-center">
                        <div className="col-lg-7 col-md-10 col-sm-11 d-none d-sm-block">
                            <div className="img-wrap">
                                <img src={metamask} alt=""/>
                            </div>
                            <span className="full-description"
                                  style={{display: `${this.state.status !== "OK" ? "block" : "none"}`}}
                                  dangerouslySetInnerHTML={{__html: textPage[lang].calculatorGuide}}
                            />
                            <p>
                                {text[lang].installMetamask}
                            </p>
                            <div className="extensions">
                                <div className="text">{text[lang].metamaskFor}</div>
                                <a target="_blank" rel="noopener noreferrer"
                                   href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
                                   className="extension">
                                    <i className="fab fa-chrome"/>
                                </a>
                                <a target="_blank" rel="noopener noreferrer"
                                   href="https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/"
                                   className="extension">
                                    <i className="fab fa-firefox"/>
                                </a>
                                <a target="_blank" rel="noopener noreferrer"
                                   href="https://addons.opera.com/be/extensions/details/metamask/"
                                   className="extension">
                                    <i className="fab fa-opera"/>
                                </a>
                            </div>

                        </div>
                        <a
                            className="img-wrap d-flex d-sm-none flex-column align-items-center"
                            style={{width: '50%', maxWidth: 170, zIndex: 1}}
                            onClick={() => {
                                window.dataLayer.push({event: "send_trustwallet"});
                            }}
                            href="https://links.trustwalletapp.com/nFluMuZ7RU"
                        >
                            <img src={trust} alt=""/>
                            <p className=""
                               style={{display: `${this.state.status !== "OK" ? "block" : "none"}`, color: "#1CC738"}}
                               dangerouslySetInnerHTML={{__html: textPage[lang].calculatorGuide}}
                            />
                            <p>{text[lang].useTrust}</p>
                        </a>
                    </div>
                );
                break;
            case 'NOT_LOGGED_IN':
                content = (
                    <div className="d-flex justify-content-center">
                        <div className="col-lg-7 col-md-10 col-sm-11 d-none d-sm-block">
                            <div className="img-wrap">
                                <img src={metamask} alt=""/>
                            </div>
                            <span className="full-description"
                                  style={{display: `${this.state.status !== "OK" ? "block" : "none"}`}}
                                  dangerouslySetInnerHTML={{__html: textPage[lang].calculatorGuide}}
                            />
                            <p>{text[lang].unlock}</p>

                        </div>
                        <a
                            className="img-wrap d-flex d-sm-none flex-column align-items-center"
                            style={{width: '50%', maxWidth: 170, zIndex: 1}}
                            onClick={() => {
                                window.dataLayer.push({event: "send_trustwallet"});
                            }}
                            href="https://links.trustwalletapp.com/nFluMuZ7RU"
                        >
                            <img src={trust} alt=""/>
                            <p className=""
                               style={{display: `${this.state.status !== "OK" ? "block" : "none"}`, color: "#1CC738"}}
                               dangerouslySetInnerHTML={{__html: textPage[lang].calculatorGuide}}
                            />
                            <p>{text[lang].useTrust}</p>
                        </a>
                    </div>
                );
                break;
            case 'WRONG_NETWORK':
                content = (
                    <div className="d-flex justify-content-center">
                        <div className="col-lg-7 col-md-10 col-sm-11 d-none d-sm-block">
                            <div className="img-wrap">
                                <img src={metamask} alt=""/>
                            </div>
                            <p>{text[lang].switchNet}</p>
                        </div>
                        <div className="d-flex d-sm-none flex-column align-items-center">
                            <div className="img-wrap" style={{width: '50%', maxWidth: 170, zIndex: 1}}>
                                <img src={trust} alt=""/>
                            </div>
                            <p>{text[lang].switchNet}</p>
                        </div>
                    </div>
                );
                break;
            default:
                content = <div/>;
                break;
        }
        return (
            <div className="metamask-error language-ontop">
                <div className="container">
                    <div className="row d-flex justify-content-center align-items-center">
                        {content}
                    </div>
                </div>
            </div>
        )
    }

}

export default connect(
    state => ({
        lang: state.lang,
    }),
    dispatch => ({
        fetchEverything: () => {
            dispatch(fetchCourses());
            dispatch(fetchValues());
        }
    })
)(NoMetamask);
