import React from 'react';
import { textPage } from './texts';

// import price from "../../assets/details/price.png";
// import coins from "../../assets/details/coins.png";
// import balance from "../../assets/details/balance.png";
// import transaction from "../../assets/details/transaction.png";
import { connect } from 'react-redux';

class Details extends React.Component {
    render() {
        const { lang } = this.props;
        return (
            <div className="details-container">
                <div className="row">
                    <div className="col-xl-3 col-sm-6">
                        <div className="detail price circled">
                            <div className="detail-image" />
                            <div className="detail-name">
                                {textPage[lang].price[0]}
                                <span>(GET/ETH)</span>
                            </div>
                            <div className="detail-value">{(+this.props.price).toFixed(8)} ETH</div>
                            <div className="detail-second-value">({this.props.betDollarCourse.toFixed(6)} USD)</div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-sm-6">
                        <div className="detail coins circled">
                            <div className="detail-image" />
                            <div className="detail-name">{textPage[lang].price[1]}</div>
                            <div className="detail-value">{this.props.totalSupply} GET</div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-sm-6">
                        <div className="detail balance circled">
                            <div className="detail-image" />
                            <div className="detail-name">{textPage[lang].price[2]}</div>
                            <div className="detail-value">{this.props.balance} ETH</div>
                            <div className="detail-second-value">
                                ({(this.props.balance * this.props.ethDollarCourse).toFixed(2)} USD)
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-sm-6">
                        <div className="detail transaction circled">
                            <div className="detail-image" />
                            <div className="detail-name">{textPage[lang].price[3]}</div>
                            <div className="detail-value">{this.props.transactions}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(state => ({
    ethDollarCourse: state.courses.ethDollar,
    betDollarCourse: state.courses.getEth * state.courses.ethDollar,
    totalSupply: state.values.other.totalSupply,
    price: state.courses.getEth,
    balance: state.values.other.contractBalance,
    transactions: state.values.other.transactions,
    lang: state.lang,
}))(Details);
