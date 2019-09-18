import React from 'react';
import GameName from './GameName';
import Values from './Values';
import Bet from './Bet';
import Metamask from './Metamask';
import Chances from './Chances';
import Statistics from './Statistics';
import Header from '../Header';
import Footer from '../Footer';
import {connect} from 'react-redux';
import abi from '../../assets/abi';
import './style.sass';
import { gameContractAddress } from "../../utils";
import {getCurrentHolderIndex} from "../../store/action";

class Game extends React.Component {
    state = {
        bet: {
            maxBet: this.props.maxBet,
            money: 0.05,
            values: [],
            referrer: '',
            placed: false
        },
        chances: {
            chance: 0.5
        }
    };
    stateSetup = () => {
        switch (this.props.gameName) {
            case 'coin':
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
            case 'dice':
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
            case 'two-dice':
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
            case 'etheroll':
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
        }
        setTimeout(() => this.recalculateMaxBet(), 0);
    };
    isParametersLoaded = parameter => {
        let flag = true;
        for (let p in this.state.parameters)
            if (p !== parameter && p !== 'isLoaded')
                flag = flag && this.state.parameters[p];
        return flag;
    };
    componentDidMount() {
        this.stateSetup();
    }
    onBetChangeHandler = (bet, prevBet) => {
        if (isNaN(bet - '')) {
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
        bet = bet.toFixed(2) - '';
        this.setState({
            bet: {
                ...this.state.bet,
                money: bet
            }
        });
    };
    getValuesForTransaction = () => {
        switch (this.props.gameName) {
            case 'coin':
                return this.state.bet.values;
            case 'dice':
                return this.state.bet.values
                    .map(i => i - 1)
                    .sort((a, b) => (a > b ? 1 : -1));
            case 'two-dice':
                return this.state.bet.values
                    .map(i => i - 2)
                    .sort((a, b) => (a > b ? 1 : -1));
            case 'etheroll':
                const arr = [];
                for (let i = 0; i < this.state.bet.values[0]; i++) arr.push(i);
                return arr;
            default:
                return;
        }
    };
    getGameIndex = () => {
        switch (this.props.gameName) {
            case 'coin':
                return 0;
            case 'dice':
                return 1;
            case 'two-dice':
                return 2;
            case 'etheroll':
                return 3;
        }
    };
    isAddressValid = address => {
        // const web3 = new Web3(
        //   new Web3.providers.HttpProvider(
        //     'https://ropsten.infura.io/v3/cd4e5db67da54186bc711e2533424eb9'
        //   )
        // );
        // return web3.utils.isAddress(address);
    };
    recalculateMaxBet = () => {
        const chance = this.state.chances.chance;
        const maxWiningBet = this.props.maxBet;
        const maxBet = maxWiningBet * chance;
        let bet = this.state.bet.money;
        bet = Math.min(maxBet, bet);
        bet = bet.toFixed(2) - '';
        this.setState({bet: {...this.state.bet, maxBet, money: bet}});
    };
    onBetButtonClickHandler = () => {
        const contract = window.web3.eth.contract(abi).at(gameContractAddress);
        this.setState({...this.state, bet: {...this.state.bet, placed: true}});
        getCurrentHolderIndex(contract).then(
            idx => window.web3.eth.getAccounts((err, accounts) => {
                contract.placeBet.sendTransaction(
                    this.getGameIndex(),
                    this.getValuesForTransaction(),
                    window.web3.toWei(this.state.bet.money, 'ether'),
                    idx,
                    {
                        from: accounts[0],
                        value: window.web3.toWei(this.state.bet.money, 'ether'),
                    },
                    (err, txhash) => {
                        this.setState({
                            ...this.state,
                            bet: {...this.state.bet, placed: false}
                        });
                    }
                );
            })
        );
    };
    render() {
        return (
            <div>
                <Header isOnMain={false} />
                <div
                    className={
                        this.state.bet.placed ? 'active game-container' : 'game-container'
                    }
                >
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 col-lg-5 ofder-1 d-flex align-items-center flex-column">
                                <GameName gameName={this.props.gameName} />
                                <Values
                                    recalculateMaxBet={this.recalculateMaxBet}
                                    gameName={this.props.gameName}
                                    values={this.state.bet.values}
                                    onValueClick={this.props.onValueClickHandler.bind(this)}
                                />
                                {this.props.isLoaded && (
                                    <Bet
                                        lang={this.props.lang}
                                        bet={this.state.bet.money}
                                        onBetUpdated={this.onBetChangeHandler}
                                        minBet={this.props.minBet}
                                        maxBet={this.state.bet.maxBet}
                                    />
                                )}

                                <Metamask
                                    lang={this.props.lang}
                                    trustLink={this.props.trustLink}
                                    onButtonClick={this.onBetButtonClickHandler}
                                />
                            </div>
                            <div className="offset-lg-1 col-md-6 order-12 order-md-2 statistics-container">
                                <Statistics gameName={this.props.gameName} />
                            </div>
                            {this.props.isLoaded && (
                                <div className="col-12 order-md-12 order-2">
                                    <Chances
                                        lang={this.props.lang}
                                        bet={this.state.bet.money}
                                        coefficient={this.props.coefficient}
                                        chance={this.state.chances.chance}
                                        oraclizeFee={this.props.oraclizeFee}
                                        jackpot={1.23}
                                        luckyNumber={123}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
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
    minBet: state.parameters.minBet,
    maxBet: state.parameters.maxBet
}))(Game);
