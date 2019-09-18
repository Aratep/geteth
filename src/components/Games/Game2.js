import React from "react";
import GameName from "./GameName";
import Values from "./Game2/Values";
import Bet from "./Game2/Bet";
import Metamask from "./Game2/Metamask";
import Statistics from "./Game2/Statistics";
import Chances from "./Game2/Chances";
import Currencies from "./Game2/Currencies";
import Header from "../Header";
import Footer from "../Footer";
import { connect } from "react-redux";
import abi from "../../assets/abi";
import Payout from "./Game2/Payout";
import Coefficients from "./Game2/Coefficients";
import "./Game2/style.sass";
import "./style.sass";
import FlyingForm from "./Game2/FlyingForm";
import {gameContractAddress, helperServer} from "../../utils";
import {getCurrentHolderIndex} from "../../store/action";

class Game extends React.Component {
    state = {
        currency: "eth",
        flyingForm: {
            visible: false,
            text: `<h1>hello world</h1>`
        },
        bet: {
            maxBet: this.props.maxBet,
            money: 0.05,
            values: [],
            referrer: "",
            placed: false
        },
        chances: {
            chance: 0.5
        },
        balances: {
            eth: 0,
            bet: 0
        }
    };
    openFlyingForm = text => {
        this.setState({
            flyingForm: {
                text,
                visible: true
            }
        });
    };
    closeFlyingForm = () => {
        this.setState({
            flyingForm: {
                text: "",
                visible: false
            }
        });
    };
    changeCurrency = currency => {
        this.setState({
            currency
        });
    };
    stateSetup = () => {
        switch (this.props.gameName) {
            case "coin":
                this.setState({
                    chances: {
                        ...this.state.chances,
                        chance: 0.5
                    },
                    bet: {
                        ...this.state.bet,
                        values: [Math.random() > 0.5 ? 1 : 0]
                    }
                });
                break;
            case "dice":
                this.setState({
                    chances: {
                        ...this.state.chances,
                        chance: 0.5
                    },
                    bet: {
                        ...this.state.bet,
                        values: [1, 2, 3]
                    }
                });
                break;
            case "two-dice":
                this.setState({
                    bet: {
                        ...this.state.bet,
                        values: [2, 3, 4, 5, 6]
                    },
                    chances: {
                        ...this.state.chances,
                        chance: 0.4167
                    }
                });
                break;
            case "etheroll":
                this.setState({
                    chances: {
                        ...this.state.chances,
                        chance: 0.5
                    },
                    bet: {
                        ...this.state.bet,
                        values: [50]
                    }
                });
                break;
            default:
                break;
        }
        setTimeout(() => this.recalculateMaxBet(), 0);
    };
    calculatePayout = () =>
        (
            (this.state.bet.money * this.props.coefficient - this.props.jackpotFee) /
            this.state.chances.chance
        ).toFixed(3);
    isParametersLoaded = parameter => {
        let flag = true;
        for (let p in this.state.parameters)
            if (p !== parameter && p !== "isLoaded")
                flag = flag && this.state.parameters[p];
        return flag;
    };
    componentDidMount() {
        this.stateSetup();
        if (window.web3) {
            window.web3.eth.getAccounts((err, accounts) => {
                if (accounts.length)
                    window.web3.eth.getBalance(accounts[0], (err, bal) => {
                        let balances = {
                            ...this.state.balances,
                            eth: bal.c[0] / 10000
                        };
                        fetch(`${helperServer}/balanceOf?userAddress=${accounts[0]}`)
                            .then(res => res.json())
                            .then(({ balance }) => {
                                balances = {
                                    ...balances,
                                    bet: balance
                                };
                                this.setState({ balances });
                            });
                    });
            });
        }
    }
    onBetChangeHandler = (bet, prevBet) => {
        if (isNaN(+bet)) {
            this.setState({
                bet: {
                    ...this.state.bet,
                    money: prevBet
                }
            });
            return;
        }
        bet = Math.max(this.props.minBet, bet);
        bet = Math.min(this.state.bet.maxBet, bet);
        bet = bet.toFixed(3) - "";
        this.setState({
            bet: {
                ...this.state.bet,
                money: bet
            }
        });
    };
    getValuesForTransaction = () => {
        switch (this.props.gameName) {
            case "coin":
                return this.state.bet.values;
            case "dice":
                return this.state.bet.values
                    .map(i => i - 1)
                    .sort((a, b) => (a > b ? 1 : -1));
            case "two-dice":
                return this.state.bet.values
                    .map(i => i - 2)
                    .sort((a, b) => (a > b ? 1 : -1));
            case "etheroll":
                return [this.state.bet.values[0] - 1];
            default:
                return;
        }
    };
    getGameIndex = () => {
        switch (this.props.gameName) {
            case "coin":
                return 0;
            case "dice":
                return 1;
            case "two-dice":
                return 2;
            case "etheroll":
                return 3;
            default:
                return -1;
        }
    };
    recalculateMaxBet = () => {
        // const chance = this.state.chances.chance;
        // const maxWiningBet = this.props.maxBet;
        // const maxBet = maxWiningBet * chance;
        // let bet = this.state.bet.money;
        // bet = Math.min(maxBet, bet);
        // bet = bet.toFixed(3) - '';
        // this.setState({bet: {...this.state.bet, maxBet, money: bet}});
    };
    onBetButtonClickHandler = () => {
        const contract = window.web3.eth.contract(abi).at(gameContractAddress);
        this.setState({ ...this.state, bet: { ...this.state.bet, placed: true } });
        window.web3.eth.getAccounts((err, accounts) => {
            getCurrentHolderIndex(this.props.tokenContract).then(
                idx => {
                    console.log(
                        this.getGameIndex(),
                        this.getValuesForTransaction(),
                        0,  // window.web3.toWei(this.state.bet.money, 'ether'),
                        idx,
                        {
                            from: accounts[0],
                            value: window.web3.toWei(this.state.bet.money, 'ether'),
                        },
                        "betting"
                    );
                    contract.placeBet.sendTransaction(
                        this.getGameIndex(),
                        this.getValuesForTransaction(),
                        0,  // window.web3.toWei(this.state.bet.money, 'ether'),  === for token games ===
                        idx,
                        {
                            from: accounts[0],
                            value: window.web3.toWei(this.state.bet.money, 'ether'),
                        },
                        (err, txhash) => {
                            this.setState({
                                ...this.state,
                                bet: { ...this.state.bet, placed: false },
                                balances: {
                                    ...this.state.balances,
                                    eth: this.state.balances.eth - this.state.bet.money
                                }
                            });
                        }
                    );
                }
            );
        });
    };
    changeBetMoney = money => {
        this.setState({
            bet: {
                ...this.state.bet,
                money
            }
        });
    };
    render() {
        return (
            <div>
                <Header isOnMain={false} />
                <div
                    className={
                        this.state.bet.placed ? "active game-container" : "game-container"
                    }
                >
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-10 offset-xl-1 d-flex align-items-center flex-column">
                                <GameName
                                    openFlyingForm={this.openFlyingForm}
                                    gameName={this.props.gameName}
                                />
                                <div className="box">
                                    <Currencies
                                        changeCurrency={this.changeCurrency}
                                        active={this.state.currency}
                                    />
                                    <div className="game-container">
                                        <div className="row">
                                            <div className="col-md-8">
                                                <Bet
                                                    lang={this.props.lang}
                                                    minBet={0.01}
                                                    maxBet={
                                                        this.state.balances.eth
                                                            ? this.state.balances.eth - 0.001
                                                            : 100
                                                    }
                                                    money={this.state.bet.money}
                                                    changeBet={this.changeBetMoney}
                                                    currency={this.state.currency}
                                                    ethDollarCourse={this.props.ethDollarCourse}
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <Payout
                                                    jackpotFee={this.props.jackpotFee}
                                                    comission={(
                                                        (1 - this.props.coefficient) *
                                                        this.state.bet.money
                                                    ).toFixed(3)}
                                                    lang={this.props.lang}
                                                    payout={this.calculatePayout()}
                                                    currency={this.state.currency}
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12">
                                                <Coefficients
                                                    lang={this.props.lang}
                                                    coefficient={
                                                        (1 / this.state.chances.chance) *
                                                        this.props.coefficient
                                                    }
                                                    chance={this.state.chances.chance * 100}
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12">
                                                <Values
                                                    recalculateMaxBet={this.recalculateMaxBet}
                                                    gameName={this.props.gameName}
                                                    values={this.state.bet.values}
                                                    onValueClick={this.props.onValueClickHandler.bind(
                                                        this
                                                    )}
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12">
                                                <Metamask
                                                    openFlyingForm={this.openFlyingForm}
                                                    ethBalance={this.state.balances.eth}
                                                    betBalance={this.state.balances.bet}
                                                    lang={this.props.lang}
                                                    trustLink={this.props.trustLink}
                                                    onButtonClick={this.onBetButtonClickHandler}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="box" style={{ padding: "0", marginTop: 20 }}>
                                    <Chances
                                        gameName={this.props.gameName}
                                        lang={this.props.lang}
                                    />
                                </div>
                                <div className="box" style={{ padding: "0", marginTop: 20 }}>
                                    <Statistics gameName={this.props.gameName} />
                                </div>
                            </div>
                        </div>
                    </div>
                    {this.state.flyingForm.visible && (
                        <FlyingForm
                            close={this.closeFlyingForm}
                            text={this.state.flyingForm.text}
                        />
                    )}
                    <div className="metamask">
                        Please check your Metamask and confirm a pending transaction.
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default connect(state => ({
    lang: state.lang,
    isLoaded: state.parameters.isLoaded,
    coefficient: state.parameters.coefficient,
    oraclizeFee: state.parameters.oraclizeFee,
    jackpotFee: state.parameters.jackpotFee,
    minBet: state.parameters.minBet,
    maxBet: state.parameters.maxBet,
    ethDollarCourse: state.parameters.ethDollarCourse,
    tokenContract: state.contract,
}))(Game);
