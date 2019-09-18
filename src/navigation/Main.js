import React from 'react';
import Description from '../components/Main/Description';
import Games from '../components/Main/Games';
import Statistics from '../components/Main/Statistics';
import {connect} from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {fetchCasinoStatistics} from '../store/action';
import '../components/Main/style.sass';
import Meta from "../components/Meta";


class Main extends React.Component {
  componentDidMount() {
    setInterval(() => this.props.fetchCasinoStatistics(), 10000);
  }
  render() {
    return (
      <div>
        <Header isOnMain={false} />
        <Description />
        {this.props.casinoStatistics && (
          <Statistics {...this.props.casinoStatistics} lang={this.props.lang} />
        )}
        <Games />
        <Footer />
        <Meta page='casino' />
      </div>
    );
  }
}

export default connect(
  state => ({
    casinoStatistics: state.parameters.casinoStatistics,
    lang: state.lang
  }),
  dispatch => ({
    fetchCasinoStatistics: () => dispatch(fetchCasinoStatistics())
  })
)(Main);
