import React from 'react';
import Lottery from '../components/Lottery';
import {connect} from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../components/Main/style.sass';
import Meta from "../components/Meta";


class LotteryNav extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <Lottery />
                <Footer />
                <Meta page='lottery' />
            </div>
        );
    }
}

export default connect(state => ({
    nightMode: state
}))(LotteryNav);
