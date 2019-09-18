import React from 'react';
import Forms from './Forms/index';
import {textPage} from './texts';
import {connect} from 'react-redux';

const Control = ({currency, active, changeCurrency}) => (
    <div onClick={() => {
        changeCurrency(currency)
    }} className={`control ${active === currency ? 'active' : ''}`}>
        {currency}
    </div>
);

class Statistics extends React.Component {
    state = {
        activeCurrency: 'eth',
        coefficient: 1,
        activeForm: '',
        decimal: 4,
    };

    changeCurrency = newCurrency => {
        switch (newCurrency) {
            case 'usd':
                if (this.props.ethDollar && this.props.getEth) {
                    this.setState({
                        activeCurrency: newCurrency,
                        coefficient: this.props.ethDollar,
                        decimal: 2,
                    });
                    return;
                }
                break;
            case 'eth':
                if (this.props.getEth) {
                    this.setState({
                        activeCurrency: newCurrency,
                        coefficient: 1,
                        decimal: 4,
                    });
                    return;
                }
                break;
            default:
                this.setState({
                    activeCurrency: newCurrency,
                    coefficient: 1,
                    decimal: 4,
                });
                return;
        }
    };

    openForm = form => {
        this.setState({
            activeForm: form,
        });
    };
    closeForm = () => {
        this.setState({
            activeForm: '',
        });
    };

    render() {
        const {lang} = this.props;

        return (
            <div className="statistics-container">
                <Forms form={this.state.activeForm} closeForm={this.closeForm}/>
                <div className="row d-flex no-gutters">
                    <div className="col-12">
                        <div className="controls">
                            {['usd', 'eth'].map(currency => {
                                return <Control
                                    changeCurrency={this.changeCurrency}
                                    active={this.state.activeCurrency}
                                    currency={currency}
                                    key={`currency-${currency}`}
                                />
                            })}
                        </div>
                    </div>
                    <div className="col-xl col-md-6 " style={{marginBottom: 20}}>
                        <div className="statistics-item balance">
                            <div className="statistics-item-header ">{textPage[lang].balance}</div>
                            <div className="statistics-item-content">
                                <div className="bet-balance">{Math.floor(this.props.balance)} GET</div>
                                <div className="eth-balance">
                                    {(this.props.balance * this.props.getEth).toFixed(4)} ETH
                                </div>
                                <div className="token-price">{textPage[lang].priceTitle}</div>
                                <div className="dollars">
                                    ~ {(this.props.balance * this.props.getEth * this.props.ethDollar).toFixed(2)} USD
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="col-xl-5 offset-xl-0 col-lg-6 offset-lg-3 col-md-8 offset-md-2 order-xl-1 order-12"
                        style={{marginBottom: 20}}
                    >
                        <div className="statistics-item savings">
                            <div className="statistics-item-header">{textPage[lang].save}</div>
                            <div className="statistics-item-content">
                                <div className="savings">
                                    <div className="saving">
                                        <div className="saving-name">{textPage[lang].revenue[0]}</div>
                                        <span>~</span>
                                        <div className="saving-value">
                                            {(this.props.savings.casino * this.state.coefficient).toFixed(this.state.decimal)}
                                            <span className="currency">{this.state.activeCurrency}</span>
                                        </div>
                                    </div>
                                    <div className="saving">
                                        <div className="saving-name">{textPage[lang].revenue[1]}</div>
                                        <span>~</span>
                                        <div className="saving-value">
                                            {(this.props.savings.invest * this.state.coefficient).toFixed(this.state.decimal)}
                                            <span className="currency">{this.state.activeCurrency}</span>
                                        </div>
                                    </div>
                                    <div className="saving">
                                        <div className="saving-name">{textPage[lang].revenue[2]}</div>
                                        <span>~</span>
                                        <div className="saving-value">
                                            {(this.props.savings.ref * this.state.coefficient).toFixed(this.state.decimal)}
                                            <span className="currency">{this.state.activeCurrency}</span>
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className="saving">
                                        <div className="saving-name">{textPage[lang].revenue[3]}</div>
                                        <span>~</span>
                                        <div className="saving-value">
                                            {(this.props.savings.currentBalance * this.state.coefficient).toFixed(this.state.decimal)}
                                            <span className="currency">{this.state.activeCurrency}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="buttons">
                                    <div onClick={() => this.openForm('withdrawal')} className="button">
                                        {textPage[lang].result[0]}
                                    </div>
                                    <div onClick={() => this.openForm('reinvest')} className="button">
                                        {textPage[lang].result[1]}
                                    </div>
                                    <div onClick={() => this.openForm('transfer')} className="button">
                                        {textPage[lang].result[2]}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl col-md-6 order-xl-12 order-1" style={{marginBottom: 20}}>
                        <div className="statistics-item statistics">
                            <div className="statistics-item-header">{textPage[lang].stat[0]}</div>
                            <div className="statistics-item-content">
                                <div className="statistics-for-period">
                                    <div className="period">{textPage[lang].stat[1]}</div>
                                    <div className="value">
                                        {(this.props.statistics.day * this.state.coefficient).toFixed(this.state.decimal)}
                                        <span className="currency">{this.state.activeCurrency}</span>
                                    </div>
                                </div>
                                <div className="statistics-for-period">
                                    <div className="period">{textPage[lang].stat[2]}</div>
                                    <div className="value">
                                        {(this.props.statistics.week * this.state.coefficient).toFixed(this.state.decimal)}
                                        <span className="currency">{this.state.activeCurrency}</span>
                                    </div>
                                </div>
                                <div className="statistics-for-period">
                                    <div className="period">{textPage[lang].stat[3]}</div>
                                    <div className="value">
                                        {(this.props.statistics.month * this.state.coefficient).toFixed(this.state.decimal)}
                                        <span className="currency">{this.state.activeCurrency}</span>
                                    </div>
                                </div>
                                <div className="statistics-for-period">
                                    <div className="period">{textPage[lang].stat[4]}</div>
                                    <div className="value">
                                        {(this.props.statistics.allTime * this.state.coefficient).toFixed(this.state.decimal)}
                                        <span className="currency">{this.state.activeCurrency}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(state => ({
    ethDollar: state.courses.ethDollar,
    getEth: state.courses.getEth,
    balance: state.values.balance.get,
    savings: state.values.savings,
    statistics: state.values.statistics,
    lang: state.lang,
}))(Statistics);
