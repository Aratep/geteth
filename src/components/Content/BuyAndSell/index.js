import React from 'react';
import Card from './Card';
import { connect } from 'react-redux';
import { textPage } from '../texts';
import { getCurrentHolderIndex } from "../../../store/action";

class BuyAndSell extends React.Component {
    buy = eth => {
        const ref = new URL(window.location.href).searchParams.get('ref');
        if (eth)
            this.props.contract.buyTokens.sendTransaction(
                window.web3.isAddress(ref) ? ref : '0x0',
                {
                    from: window.web3.eth.defaultAccount,
                    value: window.web3.toWei(eth),
                },
                (err, txhash) => {
                    console.log('buy success', txhash);
                },
            );
    };
    sell = get => {
        if (get)
            getCurrentHolderIndex(this.props.contract).then(
                idx => this.props.contract.sellTokens.sendTransaction(
                    window.web3.toWei(get, 'ether'),
                    idx,
                    {
                        from: window.web3.eth.defaultAccount,
                    },
                    (err, txhash) => console.log('buy success', txhash),
                )
            );
    };
    render() {
        // const { courses } = this.props;
        const { lang } = this.props;

        return (
            <div className="buy-and-sell-container">
                <div className="row">
                    <Card
                        type="buy"
                        buttonText={textPage[lang].buying[3]}
                        enrollmentCurrency="GET"
                        currency="ETH"
                        headerText={textPage[lang].buying[0]}
                        fee={this.props.percents.buy}
                        max={this.props.balance.eth}
                        calculatePayout={
                            eth => {
                                let price = Number(this.props.courses.getEth);
                                let tokens = 0;
                                while (eth > price) {
                                    eth -= price;
                                    tokens++;
                                    price += 10e-9;
                                }
                                return Math.floor(tokens);
                            }
                        }
                        action={this.buy}
                        dollarCourse={this.props.courses.ethDollar}
                        enrollmentSigns={0}
                    />
                    <Card
                        isSell
                        type="sell"
                        buttonText={textPage[lang].selling[1]}
                        headerText={textPage[lang].selling[0]}
                        enrollmentCurrency="ETH"
                        currency="GET"
                        calculatePayout={
                            get => {
                                let eth = 0;
                                let price = Number(this.props.courses.getEth);
                                for (let i=0; i<get; i++) {
                                    eth += price;
                                    price -= 10e-9;
                                }
                                return eth * .95;
                            }
                        }
                        fee={this.props.percents.sell}
                        max={this.props.balance.get}
                        course={this.props.courses.getEth}
                        action={this.sell}
                        dollarCourse={this.props.courses.getEth * this.props.courses.ethDollar}
                        enrollmentSigns={3}
                    />
                    <div className='wallets-warning'>{textPage[lang].walletsWarning}</div>
                </div>
            </div>
        );
    }
}

export default connect(state => ({
    percents: state.percents,
    balance: state.values.balance,
    contract: state.contract,
    courses: state.courses,
    totalSupply: state.values.other.totalSupply,
    lang: state.lang,
}))(BuyAndSell);
