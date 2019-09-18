import React from 'react';
import { connect } from 'react-redux';
import { textPage } from './texts';
import { shortAddr } from '../../utils';

class Referral extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            load_txs_list: true,
        };
    }

    renderTxs(item, index) {
        let amount = item.amount.toFixed(4);
        let date = new Date(item.timestamp * 1000);
        date = date.toLocaleString();

        return (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>
                    <b>{amount}</b>
                </td>
                <td>{date}</td>
                <td className="tx-link">
                    <a href={`https://etherscan.io/tx/${item.hash}`} target="_blank" rel="noopener noreferrer">
                        {shortAddr(item.hash, 8)}
                    </a>
                </td>
            </tr>
        );
    }

    render() {
        const { lang } = this.props;

        return (
            <div className="referral-container circled">
                <div className="row">
                    <div className="col-lg-5 ">
                        <div className="referral-part-wrap">
                            <h3>{textPage[lang].ref[0]}</h3>
                            <div className="input-wrap">
                                <input
                                    type="text"
                                    style={{ padding: 20 }}
                                    placeholder="Enter your referral link"
                                    value={
                                        window.web3 ? `${window.location.origin}?ref=${window.web3.eth.defaultAccount}` : ''
                                    }
                                    readOnly
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-7">
                        <div className="referral-part-wrap">
                            <h3>{textPage[lang].ref[1]}</h3>
                            <div>
                                <div className="question-wrap">
                                    <button className="txs_btn" onClick={() => this.setState({ active: !this.state.active })}>
                                        {this.state.active ?
                                            textPage[lang].transactionHide :
                                            (textPage[lang].transactionShow + ` (${this.props.referralsIncome.length})`)}
                                    </button>
                                    <br />
                                    <br />
                                </div>
                                {this.state.active && (
                                    <table className="tx-table">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Amount</th>
                                                <th>Date</th>
                                                <th>Recipient</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.load_txs_list ? (
                                                this.props.referralsIncome.map(this.renderTxs)
                                            ) : (
                                                <tr><td colSpan={4}><div>
                                                    <i className="fas fa-info-circle" />
                                                    {textPage[lang].ref[3]}
                                                </div></td></tr>
                                            )}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(state => ({
    lang: state.lang,
    referralsIncome: state.values.referralsIncome,
}))(Referral);
