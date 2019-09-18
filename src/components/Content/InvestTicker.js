import React, { Component } from 'react';
import PNotify from 'pnotify/lib/es/PNotify';
import { connect } from "react-redux";
import { textPage } from './texts';
import { shortAddr } from "../../utils";
import { fetchCourses } from "../../store/courses";
import { fetchValues } from "../../store/values";

const stackBottomRight = {
    dir1: 'up',
    dir2: 'left',
    firstpos1: 10,
    firstpos2: 10,
    spacing1: 5
};
const notifyOptions = {
    stack: stackBottomRight,
    delay: 5000,
    icon: false,
    shadow: false,
    width: 'auto',
    textTrusted: true,
    remove: false,
    destroy: false,
    autoDisplay: false,
};


class InvestTicker extends Component {
    componentDidMount() {
        this.notice = PNotify.info(notifyOptions);

        this.props.contract.Buy({}, {}).watch((err, { transactionHash, args: { buyer, weiAmount } }) => {
            this.notice.update({
                text: textPage[this.props.lang].investedNotify(
                    transactionHash,
                    shortAddr(buyer, 8),
                    window.web3.fromWei(weiAmount.toNumber(), 'ether')
                ),
            });
            this.notice.open();
            this.props.fetchEverything();
        });
    }

    render() {
        return <div />;
    }
}

export default connect(
    state => ({
        contract: state.contract,
        lang: state.lang,
    }),
    dispatch => ({
        fetchEverything: () => {
            dispatch(fetchCourses());
            dispatch(fetchValues());
        }
    })
)(InvestTicker);
