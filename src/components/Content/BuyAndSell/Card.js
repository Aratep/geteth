import React from 'react';
import { connect } from 'react-redux';
import { textPage } from '../texts';

class Card extends React.Component {
    state = {
        input: '',
        value: 0,
        toEnrollment: 0,
    };
    handleBlur = () => {
        this.setState({
            input: this.state.value,
        });
    };
    handleChange = e => {
        const inputValue = e.target.value;
        this.setState({ input: inputValue });
        if (!isNaN(+inputValue))
            setTimeout(() => {
                const val = this.props.currency === 'GET' ? Math.floor(inputValue) : inputValue;
                this.setState({ value: val, input: val.toString() });
            });
    };
    changeValue = newValue => {
        this.setState({
            value: parseInt(newValue),
            input: parseInt(newValue),
        });
    };
    makeTransaction = () => {
        this.props.action(this.state.value);
    };
    render() {
        const { lang, isSell } = this.props;
        return (
            <div className="col-md-6">
                <div className={`card ${this.props.type} circled`}>
                    <div className="card-header">{this.props.headerText}</div>
                    <div className="first-input">
                        <div className="input-wrap">
                            <input type="text" value={this.state.input} onChange={this.handleChange} />
                            <div className="currency">{this.props.currency}</div>
                        </div>
                        <div className="result">= {(this.props.dollarCourse * this.state.value).toFixed(2)} USD</div>
                        <div className="controls">
                            {[25, 50, 75, 100].map((percent, idx) => (
                                <div
                                    className="control"
                                    onClick={() => this.changeValue((this.props.max * percent) / 100)}
                                    key={`control-${idx}`}
                                >
                                    {percent}%
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="another-input">
                        <div className="label">{textPage[lang].buying[1]}</div>
                        <input
                            type="text"
                            value={
                                this.props.calculatePayout(this.state.value).toFixed(this.props.enrollmentSigns) +
                                ' ' +
                                this.props.enrollmentCurrency
                            }
                            disabled={true}
                        />
                    </div>
                    <div className="another-input">
                        <div className="label">{textPage[lang].buying[2]}</div>
                        <input type="text" value={this.props.fee + '%'} disabled={true} />
                    </div>
                    <div className="button" onClick={this.makeTransaction}>
                        {this.props.buttonText}
                    </div>
                    <p className="notif-card">
                        {isSell ? textPage[lang].textCalculatorSell : textPage[lang].textCalculator}<br />
                        <span dangerouslySetInnerHTML={{__html: isSell ? '' : textPage[lang].calculatorGuide}} />
                    </p>
                </div>
            </div>
        );
    }
}

export default connect(state => ({
    lang: state.lang,
}))(Card);
